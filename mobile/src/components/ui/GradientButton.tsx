import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { colors, radius, typography, gradients, shadows } from '../../theme';

type Variant = 'sage' | 'lavender';
type Size = 'md' | 'sm';

const VARIANT_CONFIG = {
  sage: { gradient: gradients.button, shadow: shadows.gradientButton },
  lavender: { gradient: gradients.buttonLavender, shadow: shadows.gradientButtonLavender },
} as const satisfies Record<Variant, {
  gradient: (typeof gradients)[keyof typeof gradients];
  shadow: (typeof shadows)[keyof typeof shadows];
}>;

interface Props {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  variant?: Variant;
  size?: Size;
}

export function GradientButton({
  label,
  onPress,
  loading,
  disabled,
  icon,
  style,
  fullWidth = true,
  variant = 'sage',
  size = 'md',
}: Props) {
  const config = VARIANT_CONFIG[variant];
  const isSmall = size === 'sm';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      <View style={[styles.shadow, config.shadow]}>
        <LinearGradient
          colors={[...config.gradient.colors]}
          locations={[...config.gradient.locations]}
          start={config.gradient.start}
          end={config.gradient.end}
          style={[styles.gradient, isSmall && styles.gradientSm]}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <View style={styles.content}>
              {icon ? <Feather name={icon} size={20} color={colors.white} /> : null}
              <Text style={[typography.button, isSmall && styles.labelSm]}>{label}</Text>
            </View>
          )}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  shadow: {
    borderRadius: radius.pill,
  },
  gradient: {
    height: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  gradientSm: {
    height: 52,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelSm: {
    fontSize: 14,
  },
  disabled: {
    opacity: 0.55,
  },
});
