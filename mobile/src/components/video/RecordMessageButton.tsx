import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, shadows } from '../../theme';

interface Props {
  onPress: () => void;
}

export function RecordMessageButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.iconWrap}>
        <Ionicons name="videocam" size={22} color={colors.white} />
      </View>
      <View style={styles.texts}>
        <Text style={typography.recordTitle}>Gravar Mensagem</Text>
        <Text style={typography.recordSub}>Gravar ou subir vídeo</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.moss} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 76,
    gap: spacing.md,
    ...shadows.soft,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: 2,
  },
});
