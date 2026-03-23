import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PostCard } from "@/components/ig/post-card";
import { StoryBar } from "@/components/ig/story-bar";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useIGStore } from "@/state/ig-store";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const { posts, getUserById } = useIGStore();

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: Colors[colorScheme].background }]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: Colors[colorScheme].border },
        ]}
      >
        <View style={styles.brand}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.brandIcon}
            contentFit="contain"
          />
          <Text style={[styles.brandText, { color: Colors[colorScheme].text }]}>
            InstaScroll
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/create-post")}
            style={styles.headerIconButton}
          >
            <Ionicons
              name="add-circle-outline"
              size={26}
              color={Colors[colorScheme].text}
            />
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.headerIconButton}>
            <Ionicons
              name="heart-outline"
              size={24}
              color={Colors[colorScheme].text}
            />
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.headerIconButton}>
            <Ionicons
              name="paper-plane-outline"
              size={24}
              color={Colors[colorScheme].text}
            />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        ListHeaderComponent={<StoryBar />}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            author={getUserById(item.authorId)}
            onPressComment={() => router.push(`/post/${item.id}`)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={[
              styles.separator,
              { backgroundColor: Colors[colorScheme].border },
            ]}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 14,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandIcon: { width: 24, height: 24, borderRadius: 6 },
  brandText: { fontSize: 20, fontWeight: "800", letterSpacing: 0.2 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  headerIconButton: { padding: 6 },
  listContent: { paddingBottom: 24 },
  separator: { height: StyleSheet.hairlineWidth },
});
