import { useRef, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  type ViewToken,
  type LayoutChangeEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import type { PhotoMediaItem } from '../../types';
import { colors } from '../../theme';

const IMAGE_HEIGHT = 390;

interface Props {
  media: PhotoMediaItem[];
  photoId: string;
  onIndexChange?: (index: number) => void;
  onVideoPress?: (url: string) => void;
}

export function MediaCarousel({ media, photoId, onIndexChange, onVideoPress }: Props) {
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
    if (item.type === 'video') {
      return (
        <TouchableOpacity
          style={styles.singleContainer}
          onPress={() => onVideoPress?.(item.url)}
          activeOpacity={0.9}
        >
          <View style={styles.playCircle}>
            <Ionicons name="play" size={24} color="white" style={{ marginLeft: 3 }} />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <Image
        source={{ uri: item.url }}
        style={styles.singleContainer}
        contentFit="cover"
        cachePolicy="memory-disk"
        recyclingKey={`${photoId}-0`}
        transition={200}
      />
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
                <TouchableOpacity
                  style={[styles.slide, styles.videoBg, { width: containerWidth }]}
                  onPress={() => onVideoPress?.(item.url)}
                  activeOpacity={0.9}
                >
                  <View style={styles.playCircle}>
                    <Ionicons name="play" size={24} color="white" style={{ marginLeft: 3 }} />
                  </View>
                </TouchableOpacity>
              );
            }
            return (
              <Image
                source={{ uri: item.url }}
                style={[styles.slide, { width: containerWidth }]}
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
  singleContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: colors.creamMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    height: IMAGE_HEIGHT,
    backgroundColor: colors.creamMid,
    overflow: 'hidden',
  },
  videoBg: {
    backgroundColor: '#120f1a',
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
