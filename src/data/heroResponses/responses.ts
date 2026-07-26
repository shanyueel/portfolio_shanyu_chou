/**
 * Hero response definitions and utilities
 * Contains the main Q&A response configurations
 * Uses Fuse.js for fuzzy search matching
 */
import Fuse from "fuse.js"
import { removeStopwords, eng } from "stopword"

/**
 * Hero Response definition
 */
export interface HeroResponseDef {
  id: string
  keywords: string[]
  chipLabel: string
  fullQuestion: string // The complete question to display in chat
  questionVariants: string[] // Alternative phrasings for Layer 3 fuzzy matching
}

/**
 * All available hero responses
 */
export const heroResponseDefs: HeroResponseDef[] = [
  {
    id: "introduction",
    keywords: [
      "who", "introduce", "introduction", "about", "yourself", "background", "bio",
      "tell me about you", "self introduction", "who is shanyu", "portfolio owner",
      "who are you", "about you", "your story", "describe yourself", "summary",
      "hello", "meet", "get to know", "shanyu", "shan-yu",
      "walk me through", "elevator pitch", "resume", "cv", "profile",
      "what do you do", "clevo", "laptop designer",
    ],
    chipLabel: "👤 Introduction",
    fullQuestion: "Who are you?",
    questionVariants: [
      "Who are you?",
      "Tell me about yourself",
      "Can you introduce yourself?",
      "What's your background?",
      "Give me a quick summary of who you are",
      "Walk me through your background",
    ],
  },
  {
    id: "impact",
    keywords: [
      "impact", "revenue", "results", "15%", "business", "achievement", "waca", "sales", "merchant",
      "measurable", "delivered", "kpi", "roi", "metrics", "ecommerce", "e-commerce",
      "outcome", "contribution", "data-driven", "conversion", "optimize",
      "60%", "2000", "data warehouse",
    ],
    chipLabel: "🚀 High Impact",
    fullQuestion: "What are the measurable impacts you've delivered in your projects?",
    questionVariants: [
      "What are the measurable impacts you've delivered in your projects?",
      "What results have you achieved?",
      "Can you show me some numbers or metrics?",
      "What's your most impressive achievement?",
      "How did you add business value?",
      "Tell me about your impact at WACA",
    ],
  },
  {
    id: "techStacks",
    keywords: [
      "stack", "tech", "skills", "frontend", "react", "vue", "typescript", "javascript", "python", "css", "sass", "tailwind",
      "next.js", "nextjs", "node", "frameworks", "programming language", "technology",
      "html", "web development", "library", "proficient", "expertise", "languages",
      "framer motion", "graphql", "rest api", "webpack", "vite",
      "redux", "pinia", "storybook", "firebase", "postman",
    ],
    chipLabel: "🛠️ Tech Stack",
    fullQuestion: "What technologies and tools do you work with?",
    questionVariants: [
      "What technologies and tools do you work with?",
      "What's your tech stack?",
      "What programming languages do you know?",
      "What frameworks are you experienced with?",
      "What can you code in?",
      "What are your technical skills?",
    ],
  },
  {
    id: "problemSolving",
    keywords: [
      "problem", "bug", "challenge", "difficult", "solved", "debugging", "legacy", "refactor", "modernize",
      "fix", "issue", "resolve", "technical challenge", "troubleshoot",
      "obstacle", "bottleneck", "complex", "hard problem", "root cause",
      "migrate", "migration", "upgrade", "workaround",
      "date picker", "spaghetti code", "decoupling", "logic controller",
    ],
    chipLabel: "💡 Problem Solving",
    fullQuestion: "Can you describe a challenging technical bug or problem you solved?",
    questionVariants: [
      "Can you describe a challenging technical bug or problem you solved?",
      "Tell me about a difficult problem you solved",
      "What's the hardest technical challenge you've faced?",
      "How do you approach debugging?",
      "Give me an example of a complex problem you fixed",
    ],
  },
  {
    id: "careerTransition",
    keywords: [
      "transition", "career change", "switch", "industrial design", "ncku",
      "changed career", "pivot", "background shift", "from designer to dev",
      "why frontend", "motivation", "how did you start", "origin story",
      "design background", "career path", "journey",
      "become a developer", "become engineer", "started coding", "started programming",
      "what made you", "how did you become", "why did you choose",
      "cmf designer", "left design",
    ],
    chipLabel: "🔄 Career Transition",
    fullQuestion: "Why did you transition from Industrial Design to Front-End Engineering?",
    questionVariants: [
      "Why did you transition from Industrial Design to Front-End Engineering?",
      "Why did you switch careers?",
      "How did you become a developer?",
      "What made you leave design for engineering?",
      "Tell me about your career change",
      "How did you start coding?",
    ],
  },
  {
    id: "collaboration",
    keywords: [
      "collaboration", "teamwork", "backend", "communication", "agile", "scrum", "bridge",
      "cross-functional", "team", "work together", "stakeholder",
      "product manager", "sprint", "stand-up", "pair programming",
      "coordinate", "cooperate", "handoff",
      "technical consultation", "adapter layer", "milestone",
    ],
    chipLabel: "🤝 Collaboration",
    fullQuestion: "How do you collaborate with designers and backend teams?",
    questionVariants: [
      "How do you collaborate with designers and backend teams?",
      "How do you work with your team?",
      "Tell me about your teamwork experience",
      "How do you handle cross-functional collaboration?",
      "How do you communicate with product managers?",
      "What's your approach to working with others?",
    ],
  },
  {
    id: "aiIntegration",
    keywords: [
      "ai", "copilot", "cursor", "efficiency", "gpt", "prompt", "automation", "agent",
      "chatgpt", "llm", "gemini", "claude", "artificial intelligence", "machine learning",
      "ai tools", "productivity", "github copilot", "coding assistant",
      "prompt engineering", "ai workflow", "automate",
      "antigravity", "claude code", "ai-assisted",
    ],
    chipLabel: "🤖 AI Integration",
    fullQuestion: "Which AI tools do you integrate into your daily workflow, and how?",
    questionVariants: [
      "Which AI tools do you integrate into your daily workflow, and how?",
      "How do you use AI in your work?",
      "Do you use GitHub Copilot or ChatGPT?",
      "What's your AI-assisted development workflow?",
      "How does AI help you code?",
      "Tell me about your experience with AI tools",
    ],
  },
  {
    id: "qualityControl",
    keywords: [
      "quality", "maintainability", "clean code", "testing", "storybook", "documentation", "robust",
      "unit test", "code review", "best practices", "lint", "ci/cd",
      "eslint", "prettier", "jest", "cypress", "test coverage",
      "scalable", "reliable", "standard",
      "type safety", "visual testing", "tdd", "test-driven",
    ],
    chipLabel: "🔎 Quality Control",
    fullQuestion: "How do you ensure the maintainability and quality of your code?",
    questionVariants: [
      "How do you ensure the maintainability and quality of your code?",
      "How do you write clean code?",
      "What's your approach to testing?",
      "How do you maintain code quality?",
      "Do you use Storybook or unit tests?",
      "What are your coding best practices?",
    ],
  },
  {
    id: "continuousLearning",
    keywords: [
      "learning", "stay current", "osu", "university", "cs degree", "trends", "algorithm", "data structure",
      "study", "course", "degree", "self-taught", "bootcamp", "education",
      "online course", "certificate", "continuous improvement", "upskill",
      "oregon state", "computer science", "latest trends",
      "keep learning", "new things", "evolving", "staying sharp",
      "how do you learn", "what are you studying", "professional development",
      "lifelong learner", "learn quickly", "learn fast", "ramp up", "onboarding",
      "learn something quickly", "learn something new", "get up to speed",
      "pick up a new framework", "learning curve", "official documentation",
    ],
    chipLabel: "📚 Continuous Learning",
    fullQuestion: "How do you stay updated with the rapidly evolving AI and Frontend landscape?",
    questionVariants: [
      "How do you stay updated with the rapidly evolving AI and Frontend landscape?",
      "How do you keep learning?",
      "What are you currently studying?",
      "How do you stay up to date with technology?",
      "Are you pursuing any degrees or courses?",
      "How do you improve your skills?",
      "Tell me about a time you had to learn something quickly",
    ],
  },
  {
    id: "teamCulture",
    keywords: [
      "culture", "looking for", "company", "environment", "remote", "international", "relocate", "values", "philosophy",
      "work-life balance", "startup", "open source", "diversity", "hybrid", "onsite",
      "ideal team", "work style", "flexible", "inclusive",
      "what kind of company", "where do you want to work",
      "psychological safety", "product-centric", "global collaboration",
    ],
    chipLabel: "🏢 Team Culture",
    fullQuestion: "What kind of team or company culture are you looking for?",
    questionVariants: [
      "What kind of team or company culture are you looking for?",
      "What's your ideal work environment?",
      "Are you open to remote work?",
      "What kind of company do you want to work for?",
      "Do you prefer startups or big companies?",
      "Would you relocate for a job?",
    ],
  },
  {
    id: "challengingProject",
    keywords: [
      "challenging project", "hardest project", "biggest project", "toughest project",
      "most difficult project", "proud of", "led a project", "initiative",
      "workflow", "development process", "process improvement", "change management",
      "jquery", "laravel", "legacy codebase", "component library", "design system",
      "mpa", "spa", "incremental migration", "team adoption", "prototype",
    ],
    chipLabel: "🏔️ Challenging Project",
    fullQuestion: "Tell me about the most challenging project you've worked on.",
    questionVariants: [
      "Tell me about the most challenging project you've worked on.",
      "What's the biggest project you've led?",
      "Describe a challenging project and how you handled it",
      "What project are you most proud of?",
      "Tell me about a time you drove a big change on your team",
    ],
  },
  {
    id: "handlingDisagreement",
    keywords: [
      "disagree", "disagreement", "conflict", "argument", "pushback", "tension",
      "convince", "persuade", "compromise", "deadlock", "different opinion",
      "api design", "endpoint", "abstraction layer", "difficult colleague",
      "how do you handle conflict", "stand your ground",
    ],
    chipLabel: "⚖️ Handling Disagreement",
    fullQuestion: "Describe a time you disagreed with a teammate. How was it resolved?",
    questionVariants: [
      "Describe a time you disagreed with a teammate. How was it resolved?",
      "Tell me about a conflict at work",
      "How do you handle disagreements with colleagues?",
      "Have you ever pushed back on another engineer?",
      "Tell me about a time you had to convince someone",
    ],
  },
  {
    id: "selfAwareness",
    keywords: [
      "weakness", "weaknesses", "shortcoming", "flaw", "struggle with",
      "improve yourself", "self-awareness", "blind spot", "working on",
      "quiet", "introvert", "speak up", "speaking up", "confidence",
      "biggest weakness", "what do you need to work on",
    ],
    chipLabel: "🪞 Self-Awareness",
    fullQuestion: "What's your biggest weakness, and how are you working on it?",
    questionVariants: [
      "What's your biggest weakness, and how are you working on it?",
      "What's your greatest weakness?",
      "What are you working to improve about yourself?",
      "Where do you struggle?",
      "What feedback have you received about yourself?",
    ],
  },
  {
    id: "prioritization",
    keywords: [
      "deadline", "deadlines", "tight timeline", "time pressure", "priorities",
      "prioritize", "prioritization", "competing", "scope", "scoping", "trade-off",
      "estimate", "estimation", "schedule", "under pressure", "too much work",
      "ship on time", "cut scope", "minimum viable",
    ],
    chipLabel: "⏱️ Deadlines & Priorities",
    fullQuestion: "How do you handle tight deadlines or competing priorities?",
    questionVariants: [
      "How do you handle tight deadlines or competing priorities?",
      "How do you work under pressure?",
      "How do you prioritize your work?",
      "What do you do when the scope is too big for the timeline?",
      "Tell me about a time you had to ship on a tight deadline",
    ],
  },
  {
    id: "learningFromMistakes",
    keywords: [
      "mistake", "mistakes", "failure", "failed", "went wrong", "messed up",
      "regret", "wasted time", "lesson learned", "what did you learn",
      "dropdown", "assumption", "assumed", "misunderstood",
      "tell me about a failure", "biggest mistake",
    ],
    chipLabel: "🧭 Learning From Mistakes",
    fullQuestion: "Describe a time you made a mistake. What did you do about it?",
    questionVariants: [
      "Describe a time you made a mistake. What did you do about it?",
      "Tell me about a time you failed",
      "What's the biggest mistake you've made at work?",
      "How do you handle your own mistakes?",
      "Tell me about something that went wrong",
    ],
  },
  {
    id: "whyNewRole",
    keywords: [
      "why leaving", "leaving", "left waca", "quit", "resigned", "new job",
      "why are you looking", "job search", "next role", "next opportunity",
      "career move", "available", "notice period", "current status",
      "why did you leave", "employment gap", "career break",
    ],
    chipLabel: "🚪 Why a New Role",
    fullQuestion: "Why are you looking for a new role?",
    questionVariants: [
      "Why are you looking for a new role?",
      "Why did you leave your last company?",
      "Why are you leaving WACA?",
      "What are you looking for in your next job?",
      "What have you been doing since you left?",
    ],
  },
  {
    id: "careerGoals",
    keywords: [
      "career goals", "future", "five years", "3-5 years", "long term",
      "ambition", "aspiration", "where do you see yourself", "next step",
      "grow into", "growth", "senior", "own a product", "end-to-end",
      "what do you want to become", "career plan",
    ],
    chipLabel: "🔭 Career Goals",
    fullQuestion: "Where do you see yourself in 3–5 years?",
    questionVariants: [
      "Where do you see yourself in 3–5 years?",
      "What are your long-term career goals?",
      "What do you want to grow into?",
      "What's your next step after this role?",
      "What kind of engineer do you want to become?",
    ],
  },
]

