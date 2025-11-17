import { useState } from "react"
import { FaChevronDown, FaTrashAlt } from "react-icons/fa"
import Button from "../ui/Button"
import Dropdown from "../ui/Dropdown"
import CheckboxGroup from "../ui/CheckboxGroup"
import Checkbox from "../ui/Checkbox"

interface FilterDropdownProps {
  selectedItems: string[]
  setSelectedItems: (selected: string[]) => void
  items: { id: string; label: string }[]
  placeholder: string
  resultCount: number
  onApply: () => void
}

/**
 * FilterDropdown component that provides a dropdown for filtering items.
 * It allows users to select multiple items and apply or clear the filters.
 * @param selectedItems - Array of currently selected item names.
 * @param setSelectedItems - Function to update the selected items.
 * @param items - Array of available items with their id and label.
 * @param placeholder - Placeholder text for the dropdown button.
 * @param resultCount - Number of results matching the current filters.
 * @param onApply - Callback function to apply the selected filters.
 */
const FilterDropdown = ({
  selectedItems,
  setSelectedItems,
  items,
  placeholder,
  resultCount,
  onApply,
}: FilterDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [triggerContent, setTriggerContent] = useState(placeholder)

  const handleApply = () => {
    onApply()
    setTriggerContent(selectedItems.length === 0 ? placeholder : `${selectedItems.length} Selected`)
    setIsDropdownOpen(false)
  }

  const handleClear = () => {
    setSelectedItems([])
  }

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
      placement="bottom-start"
      trigger={
        <Button color="info" className="relative" outline>
          <span className="truncate">{triggerContent}</span>
          <FaChevronDown className="ml-2 text-sm" />

          {resultCount > 0 && (
            <span
              className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold transform translate-x-1/2
                        -translate-y-1/2 bg-primary text-light"
              title={`${resultCount} results`}
            >
              {resultCount}
            </span>
          )}
        </Button>
      }
    >
      <div className="w-max max-w-64 p-4 border border-dark rounded-md bg-light shadow-md dark:border-secondary dark:bg-dark">
        <div className="max-h-48 overflow-y-auto">
          <CheckboxGroup selectedItems={selectedItems} setSelectedItems={setSelectedItems}>
            {items.map(({ id, label }) => {
              return <Checkbox key={id} value={id} label={label} />
            })}
          </CheckboxGroup>
        </div>

        <div className="flex justify-between items-center mt-2 pt-2">
          <Button color="secondary" size="sm" onClick={handleApply}>
            Apply
          </Button>
          <button
            title="Clear filters"
            className="flex items-center text-sm cursor-pointer text-gray-400 hover:text-danger"
            onClick={handleClear}
          >
            <FaTrashAlt className="mr-1" />
            Clear
          </button>
        </div>
      </div>
    </Dropdown>
  )
}

export default FilterDropdown
