import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, fonts, spacing } from '../../theme';
import { KEYBOARD_DONE_ACCESSORY_ID } from '../ui/KeyboardDoneAccessory';

interface Props extends TextInputProps {
  label?: string;
}

export function CaptionField({
  label = 'Mensagem da Legenda',
  style,
  ...props
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#8c72a8"
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
    width: '100%',
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: '#6b4d8a',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5dec9',
    padding: spacing.md,
    minHeight: 100,
    fontFamily: fonts.body,
    fontSize: 14,
    color: '#6b4d8a',
  },
});
