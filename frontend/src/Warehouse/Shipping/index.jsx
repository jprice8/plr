import React, { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { DocumentDownloadIcon } from "@heroicons/react/outline"

import Table from "../../shared/components/Table"
import TextBanner from "../../shared/components/TextBanner"
import Loader from "../../shared/components/Loader"

import { getFacilityName } from "../../shared/utils/getFacilityName"
import { NoFilter } from "../../shared/utils/table"

const Shipping = () => {
  const [loading, setLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)
  const [incomingShipments, setIncomingShipments] = useState([])

  useEffect(() => {
    setLoading(true)

    const token = localStorage.getItem("access_token")
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    axios({
      method: "GET",
      url: `http://0.0.0.0:8000/api/incoming/`,
      headers,
    })
      .then((response) => {
        const requiredDataFromResponse = response.data
        let data = requiredDataFromResponse.map((incoming) => ({
          id: incoming.id,
          resetIds: incoming.reset_ids,
          week: incoming.week,
          year: incoming.year,
          facilityCode: getFacilityName(incoming.facility_code),
          trackingNumber: incoming.tracking_number,
          createdAt: incoming.created_at,
        }))
        setIncomingShipments(data)
      })
      .catch((error) => {
        setIncomingShipments([])
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, [])

  const downloadTableHandler = () => {
    setExportLoading(true)

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
    axios({
      url: "http://0.0.0.0:8000/api/incoming/shipping/export/",
      method: "GET",
      responseType: "blob",
      headers,
    })
      .then((response) => {
        console.log(`Response data: ${response}`)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "shipping_breakout_warehouse.xlsx")
        document.body.appendChild(link)
        link.click()
        toast.success("Successfully exported to spreadsheet!")
      })
      .catch((error) => {
        console.error(error)
        toast.error("Error exporting to spreadsheet.")
      })

    setExportLoading(false)
  }

  const columns = React.useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
      Filter: NoFilter,
    },
    {
      Header: "Week",
      accessor: "week",
    },
    {
      Header: "Year",
      accessor: "year",
    },
    {
      Header: "Facility",
      accessor: "facilityCode",
    },
    {
      Header: "LL Tracking No",
      accessor: "trackingNumber",
    },
  ])

  if (incomingShipments.length === 0 && !loading) {
    return <div>No incoming shipments available!</div>
  }

  return (
    <>
      <TextBanner heading={'Shipping History'} />
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="flex items-center mb-2">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mr-2">
                  Shipped to Warehouse
                </h2>
                <button className="items-center" onClick={downloadTableHandler}>
                  {exportLoading ? <Loader /> : <DocumentDownloadIcon className="h-5 w-5 text-cyan-500 hover:text-cyan-900" />}
                </button>
              </div>
              <div className="shadow border-b border-gray-200 sm:rounded-lg">
                <Table columns={columns} data={incomingShipments} />
              </div>

              <div className="m-20">{loading && <Loader />}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shipping
