import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { photosApi } from '../api';
import type { PhotoUploadParams } from '../api/photos.api';
import { queryKeys } from '../lib/queryClient';
import { showError, showSuccess } from '../lib/toast';
import { savePhotoToFestaAlbum } from '../lib/savePhotoToAlbum';

export function useFeedQuery() {
  return useInfiniteQuery({
    queryKey: queryKeys.feed,
    queryFn: ({ pageParam }) => photosApi.getFeed(pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60 * 5,
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

export function useUploadPhotoMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params: PhotoUploadParams) => photosApi.upload(params),
    onSuccess: (data) => {
      showSuccess(data.message || 'Foto publicada no jardim! 🌸');
      qc.invalidateQueries({ queryKey: queryKeys.feed });
      qc.invalidateQueries({ queryKey: queryKeys.profile });
    },
    onError: (e: Error) => showError(e.message),
  });
}

export function useDeletePhotoMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (photoId: string) => photosApi.delete(photoId),
    onSuccess: (data) => {
      showSuccess(data.message || 'Foto removida');
      qc.invalidateQueries({ queryKey: queryKeys.feed });
      qc.invalidateQueries({ queryKey: queryKeys.profile });
    },
    onError: (e: Error) => showError(e.message),
  });
}

export function useSavePhotoMutation() {
  return useMutation({
    mutationFn: ({ url, photoId }: { url: string; photoId: string }) =>
      savePhotoToFestaAlbum(url, photoId),
    onSuccess: (data) => {
      showSuccess(`Salva no álbum “${data.albumName}”`);
    },
    onError: (e: Error) => showError(e.message),
  });
}
