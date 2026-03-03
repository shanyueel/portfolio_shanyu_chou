import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LayoutSectionProps {
  children: ReactNode
  className?: string
}

/**
 * TwoColumnSection — responsive 2-column grid layout for MDX content.
 * Mobile: 1 column. md+: 2 columns.
 * Use directly in MDX when content naturally fits a 2-column layout.
 */
export const TwoColumnSection = ({ children, className }: LayoutSectionProps) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
    {children}
  </div>
)

/**
 * ThreeColumnSection — responsive 3-column grid layout for MDX content.
 * Mobile: 1 column. md+: 3 columns.
 * Use directly in MDX when content naturally fits a 3-column layout (cards, features, icons, etc.)
 */
export const ThreeColumnSection = ({ children, className }: LayoutSectionProps) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
    {children}
  </div>
)

/**
 * FourColumnSection — responsive 4-column grid layout for MDX content.
 * Mobile: 2 columns. md+: 4 columns.
 */
export const FourColumnSection = ({ children, className }: LayoutSectionProps) => (
  <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
    {children}
  </div>
)
