"use client"

/**
 * Lazily-loaded embedding matcher.
 *
 * The model (~23 MB, downloaded once then served from the browser's Cache
 * Storage) and the transformers.js runtime are pulled in via dynamic import(),
 * so neither appears in the initial page bundle — nothing is fetched until
 * `warmSemanticMatcher()` runs on first input focus.
 *
 * WHY NOT A WEB WORKER: a worker is the textbook choice here, and this was
 * originally built as one. Turbopack did not reliably compile
 * `new Worker(new URL("./x.worker.ts", import.meta.url))` — it emitted the
 * worker as a RAW .ts file under /_next/static/media/ with its bare
 * `@huggingface/transformers` import intact, which no browser can parse. The
 * matcher silently failed to every keyword fallback. Rather than depend on
 * ambiguous bundler behaviour or pull the library from a third-party CDN inside
 * a hand-written JS worker (which would also mean duplicating scoring.ts), the
 * model runs on the main thread.
 *
 * The cost is bounded: MiniLM at sequence length ~16 is ~10-40 ms per query, and
 * it runs during the deliberate 1500 ms "thinking" pause, so it is not visible.
 * One-time WASM compilation on warm-up is heavier but happens while the user is
 * still typing. If this ever does become visible, revisit the worker with an
 * explicitly hand-authored JS entry point rather than bundler magic.
 *
 * Every failure mode resolves to an "unavailable" result rather than throwing,
 * so callers always have a keyword fallback.
 */
import {
  CANARY_MIN_SIMILARITY,
  CANARY_TEXT,
  MATCHER_CONFIG,
  MODEL_DTYPE,
  MODEL_ID,
  SEMANTIC_TIMEOUT_MS,
} from "./config"
import { cosine, normalize } from "@/lib/utils/vector"

import { buildIndex, scoreQuery } from "./scoring"
import type { EmbeddingArtifact, EmbeddingIndex, SemanticMatchResult } from "./types"

export type SemanticStatus = "idle" | "loading" | "ready" | "failed"

/** Minimal shape we use from transformers.js, to avoid its huge overload union. */
type Extractor = (
  text: string,
  options: { pooling: "mean"; normalize: boolean },
) => Promise<{ data: Iterable<number> }>

let status: SemanticStatus = "idle"
let extractor: Extractor | null = null
let index: EmbeddingIndex | null = null

const UNAVAILABLE: SemanticMatchResult = {
  id: null,
  score: 0,
  margin: 0,
  decoyScore: 0,
  topId: null,
  reason: "unavailable",
}

export function getSemanticStatus(): SemanticStatus {
  return status
}

async function embed(text: string): Promise<Float32Array> {
  if (!extractor) throw new Error("Model not initialised")
  const output = await extractor(text, { pooling: "mean", normalize: true })
  return normalize(Float32Array.from(output.data))
}

async function load(): Promise<void> {
  const [{ env, pipeline }, artifactModule] = await Promise.all([
    import("@huggingface/transformers"),
    import("@/data/heroResponses/embeddings.generated.json"),
  ])

  // Weights come from the HF CDN, never a local path; cache them so repeat
  // visits and reloads cost nothing.
  env.allowLocalModels = false
  env.useBrowserCache = true

  const artifact = artifactModule.default as unknown as EmbeddingArtifact
  if (artifact.model !== MODEL_ID || artifact.dtype !== MODEL_DTYPE) {
    throw new Error(
      `Embeddings artifact was built with ${artifact.model}/${artifact.dtype} but the ` +
        `runtime uses ${MODEL_ID}/${MODEL_DTYPE}. Re-run \`npm run build:embeddings\`.`,
    )
  }
  index = buildIndex(artifact)

  // device is left unset so transformers.js picks WASM. WebGPU is not requested
  // on purpose: for a 6-layer model at sequence length ~16, shader compilation
  // costs more than the inference it saves, and adapter loss on some Android and
  // Intel drivers is a real crash source.
  type PipelineFn = (
    task: string,
    model: string,
    options: { dtype: string },
  ) => Promise<Extractor>
  extractor = await (pipeline as unknown as PipelineFn)("feature-extraction", MODEL_ID, {
    dtype: MODEL_DTYPE,
  })

  // Drift canary: the build script embedded this same sentence in Node. If the
  // browser's tokenizer, pooling or dtype differ at all, every tuned threshold is
  // silently wrong — so fail loudly and fall back rather than mismatch quietly.
  const similarity = cosine(await embed(CANARY_TEXT), index.canary)
  if (similarity < CANARY_MIN_SIMILARITY) {
    throw new Error(
      `Embedding drift detected: canary cosine ${similarity.toFixed(4)} < ${CANARY_MIN_SIMILARITY}. ` +
        `The browser model does not match the one used to build the artifact.`,
    )
  }

  // Warm the WASM kernels so the first real query isn't the one paying JIT cost.
  await embed("hello")
}

/**
 * Begin downloading and initialising the model. Idempotent; safe to call on
 * every focus event.
 *
 * Skipped on data-saver and 2G connections — a ~23 MB download is not a
 * reasonable thing to spend someone's metered data on, and keyword matching
 * still answers.
 */
export function warmSemanticMatcher(): void {
  if (status !== "idle" || typeof window === "undefined") return

  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection
  if (connection?.saveData === true) return
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return

  status = "loading"
  load()
    .then(() => {
      status = "ready"
    })
    .catch((error) => {
      console.warn("[semantic] model unavailable, using keyword matching:", error)
      status = "failed"
      extractor = null
      index = null
    })
}

/**
 * Embed and score a query. Resolves to an "unavailable" result — never rejects —
 * if the model isn't ready, errors, or exceeds `timeoutMs`.
 */
export async function matchSemantic(
  query: string,
  timeoutMs: number = SEMANTIC_TIMEOUT_MS,
): Promise<SemanticMatchResult> {
  if (status !== "ready" || !extractor || !index) return UNAVAILABLE

  try {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs))
    const vector = await Promise.race([embed(query), timeout])
    if (!vector) return UNAVAILABLE
    return scoreQuery(vector, index, MATCHER_CONFIG)
  } catch (error) {
    console.warn("[semantic] embedding failed:", error)
    return UNAVAILABLE
  }
}
