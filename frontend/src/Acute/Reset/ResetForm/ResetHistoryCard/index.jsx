import React from "react"
import { useSelector } from "react-redux"
import { getFormattedDate } from "../../../../shared/utils/dateTime"
import { selectParById } from "../../../../shared/redux/parsSlice"

const ResetHistoryCard = ({ parId, user }) => {
  const par = useSelector((state) => selectParById(state, parId))
  const { month, day, year, hour, minute, suffix } = getFormattedDate(
    par?.itemresets?.last_updated
  )
  return (
    <div className="pt-5 sm:max-w-xl sm:mx-auto flex items-center flex-grow justify-center">
      <img
        className="h-8 w-8 rounded-full mr-2"
        src={user.profile_picture}
        alt="profile_picture"
      />
      <div className="grid grid-rows-2">
        <div>
          <p className="text-sm text-gray-500 text-center flex-grow">
            <span className="font-medium text-gray-900">
              {user.first_name} {user.last_name}
            </span>{" "}
            reset this par level to {par?.itemresets?.reset_level} on{" "}
            {month} {day}, {year} at {hour}:{minute} {suffix}.
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 text-left flex-grow">
            User indicated that the current par level{" "}
            {par?.itemresets?.send_back_confirmed ? (
              <span className="font-bold text-gray-900">DOES</span>
            ) : (
              <span className="font-bold text-gray-900">DOES NOT</span>
            )}{" "}
            match IMMS.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetHistoryCard
