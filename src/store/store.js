import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer, loadingBarMiddleware } from 'react-redux-loading-bar';
import { leaderboarsdReducer } from './leaderboards/leaderboards.reducer';
import { threadsReducer } from './threads/threads.reducer';
import { usersReducer } from './users/users.reducer';

export const store = configureStore({
  reducer: {
    leaderboards: leaderboarsdReducer,
    threads: threadsReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer // Menambahkan loadingBarReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadingBarMiddleware()) // Menambahkan loadingBarMiddleware
});
