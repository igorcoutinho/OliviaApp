import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../components/ui';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import {
  CaptionField,
  PhotoSourceButtons,
  PhotoUploadArea,
  PublishGardenButton,
} from '../../components/photo';
import { useUploadPhotoMutation } from '../../hooks/usePhotos';
import { colors, radius, spacing, fonts } from '../../theme';

const MAX_PHOTOS = 10;

function isVideoAsset(asset: ImagePicker.ImagePickerAsset): boolean {
  if (asset.type === 'video' || asset.type === 'pairedVideo') return true;
  if (asset.mimeType?.startsWith('video/')) return true;
  if (typeof asset.duration === 'number' && asset.duration > 0 && asset.type !== 'image') {
    return true;
  }
  return false;
}

export function UploadPhotoScreen() {
  const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [video, setVideo] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [caption, setCaption] = useState('');
  const [isPreparing, setIsPreparing] = useState(false);
  const upload = useUploadPhotoMutation();

  const addPhotos = async (fromCamera: boolean) => {
    const perm = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const remaining = MAX_PHOTOS - photos.length;
    if (fromCamera && remaining <= 0) {
      Alert.alert('Limite atingido', `Você já adicionou ${MAX_PHOTOS} fotos.`);
      return;
    }
    if (!fromCamera && remaining <= 0 && video) {
      Alert.alert('Limite atingido', `Você já adicionou ${MAX_PHOTOS} fotos e 1 vídeo.`);
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          quality: 0.7,
          allowsEditing: true,
          aspect: [4, 3],
          exif: false,
        })
      : await ImagePicker.launchImageLibraryAsync({
          quality: 0.7,
          allowsMultipleSelection: true,
          selectionLimit: Math.max(remaining, 0) + (video ? 0 : 1),
          exif: false,
          mediaTypes: ['images', 'videos'],
          videoMaxDuration: 120,
        });

    if (result.canceled || result.assets.length === 0) return;

    setIsPreparing(true);
    try {
      await new Promise((r) => setTimeout(r, 40));

      const imageAssets = result.assets.filter((a) => !isVideoAsset(a));
      const videoAsset = result.assets.find((a) => isVideoAsset(a));

      if (imageAssets.length > 0) {
        setPhotos((prev) => [...prev, ...imageAssets].slice(0, MAX_PHOTOS));
      }
      if (videoAsset) {
        setVideo(videoAsset);
      }

      await new Promise((r) => setTimeout(r, 280));
    } finally {
      setIsPreparing(false);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (photos.length === 0) return;
    upload.mutate(
      {
        photos: photos.map((p) => ({
          uri: p.uri,
          mimeType: p.mimeType ?? 'image/jpeg',
          fileName: p.fileName ?? `photo-${Date.now()}.jpg`,
        })),
        video: video
          ? {
              uri: video.uri,
              mimeType: video.mimeType ?? 'video/mp4',
              fileName: video.fileName ?? `video-${Date.now()}.mp4`,
            }
          : null,
        caption,
      },
      {
        onSuccess: () => {
          setPhotos([]);
          setVideo(null);
          setCaption('');
        },
      },
    );
  };

  const hasMedia = photos.length > 0 || !!video;
  const canPublish = photos.length > 0;
  const showLoading = upload.isPending || isPreparing;
  const loadingTitle = upload.isPending ? 'Enviando fotos...' : 'Preparando fotos...';
  const loadingSub = upload.isPending
    ? 'Isso pode levar alguns instantes 🌸'
    : 'Montando as imagens selecionadas';

  return (
    <Screen>
      <Modal visible={showLoading} transparent animationType="fade">
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.lavender} />
            <Text style={styles.loadingText}>{loadingTitle}</Text>
            <Text style={styles.loadingSubText}>{loadingSub}</Text>
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScreenHeader
          title="Plantar um Momento"
          subtitle="Compartilhe uma foto especial"
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {hasMedia ? (
            <View style={styles.grid}>
              {photos.map((p, i) => (
                <View key={`${p.uri}-${i}`} style={styles.thumb}>
                  <Image source={{ uri: p.uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removePhoto(i)}
                    hitSlop={8}
                  >
                    <Ionicons name="close-circle" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
              {video ? (
                <View style={styles.thumb}>
                  <View style={styles.videoThumb}>
                    <Ionicons name="videocam" size={28} color={colors.lavender} />
                    <Text style={styles.videoThumbText}>Vídeo</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => setVideo(null)}
                    hitSlop={8}
                  >
                    <Ionicons name="close-circle" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ) : null}
              {photos.length < MAX_PHOTOS && (
                <TouchableOpacity style={styles.addMoreBtn} onPress={() => addPhotos(false)}>
                  <Ionicons name="add" size={28} color="#6b4d8a" />
                  <Text style={styles.addMoreText}>{MAX_PHOTOS - photos.length}</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <PhotoUploadArea onPress={() => addPhotos(false)} />
          )}

          <PhotoSourceButtons
            onCamera={() => addPhotos(true)}
            onGallery={() => addPhotos(false)}
            disabled={upload.isPending || isPreparing}
          />

          <CaptionField
            placeholder="Deixe uma mensagem carinhosa sobre este momento..."
            value={caption}
            onChangeText={setCaption}
          />

          <PublishGardenButton
            onPress={handleUpload}
            loading={upload.isPending}
            disabled={!canPublish}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: spacing.screenLg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  thumb: {
    width: 96,
    height: 96,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.creamMid,
  },
  videoThumb: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#f2edf8',
  },
  videoThumbText: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: colors.lavender,
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  addMoreBtn: {
    width: 96,
    height: 96,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: 'rgba(179, 157, 219, 0.4)',
    borderStyle: 'dashed',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addMoreText: {
    fontSize: 11,
    color: '#6b4d8a',
    fontFamily: fonts.bodyMedium,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBox: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 48,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 17,
    color: colors.text,
  },
  loadingSubText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
