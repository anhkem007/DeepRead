import { useState, useEffect } from 'react';
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
import { getDatabase } from './database';
import { userRepository } from './database/repositories';
import { useBooks, useSettings } from './hooks';
import { Book as DBBook } from './database/models/Book';

// Book type for UI components (compatible with existing components)
type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number;
  format: 'PDF' | 'ePub' | 'TXT';
  src?: string;
  uri?: string;
  fileCopyUri?: string;
  lastCfi?: string;
};

// Convert DB Book to UI Book
const dbBookToUIBook = (dbBook: DBBook): Book => ({
  id: dbBook.id,
  title: dbBook.title,
  author: dbBook.author || 'Unknown',
  cover: dbBook.cover_url || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1080&fit=crop',
  progress: dbBook.progress,
  format: dbBook.format,
  uri: dbBook.file_uri,
  fileCopyUri: dbBook.file_copy_uri,
  lastCfi: dbBook.last_cfi,
});

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
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [dbInitialized, setDbInitialized] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Initialize database and user
  useEffect(() => {
    const initializeApp = () => {
      try {
        // Initialize database
        getDatabase();
        setDbInitialized(true);

        // Create or get user
        const userId = 'user-1'; // In production, get from AsyncStorage or auth
        const user = userRepository.createOrGet(userId);
        setCurrentUserId(user.id);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        Alert.alert('Error', 'Failed to initialize database. Please restart the app.');
      }
    };

    initializeApp();
  }, []);

  // Load books and settings
  const { books: dbBooks, loading: booksLoading, addBook: addBookToDb } = useBooks(currentUserId || '');
  const { settings, loading: settingsLoading, updateSettings } = useSettings(currentUserId || '');

  // Convert DB books to UI books
  const books: Book[] = dbBooks.map(dbBookToUIBook);
  const darkMode = settings?.dark_mode || false;

  const handleAddBook = async () => {
    try {
      setPickerVisible(true);
    } catch (e) {
      console.error('Error adding book:', e);
    }
  };

  const handleToggleDarkMode = () => {
    if (currentUserId && settings) {
      try {
        updateSettings({ dark_mode: !settings.dark_mode });
      } catch (error) {
        console.error('Failed to update dark mode:', error);
      }
    }
  };

  // Show splash until database is initialized
  if (showSplash || !dbInitialized || !currentUserId || booksLoading || settingsLoading) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <SplashScreen onGetStarted={() => {
          if (dbInitialized && currentUserId) {
            setShowSplash(false);
          }
        }} />
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
            src={currentBook.format === 'ePub' ? currentBook.src : undefined}
            srcUri={currentBook.format === 'ePub' ? (currentBook.uri || currentBook.fileCopyUri) : undefined}
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
            onToggleDarkMode={handleToggleDarkMode}
            settings={settings}
            onUpdateSettings={updateSettings}
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
              try {
                if (!currentUserId) {
                  Alert.alert('Error', 'User not initialized');
                  return;
                }

                const ext = (file.name?.split('.').pop() || '').toLowerCase();
                const fmt: 'PDF' | 'ePub' | 'TXT' = ext === 'pdf' ? 'PDF' : ext === 'epub' ? 'ePub' : 'TXT';
                
                const fileUri = (file as any).uri || (file as any).fileCopyUri;
                const fileCopyUri = (file as any).fileCopyUri;

                // Add book to database
                const newDbBook = addBookToDb({
                  user_id: currentUserId,
                  title: (file.name || 'Unknown').replace(/\.[^.]+$/, ''),
                  author: 'Unknown',
                  cover_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1080&fit=crop',
                  format: fmt,
                  file_path: fileUri,
                  file_uri: (file as any).uri,
                  file_copy_uri: fileCopyUri,
                  progress: 0,
                });

                // Convert to UI book and set as current
                const newBook = dbBookToUIBook(newDbBook);
                setCurrentBook(newBook);
                setPickerVisible(false);
              } catch (error) {
                console.error('Error adding book:', error);
                Alert.alert('Error', 'Failed to add book. Please try again.');
                setPickerVisible(false);
              }
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
