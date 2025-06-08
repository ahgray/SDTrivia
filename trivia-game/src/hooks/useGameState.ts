import { useState, useCallback } from 'react';
import { GameState, Question, AnswerRecord } from '../types/game';
import { selectRandomQuestions } from '../utils/gameLogic';

const initialState: GameState = {
  phase: 'setup',
  questionCount: 10,
  currentQuestionIndex: 0,
  selectedQuestions: [],
  currentAnswer: null,
  answers: [],
  showingFeedback: false
};

export function useGameState(allQuestions: Question[]) {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const startGame = useCallback((questionCount: number) => {
    const selectedQuestions = selectRandomQuestions(allQuestions, questionCount);
    setGameState({
      ...initialState,
      phase: 'playing',
      questionCount,
      selectedQuestions
    });
  }, [allQuestions]);

  const selectAnswer = useCallback((answerIndex: number) => {
    setGameState(prev => ({
      ...prev,
      currentAnswer: answerIndex,
      showingFeedback: true
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setGameState(prev => {
      const currentQuestion = prev.selectedQuestions[prev.currentQuestionIndex];
      const isCorrect = prev.currentAnswer === currentQuestion.correctAnswer;
      
      const newAnswer: AnswerRecord = {
        questionId: currentQuestion.id,
        selectedAnswer: prev.currentAnswer!,
        correct: isCorrect,
        timestamp: Date.now()
      };

      const newAnswers = [...prev.answers, newAnswer];
      const isLastQuestion = prev.currentQuestionIndex === prev.selectedQuestions.length - 1;

      if (isLastQuestion) {
        return {
          ...prev,
          answers: newAnswers,
          phase: 'summary'
        };
      }

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        currentAnswer: null,
        answers: newAnswers,
        showingFeedback: false
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  const setQuestionCount = useCallback((count: number) => {
    setGameState(prev => ({
      ...prev,
      questionCount: count
    }));
  }, []);

  return {
    gameState,
    startGame,
    selectAnswer,
    nextQuestion,
    resetGame,
    setQuestionCount
  };
}