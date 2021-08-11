import React from 'react'
import { CheckIcon } from '@heroicons/react/outline'

const SubmitButton = () => {
	return (
		<button type="submit" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-110">
			<CheckIcon className="h-6 w-6" aria-hidden="true" />
		</button>
	)
}

export default SubmitButton
