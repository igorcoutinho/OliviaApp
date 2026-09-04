import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '../../theme';

interface Props {
  title: string;
  subtitle: string;
}

export function ScreenHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
