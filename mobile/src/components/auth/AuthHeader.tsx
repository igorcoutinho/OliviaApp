import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface Props {
  title: string;
  subtitle: string;
  note: string;
}

export function AuthHeader({ title, subtitle, note }: Props) {
  return (
    <>
      <View style={styles.avatarGlow}>
        <Image source={require('../../../assets/olivia.png')} style={styles.avatar} />
      </View>
      <View style={styles.titleBlock}>
        <Text style={typography.authTitle}>{title}</Text>
        <Text style={typography.authSubtitle}>{subtitle}</Text>
        <Text style={typography.authNote}>{note}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  avatarGlow: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lilacLight,
    borderWidth: 2.5,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  titleBlock: {
    alignItems: 'center',
    gap: 4,
    width: '100%',
  },
});
