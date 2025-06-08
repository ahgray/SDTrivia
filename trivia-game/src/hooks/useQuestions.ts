import { useState, useEffect } from 'react';
import { Question, QuestionsData } from '../types/game';
import questionsData from '../data/questions.json';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = questionsData as QuestionsData;
      setQuestions(data.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { questions, loading, error };
}