import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../theme';

export function AboutCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sobre o Jardim da Olívia</Text>
      <Text style={styles.body}>
        Este aplicativo é uma rede social privada e segura, criada especialmente para eternizar o
        aniversário de 1 ano da Olívia. Todas as lembranças, fotos e vídeos plantados aqui serão
        eternizados e entregues para ela. Obrigado por fazer parte da nossa história! 💖
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5dec9',
    padding: 16,
    gap: 8,
    width: '100%',
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: '#6b4d8a',
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: '#8c72a8',
  },
});
