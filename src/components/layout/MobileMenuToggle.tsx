"use client"

import { FaBars, FaTimes } from "react-icons/fa"

interface MobileMenuToggleProps {
  isOpen: boolean
  onToggleAction: () => void
}

/**
 * A functional component that renders a mobile menu toggle button with an icon.
 */
const MobileMenuToggle = ({ isOpen, onToggleAction }: MobileMenuToggleProps) => {
  return (
    <button
      className="flex md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors"
      onClick={onToggleAction}
      aria-label="Toggle Navigation Menu"
    >
      <span
        className={`inline-block transform transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
      >
        {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
      </span>
    </button>
  )
}

export default MobileMenuToggle
