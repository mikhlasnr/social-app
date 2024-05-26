import { MoonOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons';
import { ConfigProvider, FloatButton, theme } from 'antd';
import axios from 'axios';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import BaseLayout from './components/base-layout/BaseLayout.component';
import NotFound from './components/not-found/NotFound.component';
import { useTheme } from './hook/useTheme';
import { Leaderboards } from './pages/leaderboards/Leaderboards.component';
import { Login } from './pages/login/Login.component';
import { Register } from './pages/register/Register.component';
import { Thread } from './pages/thread/Thread.component';
import { Threads } from './pages/threads/Threads.component';
import { BaseLoadingBar } from './components/base-loading-bar/BaseLoadingBar.component';

axios.defaults.baseURL = 'https://forum-api.dicoding.dev/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  const { selectedTheme, toggleSwitchTheme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm: selectedTheme === 'dark' ? theme.darkAlgorithm : theme.compactAlgorithm
      }}>
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
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{
          right: 24
        }}
        icon={<SettingOutlined />}
        tooltip={<div>Setting</div>}>
        <FloatButton
          icon={selectedTheme === 'light' ? <MoonOutlined /> : <SunOutlined />}
          tooltip={<div>{selectedTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</div>}
          onClick={toggleSwitchTheme}
        />
      </FloatButton.Group>
    </ConfigProvider>
  );
}
export default App;
