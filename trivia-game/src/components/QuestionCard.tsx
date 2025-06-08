import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types/game';

interface QuestionCardProps {
  question: Question;
  currentAnswer: number | null;
  showingFeedback: boolean;
  onSelectAnswer: (index: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  currentAnswer,
  showingFeedback,
  onSelectAnswer,
  questionNumber,
  totalQuestions
}: QuestionCardProps) {
  const getOptionClassName = (index: number) => {
    const baseClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-medium";
    
    if (!showingFeedback) {
      if (currentAnswer === index) {
        return `${baseClasses} border-primary bg-blue-50 text-primary`;
      }
      return `${baseClasses} border-gray-300 hover:border-gray-400 hover:bg-gray-50`;
    }
    
    if (index === question.correctAnswer) {
      return `${baseClasses} border-success bg-green-50 text-success`;
    }
    
    if (currentAnswer === index && index !== question.correctAnswer) {
      return `${baseClasses} border-error bg-red-50 text-error`;
    }
    
    return `${baseClasses} border-gray-300 opacity-50`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto p-4 sm:p-8"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-600">
              {question.category.toUpperCase()} - {question.subcategory}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-gray-200 rounded text-gray-700">
              {question.difficulty.toUpperCase()}
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showingFeedback && onSelectAnswer(index)}
              disabled={showingFeedback}
              className={getOptionClassName(index)}
            >
              <span className="flex items-center">
                <span className="w-8 h-8 rounded-full border-2 mr-3 flex items-center justify-center text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}