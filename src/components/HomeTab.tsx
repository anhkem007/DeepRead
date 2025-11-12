import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number;
  format: 'PDF' | 'ePub';
}

interface HomeTabProps {
  books: Book[];
  onAddBook: () => void;
  onReadBook: (book: Book) => void;
  darkMode: boolean;
}

export function HomeTab({ books, onAddBook, onReadBook, darkMode }: HomeTabProps) {
  const colors = {
    background: darkMode ? '#111827' : '#F9FAFB',
    headerBackground: darkMode ? '#111827' : '#F9FAFB',
    headerText: darkMode ? '#FFFFFF' : '#111827',
    cardBackground: darkMode ? '#1F2937' : '#FFFFFF',
    cardTitle: darkMode ? '#FFFFFF' : '#111827',
    cardSub: darkMode ? '#9CA3AF' : '#6B7280',
    progressTrack: darkMode ? '#374151' : '#E5E7EB',
    progressFill: '#3B82F6',
    buttonPrimaryBg: '#3B82F6',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondaryBg: darkMode ? '#374151' : '#E5E7EB',
    buttonSecondaryText: darkMode ? '#D1D5DB' : '#374151',
  };

  const renderItem = ({ item }: { item: Book }) => (
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}> 
      <View style={styles.cover}>
        <ImageWithFallback src={item.cover} alt={item.title} style={styles.coverImage} />
        <View style={styles.badge}><Text style={styles.badgeText}>{item.format}</Text></View>
      </View>
      <View style={styles.cardBody}>
        <Text numberOfLines={2} style={[styles.cardTitle, { color: colors.cardTitle }]}>{item.title}</Text>
        <Text style={[styles.cardSub, { color: colors.cardSub }]}>{item.author}</Text>
        <View style={styles.progressBlock}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { color: colors.cardSub }]}>Progress</Text>
            <Text style={[styles.progressLabel, { color: colors.cardSub }]}>{item.progress}%</Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: colors.progressTrack }]}> 
            <View style={[styles.progressFill, { width: `${item.progress}%`, backgroundColor: colors.progressFill }]} />
          </View>
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => onReadBook(item)} style={[styles.button, { backgroundColor: colors.buttonPrimaryBg }]}> 
            <Text style={[styles.buttonText, { color: colors.buttonPrimaryText }]}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.buttonSecondaryBg }]}> 
            <Text style={[styles.buttonText, { color: colors.buttonSecondaryText }]}>Summarize</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}> 
        <Text style={[styles.headerTitle, { color: colors.headerText }]}>Your Library 📚</Text>
      </View>
      {books.length === 0 ? (
        <View style={styles.emptyState}> 
          <Text style={[styles.emptyText, { color: colors.cardSub }]}>No books yet</Text>
          <Text style={[styles.emptySubText, { color: colors.cardSub }]}>Tap + to add one</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={books}
          keyExtractor={(b) => b.id}
          renderItem={renderItem}
          numColumns={2}
        />
      )}
      <TouchableOpacity onPress={onAddBook} style={styles.fab}> 
        <Feather name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 96 },
  header: { paddingHorizontal: 24, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  list: { paddingHorizontal: 16, paddingVertical: 16, rowGap: 16 },
  card: { flex: 1, borderRadius: 16, overflow: 'hidden', marginHorizontal: 8 },
  cover: { aspectRatio: 3/4, backgroundColor: '#E5E7EB' },
  coverImage: { width: '100%', height: '100%' },
  badge: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: '#FFFFFF', fontSize: 10 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  cardSub: { fontSize: 12, marginBottom: 12 },
  progressBlock: { marginBottom: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 12 },
  progressTrack: { height: 6, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 999 },
  actionsRow: { flexDirection: 'row', columnGap: 8 },
  button: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center' },
  buttonText: { fontSize: 12, fontWeight: '600' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyText: { fontSize: 16, marginBottom: 8 },
  emptySubText: { fontSize: 12 },
  fab: { position: 'absolute', bottom: 96, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', elevation: 8 },
  fabText: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
});
