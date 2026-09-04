import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, fonts } from '../../theme';
import type { VideoItem } from '../../types';
import { VideoPlayerModal } from './VideoPlayerModal';

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
  const [playing, setPlaying] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <>
      <TouchableOpacity
        style={[styles.card, isEven ? styles.cardEven : styles.cardOdd]}
        onPress={() => setPlaying(true)}
        activeOpacity={0.85}
      >
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
        <View style={styles.watchRow}>
          <Ionicons name="play-circle" size={20} color={colors.lavender} />
          <Text style={styles.watchText}>Assistir</Text>
        </View>
      </TouchableOpacity>

      {playing ? (
        <VideoPlayerModal
          uri={video.url}
          visible={playing}
          onClose={() => setPlaying(false)}
          title="Sua mensagem"
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.md,
    shadowColor: '#6A4F9E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
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
    backgroundColor: '#f2edf8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.lavender,
  },
  date: {
    fontSize: 12,
    color: '#8c72a8',
  },
  message: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.lavender,
    lineHeight: 20,
  },
  messageEmpty: {
    fontSize: 14,
    color: colors.lavender,
  },
  watchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  watchText: {
    fontSize: 14,
    fontFamily: fonts.bodyBold,
    color: colors.lavender,
  },
});
