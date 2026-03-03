import React from "react"
import Image from "next/image"
import Card from "@/components/mdx/Card"
import { cn } from "@/lib/utils"

interface ImageCardProps {
  src: string
  alt: string
  children?: React.ReactNode
  className?: string
  /**
   * When true, the card spans the full width of the parent grid (col-span-full)
   * and switches to a horizontal layout (image left, content right).
   * Use for the primary/highlight feature in a grid of cards.
   */
  featured?: boolean
}

/**
 * ImageCard component to display an image with a title and optional content.
 * @param src - The source URL of the image.
 * @param alt - The alt text for the image.
 * @param featured - When true, full-width + horizontal layout. Use for the highlight feature card.
 */
const ImageCard = ({ src, alt, children, className, featured }: ImageCardProps) => {
  return (
    <Card className={cn("group relative p-0 overflow-hidden md:p-0", featured && "col-span-full", className)}>
      <div className={cn(featured && "md:grid md:grid-cols-2 md:items-center")}>
        <div
          className={cn(
            "relative aspect-[4/3] w-full rounded-t-lg",
            featured && "md:col-span-1 md:h-full"
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover mt-0 mb-0"
            sizes="(max-width: 640px) 100vw, 540px"
          />
        </div>

        <div
          className={cn(
            "p-4",
            "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
            "[&>p]:leading-6",
            "[&_ul]:list-none [&_ul]:p-0 [&_ul]:text-sm [&_li]:my-1 [&_li]:p-0",
            featured && "md:col-span-1"
          )}
        >
          {children}
        </div>
      </div>
    </Card>
  )
}

export default ImageCard
