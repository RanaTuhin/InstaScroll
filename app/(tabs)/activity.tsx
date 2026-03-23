import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/ig/avatar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useIGStore } from '@/state/ig-store';

export default function ActivityScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const { notifications, getUserById } = useIGStore();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Activity</Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme].mutedText }]}>
          A simple notifications list (no backend)
        </Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(n) => n.id}
        renderItem={({ item }) => {
          const user = getUserById(item.fromUserId);
          return (
            <View style={[styles.row, { borderBottomColor: Colors[colorScheme].border }]}>
              <Avatar uri={user.avatarUri} size={44} />
              <View style={styles.rowText}>
                <Text style={[styles.rowTitle, { color: Colors[colorScheme].text }]}>
                  @{user.username}{' '}
                  <Text style={[styles.rowBody, { color: Colors[colorScheme].mutedText }]}>
                    {item.message}
                  </Text>
                </Text>
                <Text style={[styles.rowTime, { color: Colors[colorScheme].mutedText }]}>
                  {item.createdAtLabel}
                </Text>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: 14, paddingTop: 4, paddingBottom: 10 },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { marginTop: 4, fontSize: 13 },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowText: { flex: 1 },
  rowTitle: { fontSize: 14, fontWeight: '700' },
  rowBody: { fontSize: 14, fontWeight: '500' },
  rowTime: { fontSize: 12, marginTop: 4 },
});

