import { useContext } from 'react';
import { MetaCardContext } from '../context/MetaCardContext';

export const useAccount = () => useContext(MetaCardContext);
