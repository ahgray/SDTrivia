import { useState, useEffect } from 'react';
import { Statistics, AnswerRecord, Question } from '../types/game';
import { loadStatistics, saveStatistics, updateStatistics } from '../utils/gameLogic';

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics>(loadStatistics);

  useEffect(() => {
    saveStatistics(statistics);
  }, [statistics]);

  const recordGameResults = (answers: AnswerRecord[], questions: Question[]) => {
    const updatedStats = updateStatistics(statistics, answers, questions);
    setStatistics(updatedStats);
  };

  const resetStatistics = () => {
    const emptyStats: Statistics = {
      totalGamesPlayed: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      categoryStats: {
        history: { attempted: 0, correct: 0 },
        stem: { attempted: 0, correct: 0 }
      },
      questionStats: {}
    };
    setStatistics(emptyStats);
  };

  return {
    statistics,
    recordGameResults,
    resetStatistics
  };
}