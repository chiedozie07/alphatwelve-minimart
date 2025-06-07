import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';

type AmCardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  className?: string;
};

const AmCard: React.FC<AmCardProps> = ({ children, onPress, style, className }) => {
  return (
    <Card
      mode="contained"
      onPress={onPress}
      style={[styles.cardContainer, style]}
      className={className}
    >
      <View style={styles.contentWrapper}>{children}</View>
    </Card>
  );
};

export default AmCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  contentWrapper: {
    overflow: 'hidden',
  },
});
