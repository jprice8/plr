import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from "./Loader"

export const PrivateRoute = ({ acuteNavbar: AcuteNavbar, warehouseNavbar: WarehouseNavbar, ...rest }) => {
	const isAuthed = useSelector(state => state.users.isAuthenticated)
  const iam = useSelector(state => state.users.iam)

	if (!isAuthed) {
		return <Redirect to='/login' />
	} 

  if (iam === 'satx_dc') {
    return <WarehouseNavbar />
  } else if (iam === 'satx_acute' || iam === 'resolute' || iam === 'west_acute') {
    return <AcuteNavbar />
  } else {
    return <div className="flex h-screen justify-center items-center"><Loader /></div>
  }
}
