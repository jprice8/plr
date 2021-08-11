import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Settings = () => {
  const user = useSelector((state) => state.users)

  return (
    <main className="bg-white flex-1 h-screen focus:outline-none">
      <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0">
            <div className="py-6">
              {/* Description list with inline editing */}
              <div className="mt-10 divide-y divide-gray-200">
                <div className="space-y-1">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Profile
                  </h3>
                  <p className="max-w-2xl text-sm text-gray-500">
                    Your user information is listed below. Use the update
                    buttons to change your profile information.
                  </p>
                </div>
                <div className="mt-6">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        First Name
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">{user.first_name}</span>
                        <span className="ml-4 flex-shrink-0">
                          <Link
                            to={`/profile/${user.profile_id}/edit/first_name`}
                            type="button"
                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </Link>
                        </span>
                      </dd>
                    </div>

                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Last Name
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">{user.last_name}</span>
                        <span className="ml-4 flex-shrink-0">
                          <Link
                            to={`/profile/${user.profile_id}/edit/last_name`}
                            type="button"
                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </Link>
                        </span>
                      </dd>
                    </div>

                    {/* Profile Picture */}
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                      <dt className="text-sm font-medium text-gray-500">
                        Profile Picture
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.profile_picture}
                            alt=""
                          />
                        </span>
                        <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                          <Link
                            to={`/profile/${user.profile_id}/edit/profile_picture`}
                            type="button"
                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </Link>
                        </span>
                      </dd>
                    </div>

                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                      <dt className="text-sm font-medium text-gray-500">
                        Job title
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">{user.title}</span>
                        <span className="ml-4 flex-shrink-0">
                          <Link
                            to={`/profile/${user.profile_id}/edit/title`}
                            type="button"
                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </Link>
                        </span>
                      </dd>
                    </div>

                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone Number
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">{user.phone}</span>
                        <span className="ml-4 flex-shrink-0">
                          <Link
                            to={`/profile/${user.profile_id}/edit/phone`}
                            type="button"
                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </Link>
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Settings
