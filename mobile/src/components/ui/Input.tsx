import { TextInput, StyleSheet, TextInputProps, Keyboard } from 'react-native';
import { colors, spacing, radius, fontSize, shadows } from '../../theme';
import { KEYBOARD_DONE_ACCESSORY_ID } from './KeyboardDoneAccessory';

export function Input({
  style,
  onSubmitEditing,
  returnKeyType = 'done',
  blurOnSubmit = true,
  inputAccessoryViewID = KEYBOARD_DONE_ACCESSORY_ID,
  ...props
}: TextInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.textMuted}
      {...props}
      returnKeyType={returnKeyType}
      blurOnSubmit={blurOnSubmit}
      inputAccessoryViewID={inputAccessoryViewID}
      onSubmitEditing={(event) => {
        onSubmitEditing?.(event);
        Keyboard.dismiss();
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    fontSize: fontSize.lg,
    color: colors.text,
    marginBottom: spacing.md,
    ...shadows.soft,
  },
});
