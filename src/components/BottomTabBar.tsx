import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomTabBarProps {
  activeTab: 'home' | 'explore' | 'isbn' | 'settings';
  onTabChange: (tab: 'home' | 'explore' | 'isbn' | 'settings') => void;
  darkMode: boolean;
}

export function BottomTabBar({ activeTab, onTabChange, darkMode }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const tabs = [
    { id: 'home' as const, label: 'Home' },
    { id: 'explore' as const, label: 'Explore' },
    { id: 'isbn' as const, label: 'ISBN' },
    { id: 'settings' as const, label: 'Settings' },
  ];

  const colors = {
    barBackground: darkMode ? '#111827' : '#FFFFFF',
    border: darkMode ? '#1F2937' : '#E5E7EB',
    active: '#3B82F6',
    inactive: darkMode ? '#6B7280' : '#9CA3AF',
  };

  return (
    <View style={[styles.bar, { backgroundColor: colors.barBackground, borderTopColor: colors.border, paddingBottom: insets.bottom }]}> 
      <View style={styles.row}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity key={tab.id} onPress={() => onTabChange(tab.id)} style={styles.item}>
              <Feather
                name={tab.id === 'home' ? 'home' : tab.id === 'explore' ? 'star' : tab.id === 'isbn' ? 'search' : 'settings'}
                size={20}
                color={isActive ? colors.active : colors.inactive}
              />
              <Text style={[styles.label, { color: isActive ? colors.active : colors.inactive }]}>{tab.label}</Text>
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
    zIndex: 30,
  },
  row: {
    height: 80,
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
