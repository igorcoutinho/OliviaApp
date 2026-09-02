import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '../../theme';

interface Props {
  title: string;
  subtitle: string;
}

export function ScreenHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={typography.h1}>{title}</Text>
      <Text style={typography.brandSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.screenLg,
  },
});
