import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

interface Props {
  count: number;
}

export function YourVideosHeader({ count }: Props) {
  const label = count === 1 ? '1 vídeo' : `${count} vídeos`;

  return (
    <View style={styles.row}>
      <Text style={typography.videosSectionTitle}>Seus vídeos plantados</Text>
      <View style={styles.badge}>
        <Text style={typography.videosCountBadge}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: colors.lilacLight,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
});
