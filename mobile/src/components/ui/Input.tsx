import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, radius, fontSize, shadows } from '../../theme';

export function Input({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.textMuted}
      {...props}
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
