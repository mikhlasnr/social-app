import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const usersInitState = {
  users: [],
  user: null,
  status: 'idle',
  userStatus: 'idle',
  error: null,
}

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axios('/users')
  return response.data
})

export const getUserMe = createAsyncThunk(
  'users/getUserMe',
  async (arg, { dispatch }) => {
    try {
      dispatch(showLoading())
      const response = await axios('/users/me')
      return response.data
    } catch (error) {
      return error
    } finally {
      dispatch(hideLoading())
    }
  },
)

export const loginUser = createAsyncThunk(
  'users/loginUsers',
  async ({ requestBody }, { dispatch }) => {
    try {
      dispatch(showLoading())
      const response = await axios.post(`/login`, requestBody)
      return response.data
    } catch (error) {
      return error.response
    } finally {
      dispatch(hideLoading())
    }
  },
)

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ requestBody }, { dispatch }) => {
    try {
      dispatch(showLoading())
      const response = await axios.post(`/register`, requestBody)
      return response.data
    } catch (error) {
      return error.response
    } finally {
      dispatch(hideLoading())
    }
  },
)

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload.data.users
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getUserMe.pending, (state) => {
        state.error = null
        state.userStatus = 'loading'
      })
      .addCase(getUserMe.fulfilled, (state, action) => {
        state.user = action.payload.data.user
        state.userStatus = 'succeeded'
      })
      .addCase(getUserMe.rejected, (state, action) => {
        state.error = action.error.message
        state.userStatus = 'failed'
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const usersReducer = usersSlice.reducer
