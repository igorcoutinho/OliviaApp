import { useRef, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  type ViewToken,
  type LayoutChangeEvent,
} from 'react-native';
import { Image } from 'expo-image';
import type { PhotoMediaItem } from '../../types';
import { colors } from '../../theme';
import { FEED_MEDIA_HEIGHT, InlineFeedVideo } from './InlineFeedVideo';
import { SkeletonBox } from './FeedCardSkeleton';

interface Props {
  media: PhotoMediaItem[];
  photoId: string;
  onIndexChange?: (index: number) => void;
}

function FeedImage({
  uri,
  cacheKey,
  width,
}: {
  uri: string;
  cacheKey: string;
  width: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={{ width, height: FEED_MEDIA_HEIGHT, backgroundColor: colors.creamMid }}>
      {!loaded ? (
        <View style={StyleSheet.absoluteFill}>
          <SkeletonBox style={styles.mediaBone} />
        </View>
      ) : null}
      <Image
        source={{ uri, cacheKey }}
        style={{ width, height: FEED_MEDIA_HEIGHT }}
        contentFit="cover"
        cachePolicy="memory-disk"
        recyclingKey={cacheKey}
        transition={0}
        onLoad={() => setLoaded(true)}
      />
    </View>
  );
}

export function MediaCarousel({ media, photoId, onIndexChange }: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState(windowWidth);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const next = e.nativeEvent.layout.width;
    if (next > 0) setContainerWidth(next);
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const idx = viewableItems[0].index ?? 0;
        setActiveIndex(idx);
        onIndexChange?.(idx);
      }
    },
    [onIndexChange],
  );

  if (containerWidth <= 0) {
    return (
      <View onLayout={onLayout} style={{ height: FEED_MEDIA_HEIGHT }}>
        <SkeletonBox style={styles.mediaBone} />
      </View>
    );
  }

  if (media.length === 1) {
    const item = media[0]!;
    return (
      <View onLayout={onLayout}>
        {item.type === 'video' ? (
          <InlineFeedVideo uri={item.url} active width={containerWidth} />
        ) : (
          <FeedImage uri={item.url} cacheKey={`${photoId}-0`} width={containerWidth} />
        )}
      </View>
    );
  }

  return (
    <View onLayout={onLayout}>
      <FlatList
        ref={listRef}
        data={media}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        extraData={activeIndex}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        getItemLayout={(_, index) => ({
          length: containerWidth,
          offset: containerWidth * index,
          index,
        })}
        renderItem={({ item, index }) => {
          if (item.type === 'video') {
            return (
              <InlineFeedVideo
                uri={item.url}
                active={activeIndex === index}
                width={containerWidth}
              />
            );
          }
          return (
            <FeedImage
              uri={item.url}
              cacheKey={`${photoId}-${index}`}
              width={containerWidth}
            />
          );
        }}
      />
      <View style={styles.dots}>
        {media.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mediaBone: {
    width: '100%',
    height: FEED_MEDIA_HEIGHT,
    borderRadius: 0,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d8c8e8',
  },
  dotActive: {
    backgroundColor: colors.lavender,
    width: 14,
  },
});
