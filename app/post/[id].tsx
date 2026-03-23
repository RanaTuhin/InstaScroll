import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/ig/avatar';
import { PostCard } from '@/components/ig/post-card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useIGStore } from '@/state/ig-store';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const { getPostById, getUserById, addComment } = useIGStore();
  const [comment, setComment] = useState('');

  const post = useMemo(() => (id ? getPostById(id) : null), [getPostById, id]);

  if (!post) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: Colors[colorScheme].background }]}>
        <View style={styles.missing}>
          <Text style={{ color: Colors[colorScheme].text, fontSize: 16, fontWeight: '700' }}>
            Post not found
          </Text>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={{ color: Colors[colorScheme].tint, fontWeight: '700' }}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const author = getUserById(post.authorId);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors[colorScheme].background }]}>
      <PostCard post={post} author={author} onPressComment={() => {}} hideCommentCta />

      <View style={[styles.commentsHeader, { borderTopColor: Colors[colorScheme].border }]}>
        <Text style={[styles.commentsTitle, { color: Colors[colorScheme].text }]}>Comments</Text>
      </View>

      <View style={styles.commentsList}>
        {post.comments.length === 0 ? (
          <Text style={{ color: Colors[colorScheme].mutedText }}>Be the first to comment.</Text>
        ) : (
          post.comments.map((c) => {
            const user = getUserById(c.userId);
            return (
              <View key={c.id} style={styles.commentRow}>
                <Avatar uri={user.avatarUri} size={34} />
                <View style={styles.commentBody}>
                  <Text style={[styles.commentUser, { color: Colors[colorScheme].text }]}>
                    @{user.username}{' '}
                    <Text style={[styles.commentText, { color: Colors[colorScheme].mutedText }]}>
                      {c.text}
                    </Text>
                  </Text>
                  <Text style={[styles.commentTime, { color: Colors[colorScheme].mutedText }]}>
                    {c.createdAtLabel}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>

      <View style={[styles.composer, { borderTopColor: Colors[colorScheme].border }]}>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Add a comment…"
          placeholderTextColor={Colors[colorScheme].mutedText}
          style={[
            styles.input,
            { color: Colors[colorScheme].text, backgroundColor: Colors[colorScheme].card },
          ]}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            const text = comment.trim();
            if (!text) return;
            addComment(post.id, text);
            setComment('');
          }}
          style={styles.send}
        >
          <Ionicons name="send" size={18} color={Colors[colorScheme].tint} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  missing: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 14 },
  backButton: { paddingVertical: 10, paddingHorizontal: 12 },
  commentsHeader: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  commentsTitle: { fontSize: 16, fontWeight: '800' },
  commentsList: { paddingHorizontal: 14, paddingBottom: 12, gap: 12 },
  commentRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  commentBody: { flex: 1 },
  commentUser: { fontSize: 14, fontWeight: '700' },
  commentText: { fontSize: 14, fontWeight: '500' },
  commentTime: { fontSize: 12, marginTop: 4 },
  composer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: { flex: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  send: { padding: 10 },
});

