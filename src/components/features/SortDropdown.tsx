import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { OrderType } from "@/lib/types"
import Button from "../ui/Button"
import Dropdown from "../ui/Dropdown"

interface SortDropdownProps {
  sortOrder: OrderType
  setSortOrder: (order: OrderType) => void
  options: { id: OrderType; label: string }[]
}

/**
 * SortDropdown component that provides a dropdown for selecting sorting options (e.g., newest, oldest).
 * @param sortOrder - The current selected sort order.
 * @param setSortOrder - Callback function to update the selected sort order.
 * @param options - Array of sorting options with labels and values.
 */
const SortDropdown = ({ sortOrder, setSortOrder, options }: SortDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const triggerLabel = options.find(option => option.id === sortOrder)?.label || "Sort"

  const handleSelect = (value: OrderType) => {
    setSortOrder(value)
    setIsDropdownOpen(false)
  }

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
      placement="bottom-end"
      trigger={
        <Button color="info" className="relative" outline>
          <span>{triggerLabel}</span>
          <FaChevronDown className="ml-2 text-sm" />
        </Button>
      }
    >
      <div className="w-max max-w-64 p-1 border border-dark rounded-md bg-light shadow-md dark:border-secondary dark:bg-dark">
        <div className="max-h-48 overflow-y-auto">
          {options.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className="block w-full px-4 py-2 text-left text-dark cursor-pointer hover:text-secondary hover:bg-gray-200 dark:text-light dark:hover:bg-gray-700"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </Dropdown>
  )
}

export default SortDropdown
