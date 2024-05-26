import { Layout } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './BaseContent.styles.scss';

const { Content } = Layout;
function BaseContent({ children }) {
  return <Content className="base-content">{children}</Content>;
}
export default BaseContent;

BaseContent.propTypes = {
  children: PropTypes.node.isRequired
};
