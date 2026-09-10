# 📱 Flashcard Quiz Mobile App

> **CodeAlpha App Development Internship - Task 1**  
> Built with **React Native** & **Expo** for Android (Expo Go).

---

## 🌟 Overview

The **Flashcard Quiz App** is a native mobile application designed to help students learn and review fundamental Computer Science and Programming concepts. The app displays one card at a time with the question on the front and reveals the answer on the back upon tapping **"Show Answer"**. Users can navigate between cards, add custom flashcards, edit existing cards, delete cards with confirmation, and persist all changes locally via **AsyncStorage**.

---

## ✨ Features

- **Card Display**: Shows one card at a time with rounded corners, elevated shadow, readable typography, and topic badge.
- **Show/Hide Answer**: Front displays the question; tapping "Show Answer" reveals the answer. Tapping "Hide Answer" hides it again.
- **Next & Previous Navigation**: Easily move forward and backward across cards.
  - Previous is disabled on the first card.
  - Next is disabled on the last card.
  - Answer visibility resets automatically when changing cards.
- **Card Counter & Progress**: Shows `Card X of Y` along with a dynamic visual progress bar.
- **Default CS Deck (10 Cards)**: Includes beginner-level questions covering Java, Arrays, Linked Lists, OOP, Inheritance, Databases, SQL, APIs, Git, and Algorithms.
- **Add Flashcard**: Modal dialog with form validation (non-empty question and answer). Adds new cards immediately.
- **Edit Flashcard**: Pre-fills existing card data and allows in-place updates.
- **Delete Flashcard**: Prompts with a confirmation dialog (`Cancel` / `Delete`). Safely adjusts indices and prevents crashes if the last card is deleted.
- **Empty State**: Friendly screen with actions to add a new card or restore the 10 default cards if all cards are deleted.
- **Local Storage (`AsyncStorage`)**: Persists all additions, edits, and deletions across app restarts without requiring any backend.

---

## 📂 Project Structure

```
flashcard-quiz-app/
├── App.js                     # Main application logic, navigation, and state
├── app.json                   # Expo configuration file
├── package.json               # Dependencies and scripts
├── start.bat                  # One-click Windows runner script
├── assets/                    # Mobile app icons and splash assets
├── components/
│   ├── Flashcard.js           # Front/Back card component with Show/Hide Answer
│   ├── CardModal.js           # Add / Edit flashcard modal with validation
│   ├── DeleteModal.js         # Delete confirmation dialog
│   └── EmptyState.js          # Fallback UI when deck is empty
├── data/
│   └── defaultFlashcards.js   # 10 default CS flashcards
├── utils/
│   └── storage.js             # AsyncStorage helper functions
└── tests/
    └── verify-app.js          # Automated verification script
```

---

## 📦 Dependencies

- `expo` (~57.0.21)
- `react` (19.2.3)
- `react-native` (0.86.3)
- `@react-native-async-storage/async-storage` (2.2.0)
- `expo-status-bar` (~57.0.1)

---

## 🚀 How to Run the App

### Option A: Using the One-Click Batch File (Windows)
Double-click `start.bat` in the project directory.

### Option B: Using Terminal / PowerShell
1. Open PowerShell or Command Prompt.
2. Navigate to the project folder:
   ```bash
   cd flashcard-quiz-app
   ```
3. Ensure Node is in your PATH (if not already set):
   ```powershell
   $env:PATH = "C:\Users\tejas\OneDrive\Desktop\Tejashwini\CodeAlpha;" + $env:PATH
   ```
4. Start the Expo development server:
   ```bash
   npx expo start
   ```

---

## 📲 How to Open on an Android Phone using Expo Go

1. Install **Expo Go** from the Google Play Store on your Android phone.
2. Connect your Android phone to the **same Wi-Fi network** as your computer.
3. In your terminal, run `npx expo start`. A large QR code will appear in the terminal and in your browser Expo developer tools.
4. Open the **Expo Go** app on your phone:
   - Tap **"Scan QR code"**.
   - Point your camera at the QR code displayed in the terminal.
5. The app will bundle and run natively on your Android device!

---

## 📋 CodeAlpha Task 1 Requirements Checklist

| Requirement | Description | Status |
|---|---|---|
| **Mobile App (Not Web)** | Built using React Native & Expo for Android Expo Go | ✅ Completed |
| **Clean Project Structure** | `App.js`, `components/Flashcard.js`, `assets/`, `package.json` | ✅ Completed |
| **Card Front / Back** | Shows Question on front, Answer revealed on back | ✅ Completed |
| **Show/Hide Answer** | Prominent button toggling between "Show Answer" and "Hide Answer" | ✅ Completed |
| **Navigation** | "Previous" & "Next" buttons with boundary disabling | ✅ Completed |
| **Card Counter** | Displays "Card X of Y" counter | ✅ Completed |
| **State Reset on Nav** | Answer visibility automatically resets on card switch | ✅ Completed |
| **10 Default Cards** | Java, Array, Linked List, OOP, Inheritance, Database, SQL, API, Git, Algorithm | ✅ Completed |
| **Add Flashcard** | Modal with Question & Answer text inputs and validation | ✅ Completed |
| **Edit Flashcard** | Edit current card with pre-filled inputs and validation | ✅ Completed |
| **Delete Flashcard** | Delete current card with confirmation dialog (`Cancel` / `Delete`) | ✅ Completed |
| **Zero-Card Handling** | Friendly empty-state UI with Add & Restore options | ✅ Completed |
| **AsyncStorage** | Local persistence across app restarts | ✅ Completed |
| **UI Design & Spacing** | Professional mobile styling, rounded cards, responsive layout | ✅ Completed |
| **Accessibility & Usability** | Large touch targets (>=44dp), clean contrast, keyboard avoidance | ✅ Completed |
| **Error Handling** | Validates empty inputs, handles storage errors, never crashes | ✅ Completed |
| **No Backend Required** | 100% client-side mobile app without unnecessary databases/APIs | ✅ Completed |
