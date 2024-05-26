import React from 'react';
import PropTypes from 'prop-types';
import './BaseContainer.styles.scss';

export function BaseContainer({ children }) {
  return <div className="base-container">{children}</div>;
}

BaseContainer.propTypes = {
  children: PropTypes.node.isRequired
};
