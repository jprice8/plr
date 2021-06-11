import { combineReducers } from "redux";

import authReducer from "./auth";
import parsReducer from "./pars";

const rootReducer = combineReducers({
  auth: authReducer,
  pars: parsReducer,
});

export default rootReducer;
