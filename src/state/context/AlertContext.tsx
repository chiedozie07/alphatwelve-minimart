import * as Haptics from 'expo-haptics';
import React, { createContext, ReactNode, useCallback } from 'react';
import { ALERT_ACTIONS } from '../actions/alertActions';

export interface AlertContextType {
  hapticFeedback: (payload: {
    style: keyof typeof ALERT_ACTIONS.HAPTIC.STYLE;
    type: keyof typeof ALERT_ACTIONS.HAPTIC.TYPE;
  }) => void;
};

export const AlertContext = createContext<AlertContextType>({
  hapticFeedback: () => {},
});

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const hapticFeedback = useCallback(
    async (payload: { style: keyof typeof ALERT_ACTIONS.HAPTIC.STYLE; type: keyof typeof ALERT_ACTIONS.HAPTIC.TYPE }) => {
      if (payload.style === ALERT_ACTIONS.HAPTIC.STYLE.IMPACT) {
        await Haptics.impactAsync(
          payload.type === ALERT_ACTIONS.HAPTIC.TYPE.LIGHT
            ? Haptics.ImpactFeedbackStyle.Light
            : Haptics.ImpactFeedbackStyle.Medium
        );
      }
      // TODO: Extend later for NOTIFICATION or SELECTION as needed
    },
    []
  );

  return <AlertContext.Provider value={{ hapticFeedback }}>{children}</AlertContext.Provider>;
};
