import React from 'react';
import { motion } from 'framer-motion';
import { GameSummary as GameSummaryType } from '../types/game';

interface GameSummaryProps {
  summary: GameSummaryType;
  onPlayAgain: () => void;
}

export function GameSummary({ summary, onPlayAgain }: GameSummaryProps) {
  const getScoreColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-success';
    if (accuracy >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreMessage = (accuracy: number) => {
    if (accuracy >= 90) return 'Outstanding!';
    if (accuracy >= 80) return 'Great job!';
    if (accuracy >= 70) return 'Well done!';
    if (accuracy >= 60) return 'Good effort!';
    return 'Keep practicing!';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto p-4 sm:p-8"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Game Complete!
        </h1>

        <div className="text-center mb-8">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(summary.accuracy)}`}>
            {Math.round(summary.accuracy)}%
          </div>
          <p className="text-2xl font-semibold text-gray-700">
            {getScoreMessage(summary.accuracy)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Score Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Correct Answers:</span>
                <span className="font-semibold text-success">{summary.correctAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Incorrect Answers:</span>
                <span className="font-semibold text-error">{summary.incorrectAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Questions:</span>
                <span className="font-semibold">{summary.totalQuestions}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Category Performance</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">History:</span>
                  <span className="font-semibold">
                    {summary.categoryBreakdown.history.correct}/{summary.categoryBreakdown.history.attempted}
                  </span>
                </div>
                {summary.categoryBreakdown.history.attempted > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(summary.categoryBreakdown.history.correct / summary.categoryBreakdown.history.attempted) * 100}%`
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">STEM:</span>
                  <span className="font-semibold">
                    {summary.categoryBreakdown.stem.correct}/{summary.categoryBreakdown.stem.attempted}
                  </span>
                </div>
                {summary.categoryBreakdown.stem.attempted > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(summary.categoryBreakdown.stem.correct / summary.categoryBreakdown.stem.attempted) * 100}%`
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
}