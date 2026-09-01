import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { queryClient } from '../lib/queryClient';
import { SessionProvider } from './SessionProvider';
import { toastConfig } from '../components/ui/ToastConfig';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SafeAreaProvider>
          {children}
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
