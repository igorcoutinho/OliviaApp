import { Alert, ScrollView, StyleSheet, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Screen, Button } from '../../components/ui';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import {
  ProfileCard,
  ProfileStatsCard,
  AboutCard,
  LogoutButton,
} from '../../components/profile';
import { useProfileQuery, useUploadAvatarMutation, useRemoveAvatarMutation } from '../../hooks/useProfile';
import { useLogoutMutation } from '../../hooks/useAuthMutations';
import { useSession } from '../../providers/SessionProvider';
import { ApiError } from '../../api';
import { colors, spacing, typography } from '../../theme';

export function ProfileScreen() {
  const { data, isLoading, isError, error, refetch, isFetching } = useProfileQuery();
  const uploadAvatar = useUploadAvatarMutation();
  const removeAvatar = useRemoveAvatarMutation();
  const logout = useLogoutMutation();
  const { signOut } = useSession();

  const pickAvatar = async (fromCamera: boolean) => {
    const perm = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          quality: 0.6,
          allowsEditing: true,
          aspect: [1, 1],
          exif: false,
        })
      : await ImagePicker.launchImageLibraryAsync({
          quality: 0.6,
          allowsEditing: true,
          aspect: [1, 1],
          exif: false,
          mediaTypes: ['images'],
        });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      uploadAvatar.mutate({
        uri: asset.uri,
        mimeType: asset.mimeType ?? 'image/jpeg',
        fileName: asset.fileName ?? `avatar-${Date.now()}.jpg`,
      });
    }
  };

  const handleAvatarPress = () => {
    const hasAvatar = !!data?.user.avatar_url;
    const options: { text: string; onPress?: () => void; style?: 'cancel' | 'destructive' }[] = [
      { text: 'Tirar foto', onPress: () => pickAvatar(true) },
      { text: 'Escolher da galeria', onPress: () => pickAvatar(false) },
    ];

    if (hasAvatar) {
      options.push({
        text: 'Remover foto',
        style: 'destructive',
        onPress: () => removeAvatar.mutate(),
      });
    }

    options.push({ text: 'Cancelar', style: 'cancel' });

    Alert.alert('Foto de perfil', 'Como você quer atualizar sua foto?', options);
  };

  if (isLoading || (isFetching && !data)) {
    return <Screen loading loadingMessage="Carregando seu perfil..." />;
  }

  if (isError || !data) {
    const status = error instanceof ApiError ? error.status : undefined;
    if (status === 401 || status === 404) {
      return <Screen loading loadingMessage="Sessão expirada..." />;
    }

    return (
      <Screen>
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Não foi possível carregar o perfil</Text>
          <Text style={styles.errorText}>
            {error instanceof ApiError && error.status && error.status >= 500
              ? 'Tivemos um problema no servidor. Tente de novo em instantes.'
              : error instanceof Error
                ? error.message
                : 'Tente novamente'}
          </Text>
          <Button label="Tentar de novo" onPress={() => refetch()} />
          <Button label="Sair e entrar de novo" variant="ghost" onPress={() => signOut()} />
        </View>
      </Screen>
    );
  }

  const { user, stats } = data;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Meu Perfil"
          subtitle="Suas sementes e contribuições"
        />

        <View style={styles.content}>
          <ProfileCard
            fullName={user.full_name}
            username={user.username}
            userId={user.id}
            avatarUrl={user.avatar_url}
            onAvatarPress={handleAvatarPress}
            avatarLoading={uploadAvatar.isPending || removeAvatar.isPending}
          />

          <ProfileStatsCard stats={stats} />

          <AboutCard />

          <LogoutButton
            onPress={() => logout.mutate()}
            loading={logout.isPending}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: spacing.xxl,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  errorBox: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    gap: spacing.md,
  },
  errorTitle: {
    ...typography.authTitle,
    fontSize: 22,
    color: colors.sageDark,
    textAlign: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.moss,
    textAlign: 'center',
  },
});
