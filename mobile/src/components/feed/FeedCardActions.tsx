import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, shadows } from '../../theme';
import { formatReactionCount, getUniqueReactionEmojis } from '../../lib/feedUtils';

interface Reaction {
  emoji: string;
  user_id: string;
}

interface Props {
  reactions: Reaction[];
  myReaction: string | null;
  isMine?: boolean;
  downloading?: boolean;
  deleting?: boolean;
  onAdorePress: () => void;
  onDownloadPress: () => void;
  onDeletePress?: () => void;
}

export function FeedCardActions({
  reactions,
  myReaction,
  isMine,
  downloading,
  deleting,
  onAdorePress,
  onDownloadPress,
  onDeletePress,
}: Props) {
  const count = reactions.length;
  const emojis = getUniqueReactionEmojis(reactions);
  const countLabel = formatReactionCount(count);

  return (
    <View style={styles.wrap}>
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

      <View style={styles.tools}>
        <TouchableOpacity
          style={styles.toolBtn}
          onPress={onDownloadPress}
          disabled={downloading}
          activeOpacity={0.75}
        >
          {downloading ? (
            <ActivityIndicator size="small" color={colors.lavender} />
          ) : (
            <Ionicons name="download-outline" size={18} color={colors.lavender} />
          )}
          <Text style={styles.toolLabel}>{downloading ? 'Salvando…' : 'Salvar no álbum'}</Text>
        </TouchableOpacity>

        {isMine && onDeletePress ? (
          <TouchableOpacity
            style={styles.toolBtnDanger}
            onPress={onDeletePress}
            disabled={deleting}
            activeOpacity={0.75}
          >
            {deleting ? (
              <ActivityIndicator size="small" color="#B85C6A" />
            ) : (
              <Ionicons name="trash-outline" size={18} color="#B85C6A" />
            )}
            <Text style={styles.toolLabelDanger}>{deleting ? 'Excluindo…' : 'Excluir'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.reactionBorder,
    paddingTop: spacing.sm + 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
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
  tools: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  toolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.lilacLight,
  },
  toolBtnDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
    backgroundColor: '#F8E8EB',
  },
  toolLabel: {
    ...typography.caption,
    color: colors.lavender,
  },
  toolLabelDanger: {
    ...typography.caption,
    color: '#B85C6A',
  },
});
