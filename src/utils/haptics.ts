import * as Haptics from 'expo-haptics';

export type HapticType = 'light' | 'medium' | 'heavy';

export const triggerHaptic = async (type: HapticType = 'light') => {
  try {
    if (!Haptics) return;

    switch (type) {
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      default:
        break;
    }
  } catch (error) {
    console.warn('Failed to trigger haptic feedback or is unsupported on this device:', error);
  }
};
