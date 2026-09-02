import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface Props {
  username: string;
}

export function UsernamePreview({ username }: Props) {
  return (
    <View style={styles.row}>
      <Feather name="at-sign" size={16} color={colors.moss} />
      <Text style={typography.authPreviewText}>Seu usuário será:</Text>
      <Text style={typography.authPreviewHandle}>@{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
});
