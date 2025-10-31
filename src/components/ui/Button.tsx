import { ColorType } from "@/lib/types"
import React from "react"

type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps {
  children: React.ReactNode
  className?: string
  color?: ColorType
  type?: "button" | "submit" | "reset"
  size?: ButtonSize
  outline?: boolean
  disabled?: boolean
  onClick?: () => void
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-1.5 text-base",
  lg: "px-4 py-2 text-lg",
}

const solidVariantClasses: Record<ColorType, string> = {
  primary: "text-primary-fg bg-primary hover:bg-primary/80 focus:ring-primary/30",
  secondary: "text-secondary-fg bg-secondary hover:bg-secondary/80 focus:ring-secondary/30",
  info: "text-info-fg bg-info hover:bg-info/80 focus:ring-info/30",
  success: "text-success-fg bg-success hover:bg-success/80 focus:ring-success/30",
  warning: "text-warning-fg bg-warning hover:bg-warning/80 focus:ring-warning/30",
  danger: "text-danger-fg bg-danger hover:bg-danger/80 focus:ring-danger/30",
}

const outlineVariantClasses: Record<ColorType, string> = {
  primary:
    "text-primary bg-light border border-primary hover:text-primary-fg hover:bg-primary focus:ring-primary/30 dark:bg-dark",
  secondary:
    "text-secondary bg-light border border-secondary hover:text-secondary-fg hover:bg-secondary focus:ring-secondary/30 dark:bg-dark",
  info: "text-info bg-light border border-info hover:text-info-fg hover:bg-info focus:ring-info/30 dark:bg-dark",
  success:
    "text-success bg-light border border-success hover:text-success-fg hover:bg-success focus:ring-success/30 dark:bg-dark",
  warning:
    "text-warning bg-light border border-warning hover:text-warning-fg hover:bg-warning focus:ring-warning/30 dark:bg-dark",
  danger:
    "text-danger bg-light border border-danger hover:text-danger-fg hover:bg-danger focus:ring-danger/30 dark:bg-dark",
}

const baseClasses =
  "flex items-center justify-center font-medium whitespace-nowrap cursor-pointer rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed"

/**
 * A functional component that renders a button with various styles.
 * @param type - The type of the button (e.g., [default]"button", "submit").
 * @param size - The size of the button (e.g., "sm", [default]"md", "lg").
 * @param color - The color of the button (e.g., [default]"primary", "secondary").
 * @param outline - Whether the button should have an outline style.
 */
const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  size = "md",
  color = "primary",
  outline = false,
}: ButtonProps) => {
  const variantClasses = outline ? outlineVariantClasses[color] : solidVariantClasses[color]
  const disabledClasses = outline
    ? "disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent"
    : "disabled:bg-gray-400 disabled:text-gray-200"

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
