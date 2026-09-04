import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fonts, radius } from '../../theme';

interface Props {
  onPress: () => void;
  loading?: boolean;
}

export function LogoutButton({ onPress, loading }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color="#8c72a8" />
      ) : (
        <Text style={styles.label}>Sair do Jardim</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#708064',
    backgroundColor: '#fffaf5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#708064',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: '#8c72a8',
  },
});
