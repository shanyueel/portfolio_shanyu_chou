import React from "react"
import { ColorType } from "@/lib/types"

type TagSize = "sm" | "md" | "lg"

interface TagProps {
  children: React.ReactNode
  className?: string
  color?: ColorType
  size?: TagSize
  rounded?: boolean
  outline?: boolean
}

const rectangleClasses: Record<TagSize, string> = {
  sm: "px-1 py-0.5 text-xs rounded-md",
  md: "px-1.5 py-1 text-sm rounded-md",
  lg: "px-2 py-1.5 text-base rounded-md",
}

const roundedClasses: Record<TagSize, string> = {
  sm: "px-2 py-0.5 text-xs rounded-full",
  md: "px-3 py-1 text-sm rounded-full",
  lg: "px-4 py-2 text-base rounded-full",
}

const solidVariantClasses: Record<ColorType, string> = {
  primary: "text-primary bg-primary/10",
  secondary: "text-secondary bg-secondary/10",
  info: "text-info bg-info/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  danger: "text-danger bg-danger/10",
}

const outlineVariantClasses: Record<ColorType, string> = {
  primary: "text-primary bg-light border border-primary dark:bg-dark",
  secondary: "text-secondary bg-light border border-secondary dark:bg-dark",
  info: "text-info bg-light border border-info dark:bg-dark",
  success: "text-success bg-light border border-success dark:bg-dark",
  warning: "text-warning bg-light border border-warning dark:bg-dark",
  danger: "text-danger bg-light border border-danger dark:bg-dark",
}

const baseClasses = "flex items-center justify-center w-fit font-medium whitespace-nowrap "

/**
 * A functional component that renders a Tag with various styles.
 * @param size - The size of the Tag (e.g., "sm", [default]"md", "lg").
 * @param color - The color of the Tag (e.g., [default]"primary", "secondary").
 * @param outline - Whether the Tag should have an outline style: [default]false.
 * @param rounded - Whether the Tag should be rounded: [default]true.
 */
const Tag = ({
  children,
  className = "",
  size = "md",
  color = "primary",
  outline = false,
  rounded = true,
}: TagProps) => {
  const variantClasses = outline ? outlineVariantClasses[color] : solidVariantClasses[color]
  const roundedClass = rounded ? roundedClasses[size] : rectangleClasses[size]

  return (
    <div className={`${baseClasses} ${variantClasses} ${roundedClass} ${className}`}>
      {children}
    </div>
  )
}

export default Tag
