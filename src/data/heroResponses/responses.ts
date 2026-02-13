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
    id: "introduction",
    keywords: ["who", "introduce", "introduction", "about", "yourself", "background", "bio", "experience"],
    chipLabel: "👤 Introduction",
    fullQuestion: "Who are you?",
  },
  {
    id: "impact",
    keywords: ["impact", "revenue", "results", "growth", "15%", "business", "value", "achievement", "waca", "sales", "merchant"],
    chipLabel: "🚀 High Impact",
    fullQuestion: "What are the measurable impacts you've delivered in your projects?",
  },
  {
    id: "techStacks",
    keywords: ["stack", "tech", "skills", "frontend", "react", "vue", "typescript", "javascript", "python", "css", "sass", "tailwind"],
    chipLabel: "🛠️ Tech Stack",
    fullQuestion: "What technologies and tools do you work with?",
  },
  {
    id: "problemSolving",
    keywords: ["problem", "bug", "challenge", "difficult", "solved", "debugging", "legacy", "refactor", "modernize", "jquery"],
    chipLabel: "💡 Problem Solving",
    fullQuestion: "Can you describe a challenging technical bug or problem you solved?",
  },
  {
    id: "careerTransition",
    keywords: ["transition", "career change", "switch", "design", "industrial design", "ncku", "why", "designer"],
    chipLabel: "🔄 Career Transition",
    fullQuestion: "Why did you transition from Industrial Design to Front-End Engineering?",
  },
  {
    id: "collaboration",
    keywords: ["collaboration", "teamwork", "designer", "backend", "communication", "pm", "agile", "scrum", "workflow", "bridge"],
    chipLabel: "🤝 Collaboration",
    fullQuestion: "How do you collaborate with designers and backend teams?",
  },
  {
    id: "aiIntegration",
    keywords: ["ai", "copilot", "cursor", "workflow", "efficiency", "gpt", "prompt", "automation", "agent"],
    chipLabel: "🤖 AI Integration",
    fullQuestion: "Which AI tools do you integrate into your daily workflow, and how?",
  },
  {
    id: "qualityControl",
    keywords: ["quality", "maintainability", "clean code", "testing", "storybook", "documentation", "typescript", "review", "robust"],
    chipLabel: "🔎 Quality Control",
    fullQuestion: "How do you ensure the maintainability and quality of your code?",
  },
  {
    id: "continuousLearning",
    keywords: ["learning", "updated", "stay current", "osu", "university", "cs degree", "trends", "growth", "algorithm", "data structure"],
    chipLabel: "📚 Continuous Learning",
    fullQuestion: "How do you stay updated with the rapidly evolving AI and Frontend landscape?",
  },
  {
    id: "teamCulture",
    keywords: ["culture", "looking for", "company", "environment", "remote", "international", "relocate", "values", "philosophy"],
    chipLabel: "🏢 Team Culture",
    fullQuestion: "What kind of team or company culture are you looking for?"
  }
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
