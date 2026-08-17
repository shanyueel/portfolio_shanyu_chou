/**
 * Matcher evaluation and threshold tuning.
 *
 *   npm run eval:matcher
 *
 * Measures three strategies against the labelled ground truth:
 *   fuse       — the existing keyword scorer alone (the baseline to beat)
 *   semantic   — embeddings with the three rejection gates
 *   hybrid     — the cascade that actually ships (see resolveQuery.ts)
 *
 * Then sweeps ABS_THRESHOLD x MARGIN and reports the configuration that
 * maximizes `accuracy - 2 * falseAcceptRate`. The 2x weighting encodes a product
 * decision, not a mathematical one: answering an off-topic question with the
 * wrong essay is worse for a portfolio than showing a fallback. Change the
 * weight if you disagree.
 *
 * Query embeddings are cached in .cache/, so only the first run pays for
 * inference and threshold sweeps are instant afterwards.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { assertArtifactFresh } from "./lib/corpus"
import { embedText, loadExtractor } from "./lib/extractor"
import { findMatchingResponse, heroResponseDefs } from "../src/data/heroResponses/responses"
import {
  LABELLED_QUESTIONS,
  type LabelledQuestion,
} from "../src/data/heroResponses/__eval__/labelled-questions"
import artifact from "../src/data/heroResponses/embeddings.generated.json"
import {
  MATCHER_CONFIG,
  MODEL_DTYPE,
  MODEL_ID,
  type MatcherConfig,
} from "../src/lib/semantic/config"
import { buildIndex, scoreQuery } from "../src/lib/semantic/scoring"
import type { EmbeddingArtifact, SemanticMatchResult } from "../src/lib/semantic/types"

const CACHE_DIR = join(process.cwd(), ".cache")
const CACHE_PATH = join(CACHE_DIR, "eval-embeddings.json")

/**
 * Accuracy floor for CI — a regression guard, not a target.
 *
 * Last measured with mxbai-embed-xsmall-v1: keyword baseline 51.8% -> semantic
 * 72.3%, off-topic leak 63.3% -> 3.3%.
 *
 * Set a few points below the current figure so ordinary noise doesn't fail the
 * build, but a real regression does. Raise it when the matcher genuinely
 * improves — and never "fix" a failure here by loosening the floor without
 * understanding what regressed.
 */
const ACCURACY_FLOOR = 0.68

const typedArtifact = artifact as unknown as EmbeddingArtifact

// Refuse to report numbers measured against vectors built from older questions.
// This is the failure this check exists for: you add a questionVariant, re-run
// the eval, see no improvement, and conclude the variant didn't help — when in
// fact it was never embedded.
assertArtifactFresh(typedArtifact.defsHash)

const index = buildIndex(typedArtifact)

// ---------------------------------------------------------------------------
// Query embedding, with a disk cache keyed by question text
// ---------------------------------------------------------------------------

async function embedAll(questions: LabelledQuestion[]): Promise<Map<string, Float32Array>> {
  const cacheKey = `${MODEL_ID}:${MODEL_DTYPE}`
  let cache: Record<string, number[]> = {}

  if (existsSync(CACHE_PATH)) {
    const parsed = JSON.parse(readFileSync(CACHE_PATH, "utf-8"))
    if (parsed.key === cacheKey) cache = parsed.vectors
  }

  const missing = questions.filter((item) => !cache[item.q])
  if (missing.length > 0) {
    console.log(`Embedding ${missing.length} question(s) (${questions.length - missing.length} cached)…`)
    const extractor = await loadExtractor()
    for (const item of missing) {
      cache[item.q] = Array.from(await embedText(extractor, item.q))
    }
    mkdirSync(CACHE_DIR, { recursive: true })
    writeFileSync(CACHE_PATH, JSON.stringify({ key: cacheKey, vectors: cache }), "utf-8")
  } else {
    console.log(`All ${questions.length} question embeddings cached.`)
  }

  const map = new Map<string, Float32Array>()
  for (const item of questions) map.set(item.q, Float32Array.from(cache[item.q]))
  return map
}

// ---------------------------------------------------------------------------
// Strategies
// ---------------------------------------------------------------------------

type Prediction = { id: string | null; detail?: SemanticMatchResult }

