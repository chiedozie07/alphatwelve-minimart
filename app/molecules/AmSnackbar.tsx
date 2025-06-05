import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';

export type AmSnackbarProps = {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  duration?: number;
  status?: 'success' | 'info' | 'warning' | 'error';
  /** 
   * Override the default icon for this status. 
   * Must be a valid name from MaterialCommunityIcons.glyphMap 
   */
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
};

const STATUS_CONFIG: Record<
  NonNullable<AmSnackbarProps['status']>,
  {
    iconName: keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor: string;
    borderColor: string;
    backgroundColor: string;
    textColor: string;
    actionColor: string;
  }
> = {
  success: {
    iconName: 'check-circle-outline',
    iconColor: '#22C55E',
    borderColor: '#22C55E',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    actionColor: '#22C55E',
  },
  info: {
    iconName: 'information-outline',
    iconColor: '#3B82F6',
    borderColor: '#3B82F6',
    backgroundColor: '#E9EAFF',
    textColor: '#1F2937',
    actionColor: '#3B82F6',
  },
  warning: {
    iconName: 'alert-circle-outline',
    iconColor: '#F59E0B',
    borderColor: '#F59E0B',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    actionColor: '#F59E0B',
  },
  error: {
    iconName: 'close-circle-outline',
    iconColor: '#EF4444',
    borderColor: '#EF4444',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    actionColor: '#EF4444',
  },
};

const AmSnackbar: React.FC<AmSnackbarProps> = ({ visible, onDismiss, message, duration = 3000, status = 'success', iconName}) => {
  // Pick up default config based on status
  const {
    iconName: defaultIcon,
    iconColor,
    borderColor,
    backgroundColor,
    textColor,
    actionColor,
  } = STATUS_CONFIG[status];

  // If caller passed iconName, use it; otherwise use defaultIcon
  const chosenIcon = iconName || defaultIcon;

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={[styles.snackbarBase, { backgroundColor, borderLeftColor: borderColor }]}
      action={{
        label: '✕',
        onPress: onDismiss,
        color: actionColor,
      }}
    >
      <View style={styles.contentRow}>
        <MaterialCommunityIcons
          name={chosenIcon}
          size={20}
          color={iconColor}
          // style={styles.icon}
          style={styles.icon as TextStyle}
        />
        <Text style={[styles.messageText, { color: textColor }]}>{message}</Text>
      </View>
    </Snackbar>
  );
};

export default AmSnackbar;

const styles = StyleSheet.create({
  snackbarBase: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 2,
    borderLeftWidth: 4,
    // height: 50,
  } as ViewStyle,
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  } as ViewStyle,
  icon: {
    marginRight: 8,
  } as ViewStyle,
  messageText: {
    fontSize: 16,
  } as TextStyle,
});
