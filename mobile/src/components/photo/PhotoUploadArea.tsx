import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../theme';

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
        <Ionicons name="camera-outline" size={36} color={colors.sage} />
      </View>
      <View style={styles.labels}>
        <Text style={typography.uploadLabelMain}>Semeie sua lembrança</Text>
        <Text style={typography.uploadLabelSub}>Tire uma foto ou suba da galeria</Text>
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
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.sage,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: spacing.md,
    padding: spacing.lg,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
});
