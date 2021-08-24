import React, { useState, useEffect } from "react"
import axios from "axios"
import { DocumentDownloadIcon } from "@heroicons/react/outline"
import toast from "react-hot-toast"

import api from "../../shared/utils/api"

import Loader from "../../shared/components/Loader"
import { getFacilityName } from "../../shared/utils/getFacilityName"
import { checkIfFlagged } from "../../shared/utils/table"

import UserBanner from "../../shared/components/UserBanner"
import Table from "../../shared/components/Table"

import { SelectColumnFilter, NoFilter } from "../../shared/utils/table"

const Overview = () => {
  const [loading, setLoading] = useState(false)
  const [shipments, setShipments] = useState([])
  const [exportLoading, setExportLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("access_token")
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    api({
      method: "get",
      url: "/api/shipments/",
      headers,
    })
      .then((response) => {
        const requiredDataFromResponse = response.data
        let data = requiredDataFromResponse.map((shipment) => ({
          id: shipment.id,
          par: shipment.par,
          week: shipment.week,
          year: shipment.year,
          facilityName: getFacilityName(shipment.facility_code),
          imms: shipment.imms,
          description: shipment.description.substring(0, 15),
          facilityCode: shipment.facility_code,
          mfr: shipment.mfr,
          uom: shipment.uom,
          warehouseSendBackQtyLuom: shipment.warehouse_send_back_qty_luom,
          warehouseSendBackQtyPuom: shipment.warehouse_send_back_qty_puom,
          flagged: shipment.flags?.is_flag,
        }))
        setShipments(data)
      })
      .catch((error) => {
        setShipments([]) // optional
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, []) // componentDidMount

  const downloadTableHandler = () => {
    setExportLoading(true)

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
    api({
      url: "/api/shipments/export/",
      method: "GET",
      responseType: "blob",
      headers,
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "shipped_par_resets.xlsx")
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

  const columns = React.useMemo(
    () => [
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
        accessor: "facilityName",
      },
      {
        Header: "imms",
        accessor: "imms",
        Filter: NoFilter,
      },
      {
        Header: "Description",
        accessor: "description",
        Filter: NoFilter,
      },
      {
        Header: "Flagged",
        accessor: "flagged",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: (v) => checkIfFlagged(v.value),
      },
    ],
    []
  )

  return (
    <>
      <UserBanner />
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="flex items-center mb-2">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mr-2">
                  Receiving History
                </h2>
                <button className="items-center" onClick={downloadTableHandler}>
                  {exportLoading ? (
                    <Loader />
                  ) : (
                    <DocumentDownloadIcon className="h-5 w-5 text-cyan-500 hover:text-cyan-900" />
                  )}
                </button>
              </div>
              <div className="shadow border-b border-gray-200 sm:rounded-lg">
                <Table columns={columns} data={shipments} />
              </div>

              <div className="m-20">{loading && <Loader />}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Overview