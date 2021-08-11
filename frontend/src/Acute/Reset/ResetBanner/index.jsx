import React from 'react'

const ResetBanner = ({ currentMonth, currentYear }) => {
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-4xl mb-4">Week {currentMonth}, {currentYear}</h2>
            <h5 className="text-xl text-gray-600">Select your current week to get started</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetBanner
