import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getThreadDetail, getThreads, threadsReducer } from './threads.reducer' // Ganti dengan path yang benar

const initialState = {
  threads: [],
  thread: null,
  status: 'idle',
  error: null,
}

const fakeThreadsResponse = {
  status: 'success',
  message: 'ok',
  data: {
    threads: [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ],
  },
}

const fakeThreadDetailResponse = {
  status: 'success',
  message: 'ok',
  data: {
    detailThread: {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    },
  },
}

const fakeErrorResponse = new Error('Network Error')

/**
 * Test Scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given an unknown action
 *  - should handle the getThreads pending state
 *  - should handle the getThreads fulfilled state
 *  - should handle the getThreads rejected state
 *  - should handle the getThreadDetail pending state
 *  - should handle the getThreadDetail fulfilled state
 *  - should handle the getThreadDetail rejected state
 */

describe('threadsReducer function', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('should return the initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' }
    const nextState = threadsReducer(undefined, action)
    expect(nextState).toEqual(initialState)
  })

  it('should handle getThreads pending state', () => {
    const action = { type: getThreads.pending.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('loading')
    expect(nextState.error).toBe(null)
  })

  it('should handle getThreads fulfilled state', () => {
    const action = {
      type: getThreads.fulfilled.type,
      payload: fakeThreadsResponse,
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('succeeded')
    expect(nextState.threads).toEqual(fakeThreadsResponse.data.threads)
    expect(nextState.error).toBe(null)
  })

  it('should handle getThreads rejected state', () => {
    const action = {
      type: getThreads.rejected.type,
      error: fakeErrorResponse,
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('failed')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle getThreadDetail pending state', () => {
    const action = { type: getThreadDetail.pending.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('loading')
    expect(nextState.error).toBe(null)
  })

  it('should handle getThreadDetail fulfilled state', () => {
    const action = {
      type: getThreadDetail.fulfilled.type,
      payload: fakeThreadDetailResponse,
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('succeeded')
    expect(nextState.thread).toEqual(fakeThreadDetailResponse.data.detailThread)
    expect(nextState.error).toBe(null)
  })

  it('should handle getThreadDetail rejected state', () => {
    const action = {
      type: getThreadDetail.rejected.type,
      error: fakeErrorResponse,
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('failed')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })
})
