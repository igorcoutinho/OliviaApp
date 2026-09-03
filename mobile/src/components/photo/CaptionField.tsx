import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { KEYBOARD_DONE_ACCESSORY_ID } from '../ui/KeyboardDoneAccessory';

interface Props extends TextInputProps {
  label?: string;
}

export function CaptionField({ label = 'Mensagem da Legenda', style, ...props }: Props) {
  return (
    <View style={styles.container}>
      <Text style={typography.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, typography.captionInput, style]}
        placeholderTextColor={colors.moss}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
        {...props}
        inputAccessoryViewID={KEYBOARD_DONE_ACCESSORY_ID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.sage,
    padding: spacing.md,
    minHeight: 96,
  },
});
