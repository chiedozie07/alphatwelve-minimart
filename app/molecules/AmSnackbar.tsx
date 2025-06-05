import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';

type AmSnackbarProps = {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  duration?: number; //in milliseconds
};

const AmSnackbar: React.FC<AmSnackbarProps> = ({ visible, onDismiss, message, duration = 3000 }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={styles.snackbar}
      action={{
        label: '✕',
        onPress: onDismiss,
        color: '#60B5FF',
      }}
    >
      <View className='flex-row justify-start items-center'>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={20}
          color="#22c55e"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </Snackbar>
  );
};

export default AmSnackbar;

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e'
  },
  messageText: {
    color: '#1F2937',
    fontSize: 14,
  },
});
