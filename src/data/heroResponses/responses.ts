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
  /**
   * Every phrasing this response should answer to, most canonical first.
   *
   * These are the anchors the semantic matcher embeds, so their coverage
   * determines what the matcher can recognise. Write them across eight angles —
   * each entry is tagged inline with the one it covers:
   *
   *   1 direct       the plain question            "What's your tech stack?"
   *   2 colloquial   how someone actually types    "What do you build things with?"
   *   3 interview    formal / recruiter framing    "Walk me through your experience"
   *   4 abbreviated  a fragment or single word     "frameworks?"
   *   5 oblique      indirect or either/or         "Vue or React?"
   *   6 narrative    imperative mood, not a question — embeds differently
   *   7 skeptical    the doubting register         "How deep does that really go?"
   *   8 evidence     asks you to prove it          "Which have you shipped?"
   *
   * Entries 9+ are free slots for phrasings the eight angles miss.
   *
   * One rule: every entry must be self-identifying WITHOUT context. "Can you
   * give me an example?" fits angle 8 and is useless — with no topic words it
   * sits near all 17 responses and erodes the margin between them. Change the
   * framing, never drop the subject.
   *
   * Entry [0] doubles as the display text shown in chat when a chip is clicked —
   * read it via getCanonicalQuestion(), never by indexing directly.
   */
  questionVariants: string[]
}

/**
 * The canonical phrasing of a response, shown in the chat transcript when a
 * visitor clicks its chip.
 *
 * This is the only place that depends on questionVariants[0] being the most
 * canonical entry. Keep it that way: if the ordering contract ever needs to
 * change, changing it here is enough.
 */

