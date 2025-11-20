"use client"

import { useState, useEffect } from "react"
import { roleAbbreviationMap } from "@/lib/constants"
import Tag from "@/components/ui/Tag"
import { useBreakpoint } from "@/hooks/useMediaQuery"

export default function TeamMembers({ role, count }: { role: string; count: number }) {
  const isMobileUp = useBreakpoint("md")
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const showFull = mounted && isMobileUp

  const roleName = showFull ? roleAbbreviationMap[role] : role

  return (
    <Tag size="sm" color="secondary" className="font-semibold">
      {roleName}: {count}
    </Tag>
  )
}
