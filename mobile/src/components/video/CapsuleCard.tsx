import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export function CapsuleCard() {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.icon}>💌</Text>
        <Text style={typography.capsuleTitle}>Um presente para o futuro</Text>
      </View>
      <Text style={typography.capsuleDescription}>
        Grave uma mensagem em vídeo hoje para a Olívia. Ela ficará guardada com
        carinho no baú do tempo — e só será revelada quando ela fizer 10 anos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lilacLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    fontSize: 24,
  },
});
