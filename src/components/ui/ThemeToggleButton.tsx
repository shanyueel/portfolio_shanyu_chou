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

  // Prevents rendering before getting the correct theme on the client side
  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 dark:p-2.5 rounded-full transition-colors cursor-pointer  hover:bg-gray-200 dark:hover:bg-gray-600"
      aria-label="Toggle Dark Mode"
    >
      {resolvedTheme === "dark" ? <FaMoon size="16" /> : <MdSunny size="20" />}
    </button>
  )
}

export default ThemeToggleButton