function predictFuse(question: string): Prediction {
  return { id: findMatchingResponse(question)?.id ?? null }
}

function predictSemantic(vector: Float32Array, config: MatcherConfig): Prediction {
  const detail = scoreQuery(vector, index, config)
  return { id: detail.id, detail }
}

/**
 * Mirrors resolveQuery.ts: when the model is ready, semantic decides alone.
 *
 * Two keyword-assist refinements were designed, measured, and REJECTED here —
 * keep this history, because both look obviously good on paper:
 *
 *  - "Fuse fast path first" (skip the model on an unambiguous keyword hit):
 *    89.1% accuracy vs 93.4% for semantic alone, misroutes 8 vs 3, and leaks
 *    3.3% of off-topic questions that semantic correctly refuses.
 *  - "Rescue a margin-rejected match when Fuse agrees": +2.2% accuracy but
 *    reintroduced a 3.3% off-topic leak — a loss under the 2x weighting.
 *
 * Keyword matching earns its place only as the degradation path, where the
 * alternative is answering nothing at all.
 */
function predictHybrid(_question: string, vector: Float32Array, config: MatcherConfig): Prediction {
  const detail = scoreQuery(vector, index, config)
  return { id: detail.id, detail }
}

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

interface Metrics {
  total: number
  correct: number
  accuracy: number
  /** Off-topic questions that got answered anyway — the metric that matters most. */
  falseAccept: number
  falseAcceptRate: number
  /** Real questions that were refused. */
  falseReject: number
  falseRejectRate: number
  /** Real questions routed to the wrong response. */
  misroute: number
  errors: { q: string; expected: string | null; got: string | null; detail?: SemanticMatchResult }[]
}

function evaluate(predict: (item: LabelledQuestion) => Prediction): Metrics {
  const metrics: Metrics = {
    total: LABELLED_QUESTIONS.length,
    correct: 0,
    accuracy: 0,
    falseAccept: 0,
    falseAcceptRate: 0,
    falseReject: 0,
    falseRejectRate: 0,
    misroute: 0,
    errors: [],
  }
  const nullCases = LABELLED_QUESTIONS.filter((item) => item.expected === null).length
  const realCases = metrics.total - nullCases

  for (const item of LABELLED_QUESTIONS) {
    const { id, detail } = predict(item)
    if (id === item.expected) {
      metrics.correct++
      continue
    }
    metrics.errors.push({ q: item.q, expected: item.expected, got: id, detail })
    if (item.expected === null) metrics.falseAccept++
    else if (id === null) metrics.falseReject++
    else metrics.misroute++
  }

  metrics.accuracy = metrics.correct / metrics.total
  metrics.falseAcceptRate = nullCases ? metrics.falseAccept / nullCases : 0
  metrics.falseRejectRate = realCases ? metrics.falseReject / realCases : 0
  return metrics
}

const pct = (value: number) => `${(value * 100).toFixed(1)}%`

function printMetrics(label: string, metrics: Metrics) {
  console.log(
    `  ${label.padEnd(10)} accuracy ${pct(metrics.accuracy).padStart(6)}   ` +
      `off-topic answered ${pct(metrics.falseAcceptRate).padStart(6)}   ` +
      `good-question refused ${pct(metrics.falseRejectRate).padStart(6)}   ` +
      `misrouted ${String(metrics.misroute).padStart(3)}`,
  )
}

