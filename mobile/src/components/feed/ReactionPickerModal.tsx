import {
  Modal, View, Text, StyleSheet, TouchableOpacity, Pressable,
} from 'react-native';
import { colors, radius, spacing, typography, shadows, REACTIONS } from '../../theme';

const EMOJI_ROWS = [
  REACTIONS.slice(0, 4),
  REACTIONS.slice(4, 8),
] as const;

const CELL_BACKGROUNDS = [colors.reactionCellLavender, colors.reactionCellSage] as const;

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
}

export function ReactionPickerModal({ visible, onClose, onSelect }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <Text style={typography.reactionPickerTitle}>Escolha seu carinho</Text>

          <View style={styles.grid}>
            {EMOJI_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((emoji, colIndex) => {
                  const bgIndex = (rowIndex + colIndex) % 2;
                  return (
                    <TouchableOpacity
                      key={emoji}
                      style={[
                        styles.cell,
                        { backgroundColor: CELL_BACKGROUNDS[bgIndex] },
                      ]}
                      onPress={() => {
                        onSelect(emoji);
                        onClose();
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.emoji}>{emoji}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: spacing.xl,
    gap: spacing.md,
    alignItems: 'center',
    ...shadows.reactionSheet,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.reactionHandle,
  },
  grid: {
    width: '100%',
    gap: spacing.sm + 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm + 4,
  },
  cell: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.reactionBorder,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.reactionCell,
  },
  emoji: {
    fontSize: 28,
  },
});
