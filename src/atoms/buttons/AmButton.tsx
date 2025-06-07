import { IAmButtonProps } from '@/constants/dtos/common';
import { ALERT_ACTIONS } from '@/state/actions/alertActions';
import { AlertContext } from '@/state/context/AlertContext';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';


const AmButton: React.FC<IAmButtonProps> = ({
  type='regular',
  onPress,
  title,
  mode = 'contained',
  icon,
  transparent = false,
  buttonColor = '#2F2F2F',
  textColor = '#FFFFFF',
  style,
  contentStyle,
  disabled = false,
  loading = false,
}) => {
  const { hapticFeedback } = useContext(AlertContext);

  // called before invoking the passed-in onPress
  const handlePress = () => {
    hapticFeedback({
      style: ALERT_ACTIONS.HAPTIC.STYLE.IMPACT,
      type: ALERT_ACTIONS.HAPTIC.TYPE.LIGHT,
    });
    onPress?.();
  };

  // determine background and label color logic
  const backgroundColor = transparent
    ? 'transparent'
    : mode === 'outlined'
      ? 'transparent'
      : buttonColor;

  const labelColor =
    mode === 'outlined' && !transparent ? buttonColor : textColor;

  return (
    <Button
      mode={mode}
      icon={icon}
      buttonColor={backgroundColor}
      labelStyle={{ color: labelColor }}
      style={[
        type === 'rounded' ? styles.btnStyle : styles.buttonContainer,
        disabled && styles.disabledOpacity,
        style,
      ]}
      contentStyle={[styles.contentContainer, contentStyle]}
      loading={loading}
      disabled={disabled}
      onPress={handlePress}
    >
      {title}
    </Button>
  );
};

export default AmButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
    minWidth: 299,
    height: 45,
    borderRadius: 25,
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledOpacity: {
    opacity: 0.8,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  //button type styles
  btnStyle: {
    maxWidth: "80%",
    gap: 5,
    borderRadius: 25,
    minWidth: 299,
    height: 45,
    elevation: 0,
    shadowOpacity: 0,
  },
  btnText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontStyle: 'normal',
  },
});
