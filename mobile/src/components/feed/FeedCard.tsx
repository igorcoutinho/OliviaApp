import { useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import type { PhotoFeedItem } from '../../types';
import { colors, radius, spacing, shadows, typography } from '../../theme';
import { FeedCardAuthor } from './FeedCardAuthor';
import { FeedCardActions } from './FeedCardActions';
import { MediaCarousel } from './MediaCarousel';

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
      <FeedCardAuthor
        fullName={item.author.full_name}
        createdAt={item.created_at}
        avatarUrl={item.author.avatar_url}
      />

      <MediaCarousel
        media={media}
        photoId={item.id}
        onIndexChange={setCurrentMediaIndex}
      />

      {item.caption ? (
        <Text style={typography.postCaption}>{item.caption}</Text>
      ) : null}

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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
    ...shadows.soft,
  },
});
