import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { unwrapResult } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import { updateUser } from "../../../redux/usersSlice"
import Loader from "../../Loader"

const UpdateProfile = () => {
  const { profileId, key } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [facilityCode, setFacilityCode] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [phone, setPhone] = useState("")
  const [image, setImage] = useState("")

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const handleFacilityCodeChange = (e) => {
    setFacilityCode(e.target.value)
  }

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  const handleImageUpload = (e) => {
    setImage(e.currentTarget.files[0])
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    let value

    switch (key) {
      case "first_name":
        value = firstName
        break
      case "last_name":
        value = lastName
        break
      case "facility_code":
        value = facilityCode
        break
      case "title":
        value = jobTitle
        break
      case "phone":
        value = phone
        break
      case "profile_picture":
        value = image
        break
      default:
        console.log("Error: no key detected")
    }

    try {
      setLoading(true)
      const resultAction = await dispatch(
        updateUser({
          profileId: profileId,
          key: key,
          value: value,
        })
      )
      unwrapResult(resultAction)

      toast.success("User updated!")
      history.push("/settings")
    } catch (err) {
      setLoading(false)
      console.error("Failed to update user: ", err)
      toast.error("Could not update user... Check your input and try again.")
    }
    setLoading(false)
  }

  const cancelButtonHandler = () => {
    history.push("/settings")
  }

  if (loading) return <div className="flex h-screen justify-center items-center"><Loader /></div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mt-20 px-4 py-5 shadow bg-white sm:rounded-lg">
        <form
          onSubmit={onSubmit}
          className="space-y-8 divide-y divide-gray-200"
        >
          {key === "first_name" && (
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <h3>Update Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Please submit your updated first name in the field below
                </p>
              </div>

              {/* Form Field */}
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    First name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autoComplete="text"
                      className="max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {key === "last_name" && (
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <h3>Update Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Please submit your updated last name in the field below
                </p>
              </div>

              {/* Form Field */}
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Last name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="text"
                      className="max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={lastName}
                      onChange={handleLastNameChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {key === "facility_code" && (
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <h3>Update Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Please submit your updated facility code in the field below
                </p>
              </div>

              {/* Form Field */}
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="facility_code"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Facility code
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="facility_code"
                      id="facility_code"
                      autoComplete="text"
                      className="max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={facilityCode}
                      onChange={handleFacilityCodeChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {key === "title" && (
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <h3>Update Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Please submit your updated job title in the field below
                </p>
              </div>

              {/* Form Field */}
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Job Title
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="text"
                      className="max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={jobTitle}
                      onChange={handleJobTitleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {key === "phone" && (
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <h3>Update Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Please submit your updated phone number in the field below
                </p>
              </div>

              {/* Form Field */}
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="text"
                      className="max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {key === "profile_picture" && (
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <h3>Update Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Please submit your updated profile picture in the input below
                </p>
              </div>

              {/* Form Field */}
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="profile_picture"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Profile Picture
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      name="profile_picture"
                      id="profile_picture"
                      className="text-sm text-gray-400"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={cancelButtonHandler}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-offset-2 focus:ring-cyan-500"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
