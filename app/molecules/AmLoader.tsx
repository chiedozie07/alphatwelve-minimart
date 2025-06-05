import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { AmText } from '../atoms';

type AmLoaderProps = {
  visible: boolean;
  text?: string;
  size?: 'large' | 'small'
};

const AmLoader: React.FC<AmLoaderProps> = ({ visible, text, size='large' }) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={size} animating={true} color="#60B5FF" />
      {text && <AmText variant="bodyMedium" className={'text-lg mt-3'} style={{fontWeight: 'bold', textAlign: 'center', color: '#888'}}>{text}</AmText>}
    </View>
  );
};

export default AmLoader;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)', // semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
