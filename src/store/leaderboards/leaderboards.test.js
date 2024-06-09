import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getLeaderboards, leaderboarsdReducer } from './leaderboards.reducer' // Ganti dengan path yang benar

const initialState = {
  leaderboards: [],
  status: 'idle',
  error: null,
}

const fakeLeaderboardsResponse = {
  status: 'success',
  message: 'ok',
  data: {
    leaderboards: [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 5,
      },
    ],
  },
}

const fakeErrorResponse = new Error('Network Error')

describe('leaderboardsSlice', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('should return the initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' }
    const nextState = leaderboarsdReducer(undefined, action)
    expect(nextState).toEqual(initialState)
  })

  it('should handle the getLeaderboards pending state', () => {
    const action = { type: getLeaderboards.pending.type }
    const nextState = leaderboarsdReducer(initialState, action)
    expect(nextState.status).toBe('loading')
    expect(nextState.error).toBe(null)
  })

  it('should handle the getLeaderboards fulfilled state', () => {
    const action = {
      type: getLeaderboards.fulfilled.type,
      payload: fakeLeaderboardsResponse,
    }
    const nextState = leaderboarsdReducer(initialState, action)
    expect(nextState.status).toBe('succeeded')
    expect(nextState.leaderboards).toEqual(
      fakeLeaderboardsResponse.data.leaderboards,
    )
    expect(nextState.error).toBe(null)
  })

  it('should handle the getLeaderboards rejected state', () => {
    const action = {
      type: getLeaderboards.rejected.type,
      error: fakeErrorResponse,
    }
    const nextState = leaderboarsdReducer(initialState, action)
    expect(nextState.status).toBe('failed')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should dispatch showLoading and hideLoading actions correctly', async () => {
    mockAxios.onGet('/leaderboards').reply(200, fakeLeaderboardsResponse)

    const dispatch = vi.fn()
    await getLeaderboards()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
