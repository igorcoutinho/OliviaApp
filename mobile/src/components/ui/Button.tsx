import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, spacing, radius, fontSize, shadows, typography } from '../../theme';

interface Props {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export function Button({ label, onPress, loading, variant = 'primary', disabled }: Props) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        variant === 'ghost' && styles.ghost,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.white : colors.sageDark} />
      ) : (
        <Text style={[
          styles.text,
          isPrimary && styles.textPrimary,
          isSecondary && styles.textSecondary,
          variant === 'ghost' && styles.textGhost,
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    minHeight: 52,
  },
  primary: { backgroundColor: colors.sageDark, ...shadows.soft },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.sage },
  ghost: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.lilacLight },
  disabled: { opacity: 0.6 },
  text: { ...typography.bodyBold, fontSize: fontSize.lg },
  textPrimary: { color: colors.white },
  textSecondary: { color: colors.sageDark },
  textGhost: { color: colors.lavender },
});
