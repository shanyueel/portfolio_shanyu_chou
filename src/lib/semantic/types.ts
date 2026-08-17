/**
 * Shared types for the semantic matcher. Kept dependency-free so the browser
 * runtime and the Node build/eval scripts can both import them.
 */

/** Why the matcher accepted or refused. Sent to Notion as tuning telemetry. */
export type MatchReason =
  | "match"
  | "below-threshold"
  | "low-margin"
  | "decoy"
  | "unavailable"

export interface SemanticMatchResult {
  /** The winning response id, or null when refused. */
  id: string | null
  /** Cosine similarity of the best-scoring response (0 when unavailable). */
  score: number
  /** Gap between the best and second-best response. */
  margin: number
  /** Score of the nearest off-topic decoy. */
  decoyScore: number
  /** Id of the best response even when refused — useful for telemetry. */
  topId: string | null
  reason: MatchReason
}

/** One quantized reference vector as stored in embeddings.generated.json. */
export interface QuantizedEntry {
  /** Response id, or DECOY_ID for negatives. */
  id: string
  /** The source text, kept for debugging and eval reports. */
  text: string
  /** Dequantization scale: value = int8 * scale. */
  scale: number
  /** Base64-encoded Int8Array of length EMBEDDING_DIM. */
  q: string
}

/** The on-disk build artifact. */
export interface EmbeddingArtifact {
  model: string
  dtype: string
  dim: number
  builtAt: string
  /** sha256 of every embedded text — detects a stale artifact after responses.ts edits. */
  defsHash: string
  /** Build-time embedding of CANARY_TEXT, used for Node/browser drift detection. */
  canary: QuantizedEntry
  entries: QuantizedEntry[]
  decoys: QuantizedEntry[]
}

/**
 * Runtime form of the artifact: one contiguous Float32Array matrix of
 * L2-normalized vectors, so scoring is a tight loop with no per-row allocation.
 */
export interface EmbeddingIndex {
  dim: number
  /** rowCount * dim floats, row-major. */
  matrix: Float32Array
  /** Response id per row (DECOY_ID for decoy rows). */
  ids: string[]
  /** Source text per row. */
  texts: string[]
  canary: Float32Array
}

