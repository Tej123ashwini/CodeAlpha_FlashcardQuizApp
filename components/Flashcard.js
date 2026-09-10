import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

/**
 * Flashcard component
 * Displays Question on the front and Answer on the back upon clicking 'Show Answer'.
 * Designed with rounded corners, elevated card styling, and clear typography.
 */
export default function Flashcard({
  card,
  isAnswerVisible,
  onToggleAnswer,
}) {
  if (!card) return null;

  return (
    <View style={styles.cardWrapper}>
      {/* Main Flashcard Container */}
      <View style={[styles.card, isAnswerVisible ? styles.cardActive : styles.cardDefault]}>
        <ScrollView
          contentContainerStyle={styles.cardContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Card Category Badge (if present) */}
          {card.category ? (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{card.category.toUpperCase()}</Text>
            </View>
          ) : null}

          {/* Question Section (Front) */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionPillQuestion}>
              <Text style={styles.sectionPillText}>QUESTION</Text>
            </View>
          </View>
          <Text style={styles.questionText}>{card.question}</Text>

          {/* Answer Section (Back) - Revealed when toggled */}
          {isAnswerVisible ? (
            <View style={styles.answerContainer}>
              <View style={styles.divider} />
              <View style={styles.sectionHeader}>
                <View style={styles.sectionPillAnswer}>
                  <Text style={styles.sectionPillText}>ANSWER</Text>
                </View>
              </View>
              <Text style={styles.answerText}>{card.answer}</Text>
            </View>
          ) : (
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>Tap below to reveal the answer</Text>
            </View>
          )}
        </ScrollView>

        {/* Toggle Answer Button */}
        <TouchableOpacity
          style={[
            styles.toggleButton,
            isAnswerVisible ? styles.toggleButtonActive : styles.toggleButtonDefault,
          ]}
          onPress={onToggleAnswer}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={isAnswerVisible ? "Hide Answer" : "Show Answer"}
        >
          <Text style={styles.toggleButtonText}>
            {isAnswerVisible ? "Hide Answer" : "Show Answer"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    minHeight: 330,
    maxHeight: 460,
    padding: 22,
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    // Shadow for iOS
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 5,
  },
  cardDefault: {
    borderColor: '#E2E8F0',
  },
  cardActive: {
    borderColor: '#C7D2FE',
  },
  cardContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
    letterSpacing: 0.8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionPillQuestion: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sectionPillAnswer: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sectionPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 28,
    marginBottom: 16,
  },
  hintContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  hintText: {
    fontSize: 13,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 14,
  },
  answerContainer: {
    marginTop: 4,
  },
  answerText: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
    fontWeight: '400',
  },
  toggleButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // Elevation for Android
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  toggleButtonDefault: {
    backgroundColor: '#4F46E5',
  },
  toggleButtonActive: {
    backgroundColor: '#475569',
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
