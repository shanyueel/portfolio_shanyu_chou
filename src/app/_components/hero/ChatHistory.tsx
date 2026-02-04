"use client"

import { motion } from "framer-motion"
import { ThinkingDots } from "@/components/animations"
import ChatDialogBox from "./ChatDialogBox"

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  /** Prepared display content (can be plain text or rich React nodes) */
  content: React.ReactNode
  timestamp: number
}

interface ChatHistoryProps {
  messages: ChatMessage[]
  isThinking?: boolean
  ref?: React.Ref<HTMLDivElement>
}

/**
 * ChatHistory - Displays conversation history between user and assistant
 */
const ChatHistory = ({ messages, isThinking, ref }: ChatHistoryProps) => {
  if (messages.length === 0 && !isThinking) return null

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto space-y-4 py-4">
      {/* Chat Messages Area */}
      {messages.map((message, index) => (
        <ChatDialogBox
          key={message.id}
          role={message.role}
          content={message.content}
          index={index}
        />
      ))}

      {/* Thinking Indicator */}
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <ThinkingDots />
        </motion.div>
      )}
    </div>
  )
}

export default ChatHistory
