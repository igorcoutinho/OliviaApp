import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../theme';
import { CommentRow } from './CommentRow';
import { KEYBOARD_DONE_ACCESSORY_ID } from '../ui/KeyboardDoneAccessory';
import type { CommentItem } from '../../api/comments.api';

interface Props {
  topComment: CommentItem | null;
  commentsCount: number;
  myAvatarUrl?: string | null;
  myUserId?: string;
  submitting?: boolean;
  onOpenAll: () => void;
  onSubmit: (body: string) => void;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
}

export function FeedCommentsPreview({
  topComment,
  commentsCount,
  myAvatarUrl,
  submitting,
  onOpenAll,
  onSubmit,
  onLike,
  onDislike,
  onDelete,
}: Props) {
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    const body = draft.trim();
    if (!body || submitting) return;
    onSubmit(body);
    setDraft('');
  };

  return (
    <View style={styles.wrap}>
      {topComment ? (
        <CommentRow
          item={topComment}
          compact
          onLike={() => onLike(topComment.id)}
          onDislike={() => onDislike(topComment.id)}
          onDelete={onDelete ? () => onDelete(topComment.id) : undefined}
        />
      ) : null}

      {commentsCount > 0 ? (
        <Pressable onPress={onOpenAll}>
          <Text style={styles.viewAll}>
            {commentsCount === 1
              ? 'Ver 1 comentário'
              : `Ver todos os ${commentsCount} comentários`}
          </Text>
        </Pressable>
      ) : null}

      <View style={styles.inputRow}>
        <View style={styles.avatar}>
          {myAvatarUrl ? (
            <Image
              source={{ uri: myAvatarUrl }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          ) : (
            <Ionicons name="person" size={12} color={colors.lavender} />
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Adicionar comentário..."
          placeholderTextColor="#9b7db8"
          value={draft}
          onChangeText={setDraft}
          multiline
          maxLength={1000}
          inputAccessoryViewID={KEYBOARD_DONE_ACCESSORY_ID}
        />
        <Pressable onPress={handleSend} hitSlop={8} disabled={submitting || !draft.trim()}>
          {submitting ? (
            <ActivityIndicator size="small" color={colors.lavender} />
          ) : (
            <Ionicons
              name="send"
              size={18}
              color={draft.trim() ? colors.lavender : '#c8b4d7'}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    gap: 8,
  },
  viewAll: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: '#9b7db8',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.reactionBorder,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f2edf8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    color: '#6b4d8a',
    maxHeight: 80,
    paddingVertical: 0,
  },
});
