import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const threadsInitState = {
  threads: [],
  thread: null,
  status: 'idle',
  error: null,
}

export const getThreads = createAsyncThunk(
  'threads/getThreads',
  async (arg, { dispatch }) => {
    try {
      dispatch(showLoading())
      const response = await axios('/threads')
      return response.data
    } catch (error) {
      return error
    } finally {
      dispatch(hideLoading())
    }
  },
)

export const postThreads = createAsyncThunk(
  'threads/postThreads',
  async ({ requestBody }) => {
    const response = await axios.post(`/threads`, requestBody)
    return response.data
  },
)

export const upvoteThread = createAsyncThunk(
  'threads/upvoteThread',
  async ({ threadId }) => {
    const response = await axios.post(`/threads/${threadId}/up-vote`)
    return response.data
  },
)

export const downvoteThread = createAsyncThunk(
  'threads/downvoteThread',
  async ({ threadId }) => {
    const response = await axios.post(`/threads/${threadId}/down-vote`)
    return response.data
  },
)

export const neutralvoteThread = createAsyncThunk(
  'threads/neutralvoteThread',
  async ({ threadId }) => {
    const response = await axios.post(`/threads/${threadId}/neutral-vote`)
    return response.data
  },
)

export const getThreadDetail = createAsyncThunk(
  'threads/getThreadDetail',
  async ({ threadId }, { dispatch }) => {
    try {
      dispatch(showLoading())
      const response = await axios(`/threads/${threadId}`)
      return response.data
    } catch (error) {
      return error
    } finally {
      dispatch(hideLoading())
    }
  },
)

export const postThreadDetailComment = createAsyncThunk(
  'threads/postThreadDetailComment',
  async ({ threadId, content }) => {
    const response = await axios.post(`/threads/${threadId}/comments`, {
      content,
    })
    return response.data
  },
)

export const upvoteComment = createAsyncThunk(
  'threads/upvoteComment',
  async ({ threadId, commentId }) => {
    const response = await axios.post(
      `/threads/${threadId}/comments/${commentId}/up-vote`,
    )
    return response.data
  },
)

export const downvoteComment = createAsyncThunk(
  'threads/downvoteComment',
  async ({ threadId, commentId }) => {
    const response = await axios.post(
      `/threads/${threadId}/comments/${commentId}/down-vote`,
    )
    return response.data
  },
)

export const neutralvoteComment = createAsyncThunk(
  'threads/neutralvoteComment',
  async ({ threadId, commentId }) => {
    const response = await axios.post(
      `/threads/${threadId}/comments/${commentId}/neutral-vote`,
    )
    return response.data
  },
)

