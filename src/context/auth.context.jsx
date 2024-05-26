import PropTypes from 'prop-types';
import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hook/useLocalStorage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();

  const login = async (data) => {
    setToken(data);
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Menambahkan PropTypes untuk children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
