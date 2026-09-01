import {
  View, Text, StyleSheet, ActivityIndicator, TouchableOpacity,
  TextInput, TextInputProps, ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, fontSize, shadows } from '../../theme';

interface ScreenProps {
  children?: React.ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  scroll?: boolean;
  style?: ViewStyle;
}

export function Screen({ children, loading, loadingMessage }: ScreenProps) {
  if (loading) return <LoadingScreen message={loadingMessage} />;
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {children}
    </SafeAreaView>
  );
}

export function LoadingScreen({ message = 'Carregando...' }: { message?: string }) {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <Text style={styles.loadingEmoji}>🌸</Text>
      <ActivityIndicator size="large" color={colors.sageDark} />
      <Text style={styles.loadingText}>{message}</Text>
    </SafeAreaView>
  );
}

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export function Button({ label, onPress, loading, variant = 'primary', disabled }: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary && styles.buttonPrimary,
        isSecondary && styles.buttonSecondary,
        variant === 'ghost' && styles.buttonGhost,
        (disabled || loading) && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.white : colors.sageDark} />
      ) : (
        <Text style={[
          styles.buttonText,
          isPrimary && styles.buttonTextPrimary,
          isSecondary && styles.buttonTextSecondary,
          variant === 'ghost' && styles.buttonTextGhost,
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function Input({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.textMuted}
      {...props}
    />
  );
}

export function EmptyState({ emoji, title, subtitle }: { emoji: string; title: string; subtitle?: string }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyEmoji}>{emoji}</Text>
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle && <Text style={styles.emptySubtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  loadingContainer: {
    flex: 1, backgroundColor: colors.background,
    alignItems: 'center', justifyContent: 'center', gap: spacing.md,
  },
  loadingEmoji: { fontSize: 48 },
  loadingText: { color: colors.textSecondary, fontSize: fontSize.md },
  button: {
    borderRadius: radius.full, paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg, alignItems: 'center', minHeight: 52,
  },
  buttonPrimary: { backgroundColor: colors.sageDark, ...shadows.soft },
  buttonSecondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.sage },
  buttonGhost: { backgroundColor: 'transparent' },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { fontSize: fontSize.lg, fontWeight: '600' },
  buttonTextPrimary: { color: colors.white },
  buttonTextSecondary: { color: colors.sageDark },
  buttonTextGhost: { color: colors.lavender },
  input: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.md, fontSize: fontSize.lg, color: colors.text,
    marginBottom: spacing.md, ...shadows.soft,
  },
  empty: { alignItems: 'center', padding: spacing.xxl },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { fontSize: fontSize.lg, color: colors.text, fontWeight: '600', textAlign: 'center' },
  emptySubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
});
