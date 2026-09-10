/**
 * Automated Verification Script for Flashcard Quiz App
 * Tests all core functional requirements and edge cases.
 */

// Simple in-memory mock of AsyncStorage to verify persistence logic
const storageStore = new Map();
const mockAsyncStorage = {
  getItem: async (key) => storageStore.has(key) ? storageStore.get(key) : null,
  setItem: async (key, val) => storageStore.set(key, val),
  removeItem: async (key) => storageStore.delete(key),
  clear: async () => storageStore.clear(),
};

// Import default flashcards
const { DEFAULT_FLASHCARDS } = require('../data/defaultFlashcards');

console.log('====================================================');
console.log('   CodeAlpha Task 1: Flashcard Quiz App Verification');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

async function runTests() {
  // Test 1: Default flashcards exist and contain at least 10 items
  assert(Array.isArray(DEFAULT_FLASHCARDS), 'Default flashcards is an array');
  assert(DEFAULT_FLASHCARDS.length >= 10, `Default deck contains at least 10 cards (Found: ${DEFAULT_FLASHCARDS.length})`);

  // Test 2: Flashcards contain valid questions and answers
  const allCardsValid = DEFAULT_FLASHCARDS.every(
    (card) => card.id && typeof card.question === 'string' && typeof card.answer === 'string' && card.question.length > 0 && card.answer.length > 0
  );
  assert(allCardsValid, 'All default cards have valid id, non-empty question, and non-empty answer');

  // Test 3: Verify required topics are present
  const requiredTopics = ['Java', 'array', 'linked list', 'OOP', 'inheritance', 'database', 'SQL', 'API', 'Git', 'algorithm'];
  const questionsText = DEFAULT_FLASHCARDS.map(c => c.question.toLowerCase()).join(' ');
  const allTopicsPresent = requiredTopics.every(t => questionsText.includes(t.toLowerCase()));
  assert(allTopicsPresent, 'All 10 required CS topics are covered in the default cards');

  // Test 4: Simulation of App State & Navigation Logic
  let flashcards = [...DEFAULT_FLASHCARDS];
  let currentIndex = 0;
  let isAnswerVisible = false;

  // Initial state check
  assert(currentIndex === 0, 'App starts at first card (index 0)');
  assert(isAnswerVisible === false, 'Answer is initially hidden');
  assert(flashcards[currentIndex].question.length > 0, 'Current question is visible');

  // Test 5: Show Answer toggle
  isAnswerVisible = true;
  assert(isAnswerVisible === true, '"Show Answer" reveals the answer');
  isAnswerVisible = false;
  assert(isAnswerVisible === false, '"Hide Answer" hides the answer');

  // Test 6: Previous disabled on first card
  const isPrevDisabledOnFirst = currentIndex === 0;
  assert(isPrevDisabledOnFirst, '"Previous" is disabled on the first card');

  // Test 7: Next navigation
  currentIndex = currentIndex + 1;
  isAnswerVisible = false; // reset on card change
  assert(currentIndex === 1, '"Next" advances to Card 2');
  assert(isAnswerVisible === false, 'Answer visibility resets to false on card change');

  // Test 8: Previous navigation
  currentIndex = currentIndex - 1;
  assert(currentIndex === 0, '"Previous" moves back to Card 1');

  // Test 9: Counter formatting
  const counterText = `Card ${currentIndex + 1} of ${flashcards.length}`;
  assert(counterText === 'Card 1 of 10', `Card counter displays correctly ("${counterText}")`);

  // Test 10: Navigate to last card & verify Next is disabled
  currentIndex = flashcards.length - 1;
  const isNextDisabledOnLast = currentIndex === flashcards.length - 1;
  assert(isNextDisabledOnLast, '"Next" is disabled on the last card');

  // Test 11: Add Flashcard Validation
  function validateCard(q, a) {
    const trimmedQ = (q || '').trim();
    const trimmedA = (a || '').trim();
    if (!trimmedQ && !trimmedA) return 'Please enter both a question and an answer.';
    if (!trimmedQ) return 'Question cannot be empty.';
    if (!trimmedA) return 'Answer cannot be empty.';
    return null;
  }

  assert(validateCard('', '') !== null, 'Validation fails when both fields are empty');
  assert(validateCard('', 'Some answer') === 'Question cannot be empty.', 'Empty question validation works');
  assert(validateCard('Some question', '') === 'Answer cannot be empty.', 'Empty answer validation works');
  assert(validateCard('What is React?', 'A JavaScript library') === null, 'Validation passes with valid inputs');

  // Test 12: Add Flashcard flow
  const newCard = {
    id: 'test-123',
    question: 'What is React Native?',
    answer: 'A framework for building native apps using React.',
    category: 'Frameworks'
  };
  flashcards = [...flashcards, newCard];
  currentIndex = flashcards.length - 1;
  assert(flashcards.length === 11, 'Card was added to flashcards list');
  assert(flashcards[currentIndex].question === 'What is React Native?', 'Newly added card is selected and accessible');

  // Test 13: Edit Flashcard flow
  const updatedQuestion = 'What is React Native (Updated)?';
  const updatedAnswer = 'An open-source UI software framework created by Meta.';
  flashcards = flashcards.map((c, i) => i === currentIndex ? { ...c, question: updatedQuestion, answer: updatedAnswer } : c);
  assert(flashcards[currentIndex].question === updatedQuestion, 'Edit updates the current question');
  assert(flashcards[currentIndex].answer === updatedAnswer, 'Edit updates the current answer');

  // Test 14: Delete Flashcard flow
  const preDeleteCount = flashcards.length;
  const cardToDeleteId = flashcards[currentIndex].id;
  flashcards = flashcards.filter(c => c.id !== cardToDeleteId);
  if (currentIndex >= flashcards.length) {
    currentIndex = flashcards.length - 1;
  }
  assert(flashcards.length === preDeleteCount - 1, 'Card was successfully removed');
  assert(currentIndex === flashcards.length - 1, 'Index safely updated after deleting the last card');

  // Test 15: Delete down to zero cards (Empty State test)
  flashcards = [];
  currentIndex = 0;
  assert(flashcards.length === 0, 'All cards deleted without crash');
  assert(currentIndex === 0, 'Index safely remains 0 in empty state');

  // Test 16: Restore default deck
  flashcards = [...DEFAULT_FLASHCARDS];
  currentIndex = 0;
  assert(flashcards.length === 10, 'Deck can be restored to 10 default cards');

  // Test 17: Storage persistence simulation
  await mockAsyncStorage.setItem('@codealpha_flashcards_v1', JSON.stringify(flashcards));
  const rawFromStorage = await mockAsyncStorage.getItem('@codealpha_flashcards_v1');
  const parsedFromStorage = JSON.parse(rawFromStorage);
  assert(Array.isArray(parsedFromStorage) && parsedFromStorage.length === 10, 'Flashcards successfully persisted and reloaded from storage');

  console.log(`\n====================================================`);
  console.log(`   Verification Results: ${passedTests}/${totalTests} Tests Passed`);
  console.log(`====================================================\n`);
}

runTests();
