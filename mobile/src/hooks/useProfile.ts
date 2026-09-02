import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api';
import { queryKeys } from '../lib/queryClient';
import { useSession } from '../providers/SessionProvider';
import { getToken, saveSession } from '../storage/authStorage';
import { showError, showSuccess } from '../lib/toast';

export function useProfileQuery() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: profileApi.get,
  });
}

export function useUploadAvatarMutation() {
  const qc = useQueryClient();
  const { setUser } = useSession();

  return useMutation({
    mutationFn: ({ uri, mimeType, fileName }: { uri: string; mimeType?: string; fileName?: string }) =>
      profileApi.uploadAvatar(uri, mimeType, fileName),
    onSuccess: async (data) => {
      setUser(data.user);
      const token = await getToken();
      if (token) await saveSession(token, data.user);
      qc.setQueryData(queryKeys.profile, (prev: Awaited<ReturnType<typeof profileApi.get>> | undefined) =>
        prev ? { ...prev, user: data.user } : prev
      );
      showSuccess(data.message || 'Foto atualizada! 🌸');
    },
    onError: (e: Error) => showError(e.message),
  });
}

export function useRemoveAvatarMutation() {
  const qc = useQueryClient();
  const { setUser } = useSession();

  return useMutation({
    mutationFn: profileApi.removeAvatar,
    onSuccess: async (data) => {
      setUser(data.user);
      const token = await getToken();
      if (token) await saveSession(token, data.user);
      qc.setQueryData(queryKeys.profile, (prev: Awaited<ReturnType<typeof profileApi.get>> | undefined) =>
        prev ? { ...prev, user: data.user } : prev
      );
      showSuccess('Foto removida');
    },
    onError: (e: Error) => showError(e.message),
  });
}
