import { Alert } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import type { PhotoFeedItem } from '../../types';
import { colors, radius, spacing, shadows, typography } from '../../theme';
import { FeedCardAuthor } from './FeedCardAuthor';
import { FeedCardActions } from './FeedCardActions';

interface Props {
  item: PhotoFeedItem;
  downloading?: boolean;
  deleting?: boolean;
  onAdorePress: () => void;
  onDownloadPress: () => void;
  onDeletePress?: () => void;
}

export function FeedCard({
  item,
  downloading,
  deleting,
  onAdorePress,
  onDownloadPress,
  onDeletePress,
}: Props) {
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
      <FeedCardAuthor fullName={item.author.full_name} createdAt={item.created_at} />

      <Image source={{ uri: item.url }} style={styles.image} />

      {item.caption ? (
        <Text style={typography.postCaption}>{item.caption}</Text>
      ) : null}

      <FeedCardActions
        reactions={item.reactions}
        myReaction={item.myReaction}
        isMine={item.isMine}
        downloading={downloading}
        deleting={deleting}
        onAdorePress={onAdorePress}
        onDownloadPress={onDownloadPress}
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
  image: {
    width: '100%',
    height: 240,
    borderRadius: radius.md,
    backgroundColor: colors.creamMid,
  },
});
