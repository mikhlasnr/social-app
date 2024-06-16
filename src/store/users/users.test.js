import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getUserMe,
  getUsers,
  loginUser,
  registerUser,
  usersReducer,
} from './users.reducer'

const initialState = {
  users: [],
  user: null,
  status: 'idle',
  userStatus: 'idle',
  error: null,
}

const fakeUsersResponse = {
  status: 'success',
  message: 'ok',
  data: {
    users: [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'fulan',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ],
  },
}

const fakeUserMeResponse = {
  status: 'success',
  message: 'ok',
  data: {
    user: {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
}

const fakeLoginResponse = {
  status: 'success',
  message: 'ok',
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw',
  },
}

const fakeRegisterResponse = {
  status: 'success',
  message: 'User created',
  data: {
    user: {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
}

const fakeErrorResponse = new Error('Network Error')

/**
 * Test Scenario for usersReducer
 *
 * - usersReducer function
 *  - should return the initial state when given an unknown action
 *  - should handle the getUsers pending state
 *  - should handle the getUsers fulfilled state
 *  - should handle the getUsers rejected state
 *  - should handle the getUserMe pending state
 *  - should handle the getUserMe fulfilled state
 *  - should handle the getUserMe rejected state
 *  - should handle the loginUser pending state
 *  - should handle the loginUser fulfilled state
 *  - should handle the loginUser rejected state
 *  - should handle the registerUser pending state
 *  - should handle the registerUser fulfilled state
 *  - should handle the registerUser rejected state
 */
describe('usersReducer function', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('should return the initial state when given an unknown action', () => {
    // arrange
    const action = { type: 'UNKNOWN_ACTION' }

    // action
    const nextState = usersReducer(undefined, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it('should handle getUsers pending state', () => {
    // arrange
    const action = { type: getUsers.pending.type }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.status).toBe('loading')
    expect(nextState.error).toBe(null)
  })

  it('should handle getUsers fulfilled state', () => {
    // arrange
    const action = {
      type: getUsers.fulfilled.type,
      payload: fakeUsersResponse,
    }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.status).toBe('succeeded')
    expect(nextState.users).toEqual(fakeUsersResponse.data.users)
    expect(nextState.error).toBe(null)
  })

  it('should handle getUsers rejected state', () => {
    // arrange
    const action = {
      type: getUsers.rejected.type,
      error: fakeErrorResponse,
    }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.status).toBe('failed')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle getUserMe pending state', () => {
    // arrange
    const action = { type: getUserMe.pending.type }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.userStatus).toBe('loading')
    expect(nextState.error).toBe(null)
  })

  it('should handle getUserMe fulfilled state', () => {
    // arrange
    const action = {
      type: getUserMe.fulfilled.type,
      payload: fakeUserMeResponse,
    }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.userStatus).toBe('succeeded')
    expect(nextState.user).toEqual(fakeUserMeResponse.data.user)
    expect(nextState.error).toBe(null)
  })

  it('should handle getUserMe rejected state', () => {
    // arrange
    const action = {
      type: getUserMe.rejected.type,
      error: fakeErrorResponse,
    }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.userStatus).toBe('failed')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle loginUser pending state', () => {
    // arrange
    const action = { type: loginUser.pending.type }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.status).toBe('loading')
    expect(nextState.error).toBe(null)
  })

  it('should handle loginUser fulfilled state', () => {
    // arrange
    const action = {
      type: loginUser.fulfilled.type,
      payload: fakeLoginResponse,
    }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.status).toBe('succeeded')
    expect(nextState.error).toBe(null)
  })

  it('should handle loginUser rejected state', () => {
    // arrange
    const action = { type: loginUser.rejected.type, error: fakeErrorResponse }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.status).toBe('failed')
  })

  it('should handle registerUser pending state', () => {
    // arrange
    const action = { type: registerUser.pending.type }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.status).toBe('loading')
    expect(nextState.error).toBe(null)
  })

  it('should handle registerUser fulfilled state', () => {
    // arrange
    const action = {
      type: registerUser.fulfilled.type,
      payload: fakeRegisterResponse,
    }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.status).toBe('succeeded')
    expect(nextState.error).toBe(null)
  })

  it('should handle registerUser rejected state', () => {
    // arrange
    const action = {
      type: registerUser.rejected.type,
      error: fakeErrorResponse,
    }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState.status).toBe('failed')
  })
})

/**
 * Test Scenario getUsersThunk function
 *
 * - getUsersThunk function
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching fails
 */
describe('getUsersThunk function', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    mockAxios.onGet('/users').reply(200, fakeUsersResponse)
    const dispatch = vi.fn()

    // Action
    await getUsers()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    const dispatchedActions = dispatch.mock.calls.map((call) => call[0])
    expect(dispatchedActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'users/getUsers/pending',
        }),
        expect.objectContaining({
          type: 'users/getUsers/fulfilled',
          payload: fakeUsersResponse,
        }),
      ]),
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action correctly when data fetching fails', async () => {
    // Arrange
    mockAxios.onGet('/users').reply(500, { message: fakeErrorResponse.message })
    const dispatch = vi.fn()

    // Action
    await getUsers()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())

    const dispatchedActions = dispatch.mock.calls.map((call) => call[0])
    expect(dispatchedActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'users/getUsers/pending',
        }),
        expect.objectContaining({
          type: 'loading-bar/SHOW',
        }),
        expect.objectContaining({
          type: 'loading-bar/HIDE',
        }),
        expect.objectContaining({
          type: 'users/getUsers/rejected',
          error: expect.objectContaining({
            message: fakeErrorResponse.message,
          }),
        }),
      ]),
    )

    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

/**
 * Test Scenario getUserMeThunk function
 *
 * - getUserMeThunk function
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching fails
 */
describe('getUserMeThunk function', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    mockAxios.onGet('/users/me').reply(200, fakeUserMeResponse)
    const dispatch = vi.fn()

    // Action
    await getUserMe()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    const dispatchedActions = dispatch.mock.calls.map((call) => call[0])
    expect(dispatchedActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'users/getUserMe/pending',
        }),
        expect.objectContaining({
          type: 'users/getUserMe/fulfilled',
          payload: fakeUserMeResponse,
        }),
      ]),
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action correctly when data fetching fails', async () => {
    // Arrange
    mockAxios
      .onGet('/users/me')
      .reply(500, { message: fakeErrorResponse.message })
    const dispatch = vi.fn()

    // Action
    await getUserMe()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())

    const dispatchedActions = dispatch.mock.calls.map((call) => call[0])
    expect(dispatchedActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'users/getUserMe/pending',
        }),
        expect.objectContaining({
          type: 'loading-bar/SHOW',
        }),
        expect.objectContaining({
          type: 'loading-bar/HIDE',
        }),
        expect.objectContaining({
          type: 'users/getUserMe/rejected',
          error: expect.objectContaining({
            message: fakeErrorResponse.message,
          }),
        }),
      ]),
    )

    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
