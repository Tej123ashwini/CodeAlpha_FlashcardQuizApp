import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import Flashcard from './components/Flashcard';
import CardModal from './components/CardModal';
import DeleteModal from './components/DeleteModal';
import EmptyState from './components/EmptyState';
import {
  loadFlashcards,
  saveFlashcards,
  resetToDefaultFlashcards,
} from './utils/storage';

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Modal controls
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Load flashcards from AsyncStorage on mount
  useEffect(() => {
    async function initCards() {
      try {
        const storedCards = await loadFlashcards();
        setFlashcards(storedCards);
      } catch (err) {
        console.error('Failed to load flashcards:', err);
      } finally {
        setIsLoading(false);
      }
    }
    initCards();
  }, []);

  // Safe reference to active card
  const totalCards = flashcards.length;
  const currentCard = totalCards > 0 && currentIndex < totalCards ? flashcards[currentIndex] : null;

  // Toggle show/hide answer
  const handleToggleAnswer = () => {
    setIsAnswerVisible((prev) => !prev);
  };

  // Next card handler
  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerVisible(false); // Reset answer visibility on card change
    }
  };

  // Previous card handler
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsAnswerVisible(false); // Reset answer visibility on card change
    }
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setModalMode('add');
    setModalVisible(true);
  };

  // Open Edit Modal
  const handleOpenEdit = () => {
    if (!currentCard) return;
    setModalMode('edit');
    setModalVisible(true);
  };

  // Open Delete Confirmation
  const handleOpenDelete = () => {
    if (!currentCard) return;
    setDeleteModalVisible(true);
  };

  // Save Card (Add or Edit)
  const handleSaveCard = async (cardData) => {
    let updatedCards;
    if (modalMode === 'add') {
      const newCard = {
        id: Date.now().toString(),
        question: cardData.question,
        answer: cardData.answer,
        category: cardData.category || 'Custom',
      };
      updatedCards = [...flashcards, newCard];
      setFlashcards(updatedCards);
      // Move to the newly added card
      setCurrentIndex(updatedCards.length - 1);
      setIsAnswerVisible(false);
    } else {
      // Edit existing card
      updatedCards = flashcards.map((c, index) =>
        index === currentIndex
          ? { ...c, question: cardData.question, answer: cardData.answer }
          : c
      );
      setFlashcards(updatedCards);
      setIsAnswerVisible(false);
    }

    setModalVisible(false);
    await saveFlashcards(updatedCards);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    setDeleteModalVisible(false);

    const updatedCards = flashcards.filter((_, index) => index !== currentIndex);
    setFlashcards(updatedCards);
    setIsAnswerVisible(false);

    // Adjust active index safely
    if (updatedCards.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= updatedCards.length) {
      setCurrentIndex(updatedCards.length - 1);
    }

    await saveFlashcards(updatedCards);
  };

  // Restore Default Flashcards
  const handleRestoreDefaults = async () => {
    const defaultDeck = await resetToDefaultFlashcards();
    setFlashcards(defaultDeck);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading Flashcards...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />

      {/* Header Bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Flashcard Quiz</Text>
          <Text style={styles.headerSubtitle}>CodeAlpha Study Deck</Text>
        </View>

        <TouchableOpacity
          style={styles.addHeaderButton}
          onPress={handleOpenAdd}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Add Flashcard"
        >
          <Text style={styles.addHeaderButtonText}>+ Add Card</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      {totalCards === 0 ? (
        <EmptyState
          onAddPress={handleOpenAdd}
          onRestoreDefaults={handleRestoreDefaults}
        />
      ) : (
        <View style={styles.mainContainer}>
          {/* Card Counter & Progress Indicator */}
          <View style={styles.counterContainer}>
            <View style={styles.counterBadge}>
              <Text style={styles.counterText}>
                Card {currentIndex + 1} of {totalCards}
              </Text>
            </View>

            {/* Quick Action Buttons (Edit & Delete) */}
            <View style={styles.cardActionsRow}>
              <TouchableOpacity
                style={[styles.smallActionBtn, styles.editBtn]}
                onPress={handleOpenEdit}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Edit Flashcard"
              >
                <Text style={styles.editBtnText}>✏️ Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.smallActionBtn, styles.deleteBtn]}
                onPress={handleOpenDelete}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Delete Flashcard"
              >
                <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${((currentIndex + 1) / totalCards) * 100}%` },
              ]}
            />
          </View>

          {/* Flashcard Component */}
          <Flashcard
            card={currentCard}
            isAnswerVisible={isAnswerVisible}
            onToggleAnswer={handleToggleAnswer}
          />

          {/* Navigation Controls: Previous / Next */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.navPrevButton,
                currentIndex === 0 && styles.navButtonDisabled,
              ]}
              onPress={handlePrevious}
              disabled={currentIndex === 0}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Previous Flashcard"
            >
              <Text
                style={[
                  styles.navButtonText,
                  currentIndex === 0 && styles.navButtonTextDisabled,
                ]}
              >
                ← Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                styles.navNextButton,
                currentIndex === totalCards - 1 && styles.navButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={currentIndex === totalCards - 1}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Next Flashcard"
            >
              <Text
                style={[
                  styles.navButtonText,
                  currentIndex === totalCards - 1 && styles.navButtonTextDisabled,
                ]}
              >
                Next →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Add / Edit Modal */}
      <CardModal
        visible={modalVisible}
        mode={modalMode}
        initialCard={modalMode === 'edit' ? currentCard : null}
        onSave={handleSaveCard}
        onClose={() => setModalVisible(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 0,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 14,
    fontSize: 15,
    color: '#64748B',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
    marginTop: 2,
  },
  addHeaderButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addHeaderButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 6,
  },
  counterBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  counterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  smallActionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  editBtn: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  deleteBtn: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  deleteBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
    gap: 14,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  navPrevButton: {
    backgroundColor: '#2563EB',
  },
  navNextButton: {
    backgroundColor: '#2563EB',
  },
  navButtonDisabled: {
    backgroundColor: '#E2E8F0',
    borderColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  navButtonTextDisabled: {
    color: '#94A3B8',
  },
});
