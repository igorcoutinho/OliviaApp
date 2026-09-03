import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Screen } from '../../components/ui';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import {
  PhotoUploadArea,
  PhotoSourceButtons,
  CaptionField,
  PublishGardenButton,
} from '../../components/photo';
import { useUploadPhotoMutation } from '../../hooks/usePhotos';
import { colors, spacing } from '../../theme';

export function UploadPhotoScreen() {
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [caption, setCaption] = useState('');
  const [picking, setPicking] = useState(false);
  const upload = useUploadPhotoMutation();

  const pickPhoto = async (fromCamera: boolean) => {
    setPicking(true);
    try {
      const perm = fromCamera
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;

      const result = fromCamera
        ? await ImagePicker.launchCameraAsync({
            quality: 0.8,
            allowsEditing: true,
            aspect: [4, 3],
            exif: false,
          })
        : await ImagePicker.launchImageLibraryAsync({
            quality: 0.8,
            allowsEditing: true,
            aspect: [4, 3],
            exif: false,
            mediaTypes: ['images'],
          });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0]);
      }
    } finally {
      setPicking(false);
    }
  };

  const handleUpload = () => {
    if (!photo) return;
    upload.mutate(
      {
        uri: photo.uri,
        caption,
        mimeType: photo.mimeType ?? 'image/jpeg',
        fileName: photo.fileName ?? `photo-${Date.now()}.jpg`,
      },
      {
        onSuccess: () => {
          setPhoto(null);
          setCaption('');
        },
      }
    );
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Plantar um Momento"
          subtitle="Compartilhe uma foto especial"
        />

        <View style={styles.container}>
          <PhotoUploadArea photoUri={photo?.uri} />

          <PhotoSourceButtons
            onCamera={() => pickPhoto(true)}
            onGallery={() => pickPhoto(false)}
            loading={picking}
          />

          <CaptionField
            placeholder="Deixe uma mensagem carinhosa..."
            value={caption}
            onChangeText={setCaption}
          />

          <PublishGardenButton
            onPress={handleUpload}
            loading={upload.isPending}
            disabled={!photo}
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
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
});
