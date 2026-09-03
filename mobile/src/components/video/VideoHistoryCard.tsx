import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';
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

function VideoPlayerModal({
  uri,
  visible,
  onClose,
}: {
  uri: string;
  visible: boolean;
  onClose: () => void;
}) {
  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
    if (visible) p.play();
  });

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <Pressable style={styles.modalDismiss} onPress={onClose} />
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sua mensagem</Text>
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={24} color={colors.oliveDark} />
            </TouchableOpacity>
          </View>
          <VideoView
            style={styles.modalVideo}
            player={player}
            nativeControls
            contentFit="contain"
            fullscreenOptions={{ enable: true }}
          />
        </View>
      </View>
    </Modal>
  );
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
        />
      ) : null}
    </>
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
  watchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  watchText: {
    ...typography.caption,
    color: colors.lavender,
    fontFamily: fonts.bodyBold,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(40, 30, 50, 0.72)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalDismiss: {
    ...StyleSheet.absoluteFill,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.soft,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
  },
  modalTitle: {
    ...typography.body,
    fontFamily: fonts.bodyBold,
    color: colors.oliveDark,
  },
  modalVideo: {
    width: '100%',
    aspectRatio: 9 / 16,
    maxHeight: 480,
    backgroundColor: colors.creamMid,
  },
});
