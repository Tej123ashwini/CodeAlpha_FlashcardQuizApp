import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

/**
 * CardModal component
 * Handles both "Add Flashcard" and "Edit Flashcard" in a clean modal dialog.
 * Validates that question and answer are non-empty before saving.
 */
export default function CardModal({
  visible,
  mode = 'add', // 'add' | 'edit'
  initialCard = null,
  onSave,
  onClose,
}) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill values when editing or reset when adding
  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && initialCard) {
        setQuestion(initialCard.question || '');
        setAnswer(initialCard.answer || '');
      } else {
        setQuestion('');
        setAnswer('');
      }
      setErrorMessage('');
    }
  }, [visible, mode, initialCard]);

  const handleSave = () => {
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion && !trimmedAnswer) {
      setErrorMessage('Please enter both a question and an answer.');
      return;
    }
    if (!trimmedQuestion) {
      setErrorMessage('Question cannot be empty.');
      return;
    }
    if (!trimmedAnswer) {
      setErrorMessage('Answer cannot be empty.');
      return;
    }

    setErrorMessage('');
    onSave({
      question: trimmedQuestion,
      answer: trimmedAnswer,
      category: initialCard?.category || 'Custom',
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            {/* Modal Title */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {mode === 'edit' ? 'Edit Flashcard' : 'Add Flashcard'}
              </Text>
              <Text style={styles.modalSubtitle}>
                {mode === 'edit'
                  ? 'Update the question and answer below.'
                  : 'Create a new flashcard for your study deck.'}
              </Text>
            </View>

            {/* Error Message Banner */}
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <ScrollView
              contentContainerStyle={styles.formContainer}
              keyboardShouldPersistTaps="handled"
            >
              {/* Question Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Question <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, styles.textAreaSmall]}
                  placeholder="e.g., What is an algorithm?"
                  placeholderTextColor="#94A3B8"
                  value={question}
                  onChangeText={(text) => {
                    setQuestion(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              {/* Answer Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Answer <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, styles.textAreaLarge]}
                  placeholder="e.g., A step-by-step set of instructions to solve a problem."
                  placeholderTextColor="#94A3B8"
                  value={answer}
                  onChangeText={(text) => {
                    setAnswer(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.cancelBtn]}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.saveBtn]}
                  onPress={handleSave}
                  activeOpacity={0.8}
                >
                  <Text style={styles.saveBtnText}>
                    {mode === 'edit' ? 'Save Changes' : 'Save Flashcard'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalHeader: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderColor: '#F87171',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '600',
  },
  formContainer: {
    paddingBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  textAreaSmall: {
    minHeight: 70,
  },
  textAreaLarge: {
    minHeight: 100,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
  },
  actionBtn: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  cancelBtn: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  cancelBtnText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: '#4F46E5',
    flex: 1,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
