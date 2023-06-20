import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppDispatch = () => useDispatch<AppDispatch>();
