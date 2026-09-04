import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VideoView, useVideoPlayer } from 'expo-video';
import { colors, radius, spacing, fonts } from '../../theme';

const EDGE_GAP = 16;

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface Props {
  uri: string;
  visible: boolean;
  onClose: () => void;
  title?: string;
}

export function VideoPlayerModal({ uri, visible, onClose, title = 'Vídeo' }: Props) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
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

  const cardWidth = Math.min(width - EDGE_GAP * 2, 420);
  const cardMaxHeight =
    height - Math.max(insets.top, EDGE_GAP) - Math.max(insets.bottom, EDGE_GAP) - EDGE_GAP * 2;
  const chromeHeight = 28 + spacing.md + 32 + spacing.lg * 2;
  const videoHeight = Math.min(420, Math.max(280, cardMaxHeight - chromeHeight));

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View
        style={[
          styles.backdrop,
          {
            paddingTop: Math.max(insets.top, EDGE_GAP),
            paddingBottom: Math.max(insets.bottom, EDGE_GAP),
            paddingHorizontal: EDGE_GAP,
          },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={[styles.modalCard, { width: cardWidth, maxHeight: cardMaxHeight }]}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={14} color={colors.lavender} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.videoContainer, { height: videoHeight }]}
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
              <View style={styles.playCircle}>
                <Ionicons name="play" size={24} color="white" style={{ marginLeft: 3 }} />
              </View>
            )}
          </TouchableOpacity>

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

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
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
    gap: spacing.sm,
  },
  title: {
    flex: 1,
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
    backgroundColor: '#120f1a',
    borderRadius: 16,
    overflow: 'hidden',
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
    zIndex: 1,
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
