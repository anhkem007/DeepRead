import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

interface ISBNSearchTabProps {
  darkMode: boolean;
}

export function ISBNSearchTab({ darkMode }: ISBNSearchTabProps) {
  const [isbn, setIsbn] = useState('');
  const insets = useSafeAreaInsets();

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
  };

  const bottomPadding = insets.bottom + 96;

  const handleSearch = () => {
    // TODO: Implement ISBN search
    console.log('Searching for ISBN:', isbn);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingBottom: bottomPadding }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBackground, paddingTop: insets.top }]}>
        <Text style={[styles.headerTitle, { color: colors.headerText }]}>Search by ISBN 🔍</Text>
      </View>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 120 }]}>
        <View style={[styles.searchCard, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.label, { color: colors.cardSub }]}>Enter ISBN</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground }]}>
            <Feather name="search" size={20} color={colors.inputPlaceholder} style={{ marginRight: 12 }} />
            <TextInput
              value={isbn}
              onChangeText={setIsbn}
              placeholder="e.g., 978-0-123456-78-9"
              placeholderTextColor={colors.inputPlaceholder}
              style={[styles.input, { color: colors.inputText }]}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            onPress={handleSearch}
            style={[styles.searchButton, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
          <Feather name="info" size={20} color={colors.primary} style={{ marginBottom: 8 }} />
          <Text style={[styles.infoTitle, { color: colors.cardTitle }]}>About ISBN Search</Text>
          <Text style={[styles.infoText, { color: colors.cardSub }]}>
            Enter a valid ISBN (International Standard Book Number) to search for book information.
            You can find the ISBN on the back cover or copyright page of a book.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 24, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { paddingHorizontal: 16, paddingVertical: 24, rowGap: 16 },
  searchCard: { borderRadius: 16, padding: 16, rowGap: 12 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  input: { flex: 1, fontSize: 16 },
  searchButton: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  searchButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  infoCard: { borderRadius: 16, padding: 16, alignItems: 'center' },
  infoTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  infoText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
