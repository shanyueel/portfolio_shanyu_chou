import { cn } from "@/lib/utils"

interface CardProps {
  className?: string
  children: React.ReactNode
}

/**
 * Card component which was rendered by MDX.
 */
const Card = ({ className, children }: CardProps) => {
  return (
    <div className={cn("w-full p-4 rounded-lg bg-gray-50 shadow-md dark:bg-gray-800", className)}>
      <div
        className={cn(
          "prose max-w-none dark:prose-invert",
          "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          "text-gray-600 dark:text-gray-300"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Card
