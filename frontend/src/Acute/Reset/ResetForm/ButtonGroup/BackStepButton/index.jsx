import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/outline'

const BackStepButton = ({ onBack }) => {
	return (
		<button onClick={onBack} type="button" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-500 ease-in-out transform hover:scale-110">
			<ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
		</button>
	)
}

export default BackStepButton
