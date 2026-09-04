import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../theme';
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
  multipleImages?: boolean;
  onAdorePress: () => void;
  onDownloadPress: () => void;
  onDownloadAllPress?: () => void;
  onDeletePress?: () => void;
}

export function FeedCardActions({
  reactions,
  myReaction,
  isMine,
  downloading,
  deleting,
  multipleImages,
  onAdorePress,
  onDownloadPress,
  onDownloadAllPress,
  onDeletePress,
}: Props) {
  const count = reactions.length;
  const emojis = getUniqueReactionEmojis(reactions);
  const countLabel = formatReactionCount(count);

  return (
    <View style={styles.row}>
      <View style={styles.leftActions}>
        <TouchableOpacity onPress={onAdorePress} activeOpacity={0.75} style={styles.adoreShadow}>
          <LinearGradient
            colors={['#f5f0fa', '#f0edf8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.adoreBtn}
          >
            {myReaction ? (
              <>
                <Text style={styles.reactEmoji}>{myReaction}</Text>
                <Text style={typography.reactedLabel}>Reagi</Text>
              </>
            ) : (
              <>
                <Text style={styles.flowerIcon}>🌸</Text>
                <Text style={typography.adoreButton}>Reagir</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={onDownloadPress}
          disabled={downloading}
          activeOpacity={0.75}
        >
          {downloading ? (
            <ActivityIndicator size="small" color={colors.lavender} />
          ) : (
            <Ionicons name="download-outline" size={18} color={colors.lavender} />
          )}
        </TouchableOpacity>

        {multipleImages && onDownloadAllPress ? (
          <TouchableOpacity
            style={styles.iconBtnAll}
            onPress={onDownloadAllPress}
            disabled={downloading}
            activeOpacity={0.75}
          >
            <Ionicons name="albums-outline" size={16} color={colors.lavender} />
          </TouchableOpacity>
        ) : null}

        {isMine && onDeletePress ? (
          <TouchableOpacity
            style={styles.iconBtnDanger}
            onPress={onDeletePress}
            disabled={deleting}
            activeOpacity={0.75}
          >
            {deleting ? (
              <ActivityIndicator size="small" color="#B85C6A" />
            ) : (
              <Ionicons name="trash-outline" size={18} color="#B85C6A" />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      {count > 0 ? (
        <View style={styles.summary}>
          {emojis ? <Text style={styles.emojis}>{emojis}</Text> : null}
          <Text style={typography.reactionSummaryCount}>{countLabel}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.reactionBorder,
    paddingTop: spacing.sm + 4,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adoreShadow: {
    borderRadius: radius.pill,
    shadowColor: 'rgba(112,128,99,0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  adoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  flowerIcon: {
    fontSize: 16,
    lineHeight: 18,
  },
  reactEmoji: {
    fontSize: 16,
    lineHeight: 18,
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(200,180,215,0.5)',
    overflow: 'hidden',
  },
  iconBtnAll: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(200,180,215,0.5)',
    overflow: 'hidden',
  },
  iconBtnDanger: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(184,92,106,0.3)',
    overflow: 'hidden',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
  },
  emojis: {
    fontSize: 14,
    letterSpacing: 1,
  },
});
