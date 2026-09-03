import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, radius, spacing, typography } from '../../theme';
import { formatPostTime } from '../../lib/feedUtils';

interface Props {
  fullName: string;
  createdAt: string;
  avatarUrl?: string | null;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function FeedCardAuthor({ fullName, createdAt, avatarUrl }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.avatarWrap}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            cachePolicy="memory-disk"
            recyclingKey={avatarUrl}
            transition={150}
          />
        ) : (
          <Text style={styles.avatarText}>{getInitials(fullName)}</Text>
        )}
      </View>
      <View style={styles.meta}>
        <Text style={typography.authorName}>{fullName}</Text>
        <Text style={typography.postTime}>{formatPostTime(createdAt)}</Text>
      </View>
    </View>
  );
}

const AVATAR_SIZE = 40;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatarWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.lilacLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarText: {
    ...typography.bodyBold,
    fontSize: 14,
    color: colors.lavender,
  },
  meta: {
    gap: 2,
    flex: 1,
  },
});
