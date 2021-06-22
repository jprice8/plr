import React from "react";
import initialState from "./initialState";
import apiClient from "../services/apiClient";

export const REQUEST_PARS = "@@pars/REQUEST_PARS";
export const REQUEST_PARS_SUCCESS = "@@pars/REQUEST_PARS_SUCCESS";
export const REQUEST_PARS_FAILURE = "@@pars/REQUEST_PARS_SUCCESS";

export default function parsReducer(state = initialState.pars, action = {}) {
  switch (action.type) {
    case REQUEST_PARS:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_PARS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          [action.data.id]: action.data,
        },
      };
    case REQUEST_PARS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const Actions = {};

Actions.requestPars = ({ facility_code }) => {
  return apiClient({
    url: "/reset/par/",
    method: "POST",
    types: {
      REQUEST: REQUEST_PARS,
      SUCCESS: REQUEST_PARS_SUCCESS,
      FAILURE: REQUEST_PARS_FAILURE,
    },
    options: {
      data: { facility_code },
      params: {},
    },
  });
};
