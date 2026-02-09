"use client"

import { motion } from "framer-motion"
import { ReactNode, forwardRef } from "react"

export interface FadeInUpOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  /**
   * Duration of the animation in seconds
   * @default 1
   */
  duration?: number
  /**
   * Distance to animate from (in pixels)
   * @default 20
   */
  yOffset?: number
}

/**
 * FadeInUpOnScroll - 滾動時淡入並向上滑動的動畫元件
 * 
 * 當元素進入視窗時，會觸發淡入效果並從下方向上滑動
 * 使用 framer-motion 的 whileInView 來實現滾動觸發動畫
 * 使用 forwardRef 讓父元件可以綁定 ref 到此元件
 * 
 * @example
 * ```tsx
 * <FadeInUpOnScroll className="my-section">
 *   <h1>Title</h1>
 *   <p>Content that will fade in and slide up</p>
 * </FadeInUpOnScroll>
 * ```
 */
const FadeInUpOnScroll = forwardRef<HTMLDivElement, FadeInUpOnScrollProps>(
  ({ children, className = "", delay = 0, duration = 1, yOffset = 20 }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: yOffset }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration, delay }}
        viewport={{ once: true }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }
)

FadeInUpOnScroll.displayName = "FadeInUpOnScroll"

export default FadeInUpOnScroll
