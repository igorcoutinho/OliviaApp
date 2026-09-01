import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { photosApi } from '../api';
import { queryKeys } from '../lib/queryClient';
import { showError, showSuccess } from '../lib/toast';

export function useFeedQuery() {
  return useQuery({
    queryKey: queryKeys.feed,
    queryFn: photosApi.getFeed,
  });
}

export function useReactMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ photoId, emoji }: { photoId: string; emoji: string }) =>
      photosApi.react(photoId, emoji),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.feed }),
    onError: (e: Error) => showError(e.message),
  });
}

export function useRemoveReactionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (photoId: string) => photosApi.removeReaction(photoId),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.feed }),
    onError: (e: Error) => showError(e.message),
  });
}

import type { PhotoUploadParams } from '../api/photos.api';

export function useUploadPhotoMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params: PhotoUploadParams) => photosApi.upload(params),
    onSuccess: (data) => {
      showSuccess(data.message || 'Foto publicada no jardim! 🌸');
      qc.invalidateQueries({ queryKey: queryKeys.feed });
    },
    onError: (e: Error) => showError(e.message),
  });
}
