import React, { useState, useEffect } from 'react';
import { GameSetup } from './components/GameSetup';
import { QuestionCard } from './components/QuestionCard';
import { AnswerFeedback } from './components/AnswerFeedback';
import { ProgressBar } from './components/ProgressBar';
import { GameSummary } from './components/GameSummary';
import { Statistics } from './components/Statistics';
import { useGameState } from './hooks/useGameState';
import { useQuestions } from './hooks/useQuestions';
import { useStatistics } from './hooks/useStatistics';
import { calculateGameSummary } from './utils/gameLogic';

function App() {
  const { questions, loading, error } = useQuestions();
  const { gameState, startGame, selectAnswer, nextQuestion, resetGame, setQuestionCount } = useGameState(questions);
  const { statistics, recordGameResults, resetStatistics } = useStatistics();
  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    if (gameState.phase === 'summary' && gameState.answers.length > 0) {
      recordGameResults(gameState.answers, gameState.selectedQuestions);
    }
  }, [gameState.phase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-red-600">Error loading questions: {error}</div>
      </div>
    );
  }

  const currentQuestion = gameState.selectedQuestions[gameState.currentQuestionIndex];
  const isLastQuestion = gameState.currentQuestionIndex === gameState.selectedQuestions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      {gameState.phase === 'setup' && (
        <>
          <GameSetup
            questionCount={gameState.questionCount}
            onQuestionCountChange={setQuestionCount}
            onStartGame={() => startGame(gameState.questionCount)}
            statistics={statistics}
          />
          <div className="text-center mt-4">
            <button
              onClick={() => setShowStatistics(true)}
              className="text-primary hover:text-blue-700 underline font-medium"
            >
              View Detailed Statistics
            </button>
          </div>
        </>
      )}

      {gameState.phase === 'playing' && currentQuestion && (
        <>
          <ProgressBar 
            current={gameState.currentQuestionIndex + 1} 
            total={gameState.selectedQuestions.length}
          />
          <QuestionCard
            question={currentQuestion}
            currentAnswer={gameState.currentAnswer}
            showingFeedback={gameState.showingFeedback}
            onSelectAnswer={selectAnswer}
            questionNumber={gameState.currentQuestionIndex + 1}
            totalQuestions={gameState.selectedQuestions.length}
          />
          {gameState.showingFeedback && gameState.currentAnswer !== null && (
            <div className="max-w-2xl mx-auto px-8">
              <AnswerFeedback
                question={currentQuestion}
                selectedAnswer={gameState.currentAnswer}
                onNext={nextQuestion}
                isLastQuestion={isLastQuestion}
              />
            </div>
          )}
        </>
      )}

      {gameState.phase === 'summary' && (
        <GameSummary
          summary={calculateGameSummary(gameState.answers, gameState.selectedQuestions)}
          onPlayAgain={resetGame}
        />
      )}

      {showStatistics && (
        <Statistics
          statistics={statistics}
          onReset={resetStatistics}
          onClose={() => setShowStatistics(false)}
        />
      )}
    </div>
  );
}

export default App;