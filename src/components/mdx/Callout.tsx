import { cn } from "@/lib/utils"

interface CalloutProps {
  children: React.ReactNode
  className?: string
}

/**
 * Callout component to highlight important information with border.
 */
const Callout = ({ children, className }: CalloutProps) => {
  return (
    <div
      className={cn(
        "w-full p-4 border-2 border-primary bg-light rounded-lg dark:bg-dark",
        "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        "[&_ul]:mt-0 [&_ul]:mb-0",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Callout
