import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../hook/useAuth'

export function ProtectedRoute({ children }) {
  const { token } = useAuth()
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />
  }
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
