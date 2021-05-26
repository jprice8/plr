import { combineReducers } from 'redux'

import authReducer from './auth'

const rootReducer = combineReducers({
  auth: authReducer
  // other reducers go here
})

export default rootReducer