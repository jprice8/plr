import React from "react"
import { SearchCircleIcon } from "@heroicons/react/outline"

// Define a default UI for filtering
export const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length

  return (
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
        className="focus:ring-cyan-500 focus:border-cyan-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
        placeholder={`Search ${count} items`}
      />
      <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none">
        <SearchCircleIcon className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  )
}

// Select an option from a dropwdown menu.
export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
      className="mt-1 block text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-xs rounded-md h-8"
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// For columns showing no filter
export function NoFilter() {
  return <div></div>
}

export const checkIfFlagged = (val) => {
  if (val === "Yes") {
    return <div className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">Yes</div>
  } else {
    return ""
  }
}