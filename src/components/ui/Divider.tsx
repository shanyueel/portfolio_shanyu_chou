import { cn } from "@/lib/utils"

interface DividerProps {
  borderStyle?: "solid" | "dashed" | "dotted"
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8
  className?: string
}

const borderStyleMap = {
  solid: "",
  dashed: "border-dashed",
  dotted: "border-dotted",
}

const gapMap = {
  0: "mt-0 mb-0",
  1: "mt-1 mb-1",
  2: "mt-2 mb-2",
  3: "mt-3 mb-3",
  4: "mt-4 mb-4",
  5: "mt-5 mb-5",
  6: "mt-6 mb-6",
  7: "mt-7 mb-7",
  8: "mt-8 mb-8",
}

/**
 * Divider component to render a horizontal dashed line.
 */
const Divider = ({ borderStyle = "solid", gap = 4, className = "" }: DividerProps) => {
  return (
    <hr
      className={cn(
        "border-t-2 border-gray-500 dark:border-gray-400",
        borderStyleMap[borderStyle],
        gapMap[gap],
        className
      )}
    />
  )
}

export default Divider
