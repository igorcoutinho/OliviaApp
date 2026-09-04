import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '../../theme';

export function VideoEmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🧚‍♀️</Text>
      <Text style={typography.videoEmptyTitle}>Nenhuma semente de vídeo ainda</Text>
      <Text style={typography.videoEmptySub}>
        Seja o primeiro a deixar uma bênção mágica para a Olívia no futuro
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 20,
  },
  icon: {
    fontSize: 48,
  },
});
