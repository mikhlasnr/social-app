/**
 * Test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given an unknown action
 *  - should handle the getThreads pending state
 *  - should handle the getThreads fulfilled state
 *  - should handle the getThreads rejected state
 *  - should handle the getThreadDetail pending state
 *  - should handle the getThreadDetail fulfilled state
 *  - should handle the getThreadDetail rejected state
 *  - should handle the postThreads pending state
 *  - should handle the postThreads fulfilled state
 *  - should handle the postThreads rejected state
 *  - should handle the postThreadDetailComment pending state
 *  - should handle the postThreadDetailComment fulfilled state
 *  - should handle the postThreadDetailComment rejected state
 *  - should handle the upvoteThread pending state
 *  - should handle the upvoteThread fulfilled state
 *  - should handle the upvoteThread rejected state
 *  - should handle the downvoteThread pending state
 *  - should handle the downvoteThread fulfilled state
 *  - should handle the downvoteThread rejected state
 *  - should handle the neutralvoteThread pending state
 *  - should handle the neutralvoteThread fulfilled state
 *  - should handle the neutralvoteThread rejected state
 *  - should handle the upvoteComment pending state
 *  - should handle the upvoteComment fulfilled state
 *  - should handle the upvoteComment rejected state
 *  - should handle the downvoteComment pending state
 *  - should handle the downvoteComment fulfilled state
 *  - should handle the downvoteComment rejected state
 *  - should handle the neutralvoteComment pending state
 *  - should handle the neutralvoteComment fulfilled state
 *  - should handle the neutralvoteComment rejected state
 *  - should dispatch showLoading and hideLoading actions for getThreads
 *  - should dispatch showLoading and hideLoading actions for getThreadDetail
 */

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  downvoteComment,
  downvoteThread,
  getThreadDetail,
  getThreads,
  neutralvoteComment,
  neutralvoteThread,
  postThreadDetailComment,
  postThreads,
  threadsReducer,
  upvoteComment,
  upvoteThread,
} from './threads.reducer' // Ganti dengan path yang benar

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

