import React from "react"
import { useLocation } from "react-router-dom"

import ClearbitDisclosure from "../../../shared/components/ClearbitDisclosure"
import ShippingConfirmationForm from "./ShippingConfirmationForm"

const ShippingConfirmation = () => {
  const location = useLocation()

  const checkIfSubmit = () => {
    // If the pathname is updateShipping then isSubmit is false
    if (location.pathname.includes("updateShipping")) {
      return false
    } else {
      return true
    }
  }
  const isSubmit = checkIfSubmit()

  return (
    <>
      <div className="sm:max-w-4xl sm:mx-auto pt-10">
        {isSubmit === true ? (
          <>
            <h3 className="text-3xl mb-10">Confirm Shipping</h3>
            <h5 className="text-lg font-light text-gray-500 mb-10">
              Please review your resets below and confirm the PUT list items
              being shipped back to the warehouse by providing the Lab Logistics
              confirmation number for this week's shipment.
            </h5>
            <ShippingConfirmationForm isSubmit={isSubmit} />
            <ClearbitDisclosure />
          </>
        ) : (
          <>
            <h3 className="text-3xl mb-10">Update Shipping</h3>
            <h5 className="text-lg font-light text-gray-500 mb-10">
              Please review your resets below and confirm the PUT list items
              being shipped back to the warehouse by providing the Lab Logistics
              confirmation number for this week's shipment.
            </h5>
            <ShippingConfirmationForm isSubmit={isSubmit} />
            <ClearbitDisclosure />
          </>
        )}
      </div>
    </>
  )
}

export default ShippingConfirmation