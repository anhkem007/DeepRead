import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { FloatingToolbar } from './FloatingToolbar';
import { AISummaryPopup } from './AISummaryPopup';
import { AddNotePopup } from './AddNotePopup';
import { BottomReaderToolbar } from './BottomReaderToolbar';

interface ReaderScreenProps {
  bookTitle: string;
  onBack: () => void;
  darkMode: boolean;
}

export function ReaderScreen({ bookTitle, onBack, darkMode }: ReaderScreenProps) {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [highlights, setHighlights] = useState<number[]>([]);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | undefined>(undefined);

  const currentPage = 24;
  const totalPages = 220;
  const progress = (currentPage / totalPages) * 100;

  const handleHighlight = () => {
    setHighlights([...highlights, Date.now()]);
    setSelectedText(null);
  };

  const handleAddNote = () => {
    setSelectedText('Selected passage');
    setShowNotePopup(true);
  };

  const handleSummarize = () => {
    setSelectedText('Selected passage');
    setShowSummaryPopup(true);
  };

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onMouseUp = () => {
      const sel = window.getSelection?.();
      const text = sel?.toString().trim();
      if (text) {
        try {
          const range = sel!.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setSelectedText(text);
          setAnchor({ x: rect.left + rect.width / 2 + window.scrollX, y: rect.top + window.scrollY });
        } catch {
          setSelectedText(text);
          setAnchor(undefined);
        }
      } else {
        setSelectedText(null);
        setAnchor(undefined);
      }
    };
    document.addEventListener('mouseup', onMouseUp);
    return () => document.removeEventListener('mouseup', onMouseUp);
  }, []);

  const colors = {
    background: darkMode ? '#000000' : '#FFFFFF',
    barBackground: darkMode ? '#111827' : '#FFFFFF',
    barText: darkMode ? '#FFFFFF' : '#111827',
    border: darkMode ? '#1F2937' : '#E5E7EB',
    contentText: darkMode ? '#E5E7EB' : '#1F2937',
    accent: darkMode ? '#06B6D4' : '#3B82F6',
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.topBar, { backgroundColor: colors.barBackground, borderBottomColor: colors.border }]}> 
        <TouchableOpacity onPress={onBack} style={styles.topButton}><Feather name="arrow-left" size={20} color={colors.barText} /></TouchableOpacity>
        <Text numberOfLines={1} style={[styles.title, { color: colors.barText }]}>{bookTitle}</Text>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.topButton}><Feather name="more-vertical" size={20} color={colors.barText} /></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.reading}>
        <Text style={[styles.chapterTitle, { color: colors.barText }]}>Chapter 3: The Journey Begins</Text>
        <View style={{ rowGap: 16 }}>
          <Text style={{ color: colors.contentText, lineHeight: 22, userSelect: 'text' as any }}>
            The morning sun cast long shadows across the valley as Emma stood at the edge of the cliff, contemplating the path ahead. She had spent years preparing for this moment, studying ancient texts and learning from the wisest scholars in the realm. Yet nothing could truly prepare her for what lay beyond the mountains.
          </Text>
          <Text style={{ color: colors.contentText, lineHeight: 22, userSelect: 'text' as any }}>
            The old map in her satchel promised treasures and knowledge beyond imagination, but it also warned of dangers that had claimed the lives of countless adventurers before her. She traced her finger along the worn parchment, following the route marked by her mentor's hand.
          </Text>
          <Text style={{ color: colors.contentText, lineHeight: 22, userSelect: 'text' as any }}>
            "The greatest discoveries often require the greatest risks," her mentor had told her on that final evening before her departure. Those words echoed in her mind now, giving her the courage to take the first step down the treacherous mountain path.
          </Text>
          <Text style={{ color: colors.contentText, lineHeight: 22, userSelect: 'text' as any }}>
            As she descended, the landscape transformed around her. The familiar evergreen forests gave way to strange, twisted trees with silver bark that seemed to shimmer in the light. Birds with iridescent feathers sang melodies she had never heard before, and the very air felt charged with an ancient magic that made her skin tingle.
          </Text>
          <Text style={{ color: colors.contentText, lineHeight: 22, userSelect: 'text' as any }}>
            By midday, Emma reached a clearing where a crystal-clear stream bubbled over smooth stones. She knelt beside it to refill her water flask, and as she did, she noticed something peculiar—the water seemed to flow in two directions at once, defying the natural laws she had studied so carefully.
          </Text>
          <Text style={{ color: colors.contentText, lineHeight: 22, userSelect: 'text' as any }}>
            This was it, she realized. This was the threshold between the known world and the realm of mysteries. Everything beyond this point would challenge everything she thought she understood about reality itself. With a deep breath and a determined smile, Emma crossed the stream and continued her journey into the unknown.
          </Text>
        </View>

        <View style={styles.readActions}>
          <TouchableOpacity onPress={handleAddNote} style={[styles.actionButton, { backgroundColor: colors.accent }]}>
            <Text style={styles.actionButtonText}>Add Note</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSummarize} style={[styles.actionButton, { backgroundColor: colors.accent }]}>
            <Text style={styles.actionButtonText}>Summarize</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.progressBar, { backgroundColor: colors.barBackground, borderTopColor: colors.border }]}> 
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: darkMode ? '#9CA3AF' : '#6B7280' }]}>Page {currentPage} of {totalPages}</Text>
          <Text style={[styles.progressLabel, { color: darkMode ? '#9CA3AF' : '#6B7280' }]}>Chapter 3 – {Math.round(progress)}%</Text>
        </View>
        <View style={[styles.progressTrack, { backgroundColor: darkMode ? '#1F2937' : '#E5E7EB' }]}> 
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: colors.accent }]} />
        </View>
      </View>

      {selectedText && (
        <FloatingToolbar
          onHighlight={handleHighlight}
          onAddNote={handleAddNote}
          onSummarize={handleSummarize}
          onAskAI={() => {}}
          darkMode={darkMode}
          anchor={anchor}
        />
      )}

      <BottomReaderToolbar darkMode={darkMode} />

      {showSummaryPopup && (
        <AISummaryPopup
          selectedText={selectedText || ''}
          onClose={() => setShowSummaryPopup(false)}
          darkMode={darkMode}
        />
      )}
      {showNotePopup && (
        <AddNotePopup
          onClose={() => setShowNotePopup(false)}
          onSave={() => setShowNotePopup(false)}
          darkMode={darkMode}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topButton: { padding: 8, borderRadius: 8 },
  title: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700' },
  reading: { paddingHorizontal: 24, paddingVertical: 24, rowGap: 16 },
  chapterTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  readActions: { flexDirection: 'row', columnGap: 12, marginTop: 24 },
  actionButton: { flex: 1, borderRadius: 12, alignItems: 'center', paddingVertical: 12 },
  actionButtonText: { color: '#FFFFFF', fontWeight: '600' },
  progressBar: { borderTopWidth: 1, paddingHorizontal: 24, paddingVertical: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 12 },
  progressTrack: { height: 4, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%' },
});
