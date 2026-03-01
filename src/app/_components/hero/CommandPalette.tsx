"use client"

import { useState, FormEvent, useRef, useEffect, KeyboardEvent, MouseEvent } from "react"
import { motion } from "framer-motion"
import { IoSparkles, IoSend } from "react-icons/io5"
import Button from "@/components/ui/Button"
import { heroResponseDefs } from "@/data/heroResponses/responses"
import { cn, delay, scrollToElement } from "@/lib/utils"

interface CommandPaletteProps {
  /** Whether there is chat history */
  hasChatHistory: boolean
  /** Whether the typing animation is complete */
  isTypingComplete: boolean
  /** IDs of responses the user has already seen */
  seenResponseIds: string[]
  /** Whether the command palette is disabled */
  disabled: boolean,
  /** Callback function for when the user submits a query (text input) */
  onQuerySubmit: (query: string) => void
  /** Callback function for when the user clicks a chip (ID-based submission) */
  onIdSubmit?: (responseId: string) => void
  /** Callback function for when the user resets the chat */
  onReset: () => void
  onFocus?: () => void
  onBlur?: () => void

}

/**
 * CommandPalette - The central input component for AI-like interaction
 */
const CommandPalette = ({
  hasChatHistory,
  isTypingComplete,
  seenResponseIds,
  disabled,
  onQuerySubmit,
  onIdSubmit,
  onReset,
  onFocus,
  onBlur,
}: CommandPaletteProps) => {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [displayChips, setDisplayChips] = useState<typeof heroResponseDefs>([])

  const commandPaletteRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const showChips = isFocused && (isTypingComplete || hasChatHistory)
  const showBackToHomepage = !showChips && hasChatHistory

  const handleTextareaFocus = async () => {
    setIsFocused(true)
    onFocus?.()

    // Delay to ensure keyboard animation completes
    await delay(250)

    scrollToElement(commandPaletteRef, {behavior: 'smooth', block: 'end'})
  }

  const handleTextareaBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
  
    if (!query.trim() || disabled) return

    onQuerySubmit(query)
    setQuery("") 
  }

  const handleEnterSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()

      // blur the textarea to hide chips
      textareaRef.current?.blur()
      setIsFocused(false)
    }
  }

  // avoid input losing focus when clicking on mobile
  const handleChipClick = (e: MouseEvent, responseId: string) => {
    e.preventDefault()

    if (disabled) return

    // Use ID-based submission if available, otherwise fallback to query-based
    if (onIdSubmit) {
      onIdSubmit(responseId)
    } else {
      // Fallback: look up fullQuestion from config for query-based submission
      const responseDef = heroResponseDefs.find(def => def.id === responseId)
      const fullQuestion = responseDef?.fullQuestion || `Tell me about ${responseId}`
      onQuerySubmit(fullQuestion)
    }
    setQuery("")

    // blur the textarea to hide chips
    textareaRef.current?.blur()
    setIsFocused(false)
  }

  // Auto-grow textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current

    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto'
      // Set height based on scrollHeight, but CSS max-height will cap it
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [query])

  // Determine which chips to show
  useEffect(() => {
    const shuffle = <T,>(array: T[]): T[] => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }

    const unseen = heroResponseDefs.filter(d => !seenResponseIds.includes(d.id))
    const seen = heroResponseDefs.filter(d => seenResponseIds.includes(d.id))

    let result = shuffle(unseen)
    if (result.length < 4) {
      result = [...result, ...shuffle(seen).slice(0, 4 - result.length)]
    } else {
      result = result.slice(0, 4)
    }
    
    setDisplayChips(result)
  }, [seenResponseIds])

  return (
    <div ref={commandPaletteRef} className="w-full max-w-2xl mx-auto scroll-mb-4">
      {/* Input Field */}
      <form onSubmit={handleSubmit}>
        <div className={cn(
          "relative flex items-center gap-2 px-4 py-2 rounded-xl border border-muted/30",
          "bg-light transition-all duration-300 dark:bg-dark",
          "focus-within:border-primary/50 focus-within:backdrop-blur-lg focus-within:shadow-primary-glow",
          disabled && "bg-gray-200 cursor-not-allowed",
        )}>
          <IoSparkles className="text-primary/80 self-start mt-2" size={20} />
          <textarea
            ref={textareaRef}
            value={query}
            rows={1}
            className="flex-1 max-h-[calc(1.5em*4.5)] outline-none leading-6 text-dark placeholder-muted bg-transparent resize-none overflow-y-auto dark:text-light"
            placeholder="Ask about Shan-Yu Chou..."
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleEnterSubmit}
            onFocus={handleTextareaFocus}
            onBlur={handleTextareaBlur}
            disabled={disabled}
          />
          <button
            type="submit"
            disabled={disabled || !query.trim()}
            className="self-end p-2 rounded-lg text-secondary cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <IoSend size={20} />
          </button>
        </div>
      </form>
      
      <div className="min-h-8 mt-4">
        {/* Chips Container */}
        {showChips &&  (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {displayChips.map(def => (
              <Button
                key={def.id}
                type="button"
                size="sm"
                outline
                rounded
                disabled={disabled}
                onMouseDown={(e) => handleChipClick(e, def.id)}
              >
                {def.chipLabel}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Reset to initial state link */}
        {showBackToHomepage && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={onReset}
            className="text-sm leading-8 text-muted underline  transition-colors cursor-pointer hover:text-primary"
          >
            Back to Homepage
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default CommandPalette