// ---------------------------------------------------------------------------
// Search infrastructure
// ---------------------------------------------------------------------------

/**
 * Flat keyword index entry — one record per keyword per response.
 * Allows Fuse.js to compare short tokens against short keywords (word-to-word).
 */
interface KeywordEntry {
  responseId: string
  keyword: string
}

const keywordEntries: KeywordEntry[] = heroResponseDefs.flatMap((def) =>
  def.keywords.map((kw) => ({ responseId: def.id, keyword: kw }))
)

/** Fuse index: token ↔ individual keyword (word-to-word matching) */
const keywordFuse = new Fuse(keywordEntries, {
  keys: ["keyword"],
  threshold: 0.35,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
})

/**
 * Flat question variant entry — one record per variant per response.
 * Allows Fuse.js to match the full query against the closest phrasing.
 */
interface QuestionEntry {
  responseId: string
  question: string
}

const questionEntries: QuestionEntry[] = heroResponseDefs.flatMap((def) =>
  def.questionVariants.map((q) => ({ responseId: def.id, question: q }))
)

/** Fuse index: full query ↔ questionVariants (sentence-level matching) */
const questionFuse = new Fuse(questionEntries, {
  keys: ["question"],
  threshold: 0.45,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 3,
})

/**
 * Tokenise a query string into meaningful words (lowercased, stop-words removed).
 * Uses the `stopword` package's English stop-word list for comprehensive filtering.
 * Minimum 3 characters to avoid fuzzy noise from very short tokens (e.g. "hi" → "kpi").
 * Short keywords like "ai" are still matched via Layer 1 exact matching.
 */
