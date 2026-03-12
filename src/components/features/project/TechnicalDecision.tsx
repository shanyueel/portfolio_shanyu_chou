import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TechnicalDecisionProps {
  /** Decision title displayed as a heading */
  title: string
  /** Child slots: TDContext, TDTradeOffs, TDImpact */
  children: ReactNode
  className?: string
}

interface SlotProps {
  children: ReactNode
  className?: string
}

const outlineBase = "flex flex-col rounded-md border-2"
const labelBase = "inline-block px-2 py-1 text-sm font-bold uppercase"
const contentBase =
  "prose max-w-none p-4 text-base text-gray-600 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 dark:text-gray-300"

/**
 * Context slot — describes the background/problem for a technical decision.
 */
export const TDContext = ({ children, className }: SlotProps) => (
  <div className={cn(outlineBase, "border-primary/10 dark:border-primary/20", className)}>
    <span className={cn(labelBase, "bg-primary/10 text-primary dark:bg-primary/20")}>Context</span>
    <div className={cn(contentBase)}>{children}</div>
  </div>
)

/**
 * Trade-offs slot — describes the reasoning and trade-offs considered.
 */
export const TDTradeOffs = ({ children, className }: SlotProps) => (
  <div className={cn(outlineBase, "border-warning/10 dark:border-warning/20", className)}>
    <span className={cn(labelBase, "bg-warning/10 text-warning dark:bg-warning/20")}>
      Trade-offs
    </span>
    <div className={cn(contentBase)}>{children}</div>
  </div>
)

/**
 * Impact slot — describes the outcome / measurable results.
 */
export const TDImpact = ({ children, className }: SlotProps) => (
  <div className={cn(outlineBase, "border-success/10 dark:border-success/20", className)}>
    <span className={cn(labelBase, "bg-success/10 text-success dark:bg-success/20")}>Impact</span>
    <div className={cn(contentBase)}>{children}</div>
  </div>
)

/**
 * TechnicalDecision — a structured card for documenting architectural decisions.
 *
 * Use the three sub-components to fill each section:
 * - `TDContext`   → background / problem statement
 * - `TDTradeOffs` → reasoning and trade-offs
 * - `TDImpact`    → outcome / measurable results
 *
 * @example MDX usage
 * ```mdx
 * <TechnicalDecision title="Independent Component Library">
 *   <TDContext>
 *     The legacy codebase lacked design guidelines…
 *   </TDContext>
 *   <TDTradeOffs>
 *     Requires extra maintenance effort, but ensures a single source of truth…
 *   </TDTradeOffs>
 *   <TDImpact>
 *     _80% of UI generated_ without manual fixes…
 *   </TDImpact>
 * </TechnicalDecision>
 * ```
 */
const TechnicalDecision = ({ title, children, className }: TechnicalDecisionProps) => {
  return (
    <div className={cn("not-prose w-full", className)}>
      {/* Title bar */}
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Slots */}
      <div className="flex flex-col gap-4 mt-4">{children}</div>
    </div>
  )
}

export default TechnicalDecision
