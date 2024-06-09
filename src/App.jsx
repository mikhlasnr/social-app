import { ConfigProvider, theme } from 'antd'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import BaseLayout from './components/base-layout/BaseLayout.component'
import { BaseLoadingBar } from './components/base-loading-bar/BaseLoadingBar.component'
import NotFound from './components/not-found/NotFound.component'
import ThemeToggle from './components/theme-toggle/ThemeToggle.component'
import { Leaderboards } from './pages/leaderboards/Leaderboards.component'
import { Login } from './pages/login/Login.component'
import { Register } from './pages/register/Register.component'
import { Thread } from './pages/thread/Thread.component'
import { Threads } from './pages/threads/Threads.component'

axios.defaults.baseURL = 'https://forum-api.dicoding.dev/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'

function App() {
  const selectedTheme = useSelector((state) => state.theme)

  return (
    <ConfigProvider
      theme={{
        algorithm:
          selectedTheme === 'dark'
            ? theme.darkAlgorithm
            : theme.compactAlgorithm,
      }}
    >
      <BaseLoadingBar />
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Threads />} />
          <Route path="/thread/:threadId" element={<Thread />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ThemeToggle />
    </ConfigProvider>
  )
}
export default App
