import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, shadows, fonts } from '../../theme';
import type { VideoItem } from '../../types';

interface Props {
  video: VideoItem;
  index: number;
}

function formatDate(d: string) {
  return new Date(d).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function VideoHistoryCard({ video, index }: Props) {
  const isEven = index % 2 === 0;

  return (
    <View style={[styles.card, isEven ? styles.cardEven : styles.cardOdd]}>
      <View style={styles.top}>
        <View style={styles.badge}>
          <Ionicons name="lock-closed" size={11} color={colors.lavender} />
          <Text style={styles.badgeText}>Privado</Text>
        </View>
        <Text style={styles.date}>{formatDate(video.created_at)}</Text>
      </View>
      {video.message ? (
        <Text style={styles.message}>"{video.message}"</Text>
      ) : (
        <Text style={styles.messageEmpty}>Mensagem sem texto</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.md,
    ...shadows.soft,
  },
  cardEven: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.sm,
    borderBottomLeftRadius: radius.sm,
    borderBottomRightRadius: radius.lg,
  },
  cardOdd: {
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.lg,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.sm,
    marginLeft: spacing.sm,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.lilacLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  badgeText: {
    ...typography.caption,
    color: colors.lavender,
    fontFamily: fonts.bodyBold,
  },
  date: {
    ...typography.caption,
  },
  message: {
    ...typography.body,
    fontStyle: 'italic',
    color: colors.oliveDark,
  },
  messageEmpty: {
    ...typography.bodySmall,
    color: colors.moss,
  },
});
