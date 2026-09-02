import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';
import { ProfileAvatar } from './ProfileAvatar';

interface Props {
  fullName: string;
  username: string;
  avatarUrl?: string | null;
  onAvatarPress: () => void;
  avatarLoading?: boolean;
}

export function ProfileCard({
  fullName,
  username,
  avatarUrl,
  onAvatarPress,
  avatarLoading,
}: Props) {
  return (
    <View style={styles.card}>
      <ProfileAvatar
        name={fullName}
        avatarUrl={avatarUrl}
        onPress={onAvatarPress}
        loading={avatarLoading}
      />
      <View style={styles.meta}>
        <Text style={typography.profileName}>{fullName} 🌸</Text>
        <Text style={typography.profileHandle}>@{username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm + 4,
    ...shadows.soft,
  },
  meta: {
    alignItems: 'center',
    gap: 4,
  },
});
