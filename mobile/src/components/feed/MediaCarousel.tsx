import { useRef, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  type ViewToken,
  type LayoutChangeEvent,
} from 'react-native';
import { Image } from 'expo-image';
import type { PhotoMediaItem } from '../../types';
import { colors } from '../../theme';
import { FEED_MEDIA_HEIGHT, InlineFeedVideo } from './InlineFeedVideo';

interface Props {
  media: PhotoMediaItem[];
  photoId: string;
  onIndexChange?: (index: number) => void;
}

export function MediaCarousel({ media, photoId, onIndexChange }: Props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
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

  if (media.length === 1) {
    const item = media[0]!;
    return (
      <View onLayout={onLayout}>
        {containerWidth > 0 ? (
          item.type === 'video' ? (
            <InlineFeedVideo uri={item.url} active width={containerWidth} />
          ) : (
            <Image
              source={{ uri: item.url, cacheKey: `${photoId}-0` }}
              style={{ width: containerWidth, height: FEED_MEDIA_HEIGHT }}
              contentFit="cover"
              cachePolicy="memory-disk"
              recyclingKey={`${photoId}-0`}
              transition={200}
            />
          )
        ) : (
          <View style={{ height: FEED_MEDIA_HEIGHT }} />
        )}
      </View>
    );
  }

  return (
    <View onLayout={onLayout}>
      {containerWidth > 0 && (
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
              <Image
                source={{ uri: item.url, cacheKey: `${photoId}-${index}` }}
                style={{ width: containerWidth, height: FEED_MEDIA_HEIGHT }}
                contentFit="cover"
                cachePolicy="memory-disk"
                recyclingKey={`${photoId}-${index}`}
                transition={200}
              />
            );
          }}
        />
      )}
      <View style={styles.dots}>
        {media.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
