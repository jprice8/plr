import React, { useState, useEffect, Fragment } from "react"
import toast from "react-hot-toast"
import { DocumentDownloadIcon } from "@heroicons/react/outline"

import api from "../../../../shared/utils/api"

import Loader from "../../../../shared/components/Loader"
import Table from "../../../../shared/components/Table"
import TextBanner from "../../../../shared/components/TextBanner"

import {
  NoFilter,
  SelectColumnFilter,
  checkIfFlagged,
} from "../../../../shared/utils/table"
import { getCleanedMfr } from "../../../../shared/utils/getCleanedMfr"
import { usdTwoDigits } from "../../../../shared/utils/currency"

const StatList = () => {
  const [loading, setLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)
  const [resets, setResets] = useState([])

  useEffect(() => {
    setLoading(true)

    const token = localStorage.getItem("access_token")
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    api({
      method: "GET",
      url: `/api/dashboard/stats/resets/`,
      headers,
    })
      .then((response) => {
        const requiredDataFromResponse = response.data
        let data = requiredDataFromResponse.map((reset) => ({
          id: reset.id,
          description: reset.description.substring(0, 20),
          mfr: reset.mfr,
          par: reset.par,
          reduction_ext: usdTwoDigits(reset.reduction_ext),
          week: reset.week,
          year: reset.year,
          flagged: reset.flags?.is_flag,
        }))
        setResets(data)
      })
      .catch((error) => {
        console.error(error)
        setResets([])
      })
      .finally(() => setLoading(false))
  }, [])

  const downloadTableHandler = () => {
    setExportLoading(true)

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
    api({
      url: "/api/dashboard/stats/resets/export/",
      method: "GET",
      responseType: "blob",
      headers,
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "par_resets.xlsx")
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
      Header: "Mfr",
      accessor: "mfr",
      Filter: NoFilter,
      Cell: (v) => (
        <img
          className="h-10 w-10 rounded-full"
          src={`//logo.clearbit.com/${getCleanedMfr(v.value)}.com`}
          alt="mfr_logo"
        />
      ),
    },
    {
      Header: "Item",
      accessor: "description",
    },
    {
      Header: "Reduction",
      accessor: "reduction_ext",
      Filter: NoFilter,
    },
    {
      Header: "Flagged",
      accessor: "flagged",
      Filter: SelectColumnFilter,
      filter: "equals",
      Cell: (v) => checkIfFlagged(v.value),
    },
  ])

  if (resets.length === 0 && !loading) {
    return <div>No pars reset yet!</div>
  }

  return (
    <Fragment>
      <TextBanner heading={"View Par Resets"} />
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="flex items-center mb-2">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mr-2">
                  Reset History
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
                <Table columns={columns} data={resets} />
              </div>

              <div className="m-20">{loading && <Loader />}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default StatList
