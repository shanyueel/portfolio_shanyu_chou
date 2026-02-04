import { cn } from "@/lib/utils"

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
  icon: React.ReactNode
  label: string
  className?: string
}

/**
 * A tech icon card for displaying technology stack
 */
export const TechIcon = ({ icon, label, className }: TechIconProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl",
        "bg-surface/50 dark:bg-dark/50 border border-muted/20",
        "hover:border-primary/50 transition-colors",
        className
      )}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-xs text-muted">{label}</span>
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
export const HeroCardContainer = ({ children, className }: HeroCardContainerProps) => {
  return <div className={cn("p-6", className)}>{children}</div>
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
        "mt-4 p-4 rounded-xl bg-surface/50 dark:bg-dark/50 border border-muted/20",
        className
      )}
    >
      <span className="text-sm text-muted">
        <a href={href} className="text-primary hover:underline font-medium">
          {children}
        </a>
      </span>
    </div>
  )
}
