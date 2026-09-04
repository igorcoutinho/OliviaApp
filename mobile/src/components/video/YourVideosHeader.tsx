import { View, Text, StyleSheet } from 'react-native';
import { fonts, radius, spacing } from '../../theme';

interface Props {
  count: number;
}

export function YourVideosHeader({ count }: Props) {
  const label = count === 1 ? '1 vídeo' : `${count} vídeos`;

  return (
    <View style={styles.row}>
      <Text style={styles.title}>Seus vídeos plantados</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: '#6b4d8a',
  },
  badge: {
    backgroundColor: '#f2edf8',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: '#6b4d8a',
  },
});
