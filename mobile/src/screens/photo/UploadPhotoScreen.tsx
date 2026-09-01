import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Screen, Button, Input } from '../../components/ui';
import { PageHeader } from '../../components/layout/PageHeader';
import { useUploadPhotoMutation } from '../../hooks/usePhotos';
import { colors, spacing, radius, fontSize, shadows } from '../../theme';

export function UploadPhotoScreen() {
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [caption, setCaption] = useState('');
  const upload = useUploadPhotoMutation();

  const pickPhoto = async (fromCamera: boolean) => {
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
      <ScrollView contentContainerStyle={styles.content}>
        <PageHeader title="Compartilhar" subtitle="Plantar um momento no jardim" />

        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderEmoji}>📸</Text>
            <Text style={styles.placeholderText}>Escolha ou tire uma foto</Text>
          </View>
        )}

        <View style={styles.row}>
          <TouchableOpacity style={styles.pickBtn} onPress={() => pickPhoto(true)}>
            <Text style={styles.pickBtnText}>📷  Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pickBtn, styles.pickBtnAlt]} onPress={() => pickPhoto(false)}>
            <Text style={styles.pickBtnText}>🖼  Galeria</Text>
          </TouchableOpacity>
        </View>

        <Input placeholder="Legenda (opcional)" value={caption} onChangeText={setCaption} />

        {photo && (
          <Button
            label="Publicar no Jardim da Olívia 🌸"
            onPress={handleUpload}
            loading={upload.isPending}
          />
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  preview: {
    width: '100%', height: 280,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.sm,
    borderBottomLeftRadius: radius.sm, borderBottomRightRadius: radius.xl,
    marginBottom: spacing.md, ...shadows.card,
  },
  placeholder: {
    width: '100%', height: 280,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.sm,
    borderBottomLeftRadius: radius.sm, borderBottomRightRadius: radius.xl,
    backgroundColor: colors.lavenderLight, alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md, ...shadows.soft,
  },
  placeholderEmoji: { fontSize: 48, marginBottom: spacing.sm },
  placeholderText: { color: colors.textMuted, fontSize: fontSize.md },
  row: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  pickBtn: {
    flex: 1, backgroundColor: colors.sageDark, borderRadius: radius.full,
    padding: spacing.md, alignItems: 'center', ...shadows.soft,
  },
  pickBtnAlt: { backgroundColor: colors.lavender },
  pickBtnText: { color: colors.white, fontWeight: '600', fontSize: fontSize.md },
});
