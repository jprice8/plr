import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { LoginPage } from "../Auth/LoginPage"
import { LoggedOutPage } from "../Auth/LoggedOutPage"
import { ResetPasswordEmailForm } from "../Auth/ResetPassword/ResetPasswordEmailForm"
import { ResetPasswordLinkSent } from "../Auth/ResetPassword/ResetPasswordLinkSent"
import { ResetPasswordForm } from "../Auth/ResetPassword/ResetPasswordForm"
import { PrivateRoute } from "../shared/components/PrivateRoute"
import { fetchUserFromToken } from "../shared/redux/usersSlice"

import AcuteNavbar from '../Acute'
import WarehouseNavbar from "../Warehouse"

const Routes = () => {
  const dispatch = useDispatch()
  const usersStatus = useSelector((state) => state.users.status)

  // Fetch user from token
  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUserFromToken())
    }
  }, [usersStatus, dispatch])

  const isAuthed = useSelector((state) => state.users.isAuthenticated)

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/loggedOut" component={LoggedOutPage} />
        <Route
          exact
          path="/resetPassword/email"
          component={ResetPasswordEmailForm}
        />
        <Route
          exact
          path="/resetPassword/emailSent"
          component={ResetPasswordLinkSent}
        />
        <Route
          exact
          path="/resetPassword/confirm/:token"
          component={ResetPasswordForm}
        />

        <PrivateRoute
          isAuthed={isAuthed}
          path="/"
          acuteNavbar={AcuteNavbar}
          warehouseNavbar={WarehouseNavbar}
        />
      </Switch>
    </Router>
  )
}

export default Routes
