import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, TextInput } from 'react-native';
import { Reader, useReader, Annotation } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as RNFS from '@dr.pogodin/react-native-fs';

interface ReaderScreenProps {
  bookTitle: string;
  onBack: () => void;
  darkMode: boolean;
  src?: string;
  srcUri?: string;
}

export function ReaderScreen({ bookTitle, onBack, darkMode, src, srcUri }: ReaderScreenProps) {
  const [showTOC, setShowTOC] = useState(false);
  const [toc, setToc] = useState<any[]>([]);
  const [selection, setSelection] = useState<{ cfiRange: string; text?: string } | null>(null);
  const [, setSelectedAnnotation] = useState<Annotation | undefined>(undefined);
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

  const insets = useSafeAreaInsets();
  const { goToLocation, getMeta, addAnnotation, removeAnnotation, annotations } = useReader();
  const [resolvedSrc, setResolvedSrc] = useState<string | undefined>(src);
  const openAnnoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const NOTE_DELAY_MS = 500;

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    topBarDynamic: { paddingTop: insets.top, backgroundColor: colors.barBackground, borderBottomColor: colors.border },
    titleColor: { color: colors.barText },
    readingDynamic: { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right },
    readerWrap: { flex: 1, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right },
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
    modalSheet: { maxHeight: '60%', borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: colors.barBackground, padding: 16 },
    modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    modalButton: { backgroundColor: colors.barBackground, borderWidth: 1, borderColor: colors.border },
    input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, color: colors.barText },
    
    // Text styles
    textBold: { fontWeight: '700' },
    textSelected: { marginBottom: 8 },
    textYourQuestion: { marginTop: 12, marginBottom: 8 },
    textRemove: { color: darkMode ? '#FCA5A5' : '#DC2626' },
    
    // Layout styles
    marginTop12: { marginTop: 12 },
    marginTop8: { marginTop: 8 },
    marginBottom8: { marginBottom: 8 },
    paddingVertical10: { paddingVertical: 10 },
    maxHeight120: { maxHeight: 120 },
    flex1: { flex: 1 },
    
    // Flex styles
    rowWithGap: { flexDirection: 'row', columnGap: 8, marginTop: 8 },
    
    // Modal specific styles
    modalContent: { marginTop: 12 },
    annotationItem: { paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  });

  const scheduleOpenAnno = () => {
    if (openAnnoTimerRef.current) clearTimeout(openAnnoTimerRef.current);
    openAnnoTimerRef.current = setTimeout(() => {
      setShowAnnoModal(true);
    }, NOTE_DELAY_MS);
  };

  useEffect(() => {
    const m = getMeta?.();
    if (m && (m as any).toc) setToc((m as any).toc as any[]);
  }, [getMeta]);

  useEffect(() => {
    const run = async () => {
      if (!src && srcUri) {
        try {
          let path = String(srcUri);
          if (path.startsWith('file://')) path = path.replace('file://', '');
          const base64 = await RNFS.readFile(path, 'base64');
          setResolvedSrc(base64);
        } catch {}
      } else {
        setResolvedSrc(src);
      }
    };
    run();
  }, [src, srcUri]);

  

  return (
    <View style={s.container}>
      <View style={[styles.topBar, s.topBarDynamic]}> 
        <TouchableOpacity onPress={onBack} style={styles.topButton}><Feather name="arrow-left" size={20} color={colors.barText} /></TouchableOpacity>
        <Text numberOfLines={1} style={[styles.title, s.titleColor]}>{bookTitle}</Text>
        <TouchableOpacity disabled={!toc.length} onPress={() => setShowTOC(true)} style={styles.topButton}><Feather name="list" size={20} color={colors.barText} /></TouchableOpacity>
      </View> 

      {!resolvedSrc && (
        <View style={[styles.reading, s.readingDynamic]}> 
          <Text style={[styles.chapterTitle, s.titleColor]}>No book loaded</Text>
        </View>
      )}
    

      {resolvedSrc && (
        <View style={s.readerWrap}>
          <Reader
            src={resolvedSrc}
            flow="paginated"
            snap={true}
            waitForLocationsReady={false} // Tăng tốc load
            fileSystem={useFileSystem}
            enableSelection
            enableSwipe={false}
            initialAnnotations={[]}
            onAddAnnotation={(annotation) => {
              if (annotation?.type === 'highlight' && (annotation as any)?.data?.isTemp) {
                setTempMark(annotation);
              }
            }}
            onPressAnnotation={(annotation) => {
              setSelectedAnnotation(annotation);
              scheduleOpenAnno();
            }}
            onChangeAnnotations={() => {}}
            menuItems={[
              {
                label: '✍️ Highlight',
                action: (cfiRange: string) => {
                  addAnnotation?.('highlight', cfiRange, undefined, { color: '#3B82F6' });
                  return true;
                },
              },
              {
                label: '📝 Note',
                action: (cfiRange: string, text?: string) => {
                  setSelection({ cfiRange, text });
                  addAnnotation?.('highlight', cfiRange, { isTemp: true });
                  scheduleOpenAnno();
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
                  scheduleOpenAnno();
                  return true;
                },
              },
            ]}
          />
       
        </View>
      )}

      <Modal visible={showTOC && toc.length > 0} transparent animationType="fade" onRequestClose={() => setShowTOC(false)}>
        <View style={s.modalBackdrop}>
          <View style={s.modalSheet}>
            <View style={s.modalHeaderRow}>
              <Text style={[s.titleColor, s.textBold]}>Table of Contents</Text>
              <TouchableOpacity onPress={() => setShowTOC(false)}><Feather name="x" size={18} color={colors.barText} /></TouchableOpacity>
            </View>
            <ScrollView style={s.marginTop12}>
              {toc.map((section: any, idx) => (
                <TouchableOpacity key={idx} onPress={() => { const href = section?.href || section?.url || section?.id; if (href) { goToLocation?.(href); setShowTOC(false); } }} style={s.paddingVertical10}>
                  <Text style={s.titleColor}>{String(section?.label || section?.title || section?.href || section?.id)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showSummaryModal} transparent animationType="fade" onRequestClose={() => { setShowSummaryModal(false); setSelection(null); setSummaryText(''); }}>
        <View style={s.modalBackdrop}>
          <View style={s.modalSheet}>
            <View style={s.modalHeaderRow}>
              <Text style={[s.titleColor, s.textBold]}>Summarize</Text>
              <TouchableOpacity onPress={() => { setShowSummaryModal(false); setSelection(null); setSummaryText(''); }}><Feather name="x" size={18} color={colors.barText} /></TouchableOpacity>
            </View>
            <ScrollView style={s.marginTop12}>
              <Text style={s.titleColor}>{summaryText}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showAskAIModal} transparent animationType="fade" onRequestClose={() => { setShowAskAIModal(false); setSelection(null); setAskAIQuestion(''); }}>
        <View style={s.modalBackdrop}>
          <View style={s.modalSheet}>
            <View style={s.modalHeaderRow}>
              <Text style={[s.titleColor, s.textBold]}>Ask AI</Text>
              <TouchableOpacity onPress={() => { setShowAskAIModal(false); setSelection(null); setAskAIQuestion(''); }}><Feather name="x" size={18} color={colors.barText} /></TouchableOpacity>
            </View>
            {selection && (
              <View style={s.modalContent}>
                <Text style={[s.titleColor, s.textSelected]}>Selected</Text>
                <ScrollView style={s.maxHeight120}>
                  <Text style={s.titleColor}>{String(selection.text || '')}</Text>
                </ScrollView>
                <Text style={[s.titleColor, s.textYourQuestion]}>Your question</Text>
                <TextInput value={askAIQuestion} onChangeText={setAskAIQuestion} placeholder="Type your question" placeholderTextColor={darkMode ? '#6B7280' : '#9CA3AF'} style={s.input} />
                <View style={s.rowWithGap}>
                  <TouchableOpacity onPress={() => { setShowAskAIModal(false); setSelection(null); setAskAIQuestion(''); }} style={[styles.topButton, s.modalButton]}>
                    <Text style={{ color: colors.barText }}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setShowAskAIModal(false); setSelection(null); setAskAIQuestion(''); }} style={[styles.topButton, s.modalButton]}>
                    <Text style={{ color: colors.barText }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Modal visible={showAnnoModal} transparent animationType="fade" onRequestClose={() => { setShowAnnoModal(false); setSelection(null); setSelectedAnnotation(undefined); if (tempMark) { removeAnnotation?.(tempMark); setTempMark(null); } if (openAnnoTimerRef.current) { clearTimeout(openAnnoTimerRef.current); openAnnoTimerRef.current = null; } }}>
        <View style={s.modalBackdrop}>
          <View style={s.modalSheet}>
            <View style={s.modalHeaderRow}>
              <Text style={[s.titleColor, s.textBold]}>Annotations</Text>
              <TouchableOpacity onPress={() => { setShowAnnoModal(false); setSelection(null); setSelectedAnnotation(undefined); if (tempMark) { removeAnnotation?.(tempMark); setTempMark(null); } if (openAnnoTimerRef.current) { clearTimeout(openAnnoTimerRef.current); openAnnoTimerRef.current = null; } }}><Feather name="x" size={18} color={colors.barText} /></TouchableOpacity>
            </View>
            {selection && (
              <View style={s.modalContent}>
                <Text style={[s.titleColor, s.textSelected]}>Add Note</Text>
                <TextInput value={noteText} onChangeText={setNoteText} placeholder="Enter note" placeholderTextColor={darkMode ? '#6B7280' : '#9CA3AF'} style={s.input} />
                <View style={s.rowWithGap}>
                  <TouchableOpacity onPress={() => { if (selection?.cfiRange) { addAnnotation?.('mark', selection.cfiRange, { note: noteText }); } if (tempMark) { removeAnnotation?.(tempMark); setTempMark(null); } setSelection(null); setNoteText(''); setShowAnnoModal(false); if (openAnnoTimerRef.current) { clearTimeout(openAnnoTimerRef.current); openAnnoTimerRef.current = null; } }} style={[styles.topButton, s.modalButton]}>
                    <Text style={{ color: colors.barText }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setSelection(null); setNoteText(''); if (tempMark) { removeAnnotation?.(tempMark); setTempMark(null); } setShowAnnoModal(false); if (openAnnoTimerRef.current) { clearTimeout(openAnnoTimerRef.current); openAnnoTimerRef.current = null; } }} style={[styles.topButton, s.modalButton]}>
                    <Text style={{ color: colors.barText }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <ScrollView style={s.marginTop12}>
              {Array.isArray(annotations) && (annotations as any[]).map((a, idx) => (
                <View key={idx} style={s.annotationItem}>
                  <TouchableOpacity onPress={() => setSelectedAnnotation(a)} style={s.flex1}>
                    <Text style={s.titleColor}>{String((a as any)?.cfiRangeText || (a as any)?.text || (a as any)?.cfiRange || '')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeAnnotation?.(a)}>
                    <Text style={s.textRemove}>Remove</Text>
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
