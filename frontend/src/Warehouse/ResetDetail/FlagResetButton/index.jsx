import React, { Fragment } from 'react'
import Loader from '../../../shared/components/Loader'

const FlagResetButton = ({ isFlagged, flagButtonHandler, loadingFlag }) => {
  const checkFlag = () => {
    if (isFlagged) {
      return (
        <button
          type="button"
          onClick={flagButtonHandler}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-cyan-500"
        >
          {loadingFlag ? <Loader /> : "Remove Flag"}
        </button>
      ) 
    } else {
      return (
        <button
          type="button"
          onClick={flagButtonHandler}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-cyan-500"
        >
          {loadingFlag ? <Loader /> : "Flag Reset"}
        </button>
      )
    }
  }

  return (
    <Fragment>
      {checkFlag()}
    </Fragment>
  )
}

export default FlagResetButton
