import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography, shadows } from '../../theme';
import { RELATIONSHIP_OPTIONS, type Relationship } from '../../lib/authUtils';

interface Props {
  value: Relationship;
  onChange: (value: Relationship) => void;
}

export function RelationshipPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.group}>
      <Text style={typography.authFieldLabel}>Como a Olívia te conhece?</Text>
      <TouchableOpacity
        style={styles.inputWrap}
        onPress={() => setOpen(true)}
        activeOpacity={0.85}
      >
        <Feather name="heart" size={20} color={colors.sage} />
        <Text style={styles.value}>{value}</Text>
        <Feather name="chevron-down" size={16} color={colors.moss} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setOpen(false)} />
          <Pressable
            style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.xl) }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.handle} />
            <Text style={styles.title}>Como a Olívia te conhece?</Text>

            <View style={styles.options}>
              {RELATIONSHIP_OPTIONS.map((option) => {
                const selected = option === value;
                return (
                  <TouchableOpacity
                    key={option}
                    style={[styles.option, selected && styles.optionSelected]}
                    onPress={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                      {option}
                    </Text>
                    {selected ? (
                      <Feather name="check" size={18} color={colors.lavender} />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </View>
      </Modal>
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
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: colors.reactionSheet,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.reactionBorder,
    borderBottomWidth: 0,
    paddingTop: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    ...shadows.soft,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.reactionHandle,
    marginBottom: 4,
  },
  title: {
    ...typography.reactionPickerTitle,
    textAlign: 'center',
  },
  options: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#EDE6F3',
  },
  optionSelected: {
    borderColor: colors.lavender,
    backgroundColor: colors.reactionCellLavender,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: typography.authInput.fontFamily,
  },
  optionTextSelected: {
    color: colors.lavender,
    fontFamily: typography.authFieldLabel.fontFamily,
  },
});
