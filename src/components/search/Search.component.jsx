import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

export function Search({ value, onChange }) {
  return (
    <Input
      prefix={<SearchOutlined />}
      placeholder="Search note"
      allowClear
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="large"
    />
  );
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
