# Trivia Game - Claude Code Instructions

## Project Overview
Build a modern, reactive web-based trivia game focused on history and STEM topics. The game should feature configurable gameplay, persistent statistics tracking, immediate feedback, and a sleek modern interface.

## Tech Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS + Framer Motion for animations
- **Build Tool**: Vite
- **Storage**: LocalStorage for statistics persistence
- **Data**: JSON file for question database

## Key Requirements

### Core Functionality
1. **Configurable game setup** - Users can select 5-50 questions per session
2. **Random question selection** from history and STEM categories
3. **Immediate feedback** after each answer with correct answer and explanation
4. **Persistent statistics** tracking right/wrong answers per question and category
5. **Session recap** showing performance summary at game end
6. **Modern, responsive UI** with smooth animations and transitions

### Question Database Format
Create `src/data/questions.json` with this structure:
```json
{
  "questions": [
    {
      "id": "unique_id",
      "category": "history" | "stem",
      "subcategory": "specific_topic",
      "difficulty": "easy" | "medium" | "hard",
      "question": "Question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0, // index of correct option
      "explanation": "Why this answer is correct",
      "funFact": "Optional interesting related fact"
    }
  ]
}
```

### Statistics Schema (LocalStorage)
```javascript
{
  "triviaGameStats": {
    "totalGamesPlayed": number,
    "totalQuestionsAnswered": number,
    "totalCorrectAnswers": number,
    "categoryStats": {
      "history": { "attempted": number, "correct": number },
      "stem": { "attempted": number, "correct": number }
    },
    "questionStats": {
      "question_id": { "attempts": number, "correct": number }
    }
  }
}
```

## Component Architecture

### Main Components to Build
1. **App.tsx** - Main game controller and state management
2. **GameSetup.tsx** - Configuration screen with question count selector
3. **QuestionCard.tsx** - Display question with multiple choice options
4. **AnswerFeedback.tsx** - Show correct/incorrect feedback with explanation
5. **GameSummary.tsx** - End-game performance recap
6. **Statistics.tsx** - Persistent statistics dashboard
7. **ProgressBar.tsx** - Game progress indicator

### Custom Hooks to Implement
- **useGameState** - Manage overall game flow and state
- **useQuestions** - Load and manage question data
- **useStatistics** - Handle statistics persistence and calculations

## Game Flow States
1. **Setup Phase** - Welcome screen, configure settings, show stats preview
2. **Playing Phase** - Display questions one by one with answer selection
3. **Feedback Phase** - Show immediate feedback after each answer
4. **Summary Phase** - Final score and session performance breakdown

## UI/UX Guidelines

### Design Principles
- **Modern and clean** - Use contemporary web design patterns
- **Responsive** - Mobile-first approach with touch-friendly interactions
- **Accessible** - Proper contrast, semantic HTML, keyboard navigation
- **Animated** - Smooth transitions between states and micro-interactions

### Color Scheme
- Primary: Deep blue (#1e40af) for trust and intelligence
- Success: Emerald green (#059669) for correct answers
- Warning: Amber (#f59e0b) for attention and highlights
- Error: Red (#dc2626) for incorrect answers
- Background: Clean whites and light grays with optional dark mode

### Typography
- Use system fonts or modern web fonts (Inter, Poppins)
- Clear hierarchy with appropriate font sizes and weights
- Ensure readability across all device sizes

## Implementation Priority

### Phase 1 - Core Game (MVP)
1. Set up React + TypeScript + Vite project
2. Create basic component structure
3. Implement question loading from the provided questions.json (100+ questions ready)
4. Build core game flow (setup → question → feedback → summary)
5. Add basic styling with Tailwind CSS

### Phase 2 - Enhanced Features  
1. Implement statistics tracking and persistence
2. Add smooth animations and transitions with Framer Motion
3. Enhance UI with modern design elements (dark mode, glassmorphism effects)
4. Add progress indicators and visual feedback
5. Implement fully responsive design for mobile/tablet

### Phase 3 - Polish & Optimization
1. Add comprehensive error handling and loading states
2. Optimize performance for 60fps animations
3. Enhance accessibility features (keyboard navigation, screen readers)
4. Add advanced animations and micro-interactions
5. Test across different devices and browsers
6. Add question categories filtering and advanced statistics

## Sample Question Data
Start with 20-30 sample questions across both categories to test the system:
- **History**: Ancient civilizations, world wars, famous figures, historical events
- **STEM**: Basic physics, chemistry, biology, mathematics, technology concepts

## Quality Standards
- **Type Safety**: Use TypeScript interfaces for all data structures
- **Performance**: Optimize for smooth 60fps animations
- **Accessibility**: WCAG 2.1 AA compliance
- **Code Quality**: Clean, commented, and maintainable code
- **Error Handling**: Graceful degradation for all failure scenarios

## Testing Approach
- Test question loading and validation
- Verify statistics persistence across sessions
- Ensure game flow works correctly for different question counts
- Test responsive design on various screen sizes
- Validate accessibility features

## Future Enhancements (Optional)
- Multiplayer functionality
- Question difficulty adaptation based on performance
- Social sharing of results
- Achievement/badge system
- Custom question categories
- Offline PWA capabilities

## File Structure Target
```
trivia-game/
├── src/
│   ├── components/
│   │   ├── GameSetup.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerFeedback.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── GameSummary.tsx
│   │   └── Statistics.tsx
│   ├── hooks/
│   │   ├── useGameState.ts
│   │   ├── useQuestions.ts
│   │   └── useStatistics.ts
│   ├── types/
│   │   └── game.ts
│   ├── utils/
│   │   └── gameLogic.ts
│   ├── data/
│   │   └── questions.json
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

## Success Criteria
The completed game should:
- ✅ Allow users to configure and play trivia sessions (5-50 questions)
- ✅ Provide immediate, educational feedback with explanations and fun facts
- ✅ Track and display meaningful statistics per question and category
- ✅ Offer a modern, engaging user experience with smooth animations
- ✅ Work seamlessly across desktop and mobile devices
- ✅ Handle a robust database of 100+ high-quality questions
- ✅ Maintain performance with responsive design
- ✅ Handle edge cases gracefully (no questions selected, connectivity issues, etc.)

The questions database is ready to use with comprehensive coverage of both STEM and History topics. Start with the core game mechanics and build iteratively. Focus on creating a solid foundation that can be enhanced over time.