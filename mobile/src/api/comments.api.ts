import { apiClient } from './client';

export interface CommentAuthor {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string | null;
}

export interface CommentItem {
  id: string;
  body: string;
  created_at: string;
  likeCount: number;
  dislikeCount: number;
  myVote: 1 | -1 | null;
  isMine: boolean;
  isMostLiked: boolean;
  author: CommentAuthor;
}

export interface CommentsPage {
  items: CommentItem[];
  totalCount: number;
  nextCursor: string | null;
  hasMore: boolean;
  post: {
    id: string;
    caption: string;
    authorName: string;
    thumbnailUrl: string | null;
  };
}

export const commentsApi = {
  list: (photoId: string, cursor?: string, limit = 20) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (cursor) params.set('cursor', cursor);
    return apiClient<CommentsPage>(`/api/photos/${photoId}/comments?${params.toString()}`);
  },

  create: (photoId: string, body: string) =>
    apiClient<CommentItem>(`/api/photos/${photoId}/comments`, {
      method: 'POST',
      data: { body },
    }),

  remove: (photoId: string, commentId: string) =>
    apiClient(`/api/photos/${photoId}/comments/${commentId}`, { method: 'DELETE' }),

  vote: (photoId: string, commentId: string, vote: 1 | -1) =>
    apiClient<{ myVote: 1 | -1 | null }>(
      `/api/photos/${photoId}/comments/${commentId}/vote`,
      { method: 'POST', data: { vote } },
    ),
};
