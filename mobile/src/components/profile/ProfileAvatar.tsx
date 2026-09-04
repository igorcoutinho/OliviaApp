import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface Props {
  name: string;
  avatarUrl?: string | null;
  userId?: string;
  onPress: () => void;
  loading?: boolean;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function ProfileAvatar({ name, avatarUrl, userId, onPress, loading }: Props) {
  const cacheKey = `avatar-${userId ?? name}`;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} disabled={loading}>
      <LinearGradient
        colors={[colors.sage, colors.lavender, colors.lilacLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ring}
      >
        <View style={styles.inner}>
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl, cacheKey }}
              style={styles.image}
              contentFit="cover"
              cachePolicy="memory-disk"
              recyclingKey={cacheKey}
              transition={0}
            />
          ) : (
            <Text style={styles.initials}>{getInitials(name)}</Text>
          )}
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator color={colors.white} />
            </View>
          )}
        </View>
      </LinearGradient>
      <View style={styles.badge}>
        <Ionicons name="camera" size={14} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
}

const AVATAR_SIZE = 88;

const styles = StyleSheet.create({
  ring: {
    width: AVATAR_SIZE + 8,
    height: AVATAR_SIZE + 8,
    borderRadius: (AVATAR_SIZE + 8) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  initials: {
    ...typography.h2,
    color: colors.lavender,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
});
