import React from "react"
import { XCircleIcon } from "@heroicons/react/outline"

const ErrorModal = ({ errorMessage }) => {
  return (
    <div className="rounded-md bg-red-50 p-4 mt-2">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          {errorMessage && (
            <h3 className="text-sm font-medium text-red-800">{errorMessage}</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorModal
