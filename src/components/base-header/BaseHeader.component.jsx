import { Layout, Typography, theme } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setTitle } from '../../store/header/header.reducer'
import './BaseHeader.styles.scss'

const { Header } = Layout
const { Title } = Typography

const isRouterLocationExist = ['/', '/leaderboards']
function BaseHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const location = useLocation()

  const title = useSelector((state) => state.headerbar.title)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isRouterLocationExist.includes(location.pathname)) {
      if (location.pathname === '/') {
        dispatch(setTitle('Threads'))
      } else {
        dispatch(location.pathname.replace('/', ''))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <Header
      className="base-header"
      style={{
        background: colorBgContainer,
      }}
    >
      <Title>{title}</Title>
    </Header>
  )
}

export default BaseHeader
