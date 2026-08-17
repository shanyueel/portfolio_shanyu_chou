/**
 * Pure scoring logic for the semantic matcher.
 *
 * No DOM, no model, no I/O — this module is shared verbatim between the browser
 * runtime and the Node eval script, which is what makes offline threshold tuning
 * trustworthy: the sweep measures exactly the code that ships.
 */
import { DECOY_ID, EMBEDDING_DIM, type MatcherConfig } from "./config"
import type {
  EmbeddingArtifact,
  EmbeddingIndex,
  QuantizedEntry,
  SemanticMatchResult,
} from "./types"

// ---------------------------------------------------------------------------
// Quantization
// ---------------------------------------------------------------------------

/**
 * Symmetric int8 quantization of an L2-normalized vector.
 * Cosine error is < 1e-3, far below any threshold we care about. For the 241
 * vectors we ship, this is ~123 KB of base64 instead of ~494 KB as float32
 * (the artifact file is 149 KB in total, 102 KB gzipped, the rest being the
 * source texts kept for debugging).
 */
export function quantize(vector: Float32Array): { scale: number; q: Int8Array } {
  let maxAbs = 0
  for (const v of vector) {
    const abs = Math.abs(v)
    if (abs > maxAbs) maxAbs = abs
  }
  // Guard against an all-zero vector producing NaN scales.
  const scale = maxAbs === 0 ? 1 : maxAbs / 127
  const q = new Int8Array(vector.length)
  for (let i = 0; i < vector.length; i++) {
    q[i] = Math.max(-127, Math.min(127, Math.round(vector[i] / scale)))
  }
  return { scale, q }
}

export function toBase64(bytes: Int8Array): string {
  const u8 = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  if (typeof Buffer !== "undefined") return Buffer.from(u8).toString("base64")
  let binary = ""
  for (const byte of u8) binary += String.fromCharCode(byte)
  return btoa(binary)
}

export function fromBase64(base64: string): Int8Array {
  if (typeof Buffer !== "undefined") {
    const buf = Buffer.from(base64, "base64")
    return new Int8Array(buf.buffer, buf.byteOffset, buf.byteLength)
  }
  const binary = atob(base64)
  const u8 = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) u8[i] = binary.charCodeAt(i)
  return new Int8Array(u8.buffer)
}

/** Dequantize and re-normalize, writing into `out` at `offset`. */
function dequantizeInto(entry: QuantizedEntry, out: Float32Array, offset: number, dim: number) {
  const q = fromBase64(entry.q)
  if (q.length !== dim) {
    throw new Error(`Entry "${entry.text}" has ${q.length} dims, expected ${dim}`)
  }
  let norm = 0
  for (let i = 0; i < dim; i++) {
    const v = q[i] * entry.scale
    out[offset + i] = v
    norm += v * v
  }
  // Re-normalize: quantization rounding perturbs the unit length slightly, and
  // cosine below assumes unit vectors so it can skip the denominator.
  norm = Math.sqrt(norm)
  if (norm > 0) {
    for (let i = 0; i < dim; i++) out[offset + i] /= norm
  }
}

/** Decode the on-disk artifact into the flat runtime index. */
export function buildIndex(artifact: EmbeddingArtifact): EmbeddingIndex {
  const dim = artifact.dim
  const rows = [...artifact.entries, ...artifact.decoys]
  const matrix = new Float32Array(rows.length * dim)
  const ids: string[] = []
  const texts: string[] = []

  rows.forEach((entry, row) => {
    dequantizeInto(entry, matrix, row * dim, dim)
    ids.push(entry.id)
    texts.push(entry.text)
  })

  const canary = new Float32Array(dim)
  dequantizeInto(artifact.canary, canary, 0, dim)

  return { dim, matrix, ids, texts, canary }
}

// ---------------------------------------------------------------------------
// Similarity
// ---------------------------------------------------------------------------

/** Cosine similarity of two unit-length vectors — a plain dot product. */
export function cosine(a: Float32Array, b: Float32Array, bOffset = 0): number {
  let dot = 0
  for (let i = 0; i < a.length; i++) dot += a[i] * b[bOffset + i]
  return dot
}

/** Normalize in place; the model already does this, but eval inputs may not. */
export function normalize(vector: Float32Array): Float32Array {
  let norm = 0
  for (const v of vector) norm += v * v
  norm = Math.sqrt(norm)
  if (norm > 0) {
    for (let i = 0; i < vector.length; i++) vector[i] /= norm
  }
  return vector
}

// ---------------------------------------------------------------------------
// The three gates
// ---------------------------------------------------------------------------

/**
 * Score a query vector against the index and apply the rejection gates.
 *
 * Per-response score is the MAX over that response's individual variant vectors,
 * never a centroid: averaging the variants of semantically adjacent responses
 * (careerGoals / whyNewRole / careerTransition) pulls their centroids together
 * and collapses the top1-top2 margin, which is precisely the "wrong answer
 * picked" failure this module exists to fix.
 *
 * Returns `id: null` with a diagnostic `reason` whenever any gate fails.
 */
export function scoreQuery(
  queryVector: Float32Array,
  index: EmbeddingIndex,
  config: MatcherConfig,
): SemanticMatchResult {
  const { dim, matrix, ids } = index
  const rowCount = ids.length

  const bestByResponse = new Map<string, number>()
  let decoyScore = -1

  for (let row = 0; row < rowCount; row++) {
    const score = cosine(queryVector, matrix, row * dim)
    const id = ids[row]
    if (id === DECOY_ID) {
      if (score > decoyScore) decoyScore = score
      continue
    }
    const current = bestByResponse.get(id)
    if (current === undefined || score > current) bestByResponse.set(id, score)
  }

  let topId: string | null = null
  let topScore = -1
  let secondScore = -1
  for (const [id, score] of bestByResponse) {
    if (score > topScore) {
      secondScore = topScore
      topScore = score
      topId = id
    } else if (score > secondScore) {
      secondScore = score
    }
  }

  if (topId === null) {
    return { id: null, score: 0, margin: 0, decoyScore: 0, topId: null, reason: "unavailable" }
  }

  const margin = secondScore < 0 ? topScore : topScore - secondScore
  const base = { score: topScore, margin, decoyScore: Math.max(decoyScore, 0), topId }

  // Gate 1 — absolute threshold. Catches plainly off-topic queries.
  if (topScore < config.ABS_THRESHOLD) {
    return { ...base, id: null, reason: "below-threshold" }
  }

  // Gate 3 — decoy nearest-neighbour. Checked before the margin gate because an
  // on-topic-but-unsupported query ("what's your rate?") can clear both gate 1
  // and the margin, so only this gate can catch it.
  if (decoyScore > topScore - config.DECOY_SLACK) {
    return { ...base, id: null, reason: "decoy" }
  }

  // Gate 2 — margin. Skipped on a near-verbatim hit, where a close runner-up
  // is irrelevant: "what's your tech stack?" scores ~0.95 and must not be
  // blocked because another response happens to sit 0.03 behind.
  if (topScore < config.HIGH_CONFIDENCE && margin < config.MARGIN) {
    return { ...base, id: null, reason: "low-margin" }
  }

  return { ...base, id: topId, reason: "match" }
}

/** Sanity check used by the browser runtime and the build script. */
export function assertDim(vector: Float32Array): Float32Array {
  if (vector.length !== EMBEDDING_DIM) {
    throw new Error(`Expected ${EMBEDDING_DIM}-dim vector, got ${vector.length}`)
  }
  return vector
}
