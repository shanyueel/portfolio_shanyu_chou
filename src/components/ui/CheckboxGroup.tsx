import { createContext, useContext, ReactElement, Children, isValidElement } from "react"
import Checkbox from "./Checkbox"

interface CheckboxGroupContextValue {
  selected: Set<string | number>
  onToggle: (value: string | number) => void
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)

export const useCheckboxGroup = () => {
  return useContext(CheckboxGroupContext)
}

interface CheckboxGroupProps<T extends string | number> {
  selectedItems: T[]
  setSelectedItems: (selected: T[]) => void
  children: ReactElement<typeof Checkbox>[]
  className?: string
}

const CheckboxGroup = <T extends string | number>({
  selectedItems,
  setSelectedItems,
  children,
  className = "",
}: CheckboxGroupProps<T>) => {
  const selectedSet = new Set(selectedItems)

  // validation: confirm at runtime that all children are Checkbox components
  if (process.env.NODE_ENV !== "production") {
    Children.forEach(children, child => {
      if (!isValidElement(child)) {
        const receivedType = typeof child
        console.error(
          "CheckboxGroup: All children must be valid React elements." + `Received: ${receivedType}`
        )
      } else if (child.type !== Checkbox) {
        const receivedType = typeof child.type === "function" ? child.type.name : String(child.type)
        console.error(
          "CheckboxGroup: All children must be Checkbox components. " + `Received: ${receivedType}`
        )
      }
    })
  }

  const handleToggle = (value: T) => {
    const newSelected = new Set(selectedItems)

    // toggle value
    if (newSelected.has(value)) {
      newSelected.delete(value)
    } else {
      newSelected.add(value)
    }

    // update parent state
    setSelectedItems(Array.from(newSelected))
  }

  const contextValue: CheckboxGroupContextValue = {
    selected: selectedSet,
    onToggle: handleToggle as (value: string | number) => void,
  }

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </CheckboxGroupContext.Provider>
  )
}

export default CheckboxGroup
