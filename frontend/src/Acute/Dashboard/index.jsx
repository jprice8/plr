import React, { Fragment } from 'react'

import UserBanner from "../../shared/components/UserBanner"
import Stats from './Stats'
import Chart from './Chart'

const Dashboard = () => {
  return (
    <Fragment>
      <UserBanner />
      <Stats />
      <Chart />
    </Fragment>
  )
}

export default Dashboard