import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen, EmptyState } from '../../components/ui';
import { CommentRow } from '../../components/comments/CommentRow';
import { KEYBOARD_DONE_ACCESSORY_ID } from '../../components/ui/KeyboardDoneAccessory';
import {
  useCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useVoteCommentMutation,
} from '../../hooks/useComments';
import { useUser } from '../../providers/UserProvider';
import { colors, fonts, spacing } from '../../theme';
import type { MainStackParamList } from '../../types';

type Route = NativeStackScreenProps<MainStackParamList, 'Comments'>['route'];

export function CommentsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute<Route>();
  const { photoId } = route.params;
  const user = useUser();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommentsQuery(photoId);
  const createComment = useCreateCommentMutation(photoId);
  const deleteComment = useDeleteCommentMutation(photoId);
  const voteComment = useVoteCommentMutation(photoId);
  const [draft, setDraft] = useState('');

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;
  const post = data?.pages[0]?.post;

  const handleSend = () => {
    const body = draft.trim();
    if (!body || createComment.isPending) return;
    createComment.mutate(body, { onSuccess: () => setDraft('') });
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={18} color={colors.lavender} />
        </Pressable>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Comentários</Text>
          <Text style={styles.subtitle}>
            {totalCount === 1 ? '1 comentário' : `${totalCount} comentários`}
          </Text>
        </View>
        <View style={styles.headerSide} />
      </View>

      {post ? (
        <View style={styles.postPreview}>
          {post.thumbnailUrl ? (
            <Image
              source={{ uri: post.thumbnailUrl }}
              style={styles.thumb}
              contentFit="cover"
            />
          ) : (
            <View style={[styles.thumb, styles.thumbEmpty]} />
          )}
          <View style={styles.previewText}>
            <Text style={styles.previewAuthor}>{post.authorName}</Text>
            <Text style={styles.previewCaption} numberOfLines={2}>
              {post.caption || 'Sem legenda'}
            </Text>
          </View>
        </View>
      ) : null}

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}
      >
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.lavender} />
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={refetch}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.4}
            contentContainerStyle={items.length === 0 ? styles.emptyList : undefined}
            ListEmptyComponent={
              isError ? (
                <EmptyState emoji="😔" title="Erro ao carregar" subtitle={(error as Error).message} />
              ) : (
                <EmptyState
                  emoji="💬"
                  title="Nenhum comentário"
                  subtitle="Seja a primeira pessoa a deixar um carinho."
                />
              )
            }
            ListFooterComponent={
              isFetchingNextPage ? (
                <View style={styles.loadingMore}>
                  <ActivityIndicator color={colors.lavender} />
                </View>
              ) : null
            }
            renderItem={({ item }) => (
              <CommentRow
                item={item}
                onLike={() => voteComment.mutate({ commentId: item.id, vote: 1 })}
                onDislike={() => voteComment.mutate({ commentId: item.id, vote: -1 })}
                onDelete={() => deleteComment.mutate(item.id)}
              />
            )}
          />
        )}

        <View style={styles.composer}>
          <View style={styles.avatar}>
            {user.avatar_url ? (
              <Image
                source={{ uri: user.avatar_url }}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
              />
            ) : (
              <Ionicons name="person" size={14} color={colors.lavender} />
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Adicionar comentário..."
            placeholderTextColor="#9b7db8"
            value={draft}
            onChangeText={setDraft}
            multiline
            maxLength={1000}
            inputAccessoryViewID={KEYBOARD_DONE_ACCESSORY_ID}
          />
          <Pressable
            onPress={handleSend}
            hitSlop={8}
            disabled={createComment.isPending || !draft.trim()}
          >
            {createComment.isPending ? (
              <ActivityIndicator size="small" color={colors.lavender} />
            ) : (
              <Ionicons
                name="send"
                size={18}
                color={draft.trim() ? colors.lavender : '#c8b4d7'}
              />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenLg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.reactionBorder,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6B4D8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  headerSide: {
    width: 34,
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.lavender,
  },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 0.5,
    color: '#9b7db8',
    textTransform: 'uppercase',
  },
  postPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.reactionBorder,
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f2edf8',
  },
  thumbEmpty: {
    backgroundColor: '#efe8f6',
  },
  previewText: {
    flex: 1,
    gap: 4,
  },
  previewAuthor: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: '#6b4d8a',
  },
  previewCaption: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: '#8c72a8',
  },
  body: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyList: {
    flexGrow: 1,
  },
  loadingMore: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.reactionBorder,
    backgroundColor: colors.white,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f2edf8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    color: '#6b4d8a',
    maxHeight: 90,
    paddingVertical: 6,
  },
});
