import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import './AuthLayout.styles.scss'

function AuthLayout({ children }) {
  const selectedTheme = useSelector((state) => state.theme)

  return (
    <div
      className={
        selectedTheme === 'light'
          ? 'auth-layout'
          : 'auth-layout auth-layout--dark'
      }
    >
      <div className="auth-layout__container">{children}</div>
    </div>
  )
}
export default AuthLayout

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
