import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { colors, spacing, shadows } from '../../theme';

function SkeletonBox({ style }: { style: any }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return <Animated.View style={[styles.bone, style, { opacity }]} />;
}

export function FeedCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.author}>
        <SkeletonBox style={styles.avatar} />
        <View style={styles.authorText}>
          <SkeletonBox style={styles.nameLine} />
          <SkeletonBox style={styles.subLine} />
        </View>
      </View>
      <SkeletonBox style={styles.image} />
      <View style={styles.actions}>
        <SkeletonBox style={styles.actionBtn} />
        <SkeletonBox style={styles.actionBtn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
    ...shadows.soft,
  },
  bone: {
    backgroundColor: colors.creamMid,
    borderRadius: 8,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  authorText: {
    gap: 6,
    flex: 1,
  },
  nameLine: {
    height: 13,
    width: '45%',
    borderRadius: 6,
  },
  subLine: {
    height: 11,
    width: '30%',
    borderRadius: 6,
  },
  image: {
    height: 390,
    marginHorizontal: -16,
    alignSelf: 'stretch',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    height: 36,
    width: 90,
    borderRadius: 18,
  },
});
