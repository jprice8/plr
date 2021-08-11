import React from 'react'
import { getCleanedMfr } from "../../../../../shared/utils/getCleanedMfr"

const ParBadge = ({ par }) => {
  const cleanedMfr = getCleanedMfr(par.mfr)

  return (
    <div className="flex items-center space-x-5">
      <div className="flex-shrink-0">
        <div className="relative">
          <img 
            className="h-8 w-8 rounded-full"
            src={`//logo.clearbit.com/${cleanedMfr}.com`}
            alt="logo"
          />
          <span 
            className="absolute inset-0 shadow-inner rounded-full"
            aria-hidden="true"
          />
        </div>
      </div>

      <div>
        <h1 className="text-sm font-bold">
          {par.description}
        </h1>
        <p className="font-light">IMMS # {par.imms} | {par.location_name}</p>
      </div>
    </div>
  )
}

export default ParBadge
