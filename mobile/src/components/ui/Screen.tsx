import { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { LoadingScreen } from './LoadingScreen';

interface Props {
  children?: ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  style?: ViewStyle;
}

export function Screen({ children, loading, loadingMessage }: Props) {
  if (loading) return <LoadingScreen message={loadingMessage} />;
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
});
