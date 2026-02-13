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

// Static class maps for Tailwind CSS static analysis
const columnClassMap: Record<ColumnCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
}

const responsiveColumnClassMap: Record<string, Record<ColumnCount, string>> = {
  xs: columnClassMap,
  sm: {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
    7: "sm:grid-cols-7",
    8: "sm:grid-cols-8",
    9: "sm:grid-cols-9",
    10: "sm:grid-cols-10",
    11: "sm:grid-cols-11",
    12: "sm:grid-cols-12",
  },
  md: {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    7: "md:grid-cols-7",
    8: "md:grid-cols-8",
    9: "md:grid-cols-9",
    10: "md:grid-cols-10",
    11: "md:grid-cols-11",
    12: "md:grid-cols-12",
  },
  lg: {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
    7: "lg:grid-cols-7",
    8: "lg:grid-cols-8",
    9: "lg:grid-cols-9",
    10: "lg:grid-cols-10",
    11: "lg:grid-cols-11",
    12: "lg:grid-cols-12",
  },
  xl: {
    1: "xl:grid-cols-1",
    2: "xl:grid-cols-2",
    3: "xl:grid-cols-3",
    4: "xl:grid-cols-4",
    5: "xl:grid-cols-5",
    6: "xl:grid-cols-6",
    7: "xl:grid-cols-7",
    8: "xl:grid-cols-8",
    9: "xl:grid-cols-9",
    10: "xl:grid-cols-10",
    11: "xl:grid-cols-11",
    12: "xl:grid-cols-12",
  },
  "2xl": {
    1: "2xl:grid-cols-1",
    2: "2xl:grid-cols-2",
    3: "2xl:grid-cols-3",
    4: "2xl:grid-cols-4",
    5: "2xl:grid-cols-5",
    6: "2xl:grid-cols-6",
    7: "2xl:grid-cols-7",
    8: "2xl:grid-cols-8",
    9: "2xl:grid-cols-9",
    10: "2xl:grid-cols-10",
    11: "2xl:grid-cols-11",
    12: "2xl:grid-cols-12",
  },
}

const gapClassMap: Record<number, string> = {
  0: "gap-0",
  2: "gap-2",
  4: "gap-4",
  8: "gap-8",
  12: "gap-12",
  16: "gap-16",
}

/**
 * Grid component that sets the grid layout which was rendered by MDX.
 * @param columns - Number of columns or responsive column configuration, default is 1.
 * @param gap - Gap between grid items, default is 4.
 */
const Grid = ({ children, columns = 1, gap = 4, className }: GridProps) => {
  let columnClasses = ""

  if (typeof columns === "number") {
    columnClasses = columnClassMap[columns]
  } else {
    const { xs, sm, md, lg, xl, "2xl": xxl } = columns
    if (xs) columnClasses = cn(columnClasses, responsiveColumnClassMap.xs[xs])
    if (sm) columnClasses = cn(columnClasses, responsiveColumnClassMap.sm[sm])
    if (md) columnClasses = cn(columnClasses, responsiveColumnClassMap.md[md])
    if (lg) columnClasses = cn(columnClasses, responsiveColumnClassMap.lg[lg])
    if (xl) columnClasses = cn(columnClasses, responsiveColumnClassMap.xl[xl])
    if (xxl) columnClasses = cn(columnClasses, responsiveColumnClassMap["2xl"][xxl])
  }

  const gapClass = gapClassMap[gap] || "gap-4"

  return <div className={cn("grid", columnClasses, gapClass, className)}>{children}</div>
}

export default Grid
