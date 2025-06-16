// import { triggerHaptic } from '@/utils/haptics';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  children: React.ReactNode;
};

const CustomTabBarButton: React.FC<Props> = ({ children, onPress, ...rest }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={(e) => {
        // triggerHaptic('heavy');
        onPress?.(e);
      }}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;
