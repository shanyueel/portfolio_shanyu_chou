"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ChatDialogBoxProps {
  role: "user" | "assistant"
  content: React.ReactNode
  index: number
}

/**
 * ChatDialogBox - Pure presentational component for message bubbles
 */
const ChatDialogBox = ({ role, content, index }: ChatDialogBoxProps) => {
  const containerClass = role === "user" ? "justify-end" : "justify-start"

  const bubbleClass = role === "user"
    ? "bg-gray-600 text-light dark:bg-gray-400 dark:text-dark shadow-sm"
    : "bg-light text-dark dark:bg-dark/80 dark:text-light shadow-sm"

  return (
    <motion.div
      data-message
      data-role={role}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn("flex", containerClass)}
    >
      <div className={cn("max-w-[80%] rounded-lg px-4 py-3", bubbleClass)}>
        <div className={cn("text-sm leading-relaxed text-left")}>{content}</div>
      </div>
    </motion.div>
  )
}

export default ChatDialogBox
