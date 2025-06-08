import { Question, Statistics, GameSummary, AnswerRecord } from '../types/game';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectRandomQuestions(questions: Question[], count: number): Question[] {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
}

export function calculateGameSummary(answers: AnswerRecord[], questions: Question[]): GameSummary {
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter(a => a.correct).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const categoryBreakdown = {
    history: { attempted: 0, correct: 0 },
    stem: { attempted: 0, correct: 0 }
  };

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      categoryBreakdown[question.category].attempted++;
      if (answer.correct) {
        categoryBreakdown[question.category].correct++;
      }
    }
  });

  return {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    accuracy,
    categoryBreakdown
  };
}

const STORAGE_KEY = 'triviaGameStats';

export function loadStatistics(): Statistics {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  return {
    totalGamesPlayed: 0,
    totalQuestionsAnswered: 0,
    totalCorrectAnswers: 0,
    categoryStats: {
      history: { attempted: 0, correct: 0 },
      stem: { attempted: 0, correct: 0 }
    },
    questionStats: {}
  };
}

export function saveStatistics(stats: Statistics): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function updateStatistics(
  currentStats: Statistics,
  answers: AnswerRecord[],
  questions: Question[]
): Statistics {
  const newStats = { ...currentStats };
  
  newStats.totalGamesPlayed++;
  newStats.totalQuestionsAnswered += answers.length;
  newStats.totalCorrectAnswers += answers.filter(a => a.correct).length;

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      newStats.categoryStats[question.category].attempted++;
      if (answer.correct) {
        newStats.categoryStats[question.category].correct++;
      }

      if (!newStats.questionStats[question.id]) {
        newStats.questionStats[question.id] = { attempts: 0, correct: 0 };
      }
      newStats.questionStats[question.id].attempts++;
      if (answer.correct) {
        newStats.questionStats[question.id].correct++;
      }
    }
  });

  return newStats;
}