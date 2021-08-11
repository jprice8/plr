import React from "react"
import { ArrowNarrowRightIcon } from "@heroicons/react/solid"

const NextPageButton = ({ nextUrl, nextLinkHandler }) => {
  return (
    <div className="place-self-end pb-5 px-5">
      {nextUrl && (
        <a
          onClick={(e) => nextLinkHandler(e, nextUrl)}
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
        >
          Next
          <ArrowNarrowRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </a>
      )}
    </div>
  )
}

export default NextPageButton
