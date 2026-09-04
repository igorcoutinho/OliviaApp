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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../components/ui';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { CaptionField, PublishGardenButton } from '../../components/photo';
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
          mediaTypes: ImagePicker.MediaTypeOptions.All,
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
        <ScreenHeader title="Plantar um Momento" subtitle="Compartilhe fotos especiais" />

        <View style={styles.container}>
          {hasMedia ? (
            <View style={styles.grid}>
              {photos.map((p, i) => (
                <View key={i} style={styles.thumb}>
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
                  <Ionicons name="add" size={28} color={colors.sage} />
                  <Text style={styles.addMoreText}>{MAX_PHOTOS - photos.length}</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity style={styles.emptyArea} onPress={() => addPhotos(false)}>
              <View style={styles.iconWrap}>
                <Ionicons name="images-outline" size={36} color={colors.sage} />
              </View>
              <Text style={styles.emptyLabel}>Toque para selecionar da galeria</Text>
              <Text style={styles.emptySub}>Fotos e vídeo · até {MAX_PHOTOS} fotos</Text>
            </TouchableOpacity>
          )}

          <View style={styles.sourceRow}>
            <TouchableOpacity style={styles.sourceBtn} onPress={() => addPhotos(true)}>
              <Ionicons name="camera-outline" size={18} color={colors.sage} />
              <Text style={styles.sourceBtnText}>Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sourceBtn, styles.sourceBtnGallery]} onPress={() => addPhotos(false)}>
              <Ionicons name="images-outline" size={18} color={colors.lavender} />
              <Text style={[styles.sourceBtnText, { color: colors.lavender }]}>Galeria</Text>
            </TouchableOpacity>
          </View>

          <CaptionField
            placeholder="Deixe uma mensagem carinhosa..."
            value={caption}
            onChangeText={setCaption}
          />

          <PublishGardenButton
            onPress={handleUpload}
            loading={upload.isPending}
            disabled={!canPublish}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  emptyArea: {
    width: '100%',
    height: 200,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.sage,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.text,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: fonts.body,
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
    borderWidth: 2,
    borderColor: colors.sage,
    borderStyle: 'dashed',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addMoreText: {
    fontSize: 11,
    color: colors.sage,
    fontFamily: fonts.bodyMedium,
  },
  sourceRow: {
    flexDirection: 'row',
    gap: spacing.sm + 4,
  },
  sourceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.sage,
    backgroundColor: colors.white,
  },
  sourceBtnGallery: {
    borderColor: colors.lavender,
  },
  sourceBtnText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.sage,
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
