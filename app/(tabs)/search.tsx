import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExploreGrid } from '@/components/ig/explore-grid';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useIGStore } from '@/state/ig-store';

export default function SearchScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [query, setQuery] = useState('');
  const { posts, getUserById } = useIGStore();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;

    return posts.filter((post) => {
      const author = getUserById(post.authorId);
      return (
        post.caption.toLowerCase().includes(q) ||
        author.username.toLowerCase().includes(q) ||
        author.name.toLowerCase().includes(q)
      );
    });
  }, [getUserById, posts, query]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Search</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search captions and people"
          placeholderTextColor={Colors[colorScheme].mutedText}
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            styles.input,
            {
              backgroundColor: Colors[colorScheme].card,
              borderColor: Colors[colorScheme].border,
              color: Colors[colorScheme].text,
            },
          ]}
        />
      </View>

      <ExploreGrid posts={filtered} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { paddingHorizontal: 14, paddingBottom: 10 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});

