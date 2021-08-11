import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { fetchUserFromToken, requestLogin } from "../shared/redux/usersSlice"
import toast from "react-hot-toast"
import { unwrapResult } from "@reduxjs/toolkit"

import Loader from "../shared/components/Loader"

export const LoginPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)

  // Handle form submission and Log in with credentials
  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await dispatch(
        requestLogin({
          username: data.username,
          password: data.password,
        })
      )
      unwrapResult(result)
    } catch (error) {
      toast.error("Unable to login. Please try again")
    }

    try {
      const result = await dispatch(fetchUserFromToken())
      unwrapResult(result)
      toast.success("Login successful!")
      setLoading(false)
      history.push("/")
    } catch (error) {
      console.error("Failed to login: ", error)
      setLoading(false)
    }
  }

  if (loading) return <div className="flex h-screen justify-center items-center"><Loader /></div>

  return (
    <div className="min-h-screen bg-gray-50 pt-20 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-60 w-auto"
          src="https://storage.googleapis.com/parlevelreset/ui_images/plr_logo_lowercase.png"
          alt="Workflow"
        />
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Address */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  {...register("username")}
                />
              </div>
            </div>

            {/* Password */}
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
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  {...register("password")}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/resetPassword/email"
                  className="font-medium text-cyan-600 hover:text-cyan-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
