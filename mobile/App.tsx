import { StatusBar } from 'expo-status-bar';
import { AppProviders } from './src/providers/AppProviders';
import { RootNavigator } from './src/navigation/RootNavigator';
import { LoadingScreen } from './src/components/ui';
import { ForceUpdateModal } from './src/components/version/ForceUpdateModal';
import { useAppFonts } from './src/hooks/useAppFonts';
import { useAppVersionGate } from './src/hooks/useAppVersionGate';
import { useSession } from './src/providers/SessionProvider';
import { API_URL, APP_ENV } from './src/config/env';

if (__DEV__) {
  console.log(`[Festa] APP_ENV=${APP_ENV} | API_URL=${API_URL}`);
}

function AppContent() {
  const { isAuthenticated } = useSession();
  const { initialChecking, blocked, info } = useAppVersionGate({
    sessionKey: isAuthenticated ? 'auth' : 'guest',
  });

  if (initialChecking) {
    return <LoadingScreen message="Abrindo o jardim..." />;
  }

  if (blocked && !isAuthenticated) {
    return (
      <>
        <StatusBar style="dark" />
        <ForceUpdateModal visible info={info} />
      </>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator />
      <ForceUpdateModal visible={blocked} info={info} />
    </>
  );
}

export default function App() {
  const { loaded, error } = useAppFonts();

  if (!loaded && !error) {
    return <LoadingScreen message="Abrindo o jardim..." />;
  }

  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
