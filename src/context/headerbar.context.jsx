import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const HeaderbarContext = createContext();

export function HeaderbarProvider({ children }) {
  const [title, setTitle] = useState('');

  const HeaderbarContextValue = React.useMemo(() => {
    return {
      title,
      setTitle
    };
  }, [title]);

  return (
    <HeaderbarContext.Provider value={HeaderbarContextValue}>{children}</HeaderbarContext.Provider>
  );
}

HeaderbarProvider.propTypes = {
  children: PropTypes.node.isRequired
};
