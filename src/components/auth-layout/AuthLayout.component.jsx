import React from 'react';
import './AuthLayout.styles.scss';
import PropTypes from 'prop-types';
import { useTheme } from '../../hook/useTheme';

function AuthLayout({ children }) {
  const { selectedTheme } = useTheme();
  return (
    <div className={selectedTheme === 'light' ? 'auth-layout' : 'auth-layout auth-layout--dark'}>
      <div className="auth-layout__container">{children}</div>
    </div>
  );
}
export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired
};
