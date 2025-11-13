import { useRef, useEffect } from "react"
import { computePosition, flip, offset, shift } from "@floating-ui/react"
import clsx from "clsx"

interface DropdownProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  trigger: React.ReactNode
  children: React.ReactNode
  placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end"
  className?: string // the className for the dropdown wrapper
}

/**
 * Headless Dropdown component (Fully Controlled).
 * It handles the positioning and outside-click logic.
 * The parent component is responsible for managing the open/close state and all styling.
 */
const Dropdown = ({
  placement = "bottom-start",
  trigger,
  children,
  isOpen,
  onOpenChange,
}: DropdownProps) => {
  const dropdownBtnRef = useRef<HTMLDivElement>(null)
  const dropdownContentRef = useRef<HTMLDivElement>(null)

  // only compute position when dropdown is open
  useEffect(() => {
    if (isOpen && dropdownBtnRef.current && dropdownContentRef.current) {
      computePosition(dropdownBtnRef.current, dropdownContentRef.current, {
        placement,
        middleware: [offset(8), flip(), shift({ padding: 16 })],
      }).then(({ x, y }) => {
        if (dropdownContentRef.current) {
          Object.assign(dropdownContentRef.current.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
        }
      })
    }
  }, [isOpen, placement])

  // handle outside clicks, Escape key, and scroll events
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isClickOutsideButton =
        dropdownBtnRef.current && !dropdownBtnRef.current.contains(e.target as Node)
      const isClickOutsideContent =
        dropdownContentRef.current && !dropdownContentRef.current.contains(e.target as Node)

      if (isClickOutsideButton && isClickOutsideContent) {
        onOpenChange(false)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    const handleScroll = (e: Event) => {
      const isScrollOutsideContent =
        dropdownContentRef.current && !dropdownContentRef.current.contains(e.target as Node)
      if (isScrollOutsideContent) {
        onOpenChange(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("scroll", handleScroll, { capture: true, passive: true })
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("scroll", handleScroll, { capture: true })
    }
  }, [isOpen, onOpenChange])

  return (
    <>
      <div ref={dropdownBtnRef} className="inline-block" onClick={() => onOpenChange(!isOpen)}>
        {trigger}
      </div>

      {/* --- Dropdown Content Wrapper --- */}
      <div
        ref={dropdownContentRef}
        className={clsx([
          "absolute isolate z-dropdown top-0 left-0 overscroll-contain",
          isOpen ? "block" : "hidden",
        ])}
      >
        {children}
      </div>
    </>
  )
}

export default Dropdown
