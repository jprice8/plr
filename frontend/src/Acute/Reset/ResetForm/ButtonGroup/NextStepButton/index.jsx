import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/outline'

const NextStepButton = () => {
	return (
		<button type="submit" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-500 ease-in-out transform hover:scale-110">
			<ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
		</button>
	)
}

export default NextStepButton
