import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit"

import api from "../utils/api"

const parsAdapter = createEntityAdapter()
const initialState = parsAdapter.getInitialState({
  status: "idle",
  error: null,
})

export const fetchPars = createAsyncThunk("pars/fetchPars", async () => {
  const token = localStorage.getItem("access_token")
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
  const response = await api({
    method: "GET",
    url: `/api/reset/par/`,
    headers: headers,
  })
  return response.data
})

export const addNestedItemReset = createAsyncThunk(
  "pars/addNestedItemReset",
  async ({ user, par, reset_level, send_back_confirmed, week }) => {
    const token = localStorage.getItem("access_token")
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    const formData = {
      user: user,
      par: par,
      reset_level: reset_level,
      send_back_confirmed: send_back_confirmed,
      week: week,
    }
    const response = await api({
      method: "POST",
      url: `/api/reset/itemreset/`,
      data: formData,
      headers,
    })
    return response.data
  }
)

export const updateNestedItemReset = createAsyncThunk(
  "pars/updateNestedItemReset",
  async ({ id, user, par, reset_level, send_back_confirmed, week }) => {
    const token = localStorage.getItem("access_token")
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    const formData = {
      id: id,
      user: user,
      par: par,
      reset_level: reset_level,
      send_back_confirmed: send_back_confirmed,
      week: week,
    }
    const response = await api({
      method: "PUT",
      url: `/api/reset/itemreset/${id}/`,
      data: formData,
      headers,
    })
    return response.data
  }
)

export const parsSlice = createSlice({
  name: "pars",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // Fetch Pars
    [fetchPars.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchPars.fulfilled]: (state, action) => {
      state.status = "succeeded"
      parsAdapter.upsertMany(state, action.payload)
    },
    [fetchPars.rejected]: (state, action) => {
      state.status = "failed"
      state.error = action.payload
    },
    // Add nested itemreset
    [addNestedItemReset.pending]: (state, action) => {
      state.status = "loading"
    },
    [addNestedItemReset.fulfilled]: (state, action) => {
      state.status = "succeeded"
      const { id, par, user, reset_level, send_back_confirmed, last_updated, week } = action.payload
      const existingPar = state.entities[par]
      if (existingPar) {
        existingPar.itemresets = {}
        existingPar.itemresets.id = id
        existingPar.itemresets.par = par
        existingPar.itemresets.user = user
        existingPar.itemresets.reset_level = reset_level
        existingPar.itemresets.send_back_confirmed = send_back_confirmed
        existingPar.itemresets.last_updated = last_updated
        existingPar.itemresets.week = week
      }
    },
    [addNestedItemReset.rejected]: (state, action) => {
      state.status = "failed"
      state.error = action.payload
    },
    // Update nested itemreset
    [updateNestedItemReset.pending]: (state, action) => {
      state.status = "loading"
    },
    [updateNestedItemReset.fulfilled]: (state, action) => {
      state.status = "succeeded"
      const { id, par, user, reset_level, send_back_confirmed, last_updated, week } = action.payload
      const existingPar = state.entities[par]
      if (existingPar) {
        existingPar.itemresets.id = id
        existingPar.itemresets.par = par
        existingPar.itemresets.user = user
        existingPar.itemresets.reset_level = reset_level
        existingPar.itemresets.send_back_confirmed = send_back_confirmed
        existingPar.itemresets.last_updated = last_updated
        existingPar.itemresets.week = week
      }
    },
    [updateNestedItemReset.rejected]: (state, action) => {
      state.status = "failed"
      state.error = action.payload
    },
  },
})

export default parsSlice.reducer

export const {
  selectAll: selectAllPars,
  selectById: selectParById,
  selectIds: selectParIds,
} = parsAdapter.getSelectors((state) => state.pars)
