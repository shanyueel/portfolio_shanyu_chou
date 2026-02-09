"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"

interface TypewriterTextProps {
  /** The text to type out */
  text: string
  /** Speed in milliseconds per character (default: 50) */
  speed?: number
  /** Whether the typewriter effect is enabled (default: true) */
  enabled?: boolean
  /** Callback when typing completes */
  onComplete?: () => void
  /** Custom cursor className (optional) */
  cursorClassName?: string
  /** Whether to show cursor (default: true) */
  showCursor?: boolean
}

/**
 * TypewriterText - A component that displays text with a typewriter animation effect
 * 
 * @example
 * ```tsx
 * <TypewriterText 
 *   text="Hello, World!"
 *   speed={50}
 *   enabled={true}
 *   onComplete={() => console.log("Done!")}
 * />
 * ```
 */
export default function TypewriterText({
  text,
  speed = 50,
  enabled = true,
  onComplete,
  cursorClassName,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  // Use ref to avoid stale closure issues with onComplete
  const onCompleteRef = useRef(onComplete)
  
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayedText("")
      setIsTyping(false)
      return
    }

    setDisplayedText("")
    setIsTyping(true)

    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => {
        const nextIndex = prev.length

        if (nextIndex < text.length) {
          return prev + text[nextIndex]
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)

          // Defer onComplete to avoid updating parent during render
          setTimeout(() => {
            onCompleteRef.current?.()
          }, 0)

          return prev
        }
      })
    }, speed)

    return () => {
      clearInterval(typingInterval)
      setIsTyping(false)
    }
  }, [text, speed, enabled])

  return (
    <>
      {displayedText}
      {showCursor && isTyping && <span className={cn("inline-block w-[2px] h-[1em] ml-1 bg-primary animate-pulse",cursorClassName)} />}
    </>
  )
}
