import { useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import type { PhotoFeedItem } from '../../types';
import { colors, spacing, typography, shadows } from '../../theme';
import { FeedCardAuthor } from './FeedCardAuthor';
import { FeedCardActions } from './FeedCardActions';
import { MediaCarousel } from './MediaCarousel';
import { VideoPlayerModal } from '../video/VideoPlayerModal';

interface Props {
  item: PhotoFeedItem;
  downloading?: boolean;
  deleting?: boolean;
  onAdorePress: () => void;
  onDownloadPress: (url: string) => void;
  onDownloadAllPress?: (urls: string[]) => void;
  onDeletePress?: () => void;
}

export function FeedCard({
  item,
  downloading,
  deleting,
  onAdorePress,
  onDownloadPress,
  onDownloadAllPress,
  onDeletePress,
}: Props) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const media = item.media?.length > 0 ? item.media : [{ type: 'image' as const, url: item.url }];
  const imageUrls = media.filter((m) => m.type === 'image').map((m) => m.url);

  const handleDelete = () => {
    if (!onDeletePress) return;
    Alert.alert(
      'Excluir foto',
      'Tem certeza que quer remover esta foto do jardim? Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: onDeletePress },
      ],
    );
  };

  return (
    <View style={styles.card}>
      {/* Autor */}
      <FeedCardAuthor
        fullName={item.author.full_name}
        createdAt={item.created_at}
        avatarUrl={item.author.avatar_url}
        authorId={item.author.id}
      />

      <View style={styles.mediaBleed}>
        <MediaCarousel
          media={media}
          photoId={item.id}
          onIndexChange={setCurrentMediaIndex}
          onVideoPress={setVideoUrl}
        />
      </View>

      <FeedCardActions
        reactions={item.reactions}
        myReaction={item.myReaction}
        isMine={item.isMine}
        downloading={downloading}
        deleting={deleting}
        multipleImages={imageUrls.length > 1}
        onAdorePress={onAdorePress}
        onDownloadPress={() => {
          const current = media[currentMediaIndex];
          if (current?.type === 'image') onDownloadPress(current.url);
        }}
        onDownloadAllPress={
          imageUrls.length > 1 ? () => onDownloadAllPress?.(imageUrls) : undefined
        }
        onDeletePress={item.isMine ? handleDelete : undefined}
      />

      {item.caption ? (
        <Text style={typography.postCaption}>{item.caption}</Text>
      ) : null}

      {videoUrl ? (
        <VideoPlayerModal
          uri={videoUrl}
          visible={!!videoUrl}
          onClose={() => setVideoUrl(null)}
          title="Vídeo"
        />
      ) : null}
    </View>
  );
}

const H_PAD = spacing.md;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingTop: 16,
    paddingHorizontal: H_PAD,
    paddingBottom: 16,
    gap: 12,
    overflow: 'hidden',
    ...shadows.soft,
  },
  mediaBleed: {
    marginHorizontal: -H_PAD,
  },
});
