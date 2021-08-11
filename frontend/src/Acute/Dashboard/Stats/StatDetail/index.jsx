import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"

import Messages from "../../../../shared/components/Messages"
import Timeline from "../../../../shared/components/Timeline"
import ClearbitDisclosure from "../../../../shared/components/ClearbitDisclosure"
import Loader from "../../../../shared/components/Loader"

import { usdTwoDigits } from "../../../../shared/utils/currency"
import { getFormattedDate } from "../../../../shared/utils/dateTime"
import { getCleanedMfr } from "../../../../shared/utils/getCleanedMfr"

import RowInfo from "./RowInfo"
import Panel from "./Panel"

const StatDetail = () => {
  const user = useSelector((state) => state.users)
  const { resetNo } = useParams()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const { month, day, year, hour, minute, suffix } = getFormattedDate(
    data.last_updated
  )
  const cleanedMfr = getCleanedMfr(data.mfr)
  const [loadingMessage, setLoadingMessage] = useState(false)
  const [msgContent, setMsgContent] = useState("")
  const isFlagged = data?.flags

  const getReceiverId = () => {
    if (user.iam === "satx_dc") {
      return data.sender_id
    } else if (user.iam === "satx_acute") {
      return 59
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
      url: `http://0.0.0.0:8000/api/shipments/message/${msgIdx}`,
      headers,
    })
      .then((response) => {
        console.log(response)
        toast.success("Message deleted!")
      })
      .catch((error) => {
        console.error(error)
        toast.error("Error deleting message!")
      })
      .finally(() => setLoadingMessage(false))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const token = localStorage.getItem("access_token")
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
        const result = await axios({
          method: "GET",
          url: `http://0.0.0.0:8000/api/dashboard/stats/resets/${resetNo}`,
          headers,
        })
        setData(result.data)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [loadingMessage])

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
        receiver: getReceiverId(),
        msg_content: msgContent,
      }
      await axios({
        method: "POST",
        url: messageUrl,
        data: formData,
        headers,
      })
      setLoadingMessage(false)
      setMsgContent("")
      toast.success("Message Sent!")
    } catch (error) {
      console.error(error)
      setLoadingMessage(false)
      setMsgContent("")
      toast.error("Error sending message!")
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
                className="h-24 w-24 rounded-full"
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
              {data.description}
            </h1>
            <p className="mt-2 font-medium text-gray-500">
              {usdTwoDigits(data.unit_cost)} per LUOM
            </p>
            <p className="mt-2 font-medium text-gray-500">
              UOM {data.uom_conv_factor} {data.uom} | IMMS # {data.imms} |
              Catalog # {data.mfr_cat}
            </p>
          </div>
        </div>

        <div>
          {isFlagged ? (
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Flagged by Warehouse
            </span>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        {/* First Column */}
        {/* Reset Description */}
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          <section aria-labelledby="reset-information-title">
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
                    {/* Detail rows here */}
                    <RowInfo
                      label={"Location Name (#ID)"}
                      value={`${data.location_name} (#${data.location_id})`}
                    />
                    <RowInfo
                      label={"Department No"}
                      value={data.dept_id}
                    />
                    <RowInfo
                      label={"Expense Account No"}
                      value={data.expense_account_no}
                    />
                    <RowInfo
                      label={"Issue Qty in 52 Weeks"}
                      value={data.issues_52_weeks}
                    />
                    <RowInfo
                      label={"Times Issued in 52 Weeks"}
                      value={data.adjustments_52_weeks}
                    />
                    <RowInfo
                      label={"Recommended Par Level"}
                      value={data.recommended_par_qty}
                    />
                    <RowInfo
                      label={"Warehouse Send Back Qty"}
                      value={`${data.warehouse_send_back_qty_luom} LUOM (${data.warehouse_send_back_qty_puom} PUOM)`}
                    />
                  </dl>
                </div>
              </div>
              <Panel user={user} reset={data} />
            </div>
            <ClearbitDisclosure />
          </section>

          {user.iam === "satx_acute" ? (
            <Messages
              reset={data}
              user={user}
              onSubmit={onSubmit}
              msgContent={msgContent}
              handleMsgContentChange={handleMsgContentChange}
              handleMsgDelete={handleMsgDelete}
              loadingMessage={loadingMessage}
            />
          ) : (
            <></>
          )}
        </div>

        {/* Second Column */}
        <div className="space-y-6 lg:col-start-3 lg:col-span-1">
          {/* Timeline */}
          <Timeline />
        </div>
      </div>
    </main>
  )
}

export default StatDetail