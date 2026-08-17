/**
 * The corpus definition shared by the build and eval scripts.
 *
 * Both need to agree exactly on WHICH texts get embedded, so that agreement
 * lives here rather than being duplicated. `computeDefsHash` turns that text
 * list into a fingerprint, which lets the eval script detect an artifact built
 * from an older version of responses.ts or decoys.ts.
 *
 * That staleness check matters most while tuning: you add a questionVariant,
 * re-run the eval, and see no improvement — because the vectors are still the
 * old ones. Without the hash, that failure is completely silent.
 */
import { createHash } from "node:crypto"

import { OFF_TOPIC_DECOYS } from "../../src/data/heroResponses/decoys"
import { heroResponseDefs, type HeroResponseDef } from "../../src/data/heroResponses/responses"
import { DECOY_ID } from "../../src/lib/semantic/config"

/** Strip leading emoji/symbols from a chip label ("👤 Introduction" → "Introduction"). */
function stripEmoji(label: string): string {
  return label.replace(/[\p{Extended_Pictographic}️]/gu, "").trim()
}

/**
 * The texts embedded for one response.
 *
 * Each becomes its OWN vector; at query time we take the max over them. We
 * deliberately do not average into a centroid — see scoreQuery() for why.
 *
 * The answer MDX bodies are deliberately excluded: MiniLM is trained for
 * symmetric similarity and scores question-to-question far more reliably than
 * question-to-document, and long texts average into a mushy vector that sits
 * close to everything, wrecking off-topic rejection.
 */
export function textsForResponse(def: HeroResponseDef): string[] {
  // A Set, so the canonical entry appearing first in questionVariants is not
  // embedded twice.
  const texts = new Set<string>()
  for (const variant of def.questionVariants) texts.add(variant)

  const label = stripEmoji(def.chipLabel)
  if (label) texts.add(label)

  // One pseudo-sentence of keywords. Bare words embed poorly on their own (no
  // context to disambiguate), but joined they give a cheap recall boost for
  // visitors who type bare nouns like "react?" instead of a full question.
  const keywordBlob = def.keywords.slice(0, 12).join(", ")
  if (keywordBlob) texts.add(keywordBlob)

  return [...texts]
}

/** Every (id, text) pair that should exist in the artifact, in a stable order. */
export function corpusEntries(): { id: string; text: string }[] {
  const rows: { id: string; text: string }[] = []
  for (const def of heroResponseDefs) {
    for (const text of textsForResponse(def)) rows.push({ id: def.id, text })
  }
  for (const text of OFF_TOPIC_DECOYS) rows.push({ id: DECOY_ID, text })
  return rows
}

/** Fingerprint of the current corpus. Changes whenever any embedded text changes. */
export function computeDefsHash(): string {
  const source = corpusEntries()
    .map(({ id, text }) => `${id} ${text}`)
    .join("\n")
  return createHash("sha256").update(source).digest("hex")
}

/**
 * Throw if the artifact was built from a different corpus than the one on disk.
 * Call this from anything that reads the artifact in Node.
 */
export function assertArtifactFresh(artifactDefsHash: string): void {
  const expected = computeDefsHash()
  if (artifactDefsHash !== expected) {
    throw new Error(
      `Embeddings artifact is STALE.\n` +
        `  artifact corpus: ${artifactDefsHash.slice(0, 16)}…\n` +
        `  current corpus:  ${expected.slice(0, 16)}…\n` +
        `responses.ts or decoys.ts changed since the vectors were built. ` +
        `Run \`npm run build:embeddings\`.`,
    )
  }
}
