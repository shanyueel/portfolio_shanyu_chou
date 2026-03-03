import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type VariantType = "positive" | "negative" | "neutral" | "info"

interface HighlightBoxProps {
  /**
   * Icon to display on the left side.
   * Can be an emoji, SVG, or any React component.
   */
  icon?: ReactNode
  /**
   * Title text displayed at the top of the content area
   */
  title: string
  /**
   * Main content text or elements
   */
  children: ReactNode
  /**
   * Visual variant that determines the background color
   * - positive: Green theme (for increases, improvements)
   * - negative: Red theme (for decreases, reductions)
   * - neutral: Blue theme (for non-numeric changes like team improvements)
   * - info: Purple theme (for general information)
   */
  variant?: VariantType
  /**
   * Optional className for additional customization
   */
  className?: string
}

/**
 * HighlightBox component for displaying important content with an icon and colored background.
 *
 * Commonly used in impact sections to highlight key metrics or achievements.
 *
 * @example
 * ```tsx
 * <HighlightBox
 *   icon="📈"
 *   title="Development Efficiency"
 *   variant="positive"
 * >
 *   Reduced development time by 30% through improved tooling and automation.
 * </HighlightBox>
 * ```
 */
const HighlightBox = ({
  icon,
  title,
  children,
  variant = "neutral",
  className,
}: HighlightBoxProps) => {
  const variantStyles: Record<VariantType, string> = {
    positive: "bg-success/10 border-success/20 dark:bg-success/5 dark:border-success/30",
    negative: "bg-danger/10 border-danger/20 dark:bg-danger/5 dark:border-danger/30",
    neutral:  "bg-primary/10 border-primary/20 dark:bg-primary/5 dark:border-primary/30",
    info:     "bg-info/10 border-info/20 dark:bg-info/5 dark:border-info/30",
  }

  const iconColorStyles: Record<VariantType, string> = {
    positive: "text-success",
    negative: "text-danger",
    neutral:  "text-primary",
    info:     "text-info",
  }

  return (
    <div className={cn("flex flex-col gap-2 p-4 rounded-xl border-2 transition-colors", variantStyles[variant], className)}>
      {/* Header - Icon & Title */}
      <div className="flex items-center gap-4">
        <div className={cn("flex-shrink-0 flex items-center justify-center text-3xl leading-none md:text-4xl", iconColorStyles[variant])}>
          {icon}
        </div>
        <h3 className="mt-0 mb-0 text-lg font-semibold text-foreground md:mt-2 md:mb-2">{title}</h3>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={cn(
          "text-sm text-gray-500 leading-relaxed",
          "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          "[&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2"
        )}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default HighlightBox
