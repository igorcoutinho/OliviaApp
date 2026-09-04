import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';

export const FEED_MEDIA_HEIGHT = 390;

interface Props {
  uri: string;
  active: boolean;
  width: number;
}

export function InlineFeedVideo({ uri, active, width }: Props) {
  const [started, setStarted] = useState(false);
  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
  });

  useEffect(() => {
    if (!active) {
      player.pause();
      setStarted(false);
    }
  }, [active, player]);

  const handlePlay = useCallback(() => {
    if (!active) return;
    setStarted(true);
    player.play();
  }, [active, player]);

  if (width <= 0) {
    return <View style={{ height: FEED_MEDIA_HEIGHT }} />;
  }

  return (
    <View style={[styles.box, { width, height: FEED_MEDIA_HEIGHT }]}>
      {started && active ? (
        <VideoView
          style={styles.video}
          player={player}
          nativeControls
          contentFit="cover"
        />
      ) : (
        <Pressable style={styles.placeholder} onPress={handlePlay}>
          <View style={styles.playCircle}>
            <Ionicons name="play" size={24} color="white" style={{ marginLeft: 3 }} />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#120f1a',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#120f1a',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#120f1a',
  },
  playCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
