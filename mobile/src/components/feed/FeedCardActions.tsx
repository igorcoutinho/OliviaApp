import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';
import { formatReactionCount, getUniqueReactionEmojis } from '../../lib/feedUtils';

interface Reaction {
  emoji: string;
  user_id: string;
}

interface Props {
  reactions: Reaction[];
  myReaction: string | null;
  onAdorePress: () => void;
}

export function FeedCardActions({ reactions, myReaction, onAdorePress }: Props) {
  const count = reactions.length;
  const emojis = getUniqueReactionEmojis(reactions);
  const countLabel = formatReactionCount(count);

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.reactBtn, myReaction && styles.reactBtnActive]}
        onPress={onAdorePress}
        activeOpacity={0.75}
      >
        {myReaction ? (
          <View style={styles.reactBtnContent}>
            <Text style={styles.reactEmoji}>{myReaction}</Text>
            <Text style={typography.reactedLabel}>Adorei</Text>
          </View>
        ) : (
          <Text style={typography.adoreButton}>Reagir</Text>
        )}
      </TouchableOpacity>

      {count > 0 && (
        <View style={styles.summary}>
          {emojis ? <Text style={styles.emojis}>{emojis}</Text> : null}
          <Text style={typography.reactionSummaryCount}>{countLabel}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.reactionBorder,
    paddingTop: spacing.sm + 4,
  },
  reactBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.reactionBorder,
  },
  reactBtnActive: {
    backgroundColor: colors.reactionCellLavender,
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
    ...shadows.reactedButton,
  },
  reactBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reactEmoji: {
    fontSize: 16,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  emojis: {
    fontSize: 14,
    letterSpacing: 1,
  },
});
