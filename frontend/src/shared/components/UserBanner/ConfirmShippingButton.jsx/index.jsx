import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { PencilIcon } from "@heroicons/react/outline"

import api from "../../../utils/api"

import { getTimePhase } from "../../../utils/dateTime"

const ConfirmShippingButton = () => {
  const [shippingId, setShippingId] = useState(0)
  const history = useHistory()
  const user = useSelector((state) => state.users)
  const phase = getTimePhase()
  // Rule 1: Don't show to Resolute
  // Rule 2: Only show the button in the submit phase
  // Rule 3: If the user has already submitted, show an update button.

  // Check to see if user has already submitted a form for this week
  useEffect(() => {
    if (phase === "editPhase") {
      const fetchShippingId = async () => {
        try {
          const token = localStorage.getItem("access_token")
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
          const result = await api({
            method: "GET",
            url: `/api/incoming/checkShip/`,
            headers: headers,
          })
          setShippingId(result.data.id)
        } catch (error) {
          console.error(error)
        }
      }
      fetchShippingId()
    }
  }, [])

  const confirmShippingHandler = () => {
    history.push("/confirmation")
  }

  const updateShippingHandler = () => {
    history.push(`/updateShipping/${shippingId}`)
  }

  const getCorrectButton = () => {
    if (
      user.iam === "satx_acute" &&
      phase === "editPhase" &&
      shippingId === 0
    ) {
      return (
        <span className="relative inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={confirmShippingHandler}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6
              font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none
              focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50
              transition ease-in-out duration-150"
          >
            Confirm Shipping
          </button>
          <div className="flex absolute top-0 right-0 -mt-0.5 -mr-1">
            <span className="absolute inline-flex animate-ping">
              <span className="inline-flex rounded-full h-3 w-3 bg-pink-400 opacity-75"></span>
            </span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </div>
        </span>
      )
    } else if (
      user.iam === "satx_acute" &&
      phase === "editPhase" &&
      shippingId > 0
    ) {
      return (
        <button
          type="button"
          onClick={updateShippingHandler}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm leading-4
            font-medium rounded-md text-white bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-pink-500"
        >
          <PencilIcon className="-ml-1 mr-2 h-5 w-5" />
          Update Shipping
        </button>
      )
    } else {
      return <div></div>
    }
  }

  return <>{getCorrectButton()}</>
}

export default ConfirmShippingButton