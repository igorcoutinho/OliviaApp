import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSession } from '../providers/SessionProvider';
import { UserProvider } from '../providers/UserProvider';
import { LoadingScreen } from '../components/ui';
import { WelcomeModal } from '../components/welcome/WelcomeModal';
import { useWelcomeModal } from '../hooks/useWelcomeModal';
import { AuthNavigator } from './AuthNavigator';
import { MainStackNavigator } from './MainStackNavigator';
import type { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthenticatedApp() {
  const { user } = useSession();
  const { visible, dismiss } = useWelcomeModal();

  if (!user) return null;

  return (
    <UserProvider user={user}>
      <MainStackNavigator />
      <WelcomeModal visible={visible} onDismiss={dismiss} />
    </UserProvider>
  );
}

export function RootNavigator() {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) return <LoadingScreen message="Abrindo o jardim..." />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={AuthenticatedApp} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
