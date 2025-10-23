"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useEffect, useCallback } from "react"
import { navItems } from "@/lib/constants"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpenAction: (v: boolean) => void
}

/**
 * MobileMenu component that displays a collapsible menu for mobile devices.
 */
const MobileMenu = ({ isOpen, setIsOpenAction }: MobileMenuProps) => {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement | null>(null)

  const closeMenu = useCallback(() => {
    setIsOpenAction(false)
  }, [setIsOpenAction])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, closeMenu])

  return (
    <div
      ref={menuRef}
      className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul className="flex flex-col gap-2 mt-2">
        {navItems.map(({ name, path }) => (
          <li key={name}>
            <Link
              href={path}
              className={`block w-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname === path
                  ? "bg-blue-500 dark:bg-blue-600 text-black dark:text-white"
                  : "text-black dark:text-white hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileMenu
