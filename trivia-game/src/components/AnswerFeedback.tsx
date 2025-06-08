import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types/game';

interface AnswerFeedbackProps {
  question: Question;
  selectedAnswer: number;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function AnswerFeedback({ question, selectedAnswer, onNext, isLastQuestion }: AnswerFeedbackProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 rounded-lg bg-gray-50"
    >
      <div className="flex items-center mb-4">
        {isCorrect ? (
          <>
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-success">Correct!</h3>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-error flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-error">Incorrect</h3>
          </>
        )}
      </div>

      {!isCorrect && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">The correct answer was:</p>
          <p className="font-semibold text-gray-800">
            {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
          </p>
        </div>
      )}

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Explanation:</h4>
        <p className="text-gray-600">{question.explanation}</p>
      </div>

      {question.funFact && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-primary">
          <h4 className="font-semibold text-primary mb-1">Fun Fact!</h4>
          <p className="text-gray-700">{question.funFact}</p>
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        {isLastQuestion ? 'View Results' : 'Next Question'}
      </button>
    </motion.div>
  );
}