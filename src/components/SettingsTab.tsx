import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface SettingsTabProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function SettingsTab({ darkMode, onToggleDarkMode }: SettingsTabProps) {
  const [apiKey, setApiKey] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState<'english' | 'vietnamese'>('english');
  const [keyTested, setKeyTested] = useState(false);

  const handleTestKey = () => {
    setKeyTested(true);
    setTimeout(() => setKeyTested(false), 2000);
  };

  const colors = {
    background: darkMode ? '#111827' : '#F9FAFB',
    headerBackground: darkMode ? '#111827' : '#F9FAFB',
    headerText: darkMode ? '#FFFFFF' : '#111827',
    cardBackground: darkMode ? '#1F2937' : '#FFFFFF',
    cardTitle: darkMode ? '#FFFFFF' : '#111827',
    cardSub: darkMode ? '#9CA3AF' : '#6B7280',
    inputBackground: darkMode ? '#374151' : '#F3F4F6',
    inputText: darkMode ? '#FFFFFF' : '#111827',
    inputPlaceholder: darkMode ? '#6B7280' : '#9CA3AF',
    primary: '#3B82F6',
    success: '#22C55E',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}> 
        <Text style={[styles.headerTitle, { color: colors.headerText }]}>Settings ⚙️</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.cardTitle }]}>AI Settings</Text>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}> 
            <Text style={{ fontSize: 12, marginBottom: 8, color: colors.cardSub }}>OpenAI API Key</Text>
            <TextInput
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="sk-..."
              placeholderTextColor={colors.inputPlaceholder}
              secureTextEntry
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText }]}
            />
            <TouchableOpacity onPress={handleTestKey} style={[styles.primaryButton, { backgroundColor: keyTested ? colors.success : colors.primary }]}> 
              <Text style={styles.primaryButtonText}>{keyTested ? 'Key Verified' : 'Test Key'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={[styles.sectionTitle, { color: colors.cardTitle }]}>Reading Preferences</Text>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}> 
            <View style={styles.rowBetween}>
              <Text style={{ fontSize: 12, color: colors.cardSub }}>Font Size</Text>
              <Text style={{ fontSize: 12, color: colors.cardSub }}>{fontSize}px</Text>
            </View>
            <View style={{ flexDirection: 'row', columnGap: 8, marginTop: 8 }}>
              <TouchableOpacity onPress={() => setFontSize(Math.max(12, fontSize - 1))} style={[styles.secondaryButton, { backgroundColor: colors.inputBackground }]}><Text style={{ color: colors.inputText }}>A-</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setFontSize(Math.min(24, fontSize + 1))} style={[styles.secondaryButton, { backgroundColor: colors.inputBackground }]}><Text style={{ color: colors.inputText }}>A+</Text></TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, color: colors.cardSub, marginTop: 8 }}>Theme</Text>
            <View style={{ flexDirection: 'row', columnGap: 8, marginTop: 8 }}>
              <TouchableOpacity onPress={() => !darkMode && onToggleDarkMode()} style={[styles.secondaryButton, { backgroundColor: darkMode ? colors.primary : colors.inputBackground }]}><Text style={{ color: darkMode ? '#FFFFFF' : colors.inputText }}>Dark</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => darkMode && onToggleDarkMode()} style={[styles.secondaryButton, { backgroundColor: !darkMode ? colors.primary : colors.inputBackground }]}><Text style={{ color: !darkMode ? '#FFFFFF' : colors.inputText }}>Light</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text style={[styles.sectionTitle, { color: colors.cardTitle }]}>Language</Text>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}> 
            <View style={{ flexDirection: 'row', columnGap: 8 }}>
              <TouchableOpacity onPress={() => setLanguage('english')} style={[styles.secondaryButton, { backgroundColor: language === 'english' ? colors.primary : colors.inputBackground }]}><Text style={{ color: language === 'english' ? '#FFFFFF' : colors.inputText }}>English</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage('vietnamese')} style={[styles.secondaryButton, { backgroundColor: language === 'vietnamese' ? colors.primary : colors.inputBackground }]}><Text style={{ color: language === 'vietnamese' ? '#FFFFFF' : colors.inputText }}>Tiếng Việt</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text style={[styles.sectionTitle, { color: colors.cardTitle }]}>About</Text>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}> 
            <View style={styles.rowBetween}><Text style={{ fontSize: 12, color: colors.cardSub }}>Version</Text><Text style={{ fontSize: 12, color: colors.cardTitle }}>1.0.0</Text></View>
            <View style={{ borderTopWidth: 1, borderTopColor: darkMode ? '#374151' : '#E5E7EB', paddingTop: 8 }}>
              <Text style={{ fontSize: 12, color: colors.cardSub }}>Contact</Text>
              <Text style={{ fontSize: 12, color: colors.cardTitle, marginTop: 4 }}>support@deepread.app</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: darkMode ? '#374151' : '#E5E7EB', paddingTop: 8 }}>
              <Text style={{ fontSize: 12, color: colors.cardSub }}>Made with ❤️ for book lovers everywhere</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 96 },
  header: { paddingHorizontal: 24, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { paddingHorizontal: 16, paddingVertical: 16, rowGap: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  card: { borderRadius: 16, padding: 12, rowGap: 12 },
  input: { borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  primaryButton: { borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '600' },
  secondaryButton: { borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 16 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
