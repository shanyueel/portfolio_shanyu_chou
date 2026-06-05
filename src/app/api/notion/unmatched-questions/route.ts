import { NextRequest, NextResponse } from "next/server"
import { logUnmatchedQuestion } from "@/services/notionService"

export async function POST(req: NextRequest) {
  try {
    const { question } = (await req.json()) as { question?: string }
    if (!question?.trim()) {
      return NextResponse.json({ error: "question is required" }, { status: 400 })
    }
    await logUnmatchedQuestion(question)
  } catch (err) {
    console.error("[notion] Failed to record unmatched question:", err)
  }

  return NextResponse.json({ ok: true })
}
