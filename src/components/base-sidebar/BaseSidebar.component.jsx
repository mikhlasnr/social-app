import { BarChartOutlined, CommentOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Layout, Menu, Skeleton, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { useTheme } from '../../hook/useTheme';
import './BaseSidebar.styles.scss';

const { Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label
  };
};

const items = [
  getItem('Threads', '/threads', <CommentOutlined />),
  getItem('Leaderboards', '/leaderboards', <BarChartOutlined />)
];

function BaseSidebar() {
  const { selectedTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setselectedMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  const { user, userStatus } = useSelector((state) => state.users);

  const handleNavigate = ({ key }) => {
    if (key === '/threads') navigate('/');
    else navigate(key);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setselectedMenu(['/threads']);
    } else {
      setselectedMenu([location.pathname]);
    }
  }, [location]);

  return (
    <Sider
      theme={selectedTheme}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={`base-sidebar ${collapsed ? 'base-sidebar--collapsed' : ''}`}>
      <div className="base-sidebar__container">
        {userStatus === 'loading' || userStatus === 'idle' ? (
          <div className="logo">
            <Skeleton.Avatar size={80} shape="circle" active />
            {collapsed ? null : (
              <Flex vertical gap={5}>
                <Skeleton.Button size="small" block active />
                <Skeleton.Button size="smal" block active />
              </Flex>
            )}
          </div>
        ) : (
          <div className="logo">
            <Avatar src={user.avatar} size={80} />
            {collapsed ? null : (
              <Flex vertical gap={5}>
                <Typography>{user.name}</Typography>
                <Typography>{user.email}</Typography>
              </Flex>
            )}
          </div>
        )}

        <Menu
          theme={selectedTheme}
          selectedKeys={selectedMenu}
          onClick={handleNavigate}
          mode="inline"
          items={items}
        />
        {collapsed ? (
          <Tooltip title="Logout" placement="right">
            <Button onClick={() => logout()} block danger icon={<LogoutOutlined />} />
          </Tooltip>
        ) : (
          <Button onClick={() => logout()} block danger icon={<LogoutOutlined />}>
            Logout
          </Button>
        )}
      </div>
    </Sider>
  );
}

export default BaseSidebar;
