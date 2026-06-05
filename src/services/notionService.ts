import { createFetcher } from "@/utils/fetcher"

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

export async function logUnmatchedQuestion(question: string) {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) throw new Error("NOTION_DATABASE_ID is not set")

  const tags = detectTags(question)

  await notionApi.post("/pages", {
    parent: { database_id: databaseId },
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
