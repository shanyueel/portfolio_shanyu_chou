"use client"

import React, { useState } from "react"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { cn } from "@/lib/utils"

/**
 * Props for the ImageCarousel component.
 */
interface ImageCarouselProps {
  imageDir: string
  imageNames: string[]
  altPrefix?: string
  className?: string
}

/**
 * ImageCarousel component that displays a carousel of images with navigation arrows and dots.
 * @param imageDir the directory where images are stored, relative to the public folder
 * @param imageNames an array of image file names to display in the carousel
 * @param altPrefix optional prefix for the alt text of images, defaults to 'Project image'
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({
  imageDir,
  imageNames,
  altPrefix = "Project image",
  className = "",
}) => {
  const [current, setCurrent] = useState(0)
  const total = imageNames.length

  if (total === 0) return null

  const goPrev = () => setCurrent(prev => (prev - 1 + total) % total)
  const goNext = () => setCurrent(prev => (prev + 1) % total)

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center w-full max-w-4xl mx-auto mb-8",
        className
      )}
    >
      {/* Image container with arrows */}
      <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 aspect-video dark:bg-gray-800">
        <button
          onClick={goPrev}
          disabled={total <= 1}
          className="absolute top-1/2 left-0 -translate-y-1/2 z-10 flex items-center justify-start w-1/3 h-full 
                     pl-2 rounded-none text-xl text-gray-400 cursor-pointer transition-colors hover:text-secondary
                     hover:bg-linear-to-l hover:from-transparent hover:to-secondary/20"
          aria-label="Previous image"
        >
          <FaChevronLeft />
        </button>

        {/* Image */}
        <Image
          src={`/${imageDir}/${imageNames[current]}`}
          alt={`${altPrefix} ${current + 1}`}
          fill
          className="object-contain select-none"
        />

        <button
          onClick={goNext}
          disabled={total <= 1}
          className="absolute top-1/2 right-0 -translate-y-1/2 z-10 flex items-center justify-end w-1/3 h-full
                     pr-2 rounded-none text-xl text-gray-400 cursor-pointer transition-colors hover:text-secondary
                     hover:bg-linear-to-r hover:from-transparent hover:to-secondary/20 "
          aria-label="Next image"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
        {imageNames.map((_, idx) => (
          <button
            key={idx}
            className={cn(
              "w-3 h-3 rounded-full border-2 transition cursor-pointer md:w-2 md:h-2",
              idx === current
                ? "bg-secondary border-secondary"
                : "bg-gray-200 dark:bg-gray-500 border-gray-300 dark:border-gray-600"
            )}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
