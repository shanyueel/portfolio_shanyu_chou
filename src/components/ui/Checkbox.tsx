import { FaCheck } from "react-icons/fa"
import { useCheckboxGroup } from "./CheckboxGroup"
import clsx from "clsx"

interface CheckboxProps {
  value: string | number
  label?: string
  isChecked?: boolean
  setIsChecked?: (checked: boolean) => void
}

/**
 * A functional component that renders a checkbox.
 * Can be used standalone or within CheckboxGroup.
 * @param value - The value of the checkbox.
 * @param label - The label to display next to the checkbox.
 * @param isChecked - (Optional) Controlled checked state when used standalone.
 * @param setIsChecked - (Optional) Callback to update checked state when used standalone.
 */
const Checkbox = ({ isChecked, setIsChecked, value, label }: CheckboxProps) => {
  const groupSetting = useCheckboxGroup()

  const checked = groupSetting ? groupSetting.selected.has(value) : (isChecked ?? false)

  const handleChange = groupSetting
    ? () => groupSetting.onToggle(value)
    : () => setIsChecked?.(!isChecked)

  return (
    <label className="group flex items-center py-1 gap-3 cursor-pointer" onClick={handleChange}>
      {/* Checkbox */}
      <span className="relative inline-block w-5 h-5">
        <span
          className={clsx(
            "block w-full h-full border border-gray-400 rounded transition duration-200 dark:border-gray-500",
            { "bg-secondary border-secondary": checked }
          )}
        />
        <FaCheck
          className={clsx(
            "absolute top-0 left-0 w-full h-full p-1 text-light opacity-0 transition-opacity duration-200",
            { "opacity-100": checked }
          )}
        />
      </span>
      {/* Label */}
      <span className="text-sm text-dark transition dark:text-light group-hover:text-secondary">
        {label || value}
      </span>
    </label>
  )
}

export default Checkbox
