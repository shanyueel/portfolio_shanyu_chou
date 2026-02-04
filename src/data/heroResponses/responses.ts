/**
 * Hero response definitions and utilities
 * Contains the main Q&A response configurations
 */

/**
 * Hero Response definition
 */
export interface HeroResponseDef {
  id: string
  keywords: string[]
  chipLabel: string
  fullQuestion: string // The complete question to display in chat
}

/**
 * All available hero responses
 */
export const heroResponseDefs: HeroResponseDef[] = [
  {
    id: "impact",
    keywords: ["impact", "revenue", "results", "money", "15%", "business", "value"],
    chipLabel: "🚀 High Impact",
    fullQuestion: "What are the measurable impacts you've delivered in your projects?",
  },
  {
    id: "tech",
    keywords: ["stack", "tech", "skills", "frontend", "react", "vue", "typescript"],
    chipLabel: "🛠 Tech Stack",
    fullQuestion: "What technologies and tools do you work with?",
  },
]

/**
 * Find matching response definition based on query
 */
export function findMatchingResponse(query: string): HeroResponseDef | null {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return null

  return (
    heroResponseDefs.find((response) =>
      response.keywords.some((keyword) => lowerQuery.includes(keyword.toLowerCase()))
    ) || null
  )
}

/**
 * Find matching response definition based on id
 */
export function findResponseById(id: string): HeroResponseDef | null {
  return heroResponseDefs.find((response) => response.id === id) || null
}
