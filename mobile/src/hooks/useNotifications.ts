import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../api';
import { queryKeys } from '../lib/queryClient';
import { showError } from '../lib/toast';

export function useNotificationsQuery(filter: 'all' | 'unread' = 'all') {
  return useQuery({
    queryKey: [...queryKeys.notifications, filter],
    queryFn: () => notificationsApi.list(filter),
    staleTime: 15_000,
  });
}

export function useUnreadNotificationsCount() {
  return useQuery({
    queryKey: queryKeys.notificationsUnread,
    queryFn: async () => {
      const res = await notificationsApi.unreadCount();
      return res.count;
    },
    staleTime: 15_000,
    refetchInterval: 60_000,
  });
}

export function useMarkNotificationReadMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications });
      qc.invalidateQueries({ queryKey: queryKeys.notificationsUnread });
    },
    onError: (e: Error) => showError(e.message),
  });
}

export function useMarkAllNotificationsReadMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications });
      qc.invalidateQueries({ queryKey: queryKeys.notificationsUnread });
    },
    onError: (e: Error) => showError(e.message),
  });
}
