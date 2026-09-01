import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { colors, radius, fontSize, spacing } from '../../theme';

const baseStyle = {
  borderLeftWidth: 4,
  borderRadius: radius.md,
  height: 60,
  width: '90%' as const,
};

export const toastConfig = {
  success: (props: React.ComponentProps<typeof BaseToast>) => (
    <BaseToast
      {...props}
      style={{ ...baseStyle, borderLeftColor: colors.sageDark, backgroundColor: colors.surface }}
      contentContainerStyle={{ paddingHorizontal: spacing.md }}
      text1Style={{ fontSize: fontSize.md, fontWeight: '600', color: colors.text }}
      text2Style={{ fontSize: fontSize.sm, color: colors.textSecondary }}
    />
  ),
  error: (props: React.ComponentProps<typeof ErrorToast>) => (
    <ErrorToast
      {...props}
      style={{ ...baseStyle, borderLeftColor: colors.error, backgroundColor: colors.errorLight }}
      contentContainerStyle={{ paddingHorizontal: spacing.md }}
      text1Style={{ fontSize: fontSize.md, fontWeight: '600', color: colors.error }}
    />
  ),
  info: (props: React.ComponentProps<typeof InfoToast>) => (
    <InfoToast
      {...props}
      style={{ ...baseStyle, borderLeftColor: colors.lavender, backgroundColor: colors.lavenderLight }}
      contentContainerStyle={{ paddingHorizontal: spacing.md }}
      text1Style={{ fontSize: fontSize.md, fontWeight: '600', color: colors.olive }}
    />
  ),
};
