"use client"

import { motion } from "framer-motion"

import React from "react"

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

interface TimelineProps {
  className?: string
  children: React.ReactNode
}

/**
 * Timeline component that wraps around timeline items.
 * @param children - The timeline items to be displayed, i.e., job positions, promotions, roles within a company.
 */
const Timeline = ({ className = "", children }: TimelineProps) => {
  return (
    <motion.div
      className={`relative flex flex-col gap-8 ml-4 mx-w-6xl border-l-2 border-dark/50 dark:border-light/50 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export default Timeline
