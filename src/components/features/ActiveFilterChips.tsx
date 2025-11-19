import { FaTimes, FaTrashAlt } from "react-icons/fa"
import React from "react"
import clsx from "clsx"
import Tag from "../ui/Tag"

interface ActiveFilterChipsProps {
  filters: string[]
  onRemove: (filter: string) => void
  className?: string
  clearAllLabel?: string
  onClearAll?: () => void
}

/**
 * Reusable component for displaying active filter chips with remove and clear all functionality.
 * @filters - Array of active filter strings to display as chips.
 * @onRemove - Callback function to remove a specific filter.
 * @className - (Optional) additional CSS classes for styling.
 * @clearAllLabel - (Optional) label for the clear all button (default: "Clear All").
 * @onClearAll - (Optional) callback function to clear all filters.
 */
const ActiveFilterChips = ({
  filters,
  onRemove,
  onClearAll,
  clearAllLabel = "Clear All",
  className = "",
}: ActiveFilterChipsProps) => {
  if (!filters || filters.length === 0) return null

  const showClearAll = onClearAll && filters.length > 1

  return (
    <div className={clsx("flex flex-wrap gap-2 overflow-x-auto", className)}>
      {/* Selected Filters */}
      {filters.map(filter => (
        <div key={filter} className="bg-light dark:bg-dark rounded-full">
          <Tag color="secondary" className="flex gap-1">
            {filter}
            <button
              onClick={() => onRemove(filter)}
              aria-label={`Remove filter ${filter}`}
              className="text-secondary/70 hover:text-secondary cursor-pointer focus:outline-none"
              tabIndex={0}
            >
              <FaTimes size={16} />
            </button>
          </Tag>
        </div>
      ))}

      {/* Clear All Button */}
      {showClearAll && (
        <div className="bg-light dark:bg-dark rounded-full">
          <button aria-label={clearAllLabel} tabIndex={0} onClick={onClearAll}>
            <Tag color="danger" className="flex gap-1 cursor-pointer">
              <FaTrashAlt size={16} />
              {clearAllLabel}
            </Tag>
          </button>
        </div>
      )}
    </div>
  )
}

export default ActiveFilterChips
