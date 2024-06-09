import { createSlice } from '@reduxjs/toolkit'

const headerInitState = {
  title: '',
}

export const headerSlice = createSlice({
  name: 'header',
  initialState: headerInitState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
    },
  },
})

export const { setTitle } = headerSlice.actions

export const headerReducer = headerSlice.reducer
