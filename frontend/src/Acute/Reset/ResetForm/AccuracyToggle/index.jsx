import React, { useState } from "react"
import { Switch } from "@headlessui/react"

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const AccuracyToggle = ({
  isParAccurateHandler,
  parAccurate,
  currentRop
}) => {
  return (
    <div className="mt-5 bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Switch
            checked={parAccurate}
            onChange={isParAccurateHandler}
            className={classNames(
              parAccurate ? "bg-cyan-600" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            )}
          >
            <span className="sr-only">Confirm Sendback Quantity</span>
            <span
              aria-hidden="true"
              className={classNames(
                parAccurate ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}
            />
          </Switch>
        </div>
        <div className="ml-5">
          <p className="text-sm text-yellow-700">ACTION REQUIRED: Physically check the par location and toggle the switch on the left if the par currently has {currentRop} units </p>
        </div>
      </div>
    </div>
  )
}

export default AccuracyToggle