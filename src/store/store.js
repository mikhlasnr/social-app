import { configureStore } from '@reduxjs/toolkit'
import {
  loadingBarReducer,
  loadingBarMiddleware,
} from 'react-redux-loading-bar'
import { leaderboarsdReducer } from './leaderboards/leaderboards.reducer'
import { threadsReducer } from './threads/threads.reducer'
import { usersReducer } from './users/users.reducer'
import { headerReducer } from './header/header.reducer'
import { themeReducer } from './theme/theme.reducer'

export const store = configureStore({
  reducer: {
    leaderboards: leaderboarsdReducer,
    threads: threadsReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
    header: headerReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingBarMiddleware()),
})
