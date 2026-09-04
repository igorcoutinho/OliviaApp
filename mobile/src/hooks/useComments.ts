import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '../api/comments.api';
import { queryKeys } from '../lib/queryClient';
import { showError, showSuccess } from '../lib/toast';

export function useCommentsQuery(photoId: string) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.comments, photoId],
    queryFn: ({ pageParam }) =>
      commentsApi.list(photoId, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!photoId,
  });
}

export function useCreateCommentMutation(photoId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => commentsApi.create(photoId, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.feed });
      qc.invalidateQueries({ queryKey: [...queryKeys.comments, photoId] });
      qc.invalidateQueries({ queryKey: queryKeys.notifications });
      qc.invalidateQueries({ queryKey: queryKeys.notificationsUnread });
    },
    onError: (e: Error) => showError(e.message),
  });
}

export function useDeleteCommentMutation(photoId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => commentsApi.remove(photoId, commentId),
    onSuccess: () => {
      showSuccess('Comentário removido');
      qc.invalidateQueries({ queryKey: queryKeys.feed });
      qc.invalidateQueries({ queryKey: [...queryKeys.comments, photoId] });
    },
    onError: (e: Error) => showError(e.message),
  });
}

export function useVoteCommentMutation(photoId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, vote }: { commentId: string; vote: 1 | -1 }) =>
      commentsApi.vote(photoId, commentId, vote),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.feed });
      qc.invalidateQueries({ queryKey: [...queryKeys.comments, photoId] });
    },
    onError: (e: Error) => showError(e.message),
  });
}
