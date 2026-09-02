import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Screen } from '../../components/ui';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import {
  ProfileCard,
  ProfileStatsCard,
  AboutCard,
  LogoutButton,
} from '../../components/profile';
import { useProfileQuery, useUploadAvatarMutation, useRemoveAvatarMutation } from '../../hooks/useProfile';
import { useLogoutMutation } from '../../hooks/useAuthMutations';
import { colors, spacing } from '../../theme';

export function ProfileScreen() {
  const { data, isLoading } = useProfileQuery();
  const uploadAvatar = useUploadAvatarMutation();
  const removeAvatar = useRemoveAvatarMutation();
  const logout = useLogoutMutation();

  const pickAvatar = async (fromCamera: boolean) => {
    const perm = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          quality: 0.8,
          allowsEditing: true,
          aspect: [1, 1],
          exif: false,
        })
      : await ImagePicker.launchImageLibraryAsync({
          quality: 0.8,
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

  if (isLoading || !data) {
    return <Screen loading loadingMessage="Carregando seu perfil..." />;
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
});
