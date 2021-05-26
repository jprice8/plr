import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Actions as authActions } from './auth'
import rootReducer from './rootReducer'

export default function configureReduxStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()]
  })

  store.dispatch(authActions.fetchUserFromToken())

  // enable hot reloading in dev
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
  }

  return store
}