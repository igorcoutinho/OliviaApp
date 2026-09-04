import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../theme';

interface Props {
  notificationCount?: number;
  onNotificationPress?: () => void;
}

export function FeedHeader({ notificationCount = 0, onNotificationPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Jardim da Olívia</Text>
        <Text style={styles.subtitle}>Momentos da festa · 1 ano</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notificações"
        hitSlop={8}
        onPress={onNotificationPress}
        style={styles.bellButton}
      >
        <Ionicons name="notifications-outline" size={20} color={colors.lavender} />
        {notificationCount > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {notificationCount > 9 ? '9+' : String(notificationCount)}
            </Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.screenLg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.reactionBorder,
    marginBottom: spacing.sm,
  },
  titleBlock: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 36,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.lavender,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    letterSpacing: 0.5,
    color: '#9b7db8',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  bellButton: {
    position: 'absolute',
    right: spacing.screenLg,
    top: spacing.sm,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ff4d4d',
    borderWidth: 2,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    color: colors.white,
    lineHeight: 11,
  },
});
