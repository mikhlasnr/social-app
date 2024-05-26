import { Button, Result, theme } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  return (
    <div style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
      <Result
        status="404"
        title="404"
        subTitle="Data not found"
        extra={
          <Link to="/">
            <Button type="primary">Back to home</Button>
          </Link>
        }
      />
    </div>
  );
}

export default NotFound;
