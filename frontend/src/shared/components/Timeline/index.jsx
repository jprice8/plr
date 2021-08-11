import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { formatDistance } from "date-fns"
import { CheckIcon, TruckIcon, ExclamationIcon } from "@heroicons/react/solid"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Timeline = ({ loadingFlag }) => {
  const { resetNo } = useParams()
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token")
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
        const result = await axios({
          method: "GET",
          url: `http://0.0.0.0:8000/api/shipments/timeline/${resetNo}/`,
          headers,
        })
        setTimeline(result.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [loadingFlag])

  const iconList = [
    {
      icon: CheckIcon,
      iconBackground: "bg-green-500",
    },
    {
      icon: TruckIcon,
      iconBackground: "bg-blue-500",
    },
    {
      icon: ExclamationIcon,
      iconBackground: "bg-yellow-500",
    },
  ]

  const getIcon = (idx) => {
    if (idx === 0) {
      return (
        <CheckIcon
          className="h-5 w-5 text-white rounded-full"
          aria-hidden="true"
        />
      )
    } else if (idx === 1) {
      return (
        <TruckIcon
          className="h-5 w-5 text-white rounded-full"
          aria-hidden="true"
        />
      )
    } else if (idx === 2) {
      return (
        <ExclamationIcon
          className="h-5 w-5 text-white rounded-full"
          aria-hidden="true"
        />
      )
    }
  }

  return (
    <section aria-labelledby="timeline-title">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2
          id="timeline-title"
          className="text-lg font-medium text-gray-900 pb-6"
        >
          Timeline
        </h2>

        <div className="">
          <ul className="divide-y divide-gray-200">
            {timeline.map((activity, activityIdx) => (
              <li key={activity.id} className="py-4">
                <div className="flex space-x-3">
                  <span
                    className={classNames(
                      iconList[activityIdx].iconBackground,
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                    )}
                  >
                    {getIcon(activityIdx)}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        {activity.first_name} {activity.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {`${formatDistance(
                          new Date(),
                          new Date(activity.timestamp)
                        )} ago`}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{activity.event}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Timeline
