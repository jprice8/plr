import React from "react"
import { usdTwoDigits } from "../../../../../shared/utils/currency"
import { getFormattedDate } from "../../../../../shared/utils/dateTime"

const Panel = ({ user, reset }) => {
  const { month, day, year, hour, minute, suffix } = getFormattedDate(
    reset.last_updated
  )

  return (
    <div className="px-5 mt-10 rounded-md border-t border-gray-200">
      <ul className="divide-y divide-gray-200">
        <li className="py-4">
          <div className="flex space-x-3">
            <img 
              className="h-10 w-10 rounded-full"
              src={user.profile_picture}
              alt="profPic"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {month} {day}, {year} @ {hour}:{minute} {suffix}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Reduced par from previous par level of{" "}
                {reset.current_par_qty} to new par level of{" "}
                {reset.reset_level} for a reduction of{" "}
                {usdTwoDigits(reset.reduction_ext)}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Panel
