import { createFetcher } from "@/lib/utils/http"

const notionApi = createFetcher({
  baseUrl: "https://api.notion.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Notion-Version": "2022-06-28",
  },
})

const TAG_RULES: { tag: string; keywords: string[] }[] = [
  {
    tag: "Introduction",
    keywords: ["who", "yourself", "about you", "background", "introduce"],
  },
  {
    tag: "Tech Stacks",
    keywords: ["tech", "stack", "language", "framework", "tool", "code", "programming"],
  },
  {
    tag: "Career",
    keywords: ["career", "job", "work", "experience", "company", "role", "hire", "position"],
  },
  {
    tag: "Projects",
    keywords: ["project", "build", "create", "portfolio", "app", "website", "product"],
  },
  {
    tag: "Collaboration",
    keywords: ["team", "collaborate", "work with", "colleague", "pair", "together"],
  },
  {
    tag: "AI & ML",
    keywords: ["ai", "machine learning", "gpt", "model", "llm", "neural", "artificial"],
  },
]

function detectTags(question: string): string[] {
  const lower = question.toLowerCase()
  const matched = TAG_RULES.filter(({ keywords }) =>
    keywords.some(kw => lower.includes(kw))
  ).map(({ tag }) => tag)
  return matched.length > 0 ? matched : ["Other"]
}

/** Matcher diagnostics recorded alongside an unmatched question. */
export interface UnmatchedDiagnostics {
  /** "semantic" or "keyword" — which matcher was in play. */
  source?: string
  /** Closest response even though it was refused. */
  topId?: string
  /** Cosine similarity of that closest response. */
  score?: number
  /** Gap to the runner-up. */
  margin?: number
  /** Which gate refused it: below-threshold, low-margin, decoy, unavailable. */
  reason?: string
}

/**
 * Render diagnostics as a readable line, e.g.
 *   "semantic · refused: low-margin · closest: careerGoals 0.49 (margin 0.01)"
 */
function formatDiagnostics(diagnostics: UnmatchedDiagnostics): string {
  const parts: string[] = []
  if (diagnostics.source) parts.push(diagnostics.source)
  if (diagnostics.reason) parts.push(`refused: ${diagnostics.reason}`)
  if (diagnostics.topId) {
    const score = typeof diagnostics.score === "number" ? ` ${diagnostics.score.toFixed(2)}` : ""
    const margin =
      typeof diagnostics.margin === "number" ? ` (margin ${diagnostics.margin.toFixed(2)})` : ""
    parts.push(`closest: ${diagnostics.topId}${score}${margin}`)
  }
  return parts.join(" · ")
}

export async function logUnmatchedQuestion(
  question: string,
  diagnostics: UnmatchedDiagnostics = {},
) {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) throw new Error("NOTION_DATABASE_ID is not set")

  const tags = detectTags(question)
  const summary = formatDiagnostics(diagnostics)

  // Diagnostics go in the page body rather than new properties, so this keeps
  // working against the existing database schema without a migration.
  const children = summary
    ? [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [{ type: "text", text: { content: summary } }],
          },
        },
      ]
    : []

  await notionApi.post("/pages", {
    parent: { database_id: databaseId },
    ...(children.length > 0 ? { children } : {}),
    properties: {
      Question: {
        title: [{ text: { content: question.trim() } }],
      },
      "Asked At": {
        date: { start: new Date().toISOString() },
      },
      "Auto Tags": {
        multi_select: tags.map(name => ({ name })),
      },
      Status: {
        select: { name: "New" },
      },
    },
  })
}
