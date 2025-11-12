import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';

interface AISummaryPopupProps {
  selectedText: string;
  onClose: () => void;
  darkMode: boolean;
}

export function AISummaryPopup({ selectedText, onClose, darkMode }: AISummaryPopupProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const summary = "This passage introduces Emma's transformative journey beyond familiar territory. It emphasizes themes of courage, preparation meeting the unknown, and the threshold between ordinary reality and magical realms. The crystal stream symbolizes a point of no return in her quest for knowledge.";

  const handleCopy = async () => {
    try {
      await Share.share({ message: summary });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  const colors = {
    sheetBackground: darkMode ? '#111827' : '#FFFFFF',
    handle: darkMode ? '#374151' : '#D1D5DB',
    title: darkMode ? '#FFFFFF' : '#111827',
    summaryBackground: darkMode ? 'rgba(31,41,55,0.5)' : '#EFF6FF',
    summaryText: darkMode ? '#E5E7EB' : '#1F2937',
    primaryBackground: saved ? '#22C55E' : darkMode ? '#06B6D4' : '#3B82F6',
    primaryText: '#FFFFFF',
    secondaryBackground: darkMode ? '#1F2937' : '#F3F4F6',
    secondaryText: darkMode ? '#D1D5DB' : '#374151',
    metaText: darkMode ? '#6B7280' : '#9CA3AF',
  };

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={[styles.sheet, { backgroundColor: colors.sheetBackground }]}>
          <View style={styles.handleWrapper}>
            <View style={[styles.handle, { backgroundColor: colors.handle }]} />
          </View>

          <View style={styles.content}>
            <View style={styles.headerRow}>
              <Text style={[styles.title, { color: colors.title }]}>AI Summary</Text>
              <TouchableOpacity onPress={onClose} style={styles.headerButton}>
                <Text style={[styles.headerButtonText, { color: colors.metaText }]}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.summaryBox, { backgroundColor: colors.summaryBackground }]}> 
              <Text style={[styles.summaryText, { color: colors.summaryText }]}>{summary}</Text>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: colors.primaryBackground }]}> 
                <Text style={[styles.buttonText, { color: colors.primaryText }]}>{saved ? 'Saved!' : 'Save to Notes'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCopy} style={[styles.button, { backgroundColor: colors.secondaryBackground }]}> 
                <Text style={[styles.buttonText, { color: colors.secondaryText }]}>{copied ? 'Copied!' : 'Copy'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 480,
  },
  handleWrapper: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 48,
    height: 4,
    borderRadius: 2,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerButtonText: {
    fontSize: 16,
  },
  summaryBox: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    columnGap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
