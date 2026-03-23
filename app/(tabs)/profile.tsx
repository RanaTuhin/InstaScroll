import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/ig/avatar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useIGStore } from '@/state/ig-store';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const { currentUser, posts } = useIGStore();

  const mine = posts.filter((p) => p.authorId === currentUser.id);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={[styles.header, { borderBottomColor: Colors[colorScheme].border }]}>
        <Text style={[styles.username, { color: Colors[colorScheme].text }]}>
          {currentUser.username}
        </Text>
      </View>

      <View style={styles.profileTop}>
        <Avatar uri={currentUser.avatarUri} size={86} />
        <View style={styles.stats}>
          <Stat label="Posts" value={mine.length} />
          <Stat label="Followers" value={1284} />
          <Stat label="Following" value={219} />
        </View>
      </View>

      <View style={styles.bio}>
        <Text style={[styles.name, { color: Colors[colorScheme].text }]}>{currentUser.name}</Text>
        <Text style={[styles.bioText, { color: Colors[colorScheme].mutedText }]}>
          Learning React Native by building an Instagram-style UI with Expo Router.
        </Text>
      </View>

      <View style={[styles.gridHeader, { borderTopColor: Colors[colorScheme].border }]}>
        <Text style={[styles.gridHeaderText, { color: Colors[colorScheme].mutedText }]}>
          Posts
        </Text>
      </View>

      <FlatList
        data={mine}
        keyExtractor={(p) => p.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/post/${item.id}`)}
            style={styles.gridItem}
          >
            <Image
              source={{ uri: item.imageUri }}
              style={[
                styles.gridThumb,
                { backgroundColor: Colors[colorScheme].card, borderColor: Colors[colorScheme].border },
              ]}
              contentFit="cover"
            />
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: Colors[colorScheme].mutedText }}>No posts yet. Tap + on Home.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: Colors[colorScheme].text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: Colors[colorScheme].mutedText }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  username: { fontSize: 20, fontWeight: '800' },
  profileTop: { flexDirection: 'row', paddingHorizontal: 14, paddingTop: 14, gap: 16 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
  stat: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  statValue: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 12, marginTop: 2 },
  bio: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 12 },
  name: { fontSize: 14, fontWeight: '700' },
  bioText: { marginTop: 4, fontSize: 13, lineHeight: 18 },
  gridHeader: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  gridHeaderText: { fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  gridItem: { width: '33.3333%' },
  gridThumb: { aspectRatio: 1, borderWidth: 1 },
  empty: { paddingHorizontal: 14, paddingVertical: 20 },
});
