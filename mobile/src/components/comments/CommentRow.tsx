import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../theme';
import { formatPostTime } from '../../lib/feedUtils';
import type { CommentItem } from '../../api/comments.api';

interface Props {
  item: CommentItem;
  compact?: boolean;
  onLike: () => void;
  onDislike: () => void;
  onDelete?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function CommentRow({ item, compact, onLike, onDislike, onDelete }: Props) {
  const avatarSize = compact ? 24 : 32;

  const handleDelete = () => {
    if (!item.isMine || !onDelete) return;
    Alert.alert('Excluir comentário', 'Remover este comentário e todas as curtidas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: onDelete },
    ]);
  };

  return (
    <Pressable
      onLongPress={handleDelete}
      delayLongPress={350}
      style={[styles.wrap, !compact && styles.wrapFull, item.isMostLiked && !compact && styles.mostLiked]}
    >
      {item.isMostLiked && !compact ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⭐ Mais curtido</Text>
        </View>
      ) : null}

      <View style={styles.metaRow}>
        <View
          style={[
            styles.avatar,
            { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
          ]}
        >
          {item.author.avatar_url ? (
            <Image
              source={{ uri: item.author.avatar_url, cacheKey: `cavatar-${item.author.id}` }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          ) : (
            <Text style={[styles.avatarText, compact && styles.avatarTextSm]}>
              {getInitials(item.author.full_name)}
            </Text>
          )}
        </View>

        {compact ? (
          <View style={styles.content}>
            <Text style={styles.name}>{item.author.full_name}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <View style={styles.actions}>
              <VoteActions
                item={item}
                compact
                onLike={onLike}
                onDislike={onDislike}
                onDelete={handleDelete}
              />
            </View>
          </View>
        ) : (
          <View style={styles.metaText}>
            <Text style={styles.name}>{item.author.full_name}</Text>
            <Text style={styles.time}>{formatPostTime(item.created_at)}</Text>
          </View>
        )}
      </View>

      {!compact ? (
        <>
          <Text style={styles.bodyFull}>{item.body}</Text>
          <View style={styles.actions}>
            <VoteActions
              item={item}
              onLike={onLike}
              onDislike={onDislike}
              onDelete={handleDelete}
            />
          </View>
        </>
      ) : null}
    </Pressable>
  );
}

function VoteActions({
  item,
  compact,
  onLike,
  onDislike,
  onDelete,
}: {
  item: CommentItem;
  compact?: boolean;
  onLike: () => void;
  onDislike: () => void;
  onDelete: () => void;
}) {
  return (
    <>
      <Pressable onPress={onLike} hitSlop={8} style={styles.action}>
        <Ionicons
          name={item.myVote === 1 ? 'thumbs-up' : 'thumbs-up-outline'}
          size={16}
          color={item.myVote === 1 ? colors.lavender : '#9b7db8'}
        />
        <Text style={styles.count}>{item.likeCount}</Text>
      </Pressable>
      <Pressable onPress={onDislike} hitSlop={8} style={styles.action}>
        <Ionicons
          name={item.myVote === -1 ? 'thumbs-down' : 'thumbs-down-outline'}
          size={16}
          color={item.myVote === -1 ? colors.lavender : '#9b7db8'}
        />
      </Pressable>
      {item.isMine && !compact ? (
        <Pressable onPress={onDelete} hitSlop={8} style={styles.action}>
          <Ionicons name="trash-outline" size={15} color="#9b7db8" />
        </Pressable>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    gap: 4,
  },
  wrapFull: {
    gap: 8,
    padding: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.reactionBorder,
  },
  mostLiked: {
    backgroundColor: '#f5f0fa',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff2e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    color: '#d4af37',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  avatar: {
    backgroundColor: '#f2edf8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: colors.lavender,
  },
  avatarTextSm: {
    fontSize: 9,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  metaText: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: '#6b4d8a',
  },
  time: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: '#8c72a8',
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: '#6b4d8a',
  },
  bodyFull: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: '#6b4d8a',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  count: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: '#9b7db8',
  },
});
