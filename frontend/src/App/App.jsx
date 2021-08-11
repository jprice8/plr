import React, { Fragment } from "react"
import { Toaster } from "react-hot-toast"

import Routes from "./Routes"

const App = () => {
  return (
    <Fragment>
      <Routes />
      <Toaster position="top-right" />
    </Fragment>
  )
}

export default App
