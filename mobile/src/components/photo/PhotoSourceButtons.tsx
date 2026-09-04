import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, radius, spacing } from '../../theme';

interface Props {
  onCamera: () => void;
  onGallery: () => void;
  disabled?: boolean;
}

export function PhotoSourceButtons({ onCamera, onGallery, disabled }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onCamera}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed, disabled && styles.disabled]}
      >
        <Ionicons name="aperture-outline" size={20} color="#6b4d8a" />
        <Text style={styles.label}>Usar Câmera</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onGallery}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed, disabled && styles.disabled]}
      >
        <Ionicons name="image-outline" size={20} color="#6b4d8a" />
        <Text style={styles.label}>Galeria de Fotos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  btn: {
    flex: 1,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: radius.pill,
    backgroundColor: '#f5f0fa',
    borderWidth: 1,
    borderColor: 'rgba(179, 157, 219, 0.4)',
    shadowColor: '#6b4d8a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: '#6b4d8a',
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    opacity: 0.55,
  },
});
