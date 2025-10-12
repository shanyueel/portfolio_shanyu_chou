"use client"

import { useState, useEffect } from "react"

type Breakpoints = "sm" | "md" | "lg" | "xl" | "2xl"

const queries: Record<Breakpoints, string> = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)

    setMatches(mediaQueryList.matches)
    mediaQueryList.addEventListener("change", handler)
    return () => mediaQueryList.removeEventListener("change", handler)
  }, [query])

  return matches
}

export function useBreakpoint(breakpoint: string): boolean {
  const query = queries[breakpoint as Breakpoints]

  if (!query) {
    throw new Error(`Invalid breakpoint: ${breakpoint}`)
  }

  return useMediaQuery(query)
}
