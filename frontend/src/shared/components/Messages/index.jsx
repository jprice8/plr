import React from "react"
import { TrashIcon } from "@heroicons/react/outline"

import { formatDistance } from "date-fns"

import Loader from "../Loader"

const Messages = ({
  reset,
  user,
  onSubmit,
  msgContent,
  handleMsgContentChange,
  handleMsgDelete,
  loadingMessage,
}) => {
  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden mt-8">
        <div className="">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Messages
            </h2>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <ul className="space-y-8">
              {reset.reset_message?.map((message, messageIdx) => (
                <li key={messageIdx}>
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={message.sender_profile_picture}
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm flex justify-between">
                        <div className="font-medium text-gray-900">
                          {message.sender_first_name} {message.sender_last_name}
                        </div>
                        {user.first_name === message.sender_first_name ? (
                          <button
                            type="button"
                            onClick={() => handleMsgDelete(message.id)}
                          >
                            <TrashIcon className="w-4 h-4 text-gray-500" />
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        <p>{message.msg_content}</p>
                      </div>
                      <div className="mt-2 text-sm space-x-2">
                        <span className="text-gray-500 font-medium">
                          {`${formatDistance(
                            new Date(message.created_at),
                            new Date()
                          )} ago`}
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={user.profile_picture}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1">
              <form onSubmit={onSubmit}>
                <div>
                  <label htmlFor="comment" className="sr-only">
                    About
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    className="shadow-sm block w-full focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Add a note"
                    value={msgContent}
                    onChange={handleMsgContentChange}
                    required
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"></div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    {loadingMessage ? <Loader /> : "Comment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Messages