import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { AmText } from '../atoms';

type EmptyResultProps = {
  size?: number;
  text?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
  className?: string;
};

const EmptyResult: React.FC<EmptyResultProps> = ({size = 100, text, style = {}, children, className}) => {
  return (
    <View style={[styles.container, style]} className={className}>
      <IconButton icon="layers-search" size={size} />
      {text && <AmText variant="bodyLarge" style={{fontSize: 18, fontWeight: 400, textAlign: 'center'}}>{text}</AmText>}
      {children}
    </View>
  );
};

export default EmptyResult;

const styles = StyleSheet.create({
  container: {
    minHeight: 500,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
