import React from 'react';
import { motion } from 'framer-motion';
import { Statistics } from '../types/game';

interface GameSetupProps {
  questionCount: number;
  onQuestionCountChange: (count: number) => void;
  onStartGame: () => void;
  statistics: Statistics;
}

export function GameSetup({ questionCount, onQuestionCountChange, onStartGame, statistics }: GameSetupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-4 sm:p-8"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
          SDTrivia Challenge
        </h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            How many questions would you like?
          </h2>
          
          <div className="space-y-4">
            <input
              type="range"
              min="5"
              max="50"
              value={questionCount}
              onChange={(e) => onQuestionCountChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            
            <div className="text-center">
              <span className="text-3xl font-bold text-primary">{questionCount}</span>
              <span className="text-lg text-gray-600 ml-2">questions</span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>5</span>
              <span>50</span>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Games Played</p>
              <p className="text-2xl font-bold text-primary">{statistics.totalGamesPlayed}</p>
            </div>
            <div>
              <p className="text-gray-600">Questions Answered</p>
              <p className="text-2xl font-bold text-primary">{statistics.totalQuestionsAnswered}</p>
            </div>
            <div>
              <p className="text-gray-600">Overall Accuracy</p>
              <p className="text-2xl font-bold text-success">
                {statistics.totalQuestionsAnswered > 0
                  ? Math.round((statistics.totalCorrectAnswers / statistics.totalQuestionsAnswered) * 100)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-gray-600">Categories</p>
              <p className="text-sm">
                <span className="font-semibold">History:</span>{' '}
                {statistics.categoryStats.history.attempted > 0
                  ? Math.round((statistics.categoryStats.history.correct / statistics.categoryStats.history.attempted) * 100)
                  : 0}%
              </p>
              <p className="text-sm">
                <span className="font-semibold">STEM:</span>{' '}
                {statistics.categoryStats.stem.attempted > 0
                  ? Math.round((statistics.categoryStats.stem.correct / statistics.categoryStats.stem.attempted) * 100)
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onStartGame}
          className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          Start Game
        </button>
      </div>
    </motion.div>
  );
}