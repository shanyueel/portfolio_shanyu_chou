import React from "react"
import Image from "next/image"
import Card from "@/components/mdx/Card"
import { cn } from "@/lib/utils"

interface ImageCardProps {
  src: string
  alt: string
  horizontal?: boolean
  children?: React.ReactNode
  className?: string
}

/**
 * ImageCard component to display an image with a title and optional content.
 * @param title - The title of the image card.
 * @param src - The source URL of the image.
 * @param alt - The alt text for the image.
 */
const ImageCard = ({ src, alt, horizontal = false, children, className }: ImageCardProps) => {
  return (
    <Card className={cn("group relative p-0 overflow-hidden md:p-0", className)}>
      <div className={cn(horizontal && "md:grid md:grid-cols-5 lg:grid-cols-3 md:items-center")}>
        <div
          className={cn(
            "relative aspect-[4/3] w-full rounded-t-lg",
            horizontal && "md:col-span-2 lg:col-span-1 md:h-full"
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover mt-0 mb-0 "
            sizes="(max-width: 640px) 100vw, 540px"
          />
        </div>

        <div
          className={cn(
            "p-4",
            "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
            "[&>p]:leading-6",
            "[&_ul]:list-none [&_ul]:p-0 [&_ul]:text-sm [&_li]:my-1 [&_li]:p-0",
            horizontal && "md:col-span-3 lg:col-span-2"
          )}
        >
          {children}
        </div>
      </div>
    </Card>
  )
}

export default ImageCard
