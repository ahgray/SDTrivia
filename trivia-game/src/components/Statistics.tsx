import React from 'react';
import { motion } from 'framer-motion';
import { Statistics as StatsType } from '../types/game';

interface StatisticsProps {
  statistics: StatsType;
  onReset: () => void;
  onClose: () => void;
}

export function Statistics({ statistics, onReset, onClose }: StatisticsProps) {
  const overallAccuracy = statistics.totalQuestionsAnswered > 0
    ? Math.round((statistics.totalCorrectAnswers / statistics.totalQuestionsAnswered) * 100)
    : 0;

  const historyAccuracy = statistics.categoryStats.history.attempted > 0
    ? Math.round((statistics.categoryStats.history.correct / statistics.categoryStats.history.attempted) * 100)
    : 0;

  const stemAccuracy = statistics.categoryStats.stem.attempted > 0
    ? Math.round((statistics.categoryStats.stem.correct / statistics.categoryStats.stem.attempted) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Detailed Statistics</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Overall Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Games Played:</span>
                <span className="font-bold text-xl">{statistics.totalGamesPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Questions:</span>
                <span className="font-bold text-xl">{statistics.totalQuestionsAnswered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Correct Answers:</span>
                <span className="font-bold text-xl text-success">{statistics.totalCorrectAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overall Accuracy:</span>
                <span className="font-bold text-xl text-primary">{overallAccuracy}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Category Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">History</span>
                  <span className="font-semibold">
                    {statistics.categoryStats.history.correct}/{statistics.categoryStats.history.attempted} ({historyAccuracy}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${historyAccuracy}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">STEM</span>
                  <span className="font-semibold">
                    {statistics.categoryStats.stem.correct}/{statistics.categoryStats.stem.attempted} ({stemAccuracy}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stemAccuracy}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onReset}
            className="flex-1 bg-error hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Reset Statistics
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}