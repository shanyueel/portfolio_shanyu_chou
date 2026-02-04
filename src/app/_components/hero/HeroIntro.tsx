"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "@/assets/icons/logo.svg"
import TypewriterText from "@/components/animations/TypewriterText"

interface HeroIntroProps {
  /** Dynamic characteristic text */
  characteristic: string
  /** Mode: default or greeting */
  mode?: "default" | "greeting"
  /** Callback when typing animation completes */
  onTypingComplete?: () => void
}

const GREETINGS = [
  "Are you looking \n for some specific skills?",
  "What would you\n like to ask about me?",
  "How can I help \n showcase my expertise?",
  "What brings you \n to visit my projects?",
  "How can I help \n you discover my work?",
  "What sparks your \n professional interest?",
  "What brings you \n to visit my career path?",
  "Where shall we start \n diving into my stacks?"
]

/**
 * HeroIntro - The intro section with logo, name, and dynamic text
 */
const HeroIntro = ({ characteristic, mode = "default", onTypingComplete }: HeroIntroProps) => {
  const [greeting, setGreeting] = useState(GREETINGS[0])
  const [isMounted, setIsMounted] = useState(false)

  // Track when component has mounted (client-side only)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Only update greeting when mode changes to "greeting" AND component is mounted
  useEffect(() => {
    if (mode === "greeting" && isMounted) {
      const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
      setGreeting(randomGreeting)
    }
  }, [mode, isMounted])

  return (
    <>
      <div className="flex flex-col justify-between items-center gap-2 w-full max-w-2xl px-4 md:flex-row md:gap-12 md:px-10">
        <Logo className="flex-shrink-0 w-[180px] h-[180px] text-primary" />

        <div className="text-2xl font-bold text-gray-500 text-left md:w-100 md:text-3xl dark:text-gray-100">
          {mode === "greeting" ? (
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-16 text-center whitespace-pre-line md:text-left md:h-auto"
            >
              <TypewriterText
                text={greeting}
                speed={50}
                enabled={mode === "greeting"}
                onComplete={onTypingComplete}
              />
            </motion.h3>
          ) : (
            <>
              <h3>Hi, I&#39;m</h3>
              <h1 className="text-4xl text-primary md:text-5xl">Shan-Yu Chou,</h1>
              <h3>a Frontend Engineer</h3>
              <h3>
                who&#39;s
                <span className="relative align-baseline h-[1em] ml-2 text-secondary whitespace-nowrap overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={characteristic}
                      initial={{ y: "30%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-20%", opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="absolute top-0 left-0"
                    >
                      {characteristic}
                      <span className="text-gray-500 dark:text-gray-100">.</span>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h3>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default HeroIntro
