import { StatusBar } from 'expo-status-bar';
import { AppProviders } from './src/providers/AppProviders';
import { RootNavigator } from './src/navigation/RootNavigator';
import { LoadingScreen } from './src/components/ui';
import { useAppFonts } from './src/hooks/useAppFonts';

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
