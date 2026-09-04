import {
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts } from '../../theme';
import type { VersionCheckResult } from '../../api/app.api';

const CLOUD_ICON = require('../../../assets/version/cloud-download.png');
const DECORATIVE = require('../../../assets/version/decorative-leaves.png');

type Props = {
  visible: boolean;
  info: VersionCheckResult | null;
};

export function ForceUpdateModal({ visible, info }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 48, 340);

  const title = info?.title || 'Atualize o aplicativo';
  const message =
    info?.message ||
    'Uma nova versão do Jardim da Olívia está disponível! Atualize para continuar aproveitando todas as novidades e melhorias do jardim encantado.';
  const contact =
    info?.contactInfo ||
    'Se precisar de ajuda, entre em contato com o Igor.';
  const storeUrl = info?.storeUrl?.trim() || null;
  const requiredVersion = info?.requiredVersion?.replace(/^v/i, '') || null;

  const openStore = () => {
    if (!storeUrl) return;
    Linking.openURL(storeUrl);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => undefined}>
      <View
        style={[
          styles.overlay,
          {
            paddingTop: insets.top + 24,
            paddingBottom: insets.bottom + 24,
          },
        ]}
      >
        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.iconStack}>
            <View style={styles.iconOuter}>
              <View style={styles.iconInner}>
                <Image source={CLOUD_ICON} style={styles.cloudIcon} contentFit="contain" />
              </View>
            </View>
            <Image source={DECORATIVE} style={styles.decorative} contentFit="contain" />
          </View>

          <View style={styles.textContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          {requiredVersion ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Versão mínima: v{requiredVersion}</Text>
            </View>
          ) : null}

          <View style={styles.actions}>
            {storeUrl ? (
              <Pressable
                accessibilityRole="button"
                onPress={openStore}
                style={({ pressed }) => [styles.ctaWrap, pressed && styles.ctaPressed]}
              >
                <LinearGradient
                  colors={['#6B4D8A', '#9B7DB8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.cta}
                >
                  <Text style={styles.ctaLabel}>Atualizar Agora</Text>
                </LinearGradient>
              </Pressable>
            ) : null}

            <Text style={styles.contact}>{contact}</Text>
          </View>
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
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#FAF7F3',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5DEC9',
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 24,
    shadowColor: '#1F0F28',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  iconStack: {
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  iconOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F5F0FA',
    borderWidth: 1,
    borderColor: '#E8D5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8D5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudIcon: {
    width: 24,
    height: 24,
  },
  decorative: {
    width: 70,
    height: 14,
  },
  textContent: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 30,
    lineHeight: 34,
    color: '#6B4D8A',
    textAlign: 'center',
    width: '100%',
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: '#3D2E4D',
    textAlign: 'center',
    width: '100%',
  },
  badge: {
    backgroundColor: '#F5F0FA',
    borderWidth: 1,
    borderColor: '#E8D5F5',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: '#9B7DB8',
    textTransform: 'uppercase',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  ctaWrap: {
    width: '100%',
    borderRadius: 28,
    shadowColor: '#6B4D8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  ctaPressed: {
    opacity: 0.9,
  },
  cta: {
    height: 50,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  contact: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 15,
    color: '#7D6B8F',
    textAlign: 'center',
    width: '100%',
  },
});
