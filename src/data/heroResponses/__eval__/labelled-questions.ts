/**
 * Labelled ground truth for `npm run eval:matcher`.
 *
 * Every case is a question a real visitor might type, paired with the response
 * it SHOULD route to — or `null` when the matcher should refuse and show the
 * fallback.
 *
 * Two rules keep this honest:
 *
 *  1. Do NOT copy wording from `questionVariants` in responses.ts. Those are the
 *     reference vectors; testing against them measures memorization and reports
 *     a meaningless ~100%. Paraphrase as a stranger would.
 *  2. Do NOT reuse sentences from `decoys.ts`. Those are embedded as negatives,
 *     so reusing them lets the decoy gate grade its own homework.
 *
 * When a real visitor question shows up in the Notion unmatched-questions log,
 * add it here with the answer you'd have wanted. That is how this set stays
 * representative instead of drifting toward whatever the model already handles.
 */
export interface LabelledQuestion {
  q: string
  /** Expected response id, or null if the matcher should refuse. */
  expected: string | null
}

export const LABELLED_QUESTIONS: LabelledQuestion[] = [
  // ── introduction ────────────────────────────────────────────────────────
  { q: "So who am I talking to here?", expected: "introduction" },
  { q: "Give me the elevator pitch on yourself", expected: "introduction" },
  { q: "I don't know anything about you, where should we start?", expected: "introduction" },
  { q: "What's your deal?", expected: "introduction" },
  { q: "Introduce yourself please", expected: "introduction" },
  { q: "Can you summarise your professional profile?", expected: "introduction" },

  // ── impact ──────────────────────────────────────────────────────────────
  { q: "What difference did your work actually make to the business?", expected: "impact" },
  { q: "Any hard numbers behind what you shipped?", expected: "impact" },
  { q: "Show me proof that your work moved the needle", expected: "impact" },
  { q: "What outcomes are you proudest of?", expected: "impact" },
  { q: "Did anything you built increase revenue?", expected: "impact" },
  { q: "How do you quantify the value you brought?", expected: "impact" },

  // ── techStacks ──────────────────────────────────────────────────────────
  { q: "What do you build things with?", expected: "techStacks" },
  { q: "Which frameworks are you comfortable in?", expected: "techStacks" },
  { q: "What's in your toolbox day to day?", expected: "techStacks" },
  { q: "Are you a React person or a Vue person?", expected: "techStacks" },
  { q: "Which programming languages do you know?", expected: "techStacks" },
  { q: "tech stak", expected: "techStacks" },
  { q: "What are you technically strongest at?", expected: "techStacks" },

  // ── problemSolving ──────────────────────────────────────────────────────
  { q: "Tell me about a nasty bug you tracked down", expected: "problemSolving" },
  { q: "How do you approach debugging something you don't understand?", expected: "problemSolving" },
  { q: "What's the trickiest thing you've had to fix?", expected: "problemSolving" },
  { q: "Walk me through your process when something breaks in production", expected: "problemSolving" },
  { q: "Give me an example of you untangling a technical mess", expected: "problemSolving" },

  // ── careerTransition ────────────────────────────────────────────────────
  { q: "Why did you leave product design for coding?", expected: "careerTransition" },
  { q: "How did you end up as an engineer without a CS degree?", expected: "careerTransition" },
  { q: "You used to do something else, right? What changed?", expected: "careerTransition" },
  { q: "What made you switch industries?", expected: "careerTransition" },
  { q: "Was moving into development a hard change for you?", expected: "careerTransition" },

  // ── collaboration ───────────────────────────────────────────────────────
  { q: "How do you work with the design team?", expected: "collaboration" },
  { q: "What's your process for handing off work with backend engineers?", expected: "collaboration" },
  { q: "How do you communicate across functions?", expected: "collaboration" },
  { q: "Do you work well with product managers?", expected: "collaboration" },
  { q: "How do you coordinate with people outside your discipline?", expected: "collaboration" },

  // ── aiIntegration ───────────────────────────────────────────────────────
  { q: "Do you use Copilot or Cursor when you code?", expected: "aiIntegration" },
  { q: "How has AI changed the way you work?", expected: "aiIntegration" },
  { q: "Where does LLM tooling fit into your workflow?", expected: "aiIntegration" },
  { q: "Are you actually using AI day to day, or just experimenting?", expected: "aiIntegration" },
  { q: "What's your take on coding assistants?", expected: "aiIntegration" },

  // ── qualityControl ──────────────────────────────────────────────────────
  { q: "How do you stop your codebase from rotting?", expected: "qualityControl" },
  { q: "Do you write tests?", expected: "qualityControl" },
  { q: "What's your approach to code review?", expected: "qualityControl" },
  { q: "How do you keep things readable for the next developer?", expected: "qualityControl" },
  { q: "How do you deal with technical debt?", expected: "qualityControl" },

  // ── continuousLearning ──────────────────────────────────────────────────
  { q: "How do you keep up when the ecosystem changes every month?", expected: "continuousLearning" },
  { q: "Where do you go to learn new things?", expected: "continuousLearning" },
  { q: "What are you studying at the moment?", expected: "continuousLearning" },
  { q: "How do you avoid falling behind technically?", expected: "continuousLearning" },
  { q: "Do you follow any newsletters or courses?", expected: "continuousLearning" },

  // ── teamCulture ─────────────────────────────────────────────────────────
  { q: "What sort of workplace brings out your best?", expected: "teamCulture" },
  { q: "What are you looking for in your next team?", expected: "teamCulture" },
  { q: "Do you prefer a startup or a big company?", expected: "teamCulture" },
  { q: "What kind of environment would make you unhappy?", expected: "teamCulture" },
  { q: "Describe your ideal working culture", expected: "teamCulture" },

  // ── challengingProject ──────────────────────────────────────────────────
  { q: "What's the hardest thing you've ever shipped?", expected: "challengingProject" },
  { q: "Tell me about a project that really stretched you", expected: "challengingProject" },
  { q: "Which piece of work pushed you the furthest?", expected: "challengingProject" },
  { q: "Was there a project you nearly couldn't pull off?", expected: "challengingProject" },
  { q: "What's the most complex system you've built?", expected: "challengingProject" },

  // ── handlingDisagreement ────────────────────────────────────────────────
  { q: "What do you do when a colleague pushes back on your approach?", expected: "handlingDisagreement" },
  { q: "Tell me about a conflict at work and how it ended", expected: "handlingDisagreement" },
  { q: "How do you handle it when someone disagrees with your technical decision?", expected: "handlingDisagreement" },
  { q: "Have you ever clashed with a teammate?", expected: "handlingDisagreement" },
  { q: "What happens when you and your PM don't see eye to eye?", expected: "handlingDisagreement" },

  // ── selfAwareness ───────────────────────────────────────────────────────
  { q: "What are you not good at?", expected: "selfAwareness" },
  { q: "Where do you still need to improve?", expected: "selfAwareness" },
  { q: "What would your last manager say you struggle with?", expected: "selfAwareness" },
  { q: "Name a shortcoming you're actively working on", expected: "selfAwareness" },
  { q: "What's your biggest professional flaw?", expected: "selfAwareness" },

  // ── prioritization ──────────────────────────────────────────────────────
  { q: "How do you decide what to work on first?", expected: "prioritization" },
  { q: "Everything is urgent — what do you do?", expected: "prioritization" },
  { q: "How do you cope when the deadline is unrealistic?", expected: "prioritization" },
  { q: "How do you juggle multiple projects at once?", expected: "prioritization" },
  { q: "What happens when two stakeholders both want their thing done now?", expected: "prioritization" },

  // ── learningFromMistakes ────────────────────────────────────────────────
  { q: "Tell me about a time you screwed something up", expected: "learningFromMistakes" },
  { q: "Have you ever broken production?", expected: "learningFromMistakes" },
  { q: "What's a failure that taught you something?", expected: "learningFromMistakes" },
  { q: "Describe an error you made and how you recovered", expected: "learningFromMistakes" },
  { q: "When did you last get something badly wrong?", expected: "learningFromMistakes" },

  // ── whyNewRole ──────────────────────────────────────────────────────────
  { q: "Why are you leaving your current job?", expected: "whyNewRole" },
  { q: "What's prompting the job search?", expected: "whyNewRole" },
  { q: "Why move on now?", expected: "whyNewRole" },
  { q: "What are you hoping to find that you don't have today?", expected: "whyNewRole" },
  { q: "What's missing in your current position?", expected: "whyNewRole" },

  // ── careerGoals ─────────────────────────────────────────────────────────
  { q: "Where do you want your career to go?", expected: "careerGoals" },
  { q: "What does the next few years look like for you?", expected: "careerGoals" },
  { q: "Do you want to become a manager eventually?", expected: "careerGoals" },
  { q: "What are you working towards long term?", expected: "careerGoals" },
  { q: "What's your ambition professionally?", expected: "careerGoals" },

  // ── Adversarial near-misses within confusable clusters ──────────────────
  // These are where "wrong answer picked" lives. Each pair is deliberately
  // close to two responses; the label is the one a human would pick.
  { q: "Why do you want to leave rather than where you're headed?", expected: "whyNewRole" },
  { q: "Long term ambition, not your reason for leaving", expected: "careerGoals" },
  { q: "Why you changed fields years ago, not why you're job hunting now", expected: "careerTransition" },
  { q: "What culture do you want, not how you work with others", expected: "teamCulture" },
  { q: "How you actually coordinate day to day with other functions", expected: "collaboration" },
  { q: "A specific argument with a coworker and its resolution", expected: "handlingDisagreement" },
  { q: "A single hard bug, not a whole hard project", expected: "problemSolving" },
  { q: "An entire project that was difficult, not one bug", expected: "challengingProject" },
  { q: "How you keep quality high, not a mistake you made", expected: "qualityControl" },
  { q: "A specific mistake you made, not your general weakness", expected: "learningFromMistakes" },
  { q: "A weakness you have, not a one-off error", expected: "selfAwareness" },
  { q: "How you keep skills current, not how self-aware you are", expected: "continuousLearning" },

  // ── Short-form and typo cases ───────────────────────────────────────────
  { q: "ur background?", expected: "introduction" },
  { q: "AI?", expected: "aiIntegration" },
  { q: "colaboration with designers", expected: "collaboration" },
  { q: "biggest weakness", expected: "selfAwareness" },
  { q: "wat frameworks u use", expected: "techStacks" },
  { q: "deadlines?", expected: "prioritization" },

  // ── Should refuse: off-topic (disjoint from decoys.ts) ──────────────────
  { q: "What's the best pizza topping?", expected: null },
  { q: "How tall is Mount Everest?", expected: null },
  { q: "Can you book me a flight to Tokyo?", expected: null },
  { q: "What's the exchange rate for the euro today?", expected: null },
  { q: "Explain quantum entanglement to me", expected: null },
  { q: "Who is the president of the United States?", expected: null },
  { q: "Sing me a song", expected: null },
  { q: "What's your favourite movie?", expected: null },
  { q: "Play some music", expected: null },
  { q: "How do I fix my printer?", expected: null },
  { q: "Convert 100 miles to kilometres", expected: null },
  { q: "Is it going to rain this weekend?", expected: null },
  { q: "Tell me about the history of the Roman Empire", expected: null },
  { q: "What stocks should I buy?", expected: null },
  { q: "Give me a recipe for banana bread", expected: null },
  { q: "asdkjhasd kjh", expected: null },
  { q: "???", expected: null },
  { q: "hello hello hello", expected: null },

  // ── Should refuse: on-topic-shaped but unsupported ──────────────────────
  // The hard cases — these clear an absolute threshold, so only the decoy gate
  // catches them. Distinct wording from decoys.ts on purpose.
  { q: "How much do you want to get paid?", expected: null },
  { q: "What's your notice period at the moment?", expected: null },
  { q: "Do you have a LinkedIn I can message you on?", expected: null },
  { q: "Would you consider a part-time contract?", expected: null },
  { q: "Can I speak to someone who managed you before?", expected: null },
  { q: "Are you legally allowed to work in the EU?", expected: null },
  { q: "Do you like AI art?", expected: null },
  { q: "What do you think of my portfolio site?", expected: null },
  { q: "Can you teach me React?", expected: null },
  { q: "Who else have you interviewed with?", expected: null },
  { q: "What did you score on your degree?", expected: null },
  { q: "Are you married or do you have kids?", expected: null },
]
