import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '../../theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onRecord: () => void;
  onGallery: () => void;
}

export function RecordMessageSheet({ visible, onClose, onRecord, onGallery }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Fechar" />

        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 28) }]}>
          <View style={styles.handle} />

          <View style={styles.titleBlock}>
            <Text style={styles.title}>🎥 Gravar Mensagem</Text>
            <Text style={styles.subtitle}>Grave uma mensagem especial para a Olívia</Text>
          </View>

          <View style={styles.options}>
            <Pressable
              accessibilityRole="button"
              onPress={onRecord}
              style={({ pressed }) => [styles.primaryWrap, pressed && styles.pressed]}
            >
              <LinearGradient
                colors={['#6b4d8a', '#8b5cf6']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.primaryBtn}
              >
                <Ionicons name="videocam-outline" size={20} color={colors.white} />
                <Text style={styles.primaryLabel}>Gravar Agora</Text>
              </LinearGradient>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={onGallery}
              style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
            >
              <Ionicons name="images-outline" size={20} color="#6b4d8a" />
              <Text style={styles.secondaryLabel}>Escolher da Galeria</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={styles.cancelBtn}
              hitSlop={8}
            >
              <Text style={styles.cancelLabel}>Cancelar</Text>
            </Pressable>
          </View>

          <View style={styles.brand}>
            <Ionicons name="leaf" size={14} color="#7D9B76" />
            <Text style={styles.brandText}>Jardim da Olívia</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(25, 15, 41, 0.35)',
  },
  sheet: {
    backgroundColor: '#faf7f3',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingTop: 12,
    paddingHorizontal: spacing.screenLg,
    gap: spacing.xl,
    alignItems: 'center',
    shadowColor: '#190f29',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 16,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 100,
    backgroundColor: '#e5dec9',
  },
  titleBlock: {
    width: '100%',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 26,
    color: '#6b4d8a',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    color: '#9b7db8',
    textAlign: 'center',
  },
  options: {
    width: '100%',
    gap: 12,
  },
  primaryWrap: {
    width: '100%',
    borderRadius: radius.pill,
    shadowColor: '#6b4d8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryBtn: {
    height: 53,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
  },
  primaryLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.white,
  },
  secondaryBtn: {
    height: 51,
    borderRadius: radius.pill,
    backgroundColor: '#f5f0fa',
    borderWidth: 1,
    borderColor: '#e5dec9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
  },
  secondaryLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: '#6b4d8a',
  },
  cancelBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  cancelLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: '#9b7db8',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandText: {
    fontFamily: fonts.heading,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#9b7db8',
  },
  pressed: {
    opacity: 0.88,
  },
});
