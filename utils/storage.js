import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_FLASHCARDS } from '../data/defaultFlashcards';

const STORAGE_KEY = '@codealpha_flashcards_v1';

/**
 * Loads flashcards from local storage.
 * If none are stored yet, falls back to the default flashcards and initializes storage.
 */
export async function loadFlashcards() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      const parsed = JSON.parse(jsonValue);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    // No saved flashcards found; seed with defaults
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FLASHCARDS));
    return DEFAULT_FLASHCARDS;
  } catch (error) {
    console.warn('Error loading flashcards from AsyncStorage:', error);
    // Graceful fallback to default flashcards if storage read fails
    return DEFAULT_FLASHCARDS;
  }
}

/**
 * Saves the current list of flashcards to local storage.
 */
export async function saveFlashcards(flashcards) {
  try {
    const jsonValue = JSON.stringify(flashcards);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.warn('Error saving flashcards to AsyncStorage:', error);
    return false;
  }
}

/**
 * Resets flashcards to the default initial deck.
 */
export async function resetToDefaultFlashcards() {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FLASHCARDS));
    return DEFAULT_FLASHCARDS;
  } catch (error) {
    console.warn('Error resetting flashcards in AsyncStorage:', error);
    return DEFAULT_FLASHCARDS;
  }
}
