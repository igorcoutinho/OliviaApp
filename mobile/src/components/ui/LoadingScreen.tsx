import { Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../theme';
import { FloralBackground } from '../layout/FloralBackground';

interface Props {
  message?: string;
  floral?: boolean;
}

export function LoadingScreen({ message = 'Carregando...', floral = true }: Props) {
  return (
    <View style={styles.root}>
      {floral ? <FloralBackground /> : null}
      <SafeAreaView style={styles.container}>
        <Text style={styles.emoji}>🌸</Text>
        <ActivityIndicator size="large" color={colors.sageDark} />
        <Text style={styles.text}>{message}</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  emoji: { fontSize: 48 },
  text: { ...typography.body, color: colors.moss },
});
