"use client"

import { forwardRef } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

interface MobileMenuToggleProps {
  isOpen: boolean
  onToggleAction: () => void
}

/**
 * A functional component that renders a mobile menu toggle button with an icon.
 */
const MobileMenuToggle = forwardRef<HTMLButtonElement, MobileMenuToggleProps>(
  ({ isOpen, onToggleAction }, ref) => {
    return (
      <button
        ref={ref}
        className="flex md:hidden p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
        onClick={onToggleAction}
        aria-label="Toggle Navigation Menu"
      >
        <span
          className={`inline-block transform transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </span>
      </button>
    )
  }
)

MobileMenuToggle.displayName = "MobileMenuToggle"

export default MobileMenuToggle
