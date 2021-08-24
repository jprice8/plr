import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import api from "../../shared/utils/api"

import Loader from "../../shared/components/Loader"

export const ResetPasswordEmailForm = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const formData = {
        email: data.email,
      }
      await api({
        method: "POST",
        url: "/api/password_reset/",
        data: formData,
      })
      toast.success("Reset Link Sent!")
      history.push("/resetPassword/emailSent")
    } catch (error) {
      console.log(error)
      toast.error("Failed to send password reset email. Please try again.")
    }
    setLoading(false)
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gray-50 pt-20 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Reset your password
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Submit the email address associated with your account.</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-5 sm:flex sm:items-center"
              >
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    {...register("email")}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
      </div>
    </div>
  )
}
