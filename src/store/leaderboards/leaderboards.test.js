import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getLeaderboards, leaderboardsReducer } from './leaderboards.reducer'

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

/**
 * Skenario testing
 *
 * - talkReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the talks when given by RECEIVE_TALKS action
 *  - should return the talks with the new talk when given by ADD_TALK action
 *  - should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action
 *
 */
describe('leaderboardsReducer', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('should return the initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' }
    const nextState = leaderboardsReducer(undefined, action)
    expect(nextState).toEqual(initialState)
  })

  it('should handle the getLeaderboards pending state', () => {
    const action = { type: getLeaderboards.pending.type }
    const nextState = leaderboardsReducer(initialState, action)
    expect(nextState.status).toBe('loading')
    expect(nextState.error).toBe(null)
  })

  it('should handle the getLeaderboards fulfilled state', () => {
    const action = {
      type: getLeaderboards.fulfilled.type,
      payload: fakeLeaderboardsResponse,
    }
    const nextState = leaderboardsReducer(initialState, action)
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
    const nextState = leaderboardsReducer(initialState, action)
    expect(nextState.status).toBe('failed')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })
})

describe('leaderboardsThunk', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    mockAxios.onGet('/leaderboards').reply(200, fakeLeaderboardsResponse)
    const dispatch = vi.fn()

    // Action
    await getLeaderboards()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())

    const dispatchedActions = dispatch.mock.calls.map((call) => call[0])
    expect(dispatchedActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'leaderboards/getLeaderboards/pending',
        }),
        expect.objectContaining({
          type: 'leaderboards/getLeaderboards/fulfilled',
          payload: fakeLeaderboardsResponse,
        }),
      ]),
    )
  })

  it('should dispatch action correctly when data fetching fails', async () => {
    // Arrange
    mockAxios
      .onGet('/leaderboards')
      .reply(500, { message: fakeErrorResponse.message })
    const dispatch = vi.fn()

    // Action
    await getLeaderboards()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())

    const dispatchedActions = dispatch.mock.calls.map((call) => call[0])
    expect(dispatchedActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'leaderboards/getLeaderboards/pending',
        }),
        expect.objectContaining({
          type: 'loading-bar/SHOW',
        }),
        expect.objectContaining({
          type: 'loading-bar/HIDE',
        }),
        expect.objectContaining({
          type: 'leaderboards/getLeaderboards/fulfilled',
          payload: expect.any(Error), // Expect an error object in the payload
        }),
      ]),
    )
  })
})
