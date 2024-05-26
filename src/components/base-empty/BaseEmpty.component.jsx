import { Empty, theme } from 'antd';
import React from 'react';
import './BaseEmpty.styles.scss';

function BaseEmpty() {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  return (
    <div
      className="base-empty"
      style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
      <Empty description="Data Empty" />
    </div>
  );
}

export default BaseEmpty;
