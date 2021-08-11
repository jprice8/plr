import { configureStore } from "@reduxjs/toolkit"
import usersSlice from './usersSlice'
import parsSlice from './parsSlice'

const store = configureStore({
  reducer: {
    users: usersSlice,
    pars: parsSlice,
  },
})

export default store
