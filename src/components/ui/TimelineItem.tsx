"use client"

import { motion } from "framer-motion"
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

interface TimelineItemProps {
  title: string
  subtitle?: string
  duration: string
  location: string
  children?: React.ReactNode
}

/**
 * TimelineItem component that represents a single item in the timeline, i.e., a single role within a company.
 * @param title the title of the role
 * @param duration the duration of the role, e.g., "Jan 2020 - Present"
 * @param location the location of the role, e.g., "New York, NY"
 * @param children the content of the role, e.g., bulleted list of responsibilities
 * @constructor
 */
const TimelineItem = ({ title, subtitle, duration, location, children }: TimelineItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative pl-5 md:pl-8"
    >
      {/* Animated Dot */}
      <motion.div
        className="absolute top-2 left-[-10px] w-4 h-4 border-2 border-dark bg-secondary rounded-full dark:border-light dark:bg-secondary"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Content */}
      <div>
        <div className="m-0 py-0.5">
          <h5 className="m-0 text-xl text-left font-semibold text-secondary">{title}</h5>
          {subtitle && (
            <h6 className="mt-1 mb-0 text-left font-medium text-gray-600 dark:text-gray-300">
              {subtitle}
            </h6>
          )}
        </div>

        <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 ">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="w-4 h-4" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="w-4 h-4" />
            {location}
          </span>
        </div>
        {children && (
          <div className="mt-3 text-gray-700 w-full dark:text-gray-300 text-sm md:text-base">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TimelineItem
