import { cn } from "@/lib/utils"

interface CardProps {
  className?: string
  children: React.ReactNode
}

/**
 * A simple Card component that wraps its children.
 * @param children - The content to be displayed inside the card.
 */
const Card = ({ className, children }: CardProps) => {
  return (
    <div className={cn("w-full p-4 rounded-lg bg-gray-50 shadow-md dark:bg-gray-800", className)}>
      {children}
    </div>
  )
}

export default Card
