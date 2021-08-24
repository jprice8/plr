import React, { useEffect, useState } from "react"
import axios from "axios"
import { Line } from "react-chartjs-2"

import api from "../../../shared/utils/api"

const Chart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token")
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
        const result = await api({
          method: "GET",
          url: "/api/dashboard/chart/",
          headers,
        })
        setData(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const chartLabels = data?.labels?.map((l) => {
    return `Week ${l}`
  })
  const lineChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Inventory Reduction $",
        data: data?.data,
        fill: false,
        tension: 0.4,
        backgroundColor: "lightblue",
        borderColor: "lightblue",
      },
    ],
  }

  const options = {
    responsive: true,
    fill: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 1000,
      },
    },
  }

  return (
    <div className="lg:max-w-6xl lg:mx-auto mt-10 hidden sm:block">
      <div className="bg-white rounded-lg">
        <div className="px-20 py-5">
          <Line data={lineChartData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default Chart
