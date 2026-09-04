import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export const queryKeys = {
  feed: ['feed'] as const,
  myVideos: ['myVideos'] as const,
  me: ['me'] as const,
  profile: ['profile'] as const,
  notifications: ['notifications'] as const,
  notificationsUnread: ['notifications', 'unread-count'] as const,
};
