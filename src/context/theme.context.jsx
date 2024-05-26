import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hook/useLocalStorage';

export const ThemeContext = createContext();

// currently theme is just have 2 light and dark
export function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useLocalStorage('theme', 'light');
  useEffect(() => {
    if (selectedTheme === null) {
      setSelectedTheme('light');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  const toggleSwitchTheme = () => {
    if (selectedTheme === 'light') setSelectedTheme('dark');
    if (selectedTheme === 'dark') setSelectedTheme('light');
  };

  const ThemeContextValue = React.useMemo(() => {
    return {
      selectedTheme,
      toggleSwitchTheme
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  return <ThemeContext.Provider value={ThemeContextValue}>{children}</ThemeContext.Provider>;
}

// Mengganti prototype dengan propTypes langsung
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};
