import React from "react"
import { useSelector } from "react-redux"

import { getFacilityName } from "../../utils/getFacilityName"
import { getFormattedDate } from "../../utils/dateTime"

const Profile = () => {
	const user = useSelector((state) => state.users)
	const facilityName = getFacilityName(user.facility_code)

  const { month, day, year } = getFormattedDate(user.joined_on)

  return (
    <article>
      {/* Profile header */}
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src="https://source.unsplash.com/1700x200/daily?nature"
            alt=""
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={user.profile_picture}
                alt=""
              />
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {user.first_name} {user.last_name}
                </h1>
								<p className="text-md font-medium text-gray-500">PLR user since {month} {day}, {year}</p>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                
              </div>
            </div>
          </div>
          <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {user.first_name} {user.last_name}
            </h1>
						<p className="text-md font-medium text-gray-500">Joined ROP Level Reset on {month} {day}, {year}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              
            </nav>
          </div>
        </div>
      </div>

      {/* Description list */}
      <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
						{/* Phone */}
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm font-light text-gray-900">
                {user.phone}
              </dd>
            </div>
          
						{/* Email */}
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm font-light text-gray-900">
                {user.email}
              </dd>
            </div>

						{/* Title */}
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="mt-1 text-sm font-light text-gray-900">
                {user.title}
              </dd>
            </div>

						{/* Facility */}
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Facility</dt>
              <dd className="mt-1 text-sm font-light text-gray-900">
                {facilityName}
              </dd>
            </div>

        </dl>
      </div>

    </article>
  )
}

export default Profile