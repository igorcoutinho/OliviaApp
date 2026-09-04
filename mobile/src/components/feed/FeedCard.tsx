import { useState } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { PhotoFeedItem, MainStackParamList } from '../../types';
import { spacing, typography } from '../../theme';
import { FeedCardAuthor } from './FeedCardAuthor';
import { FeedCardActions } from './FeedCardActions';
import { MediaCarousel } from './MediaCarousel';
import { FeedCommentsPreview } from '../comments/FeedCommentsPreview';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useVoteCommentMutation,
} from '../../hooks/useComments';
import { useUser } from '../../providers/UserProvider';
import type { CommentItem } from '../../api/comments.api';

interface Props {
  item: PhotoFeedItem;
  downloading?: boolean;
  deleting?: boolean;
  onAdorePress: () => void;
  onDownloadPress: (url: string) => void;
  onDownloadAllPress?: (urls: string[]) => void;
  onDeletePress?: () => void;
}

function toPreviewComment(
  top: NonNullable<PhotoFeedItem['topComment']>,
  myUserId: string,
): CommentItem {
  return {
    id: top.id,
    body: top.body,
    created_at: '',
    likeCount: top.likeCount,
    dislikeCount: 0,
    myVote: top.myVote,
    isMine: top.author.id === myUserId,
    isMostLiked: false,
    author: top.author,
  };
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
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const user = useUser();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const createComment = useCreateCommentMutation(item.id);
  const deleteComment = useDeleteCommentMutation(item.id);
  const voteComment = useVoteCommentMutation(item.id);

  const media = item.media?.length > 0 ? item.media : [{ type: 'image' as const, url: item.url }];
  const imageUrls = media.filter((m) => m.type === 'image').map((m) => m.url);
  const commentsCount = item.commentsCount ?? 0;
  const topComment = item.topComment
    ? toPreviewComment(item.topComment, user.id)
    : null;

  const openComments = () => {
    const parent = navigation.getParent();
    if (parent) parent.navigate('Comments', { photoId: item.id });
    else navigation.navigate('Comments', { photoId: item.id });
  };

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
        authorId={item.author.id}
      />

      <View style={styles.mediaBleed}>
        <MediaCarousel
          media={media}
          photoId={item.id}
          onIndexChange={setCurrentMediaIndex}
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

      <FeedCommentsPreview
        topComment={topComment}
        commentsCount={commentsCount}
        myAvatarUrl={user.avatar_url}
        submitting={createComment.isPending}
        onOpenAll={openComments}
        onSubmit={(body) => createComment.mutate(body)}
        onLike={(commentId) => voteComment.mutate({ commentId, vote: 1 })}
        onDislike={(commentId) => voteComment.mutate({ commentId, vote: -1 })}
        onDelete={(commentId) => deleteComment.mutate(commentId)}
      />
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
  mediaBleed: {
    marginHorizontal: -H_PAD,
  },
});
