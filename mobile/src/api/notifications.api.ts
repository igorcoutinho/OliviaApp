import { apiClient } from './client';

export interface NotificationItem {
  id: string;
  type: 'reaction' | 'save' | 'comment';
  emoji: string | null;
  message: string;
  created_at: string;
  read: boolean;
  actor: {
    id: string;
    full_name: string;
    username: string;
    avatar_url: string | null;
  };
  photo: {
    id: string;
    thumbnail_url: string | null;
  };
}

export interface NotificationsPage {
  items: NotificationItem[];
  unreadCount: number;
  totalCount: number;
}

export const notificationsApi = {
  list: (filter: 'all' | 'unread' = 'all') =>
    apiClient<NotificationsPage>(
      `/api/notifications${filter === 'unread' ? '?filter=unread' : ''}`,
    ),

  unreadCount: () => apiClient<{ count: number }>('/api/notifications/unread-count'),

  markRead: (id: string) =>
    apiClient(`/api/notifications/${id}/read`, { method: 'POST' }),

  markAllRead: () =>
    apiClient('/api/notifications/read-all', { method: 'POST' }),
};
