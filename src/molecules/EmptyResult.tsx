import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { AmText } from '../../src/atoms';

type EmptyResultProps = {
  iconSize?: number;
  title?: string;
  text?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
  iconName?: string;
  className?: string;
};

const EmptyResult: React.FC<EmptyResultProps> = ({iconSize = 100, text, style = {}, children, iconName='layers-search', title, className}) => {
  return (
    <View style={[styles.container, style]} className={className}>
      <IconButton icon={iconName} size={iconSize} iconColor='#9CA3AF' />
      <AmText variant="titleMedium" className="text-gray-500 mt-2 text-lg font-semibold">{title}</AmText>
      {text && <AmText variant="bodyLarge" className="text-gray-400 mt-2 text-center text-xl font-semibold">{text}</AmText>}
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
    paddingHorizontal: 4
  },
});
