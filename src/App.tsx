import { useState } from 'react';
import { View, StyleSheet, StatusBar, Alert, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen } from './components/SplashScreen';
import { HomeTab } from './components/HomeTab';
import { ExploreTab } from './components/ExploreTab';
import { ISBNSearchTab } from './components/ISBNSearchTab';
import { SettingsTab } from './components/SettingsTab';
import { BottomTabBar } from './components/BottomTabBar';
import { ReaderScreen } from './components/ReaderScreen';
import { AndroidFilePicker } from './components/AndroidFilePicker';

// Mock data for books
const initialBooks = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1679180174039-c84e26f1a78d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2Mjc1MTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 67,
    format: 'PDF' as const,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://images.unsplash.com/photo-1657550650205-a351418bbf89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9vayUyMHNwaW5lfGVufDF8fHx8MTc2MjgzMjkzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 34,
    format: 'ePub' as const,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images.unsplash.com/photo-1627520675054-d6a0766ced34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBub3ZlbCUyMGNvdmVyfGVufDF8fHx8MTc2Mjc5ODE5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 82,
    format: 'PDF' as const,
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://images.unsplash.com/photo-1711185892790-4cabb6701cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2Mjc5OTE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 15,
    format: 'ePub' as const,
  },
];

const trendingBooks = [
  {
    id: 't1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1679180174039-c84e26f1a78d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2Mjc1MTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
  },
  {
    id: 't2',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1627520675054-d6a0766ced34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBub3ZlbCUyMGNvdmVyfGVufDF8fHx8MTc2Mjc5ODE5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
  },
  {
    id: 't3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    cover: 'https://images.unsplash.com/photo-1604435062356-a880b007922c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2Mjc5OTE2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.3,
  },
  {
    id: 't4',
    title: 'Educated',
    author: 'Tara Westover',
    cover: 'https://images.unsplash.com/photo-1657550650205-a351418bbf89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9vayUyMHNwaW5lfGVufDF8fHx8MTc2MjgzMjkzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
  },
  {
    id: 't5',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    cover: 'https://images.unsplash.com/photo-1711185892790-4cabb6701cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2Mjc5OTE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
  },
];

const recommendedBooks = [
  {
    id: 'r1',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    cover: 'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2Mjc3MzE3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    summary: 'A groundbreaking exploration of how Homo sapiens came to dominate the world. Harari weaves together insights from biology, history, and economics to tell the story of humanity.',
    rating: 4.6,
  },
  {
    id: 'r2',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    cover: 'https://images.unsplash.com/photo-1679180174039-c84e26f1a78d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2Mjc1MTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    summary: 'A spiritual guide to transcending ego-based consciousness and living in the present moment. Tolle shows how to quiet the mind and find peace in everyday life.',
    rating: 4.4,
  },
  {
    id: 'r3',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    cover: 'https://images.unsplash.com/photo-1627520675054-d6a0766ced34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBub3ZlbCUyMGNvdmVyfGVufDF8fHx8MTc2Mjc5ODE5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    summary: 'Nobel Prize winner Daniel Kahneman explores the two systems that drive the way we think. A fascinating look at how we make decisions and form judgments.',
    rating: 4.5,
  },
];

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'isbn' | 'settings'>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [currentBook, setCurrentBook] = useState<typeof initialBooks[0] | null>(null);
  const [books, setBooks] = useState(initialBooks);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleAddBook = async () => {
    try {
      if (Platform.OS === 'web') {
        await new Promise<void>((resolve) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.pdf,.epub,.txt';
          input.onchange = () => {
            const file = input.files?.[0];
            if (!file) { resolve(); return; }
            const ext = (file.name.split('.').pop() || '').toLowerCase();
            const newBook = {
              id: String(Date.now()),
              title: file.name.replace(/\.[^.]+$/, ''),
              author: 'Unknown',
              cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1080&fit=crop',
              progress: 0,
              format: (ext || 'file').toUpperCase() as 'PDF' | 'ePub' | 'TXT',
            };
            setBooks((prev) => [newBook, ...prev]);
            resolve();
          };
          input.click();
        });
      } else {
        setPickerVisible(true);
      }
    } catch (e) {}
  };

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <SplashScreen onGetStarted={() => setShowSplash(false)} />
      </SafeAreaProvider>
    );
  }

  // If reading a book, show reader screen
  if (currentBook) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <View style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#F9FAFB' }]}> 
          <ReaderScreen
            bookTitle={currentBook.title}
            onBack={() => setCurrentBook(null)}
            darkMode={darkMode}
          />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#F9FAFB' }]}> 
        {activeTab === 'home' && (
          <HomeTab
            books={books}
            onAddBook={handleAddBook}
            onReadBook={(book) => setCurrentBook(book)}
            darkMode={darkMode}
          />
        )}
        {activeTab === 'explore' && (
          <ExploreTab
            trendingBooks={trendingBooks}
            recommendedBooks={recommendedBooks}
            darkMode={darkMode}
          />
        )}
        {activeTab === 'isbn' && <ISBNSearchTab darkMode={darkMode} />}
        {activeTab === 'settings' && (
          <SettingsTab
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />
        )}

        <BottomTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          darkMode={darkMode}
        />
        {Platform.OS === 'android' && (
          <AndroidFilePicker
            visible={pickerVisible}
            onClose={() => setPickerVisible(false)}
            onPicked={(file) => {
              const ext = (file.name?.split('.').pop() || '').toLowerCase();
              const newBook = {
                id: String(Date.now()),
                title: file.name.replace(/\.[^.]+$/, ''),
                author: 'Unknown',
                cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1080&fit=crop',
                progress: 0,
                format: (ext || 'file').toUpperCase() as 'PDF' | 'ePub' | 'TXT',
              };
              setBooks((prev) => [newBook, ...prev]);
            }}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
