import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts } from '../../theme';

export function CapsuleCard() {
  return (
    <LinearGradient
      colors={['#f5f0fa', '#fff7f2']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.card}
    >
      <View style={styles.titleRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="gift-outline" size={28} color="#6b4d8a" />
        </View>
        <Text style={styles.title}>Um presente para o futuro</Text>
      </View>
      <Text style={styles.description}>
        Grave uma mensagem em vídeo para a Olívia. Seu vídeo será guardado com carinho pelas
        fadinhas do jardim e revelado quando ela crescer!
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#e5dec9',
    padding: 28,
    gap: 16,
    shadowColor: '#6b4d8a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.07,
    shadowRadius: 28,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e8d5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 26,
    lineHeight: 30,
    color: '#6b4d8a',
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 24,
    color: '#6b4d8a',
    opacity: 0.92,
  },
});
