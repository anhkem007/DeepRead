import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookResult {
  title: string;
  author: string;
  year: string;
  cover: string;
  description: string;
}

interface ISBNSearchTabProps {
  darkMode: boolean;
}

export function ISBNSearchTab({ darkMode }: ISBNSearchTabProps) {
  const [isbn, setIsbn] = useState('');
  const [result, setResult] = useState<BookResult | null>(null);

  const handleSearch = () => {
    setResult({
      title: 'The Art of Computer Programming',
      author: 'Donald E. Knuth',
      year: '1968',
      cover: 'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2Mjc3MzE3NXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A comprehensive monograph written by Donald Knuth that covers many kinds of programming algorithms and their analysis. Knuth began the project, originally conceived as a single book with twelve chapters, in 1962.'
    });
  };

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}> 
        <Text style={[styles.headerTitle, { color: colors.headerText }]}>Find Book by ISBN 🔍</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ rowGap: 16 }}>
          <View>
            <Text style={{ fontSize: 12, marginBottom: 8, color: colors.cardSub }}>ISBN Number</Text>
            <TextInput
              value={isbn}
              onChangeText={setIsbn}
              placeholder="Enter ISBN (e.g., 978-0-201-03801-3)"
              placeholderTextColor={colors.inputPlaceholder}
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText }]}
            />
          </View>
          <View style={{ flexDirection: 'row', columnGap: 12 }}>
            <TouchableOpacity onPress={handleSearch} style={[styles.primaryButton, { backgroundColor: colors.primary }]}> 
              <Feather name="search" size={16} color="#FFFFFF" />
              <Text style={[styles.primaryButtonText, { marginLeft: 6 }]}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: colors.secondaryBg }]}> 
              <Feather name="camera" size={16} color={colors.secondaryText} />
              <Text style={{ color: colors.secondaryText, marginLeft: 6 }}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {result && (
          <View style={[styles.resultCard, { backgroundColor: colors.cardBackground }]}> 
            <View style={{ aspectRatio: 16/9, backgroundColor: '#E5E7EB' }}>
              <ImageWithFallback src={result.cover} alt={result.title} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: 'row', columnGap: 12, marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: colors.cardTitle, marginBottom: 4 }}>{result.title}</Text>
                  <Text style={{ fontSize: 12, color: colors.cardSub, marginBottom: 4 }}>by {result.author}</Text>
                  <Text style={{ fontSize: 12, color: colors.cardSub }}>Published: {result.year}</Text>
                </View>
              </View>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 12, color: colors.cardSub, marginBottom: 8 }}>Description</Text>
                <Text style={{ fontSize: 12, color: darkMode ? '#D1D5DB' : '#4B5563' }}>{result.description}</Text>
              </View>
              <View style={{ flexDirection: 'row', columnGap: 12 }}>
                <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]}> 
                  <Feather name="plus" size={16} color="#FFFFFF" />
                  <Text style={[styles.primaryButtonText, { marginLeft: 6 }]}>Add to Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: colors.secondaryBg }]}> 
                  <Feather name="zap" size={16} color={colors.secondaryText} />
                  <Text style={{ color: colors.secondaryText, marginLeft: 6 }}>Summarize with AI</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {!result && (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 48 }}>
            <Text style={{ color: colors.cardSub, marginBottom: 8 }}>Enter an ISBN to search</Text>
            <Text style={{ color: colors.cardSub, fontSize: 12, textAlign: 'center', maxWidth: 320 }}>You can also scan a barcode using your camera</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 96 },
  header: { paddingHorizontal: 24, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { paddingHorizontal: 16, paddingVertical: 16, rowGap: 24 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  primaryButton: { flex: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '600' },
  secondaryButton: { paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  resultCard: { borderRadius: 16, overflow: 'hidden' },
});
