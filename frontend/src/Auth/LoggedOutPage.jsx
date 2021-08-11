import { CheckCircleIcon } from '@heroicons/react/solid'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logUserOut } from '../shared/redux/usersSlice'
import { Link } from 'react-router-dom'

export const LoggedOutPage = () => {
	const dispatch = useDispatch()

	// Log use out
	useEffect(() => {
		dispatch(logUserOut())
	})

	return (
		<div className="max-w-2xl mx-auto p-20">

			<div className="rounded-md bg-green-50 p-4">
				<div className="flex">
					<div className="flex-shrink-0">
						<CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
					</div>

					<div className="ml-3">
						<h3>Logout Successful</h3>
						<div className="mt-4">
							<div className="flex">
								<div className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600">
									<Link to="/login">Log in Again?</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}


