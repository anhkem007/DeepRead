import { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface AddNotePopupProps {
  onClose: () => void;
  onSave: (note: string) => void;
  darkMode: boolean;
}

export function AddNotePopup({ onClose, onSave, darkMode }: AddNotePopupProps) {
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (note.trim()) {
      onSave(note);
    }
  };

  const colors = {
    sheetBackground: darkMode ? '#111827' : '#FFFFFF',
    handle: darkMode ? '#374151' : '#D1D5DB',
    title: darkMode ? '#FFFFFF' : '#111827',
    inputBackground: darkMode ? '#1F2937' : '#F9FAFB',
    inputText: darkMode ? '#FFFFFF' : '#111827',
    inputPlaceholder: darkMode ? '#6B7280' : '#9CA3AF',
    inputBorder: darkMode ? '#374151' : '#E5E7EB',
    metaText: darkMode ? '#6B7280' : '#9CA3AF',
    cancelBackground: darkMode ? '#1F2937' : '#F3F4F6',
    cancelText: darkMode ? '#D1D5DB' : '#374151',
    saveBackground: note.trim() ? (darkMode ? '#06B6D4' : '#3B82F6') : (darkMode ? '#1F2937' : '#E5E7EB'),
    saveText: note.trim() ? '#FFFFFF' : (darkMode ? '#9CA3AF' : '#6B7280'),
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
              <Text style={[styles.title, { color: colors.title }]}>Add Note</Text>
              <TouchableOpacity onPress={onClose} style={styles.headerButton}>
                <Text style={[styles.headerButtonText, { color: colors.metaText }]}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputBlock}>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Write your thoughts about this passage..."
                placeholderTextColor={colors.inputPlaceholder}
                style={[
                  styles.textInput,
                  {
                    backgroundColor: colors.inputBackground,
                    color: colors.inputText,
                    borderColor: colors.inputBorder,
                  },
                ]}
                multiline
                numberOfLines={6}
                autoFocus
              />
              <Text style={[styles.meta, { color: colors.metaText }]}>{note.length} characters</Text>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: colors.cancelBackground }]}> 
                <Text style={[styles.buttonText, { color: colors.cancelText }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                disabled={!note.trim()}
                style={[styles.button, { backgroundColor: colors.saveBackground }]}
              >
                <Text style={[styles.buttonText, { color: colors.saveText }]}>Save Note</Text>
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
  inputBlock: {
    marginBottom: 16,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    textAlignVertical: 'top',
  },
  meta: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'right',
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
