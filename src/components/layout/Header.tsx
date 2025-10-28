"use client"

import { useRef, useState } from "react"
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
  const mobileMenuToggleRef = useRef<HTMLButtonElement | null>(null)

  const openMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  return (
    <header
      id="headerPortfolio"
      className="sticky top-0 z-50 w-full border-b border-light dark:border-dark backdrop-blur-sm shadow-md
        text-dark dark:text-light bg-light dark:bg-dark transition-colors"
    >
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 py-2 md:p-4 transition-all duration-300">
        <Breadcrumbs />

        <NavigationMenu />

        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <MobileMenuToggle
            ref={mobileMenuToggleRef}
            isOpen={mobileMenuOpen}
            onToggleAction={openMobileMenu}
          />
        </div>
      </div>

      <MobileMenu
        toggleRef={mobileMenuToggleRef}
        isOpen={mobileMenuOpen}
        setIsOpenAction={setMobileMenuOpen}
      />
    </header>
  )
}

export default Header
