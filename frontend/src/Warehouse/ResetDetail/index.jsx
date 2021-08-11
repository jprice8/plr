import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"

import Messages from "../../shared/components/Messages"
import Timeline from "../../shared/components/Timeline"
import Loader from "../../shared/components/Loader"
import FlagResetButton from "./FlagResetButton"

import { getCleanedMfr } from "../../shared/utils/getCleanedMfr"
import { getFacilityName } from "../../shared/utils/getFacilityName"
import { getFormattedDate } from "../../shared/utils/dateTime"


function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const ResetDetail = () => {
  const [shipment, setShipment] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingFlag, setLoadingFlag] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(false)
  const [msgContent, setMsgContent] = useState("")

  const user = useSelector((state) => state.users)

  const cleanedMfr = getCleanedMfr(shipment?.mfr)
  const cleanedFacilityName = getFacilityName(shipment?.sender_facility_code)
  const cleanedResetDate = getFormattedDate(shipment?.last_updated)
  const isFlagged = shipment?.flags

  const { resetNo } = useParams()

  useEffect(() => {
    setLoading(true)
    const ajaxRequest = axios.CancelToken.source()
    const shipmentsUrl = `http://0.0.0.0:8000/api/shipments/${resetNo}/`

    const fetchShipmentData = async () => {
      try {
        const token = localStorage.getItem("access_token")
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
        const response = await axios.get(shipmentsUrl, {
          cancelToken: ajaxRequest.token,
          headers: headers,
        })
        console.log(response.data)
        setShipment(response.data)
      } catch (err) {
        console.log(`There was an error with the ajax request: ${err}`)
      } finally {
        setLoading(false)
      }
    }
    fetchShipmentData()

    return () => {
      ajaxRequest.cancel()
    }
  }, [loadingFlag, loadingMessage])

  const flagButtonHandler = async () => {
    if (isFlagged) {
      setLoadingFlag(true)
      try {
        const flagUrl = `http://0.0.0.0:8000/api/shipments/flag/${shipment.flags.id}/`
        const token = localStorage.getItem("access_token")
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
        await axios({
          method: "DELETE",
          url: flagUrl,
          headers,
        })
        toast.success("Reset unflagged!")
      } catch (error) {
        console.log(`Error deleting flag object: ${error}`)
        toast.error("Error unflaggin reset")
      } finally {
        setLoadingFlag(false)
      }
    } else {
      setLoadingFlag(true)
      try {
        const flagUrl = `http://0.0.0.0:8000/api/shipments/flag/`
        const token = localStorage.getItem("access_token")
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
        const formData = {
          reset: resetNo,
          user: user.id,
        }
        await axios({
          method: "POST",
          url: flagUrl,
          data: formData,
          headers,
        })
        toast.success("Reset flagged!")
      } catch (error) {
        console.log(`Error creating flag object: ${error}`)
        toast.error("Error flagging reset")
      } finally {
        setLoadingFlag(false)
      }
    }
  }

  const handleMsgContentChange = (e) => {
    setMsgContent(e.target.value)
  }

  const handleMsgDelete = (msgIdx) => {
    setLoadingMessage(true)
    const token = localStorage.getItem("access_token")
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    axios({
      method: "DELETE",
      url: `http://0.0.0.0:8000/api/shipments/message/${msgIdx}/`,
      headers,
    })
      .then((result) => {
        console.log(result)
        toast.success("Message deleted!")
      })
      .catch((error) => {
        console.error(error)
        toast.error("Error deleting message!")
      })
      .finally(() => {
        setLoadingMessage(false)
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoadingMessage(true)
    try {
      const messageUrl = `http://0.0.0.0:8000/api/shipments/message/`
      const token = localStorage.getItem("access_token")
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
      const formData = {
        reset: resetNo,
        sender: user.id,
        receiver: shipment.sender_id,
        msg_content: msgContent,
      }
      await axios({
        method: "POST",
        url: messageUrl,
        data: formData,
        headers,
      })
      toast.success("Message Sent!")
    } catch (error) {
      console.log(`Error creating message object: ${error}`)
      toast.error("Error sending message")
    } finally {
      setLoadingMessage(false)
      setMsgContent("")
    }
  }

  return (
    <main className="py-10">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        {loading && <Loader />}
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full"
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
            <h1 className="text-2xl font-bold text-gray-900">
              {shipment.description}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Par reset by{" "}
              <span className="text-gray-900">
                {shipment.sender_first_name} {shipment.sender_last_name}
              </span>{" "}
              at <span className="text-gray-900">{cleanedFacilityName}</span> on{" "}
              <span className="text-gray-900">
                {cleanedResetDate.month} {cleanedResetDate.day},{" "}
                {cleanedResetDate.year}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse">
          <FlagResetButton
            isFlagged={isFlagged}
            flagButtonHandler={flagButtonHandler}
            loadingFlag={loadingFlag}
          />
        </div>
      </div>

      <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          {/* Reset Description */}
          <section>
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="reset-information-title"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Reset Details
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Item details and reset information.
                </p>
              </div>

              <div className="border-t border-gray-200 py-5 divide-y divide-gray-200 px-5">
                <div className="">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-2 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        UOM | IMMS | Cat No
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                        <span>
                          {shipment.uom_conv_factor} {shipment.uom} |{" "}
                          {shipment.imms} | {shipment.mfr_cat}
                        </span>
                      </dd>
                    </div>

                    <div className="py-2 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Par Location
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                        <span>
                          {shipment.location_name} (ID#{shipment.location_id})
                        </span>
                      </dd>
                    </div>

                    <div className="py-2 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Old Par Level
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                        <span>{shipment.current_par_qty}</span>
                      </dd>
                    </div>

                    <div className="py-2 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        New Par Level
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                        <span>{shipment.reset_level}</span>
                      </dd>
                    </div>

                    <div className="py-2 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Sending Back to Warehouse
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                        <span>
                          {shipment.warehouse_send_back_qty_luom} LUOM (
                          {shipment.warehouse_send_back_qty_puom} PUOM)
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </section>

            <Messages
              reset={shipment}
              user={user}
              onSubmit={onSubmit}
              msgContent={msgContent}
              handleMsgContentChange={handleMsgContentChange}
              handleMsgDelete={handleMsgDelete}
              loadingMessage={loadingMessage}
            />
        </div>

        <Timeline loadingFlag={loadingFlag} />
      </div>
    </main>
  )
}

export default ResetDetail