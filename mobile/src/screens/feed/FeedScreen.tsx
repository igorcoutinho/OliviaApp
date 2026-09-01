import { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity,
  RefreshControl, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, EmptyState } from '../../components/ui';
import { PageHeader } from '../../components/layout/PageHeader';
import { useUser } from '../../providers/UserProvider';
import { useFeedQuery, useReactMutation, useRemoveReactionMutation } from '../../hooks/usePhotos';
import { colors, spacing, fontSize, radius, REACTIONS, shadows } from '../../theme';

function formatDate(d: string) {
  return new Date(d).toLocaleString('pt-BR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

export function FeedScreen() {
  const user = useUser();
  const { data, isLoading, isRefetching, refetch, isError, error } = useFeedQuery();
  const react = useReactMutation();
  const removeReaction = useRemoveReactionMutation();
  const [reactionModal, setReactionModal] = useState<string | null>(null);

  if (isLoading) return <Screen loading />;

  return (
    <Screen>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Olá, {user.full_name.split(' ')[0]} 🌸</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
      </View>

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.sageDark} />
        }
        contentContainerStyle={styles.list}
        ListHeaderComponent={<PageHeader title="Jardim da Olívia" subtitle="Momentos da festa · 1 ano" />}
        ListEmptyComponent={
          isError ? (
            <EmptyState emoji="😔" title="Erro ao carregar" subtitle={(error as Error).message} />
          ) : (
            <EmptyState emoji="🌷" title="Nenhuma foto ainda" subtitle="Seja o primeiro a compartilhar!" />
          )
        }
        renderItem={({ item, index }) => (
          <View style={[styles.card, index % 2 === 0 ? styles.cardEven : styles.cardOdd]}>
            <View style={styles.cardHeader}>
              <View style={styles.authorWrap}>
                <View style={styles.authorDot} />
                <Text style={styles.author}>{item.author.full_name}</Text>
              </View>
              <Text style={styles.date}>{formatDate(item.created_at)}</Text>
            </View>
            <Image source={{ uri: item.url }} style={styles.image} />
            {item.caption ? <Text style={styles.caption}>{item.caption}</Text> : null}
            <View style={styles.reactions}>
              {item.reactions.map((reaction) => {
                const isMe = reaction.user_id === user.id;
                const name = isMe
                  ? 'Você'
                  : reaction.full_name?.split(' ')[0] ?? reaction.username;
                return (
                  <TouchableOpacity
                    key={reaction.user_id}
                    style={[styles.reactionChip, isMe && styles.reactionChipMine]}
                    onPress={() => isMe && removeReaction.mutate(item.id)}
                    disabled={!isMe}
                  >
                    <Text style={styles.reactionChipText}>
                      {name} {reaction.emoji}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {!item.myReaction && (
                <TouchableOpacity onPress={() => setReactionModal(item.id)} style={styles.addBtn}>
                  <Ionicons name="add-circle-outline" size={22} color={colors.sage} />
                </TouchableOpacity>
              )}
              {item.myReaction && (
                <TouchableOpacity
                  onPress={() => setReactionModal(item.id)}
                  style={styles.changeBtn}
                >
                  <Text style={styles.changeBtnText}>Trocar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />

      <Modal visible={!!reactionModal} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setReactionModal(null)}>
          <View style={styles.picker}>
            <Text style={styles.pickerTitle}>Reagir</Text>
            <View style={styles.pickerGrid}>
              {REACTIONS.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={styles.pickerItem}
                  onPress={() => {
                    if (reactionModal) react.mutate({ photoId: reactionModal, emoji });
                    setReactionModal(null);
                  }}
                >
                  <Text style={styles.pickerEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  greeting: { fontSize: fontSize.lg, fontWeight: '600', color: colors.olive },
  username: { fontSize: fontSize.xs, color: colors.textSecondary },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardEven: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.sm,
    borderBottomLeftRadius: radius.sm,
    borderBottomRightRadius: radius.xl,
  },
  cardOdd: {
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.sm,
    marginLeft: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.md, paddingBottom: spacing.sm,
  },
  authorWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  authorDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.sage },
  author: { fontWeight: '600', color: colors.olive },
  date: { fontSize: fontSize.xs, color: colors.textMuted },
  image: { width: '100%', height: 280 },
  caption: { padding: spacing.md, paddingTop: spacing.sm, color: colors.text, fontSize: fontSize.md, lineHeight: 22 },
  reactions: { flexDirection: 'row', flexWrap: 'wrap', padding: spacing.md, gap: spacing.sm, alignItems: 'center' },
  reactionChip: {
    backgroundColor: colors.pinkSoft,
    borderRadius: radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  reactionChipMine: {
    backgroundColor: colors.lavenderLight,
    borderWidth: 1,
    borderColor: colors.lavender,
  },
  reactionChipText: { fontSize: fontSize.sm, color: colors.olive, fontWeight: '500' },
  changeBtn: { paddingHorizontal: spacing.xs },
  changeBtnText: { fontSize: fontSize.xs, color: colors.sage, fontWeight: '600' },
  addBtn: { padding: spacing.xs },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  picker: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
    padding: spacing.lg, paddingBottom: spacing.xxl,
  },
  pickerTitle: { fontSize: fontSize.lg, fontWeight: '600', color: colors.olive, textAlign: 'center', marginBottom: spacing.md },
  pickerGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.md },
  pickerItem: {
    padding: spacing.sm, backgroundColor: colors.pinkSoft,
    borderRadius: radius.lg, minWidth: 52, alignItems: 'center',
  },
  pickerEmoji: { fontSize: 32 },
});
