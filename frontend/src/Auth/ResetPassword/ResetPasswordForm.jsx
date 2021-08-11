import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from "axios"

import ErrorModal from "../../shared/components/ErrorModal"
import Loader from "../../shared/components/Loader"

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()
  const { token } = useParams()
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [errorResponses, setErrorResponses] = useState([])

  const onSubmit = async (data) => {
    setLoading(true)
    setErrorResponses([])
    try {
      const formData = {
        password: data.password,
        token: token,
      }
      const result = await axios({
        method: "POST",
        url: "http://0.0.0.0:8000/api/password_reset/confirm/",
        data: formData,
      })
      toast.success(
        "New Password Saved! You can now log in with your email and new password."
      )
      history.push("/login")
    } catch (error) {
      setErrorResponses(error?.response?.data?.password)
      toast.error(`Failed to reset password`)
    }
    setLoading(false)
  }

  const errJsx = errorResponses.map((err, idx) => {
    return <ErrorModal key={idx} errorMessage={err} />
  })

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gray-50 pt-20 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {errorResponses && errJsx}
        <>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter your new password
          </h2>

          <div className="mt-8">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                      {...register("password", {
                        required: "This field is required",
                      })}
                    />
                    {errors.password && (
                      <ErrorModal errorMessage={errors.password.message} />
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                      {...register("confirmPassword", {
                        required: "This field is required",
                        validate: {
                          matchesPreviousPassword: (value) => {
                            const { password } = getValues()
                            return (
                              password === value || "Passwords do not match"
                            )
                          },
                        },
                      })}
                    />
                    {errors.confirmPassword && (
                      <ErrorModal
                        errorMessage={errors.confirmPassword.message}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    Set New Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}
