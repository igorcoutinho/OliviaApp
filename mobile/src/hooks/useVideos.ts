import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { videosApi } from '../api';
import { queryKeys } from '../lib/queryClient';
import { showError, showSuccess } from '../lib/toast';

export function useMyVideosQuery() {
  return useQuery({
    queryKey: queryKeys.myVideos,
    queryFn: videosApi.getMine,
  });
}

export function useUploadVideoMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ uri, message }: { uri: string; message: string }) =>
      videosApi.upload(uri, message),
    onSuccess: (data) => {
      showSuccess(data.message || 'Vídeo guardado com carinho! 💕');
      qc.invalidateQueries({ queryKey: queryKeys.myVideos });
    },
    onError: (e: Error) => showError(e.message),
  });
}