const fakePostThreadResponse = {
  status: 'success',
  message: 'Thread created',
  data: {
    thread: {
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
  },
}

const fakeCommentResponse = {
  status: 'success',
  message: 'ok',
  data: {
    comment: {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
    },
  },
}

const fakeErrorResponse = new Error('Network Error')

describe('threadsSlice', () => {
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

  it('should handle postThreads pending state', () => {
    const action = { type: postThreads.pending.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.error).toBe(null)
  })

  it('should handle postThreads fulfilled state', () => {
    const action = {
      type: postThreads.fulfilled.type,
      payload: fakePostThreadResponse,
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.threads).toContain(fakePostThreadResponse.data.thread)
    expect(nextState.error).toBe(null)
  })

  it('should handle postThreads rejected state', () => {
    const action = {
      type: postThreads.rejected.type,
      error: fakeErrorResponse,
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle postThreadDetailComment pending state', () => {
    const action = { type: postThreadDetailComment.pending.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.error).toBe(null)
  })

  it('should handle postThreadDetailComment fulfilled state', () => {
    const action = {
      type: postThreadDetailComment.fulfilled.type,
      payload: fakeCommentResponse,
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    expect(nextState.thread.comments).toContain(
      fakeCommentResponse.data.comment,
    )
    expect(nextState.error).toBe(null)
  })

  it('should handle postThreadDetailComment rejected state', () => {
    const action = {
      type: postThreadDetailComment.rejected.type,
      error: fakeErrorResponse,
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle upvoteThread pending state', () => {
    const action = {
      type: upvoteThread.pending.type,
      meta: { arg: { threadId: 'thread-1', userId: 'users-1' } },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    expect(nextState.thread.upVotesBy).toContain('users-1')
    expect(nextState.thread.downVotesBy).not.toContain('users-1')
    expect(nextState.error).toBe(null)
  })

  it('should handle upvoteThread fulfilled state', () => {
    const action = { type: upvoteThread.fulfilled.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('succeeded')
  })

  it('should handle upvoteThread rejected state', () => {
    const action = {
      type: upvoteThread.rejected.type,
      error: fakeErrorResponse,
      meta: {
        arg: {
          threadId: 'thread-1',
          userId: 'users-1',
          isUserMeDownvote: true,
        },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    expect(nextState.thread.upVotesBy).not.toContain('users-1')
    expect(nextState.thread.downVotesBy).toContain('users-1')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle downvoteThread pending state', () => {
    const action = {
      type: downvoteThread.pending.type,
      meta: { arg: { threadId: 'thread-1', userId: 'users-1' } },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    expect(nextState.thread.downVotesBy).toContain('users-1')
    expect(nextState.thread.upVotesBy).not.toContain('users-1')
    expect(nextState.error).toBe(null)
  })

  it('should handle downvoteThread fulfilled state', () => {
    const action = { type: downvoteThread.fulfilled.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('succeeded')
  })

  it('should handle downvoteThread rejected state', () => {
    const action = {
      type: downvoteThread.rejected.type,
      error: fakeErrorResponse,
      meta: {
        arg: { threadId: 'thread-1', userId: 'users-1', isUserMeUpvote: true },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    expect(nextState.thread.downVotesBy).not.toContain('users-1')
    expect(nextState.thread.upVotesBy).toContain('users-1')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle neutralvoteThread pending state', () => {
    const action = {
      type: neutralvoteThread.pending.type,
      meta: {
        arg: {
          threadId: 'thread-1',
          userId: 'users-1',
          isUserMeUpvote: true,
          isUserMeDownvote: false,
        },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    expect(nextState.thread.upVotesBy).not.toContain('users-1')
    expect(nextState.thread.downVotesBy).toContain('users-1')
    expect(nextState.error).toBe(null)
  })

  it('should handle neutralvoteThread fulfilled state', () => {
    const action = { type: neutralvoteThread.fulfilled.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('succeeded')
  })

  it('should handle neutralvoteThread rejected state', () => {
    const action = {
      type: neutralvoteThread.rejected.type,
      error: fakeErrorResponse,
      meta: {
        arg: {
          threadId: 'thread-1',
          userId: 'users-1',
          isUserMeUpvote: true,
          isUserMeDownvote: false,
        },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    expect(nextState.thread.upVotesBy).toContain('users-1')
    expect(nextState.thread.downVotesBy).toContain('users-1')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle upvoteComment pending state', () => {
    const action = {
      type: upvoteComment.pending.type,
      meta: {
        arg: {
          threadId: 'thread-1',
          commentId: 'comment-1',
          userId: 'users-1',
        },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    const foundComment = nextState.thread.comments.find(
      (comment) => comment.id === 'comment-1',
    )
    expect(foundComment.upVotesBy).toContain('users-1')
    expect(foundComment.downVotesBy).not.toContain('users-1')
    expect(nextState.error).toBe(null)
  })

  it('should handle upvoteComment fulfilled state', () => {
    const action = { type: upvoteComment.fulfilled.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('succeeded')
  })

  it('should handle upvoteComment rejected state', () => {
    const action = {
      type: upvoteComment.rejected.type,
      error: fakeErrorResponse,
      meta: {
        arg: {
          threadId: 'thread-1',
          commentId: 'comment-1',
          userId: 'users-1',
          isUserMeDownvote: true,
        },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    const foundComment = nextState.thread.comments.find(
      (comment) => comment.id === 'comment-1',
    )
    expect(foundComment.upVotesBy).not.toContain('users-1')
    expect(foundComment.downVotesBy).toContain('users-1')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle downvoteComment pending state', () => {
    const action = {
      type: downvoteComment.pending.type,
      meta: {
        arg: {
          threadId: 'thread-1',
          commentId: 'comment-1',
          userId: 'users-1',
        },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    const foundComment = nextState.thread.comments.find(
      (comment) => comment.id === 'comment-1',
    )
    expect(foundComment.downVotesBy).toContain('users-1')
    expect(foundComment.upVotesBy).not.toContain('users-1')
    expect(nextState.error).toBe(null)
  })

  it('should handle downvoteComment fulfilled state', () => {
    const action = { type: downvoteComment.fulfilled.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('succeeded')
  })

  it('should handle downvoteComment rejected state', () => {
    const action = {
      type: downvoteComment.rejected.type,
      error: fakeErrorResponse,
      meta: {
        arg: {
          threadId: 'thread-1',
          commentId: 'comment-1',
          userId: 'users-1',
          isUserMeUpvote: true,
        },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    const foundComment = nextState.thread.comments.find(
      (comment) => comment.id === 'comment-1',
    )
    expect(foundComment.downVotesBy).not.toContain('users-1')
    expect(foundComment.upVotesBy).toContain('users-1')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should handle neutralvoteComment pending state', () => {
    const action = {
      type: neutralvoteComment.pending.type,
      meta: {
        arg: {
          threadId: 'thread-1',
          commentId: 'comment-1',
          userId: 'users-1',
          isUserMeUpvote: true,
          isUserMeDownvote: false,
        },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    const foundComment = nextState.thread.comments.find(
      (comment) => comment.id === 'comment-1',
    )
    expect(foundComment.upVotesBy).not.toContain('users-1')
    expect(foundComment.downVotesBy).toContain('users-1')
    expect(nextState.error).toBe(null)
  })

  it('should handle neutralvoteComment fulfilled state', () => {
    const action = { type: neutralvoteComment.fulfilled.type }
    const nextState = threadsReducer(initialState, action)
    expect(nextState.status).toBe('succeeded')
  })

  it('should handle neutralvoteComment rejected state', () => {
    const action = {
      type: neutralvoteComment.rejected.type,
      error: fakeErrorResponse,
      meta: {
        arg: {
          threadId: 'thread-1',
          commentId: 'comment-1',
          userId: 'users-1',
          isUserMeUpvote: true,
          isUserMeDownvote: false,
        },
      },
    }
    const nextState = threadsReducer(
      { ...initialState, thread: fakeThreadDetailResponse.data.detailThread },
      action,
    )
    const foundComment = nextState.thread.comments.find(
      (comment) => comment.id === 'comment-1',
    )
    expect(foundComment.upVotesBy).toContain('users-1')
    expect(foundComment.downVotesBy).toContain('users-1')
    expect(nextState.error).toBe(fakeErrorResponse.message)
  })

  it('should dispatch showLoading and hideLoading actions for getThreads', async () => {
    mockAxios.onGet('/threads').reply(200, fakeThreadsResponse)

    const dispatch = vi.fn()
    await getThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch showLoading and hideLoading actions for getThreadDetail', async () => {
    mockAxios.onGet('/threads/thread-1').reply(200, fakeThreadDetailResponse)

    const dispatch = vi.fn()
    await getThreadDetail({ threadId: 'thread-1' })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
