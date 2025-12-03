import { cn } from "@/lib/utils"

interface QuoteProps {
  children: React.ReactNode
  className?: string
}

const Quote = ({ children, className = "" }: QuoteProps) => {
  return (
    <div
      className={cn(
        "border-l-3 border-primary pl-4 font-semibold italic",
        "[&>*:first-child]:mt-1 [&>*:last-child]:mb-1",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Quote
