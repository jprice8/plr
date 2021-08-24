import React, { useState, useEffect, Fragment } from "react"
import {
  ChevronRightIcon,
} from "@heroicons/react/outline"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid"
import { Link } from "react-router-dom"

import api from "../../shared/utils/api"

import ResetBanner from "./ResetBanner"
import ResetFooter from "./ResetFooter"
import { getTimePhase } from "../../shared/utils/dateTime"

const Reset = () => {
  const [data, setData] = useState({})
  const [weeksUrl, setWeeksUrl] = useState(
    "/api/reset/weeks/"
  )
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const phase = getTimePhase()

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
          url: weeksUrl,
          headers,
        })
        setData(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [weeksUrl])

  const results = data.results
  const date = new Date()
  const week = data.count
  const year = date.getFullYear()

  const numberedLinkHandler = (e, i) => {
    e.preventDefault()
    setWeeksUrl(`/api/reset/weeks/?page=${i}`)
    setCurrentPageNumber(i)
  }

  const prevLinkHandler = (e, i) => {
    e.preventDefault()
    setWeeksUrl(i)
    setCurrentPageNumber(currentPageNumber - 1)
  }

  const nextLinkHandler = (e, i) => {
    e.preventDefault()
    setWeeksUrl(i)
    setCurrentPageNumber(currentPageNumber + 1)
  }

  const statusBadge = (status) => {
    if (status === "Submitted") {
      return (
        <>
          <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
          <p>Submitted</p>
        </>
      )
    } else if (status === "Missed") {
      return (
        <>
          <XCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" />
          <p>Missed</p>
        </>
      )
    } else if (status === "New") {
      return (
        <>
          <ExclamationCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-400" />
          <p>New</p>
        </>
      )
    }
  }

  const newFormLinks = []
  for (let i = 0; i < results?.length; i++) {
    newFormLinks.push(
      <li key={i}>
        <Link
          to={
            results[i].week_number === week
              ? `/${results[i].week_number}/step1`
              : "#"
          }
          className="block hover:bg-gray-50"
        >
          <div className="px-4 py-4 flex items-center sm:px-6">
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="truncate">
                <div className="flex text-lg">
                  <p className="font-medium text-darkSecondary truncate">
                    Week {results[i].week_number}
                  </p>
                </div>

                <div className="mt-2 flex">
                  <div className="flex items-center font-light text-sm text-gray-500">
                    {statusBadge(results[i].submission_status)}
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-5 flex-shrink-0">
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </Link>
      </li>
    )
  }

  return (
    <Fragment>
      {phase === "sleepPhase" ? (
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                <h2 className="text-4xl mb-4">Come Back Monday!</h2>
                <p className="text-lg text-gray-600">
                  We are currently processing last week's resets and preparing next week's.
                  We will email you Monday morning when your Pars are ready!
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ResetBanner currentMonth={week} currentYear={year} />
          <div className="max-w-5xl mx-auto">
            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-20">
              <ul className="divide-y divide-gray-200">
                {newFormLinks}
              </ul>
              <ResetFooter
                data={data}
                prevLinkHandler={prevLinkHandler}
                numberedLinkHandler={numberedLinkHandler}
                nextLinkHandler={nextLinkHandler}
                currentPageNumber={currentPageNumber}
              />
            </div>
          </div>
        </>
      )}
    </Fragment>
  )
}

export default Reset