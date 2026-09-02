import { View, Text, StyleSheet, Image } from 'react-native';
import type { PhotoFeedItem } from '../../types';
import { colors, radius, spacing, shadows, typography } from '../../theme';
import { FeedCardAuthor } from './FeedCardAuthor';
import { FeedCardActions } from './FeedCardActions';

interface Props {
  item: PhotoFeedItem;
  onAdorePress: () => void;
}

export function FeedCard({ item, onAdorePress }: Props) {
  return (
    <View style={styles.card}>
      <FeedCardAuthor fullName={item.author.full_name} createdAt={item.created_at} />

      <Image source={{ uri: item.url }} style={styles.image} />

      {item.caption ? (
        <Text style={typography.postCaption}>{item.caption}</Text>
      ) : null}

      <FeedCardActions
        reactions={item.reactions}
        myReaction={item.myReaction}
        onAdorePress={onAdorePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
    ...shadows.soft,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: radius.md,
    backgroundColor: colors.creamMid,
  },
});
