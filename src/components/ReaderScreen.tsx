import { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Modal, ScrollView, TextInput } from 'react-native';
import { Reader, useReader, Annotation } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ReaderScreenProps {
  bookTitle: string;
  onBack: () => void;
  darkMode: boolean;
  src?: string;
}

export function ReaderScreen({ bookTitle, onBack, darkMode, src }: ReaderScreenProps) {
  const [showTOC, setShowTOC] = useState(false);
  const [toc, setToc] = useState<any[]>([]);
  const [selection, setSelection] = useState<{ cfiRange: string; text?: string } | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | undefined>(undefined);
  const [tempMark, setTempMark] = useState<Annotation | null>(null);
  const [showAnnoModal, setShowAnnoModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [showAskAIModal, setShowAskAIModal] = useState(false);
  const [askAIQuestion, setAskAIQuestion] = useState('');

  const colors = {
    background: darkMode ? '#000000' : '#FFFFFF',
    barBackground: darkMode ? '#111827' : '#FFFFFF',
    barText: darkMode ? '#FFFFFF' : '#111827',
    border: darkMode ? '#1F2937' : '#E5E7EB',
    contentText: darkMode ? '#E5E7EB' : '#1F2937',
    accent: darkMode ? '#06B6D4' : '#3B82F6',
  };

  const { width, height } = useWindowDimensions();
  const initWidthRef = useRef(width);
  const initHeightRef = useRef(height);
  const insets = useSafeAreaInsets();
  const { goToLocation, getMeta, addAnnotation, removeAnnotation, annotations } = useReader();

  useEffect(() => {
    const m = getMeta?.();
    if (m && (m as any).toc) setToc((m as any).toc as any[]);
  }, [getMeta]);

  

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.topBar, { backgroundColor: colors.barBackground, borderBottomColor: colors.border }]}> 
        <TouchableOpacity onPress={onBack} style={styles.topButton}><Feather name="arrow-left" size={20} color={colors.barText} /></TouchableOpacity>
        <Text numberOfLines={1} style={[styles.title, { color: colors.barText }]}>{bookTitle}</Text>
        <TouchableOpacity disabled={!toc.length} onPress={() => setShowTOC(true)} style={styles.topButton}><Feather name="list" size={20} color={colors.barText} /></TouchableOpacity>
      </View>

      {!src && (
        <View style={[styles.reading, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}> 
          <Text style={[styles.chapterTitle, { color: colors.barText }]}>No book loaded</Text>
        </View>
      )}

      {src && (
        <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
          <Reader
            src={src}
            fileSystem={useFileSystem}
            width={initWidthRef.current}
            height={initHeightRef.current * 0.8}
            enableSelection
            initialAnnotations={[]}
            onAddAnnotation={(annotation) => {
              if (annotation?.type === 'highlight' && (annotation as any)?.data?.isTemp) {
                setTempMark(annotation);
              }
            }}
            onPressAnnotation={(annotation) => {
              setSelectedAnnotation(annotation);
              setShowAnnoModal(true);
            }}
            onChangeAnnotations={() => {}}
            menuItems={[
              {
                label: '✍️ Highlight',
                action: (cfiRange: string, text?: string) => {
                  addAnnotation?.('highlight', cfiRange, undefined, { color: '#3B82F6' });
                  return true;
                },
              },
              {
                label: '📝 Note',
                action: (cfiRange: string, text?: string) => {
                  setSelection({ cfiRange, text });
                  addAnnotation?.('highlight', cfiRange, { isTemp: true });
                  setShowAnnoModal(true);
                  return true;
                },
              },
              {
                label: '⚡️ Summarize',
                action: (cfiRange: string, text?: string) => {
                  const t = String(text || '').trim();
                  const sentences = t.split(/([。.?!]|\.(\s|$))/).map(s => s.trim()).filter(Boolean);
                  const summary = sentences.slice(0, 2).join(' ');
                  setSelection({ cfiRange, text: t });
                  setSummaryText(summary || t);
                  setShowSummaryModal(true);
                  return true;
                },
              },
              {
                label: '💬 Ask AI',
                action: (cfiRange: string, text?: string) => {
                  setSelection({ cfiRange, text });
                  setAskAIQuestion('');
                  setShowAskAIModal(true);
                  return true;
                },
              },
              {
                label: '🟡',
                action: (cfiRange: string) => {
                  addAnnotation?.('highlight', cfiRange, undefined, { color: '#FACC15' });
                  return true;
                },
              },
              {
                label: '🔴',
                action: (cfiRange: string) => {
                  addAnnotation?.('highlight', cfiRange, undefined, { color: '#EF4444' });
                  return true;
                },
              },
              {
                label: '🟢',
                action: (cfiRange: string) => {
                  addAnnotation?.('highlight', cfiRange, undefined, { color: '#22C55E' });
                  return true;
                },
              },
              {
                label: 'Add Note',
                action: (cfiRange: string, text?: string) => {
                  setSelection({ cfiRange, text });
                  addAnnotation?.('highlight', cfiRange, { isTemp: true });
                  setShowAnnoModal(true);
                  return true;
                },
              },
            ]}
          />
       
        </View>
      )}

      <Modal visible={showTOC && toc.length > 0} transparent animationType="fade" onRequestClose={() => setShowTOC(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
          <View style={{ maxHeight: '60%', borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: colors.barBackground, padding: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: colors.barText, fontWeight: '700' }}>Table of Contents</Text>
              <TouchableOpacity onPress={() => setShowTOC(false)}><Feather name="x" size={18} color={colors.barText} /></TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 12 }}>
              {toc.map((section: any, idx) => (
                <TouchableOpacity key={idx} onPress={() => { const href = section?.href || section?.url || section?.id; if (href) { goToLocation?.(href); setShowTOC(false); } }} style={{ paddingVertical: 10 }}>
                  <Text style={{ color: colors.barText }}>{String(section?.label || section?.title || section?.href || section?.id)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showSummaryModal} transparent animationType="fade" onRequestClose={() => { setShowSummaryModal(false); setSelection(null); setSummaryText(''); }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
          <View style={{ maxHeight: '60%', borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: colors.barBackground, padding: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: colors.barText, fontWeight: '700' }}>Summarize</Text>
              <TouchableOpacity onPress={() => { setShowSummaryModal(false); setSelection(null); setSummaryText(''); }}><Feather name="x" size={18} color={colors.barText} /></TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 12 }}>
              <Text style={{ color: colors.barText }}>{summaryText}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showAskAIModal} transparent animationType="fade" onRequestClose={() => { setShowAskAIModal(false); setSelection(null); setAskAIQuestion(''); }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
          <View style={{ maxHeight: '60%', borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: colors.barBackground, padding: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: colors.barText, fontWeight: '700' }}>Ask AI</Text>
              <TouchableOpacity onPress={() => { setShowAskAIModal(false); setSelection(null); setAskAIQuestion(''); }}><Feather name="x" size={18} color={colors.barText} /></TouchableOpacity>
            </View>
            {selection && (
              <View style={{ marginTop: 12 }}>
                <Text style={{ color: colors.barText, marginBottom: 8 }}>Selected</Text>
                <ScrollView style={{ maxHeight: 120 }}>
                  <Text style={{ color: colors.barText }}>{String(selection.text || '')}</Text>
                </ScrollView>
                <Text style={{ color: colors.barText, marginTop: 12, marginBottom: 8 }}>Your question</Text>
                <TextInput value={askAIQuestion} onChangeText={setAskAIQuestion} placeholder="Type your question" placeholderTextColor={darkMode ? '#6B7280' : '#9CA3AF'} style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, color: colors.barText }} />
                <View style={{ flexDirection: 'row', columnGap: 8, marginTop: 8 }}>
                  <TouchableOpacity onPress={() => { setShowAskAIModal(false); setSelection(null); setAskAIQuestion(''); }} style={[styles.topButton, { backgroundColor: colors.barBackground, borderWidth: 1, borderColor: colors.border }]}>
                    <Text style={{ color: colors.barText }}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setShowAskAIModal(false); setSelection(null); setAskAIQuestion(''); }} style={[styles.topButton, { backgroundColor: colors.barBackground, borderWidth: 1, borderColor: colors.border }]}>
                    <Text style={{ color: colors.barText }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Modal visible={showAnnoModal} transparent animationType="fade" onRequestClose={() => { setShowAnnoModal(false); setSelection(null); setSelectedAnnotation(undefined); if (tempMark) { removeAnnotation?.(tempMark); setTempMark(null); } }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
          <View style={{ maxHeight: '60%', borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: colors.barBackground, padding: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: colors.barText, fontWeight: '700' }}>Annotations</Text>
              <TouchableOpacity onPress={() => { setShowAnnoModal(false); setSelection(null); setSelectedAnnotation(undefined); if (tempMark) { removeAnnotation?.(tempMark); setTempMark(null); } }}><Feather name="x" size={18} color={colors.barText} /></TouchableOpacity>
            </View>
            {selection && (
              <View style={{ marginTop: 12 }}>
                <Text style={{ color: colors.barText, marginBottom: 8 }}>Add Note</Text>
                <TextInput value={noteText} onChangeText={setNoteText} placeholder="Enter note" placeholderTextColor={darkMode ? '#6B7280' : '#9CA3AF'} style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, color: colors.barText }} />
                <View style={{ flexDirection: 'row', columnGap: 8, marginTop: 8 }}>
                  <TouchableOpacity onPress={() => { if (selection?.cfiRange) { addAnnotation?.('note', selection.cfiRange, { note: noteText }); } if (tempMark) { removeAnnotation?.(tempMark); setTempMark(null); } setSelection(null); setNoteText(''); setShowAnnoModal(false); }} style={[styles.topButton, { backgroundColor: colors.barBackground, borderWidth: 1, borderColor: colors.border }]}>
                    <Text style={{ color: colors.barText }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setSelection(null); setNoteText(''); if (tempMark) { removeAnnotation?.(tempMark); setTempMark(null); } setShowAnnoModal(false); }} style={[styles.topButton, { backgroundColor: colors.barBackground, borderWidth: 1, borderColor: colors.border }]}>
                    <Text style={{ color: colors.barText }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <ScrollView style={{ marginTop: 12 }}>
              {Array.isArray(annotations) && (annotations as any[]).map((a, idx) => (
                <View key={idx} style={{ paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => setSelectedAnnotation(a)} style={{ flex: 1 }}>
                    <Text style={{ color: colors.barText }}>{String((a as any)?.cfiRangeText || (a as any)?.text || (a as any)?.cfiRange || '')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeAnnotation?.(a)}>
                    <Text style={{ color: darkMode ? '#FCA5A5' : '#DC2626' }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topButton: { padding: 8, borderRadius: 8 },
  title: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700' },
  reading: { paddingHorizontal: 24, paddingVertical: 24, rowGap: 16 },
  chapterTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
});
