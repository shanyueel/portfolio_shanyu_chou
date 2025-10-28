"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useEffect, useCallback } from "react"
import { navItems } from "@/lib/constants"

interface MobileMenuProps {
  toggleRef: React.RefObject<HTMLButtonElement | null>
  isOpen: boolean
  setIsOpenAction: (v: boolean) => void
}

/**
 * MobileMenu component that displays a collapsible menu for mobile devices.
 */
const MobileMenu = ({ toggleRef, isOpen, setIsOpenAction }: MobileMenuProps) => {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement | null>(null)

  const closeMenu = useCallback(() => {
    setIsOpenAction(false)
  }, [setIsOpenAction])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickOnToggle = toggleRef.current && toggleRef.current.contains(event.target as Node)
      if (clickOnToggle) {
        return
      }

      const clickOutsideMenu = menuRef.current && !menuRef.current.contains(event.target as Node)
      if (clickOutsideMenu) {
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
  }, [toggleRef, isOpen, closeMenu])

  return (
    <div
      ref={menuRef}
      className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul className="flex flex-col gap-1 mt-2">
        {navItems.map(({ name, path }) => (
          <li key={name}>
            <Link
              href={path}
              className={`block w-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname === path
                  ? "text-dark dark:text-light bg-link"
                  : "text-dark dark:text-light hover:bg-link"
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
