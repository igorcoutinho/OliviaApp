import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '../../theme';

const BANNER = require('../../../assets/welcome/banner.png');
const EDGE_GAP = 16;

const FEATURES: {
  icon: keyof typeof Ionicons.glyphMap;
  bold: string;
  rest: string;
}[] = [
  { icon: 'sparkles-outline', bold: 'Ver', rest: ' os momentos mais lindos da festa' },
  { icon: 'heart-outline', bold: 'Reagir', rest: ' e deixar seu carinho nas fotos' },
  {
    icon: 'videocam-outline',
    bold: 'Gravar',
    rest: ' uma mensagem em vídeo para a Olívia assistir quando crescer',
  },
  { icon: 'camera-outline', bold: 'Compartilhar', rest: ' suas fotos do dia' },
];

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export function WelcomeModal({ visible, onDismiss }: Props) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const cardWidth = Math.min(width - EDGE_GAP * 2, 420);
  const cardMaxHeight = height - Math.max(insets.top, EDGE_GAP) - Math.max(insets.bottom, EDGE_GAP) - EDGE_GAP * 2;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View
        style={[
          styles.overlay,
          {
            paddingTop: Math.max(insets.top, EDGE_GAP),
            paddingBottom: Math.max(insets.bottom, EDGE_GAP),
            paddingHorizontal: EDGE_GAP,
          },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />

        <View style={[styles.card, { width: cardWidth, maxHeight: cardMaxHeight }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar"
            hitSlop={8}
            onPress={onDismiss}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={16} color="#6B4D8A" />
          </Pressable>

          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.bannerWrap}>
              <Image source={BANNER} style={styles.banner} resizeMode="cover" />
            </View>

            <View style={styles.body}>
              <Text style={styles.title}>🌿 Bem-vindo ao Jardim da Olívia</Text>

              <Text style={styles.intro}>
                Este é um cantinho especial feito com muito amor para celebrar o primeiro aninho da
                nossa Olívia! 🌸
              </Text>

              <View style={styles.featureList}>
                <Text style={styles.featureHeading}>Aqui você pode:</Text>
                {FEATURES.map((item) => (
                  <View key={item.bold} style={styles.featureRow}>
                    <View style={styles.featureIcon}>
                      <Ionicons name={item.icon} size={16} color="#9B7DB8" />
                    </View>
                    <Text style={styles.featureText}>
                      <Text style={styles.featureBold}>{item.bold}</Text>
                      {item.rest}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.note}>
                <Ionicons name="heart-outline" size={18} color="#9B7DB8" />
                <Text style={styles.noteText}>
                  Não esqueça de gravar sua mensagem! Vai ser o presente mais precioso que ela vai
                  receber.
                </Text>
              </View>

              <Pressable onPress={onDismiss} style={styles.ctaWrap}>
                <LinearGradient
                  colors={['#6B4D8A', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.cta}
                >
                  <Text style={styles.ctaLabel}>Ver Jardim ✨</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(25, 15, 41, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FAF7F3',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#190F29',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(107, 77, 138, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6B4D8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  bannerWrap: {
    height: 160,
    width: '100%',
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    gap: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    lineHeight: 32,
    color: '#6B4D8A',
    textAlign: 'center',
  },
  intro: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: '#6B4D8A',
    textAlign: 'center',
  },
  featureList: {
    gap: 12,
  },
  featureHeading: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: '#9B7DB8',
    textTransform: 'uppercase',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F0FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  featureText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: '#6B4D8A',
  },
  featureBold: {
    fontFamily: fonts.bodyBold,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F5F0FA',
    borderWidth: 1,
    borderColor: 'rgba(200, 180, 215, 0.31)',
  },
  noteText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    lineHeight: 18,
    color: '#6B4D8A',
  },
  ctaWrap: {
    width: '100%',
    borderRadius: radius.pill,
    shadowColor: '#6B4D8A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },
  cta: {
    height: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  ctaLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.white,
  },
});
