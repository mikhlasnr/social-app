import { Layout, Typography, theme } from 'antd';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHeaderbar } from '../../hook/useHeaderbar';
import './BaseHeader.styles.scss';

const { Header } = Layout;
const { Title } = Typography;

const isRouterLocationExist = ['/', '/leaderboards'];
function BaseHeader() {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const location = useLocation();

  const { title, setTitle } = useHeaderbar();

  useEffect(() => {
    if (isRouterLocationExist.includes(location.pathname)) {
      if (location.pathname === '/') {
        setTitle('Threads');
      } else {
        setTitle(location.pathname.replace('/', ''));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Header
      className="base-header"
      style={{
        background: colorBgContainer
      }}>
      <Title>{title}</Title>
    </Header>
  );
}

export default BaseHeader;
