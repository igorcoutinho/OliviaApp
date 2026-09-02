import { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Screen, EmptyState } from '../../components/ui';
import {
  FeedHeader,
  GreetingBanner,
  FeedCard,
  ReactionPickerModal,
} from '../../components/feed';
import { useUser } from '../../providers/UserProvider';
import { useFeedQuery, useReactMutation, useRemoveReactionMutation } from '../../hooks/usePhotos';
import { colors, spacing } from '../../theme';

export function FeedScreen() {
  const user = useUser();
  const { data, isLoading, isRefetching, refetch, isError, error } = useFeedQuery();
  const react = useReactMutation();
  const removeReaction = useRemoveReactionMutation();
  const [reactionModal, setReactionModal] = useState<string | null>(null);

  if (isLoading) return <Screen loading />;

  const activePhoto = data?.find((p) => p.id === reactionModal);

  return (
    <Screen>
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.sage} />
        }
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <>
            <FeedHeader />
            <GreetingBanner firstName={user.full_name.split(' ')[0]} />
          </>
        }
        ListEmptyComponent={
          isError ? (
            <EmptyState emoji="😔" title="Erro ao carregar" subtitle={(error as Error).message} />
          ) : (
            <EmptyState emoji="🌷" title="Nenhuma foto ainda" subtitle="Seja o primeiro a compartilhar!" />
          )
        }
        renderItem={({ item }) => (
          <FeedCard
            item={item}
            onAdorePress={() => setReactionModal(item.id)}
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
});
