/**
 * Fallback message definitions and utilities
 * Contains messages and configurations for when no response matches
 */

/**
 * Fallback messages when no keyword matches
 * Text in [brackets] will be converted to clickable chips
 */
export const fallbackMessages: string[] = [
  // double links
  "🤔 Not sure about that, but are you interested in my [Background] or the [Tech Stacks] I use?",
  "I'm still learning that! Would you rather hear about my [Business Impact] or how I [Solve Problems]?",
  "Good question! I specialize in Frontend—want to see my [AI Workflow] or how I [Collaborate] with teams?",
  "That's a bit tricky for me! How about my [Transition Story] from design or my [Current Studies] at OSU?",
  // single link
  "Oops, my data is limited there! Should we talk about [Code Quality] or the [Team Culture] I'm seeking?",
  "I might need more context for that. In the meantime, feel free to check my [Latest Impact]!",
  "Thinking... Actually, I'd love to show you how I bridge design and code through [Collaboration]!",
  "I'm still training on that topic! Maybe you'd like to know about my [Continuous Learning] journey?",
  "I'm not sure I follow... but I can definitely tell you what [Frontend Tools] I'm proficient in!",
  "Interesting! While I don't have an answer yet, you might find my [Career Transition] interesting!"
]

/**
 * Maps fallback message clickable text to heroResponseDef IDs
 * Allows chips in fallback messages to trigger the correct question
 */
export const fallbackChipMapping: Record<string, string> = {
  // introduction
  "Background": "introduction",
  
  // impact
  "Business Impact": "impact",
  "Measurable Impacts": "impact",
  "Latest Impact": "impact",
  
  // techStacks
  "Tech Stacks": "techStacks",
  "Frontend Tech Stack": "techStacks",
  "Frontend Tools": "techStacks",
  
  // problemSolving
  "Solve Problems": "problemSolving",
  "Complex Problems": "problemSolving",
  
  // careerTransition
  "Transition Story": "careerTransition",
  "Career Transition": "careerTransition",
  
  // collaboration
  "Collaborate": "collaboration",
  "Collaboration": "collaboration",
  "Collaborate with Designers": "collaboration",
  
  // aiIntegration
  "AI Workflow": "aiIntegration",
  
  // qualityControl
  "Code Quality": "qualityControl",
  
  // continuousLearning
  "Current Studies": "continuousLearning",
  "Continuous Learning": "continuousLearning",
  
  // teamCulture
  "Team Culture": "teamCulture",
}

/**
 * Get random fallback message
 */
export function getRandomFallback(): string {
  return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)]
}
