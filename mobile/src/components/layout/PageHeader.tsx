import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, radius } from '../../theme';

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
  container: { alignItems: 'center', paddingVertical: spacing.lg, paddingHorizontal: spacing.md },
  accent: {
    width: 48, height: 4, borderRadius: radius.full,
    backgroundColor: colors.lavender, marginBottom: spacing.md, opacity: 0.6,
  },
  decor: { fontSize: fontSize.sm, letterSpacing: 6, color: colors.lavender, marginBottom: spacing.xs },
  title: {
    fontSize: fontSize.xxl, fontWeight: '300', color: colors.olive,
    fontStyle: 'italic', letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: fontSize.xs, color: colors.textSecondary,
    letterSpacing: 1.5, marginTop: spacing.sm, textAlign: 'center', lineHeight: 18,
  },
});
