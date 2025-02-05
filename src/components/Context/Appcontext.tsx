import { createContext } from 'react';
import type { СontextApp } from '../../types/types';

export const Appcontext = createContext<СontextApp[]>([
  {
    id: 0,
    name: '',
  },
]);
