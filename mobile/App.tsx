import { StatusBar } from 'expo-status-bar';
import { AppProviders } from './src/providers/AppProviders';
import { RootNavigator } from './src/navigation/RootNavigator';
import { LoadingScreen } from './src/components/ui';
import { useAppFonts } from './src/hooks/useAppFonts';
import { API_URL, APP_ENV } from './src/config/env';

if (__DEV__) {
  console.log(`[Festa] APP_ENV=${APP_ENV} | API_URL=${API_URL}`);
}

export default function App() {
  const { loaded, error } = useAppFonts();

  if (!loaded && !error) {
    return <LoadingScreen message="Abrindo o jardim..." />;
  }

  return (
    <AppProviders>
      <StatusBar style="dark" />
      <RootNavigator />
    </AppProviders>
  );
}
