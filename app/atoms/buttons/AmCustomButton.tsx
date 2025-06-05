import React from 'react';
import { ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import AmText from '../text/AmText';


export interface AmCustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const AmCustomButton: React.FC<AmCustomButtonProps> = ({ title, onPress, disabled = false, loading = false, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.4}
      onPress={() => {
        if (!disabled && !loading) {
          onPress();
        }
      }}
      disabled={disabled || loading}
    >
      {loading ? (
        <View className='flex-row justify-center items-center'>
          <AmText variant="labelLarge" style={[styles.buttonText, textStyle, {marginRight: 15}]}>
          {title}
        </AmText>
        <ActivityIndicator size="small" color="#FFFFFF" />
        </View>
      ) : (
        <AmText variant="labelLarge" style={[styles.buttonText, textStyle]}>
          {title}
        </AmText>
      )}
    </TouchableOpacity>
  );
};

export default AmCustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#60B5FF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 16,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