function tokenise(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length >= 3)
  return removeStopwords(words, eng)
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Find matching response definition based on query.
 *
 * Uses a three-layer unified scoring strategy:
 *  1. **Exact keyword match** — each keyword hit adds a high base score
 *  2. **Token-to-keyword fuzzy** — each query word is fuzzy-matched against keywords
 *  3. **Full-query-to-question fuzzy** — entire query matched against questionVariants
 *
 * All layers contribute to a shared scoreMap. The best scoring response
 * is returned, or `null` if nothing matches above threshold.
 */
export function findMatchingResponse(query: string): HeroResponseDef | null {
  const trimmed = query.trim()
  if (!trimmed) return null

  const lowerQuery = trimmed.toLowerCase()

  // Unified score map across all layers
  const scoreMap = new Map<string, number>()

  // ── Layer 1: Exact keyword match with word boundaries ─────────────
  for (const def of heroResponseDefs) {
    let exactHits = 0
    for (const kw of def.keywords) {
      const escaped = kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      if (new RegExp(`\\b${escaped}\\b`, "i").test(lowerQuery)) exactHits++
    }
    // Each exact hit gets a high base score (2) to prioritize layer 1
    if (exactHits > 0) scoreMap.set(def.id, exactHits * 2)
  }

  // Fast path: if exactly one response has exact hits, return immediately
  if (scoreMap.size === 1) {
    const [winnerId] = scoreMap.keys()
    return heroResponseDefs.find((def) => def.id === winnerId) ?? null
  }

  // ── Layer 2: Token-to-keyword fuzzy matching ───────────────────────
  const tokens = tokenise(trimmed)

  for (const token of tokens) {
    const hits = keywordFuse.search(token)
    // Avoid redundant accumulation by only taking the best match for this token per response
    const tokenBestScores = new Map<string, number>()
    
    for (const hit of hits) {
      // Fuse score: 0 = perfect, 1 = worst — invert so higher = better
      const matchScore = 1 - (hit.score ?? 1)
      const current = tokenBestScores.get(hit.item.responseId) ?? 0
      if (matchScore > current) {
        tokenBestScores.set(hit.item.responseId, matchScore)
      }
    }
    
    // Add token's best scores to the overall scoreMap
    for (const [id, score] of tokenBestScores) {
      const current = scoreMap.get(id) ?? 0
      scoreMap.set(id, current + score)
    }
  }

  // ── Layer 3: Full-query-to-question fuzzy matching ─────────────────
  const questionHits = questionFuse.search(trimmed)
  // Only take the best matching variant per response
  const questionBestScores = new Map<string, number>()
  
  for (const hit of questionHits) {
    const matchScore = 1 - (hit.score ?? 1)
    const current = questionBestScores.get(hit.item.responseId) ?? 0
    if (matchScore > current) {
      questionBestScores.set(hit.item.responseId, matchScore)
    }
  }

  // Add the best variant matches to the overall scoreMap
  for (const [id, score] of questionBestScores) {
    // Weight sentence-level matches slightly higher when they're strong
    const boosted = score * 1.2
    const current = scoreMap.get(id) ?? 0
    scoreMap.set(id, current + boosted)
  }

  // ── Pick the best result ───────────────────────────────────────────
  if (scoreMap.size === 0) return null

  let bestId = ""
  let bestScore = 0
  for (const [id, score] of scoreMap) {
    if (score > bestScore) {
      bestId = id
      bestScore = score
    }
  }

  // Require a minimum aggregated score to avoid weak false-positives.
  // A single strong fuzzy match scores ~0.65, so 1.0 ensures at least
  // two fuzzy hits or one strong Layer 3 sentence-level match (×1.2 boost).
  if (bestScore < 1.0) return null

  return heroResponseDefs.find((def) => def.id === bestId) ?? null
}

/**
 * Find matching response definition based on id
 */
export function findResponseById(id: string): HeroResponseDef | null {
  return heroResponseDefs.find((response) => response.id === id) || null
}
