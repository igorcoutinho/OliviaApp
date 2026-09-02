import { View, Text, StyleSheet } from 'react-native';
import { spacing, fontSize, typography } from '../../theme';

interface Props {
  emoji: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ emoji, title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: spacing.xxl },
  emoji: { fontSize: 48, marginBottom: spacing.md },
  title: { ...typography.bodyBold, fontSize: fontSize.lg, textAlign: 'center' },
  subtitle: { ...typography.bodySmall, textAlign: 'center', marginTop: spacing.sm },
});
