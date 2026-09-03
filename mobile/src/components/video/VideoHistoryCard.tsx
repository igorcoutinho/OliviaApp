import { useState, useEffect, useCallback } from 'react';
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
import { colors, radius, spacing, fonts } from '../../theme';
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

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
  });

  useEffect(() => {
    if (!visible) {
      player.pause();
      setIsPlaying(false);
      return;
    }
  }, [visible, player]);

  // Atualiza o progresso enquanto o vídeo toca
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setCurrentTime(player.currentTime ?? 0);
      setDuration(player.duration ?? 0);
      setIsPlaying(player.playing ?? false);
    }, 300);
    return () => clearInterval(id);
  }, [visible, player]);

  const togglePlay = useCallback(() => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Sua mensagem</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={14} color={colors.lavender} />
            </TouchableOpacity>
          </View>

          {/* Área do vídeo */}
          <TouchableOpacity
            style={styles.videoContainer}
            onPress={togglePlay}
            activeOpacity={1}
          >
            <VideoView
              style={StyleSheet.absoluteFill}
              player={player}
              nativeControls={false}
              contentFit="contain"
            />
            {!isPlaying && (
              <View style={styles.playOverlay}>
                <View style={styles.playCircle}>
                  <Ionicons name="play" size={24} color="white" style={{ marginLeft: 3 }} />
                </View>
              </View>
            )}
          </TouchableOpacity>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>
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
  // ── Card da lista ──────────────────────────────────────────────────────
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

  // ── Modal ──────────────────────────────────────────────────────────────
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.lavender,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f2edf8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#120f1a',
    borderRadius: 16,
    overflow: 'hidden',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    gap: 8,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e8d5f5',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.lavender,
    minWidth: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: '#8c72a8',
  },
});
