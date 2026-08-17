/**
 * Shared model loader for the build and eval scripts.
 *
 * transformers.js types `pipeline()` as a huge overload union across every
 * supported task and model, which trips TS2590 ("union type too complex") when
 * called with literal arguments. Narrowing the call signature once here keeps
 * the blowup contained rather than casting at every call site.
 */
import { pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers"

import { MODEL_DTYPE, MODEL_ID } from "../../src/lib/semantic/config"

type PipelineFn = (
  task: string,
  model: string,
  options: { dtype: string },
) => Promise<FeatureExtractionPipeline>

export function loadExtractor(): Promise<FeatureExtractionPipeline> {
  return (pipeline as unknown as PipelineFn)("feature-extraction", MODEL_ID, {
    dtype: MODEL_DTYPE,
  })
}

/** Embed one string into a normalized Float32Array. */
export async function embedText(
  extractor: FeatureExtractionPipeline,
  text: string,
): Promise<Float32Array> {
  const output = await extractor(text, { pooling: "mean", normalize: true })
  return Float32Array.from(output.data as Iterable<number>)
}
