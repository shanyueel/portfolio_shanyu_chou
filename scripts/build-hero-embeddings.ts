/**
 * Build-time embedding generation.
 *
 *   npm run build:embeddings
 *
 * Embeds every hero response's questions plus the off-topic decoys once, on the
 * developer's machine, and writes the quantized vectors to
 * src/data/heroResponses/embeddings.generated.json (checked in).
 *
 * Visitors never run this — their browser only embeds their own one-sentence
 * question and compares it against these precomputed vectors.
 *
 * Re-run after ANY edit to responses.ts or decoys.ts. The artifact records a
 * fingerprint of its source texts, and `npm run eval:matcher` refuses to run
 * against a stale one; `npm run build` chains this step so a deploy cannot ship
 * vectors that disagree with the questions beside them.
 */
import { writeFileSync } from "node:fs"
import { join } from "node:path"

import { computeDefsHash, corpusEntries, textsForResponse } from "./lib/corpus"
import { embedText, loadExtractor } from "./lib/extractor"
import { heroResponseDefs } from "../src/data/heroResponses/responses"
import { OFF_TOPIC_DECOYS } from "../src/data/heroResponses/decoys"
import {
  CANARY_TEXT,
  DECOY_ID,
  EMBEDDING_DIM,
  MODEL_DTYPE,
  MODEL_ID,
} from "../src/lib/semantic/config"
import { toBase64 } from "../src/lib/utils/binary"
import { quantize } from "../src/lib/semantic/scoring"
import type { EmbeddingArtifact, QuantizedEntry } from "../src/lib/semantic/types"

const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "heroResponses",
  "embeddings.generated.json",
)

async function main() {
  console.log(`Loading ${MODEL_ID} (${MODEL_DTYPE})…`)
  const extractor = await loadExtractor()

  const embed = async (text: string): Promise<Float32Array> => {
    const data = await embedText(extractor, text)
    if (data.length !== EMBEDDING_DIM) {
      throw new Error(`Expected ${EMBEDDING_DIM} dims for "${text}", got ${data.length}`)
    }
    return data
  }

  const toEntry = async (id: string, text: string): Promise<QuantizedEntry> => {
    const { scale, q } = quantize(await embed(text))
    return { id, text, scale, q: toBase64(q) }
  }

  // corpusEntries() is the single source of truth for what gets embedded, shared
  // with the eval script so the two can never disagree about the corpus.
  const rows = corpusEntries()
  const entries: QuantizedEntry[] = []
  const decoys: QuantizedEntry[] = []

  for (const row of rows) {
    const entry = await toEntry(row.id, row.text)
    if (row.id === DECOY_ID) decoys.push(entry)
    else entries.push(entry)
  }

  for (const def of heroResponseDefs) {
    console.log(`  ${def.id.padEnd(22)} ${textsForResponse(def).length} vectors`)
  }
  console.log(`  ${DECOY_ID.padEnd(22)} ${OFF_TOPIC_DECOYS.length} vectors`)

  const artifact: EmbeddingArtifact = {
    model: MODEL_ID,
    dtype: MODEL_DTYPE,
    dim: EMBEDDING_DIM,
    builtAt: new Date().toISOString(),
    defsHash: computeDefsHash(),
    canary: await toEntry("__canary__", CANARY_TEXT),
    entries,
    decoys,
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(artifact), "utf-8")

  const bytes = Buffer.byteLength(JSON.stringify(artifact))
  console.log(
    `\nWrote ${entries.length} response + ${decoys.length} decoy vectors ` +
      `(${(bytes / 1024).toFixed(0)} KB) to ${OUTPUT_PATH}`,
  )
  console.log(`defsHash: ${artifact.defsHash.slice(0, 16)}…`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
