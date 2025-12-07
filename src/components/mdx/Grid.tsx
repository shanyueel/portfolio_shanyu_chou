import React from "react"
import { cn } from "@/lib/utils"

type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface GridProps {
  children: React.ReactNode
  columns?:
    | ColumnCount
    | {
        xs?: ColumnCount
        sm?: ColumnCount
        md?: ColumnCount
        lg?: ColumnCount
        xl?: ColumnCount
        "2xl"?: ColumnCount
      }
  gap?: number
  className?: string
}

/**
 * Grid component that sets the grid layout which was rendered by MDX.
 * @param columns - Number of columns or responsive column configuration, default is 1.
 * @param gap - Gap between grid items, default is 4.
 */
const Grid = ({ children, columns = 1, gap = 4, className }: GridProps) => {
  let columnClasses = ""

  if (typeof columns === "number") {
    columnClasses = `grid-cols-${columns}` || "grid-cols-1"
  } else {
    const { xs, sm, md, lg, xl, "2xl": xxl } = columns
    if (xs) columnClasses = cn(columnClasses, `grid-cols-${xs}`)
    if (sm) columnClasses = cn(columnClasses, `sm:grid-cols-${sm}`)
    if (md) columnClasses = cn(columnClasses, `md:grid-cols-${md}`)
    if (lg) columnClasses = cn(columnClasses, `lg:grid-cols-${lg}`)
    if (xl) columnClasses = cn(columnClasses, `xl:grid-cols-${xl}`)
    if (xxl) columnClasses = cn(columnClasses, `2xl:grid-cols-${xxl}`)
  }

  return <div className={cn("grid", columnClasses, `gap-${gap}`, className)}>{children}</div>
}

export default Grid
