import { VariantType } from '@/src/constants/dtos/common';
import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';


interface AmTextProps {
  text?: string;
  children?: React.ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  variant?: VariantType;
  style?: StyleProp<TextStyle>;
  className?: string;
}
// AlphaTwelve Minimart Text (AmText)
const AmText: React.FC<AmTextProps> = ({ text = '', children, numberOfLines = 1000, ellipsizeMode = 'tail', variant ='bodyMedium', style = {}, className}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      variant={variant}
      style={[styles.textColor, style]}
      className={className}
    >
      {text || children}
    </Text>
  );
};

export default AmText;

const styles = StyleSheet.create({
  textColor: {
    color: '#2F2F2F',
  },
});
