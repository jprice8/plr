import React, { Fragment } from "react"
import { useSelector } from "react-redux"

import { selectParById } from "../../../../../shared/redux/parsSlice"
import { getCleanedMfr } from "../../../../../shared/utils/getCleanedMfr"
import { usdTwoDigits } from "../../../../../shared/utils/currency"

const Excerpt = ({ parId }) => {
  const par = useSelector((state) => selectParById(state, parId))
  const cleanedMfr = getCleanedMfr(par.mfr)

  return (
    <Fragment>
      {/* Card Header */}
      <div className="flex">
        <img
          className="h-28 w-28 rounded-full shadow-md"
          src={`//logo.clearbit.com/${cleanedMfr}.com`}
          alt=""
        />

        <div className="flex-auto ml-5">
          <h2 className="border-b pb-4 border-gray-200 text-2xl leading-6 font-medium text-gray-900">
            {par.description}
          </h2>

          <h5 className="text-4xl my-4">
            {usdTwoDigits(par.unit_cost)}{" "}
            <span className="font-light text-sm">per LUOM</span>
          </h5>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-700 font-light mb-2">
          {par.location_name} | Location ID #{par.location_id}
        </p>
        <p className="text-gray-700 font-light">
          IMMS # {par.imms} | Catalog # {par.mfr_cat} | UOM{" "}
          {par.uom_conv_factor} {par.uom}
        </p>
      </div>

      {/* Info Cards */}
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Current Par Level
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {par.current_par_qty}
            </dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Optimal Par Level
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {par.recommended_par_qty}
            </dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Reduction Qty
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {par.qty_delta}
            </dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Ext Savings
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {usdTwoDigits(par.ext_delta)}
            </dd>
          </div>
        </dl>
      </div>
    </Fragment>
  )
}

export default Excerpt
