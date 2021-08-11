import React from "react"

const TextBanner = ({ heading }) => {
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-4xl mb-4">{heading}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextBanner
