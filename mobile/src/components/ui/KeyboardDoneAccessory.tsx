import { useEffect, useState } from 'react';
import {
  InputAccessoryView,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const KEYBOARD_DONE_ACCESSORY_ID = 'festa-keyboard-done';

export function KeyboardDoneAccessory() {
  if (Platform.OS !== 'ios') return null;

  return (
    <InputAccessoryView nativeID={KEYBOARD_DONE_ACCESSORY_ID}>
      <View style={styles.bar}>
        <TouchableOpacity onPress={Keyboard.dismiss} hitSlop={12} accessibilityRole="button">
          <Text style={styles.done}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </InputAccessoryView>
  );
}

export function AndroidKeyboardDismissBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const show = Keyboard.addListener('keyboardDidShow', () => setVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  if (Platform.OS !== 'android' || !visible) return null;

  return (
    <View style={styles.androidBar} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.androidButton}
        onPress={Keyboard.dismiss}
        accessibilityRole="button"
      >
        <Text style={styles.done}>Fechar teclado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.cream,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.sage,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  done: {
    ...typography.authFieldLabel,
    color: colors.lavender,
  },
  androidBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  androidButton: {
    backgroundColor: colors.cream,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.sage,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'flex-end',
  },
});
