import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { useSession } from '../providers/SessionProvider';
import { showError, showSuccess, showInfo } from '../lib/toast';

export function useLoginMutation() {
  const { setUser } = useSession();
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.login(username, password),
    onSuccess: (data) => {
      setUser(data.user);
      showSuccess(`Bem-vinda, ${data.user.full_name.split(' ')[0]}! 🌸`);
    },
    onError: (e: Error) => showError(e.message),
  });
}

export function useRegisterMutation() {
  const { setUser } = useSession();
  return useMutation({
    mutationFn: ({ fullName, password }: { fullName: string; password: string }) =>
      authApi.register(fullName, password),
    onSuccess: (data) => {
      setUser(data.user);
      showInfo(`Seu usuário: @${data.user.username} — guarde para entrar depois!`);
    },
    onError: (e: Error) => showError(e.message),
  });
}

export function useLogoutMutation() {
  const { signOut } = useSession();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: async () => {
      await signOut();
      showSuccess('Até logo! 🌸');
    },
    onError: (e: Error) => showError(e.message),
  });
}
