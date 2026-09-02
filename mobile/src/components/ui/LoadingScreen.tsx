import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../theme';

interface Props {
  message?: string;
}

export function LoadingScreen({ message = 'Carregando...' }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.emoji}>🌸</Text>
      <ActivityIndicator size="large" color={colors.sageDark} />
      <Text style={styles.text}>{message}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  emoji: { fontSize: 48 },
  text: { ...typography.body, color: colors.moss },
});
