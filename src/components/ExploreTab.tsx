import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  summary?: string;
  rating?: number;
}

interface ExploreTabProps {
  trendingBooks: Book[];
  recommendedBooks: Book[];
  darkMode: boolean;
}

export function ExploreTab({ trendingBooks, recommendedBooks, darkMode }: ExploreTabProps) {
  const colors = {
    background: darkMode ? '#111827' : '#F9FAFB',
    headerBackground: darkMode ? '#111827' : '#F9FAFB',
    headerText: darkMode ? '#FFFFFF' : '#111827',
    inputBackground: darkMode ? '#1F2937' : '#FFFFFF',
    inputText: darkMode ? '#FFFFFF' : '#111827',
    inputPlaceholder: darkMode ? '#6B7280' : '#9CA3AF',
    cardBackground: darkMode ? '#1F2937' : '#FFFFFF',
    cardTitle: darkMode ? '#FFFFFF' : '#111827',
    cardSub: darkMode ? '#9CA3AF' : '#6B7280',
    primary: '#3B82F6',
    secondaryBg: darkMode ? '#374151' : '#E5E7EB',
    secondaryText: darkMode ? '#D1D5DB' : '#374151',
  };
  const insets = useSafeAreaInsets();

  const bottomPadding = insets.bottom + 96;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingBottom: bottomPadding }]}> 
      <View style={[styles.header, { backgroundColor: colors.headerBackground, paddingTop: insets.top }]}> 
        <Text style={[styles.headerTitle, { color: colors.headerText }]}>Discover Great Books 🌟</Text>
        <View style={[styles.searchRow, { backgroundColor: colors.inputBackground }]}> 
          <Feather name="search" size={18} color={colors.inputPlaceholder} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search books or authors..."
            placeholderTextColor={colors.inputPlaceholder}
            style={[styles.input, { color: colors.inputText, flex: 1 }]}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 120 }]}>
        <View style={[styles.highlightCard, { backgroundColor: colors.primary }]}> 
          <View style={styles.highlightRow}>
            <View style={styles.highlightCover}>
              <ImageWithFallback src={trendingBooks[0]?.cover} alt={trendingBooks[0]?.title} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.highlightBadge}>
                <Feather name="book-open" size={14} color="#1E293B" />
                <Text style={styles.highlightBadgeText}>Today's Highlight</Text>
              </View>
              <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>{trendingBooks[0]?.title}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 12 }}>{trendingBooks[0]?.author}</Text>
              <TouchableOpacity style={styles.whiteButton}><Text style={{ color: colors.primary, fontWeight: '600' }}>Read Summary</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.headerRow}>
            <Feather name="trending-up" size={16} color={colors.cardSub} style={styles.headerIcon} />
            <Text style={[styles.sectionTitle, { color: colors.cardTitle }]}>Trending Books</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, columnGap: 12, paddingBottom: 8 }}> 
            {trendingBooks.map((book) => (
              <View key={book.id} style={[styles.trendCard, { backgroundColor: colors.cardBackground }]}> 
                <View style={{ aspectRatio: 3/4, backgroundColor: '#E5E7EB' }}>
                  <ImageWithFallback src={book.cover} alt={book.title} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ padding: 8 }}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 12, fontWeight: '700', color: colors.cardTitle, marginBottom: 4 }}>{book.title}</Text>
                  <Text style={{ fontSize: 12, color: colors.cardSub }}>{book.author}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <View style={styles.headerRow}>
            <Feather name="star" size={16} color={colors.cardSub} style={styles.headerIcon} />
            <Text style={[styles.sectionTitle, { color: colors.cardTitle }]}>AI Recommended Summaries</Text>
          </View>
          <View style={{ rowGap: 12 }}>
            {recommendedBooks.map((book) => (
              <View key={book.id} style={[styles.recoCard, { backgroundColor: colors.cardBackground }]}> 
                <View style={styles.recoRow}>
                  <View style={styles.recoCover}><ImageWithFallback src={book.cover} alt={book.title} style={{ width: '100%', height: '100%' }} /></View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 14, fontWeight: '700', color: colors.cardTitle, marginBottom: 4 }}>{book.title}</Text>
                    <Text style={{ fontSize: 12, color: colors.cardSub, marginBottom: 8 }}>{book.author}</Text>
                    <Text numberOfLines={3} style={{ fontSize: 12, color: darkMode ? '#D1D5DB' : '#4B5563', marginBottom: 12 }}>{book.summary}</Text>
                    <View style={{ flexDirection: 'row', columnGap: 8 }}>
                      <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]}><Text style={styles.primaryButtonText}>Read Summary</Text></TouchableOpacity>
                      <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: colors.secondaryBg }]}> 
                        <Feather name="plus" size={16} color={colors.secondaryText} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 96 },
  header: { paddingHorizontal: 24, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 0, borderRadius: 0, paddingVertical: 8, paddingHorizontal: 0 },
  searchRow: { borderRadius: 24, height: 44, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', elevation: 4, shadowColor: '#000000', shadowOpacity: 0.06, shadowRadius: 8 },
  content: { paddingHorizontal: 16, paddingVertical: 16, rowGap: 24 },
  highlightCard: { borderRadius: 20, padding: 16, elevation: 6, shadowColor: '#000000', shadowOpacity: 0.08, shadowRadius: 12 },
  highlightRow: { flexDirection: 'row', columnGap: 12, alignItems: 'flex-start' },
  highlightCover: { width: 96, height: 128, borderRadius: 12, overflow: 'hidden' },
  whiteButton: { backgroundColor: '#FFFFFF', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10, alignSelf: 'flex-start', elevation: 2 },
  highlightBadge: { flexDirection: 'row', columnGap: 8, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 10 },
  highlightBadgeText: { color: '#1E293B', fontSize: 12, fontWeight: '600' },
  headerRow: { flexDirection: 'row', alignItems: 'center', columnGap: 8, marginBottom: 12 },
  headerIcon: { top: 0, position: 'relative' },
  sectionTitle: { fontSize: 16, lineHeight: 16, fontWeight: '700' },
  trendCard: { width: 128, borderRadius: 14, overflow: 'hidden', elevation: 3, shadowColor: '#000000', shadowOpacity: 0.06, shadowRadius: 8 },
  recoCard: { borderRadius: 16, padding: 12 },
  recoRow: { flexDirection: 'row', columnGap: 12 },
  recoCover: { width: 80, height: 112, borderRadius: 8, overflow: 'hidden' },
  primaryButton: { flex: 1, borderRadius: 10, alignItems: 'center', paddingVertical: 8 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '600' },
  secondaryButton: { width: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
})
