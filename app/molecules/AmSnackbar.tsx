import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';

export type AmSnackbarProps = {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  duration?: number; //in milliseconds
  status?: 'success' | 'info' | 'warning' | 'error' | undefined;
  icon?: React.ReactNode;
};

const AmSnackbar: React.FC<AmSnackbarProps> = ({ visible, onDismiss, message, duration = 3000, status='success' }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={[styles.snackbar, status === 'warning' ? {backgroundColor: '#FFF2E2', borderLeftColor: '#CC8925', elevation: 0, shadowOpacity: 0} : {backgroundColor: '#FFFFFF', borderLeftColor: '#22c55e'}]}
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
          color={status === 'warning' ? '#CC8925' : "#22c55e"}
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.messageText, status === 'warning' ? {color: '#DDAD65'} : {color: '#1F2937'}]}>{message}</Text>
      </View>
    </Snackbar>
  );
};

export default AmSnackbar;

const styles = StyleSheet.create({
  snackbar: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderLeftWidth: 4,
  },
  messageText: {
    fontSize: 14,
  },
});
