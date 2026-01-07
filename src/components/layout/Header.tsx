"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { FaDownload } from "react-icons/fa"
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
      className="sticky top-0 z-50 w-full border-b border-light  backdrop-blur-sm shadow-md text-dark
        bg-light transition-colors dark:border-dark dark:text-light dark:bg-dark"
    >
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 py-2 transition-all duration-300 md:p-4">
        <Breadcrumbs />

        <NavigationMenu />

        <div className="flex items-center gap-2">
          <Link
            href="/resume.pdf"
            title="Download Resume"
            target="_blank"
            className="inline-block p-2.5 rounded-full transition-colors cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <FaDownload size={16} />
          </Link>
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
