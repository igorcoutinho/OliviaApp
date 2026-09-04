import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { colors, fonts, spacing } from '../../theme';
import { formatNotificationTime } from '../../lib/feedUtils';
import type { NotificationItem } from '../../api';

interface Props {
  item: NotificationItem;
  onPress: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function NotificationRow({ item, onPress }: Props) {
  const avatarKey = `notif-avatar-${item.actor.id}`;
  const thumbKey = `notif-thumb-${item.photo.id}`;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, !item.read && styles.rowUnread]}
    >
      <View style={styles.avatar}>
        {item.actor.avatar_url ? (
          <Image
            source={{ uri: item.actor.avatar_url, cacheKey: avatarKey }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            cachePolicy="memory-disk"
            recyclingKey={avatarKey}
            transition={0}
          />
        ) : (
          <Text style={styles.avatarText}>{getInitials(item.actor.full_name)}</Text>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.message}>
          <Text style={styles.actorName}>{item.actor.full_name} </Text>
          {item.message}
        </Text>
        <Text style={styles.time}>{formatNotificationTime(item.created_at)}</Text>
      </View>

      {item.photo.thumbnail_url ? (
        <Image
          source={{ uri: item.photo.thumbnail_url, cacheKey: thumbKey }}
          style={styles.thumb}
          contentFit="cover"
          cachePolicy="memory-disk"
          recyclingKey={thumbKey}
          transition={0}
        />
      ) : (
        <View style={[styles.thumb, styles.thumbFallback]} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.screenLg,
    paddingVertical: spacing.md,
  },
  rowUnread: {
    backgroundColor: '#f5f0fa',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: colors.lilacLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.lavender,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.lavender,
  },
  actorName: {
    fontFamily: fonts.bodyBold,
  },
  time: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: '#8c72a8',
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.creamMid,
  },
  thumbFallback: {
    backgroundColor: colors.lilacLight,
  },
});
