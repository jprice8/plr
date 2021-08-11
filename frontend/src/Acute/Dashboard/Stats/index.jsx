import { CashIcon, ClockIcon, TrendingDownIcon } from "@heroicons/react/outline"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Loader from "../../../shared/components/Loader"
import { usdTwoDigits } from "../../../shared/utils/currency"

const Stats = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const token = localStorage.getItem("access_token")

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }

        const result = await axios({
          method: "GET",
          url: "http://0.0.0.0:8000/api/dashboard/stats/",
          headers,
        })
        setData(result.data)
      } catch (error) {
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const icons = [
    <CashIcon className="h-6 w-6 text-white" aria-hidden="true" />,
    <ClockIcon className="h-6 w-6 text-white" aria-hidden="true" />,
    <TrendingDownIcon className="h-6 w-6 text-white" aria-hidden="true" />,
  ]

  return (
    <div className="lg:max-w-6xl lg:mx-auto pt-3">
      {error && <div>Something went wrong...</div>}
      {loading ? <div className="flex h-screen justify-center items-center"><Loader /></div> : ''}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-cyan-500 rounded-md p-3">
                {icons[item.id - 1]}
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.metric}
              </p>
            </dt>

            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.id === 1 && usdTwoDigits(item.value)}
                {item.id > 1 && item.value}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    to="/viewResets"
                    className="font-medium text-cyan-600 hover:text-cyan-500"
                  >
                    {" "}
                    View all<span className="sr-only"> {item.metric} </span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default Stats
