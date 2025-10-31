import React from "react"

type ButtonSize = "sm" | "md" | "lg"
type ButtonStyle = "primary" | "secondary" | "info" | "success" | "danger" | "warning"

interface ButtonProps {
  children: React.ReactNode
  className?: string
  style?: ButtonStyle
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

const solidVariantClasses: Record<ButtonStyle, string> = {
  primary: "bg-primary text-primary-fg hover:bg-primary/80 focus:ring-primary/30",
  secondary: "bg-secondary text-secondary-fg hover:bg-secondary/80 focus:ring-secondary/30",
  info: "bg-info text-info-fg hover:bg-info/80 focus:ring-info/30",
  success: "bg-success text-success-fg hover:bg-success/80 focus:ring-success/30",
  warning: "bg-warning text-warning-fg hover:bg-warning/80 focus:ring-warning/30",
  danger: "bg-danger text-danger-fg hover:bg-danger/80 focus:ring-danger/30",
}

const outlineVariantClasses: Record<ButtonStyle, string> = {
  primary:
    "bg-light dark:bg-dark border border-primary text-primary hover:bg-primary hover:text-primary-fg focus:ring-primary/30",
  secondary:
    "bg-light dark:bg-dark border border-secondary text-secondary hover:bg-secondary hover:text-secondary-fg focus:ring-secondary/30",
  info: "bg-light dark:bg-dark border border-info text-info hover:bg-info hover:text-info-fg focus:ring-info/30",
  success:
    "bg-light dark:bg-dark border border-success text-success hover:bg-success hover:text-success-fg focus:ring-success/30",
  warning:
    "bg-light dark:bg-dark border border-warning text-warning hover:bg-warning hover:text-warning-fg focus:ring-warning/30",
  danger:
    "bg-light dark:bg-dark border border-danger text-danger hover:bg-danger hover:text-danger-fg focus:ring-danger/30",
}

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed cursor-pointer"

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  size = "md",
  style: styleVariant = "primary",
  outline = false,
}) => {
  const variantClasses = outline
    ? outlineVariantClasses[styleVariant]
    : solidVariantClasses[styleVariant]

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
