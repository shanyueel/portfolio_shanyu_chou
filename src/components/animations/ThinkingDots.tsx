"use client"

/**
 * ThinkingDots - Animated thinking indicator with three pulsating dots
 */
const ThinkingDots = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <span className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-primary animate-[thinking_1.4s_ease-in-out_0s_infinite_both]" />
        <span className="w-2 h-2 rounded-full bg-primary animate-[thinking_1.4s_ease-in-out_0.2s_infinite_both]" />
        <span className="w-2 h-2 rounded-full bg-primary animate-[thinking_1.4s_ease-in-out_0.4s_infinite_both]" />
      </span>
      <span className="text-sm text-dark dark:text-light">Thinking...</span>
    </div>
  )
}

export default ThinkingDots
