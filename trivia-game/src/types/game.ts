export interface Question {
  id: string;
  category: 'history' | 'stem';
  subcategory: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  funFact?: string;
}

export interface QuestionsData {
  questions: Question[];
}

export type GamePhase = 'setup' | 'playing' | 'feedback' | 'summary';

export interface GameState {
  phase: GamePhase;
  questionCount: number;
  currentQuestionIndex: number;
  selectedQuestions: Question[];
  currentAnswer: number | null;
  answers: AnswerRecord[];
  showingFeedback: boolean;
}

export interface AnswerRecord {
  questionId: string;
  selectedAnswer: number;
  correct: boolean;
  timestamp: number;
}

export interface Statistics {
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  categoryStats: {
    history: CategoryStat;
    stem: CategoryStat;
  };
  questionStats: Record<string, QuestionStat>;
}

export interface CategoryStat {
  attempted: number;
  correct: number;
}

export interface QuestionStat {
  attempts: number;
  correct: number;
}

export interface GameSummary {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  categoryBreakdown: {
    history: CategoryStat;
    stem: CategoryStat;
  };
}