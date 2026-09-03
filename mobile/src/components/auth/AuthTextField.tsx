import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { KEYBOARD_DONE_ACCESSORY_ID } from '../ui/KeyboardDoneAccessory';

interface Props extends TextInputProps {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  hint?: string;
  secureToggle?: boolean;
  secureVisible?: boolean;
  onToggleSecure?: () => void;
}

export function AuthTextField({
  label,
  icon,
  hint,
  secureToggle,
  secureVisible,
  onToggleSecure,
  style,
  onSubmitEditing,
  returnKeyType = 'done',
  blurOnSubmit = true,
  inputAccessoryViewID = KEYBOARD_DONE_ACCESSORY_ID,
  ...props
}: Props) {
  return (
    <View style={styles.group}>
      <Text style={typography.authFieldLabel}>{label}</Text>
      <View style={styles.inputWrap}>
        <Feather name={icon} size={20} color={colors.moss} />
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.moss}
          {...props}
          returnKeyType={returnKeyType}
          blurOnSubmit={blurOnSubmit}
          inputAccessoryViewID={inputAccessoryViewID}
          onSubmitEditing={(event) => {
            onSubmitEditing?.(event);
            Keyboard.dismiss();
          }}
        />
        {secureToggle && (
          <TouchableOpacity onPress={onToggleSecure} hitSlop={8}>
            <Feather
              name={secureVisible ? 'eye-off' : 'eye'}
              size={20}
              color={colors.moss}
            />
          </TouchableOpacity>
        )}
      </View>
      {hint ? <Text style={typography.authHint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0D8E8',
    paddingHorizontal: spacing.md,
    height: 52,
    gap: spacing.sm + 4,
  },
  input: {
    flex: 1,
    ...typography.authInput,
  },
});
