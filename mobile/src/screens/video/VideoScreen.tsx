import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, RefreshControl,
} from 'react-native';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Button, LoadingScreen, EmptyState } from '../../components/ui';
import { PageHeader } from '../../components/layout/PageHeader';
import { useMyVideosQuery, useUploadVideoMutation } from '../../hooks/useVideos';
import { colors, spacing, fontSize, radius, shadows } from '../../theme';

type Mode = 'home' | 'recording' | 'preview';

function formatDate(d: string) {
  return new Date(d).toLocaleString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

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
      <CameraView ref={cameraRef} style={styles.camera} mode="video" facing="front">
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
      </CameraView>
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

  const startRecording = async () => {
    if (!camPerm?.granted || !micPerm?.granted) {
      await requestCam();
      await requestMic();
      return;
    }
    setMode('recording');
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
        <ScrollView contentContainerStyle={styles.previewContent} keyboardShouldPersistTaps="handled">
          <PageHeader title="Revisar mensagem" subtitle="Só envie se estiver feliz com o vídeo" />
          <VideoPreview uri={recordedUri} onRetake={() => { setRecordedUri(null); setMode('recording'); }} />

          <Text style={styles.previewLabel}>Mensagem para a Olívia (opcional)</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Ex: Quando você abrir isso, quero que saiba o quanto te amamos..."
            placeholderTextColor={colors.textMuted}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
          />

          <View style={styles.previewActions}>
            <Button
              label="Enviar para o baú do tempo 💕"
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

  const needsPermission = !camPerm?.granted || !micPerm?.granted;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.sageDark} />
        }
      >
        <PageHeader title="Mensagem para Olívia" subtitle="Baú do tempo · 10 anos" />

        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>💌</Text>
          <Text style={styles.infoTitle}>Um presente para o futuro</Text>
          <Text style={styles.infoText}>
            Grave um vídeo de carinho para a Olívia. Ele ficará guardado com segurança e só você poderá ver —
            até o dia em que ela fizer 10 anos, quando todos esses momentos serão revelados para ela.
          </Text>
          <Text style={styles.infoHint}>Você pode gravar quantos vídeos quiser 🌸</Text>
        </View>

        {needsPermission ? (
          <View style={styles.permissionCard}>
            <Text style={styles.permissionText}>Precisamos da câmera e do microfone para gravar</Text>
            <Button label="Permitir acesso" onPress={async () => { await requestCam(); await requestMic(); }} />
          </View>
        ) : (
          <TouchableOpacity style={styles.recordCta} onPress={startRecording} activeOpacity={0.85}>
            <View style={styles.recordCtaIcon}>
              <Ionicons name="videocam" size={28} color={colors.white} />
            </View>
            <View style={styles.recordCtaText}>
              <Text style={styles.recordCtaTitle}>Gravar mensagem</Text>
              <Text style={styles.recordCtaSub}>Você escolhe se envia depois</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={colors.sage} />
          </TouchableOpacity>
        )}

        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Seus vídeos</Text>
          <Text style={styles.historyCount}>{videos?.length ?? 0}</Text>
        </View>

        {isError ? (
          <EmptyState emoji="😔" title="Erro ao carregar" subtitle={(error as Error).message} />
        ) : !videos?.length ? (
          <EmptyState
            emoji="🧚"
            title="Nenhum vídeo ainda"
            subtitle="Sua primeira mensagem para a Olívia começa aqui"
          />
        ) : (
          videos.map((video, index) => (
            <View
              key={video.id}
              style={[
                styles.historyCard,
                index % 2 === 0 ? styles.historyCardEven : styles.historyCardOdd,
              ]}
            >
              <View style={styles.historyCardTop}>
                <View style={styles.historyBadge}>
                  <Ionicons name="lock-closed" size={12} color={colors.lavender} />
                  <Text style={styles.historyBadgeText}>Privado</Text>
                </View>
                <Text style={styles.historyDate}>{formatDate(video.created_at)}</Text>
              </View>
              {video.message ? (
                <Text style={styles.historyMessage}>"{video.message}"</Text>
              ) : (
                <Text style={styles.historyMessageEmpty}>Mensagem sem texto</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  infoCard: {
    backgroundColor: colors.lavenderLight,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.md,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.soft,
  },
  infoEmoji: { fontSize: 32, marginBottom: spacing.sm },
  infoTitle: { fontSize: fontSize.lg, fontWeight: '600', color: colors.olive, marginBottom: spacing.sm },
  infoText: { fontSize: fontSize.md, color: colors.text, lineHeight: 24 },
  infoHint: { fontSize: fontSize.sm, color: colors.sageDark, marginTop: spacing.md, fontStyle: 'italic' },
  permissionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.soft,
  },
  permissionText: { color: colors.textSecondary, textAlign: 'center', fontSize: fontSize.md },
  recordCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.xl,
    gap: spacing.md,
    ...shadows.card,
  },
  recordCtaIcon: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: colors.sageDark,
    alignItems: 'center', justifyContent: 'center',
  },
  recordCtaTitle: { fontSize: fontSize.lg, fontWeight: '600', color: colors.olive },
  recordCtaSub: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  recordCtaText: { flex: 1 },
  historyHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: spacing.md, paddingHorizontal: spacing.xs,
  },
  historyTitle: { fontSize: fontSize.lg, fontWeight: '600', color: colors.olive },
  historyCount: {
    backgroundColor: colors.pinkSoft, color: colors.sageDark,
    fontSize: fontSize.xs, fontWeight: '700',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full,
  },
  historyCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.soft,
  },
  historyCardEven: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.sm,
    borderBottomLeftRadius: radius.sm,
    borderBottomRightRadius: radius.xl,
  },
  historyCardOdd: {
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.sm,
    marginLeft: spacing.sm,
  },
  historyCardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
  historyBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.lavenderLight, paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: radius.full,
  },
  historyBadgeText: { fontSize: fontSize.xs, color: colors.lavender, fontWeight: '600' },
  historyDate: { fontSize: fontSize.xs, color: colors.textMuted },
  historyMessage: { fontSize: fontSize.md, color: colors.text, fontStyle: 'italic', lineHeight: 22 },
  historyMessageEmpty: { fontSize: fontSize.sm, color: colors.textMuted },
  recordingRoot: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  recordingOverlay: { flex: 1, justifyContent: 'space-between', padding: spacing.lg, paddingTop: 56 },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center',
  },
  controls: { alignItems: 'center', gap: spacing.sm, paddingBottom: 80 },
  timer: { color: '#ff8fab', fontSize: fontSize.xxl, fontWeight: '700' },
  recordBtn: {
    width: 76, height: 76, borderRadius: 38, borderWidth: 4,
    borderColor: colors.white, alignItems: 'center', justifyContent: 'center',
  },
  recordBtnActive: { borderColor: '#ff8fab' },
  recordInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#ff8fab' },
  recordInnerStop: { width: 28, height: 28, borderRadius: 6 },
  hint: { color: 'rgba(255,255,255,0.85)', fontSize: fontSize.sm },
  previewContent: { padding: spacing.md, paddingBottom: spacing.xxl },
  previewVideoWrap: { borderRadius: radius.xl, overflow: 'hidden', marginBottom: spacing.lg, ...shadows.card },
  previewVideo: { width: '100%', height: 320, backgroundColor: '#000' },
  retakeFloating: {
    position: 'absolute', bottom: spacing.md, right: spacing.md,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: radius.full,
  },
  retakeFloatingText: { color: colors.white, fontSize: fontSize.xs, fontWeight: '600' },
  previewLabel: { fontSize: fontSize.sm, fontWeight: '600', color: colors.olive, marginBottom: spacing.sm },
  messageInput: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.md, fontSize: fontSize.md, color: colors.text,
    minHeight: 100, textAlignVertical: 'top', marginBottom: spacing.lg,
    ...shadows.soft,
  },
  previewActions: { gap: spacing.sm },
});
