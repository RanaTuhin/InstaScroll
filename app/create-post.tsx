import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useIGStore } from '@/state/ig-store';

export default function CreatePostModal() {
  const colorScheme = useColorScheme() ?? 'light';
  const { addPost } = useIGStore();
  const [caption, setCaption] = useState('');

  const previewUri = useMemo(() => {
    const seed = Math.round(Math.random() * 10_000);
    return `https://picsum.photos/seed/insta-${seed}/1080/1080`;
  }, []);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>New post</Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme].mutedText }]}>
          This clone uses mock data. “Share” creates a new post locally.
        </Text>

        <Text style={[styles.label, { color: Colors[colorScheme].mutedText }]}>Caption</Text>
        <TextInput
          value={caption}
          onChangeText={setCaption}
          placeholder="Write a caption…"
          placeholderTextColor={Colors[colorScheme].mutedText}
          style={[
            styles.input,
            {
              backgroundColor: Colors[colorScheme].card,
              borderColor: Colors[colorScheme].border,
              color: Colors[colorScheme].text,
            },
          ]}
          multiline
        />

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={[styles.button, { borderColor: Colors[colorScheme].border }]}
          >
            <Text style={[styles.buttonText, { color: Colors[colorScheme].text }]}>Cancel</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              addPost(caption.trim() || 'A new post ✨', previewUri);
              router.back();
            }}
            style={[styles.button, { backgroundColor: Colors[colorScheme].tint }]}
          >
            <Text style={[styles.buttonText, { color: Colors[colorScheme].tintText }]}>Share</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { paddingHorizontal: 14, paddingTop: 10, gap: 10 },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 13, lineHeight: 18 },
  label: { marginTop: 10, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, minHeight: 120 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  button: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { fontSize: 15, fontWeight: '800' },
});

