import React from 'react'

const RowInfo = ({ label, value }) => {
  return (
    <div className="py-2 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-1">
        <span>
          {value}
        </span>
      </dd>
      
    </div>
  )
}

export default RowInfo
