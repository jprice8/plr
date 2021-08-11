import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit"
import axios from "axios"
import { defaults } from '../constants/config'

const initialState = {
  status: "idle",
  error: null,
  isAuthenticated: true,
  id: "",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  facility_code: "",
  title: "",
  phone: "",
  profile_picture: "",
  joined_on: "",
  iam: "",
}

// Request User Login
export const requestLogin = createAsyncThunk(
  "users/requestLogin",
  async ({ username, password }) => {
    const formData = {
      username: username,
      password: password,
    }
    const response = await axios({
      method: "POST",
      url: `${defaults.baseURL}/api/users/token/`,
      data: formData,
    })
    // Set token in localstorage
    const access_token = response.data.token
    localStorage.setItem("access_token", access_token)
    return response.data
  }
)

// Fetch User From Token
export const fetchUserFromToken = createAsyncThunk(
  "users/fetchUserFromToken",
  async () => {
    const token = localStorage.getItem("access_token")

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    const response = await axios({
      method: "GET",
      url: `${defaults.baseURL}/api/users/me/`,
      headers,
    })
    return response.data
  }
)

// PUT to update user profile
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({
    profileId,
    key,
    value
  }) => {
    const headers = {
      "Content-Type": "multipart/form-data"
    }
    let formData = new FormData()
    switch (key) {
      case 'first_name':
        formData.append('first_name', value)
        break 
      case 'last_name':
        formData.append('last_name', value)
        break 
      case 'facility_code':
        formData.append('facility_code', value)
        break 
      case 'title':
        formData.append('title', value)
        break
      case 'phone':
        formData.append('phone', value)
        break 
      case 'profile_picture':
        formData.append('profile_picture', value, value.name)
        break 
      default:
        console.log('Form field not given')
    }

    const response = await axios({
      method: "PUT",
      url: `${defaults.baseURL}/api/users/${profileId}/profile/`,
      data: formData,
      headers
    })
    return response.data
  }
)

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logUserOut(state, action) {
      const token = localStorage.getItem("access_token")
      if (token) {
        localStorage.removeItem("access_token")
        state.id = ""
        state.email = ""
        state.password = ""
        state.first_name = ""
        state.last_name = ""
        state.facility_code = ""
        state.title = ""
        state.phone = ""
        state.profile_picture = ""
        state.profile_id = ""
        state.joined_on = ""
        state.iam = ""
      }
    },
  },
  extraReducers: {
    // Request login from form
    [requestLogin.pending]: (state, action) => {
      state.status = "loading"
    },
    [requestLogin.fulfilled]: (state, action) => {
      state.status = "succeeded"
      state.isAuthenticated = true
    },
    [requestLogin.rejected]: (state, action) => {
      state.status = "failed"
      state.error = action.payload
      state.isAuthenticated = false
    },

    // Fetch user from access token
    [fetchUserFromToken.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchUserFromToken.fulfilled]: (state, action) => {
      state.status = "succeeded"
      state.id = action.payload.id
      state.email = action.payload.email
      state.password = action.payload.password

      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.facility_code = action.payload.facility_code
      state.title = action.payload.title
      state.phone = action.payload.phone
      state.profile_picture = action.payload.profile_picture
      state.profile_id = action.payload.profile_id
      state.joined_on = action.payload.joined_on
      state.iam = action.payload.iam

      state.isAuthenticated = true
    },
    [fetchUserFromToken.rejected]: (state, action) => {
      state.status = "failed"
      state.error = action.payload
      state.isAuthenticated = false
    },

    // Update user profile
    [updateUser.pending]: (state, action) => {
      state.status = "loading"
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = "succeeded"
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.facility_code = action.payload.facility_code
      state.title = action.payload.title 
      state.phone = action.payload.phone 
      state.profile_picture = action.payload.profile_picture
    },
    [updateUser.rejected]: (state, action) => {
      state.status = "failed"
      state.error = action.payload 
    }
  },
})

export const { logUserOut } = usersSlice.actions

export default usersSlice.reducer