/** Which response pairs get confused, worst first — tells you where to add variants. */
function printConfusions(metrics: Metrics) {
  const pairs = new Map<string, number>()
  for (const error of metrics.errors) {
    if (error.expected === null || error.got === null) continue
    const key = `${error.expected} → ${error.got}`
    pairs.set(key, (pairs.get(key) ?? 0) + 1)
  }
  if (pairs.size === 0) {
    console.log("  (no response-to-response confusions)")
    return
  }
  for (const [pair, count] of [...pairs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
    console.log(`  ${String(count).padStart(3)}x  ${pair}`)
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const knownIds = new Set(heroResponseDefs.map((def) => def.id))
  for (const item of LABELLED_QUESTIONS) {
    if (item.expected !== null && !knownIds.has(item.expected)) {
      throw new Error(`Labelled question references unknown id "${item.expected}": ${item.q}`)
    }
  }

  const vectors = await embedAll(LABELLED_QUESTIONS)
  const vec = (q: string) => vectors.get(q)!

  const nullCases = LABELLED_QUESTIONS.filter((item) => item.expected === null).length
  console.log(
    `\n${LABELLED_QUESTIONS.length} labelled cases ` +
      `(${LABELLED_QUESTIONS.length - nullCases} answerable, ${nullCases} should refuse)\n`,
  )

  console.log("BASELINE vs SEMANTIC vs HYBRID")
  const fuse = evaluate((item) => predictFuse(item.q))
  const semantic = evaluate((item) => predictSemantic(vec(item.q), MATCHER_CONFIG))
  const hybrid = evaluate((item) => predictHybrid(item.q, vec(item.q), MATCHER_CONFIG))
  printMetrics("fuse", fuse)
  printMetrics("semantic", semantic)
  printMetrics("hybrid", hybrid)

  console.log("\nTHRESHOLD SWEEP (hybrid, ranked by accuracy - 2 x falseAcceptRate)")
  const results: { config: MatcherConfig; metrics: Metrics; objective: number }[] = []
  // Range must be wide: different embedding models put their "same meaning"
  // scores at very different absolute cosines (MiniLM ~0.5, gte ~0.85), so a
  // narrow sweep silently reports a bad optimum when the model is swapped.
  for (let abs = 0.2; abs <= 0.95001; abs += 0.01) {
    for (let margin = 0; margin <= 0.12001; margin += 0.01) {
      const config: MatcherConfig = {
        ...MATCHER_CONFIG,
        ABS_THRESHOLD: Number(abs.toFixed(2)),
        MARGIN: Number(margin.toFixed(2)),
      }
      const metrics = evaluate((item) => predictHybrid(item.q, vec(item.q), config))
      results.push({
        config,
        metrics,
        objective: metrics.accuracy - 2 * metrics.falseAcceptRate,
      })
    }
  }
  results.sort((a, b) => b.objective - a.objective)
  console.log("  abs   margin  accuracy  off-topic-answered  refused  objective")
  for (const result of results.slice(0, 10)) {
    console.log(
      `  ${result.config.ABS_THRESHOLD.toFixed(2)}  ${result.config.MARGIN.toFixed(2)}    ` +
        `${pct(result.metrics.accuracy).padStart(6)}       ${pct(result.metrics.falseAcceptRate).padStart(6)}        ` +
        `${pct(result.metrics.falseRejectRate).padStart(6)}   ${result.objective.toFixed(3)}`,
    )
  }

  const best = results[0]
  console.log(
    `\nBEST: ABS_THRESHOLD ${best.config.ABS_THRESHOLD.toFixed(2)}, ` +
      `MARGIN ${best.config.MARGIN.toFixed(2)}  ` +
      `(current config: ${MATCHER_CONFIG.ABS_THRESHOLD.toFixed(2)} / ${MATCHER_CONFIG.MARGIN.toFixed(2)})`,
  )

  console.log("\nCONFUSIONS at best config — add questionVariants where counts are high")
  const bestMetrics = evaluate((item) => predictHybrid(item.q, vec(item.q), best.config))
  printConfusions(bestMetrics)

  console.log("\nWORST CASES at best config")
  for (const error of bestMetrics.errors.slice(0, 20)) {
    const detail = error.detail
    const scores = detail
      ? ` [top ${detail.topId ?? "-"} ${detail.score.toFixed(2)}, margin ${detail.margin.toFixed(2)}, decoy ${detail.decoyScore.toFixed(2)}, ${detail.reason}]`
      : ""
    console.log(
      `  "${error.q}"\n      expected ${error.expected ?? "REFUSE"}, got ${error.got ?? "REFUSE"}${scores}`,
    )
  }

  console.log(
    `\nSummary: fuse ${pct(fuse.accuracy)} → hybrid ${pct(hybrid.accuracy)} accuracy, ` +
      `off-topic leak ${pct(fuse.falseAcceptRate)} → ${pct(hybrid.falseAcceptRate)}`,
  )

  if (hybrid.accuracy < ACCURACY_FLOOR) {
    console.error(`\nFAIL: hybrid accuracy ${pct(hybrid.accuracy)} is below floor ${pct(ACCURACY_FLOOR)}`)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
