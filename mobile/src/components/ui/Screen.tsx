import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { FloralBackground } from '../layout/FloralBackground';
import { LoadingScreen } from './LoadingScreen';

interface Props {
  children?: ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  style?: ViewStyle;
  floral?: boolean;
}

export function Screen({
  children,
  loading,
  loadingMessage,
  style,
  floral = true,
}: Props) {
  if (loading) return <LoadingScreen message={loadingMessage} floral={floral} />;

  return (
    <View style={[styles.root, style]}>
      {floral ? <FloralBackground /> : null}
      <SafeAreaView style={styles.safe} edges={['top']}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  safe: { flex: 1 },
});
