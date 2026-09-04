import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, spacing } from '../../theme';

interface Props {
  photoUri?: string | null;
  onPress?: () => void;
}

const UPLOAD_HEIGHT = 260;

export function PhotoUploadArea({ photoUri, onPress }: Props) {
  const content = photoUri ? (
    <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="cover" />
  ) : (
    <>
      <View style={styles.iconWrap}>
        <Ionicons name="flower-outline" size={36} color="#6b4d8a" />
      </View>
      <View style={styles.labels}>
        <Text style={styles.labelMain}>Semeie sua lembrança</Text>
        <Text style={styles.labelSub}>Tire uma foto ou suba da galeria</Text>
      </View>
    </>
  );

  return (
    <TouchableOpacity
      style={styles.area}
      onPress={onPress}
      activeOpacity={photoUri ? 1 : 0.85}
      disabled={!!photoUri}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  area: {
    width: '100%',
    height: UPLOAD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(179, 157, 219, 0.4)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: spacing.md,
    padding: spacing.lg,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#e8d5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    alignItems: 'center',
    gap: 4,
  },
  labelMain: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: '#6b4d8a',
  },
  labelSub: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: '#8c72a8',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
});
