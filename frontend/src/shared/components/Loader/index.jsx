import React from 'react'

const Loader = () => {
  const loadingCircle = "h-2.5 w-2.5 bg-cyan-700 rounded-full"

  return (
    <div className="flex">
      <div className={`${loadingCircle} mr-1 animate-bounce`}></div>
      <div className={`${loadingCircle} mr-1 animate-bounce200`}></div>
      <div className={`${loadingCircle} mr-1 animate-bounce400`}></div>
    </div>
  )
}

export default Loader
