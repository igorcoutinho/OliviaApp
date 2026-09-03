import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, RefreshControl, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Button, EmptyState, GradientButton } from '../../components/ui';
import { KEYBOARD_DONE_ACCESSORY_ID } from '../../components/ui/KeyboardDoneAccessory';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import {
  CapsuleCard,
  RecordMessageButton,
  YourVideosHeader,
  VideoEmptyState,
  VideoHistoryCard,
} from '../../components/video';
import { useMyVideosQuery, useUploadVideoMutation } from '../../hooks/useVideos';
import { colors, spacing, radius, shadows, typography } from '../../theme';

type Mode = 'home' | 'recording' | 'preview';

function VideoPreview({ uri, onRetake }: { uri: string; onRetake: () => void }) {
  const player = useVideoPlayer(uri, (p) => { p.loop = false; });

  return (
    <View style={styles.previewVideoWrap}>
      <VideoView style={styles.previewVideo} player={player} nativeControls contentFit="cover" />
      <TouchableOpacity style={styles.retakeFloating} onPress={onRetake}>
        <Ionicons name="refresh" size={18} color={colors.white} />
        <Text style={styles.retakeFloatingText}>Gravar de novo</Text>
      </TouchableOpacity>
    </View>
  );
}

function RecordingView({
  onRecorded,
  onCancel,
}: {
  onRecorded: (uri: string) => void;
  onCancel: () => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRecording) timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    else setSeconds(0);
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleRecord = async () => {
    if (!cameraRef.current || isRecording) return;
    setIsRecording(true);
    try {
      const video = await cameraRef.current.recordAsync({ maxDuration: 120 });
      if (video?.uri) onRecorded(video.uri);
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.recordingRoot}>
      <CameraView ref={cameraRef} style={styles.camera} mode="video" facing="front" />
      <View style={styles.recordingOverlay}>
        <TouchableOpacity style={styles.backBtn} onPress={onCancel}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.controls}>
          {isRecording && <Text style={styles.timer}>{formatTime(seconds)}</Text>}
          <TouchableOpacity
            style={[styles.recordBtn, isRecording && styles.recordBtnActive]}
            onPress={() => isRecording ? cameraRef.current?.stopRecording() : handleRecord()}
          >
            <View style={[styles.recordInner, isRecording && styles.recordInnerStop]} />
          </TouchableOpacity>
          <Text style={styles.hint}>
            {isRecording ? 'Toque para parar' : 'Toque para gravar'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function VideoScreen() {
  const [mode, setMode] = useState<Mode>('home');
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const { data: videos, isLoading, isRefetching, refetch, isError, error } = useMyVideosQuery();
  const upload = useUploadVideoMutation();
  const [camPerm, requestCam] = useCameraPermissions();
  const [micPerm, requestMic] = useMicrophonePermissions();

  const handleSend = () => {
    if (!recordedUri) return;
    upload.mutate(
      { uri: recordedUri, message },
      {
        onSuccess: () => {
          setRecordedUri(null);
          setMessage('');
          setMode('home');
        },
      }
    );
  };

  const handleDiscard = () => {
    setRecordedUri(null);
    setMessage('');
    setMode('home');
  };

  const ensurePermissions = async () => {
    let cam = camPerm;
    let mic = micPerm;
    if (!cam?.granted) cam = await requestCam();
    if (!mic?.granted) mic = await requestMic();
    return cam?.granted && mic?.granted;
  };

  const startRecording = async () => {
    const granted = await ensurePermissions();
    if (!granted) return;
    setMode('recording');
  };

  const pickFromGallery = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setRecordedUri(result.assets[0].uri);
      setMode('preview');
    }
  };

  const handleRecordPress = () => {
    Alert.alert(
      'Sua mensagem',
      'Como você quer enviar?',
      [
        { text: 'Gravar agora', onPress: startRecording },
        { text: 'Escolher da galeria', onPress: pickFromGallery },
        { text: 'Cancelar', style: 'cancel' },
      ],
    );
  };

  if (mode === 'recording') {
    return (
      <RecordingView
        onRecorded={(uri) => { setRecordedUri(uri); setMode('preview'); }}
        onCancel={() => setMode('home')}
      />
    );
  }

  if (mode === 'preview' && recordedUri) {
    return (
      <Screen>
        <ScrollView
          contentContainerStyle={styles.previewContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <ScreenHeader title="Revisar mensagem" subtitle="Confira antes de plantar no baú" />
          <VideoPreview uri={recordedUri} onRetake={() => { setRecordedUri(null); setMode('recording'); }} />

          <Text style={styles.previewLabel}>Mensagem para a Olívia (opcional)</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Ex: Quando você abrir isso, quero que saiba o quanto te amamos..."
            placeholderTextColor={colors.moss}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
            inputAccessoryViewID={KEYBOARD_DONE_ACCESSORY_ID}
          />

          <View style={styles.previewActions}>
            <GradientButton
              label="Plantar no baú do tempo"
              onPress={handleSend}
              loading={upload.isPending}
            />
            <Button label="Descartar" variant="ghost" onPress={handleDiscard} disabled={upload.isPending} />
          </View>
        </ScrollView>
      </Screen>
    );
  }

  if (isLoading) return <Screen loading loadingMessage="Carregando seus vídeos..." />;

  const videoCount = videos?.length ?? 0;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.sage} />
        }
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Mensagem para Olívia"
          subtitle="Cápsula do tempo mágica"
        />

        <View style={styles.content}>
          <CapsuleCard />
          <RecordMessageButton onPress={handleRecordPress} />

          <YourVideosHeader count={videoCount} />

          {isError ? (
            <EmptyState emoji="😔" title="Erro ao carregar" subtitle={(error as Error).message} />
          ) : !videoCount ? (
            <VideoEmptyState />
          ) : (
            videos!.map((video, index) => (
              <VideoHistoryCard key={video.id} video={video} index={index} />
            ))
          )}
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
    gap: spacing.lg,
  },
  recordingRoot: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  recordingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    padding: spacing.lg,
    paddingTop: 56,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center',
  },
  controls: { alignItems: 'center', gap: spacing.sm, paddingBottom: 80 },
  timer: { color: colors.lavender, fontSize: 28, fontFamily: typography.bodyBold.fontFamily },
  recordBtn: {
    width: 76, height: 76, borderRadius: 38, borderWidth: 4,
    borderColor: colors.white, alignItems: 'center', justifyContent: 'center',
  },
  recordBtnActive: { borderColor: colors.lavender },
  recordInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.lavender },
  recordInnerStop: { width: 28, height: 28, borderRadius: 6 },
  hint: { ...typography.bodySmall, color: 'rgba(255,255,255,0.85)' },
  previewContent: { paddingBottom: spacing.xxl },
  previewVideoWrap: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  previewVideo: { width: '100%', height: 320, backgroundColor: '#000' },
  retakeFloating: {
    position: 'absolute', bottom: spacing.md, right: spacing.md,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: radius.full,
  },
  retakeFloatingText: { ...typography.caption, fontFamily: typography.bodyBold.fontFamily, color: colors.white },
  previewLabel: { ...typography.fieldLabel, marginHorizontal: spacing.lg, marginBottom: spacing.sm },
  messageInput: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    ...typography.captionInput,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: spacing.lg,
    ...shadows.soft,
  },
  previewActions: { paddingHorizontal: spacing.lg, gap: spacing.sm },
});
