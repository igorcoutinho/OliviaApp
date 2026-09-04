import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, spacing } from '../../theme';

export function VideoEmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="color-wand-outline" size={48} color="#7D9B76" />
      </View>
      <View style={styles.texts}>
        <Text style={styles.title}>Nenhuma semente de vídeo ainda</Text>
        <Text style={styles.subtitle}>
          Seja o primeiro a deixar uma bênção mágica para a Olívia assistir no futuro!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f2edf8',
    borderWidth: 1,
    borderColor: '#e5dec9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    width: '100%',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: '#6b4d8a',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 17,
    color: '#8c72a8',
    textAlign: 'center',
  },
});
