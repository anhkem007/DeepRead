import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomReaderToolbarProps {
  darkMode: boolean;
  onOpenTOC?: () => void;
  onOpenNotes?: () => void;
  onOpenAI?: () => void;
  onOpenSettings?: () => void;
}

export function BottomReaderToolbar({ darkMode, onOpenTOC, onOpenNotes, onOpenAI, onOpenSettings }: BottomReaderToolbarProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const tools = [
    { id: 'toc', label: 'Contents', icon: 'book-open' as const },
    { id: 'notes', label: 'Notes', icon: 'file-text' as const },
    { id: 'ai', label: 'AI Chat', icon: 'message-square' as const },
    { id: 'settings', label: 'Settings', icon: 'settings' as const },
  ];

  const handleClick = (id: string) => {
    setActiveItem(id);
    if (id === 'toc') onOpenTOC && onOpenTOC();
    if (id === 'notes') onOpenNotes && onOpenNotes();
    if (id === 'ai') onOpenAI && onOpenAI();
    if (id === 'settings') onOpenSettings && onOpenSettings();
  };

  const colors = {
    barBackground: darkMode ? '#111827' : '#FFFFFF',
    border: darkMode ? '#1F2937' : '#E5E7EB',
    active: darkMode ? '#06B6D4' : '#3B82F6',
    inactive: darkMode ? '#6B7280' : '#9CA3AF',
  };

  return (
    <View style={[styles.bar, { backgroundColor: colors.barBackground, borderTopColor: colors.border, paddingBottom: insets.bottom }]}>
      <View style={styles.row}>
        {tools.map((tool) => {
          const isActive = activeItem === tool.id;
          return (
            <TouchableOpacity key={tool.id} onPress={() => handleClick(tool.id)} style={styles.item}>
              <Feather name={tool.icon} size={20} color={isActive ? colors.active : colors.inactive} />
              <Text style={[styles.label, { color: isActive ? colors.active : colors.inactive }]}>{tool.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
  },
  row: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 480,
    alignSelf: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    rowGap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
