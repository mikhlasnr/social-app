import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const leaderboardsInitState = {
  leaderboards: [],
  status: 'idle',
  error: null,
}

export const getLeaderboards = createAsyncThunk(
  'leaderboards/getLeaderboards',
  async (arg, { dispatch }) => {
    try {
      dispatch(showLoading())
      const response = await axios('/leaderboards')
      return response.data
    } catch (error) {
      return error
    } finally {
      dispatch(hideLoading())
    }
  },
)

export const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: leaderboardsInitState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLeaderboards.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getLeaderboards.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.leaderboards = action.payload.data.leaderboards
      })
      .addCase(getLeaderboards.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const leaderboardsReducer = leaderboardsSlice.reducer
