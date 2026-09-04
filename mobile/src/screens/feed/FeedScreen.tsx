import { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Screen, EmptyState } from '../../components/ui';
import {
  FeedHeader,
  FeedCard,
  FeedCardSkeleton,
  ReactionPickerModal,
} from '../../components/feed';
import {
  useFeedQuery,
  useReactMutation,
  useRemoveReactionMutation,
  useDeletePhotoMutation,
  useSavePhotoMutation,
} from '../../hooks/usePhotos';
import { colors, spacing } from '../../theme';
import type { PhotoFeedItem } from '../../types';

export function FeedScreen() {
  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeedQuery();
  const react = useReactMutation();
  const removeReaction = useRemoveReactionMutation();
  const deletePhoto = useDeletePhotoMutation();
  const savePhoto = useSavePhotoMutation();
  const [reactionModal, setReactionModal] = useState<string | null>(null);
  const [busyPhotoId, setBusyPhotoId] = useState<string | null>(null);

  const items = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data],
  );

  const activePhoto = items.find((p) => p.id === reactionModal);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.skeletonList}>
          <FeedHeader />
          {[1, 2, 3].map((k) => (
            <View key={k} style={styles.skeletonWrap}>
              <FeedCardSkeleton />
            </View>
          ))}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.sage} />
        }
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={<FeedHeader />}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              size="small"
              color={colors.lavender}
              style={styles.loadingMore}
            />
          ) : null
        }
        ListEmptyComponent={
          isError ? (
            <EmptyState emoji="😔" title="Erro ao carregar" subtitle={(error as Error).message} />
          ) : (
            <EmptyState emoji="🌷" title="Nenhuma foto ainda" subtitle="Seja o primeiro a compartilhar!" />
          )
        }
        renderItem={({ item }: { item: PhotoFeedItem }) => (
          <FeedCard
            item={item}
            downloading={savePhoto.isPending && busyPhotoId === item.id}
            deleting={deletePhoto.isPending && busyPhotoId === item.id}
            onAdorePress={() => setReactionModal(item.id)}
            onDownloadPress={(url) => {
              setBusyPhotoId(item.id);
              savePhoto.mutate(
                { url, photoId: item.id },
                { onSettled: () => setBusyPhotoId(null) },
              );
            }}
            onDownloadAllPress={(urls) => {
              setBusyPhotoId(item.id);
              const downloadSequentially = async () => {
                for (let i = 0; i < urls.length; i++) {
                  await savePhoto.mutateAsync({ url: urls[i], photoId: `${item.id}-${i}` });
                }
              };
              downloadSequentially().finally(() => setBusyPhotoId(null));
            }}
            onDeletePress={
              item.isMine
                ? () => {
                    setBusyPhotoId(item.id);
                    deletePhoto.mutate(item.id, {
                      onSettled: () => setBusyPhotoId(null),
                    });
                  }
                : undefined
            }
          />
        )}
      />

      <ReactionPickerModal
        visible={!!reactionModal}
        onClose={() => setReactionModal(null)}
        onSelect={(emoji) => {
          if (!reactionModal) return;
          if (activePhoto?.myReaction === emoji) {
            removeReaction.mutate(reactionModal);
          } else {
            react.mutate({ photoId: reactionModal, emoji });
          }
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  separator: {
    height: spacing.md,
  },
  loadingMore: {
    paddingVertical: spacing.lg,
  },
  skeletonList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  skeletonWrap: {
    gap: spacing.md,
  },
});
