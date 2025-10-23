"use client"

import { useState } from "react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import NavigationMenu from "@/components/layout/NavigationMenu"
import ThemeToggleButton from "@/components/ui/ThemeToggleButton"
import MobileMenuToggle from "@/components/layout/MobileMenuToggle"
import MobileMenu from "@/components/layout/MobileMenu"

/**
 * Header component that serves as the top navigation bar for the portfolio.
 */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      id="headerPortfolio"
      className="sticky top-0 z-50 w-full bg-zinc-50 text-black dark:bg-black dark:text-white transition-colors
            border-b dark:border-gray-800 border-gray-300 backdrop-blur-sm shadow-md"
    >
      <div className="max-w-4xl mx-auto w-full px-4 py-2 md:py-4 transition-all duration-300 flex items-center justify-between">
        {/* Left side: logo or current path */}
        <Breadcrumbs />

        {/* Center: Segmented navigation - Hidden on mobile */}
        <NavigationMenu />

        {/* Right side: Theme toggle + Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {/* Theme toggle button */}
          <ThemeToggleButton />

          {/* Hamburger Mobile Menu toggle */}
          <MobileMenuToggle
            isOpen={mobileMenuOpen}
            onToggleAction={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} setIsOpenAction={setMobileMenuOpen} />
    </header>
  )
}

export default Header
