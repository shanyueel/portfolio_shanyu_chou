/**
 * Fallback message definitions and utilities
 * Contains messages and configurations for when no response matches
 */

/**
 * Fallback messages when no keyword matches
 * Text in [brackets] will be converted to clickable chips
 */
export const fallbackMessages: string[] = [
  "Hmm, that's a tricky one! Try asking about my [Projects] or [Tech Stacks]!",
  "I'm still learning about that! Meanwhile, check out my [Impact] or [Contact Info].",
  "Oops, that's beyond my training data! How about my [Work Experience]?",
  "Good question! I specialize in Frontend stuff—ask me about [React] or [Vue]!",
  "🤔 Not sure about that one... but I know a lot about [E-commerce] and [UI Design]!",
]

/**
 * Maps fallback message clickable text to heroResponseDef IDs
 * Allows chips in fallback messages to trigger the correct question
 */
export const fallbackChipMapping: Record<string, string> = {
  "Introduction": "introduction",
  "Tech Stacks": "techStacks",
  "Impact": "impact",
  // Items without direct mapping will use the text as-is for query
  "Projects": "",
  "Contact Info": "",
  "Work Experience": "",
  "React": "",
  "Vue": "",
  "E-commerce": "",
  "UI Design": "",
}

/**
 * Get random fallback message
 */
export function getRandomFallback(): string {
  return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)]
}
