import React from "react"

const Checkbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
        />
      </>
    )
  }
)

export default Checkbox