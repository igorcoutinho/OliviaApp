import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { RELATIONSHIP_OPTIONS, type Relationship } from '../../lib/authUtils';

interface Props {
  value: Relationship;
  onChange: (value: Relationship) => void;
}

export function RelationshipPicker({ value, onChange }: Props) {
  const openPicker = () => {
    Alert.alert(
      'Como a Olívia te conhece?',
      undefined,
      [
        ...RELATIONSHIP_OPTIONS.map((option) => ({
          text: option,
          onPress: () => onChange(option),
        })),
        { text: 'Cancelar', style: 'cancel' },
      ],
    );
  };

  return (
    <View style={styles.group}>
      <Text style={typography.authFieldLabel}>Como a Olívia te conhece?</Text>
      <TouchableOpacity style={styles.inputWrap} onPress={openPicker} activeOpacity={0.85}>
        <Feather name="heart" size={20} color={colors.sage} />
        <Text style={styles.value}>{value}</Text>
        <Feather name="chevron-down" size={16} color={colors.moss} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0D8E8',
    paddingHorizontal: spacing.md,
    height: 52,
    gap: spacing.sm + 4,
  },
  value: {
    flex: 1,
    ...typography.authInput,
    color: colors.moss,
  },
});
