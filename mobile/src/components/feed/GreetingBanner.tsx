import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface Props {
  firstName: string;
}

export function GreetingBanner({ firstName }: Props) {
  return (
    <View style={styles.container}>
      <Text style={typography.greeting}>
        Olá, {firstName} 🌸{' '}
        <Text style={typography.greetingSub}>Bem-vinda ao jardim secreto!</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingHorizontal: spacing.screenLg,
    paddingBottom: spacing.sm,
  },
});
