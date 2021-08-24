import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"

import api from "../../../../shared/utils/api"

import Loader from "../../../../shared/components/Loader"
import ParBadge from "./ParBadge"

const ShippingConfirmationForm = ({isSubmit}) => {
  const { shippingId } = useParams()
  const history = useHistory()
  const [loadingFetch, setLoadingFetch] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [confNumber, setConfNumber] = useState("")
  const [pars, setPars] = useState([])

  const user = useSelector((state) => state.users)

  useEffect(() => {
    const fetchParsData = async () => {
      setLoadingFetch(true)
      try {
        const token = localStorage.getItem("access_token")
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
        const result = await api({
          method: "GET",
          url: "/api/incoming/confirm/",
          headers: headers,
        })
        setPars(result.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingFetch(false)
      }
    }
    fetchParsData()
  }, [])

  let resetIdList = []
  pars.map((par) => resetIdList.push(par.id))

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoadingSubmit(true)
    if (isSubmit) {
      // Send form to create shipping handler
      try {
        const token = localStorage.getItem("access_token")
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
        const formData = {
          reset_ids: resetIdList,
          week: pars[0].week,
          year: pars[0].year,
          facility_code: pars[0].facility_code,
          sender: user.id,
          tracking_number: confNumber,
        }
        await api({
          method: "POST",
          url: `/api/incoming/confirm/create/`,
          data: formData,
          headers,
        })
        toast.success("Shipping confirmed!")
        setConfNumber("")
        setLoadingSubmit(false)
        history.push("/")
      } catch (error) {
        console.log(error)
        toast.error(
          `There was an error confirming your shipping. Please try again.`
        )
        setConfNumber("")
        setLoadingSubmit(false)
      } 
    } else {
      // Send form to update endpoint
      try {
        const token = localStorage.getItem("access_token")
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
        const formData = {
          tracking_number: confNumber,
        }
        await api({
          method: "PUT",
          url: `/api/incoming/confirm/update/${shippingId}/`,
          data: formData,
          headers,
        })
        toast.success("Shipping udpated!")
        setConfNumber("")
        setLoadingSubmit(false)
        history.push("/")
      } catch (error) {
        console.error(error)
        setConfNumber("")
        setLoadingSubmit(false)
        toast.error("There was an error updating your shipping. Please try again.")
      } 
    }
  }

  const handleConfNumberChange = (e) => {
    setConfNumber(e.target.value)
  }

  const cancelHandler = () => {
    history.push("/")
  }

  const loadingOrConfirmButton = (load) => {
    if (load) {
      return <Loader />
    }
    return "Submit"
  }

  return (
    <>
      <div className="shadow sm:rounded-md sm:overflow-hidden bg-white">
        <div className="">
          <div className="divid-y divide-gray-200">
            <div className="px-8 py-5 sm:px-12">
              <dl className="divide-y divide-gray-200">
                {loadingFetch ? <Loader /> : ""}
                {pars?.map((par) => (
                  <div
                    key={par.id}
                    className="py-2 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4"
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      <ParBadge par={par} />
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-1 justify-center items-center">
                      Sending Back {par.warehouse_send_back_qty_puom} (PUOM)
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {pars.length > 0 ? (
              <form onSubmit={onSubmit}>
                <div className="px-8 py-5 sm:px-12">
                  <label
                    htmlFor="confNumber"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Confirmation Number
                  </label>
                  <input
                    required
                    type="text"
                    name="confNumber"
                    id="confNumber"
                    autoComplete="text"
                    placeholder="ex. 123456789"
                    onChange={handleConfNumberChange}
                    value={confNumber}
                    className="w-full max-w-sm block shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="bg-gray-50 px-8 py-5 sm:px-12">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={cancelHandler}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      {loadingOrConfirmButton(loadingSubmit)}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <h2 className="p-10 font-medium text-2xl">
                No resets this week!
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShippingConfirmationForm