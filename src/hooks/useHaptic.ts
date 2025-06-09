import { AlertContext } from '@/state/context/AlertContext';
import { useContext } from 'react';

export const useHaptic = () => {
  const { hapticFeedback } = useContext(AlertContext);
  return hapticFeedback;
};
