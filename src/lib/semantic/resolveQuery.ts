"use client"

/**
 * The single entry point AIHeroSection uses to route a free-text question.
 *
 * Two states, deliberately no cleverness in between:
 *
 *   model ready      → semantic matching decides alone
 *   model not ready  → keyword matching (findMatchingResponse), unchanged
 *
 * Blending the two was tried and measured in scripts/eval-hero-matcher.ts.
 * Both a keyword fast path and a keyword "rescue" for margin-rejected matches
 * made accuracy WORSE and reintroduced off-topic false accepts, so keyword
 * matching is confined to the degradation path where the alternative is
 * answering nothing at all. See predictHybrid() there for the numbers.
 *
 * Never rejects: any internal failure degrades to keyword matching.
 */
import { findMatchingResponse } from "@/data/heroResponses/responses"

import { getSemanticStatus, matchSemantic } from "./semanticMatcher"
import type { MatchReason } from "./types"

export interface QueryResolution {
  /** Response id to render, or null to show the fallback message. */
  id: string | null
  source: "semantic" | "keyword"
  /** Top cosine score — 0 on the keyword path. Sent to Notion for tuning. */
  score: number
  margin: number
  /** Best response even when refused, so the log shows the near miss. */
  topId: string | null
  reason: MatchReason
}

export async function resolveQuery(query: string): Promise<QueryResolution> {
  try {
    if (getSemanticStatus() === "ready") {
      const result = await matchSemantic(query)
      if (result.reason !== "unavailable") {
        return {
          id: result.id,
          source: "semantic",
          score: result.score,
          margin: result.margin,
          topId: result.topId,
          reason: result.reason,
        }
      }
    }
  } catch (error) {
    console.warn("[semantic] resolveQuery failed, using keyword matching:", error)
  }

  const matched = findMatchingResponse(query)
  return {
    id: matched?.id ?? null,
    source: "keyword",
    score: 0,
    margin: 0,
    topId: matched?.id ?? null,
    reason: matched ? "match" : "unavailable",
  }
}