export const threadsSlice = createSlice({
  name: 'threads',
  initialState: threadsInitState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getThreads.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getThreads.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.threads = action.payload.data.threads
      })
      .addCase(getThreads.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(upvoteThread.pending, (state, action) => {
        const { threadId, userId } = action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newThread = {
            ...threadDetail,
            upVotesBy: [...threadDetail.upVotesBy, userId],
            downVotesBy: threadDetail.downVotesBy.filter(
              (user) => user !== userId,
            ),
          }
          state.thread = newThread
        } else {
          const newThreads = state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  upVotesBy: [...thread.upVotesBy, userId],
                  downVotesBy: thread.downVotesBy.filter(
                    (user) => user !== userId,
                  ),
                }
              : thread,
          )
          state.threads = newThreads
        }

        state.error = null
      })
      .addCase(upvoteThread.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(upvoteThread.rejected, (state, action) => {
        state.status = 'failed'
        const { threadId, userId, isUserMeDownvote } = action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newThread = {
            ...threadDetail,
            upVotesBy: threadDetail.upVotesBy.filter((user) => user !== userId),
            downVotesBy: isUserMeDownvote
              ? [...threadDetail.downVotesBy, userId]
              : threadDetail.downVotesBy,
          }
          state.thread = newThread
        } else {
          const newThreads = state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  upVotesBy: thread.upVotesBy.filter((user) => user !== userId),
                  downVotesBy: isUserMeDownvote
                    ? [...thread.downVotesBy, userId]
                    : thread.downVotesBy,
                }
              : thread,
          )
          state.threads = newThreads
        }

        state.error = action.error.message
      })
      .addCase(downvoteThread.pending, (state, action) => {
        const { threadId, userId } = action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newThread = {
            ...threadDetail,
            upVotesBy: threadDetail.upVotesBy.filter((user) => user !== userId),
            downVotesBy: [...threadDetail.downVotesBy, userId],
          }
          state.thread = newThread
        } else {
          const newThreads = state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  upVotesBy: thread.upVotesBy.filter((user) => user !== userId),
                  downVotesBy: [...thread.downVotesBy, userId],
                }
              : thread,
          )
          state.threads = newThreads
        }

        state.error = null
      })
      .addCase(downvoteThread.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(downvoteThread.rejected, (state, action) => {
        state.status = 'failed'
        const { threadId, userId, isUserMeUpvote } = action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newThread = {
            ...threadDetail,
            upVotesBy: isUserMeUpvote
              ? [...threadDetail.upVotesBy, userId]
              : threadDetail.upVotesBy,
            downVotesBy: threadDetail.downVotesBy.filter(
              (user) => user !== userId,
            ),
          }
          state.thread = newThread
        } else {
          const newThreads = state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  upVotesBy: isUserMeUpvote
                    ? [...thread.upVotesBy, userId]
                    : thread.upVotesBy,
                  downVotesBy: thread.downVotesBy.filter(
                    (user) => user !== userId,
                  ),
                }
              : thread,
          )
          state.threads = newThreads
        }

        state.error = action.error.message
      })
      .addCase(neutralvoteThread.pending, (state, action) => {
        state.error = null
        const { threadId, userId, isUserMeUpvote, isUserMeDownvote } =
          action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newThread = {
            ...threadDetail,
            upVotesBy: isUserMeUpvote
              ? threadDetail.upVotesBy.filter((user) => user !== userId)
              : threadDetail.upVotesBy,
            downVotesBy: isUserMeDownvote
              ? threadDetail.downVotesBy.filter((user) => user !== userId)
              : threadDetail.downVotesBy,
          }
          state.thread = newThread
        } else {
          const newThreads = state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  upVotesBy: isUserMeUpvote
                    ? thread.upVotesBy.filter((user) => user !== userId)
                    : thread.upVotesBy,
                  downVotesBy: isUserMeDownvote
                    ? thread.downVotesBy.filter((user) => user !== userId)
                    : thread.downVotesBy,
                }
              : thread,
          )
          state.threads = newThreads
        }
      })
      .addCase(neutralvoteThread.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(neutralvoteThread.rejected, (state, action) => {
        state.status = 'failed'
        const { threadId, userId, isUserMeUpvote, isUserMeDownvote } =
          action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newThread = {
            ...threadDetail,
            upVotesBy: isUserMeUpvote
              ? [...threadDetail.upVotesBy, userId]
              : threadDetail.upVotesBy,
            downVotesBy: isUserMeDownvote
              ? [...threadDetail.downVotesBy, userId]
              : threadDetail.downVotesBy,
          }
          state.thread = newThread
        } else {
          const newThreads = state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  upVotesBy: isUserMeUpvote
                    ? [...thread.upVotesBy, userId]
                    : thread.upVotesBy,
                  downVotesBy: isUserMeDownvote
                    ? [...thread.downVotesBy, userId]
                    : thread.downVotesBy,
                }
              : thread,
          )
          state.threads = newThreads
        }

        state.error = action.error.message
      })
      .addCase(getThreadDetail.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getThreadDetail.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.thread = action.payload.data.detailThread
      })
      .addCase(getThreadDetail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(postThreadDetailComment.pending, (state) => {
        state.error = null
      })
      .addCase(postThreadDetailComment.fulfilled, (state, action) => {
        if (state.thread) {
          const newComment = [
            action.payload.data.comment,
            ...state.thread.comments,
          ]
          state.thread = { ...state.thread, comments: newComment }
        }
      })
      .addCase(postThreadDetailComment.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(postThreads.pending, (state) => {
        state.error = null
      })
      .addCase(postThreads.fulfilled, (state, action) => {
        if (state.thread) {
          const newThreads = [action.payload.data.thread, ...state.threads]
          state.threads = newThreads
        }
      })
      .addCase(postThreads.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(upvoteComment.pending, (state, action) => {
        const { commentId, userId } = action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newComments = threadDetail.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                upVotesBy: [...comment.upVotesBy, userId],
                downVotesBy: comment.downVotesBy.filter(
                  (user) => user !== userId,
                ),
              }
            }
            return comment
          })
          const newThread = {
            ...threadDetail,
            comments: newComments,
          }
          state.thread = newThread
        }

        state.error = null
      })
      .addCase(upvoteComment.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(upvoteComment.rejected, (state, action) => {
        state.status = 'failed'
        const { userId, commentId, isUserMeDownvote } = action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newComments = threadDetail.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.filter((user) => user !== userId),
                downVotesBy: isUserMeDownvote
                  ? [...comment.downVotesBy, userId]
                  : comment.downVotesBy,
              }
            }
            return comment
          })
          const newThread = {
            ...threadDetail,
            comments: newComments,
          }
          state.thread = newThread
        }

        state.error = action.error.message
      })
      .addCase(downvoteComment.pending, (state, action) => {
        const { commentId, userId } = action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newComments = threadDetail.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                downVotesBy: [...comment.downVotesBy, userId],
                upVotesBy: comment.upVotesBy.filter((user) => user !== userId),
              }
            }

            return comment
          })
          const newThread = {
            ...threadDetail,
            comments: newComments,
          }
          state.thread = newThread
        }

        state.error = null
      })
      .addCase(downvoteComment.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(downvoteComment.rejected, (state, action) => {
        state.status = 'failed'
        const { userId, commentId, isUserMeUpvote } = action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newComments = threadDetail.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                downVotesBy: comment.downVotesBy.filter(
                  (user) => user !== userId,
                ),
                upVotesBy: isUserMeUpvote
                  ? [...comment.upVotesBy, userId]
                  : comment.upVotesBy,
              }
            }

            return comment
          })
          const newThread = {
            ...threadDetail,
            comments: newComments,
          }
          state.thread = newThread
        }

        state.error = action.error.message
      })
      .addCase(neutralvoteComment.pending, (state, action) => {
        const { commentId, userId, isUserMeUpvote, isUserMeDownvote } =
          action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newComments = threadDetail.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                upVotesBy: isUserMeUpvote
                  ? comment.upVotesBy.filter((user) => user !== userId)
                  : comment.upVotesBy,
                downVotesBy: isUserMeDownvote
                  ? comment.downVotesBy.filter((user) => user !== userId)
                  : comment.downVotesBy,
              }
            }
            return comment
          })
          const newThread = {
            ...threadDetail,
            comments: newComments,
          }
          state.thread = newThread
        }

        state.error = null
      })
      .addCase(neutralvoteComment.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(neutralvoteComment.rejected, (state, action) => {
        state.status = 'failed'
        const { userId, commentId, isUserMeUpvote, isUserMeDownvote } =
          action.meta.arg
        const threadDetail = state.thread
        if (threadDetail) {
          const newComments = threadDetail.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                downVotesBy: isUserMeDownvote
                  ? [...comment.downVotesBy, userId]
                  : comment.downVotesBy,
                upVotesBy: isUserMeUpvote
                  ? [...comment.upVotesBy, userId]
                  : comment.upVotesBy,
              }
            }
            return comment
          })
          const newThread = {
            ...threadDetail,
            comments: newComments,
          }
          state.thread = newThread
        }

        state.error = action.error.message
      })
  },
})

// export const {} = threadsSlice.actions;

export const threadsReducer = threadsSlice.reducer
