import { cn } from "@/lib/utils"
import { techStackMap, type TechKeyType } from "@/lib/constants"

interface StatCardProps {
  value: string
  label: string
  color?: "success" | "secondary" | "primary" | "warning"
  className?: string
}

/**
 * A stat card component for displaying impact metrics
 */
export const StatCard = ({ value, label, color = "primary", className }: StatCardProps) => {
  const colorClasses = {
    success: "bg-success/10 border-success/20 text-success",
    secondary: "bg-secondary/10 border-secondary/20 text-secondary",
    primary: "bg-primary/10 border-primary/20 text-primary",
    warning: "bg-warning/10 border-warning/20 text-warning",
  }

  return (
    <div className={cn("rounded-xl p-6 border", colorClasses[color], className)}>
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-sm text-muted mt-2">{label}</div>
    </div>
  )
}

interface TechIconProps {
  /**
   * The technology key from TechKey enum. Icon and color will be automatically loaded from techStackMap.
   * To add a new technology, define it in constants.ts techStackMap.
   */
  techKey: TechKeyType
  /**
   * Label to display below the icon. Optional, defaults to the techKey value.
   */
  label?: string
  className?: string
}

/**
 * A tech icon card for displaying technology stack.
 * 
 * Usage: <TechIcon techKey="TypeScript" />
 * 
 * To add new technologies, update the techStackMap in constants.ts
 */
export const TechIcon = ({ techKey, label, className }: TechIconProps) => {
  const techInfo = techStackMap[techKey]
  const IconComponent = techInfo.icon
  const displayLabel = label || techKey

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl",
        "bg-surface/50 dark:bg-dark/50 border border-muted/20",
        className
      )}
    >
      <span className="text-3xl" style={{ color: techInfo.color }}>
        <IconComponent />
      </span>
      <span className="text-xs text-muted">{displayLabel}</span>
    </div>
  )
}

interface HeroCardContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * Container for hero response cards
 */
export const HeroCardContainer = ({ children }: HeroCardContainerProps) => {
  return <>{children}</>
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

/**
 * Footer link component for hero cards
 */
export const FooterLink = ({ href, children, className }: FooterLinkProps) => {
  return (
    <div
      className={cn(
        "mt-4 py-2 [&_p]:my-0",
        className
      )}
    >
      <a href={href} className="text-link font-medium">
        {children}
      </a>
    </div>
  )
}
