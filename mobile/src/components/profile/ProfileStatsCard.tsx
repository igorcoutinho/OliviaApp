import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';
import type { ProfileStats } from '../../types';

interface Props {
  stats: ProfileStats;
}

export function ProfileStatsCard({ stats }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.col}>
        <Text style={typography.statValueSage}>{stats.photos}</Text>
        <Text style={typography.statLabel}>Fotos Plantadas</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.col}>
        <Text style={typography.statValueLavender}>{stats.videos}</Text>
        <Text style={typography.statLabel}>Vídeo Cápsula</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    ...shadows.soft,
  },
  col: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  divider: {
    width: 1,
    backgroundColor: colors.lilacLight,
    marginVertical: spacing.xs,
  },
});
