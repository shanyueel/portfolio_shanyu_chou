"use client"

import { useState, useEffect } from "react"
import { useBreakpoint } from "@/hooks/useMediaQuery"
import { roleAbbreviationMap } from "@/lib/constants"

export default function TeamMembers({ role, count }: { role: string; count: number }) {
  const isMobileUp = useBreakpoint("md")
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const showFull = mounted && isMobileUp

  const roleName = showFull ? roleAbbreviationMap[role] : role

  console.log(isMobileUp, roleName)

  return (
    <span className="inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
      {roleName}: {count}
    </span>
  )
}
