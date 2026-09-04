import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, radius, spacing } from '../../theme';

interface Props {
  onPress: () => void;
}

export function RecordMessageButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Ionicons name="videocam-outline" size={22} color="#6b4d8a" />
        </View>
        <View style={styles.texts}>
          <Text style={styles.title}>Gravar Mensagem</Text>
          <Text style={styles.sub}>Gravar ou subir vídeo</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6b4d8a" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#b39ddb',
    paddingHorizontal: spacing.lg,
    height: 76,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f2edf8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: '#6b4d8a',
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: '#8c72a8',
  },
});
