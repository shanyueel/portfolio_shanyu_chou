"use client"

import { MdSunny } from "react-icons/md"
import { FaMoon } from "react-icons/fa"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * A functional component that renders a button to toggle between light and dark themes.
 */
const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-full transition-colors cursor-pointer p-2 dark:p-1 hover:bg-gray-200 dark:hover:bg-gray-800"
      aria-label="Toggle Dark Mode"
    >
      {resolvedTheme === "dark" ? <FaMoon size="16" /> : <MdSunny size="20" />}
    </button>
  )
}

export default ThemeToggleButton
