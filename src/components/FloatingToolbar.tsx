import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface FloatingToolbarProps {
  onHighlight: () => void;
  onAddNote: () => void;
  onSummarize: () => void;
  onAskAI: () => void;
  darkMode: boolean;
}

export function FloatingToolbar({ 
  onHighlight, 
  onAddNote, 
  onSummarize, 
  onAskAI,
  darkMode,
  anchor,
}: FloatingToolbarProps & { anchor?: { x: number; y: number } }) {
  const colors = {
    container: darkMode ? '#1F2937' : '#FFFFFF',
    border: darkMode ? '#374151' : '#E5E7EB',
    label: darkMode ? '#D1D5DB' : '#374151',
    highlight: darkMode ? '#06B6D4' : '#3B82F6',
  };

  return (
    <View style={styles.overlay}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.container, borderColor: colors.border },
          anchor ? { position: Platform.OS === 'web' ? 'fixed' : 'absolute', top: anchor.y - 60, left: anchor.x - 150, width: 300, zIndex: 9999 } : null,
        ]}
      > 
        <TouchableOpacity onPress={onHighlight} style={styles.item}>
          <Feather name="highlighter" size={16} color={colors.highlight} />
          <Text style={[styles.itemText, { color: colors.label }]}>Highlight</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddNote} style={styles.item}>
          <Feather name="file-text" size={16} color={colors.highlight} />
          <Text style={[styles.itemText, { color: colors.label }]}>Note</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSummarize} style={styles.item}>
          <Feather name="zap" size={16} color={colors.highlight} />
          <Text style={[styles.itemText, { color: colors.label }]}>Summarize</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAskAI} style={styles.item}>
          <Feather name="message-circle" size={16} color={colors.highlight} />
          <Text style={[styles.itemText, { color: colors.label }]}>Ask AI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    columnGap: 8,
    elevation: 8,
    position: 'relative',
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  itemText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
