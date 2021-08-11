import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

export const ResetPasswordLinkSent = () => {
  return (
    <div className="max-w-2xl mx-auto p-20">

      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-8 w-8 text-green-400" aria-hidden="true" />
          </div>

          <div className="ml-3">
            <h3 className="text-2xl">Link Sent!</h3>
            <div className="mt-4">
              <div className="block">
                <p className="font-light text-gray-800">An email has been sent to your inbox with a link that will take you to the password reset form.</p>
                <div className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600 w-4/12 text-center mt-4">
                  <Link to="/resetPassword/email">Resend email?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}
