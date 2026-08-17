/**
 * Semantic matcher configuration.
 *
 * The embedding model is mxbai-embed-xsmall-v1 (24 MB, 384-dim, int8 ONNX,
 * Apache-2.0, Mixedbread). Both the build script and the browser MUST use the
 * identical model + dtype, or every threshold below shifts silently — the
 * artifact's model/dtype fields are asserted at load for exactly this reason.
 *
 * Chosen by measurement over eight candidates (see the eval harness). Summary of
 * the ones that mattered, all tuned to their own best threshold:
 *
 *   mxbai-embed-xsmall-v1   24 MB   72.3%   refused 13.1%   <- chosen
 *   all-MiniLM-L12-v2       33 MB   72.3%   refused 16.8%
 *   all-MiniLM-L6-v2        22 MB   69.3%   refused 16.8%
 *   multi-qa-MiniLM-L6      23 MB   69.3%   refused 22.4%   (0% off-topic leak)
 *   gte-small               33 MB   73.7%   refused 18.7%   (Alibaba; excluded on origin)
 *   all-mpnet-base-v2      105 MB   79.6%                   (excluded on size)
 *
 * mxbai wins on accuracy-per-megabyte and refuses the fewest good questions.
 * Note the shape of that table: a 5x larger model buys ~7 points, so model
 * choice is NOT the lever that would take this to the mid-90s — an LLM router
 * would be. Retrieval-tuned models (e5, arctic) scored far worse here because
 * they expect query/passage prefixes; question-to-question matching is
 * symmetric, so the sentence-similarity family is the correct class.
 */

export const MODEL_ID = "mixedbread-ai/mxbai-embed-xsmall-v1"
export const MODEL_DTYPE = "q8"
export const EMBEDDING_DIM = 384

/**
 * A fixed sentence embedded at build time. The browser re-embeds it at init and
 * asserts cosine-to-self > CANARY_MIN_SIMILARITY, catching Node/browser drift
 * (different dtype, pooling, or tokenizer) before it corrupts real matching.
 */
export const CANARY_TEXT = "The quick brown fox jumps over the lazy dog."
export const CANARY_MIN_SIMILARITY = 0.999

/** Marker id used for off-topic decoy vectors in the artifact. */
export const DECOY_ID = "__decoy__"

export interface MatcherConfig {
  /** Reject if the best response scores below this. */
  ABS_THRESHOLD: number
  /** Reject if the gap between the best and second-best response is smaller. */
  MARGIN: number
  /** Reject if the best decoy scores above (top1 - this). */
  DECOY_SLACK: number
  /** A score at or above this bypasses the margin gate. */
  HIGH_CONFIDENCE: number
}

/**
 * Tuned by `npm run eval:matcher` against 137 labelled questions.
 * ** Do not hand-edit without re-running the sweep. **
 *
 * Measured at these values: 72.3% accuracy, 3.3% of off-topic questions
 * answered (one case in the labelled set), 13.1% of good questions refused.
 * Keyword baseline for comparison: 51.8% accuracy with 63.3% of off-topic
 * questions answered.
 *
 * Read that accuracy correctly. The labelled questions are deliberately written
 * to share NO wording with questionVariants, so this measures cold
 * generalization to phrasings the corpus has never seen — the hardest possible
 * case, and well below what real traffic will see once logged questions are fed
 * back in as variants. An earlier 94.2% figure was an artefact of variants that
 * had drifted into paraphrasing the test set; do not restore that overlap to
 * make this number look better.
 *
 * The absolute cosine scale is model-specific: mxbai puts genuine paraphrases
 * near 0.45-0.65, whereas gte-small put them near 0.85. Re-run the sweep after
 * ANY model change — a threshold carried over from another model is silently,
 * badly wrong rather than merely suboptimal.
 *
 * MARGIN sits at 0.00: the sweep found the margin gate cost accuracy at every
 * non-zero value with this model, because mxbai already separates the top two
 * candidates well. The gate remains implemented and can be re-enabled if a
 * future model needs it.
 */
export const MATCHER_CONFIG: MatcherConfig = {
  ABS_THRESHOLD: 0.42,
  MARGIN: 0.0,
  DECOY_SLACK: 0.02,
  HIGH_CONFIDENCE: 0.78,
}

/** Max time the UI waits for an embedding before falling back to keyword matching. */
export const SEMANTIC_TIMEOUT_MS = 1500
