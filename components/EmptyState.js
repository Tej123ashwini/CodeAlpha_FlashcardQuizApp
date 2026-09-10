import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/**
 * EmptyState component
 * Shown when there are no flashcards remaining in the deck.
 * Provides clear actions to Add a Flashcard or Restore Default Flashcards.
 */
export default function EmptyState({ onAddPress, onRestoreDefaults }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>📚</Text>
        </View>

        <Text style={styles.title}>No Flashcards Left</Text>
        <Text style={styles.subtitle}>
          You've deleted all the cards in your deck. You can create your own custom flashcards or restore the default Computer Science cards.
        </Text>

        <View style={styles.buttonStack}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onAddPress}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>+ Add New Flashcard</Text>
          </TouchableOpacity>

          {onRestoreDefaults ? (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onRestoreDefaults}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Restore Default Deck</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    elevation: 4,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonStack: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  secondaryButtonText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },
});
