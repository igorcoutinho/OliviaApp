import {
  View, Text, StyleSheet, Image, Dimensions, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientButton } from '../../components/ui';
import { FloralBackground } from '../../components/layout/FloralBackground';
import { colors, spacing, typography } from '../../theme';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BTN_WIDTH = Math.min(326, SCREEN_WIDTH - 64);
const PORTRAIT_OUTER = 170;
const PORTRAIT_INNER = 154;

export function WelcomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.cream, colors.creamMid, colors.cream]}
      locations={[0, 0.5, 1]}
      style={styles.root}
    >
      <FloralBackground />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.lg,
          },
        ]}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.main}>
          <Text style={typography.inviteLabel}>Você foi convidado para:</Text>

          <View style={styles.portraitGlow}>
            <Image
              source={require('../../../assets/olivia.png')}
              style={styles.portrait}
            />
          </View>

          <View style={styles.nameBlock}>
            <Text style={styles.displayName}>Olívia</Text>
            <Text style={typography.age}>1 ANO</Text>
          </View>

          <View style={styles.eventMeta}>
            <Text style={typography.eventDate}>12 DE SETEMBRO, 2026</Text>
            <Text style={typography.eventLocation}>SÍTIO DO KEVIN</Text>
          </View>

          <GradientButton
            label="Entrar no Jardim"
            onPress={() => navigation.navigate('Login')}
            style={styles.enterBtn}
            fullWidth={false}
          />

          <View style={styles.authSection}>
            <Text style={styles.signupRow}>
              <Text style={typography.signupPrompt}>Ainda não tem conta? </Text>
              <Text
                style={typography.signupLink}
                onPress={() => navigation.navigate('Register')}
              >
                Criar conta
              </Text>
            </Text>
          </View>

          <Text style={typography.footerNote}>
            Uma celebração para guardar para sempre
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  main: {
    alignItems: 'center',
    gap: spacing.xl,
  },
  portraitGlow: {
    width: PORTRAIT_OUTER,
    height: PORTRAIT_OUTER,
    borderRadius: PORTRAIT_OUTER / 2,
    backgroundColor: colors.lilacLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  portrait: {
    width: PORTRAIT_INNER,
    height: PORTRAIT_INNER,
    borderRadius: PORTRAIT_INNER / 2,
  },
  nameBlock: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: spacing.xs,
    overflow: 'visible',
  },
  displayName: {
    ...typography.displayName,
    paddingTop: 8,
    paddingBottom: 4,
  },
  eventMeta: {
    alignItems: 'center',
    gap: 6,
  },
  enterBtn: {
    width: BTN_WIDTH,
  },
  authSection: {
    alignItems: 'center',
    gap: 12,
  },
  signupRow: {
    textAlign: 'center',
  },
});
