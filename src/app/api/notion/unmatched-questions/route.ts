import { NextRequest, NextResponse } from "next/server"
import { logUnmatchedQuestion } from "@/services/notionService"

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      question?: string
      /** Matcher diagnostics — see QueryResolution in src/lib/semantic/resolveQuery.ts. */
      source?: string
      topId?: string | null
      score?: number
      margin?: number
      reason?: string
    }
    const { question } = body
    if (!question?.trim()) {
      return NextResponse.json({ error: "question is required" }, { status: 400 })
    }
    // The diagnostics turn "someone asked something I couldn't answer" into
    // "this question missed careerGoals by 0.03" — which tells you whether to
    // add a questionVariant or write a new response.
    await logUnmatchedQuestion(question, {
      source: body.source,
      topId: body.topId ?? undefined,
      score: body.score,
      margin: body.margin,
      reason: body.reason,
    })
  } catch (err) {
    console.error("[notion] Failed to record unmatched question:", err)
  }

  return NextResponse.json({ ok: true })
}
