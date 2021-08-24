import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DocumentDownloadIcon } from "@heroicons/react/outline"
import toast from "react-hot-toast"

import api from "../../../shared/utils/api"

import { getFacilityName } from "../../../shared/utils/getFacilityName"
import { getCleanedMfr } from "../../../shared/utils/getCleanedMfr"
import { NoFilter, SelectColumnFilter } from "../../../shared/utils/table"

import Loader from "../../../shared/components/Loader"
import Table from "../../../shared/components/Table"
import TextBanner from "../../../shared/components/TextBanner"

const ShippingDetail = () => {
  const { shippingId } = useParams()
  const [loading, setLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)
  const [incomingResets, setIncomingResets] = useState([])

  useEffect(() => {
    setLoading(true)

    const token = localStorage.getItem("access_token")
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    api({
      method: "GET",
      url: `/api/incoming/${shippingId}/`,
      headers,
    })
      .then((response) => {
        const requiredDataFromResponse = response.data
        let data = requiredDataFromResponse.map((incoming) => ({
          id: incoming.id,
          week: incoming.week,
          year: incoming.year,
          facilityName: getFacilityName(incoming.facility_code),
          imms: incoming.imms,
          mfr: incoming.mfr,
          description: incoming.description.substring(0, 20),
          locationId: incoming.location_id,
          mfr: incoming.mfr,
          uom: incoming.mfr,
          warehouseSendBackQtyLuom: incoming.warehouse_send_back_qty_luom,
          warehouseSendBackQtyPuom: incoming.warehouse_send_back_qty_puom,
          flagged: incoming.flags?.is_flag,
        }))
        setIncomingResets(data)
      })
      .catch((error) => {
        setIncomingResets([])
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, [])

  const downloadTableHandler = () => {
    setExportLoading(true)

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
    api({
      url: `/api/incoming/export/${shippingId}`,
      method: "GET",
      responseType: "blob",
      headers,
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "incoming_resets_to_dc.xlsx")
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

  const checkIfFlagged = (val) => {
    if (val === 'Yes') {
      return <div className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">Yes</div>
    } else {
      return ''
    }
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
        Filter: NoFilter,
      },
      {
        Header: "Facility",
        accessor: "facilityName",
        Filter: NoFilter,
      },
      {
        Header: "Mfr",
        accessor: "mfr",
        Filter: NoFilter,
        Cell: v => (
          <img 
            className="h-10 w-10 rounded-full"
            src={`//logo.clearbit.com/${getCleanedMfr(
              v.value
            )}.com`}
            alt="mfr_logo"
          />
        )
      },
      {
        Header: "IMMS",
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
        Cell: v => checkIfFlagged(v.value)
      },
    ],
    []
  )

  if (incomingResets.length === 0 && !loading) {
    return <div>No shipment data available!</div>
  }

  return (
    <>
      <TextBanner heading={`Shipment #${shippingId}`} />
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="flex items-center mb-2">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mr-2">
                  Items Included in Shipment
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
                <Table
                  columns={columns}
                  data={incomingResets}
                />
              </div>

              <div className="m-20">{loading && <Loader />}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShippingDetail