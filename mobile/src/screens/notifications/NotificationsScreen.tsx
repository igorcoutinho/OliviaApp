import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen, EmptyState } from '../../components/ui';
import { NotificationRow } from '../../components/notifications/NotificationRow';
import {
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
  useNotificationsQuery,
} from '../../hooks/useNotifications';
import { colors, fonts, spacing } from '../../theme';
import type { MainStackParamList } from '../../types';

type Filter = 'all' | 'unread';

export function NotificationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [filter, setFilter] = useState<Filter>('all');
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useNotificationsQuery(filter);
  const markRead = useMarkNotificationReadMutation();
  const markAllRead = useMarkAllNotificationsReadMutation();

  const items = data?.items ?? [];
  const unreadCount = data?.unreadCount ?? 0;
  const totalCount = data?.totalCount ?? items.length;

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={8}
          onPress={() => navigation.goBack()}
          style={styles.headerSide}
        >
          <Ionicons name="chevron-back" size={22} color={colors.lavender} />
        </Pressable>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>Notificações</Text>
          <Text style={styles.subtitle}>Novidades do Jardim</Text>
        </View>

        <View style={styles.headerSide} />
      </View>

      <View style={styles.filters}>
        <Pressable
          onPress={() => setFilter('all')}
          style={[styles.chip, filter === 'all' && styles.chipActive]}
        >
          <Text style={[styles.chipText, filter === 'all' && styles.chipTextActive]}>Todas</Text>
          <View style={[styles.countBadge, filter === 'all' && styles.countBadgeActive]}>
            <Text style={[styles.countText, filter === 'all' && styles.countTextActive]}>
              {totalCount}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setFilter('unread')}
          style={[styles.chip, filter === 'unread' && styles.chipActive]}
        >
          <Text style={[styles.chipText, filter === 'unread' && styles.chipTextActive]}>
            Não lidas
          </Text>
          <View style={[styles.countBadge, filter === 'unread' && styles.countBadgeActive]}>
            <Text style={[styles.countText, filter === 'unread' && styles.countTextActive]}>
              {unreadCount}
            </Text>
          </View>
        </Pressable>

        {unreadCount > 0 ? (
          <Pressable
            onPress={() => markAllRead.mutate()}
            style={styles.markAll}
            disabled={markAllRead.isPending}
          >
            <Text style={styles.markAllText}>Marcar lidas</Text>
          </Pressable>
        ) : null}
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.lavender} />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerStyle={items.length === 0 ? styles.emptyList : undefined}
          ListEmptyComponent={
            isError ? (
              <EmptyState emoji="😔" title="Erro ao carregar" subtitle={(error as Error).message} />
            ) : (
              <EmptyState
                emoji="🔔"
                title={filter === 'unread' ? 'Nenhuma não lida' : 'Sem notificações'}
                subtitle="Quando alguém interagir com suas fotos, aparece aqui."
              />
            )
          }
          renderItem={({ item }) => (
            <NotificationRow
              item={item}
              onPress={() => {
                if (!item.read) markRead.mutate(item.id);
                if (item.type === 'comment') {
                  navigation.navigate('Comments', { photoId: item.photo.id });
                }
              }}
            />
          )}
        />
      )}
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
  headerSide: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.lavender,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    letterSpacing: 0.5,
    color: '#9b7db8',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.screenLg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.reactionBorder,
    backgroundColor: colors.white,
  },
  chipActive: {
    backgroundColor: colors.lavender,
    borderColor: colors.lavender,
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: '#8c72a8',
  },
  chipTextActive: {
    fontFamily: fonts.bodyBold,
    color: colors.white,
  },
  countBadge: {
    backgroundColor: '#f5f0fa',
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countBadgeActive: {
    backgroundColor: colors.white,
  },
  countText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    color: colors.lavender,
  },
  countTextActive: {
    color: colors.lavender,
  },
  markAll: {
    marginLeft: 'auto',
    paddingVertical: 8,
  },
  markAllText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.lavender,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyList: {
    flexGrow: 1,
  },
});
