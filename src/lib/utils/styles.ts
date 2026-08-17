import clsx from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge class names, letting later Tailwind classes override earlier ones.
 *
 * clsx flattens conditionals (`cond && "hidden"`) and twMerge resolves Tailwind
 * conflicts, so `cn("p-2", "p-4")` yields "p-4" rather than both.
 */
export const cn = (...inputs: (string | boolean | undefined | null)[]) => {
  return twMerge(clsx(inputs))
}
