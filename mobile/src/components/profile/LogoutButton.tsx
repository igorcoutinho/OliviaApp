import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

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
        <ActivityIndicator color={colors.moss} />
      ) : (
        <Text style={typography.logoutButton}>Sair do Jardim</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.moss,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
