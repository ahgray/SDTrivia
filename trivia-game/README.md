# SDTrivia - History & STEM Trivia Game

A modern, reactive web-based trivia game featuring questions from history and STEM topics with configurable gameplay, persistent statistics tracking, and a sleek interface.

## Features

- **Configurable Game Sessions**: Choose between 5-50 questions per game
- **Two Categories**: History and STEM questions with varying difficulty levels
- **Immediate Feedback**: Get explanations and fun facts after each answer
- **Persistent Statistics**: Track your performance across sessions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Built with Framer Motion for polished transitions

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Storage**: LocalStorage for statistics persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
cd trivia-game
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Game Flow

1. **Setup Phase**: Configure number of questions and view your statistics
2. **Playing Phase**: Answer multiple-choice questions one by one
3. **Feedback Phase**: See immediate feedback with explanations after each answer
4. **Summary Phase**: View your performance breakdown at the end

## Question Database

The game includes 100+ carefully curated questions across:
- **History**: Ancient civilizations, world wars, famous figures, historical events
- **STEM**: Physics, chemistry, biology, mathematics, technology, energy policy

## Statistics Tracking

The game tracks:
- Total games played
- Questions answered per category
- Accuracy rates
- Individual question performance

Statistics are stored locally and persist between sessions.

## Project Structure

```
trivia-game/
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── data/            # Question database
│   └── App.tsx          # Main application component
├── public/              # Static assets
└── package.json
```

## License

This project is built as part of the SDTrivia challenge.