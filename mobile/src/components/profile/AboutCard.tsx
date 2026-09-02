import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';

export function AboutCard() {
  return (
    <View style={styles.card}>
      <Text style={typography.aboutTitle}>Sobre o Jardim da Olívia</Text>
      <Text style={typography.aboutText}>
        Um espaço mágico para celebrar o primeiro ano da Olívia. Compartilhe fotos no
        jardim, deixe reações carinhosas e grave vídeos secretos que só ela verá quando
        fizer 10 anos — como sementes plantadas hoje para florescer no futuro.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadows.soft,
  },
});
