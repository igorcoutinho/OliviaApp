import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';
import { FEED_MEDIA_HEIGHT } from './InlineFeedVideo';

export function SkeletonBox({ style }: { style: object | object[] }) {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.45, duration: 750, useNativeDriver: true }),
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
        <SkeletonBox style={styles.actionBtnSm} />
        <View style={styles.actionsSpacer} />
        <SkeletonBox style={styles.actionBtnSm} />
      </View>

      <SkeletonBox style={styles.caption} />

      <View style={styles.comments}>
        <View style={styles.commentRow}>
          <SkeletonBox style={styles.commentAvatar} />
          <View style={styles.commentText}>
            <SkeletonBox style={styles.commentName} />
            <SkeletonBox style={styles.commentBody} />
          </View>
        </View>
        <SkeletonBox style={styles.viewAll} />
        <View style={styles.composer}>
          <SkeletonBox style={styles.commentAvatar} />
          <SkeletonBox style={styles.composerInput} />
        </View>
      </View>
    </View>
  );
}

const H_PAD = spacing.md;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingTop: 16,
    paddingHorizontal: H_PAD,
    paddingBottom: 16,
    gap: 12,
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
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorText: {
    gap: 6,
    flex: 1,
  },
  nameLine: {
    height: 13,
    width: '42%',
    borderRadius: 6,
  },
  subLine: {
    height: 11,
    width: '28%',
    borderRadius: 6,
  },
  image: {
    height: FEED_MEDIA_HEIGHT,
    marginHorizontal: -H_PAD,
    borderRadius: 0,
    alignSelf: 'stretch',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    height: 34,
    width: 96,
    borderRadius: 17,
  },
  actionBtnSm: {
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  actionsSpacer: {
    flex: 1,
  },
  caption: {
    height: 14,
    width: '78%',
    borderRadius: 6,
  },
  comments: {
    gap: 10,
    paddingTop: 4,
  },
  commentRow: {
    flexDirection: 'row',
    gap: 8,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  commentText: {
    flex: 1,
    gap: 6,
  },
  commentName: {
    height: 11,
    width: '36%',
    borderRadius: 5,
  },
  commentBody: {
    height: 12,
    width: '88%',
    borderRadius: 5,
  },
  viewAll: {
    height: 12,
    width: '48%',
    borderRadius: 5,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.reactionBorder,
  },
  composerInput: {
    flex: 1,
    height: 16,
    borderRadius: 6,
  },
});
