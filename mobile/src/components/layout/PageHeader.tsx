import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface Props {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.accent} />
      <Text style={styles.decor}>🌸 · 🧚 · 🌿</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: spacing.lg, paddingHorizontal: spacing.screen },
  accent: {
    width: 48, height: 4, borderRadius: 100,
    backgroundColor: colors.lilacLight, marginBottom: spacing.md,
  },
  decor: { ...typography.caption, letterSpacing: 6, marginBottom: spacing.xs },
  title: { ...typography.h1, textAlign: 'center' },
  subtitle: { ...typography.subtitle, marginTop: spacing.sm, textAlign: 'center' },
});
