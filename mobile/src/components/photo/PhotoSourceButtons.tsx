import { View, StyleSheet } from 'react-native';
import { GradientButton } from '../ui';
import { spacing } from '../../theme';

interface Props {
  onCamera: () => void;
  onGallery: () => void;
  loading?: boolean;
}

export function PhotoSourceButtons({ onCamera, onGallery, loading }: Props) {
  return (
    <View style={styles.row}>
      <GradientButton
        label="Usar Câmera"
        icon="aperture"
        variant="sage"
        size="sm"
        onPress={onCamera}
        loading={loading}
        fullWidth={false}
        style={styles.btn}
      />
      <GradientButton
        label="Galeria de Fotos"
        icon="image"
        variant="lavender"
        size="sm"
        onPress={onGallery}
        disabled={loading}
        fullWidth={false}
        style={styles.btn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm + 4,
  },
  btn: {
    flex: 1,
  },
});
