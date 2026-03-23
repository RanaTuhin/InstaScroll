import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useMemo } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useIGStore } from '@/state/ig-store';

const { height: screenHeight } = Dimensions.get('window');

export default function ReelsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const { posts, getUserById } = useIGStore();

  const reels = useMemo(() => posts.slice(0, 10), [posts]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors[colorScheme].background }]}>
      <FlatList
        data={reels}
        keyExtractor={(post) => post.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const author = getUserById(item.authorId);
          return (
            <View style={[styles.reel, { height: screenHeight - 40 }]}>
              <Image source={{ uri: item.imageUri }} style={styles.reelImage} contentFit="cover" />
              <View style={styles.overlay}>
                <View style={styles.overlayLeft}>
                  <Text style={styles.overlayUser}>@{author.username}</Text>
                  <Text style={styles.overlayCaption} numberOfLines={2}>
                    {item.caption}
                  </Text>
                </View>
                <View style={styles.overlayRight}>
                  <Ionicons name="heart-outline" size={30} color="#fff" />
                  <Ionicons name="chatbubble-outline" size={30} color="#fff" />
                  <Ionicons name="paper-plane-outline" size={30} color="#fff" />
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  reel: { width: '100%', backgroundColor: '#000' },
  reelImage: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  overlayLeft: { flex: 1, paddingRight: 10 },
  overlayUser: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 6 },
  overlayCaption: { color: '#fff', fontSize: 14, opacity: 0.95 },
  overlayRight: { gap: 14, alignItems: 'center' },
});

