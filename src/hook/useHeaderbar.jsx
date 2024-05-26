import { useContext } from 'react';
import { HeaderbarContext } from '../context/headerbar.context';

export const useHeaderbar = () => useContext(HeaderbarContext);
