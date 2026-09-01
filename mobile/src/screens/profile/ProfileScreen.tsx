import { View, Text, StyleSheet, Image } from 'react-native';
import { Screen, Button } from '../../components/ui';
import { PageHeader } from '../../components/layout/PageHeader';
import { useUser } from '../../providers/UserProvider';
import { useLogoutMutation } from '../../hooks/useAuthMutations';
import { colors, spacing, fontSize, radius, shadows } from '../../theme';

export function ProfileScreen() {
  const user = useUser();
  const logout = useLogoutMutation();

  return (
    <Screen>
      <View style={styles.content}>
        <PageHeader title="Meu Perfil" subtitle="Jardim da Olívia" />

        <View style={styles.card}>
          <Image source={require('../../../assets/olivia.png')} style={styles.avatar} />
          <Text style={styles.name}>{user.full_name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Sobre o app</Text>
          <Text style={styles.infoText}>
            Compartilhe fotos no Jardim da Olívia e grave vídeos privados para ela.
            Os vídeos ficam guardados até o dia em que ela fizer 10 anos 💕
          </Text>
        </View>

        <Button
          label="Sair da conta"
          variant="secondary"
          onPress={() => logout.mutate()}
          loading={logout.isPending}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.md,
    borderBottomLeftRadius: radius.md, borderBottomRightRadius: radius.xl,
    padding: spacing.lg, alignItems: 'center', marginBottom: spacing.md,
    ...shadows.card,
  },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    marginBottom: spacing.md, borderWidth: 3, borderColor: colors.lavenderLight,
  },
  name: { fontSize: fontSize.xl, fontWeight: '600', color: colors.olive },
  username: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.xs },
  infoCard: {
    backgroundColor: colors.lavenderLight,
    borderTopLeftRadius: radius.md, borderTopRightRadius: radius.xl,
    borderBottomLeftRadius: radius.xl, borderBottomRightRadius: radius.md,
    padding: spacing.lg, marginBottom: spacing.lg, ...shadows.soft,
  },
  infoLabel: { fontSize: fontSize.sm, fontWeight: '600', color: colors.olive, marginBottom: spacing.sm },
  infoText: { fontSize: fontSize.md, color: colors.text, lineHeight: 24 },
});
