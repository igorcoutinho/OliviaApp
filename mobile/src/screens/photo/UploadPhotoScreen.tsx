import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../components/ui';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { CaptionField, PublishGardenButton } from '../../components/photo';
import { useUploadPhotoMutation } from '../../hooks/usePhotos';
import { colors, radius, spacing, fonts } from '../../theme';

const MAX_PHOTOS = 10;

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
    if (remaining <= 0) {
      Alert.alert('Limite atingido', `Você já adicionou ${MAX_PHOTOS} fotos.`);
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
          selectionLimit: remaining,
          exif: false,
          mediaTypes: ['images'],
        });

    if (result.canceled || result.assets.length === 0) return;

    setIsPreparing(true);
    try {
      // deixa o overlay pintar antes de montar as thumbs
      await new Promise((r) => setTimeout(r, 40));
      setPhotos((prev) => [...prev, ...result.assets].slice(0, MAX_PHOTOS));
      // dá tempo das Image thumbs começarem a carregar
      await new Promise((r) => setTimeout(r, 280));
    } finally {
      setIsPreparing(false);
    }
  };

  const addVideo = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    setIsPreparing(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        videoMaxDuration: 120,
        quality: 0.85,
      });

      if (!result.canceled && result.assets[0]) {
        setVideo(result.assets[0]);
      }
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

  const hasContent = photos.length > 0;
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
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Plantar um Momento" subtitle="Compartilhe fotos especiais" />

        <View style={styles.container}>
          {/* Grade de fotos selecionadas */}
          {hasContent ? (
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
              <Text style={styles.emptyLabel}>Toque para selecionar fotos</Text>
              <Text style={styles.emptySub}>Até {MAX_PHOTOS} fotos por post</Text>
            </TouchableOpacity>
          )}

          {/* Vídeo opcional */}
          <View style={styles.videoRow}>
            {video ? (
              <View style={styles.videoChip}>
                <Ionicons name="videocam" size={16} color={colors.lavender} />
                <Text style={styles.videoChipText} numberOfLines={1}>Vídeo adicionado</Text>
                <TouchableOpacity onPress={() => setVideo(null)} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color="#B85C6A" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.addVideoBtn} onPress={addVideo}>
                <Ionicons name="videocam-outline" size={18} color={colors.lavender} />
                <Text style={styles.addVideoBtnText}>Adicionar vídeo (opcional)</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Botões câmera / galeria */}
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
            disabled={!hasContent}
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addMoreText: {
    fontSize: 11,
    color: colors.sage,
    fontFamily: fonts.bodyMedium,
  },
  videoRow: {
    alignItems: 'flex-start',
  },
  videoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f2edf8',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  videoChipText: {
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    color: colors.lavender,
    flex: 1,
  },
  addVideoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(200,180,215,0.6)',
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addVideoBtnText: {
    fontSize: 14,
    fontFamily: fonts.bodyMedium,
    color: colors.lavender,
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
