import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getLeaderboards, leaderboardsReducer } from './leaderboards.reducer' // Ganti dengan path yang benar

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
 * - leaderboardsReducer function
 *  - should return the initial state when given an unknown action
 *  - should handle the getLeaderboards pending state
 *  - should handle the getLeaderboards fulfilled state
 *  - should handle the getLeaderboards rejected state
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
    // Arrange
    const action = { type: 'UNKNOWN_ACTION' }

    // Action
    const nextState = leaderboardsReducer(undefined, action)

    // Assert
    expect(nextState).toEqual(initialState)
  })

  it('should handle the getLeaderboards pending state', () => {
    // Arrange
    const action = { type: getLeaderboards.pending.type }

    // Action
    const nextState = leaderboardsReducer(initialState, action)

    // Assert
    expect(nextState.status).toBe('loading')
    expect(nextState.error).toBe(null)
  })

  it('should handle the getLeaderboards fulfilled state', () => {
    // Arrange
    const action = {
      type: getLeaderboards.fulfilled.type,
      payload: fakeLeaderboardsResponse,
    }

    // Action
    const nextState = leaderboardsReducer(initialState, action)

    // Assert
    expect(nextState.status).toBe('succeeded')
    expect(nextState.leaderboards).toEqual(
      fakeLeaderboardsResponse.data.leaderboards,
    )
    expect(nextState.error).toBe(null)
  })

  it('should handle the getLeaderboards rejected state', () => {
    // Arrange
    const action = {
      type: getLeaderboards.rejected.type,
      error: fakeErrorResponse,
    }

    // Action
    const nextState = leaderboardsReducer(initialState, action)

    // Assert
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
          type: 'leaderboards/getLeaderboards/rejected',
          error: expect.objectContaining({
            message: fakeErrorResponse.message,
          }),
        }),
      ]),
    )

    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
