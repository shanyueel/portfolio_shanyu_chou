"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Lottie from "lottie-react"
import HeroIntro from "./hero/HeroIntro"
import ChatHistory, { ChatMessage } from "./hero/ChatHistory"
import CommandPalette from "./hero/CommandPalette"
import { cn, delay, scrollToElement } from "@/lib/utils"
import { findMatchingResponse, findResponseById } from "@/data/heroResponses/responses"
import { getRandomFallback, fallbackChipMapping } from "@/data/heroResponses/fallback"
import scrollDownArrows from "@/assets/animations/scrollDownArrows.json"

interface AIHeroSectionProps {
  /** Pre-compiled MDX content keyed by response id */
  compiledResponses: Record<string, React.ReactNode>
  /** Ref to the projects section for scroll navigation */
  projectsSectionRef: React.RefObject<HTMLDivElement | null>
}

const THINKING_DELAY = 1500

const CHARACTERISTICS = [
  "design-driven",
  "detail-oriented",
  "collaborative",
  "growth-minded",
  "challenge-seeker",
] as const

/**
 * AIHeroSection - Main container for AI-like hero interaction
 */
const AIHeroSection = ({ compiledResponses, projectsSectionRef }: AIHeroSectionProps) => {
  const [isThinking, setIsThinking] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isCommandPaletteDisabled, setIsCommandPaletteDisabled] = useState(false)
  const [seenResponseIds, setSeenResponseIds] = useState<string[]>([])

  const aiHeroSectionRef = useRef<HTMLDivElement>(null)

  const chatHistoryRef = useRef<HTMLDivElement>(null)
  const historyContainerRef = useRef<HTMLDivElement>(null)
  const isMounted = useRef(true)

  const showHeroIntro = chatHistory.length === 0
  const showChatHistory = chatHistory.length > 0

  // Track component mount status
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // Load seen responses from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("seenHeroResponses")
      if (stored) {
        setSeenResponseIds(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Failed to load seenHeroResponses", e)
    }
  }, [])

  const markAsSeen = useCallback((id: string) => {
    setSeenResponseIds(prev => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      try {
        localStorage.setItem("seenHeroResponses", JSON.stringify(next))
      } catch (e) {
        console.error("Failed to save seenHeroResponses", e)
      }
      return next
    })
  }, [])

  // Rotate characteristics
  useEffect(() => {
    const interval = setInterval(() => {
      setCharIndex(i => (i + 1) % CHARACTERISTICS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Auto scroll to the top of the latest message when new messages arrive
  useEffect(() => {
    if (chatHistoryRef.current && (chatHistory.length > 0 || isThinking)) {
      // Get the last user message to scroll to (so both question and answer are visible)
      const userMessages = chatHistoryRef.current.querySelectorAll('[data-role="user"]')
      const lastUserMessage = userMessages[userMessages.length - 1] as HTMLElement | null

      if (lastUserMessage) {
        // Calculate the position of the last message relative to the scroll container
        const scrollContainer = historyContainerRef.current
        if (!scrollContainer) return

        const containerRect = scrollContainer.getBoundingClientRect()
        const messageRect = lastUserMessage.getBoundingClientRect()

        // Distance from the message to the visible top of the container
        const visualOffset = messageRect.top - containerRect.top
        const alreadyScrolled = scrollContainer.scrollTop
        const topMargin = 24

        const scrollOffset = visualOffset + alreadyScrolled - topMargin

        scrollContainer.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        })
      }
    }
  }, [chatHistory.length, isThinking])

  // Lock/unlock page scroll when chat starts/ends
  useEffect(() => {
    if (showChatHistory) {
      document.body.style.overflow = "hidden"
      scrollToElement(aiHeroSectionRef)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [showChatHistory])

  /**
   * Adds a message to the chat history
   */
  const addChatMessage = (role: "user" | "assistant", content: React.ReactNode) => {
    const message: ChatMessage = {
      id: `${role}-${Date.now()}`,
      role,
      content,
      timestamp: Date.now(),
    }
    setChatHistory(prev => [...prev, message])
  }

  /**
   * Handles submission by response ID (for chip clicks)
   * Directly uses the response ID to fetch the compiled response
   */
  const handleIdSubmit = async (responseId: string) => {
    setIsCommandPaletteDisabled(true)

    markAsSeen(responseId)

    // Find the response definition to get the display text
    const responseDef = findResponseById(responseId)
    const displayText = responseDef?.fullQuestion || `Tell me about ${responseId}`

    // User message: display the chip text
    addChatMessage("user", <p>{displayText}</p>)

    await delay(THINKING_DELAY / 2)
    if (!isMounted.current) return

    setIsThinking(true)

    await delay(THINKING_DELAY)
    if (!isMounted.current) return

    setIsThinking(false)

    // Assistant message: use compiled response if available, otherwise use fallback
    const fallbackMessage = compiledResponses[responseId] ? null : getRandomFallback()

    const assistantContent = compiledResponses[responseId] ? (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {compiledResponses[responseId]}
      </div>
    ) : (
      fallbackMessage && parseFallbackMessage(fallbackMessage)
    )

    addChatMessage("assistant", assistantContent)

    setIsCommandPaletteDisabled(false)
  }

  /**
   * Handles submission by query string (for user input)
   * Performs query matching to determine the appropriate response
   */
  const handleQuerySubmit = async (query: string) => {
    setIsCommandPaletteDisabled(true)

    // Perform query matching to determine the appropriate response
    const matched = findMatchingResponse(query)
    const responseId = matched?.id || null
    const fallbackMessage = matched ? null : getRandomFallback()

    if (!matched) {
      fetch("/api/notion/unmatched-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      }).catch(() => {})
    }

    if (responseId) {
      markAsSeen(responseId)
    }

    // User message: plain text wrapped in <p>
    addChatMessage("user", <p>{query}</p>)

    await delay(THINKING_DELAY / 2)
    if (!isMounted.current) return

    setIsThinking(true)

    await delay(THINKING_DELAY)
    if (!isMounted.current) return

    setIsThinking(false)

    // Assistant message: use compiled response if available, otherwise use fallback
    const assistantContent =
      responseId && compiledResponses[responseId] ? (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {compiledResponses[responseId]}
        </div>
      ) : (
        fallbackMessage && parseFallbackMessage(fallbackMessage)
      )

    addChatMessage("assistant", assistantContent)

    setIsCommandPaletteDisabled(false)
  }

  /**
   * Parses fallback message and converts [text] to clickable links
   */
  const parseFallbackMessage = (message: string) => {
    const parts = message.split(/(\[[^\]]+\])/g)

    return parts.map((part, index) => {
      const match = part.match(/\[([^\]]+)\]/)
      if (match) {
        const text = match[1]

        // Find the response ID to submit when clicked
        const responseId = fallbackChipMapping[text]

        const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
          e.preventDefault()
          if (responseId) {
            handleIdSubmit(responseId)
          } else {
            handleQuerySubmit(`Tell me about ${text}`)
          }
        }

        return (
          <span
            key={index}
            onClick={handleClick}
            className="text-link mx-0.5 inline-flex underline underline-offset-2 cursor-pointer"
          >
            {text}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  const handleReset = () => {
    setChatHistory([]) // Clear chat history
    setIsInputFocused(false) // Reset input focus state
  }

  const handleTypingComplete = useCallback(() => {
    setIsTypingComplete(true)
  }, [])

  return (
    <div
      ref={aiHeroSectionRef}
      className="main-content flex flex-col justify-center h-full-container min-h-full-container text-center scroll-mt-header"
    >
      <div className={cn(showChatHistory ? "flex-1" : "mb-6", "flex flex-col min-h-0")}>
        {/* Hero Intro */}
        {showHeroIntro && (
          <div className="flex-1 flex items-center justify-center">
            <HeroIntro
              characteristic={CHARACTERISTICS[charIndex]}
              mode={isInputFocused ? "greeting" : "default"}
              onTypingComplete={handleTypingComplete}
            />
          </div>
        )}

        {/* Chat History */}
        {showChatHistory && (
          <div ref={historyContainerRef} className="flex-1 overflow-y-auto no-scrollbar px-4">
            <ChatHistory ref={chatHistoryRef} messages={chatHistory} isThinking={isThinking} />
          </div>
        )}

        {/* Command Palette */}
        <div className="flex-shrink-0 mt-8 w-full md:mt-8">
          <CommandPalette
            onQuerySubmit={handleQuerySubmit}
            onIdSubmit={handleIdSubmit}
            onReset={handleReset}
            disabled={isCommandPaletteDisabled}
            hasChatHistory={chatHistory.length > 0}
            isTypingComplete={isTypingComplete}
            seenResponseIds={seenResponseIds}
            onFocus={() => {
              setIsInputFocused(true)
              setIsTypingComplete(false)
            }}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>
      </div>
      {!showChatHistory && (
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer md:bottom-6"
          onClick={() => scrollToElement(projectsSectionRef)}
          aria-label="Scroll to projects"
        >
          <Lottie animationData={scrollDownArrows} loop={true} className="w-[50px] h-[50px]" />
        </button>
      )}
    </div>
  )
}

export default AIHeroSection