export function getCanonicalQuestion(def: HeroResponseDef): string {
  return def.questionVariants[0]
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
    questionVariants: [
      "Who are you?",                                                         // 1 direct
      "So what's your story?",                                                // 2 colloquial
      "Walk me through your background from the top",                         // 3 interview
      "about you?",                                                           // 4 abbreviated
      "How would a former colleague describe you?",                           // 5 oblique
      "Tell me how you got to where you are now",                             // 6 narrative
      "Why should I be interested in your profile?",                          // 7 skeptical
      "What's the one-line summary a hiring manager should remember?",        // 8 evidence
      "Who is Shanyu Chou?",                                                  // 9 extra
      "Give me the short version of your career so far",                      // 10 extra
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
    questionVariants: [
      "What are the measurable impacts you've delivered in your projects?",   // 1 direct
      "Did your work actually change anything?",                              // 2 colloquial
      "Walk me through a business result you were accountable for",           // 3 interview
      "metrics?",                                                             // 4 abbreviated
      "If your last team lost you, which number would drop?",                 // 5 oblique
      "Tell me about a feature you shipped and what it changed",              // 6 narrative
      "Can you back up those percentages with real context?",                 // 7 skeptical
      "Which KPIs improved because of code you wrote?",                       // 8 evidence
      "What business results came out of your frontend work?",                // 9 extra
      "How did WACA benefit from what you built?",                            // 10 extra
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
    questionVariants: [
      "What technologies and tools do you work with?",                        // 1 direct
      "What do you code in these days?",                                      // 2 colloquial
      "Walk me through your technical experience",                            // 3 interview
      "stack?",                                                               // 4 abbreviated
      "Vue or React — which do you reach for first?",                         // 5 oblique
      "Tell me what a typical project looks like in your hands",              // 6 narrative
      "How deep does your TypeScript knowledge actually go?",                 // 7 skeptical
      "Which technologies have you shipped production code in?",              // 8 evidence
      "What does your frontend toolchain look like?",                         // 9 extra
      "Which libraries and frameworks do you know best?",                     // 10 extra
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
    questionVariants: [
      "Can you describe a challenging technical bug or problem you solved?",  // 1 direct
      "What's the worst bug you've ever dealt with?",                         // 2 colloquial
      "Take me through your debugging methodology",                           // 3 interview
      "debugging?",                                                           // 4 abbreviated
      "When the stack trace tells you nothing, what do you do next?",         // 5 oblique
      "Tell me about a defect you chased down to its root cause",             // 6 narrative
      "How do you know you fixed the cause and not the symptom?",             // 7 skeptical
      "Give me a specific bug and the fix you shipped for it",                // 8 evidence
      "How do you troubleshoot an issue you can't reproduce?",                // 9 extra
      "What technical obstacle took you longest to resolve?",                 // 10 extra
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
    questionVariants: [
      "Why did you transition from Industrial Design to Front-End Engineering?",// 1 direct
      "How'd you go from designing hardware to writing code?",                // 2 colloquial
      "Walk me through the pivot in your career path",                        // 3 interview
      "career change?",                                                       // 4 abbreviated
      "What does industrial design give you that most engineers lack?",       // 5 oblique
      "Tell me the story of how you started programming",                     // 6 narrative
      "Wasn't it risky to give up an established design career?",             // 7 skeptical
      "What did you actually do to retrain as a developer?",                  // 8 evidence
      "Why front-end specifically, rather than another kind of engineering?", // 9 extra
      "How does your CMF design background show up in your work now?",        // 10 extra
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
    questionVariants: [
      "How do you collaborate with designers and backend teams?",             // 1 direct
      "How do you get on with the rest of the team?",                         // 2 colloquial
      "Describe your role inside a cross-functional team",                    // 3 interview
      "teamwork?",                                                            // 4 abbreviated
      "When design and backend disagree, where do you sit?",                  // 5 oblique
      "Tell me how a feature travels from design file to shipped code with you",// 6 narrative
      "Do you actually talk to backend engineers, or just consume their APIs?",// 7 skeptical
      "Give me an example of you unblocking another discipline",              // 8 evidence
      "How do you run a handoff with designers?",                             // 9 extra
      "What's your part in sprint planning and stand-ups?",                   // 10 extra
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
    questionVariants: [
      "Which AI tools do you integrate into your daily workflow, and how?",   // 1 direct
      "Do you let AI write your code?",                                       // 2 colloquial
      "Describe how AI fits into your development process",                   // 3 interview
      "AI tools?",                                                            // 4 abbreviated
      "Which parts of your workflow are AI-assisted and which aren't?",       // 5 oblique
      "Tell me how a feature gets built with AI in the loop",                 // 6 narrative
      "Isn't leaning on AI a shortcut around real understanding?",            // 7 skeptical
      "Which AI-assisted work of yours has actually shipped?",                // 8 evidence
      "How do you prompt effectively while coding?",                          // 9 extra
      "Which AI tooling changed your productivity most?",                     // 10 extra
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
    questionVariants: [
      "How do you ensure the maintainability and quality of your code?",      // 1 direct
      "How do you keep your code from turning into a mess?",                  // 2 colloquial
      "Describe the engineering standards you hold yourself to",              // 3 interview
      "testing?",                                                             // 4 abbreviated
      "What would a reviewer notice first in your pull request?",             // 5 oblique
      "Tell me how a component of yours gets documented and tested",          // 6 narrative
      "Do you really write tests when the deadline is tight?",                // 7 skeptical
      "Which tooling enforces code quality in your projects?",                // 8 evidence
      "How do you use Storybook and type safety day to day?",                 // 9 extra
      "What does maintainable frontend code mean to you?",                    // 10 extra
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
    questionVariants: [
      "How do you stay updated with the rapidly evolving AI and Frontend landscape?",// 1 direct
      "How do you keep from getting rusty?",                                  // 2 colloquial
      "Describe your approach to professional development",                   // 3 interview
      "studying?",                                                            // 4 abbreviated
      "What did you not know a year ago that you now use weekly?",            // 5 oblique
      "Tell me how you picked up an unfamiliar framework",                    // 6 narrative
      "Is going back for a CS degree really worth it at this stage?",         // 7 skeptical
      "What have you completed at Oregon State so far?",                      // 8 evidence
      "How quickly can you ramp up on an unfamiliar codebase?",               // 9 extra
      "What does your learning routine look like outside work?",              // 10 extra
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
    questionVariants: [
      "What kind of team or company culture are you looking for?",            // 1 direct
      "What sort of place do you want to work at?",                           // 2 colloquial
      "Describe the environment where you do your best work",                 // 3 interview
      "culture fit?",                                                         // 4 abbreviated
      "What would make you turn down an otherwise good offer?",               // 5 oblique
      "Tell me about a team dynamic that really worked for you",              // 6 narrative
      "Isn't every company claiming those same values?",                      // 7 skeptical
      "Which of our working practices would matter most to you?",             // 8 evidence
      "Are you open to remote or internationally distributed teams?",         // 9 extra
      "How much does psychological safety matter to you?",                    // 10 extra
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
    questionVariants: [
      "Tell me about the most challenging project you've worked on.",         // 1 direct
      "What's the biggest thing you've ever taken on?",                       // 2 colloquial
      "Describe a project where you owned the outcome end to end",            // 3 interview
      "hardest project?",                                                     // 4 abbreviated
      "Which project would you approach differently with hindsight?",         // 5 oblique
      "Walk me through a migration or rewrite you led",                       // 6 narrative
      "Was that project genuinely hard, or just long?",                       // 7 skeptical
      "Which initiative did you drive from start to finish?",                 // 8 evidence
      "What large-scale change have you introduced to a team?",               // 9 extra
      "Tell me about modernising a legacy codebase",                          // 10 extra
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
    questionVariants: [
      "Describe a time you disagreed with a teammate. How was it resolved?",  // 1 direct
      "What happens when someone shoots down your idea?",                     // 2 colloquial
      "Give me an example of resolving a technical disagreement",             // 3 interview
      "conflict?",                                                            // 4 abbreviated
      "When do you concede an argument versus hold your position?",           // 5 oblique
      "Tell me about an API design debate you were part of",                  // 6 narrative
      "Do you actually push back, or just go along with it?",                 // 7 skeptical
      "How did one specific disagreement end up being settled?",              // 8 evidence
      "How do you persuade someone more senior to change approach?",          // 9 extra
      "How do you work with a difficult colleague?",                          // 10 extra
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
    questionVariants: [
      "What's your biggest weakness, and how are you working on it?",         // 1 direct
      "What are you bad at?",                                                 // 2 colloquial
      "Tell me about a development area you've identified in yourself",       // 3 interview
      "weakness?",                                                            // 4 abbreviated
      "What feedback do you keep hearing more than once?",                    // 5 oblique
      "Tell me how you've worked on a personal limitation",                   // 6 narrative
      "Isn't being 'too detail-oriented' just a humblebrag?",                 // 7 skeptical
      "What are you doing concretely to improve that trait?",                 // 8 evidence
      "Where do you tend to hold yourself back?",                             // 9 extra
      "What habit are you trying to change about how you work?",              // 10 extra
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
    questionVariants: [
      "How do you handle tight deadlines or competing priorities?",           // 1 direct
      "What do you do when there's simply too much to do?",                   // 2 colloquial
      "Describe how you manage scope against a fixed date",                   // 3 interview
      "priorities?",                                                          // 4 abbreviated
      "What's the first thing you cut when time runs short?",                 // 5 oblique
      "Tell me about a release you had to ship under real pressure",          // 6 narrative
      "Do you push back on deadlines, or just work later?",                   // 7 skeptical
      "How did you scope a project that was too big for its timeline?",       // 8 evidence
      "How do you estimate work you've never done before?",                   // 9 extra
      "How do you handle competing requests from different stakeholders?",    // 10 extra
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
    questionVariants: [
      "Describe a time you made a mistake. What did you do about it?",        // 1 direct
      "When did you last mess something up?",                                 // 2 colloquial
      "Give me an example of a failure and what it taught you",               // 3 interview
      "biggest mistake?",                                                     // 4 abbreviated
      "Which assumption of yours cost the most time?",                        // 5 oblique
      "Tell me about a bug you shipped and how you handled the fallout",      // 6 narrative
      "Do you own your errors openly, or quietly fix them?",                  // 7 skeptical
      "What changed in your process after that went wrong?",                  // 8 evidence
      "How do you react when you realise you were wrong?",                    // 9 extra
      "Tell me about effort you wasted and take responsibility for",          // 10 extra
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
    questionVariants: [
      "Why are you looking for a new role?",                                  // 1 direct
      "Why'd you leave?",                                                     // 2 colloquial
      "Walk me through your reason for making a move now",                    // 3 interview
      "why leaving?",                                                         // 4 abbreviated
      "What did your last role stop giving you?",                             // 5 oblique
      "Tell me what happened at the end of your time at WACA",                // 6 narrative
      "Were you let go, or did you choose to leave?",                         // 7 skeptical
      "What have you been doing since you left?",                             // 8 evidence
      "What's your current employment status?",                               // 9 extra
      "Why did you resign from your last company?",                           // 10 extra
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
    questionVariants: [
      "Where do you see yourself in 3–5 years?",                              // 1 direct
      "What do you want to be doing down the road?",                          // 2 colloquial
      "Describe your long-term professional plan",                            // 3 interview
      "career goals?",                                                        // 4 abbreviated
      "What would make a role a stepping stone rather than a destination?",   // 5 oblique
      "Tell me what the next stage of your growth looks like",                // 6 narrative
      "Is senior engineer really your ceiling?",                              // 7 skeptical
      "Which skills are you deliberately building toward that?",              // 8 evidence
      "Do you want to specialise deeply or stay broad?",                      // 9 extra
      "What kind of engineer are you trying to become?",                      // 10 extra
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
 * Minimum aggregated score for a Fuse match to count.
 *
 * A single strong fuzzy match scores ~0.65 and one generic single-word keyword
 * hit scores 0.8, so 1.0 requires genuine corroboration: two hits, a multi-word
 * keyword, or a strong Layer 3 sentence match (which carries a x1.2 boost).
 */
const MIN_SCORE = 1.0

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
  //
  // Hits are weighted by keyword specificity. A multi-word keyword ("github
  // copilot", "career change") is inherently unambiguous and scores enough to
  // clear the threshold alone. A single generic word ("ai", "team", "react")
  // deliberately scores BELOW the threshold, so it needs corroboration from a
  // second hit or from the fuzzy layers to win.
  //
  // This is the fix for the off-topic leak: "do you like AI art?" hits only the
  // lone keyword "ai".
  for (const def of heroResponseDefs) {
    let score = 0
    let hits = 0

    for (const kw of def.keywords) {
      const escaped = kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      if (new RegExp(`\\b${escaped}\\b`, "i").test(lowerQuery)) {
        hits++

        // Multi-word keywords are unambiguous and score higher
        score += kw.includes(" ") ? 2 : 0.8
      }
    }

    if (hits > 0) scoreMap.set(def.id, score)
  }

  // Fast path: exactly one response matched, and it cleared the threshold on
  // keyword evidence alone — no need to run the fuzzy layers.
  if (scoreMap.size === 1) {
    const [winnerId] = scoreMap.keys()
    if ((scoreMap.get(winnerId) ?? 0) >= MIN_SCORE) {
      return heroResponseDefs.find((def) => def.id === winnerId) ?? null
    }
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

  if (bestScore < MIN_SCORE) return null

  return heroResponseDefs.find((def) => def.id === bestId) ?? null
}

/**
 * Find matching response definition based on id
 */
export function findResponseById(id: string): HeroResponseDef | null {
  return heroResponseDefs.find((response) => response.id === id) || null
}
