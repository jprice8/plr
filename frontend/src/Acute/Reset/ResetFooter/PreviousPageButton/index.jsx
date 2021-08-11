import React from "react"
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid"

const PreviousPageButton = ({ prevUrl, prevLinkHandler }) => {
  return (
    <div className="place-self-start px-5">
      {prevUrl && (
        <a
          onClick={(e) => prevLinkHandler(e, prevUrl)}
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
        >
          <ArrowNarrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </a>
      )}
    </div>
  )
}

export default PreviousPageButton
