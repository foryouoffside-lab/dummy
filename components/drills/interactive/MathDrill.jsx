'use client';

import { useState, useEffect } from 'react';
import { Zap, Clock, Award, Brain } from 'lucide-react';

export default function MathDrill({ onComplete, difficulty = 'medium' }) {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  
  const difficulties = {
    easy: { time: 60, operations: ['+', '-'], maxNumber: 20 },
    medium: { time: 60, operations: ['+', '-', '*'], maxNumber: 50 },
    hard: { time: 60, operations: ['+', '-', '*', '/'], maxNumber: 100 },
    expert: { time: 60, operations: ['+', '-', '*', '/'], maxNumber: 200 }
  };
  
  const currentDiff = difficulties[difficulty] || difficulties.medium;
  
  useEffect(() => {
    if (gameState === 'playing') {
      generateQuestion();
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameState]);
  
  const generateQuestion = () => {
    const operation = currentDiff.operations[Math.floor(Math.random() * currentDiff.operations.length)];
    let num1, num2, answer;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * currentDiff.maxNumber) + 1;
        num2 = Math.floor(Math.random() * currentDiff.maxNumber) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * currentDiff.maxNumber) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      case '/':
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = Math.floor(Math.random() * 12) + 1;
        num1 = num2 * answer;
        break;
    }
    
    setCurrentQuestion({ num1, num2, operation, answer });
    setAnswer('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentQuestion) return;
    
    const userAnswer = parseInt(answer);
    const isCorrect = userAnswer === currentQuestion.answer;
    
    setQuestionsAnswered(prev => prev + 1);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
      const pointsEarned = 10 + Math.floor(streak / 5) * 5;
      setScore(prev => prev + pointsEarned);
    } else {
      setStreak(0);
    }
    
    generateQuestion();
  };
  
  const endGame = () => {
    setGameState('gameOver');
    const accuracy = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0;
    
    if (onComplete) {
      onComplete({
        score,
        accuracy,
        questionsAnswered,
        correctAnswers,
        timeSpent: 60 - timeLeft
      });
    }
  };
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setQuestionsAnswered(0);
    setCorrectAnswers(0);
    setStreak(0);
  };
  
  const getOperationSymbol = (op) => {
    switch (op) {
      case '+': return '+';
      case '-': return '−';
      case '*': return '×';
      case '/': return '÷';
      default: return op;
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Zap className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-blue-600">{score}</p>
          <p className="text-xs text-gray-500">Score</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <Brain className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
          <p className="text-xs text-gray-500">Correct</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <Clock className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-yellow-600">{timeLeft}s</p>
          <p className="text-xs text-gray-500">Time</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-purple-600">{streak}</p>
          <p className="text-xs text-gray-500">Streak</p>
        </div>
      </div>
      
      {/* Question Area */}
      {gameState === 'playing' && currentQuestion && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-6">
          <div className="text-center">
            <p className="text-6xl font-bold text-white mb-6">
              {currentQuestion.num1} {getOperationSymbol(currentQuestion.operation)} {currentQuestion.num2} = ?
            </p>
            <form onSubmit={handleSubmit} className="flex gap-4 justify-center">
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-32 px-4 py-3 text-2xl text-center border-2 border-white bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="?"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center">
          <Brain className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Quick Math</h3>
          <p className="text-blue-100 mb-6">Solve as many problems as you can in 60 seconds!</p>
          <button
            onClick={startGame}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Game
          </button>
        </div>
      )}
      
      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <div className="bg-white rounded-xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Time's Up!</h3>
          <div className="space-y-2 mb-6">
            <p className="flex justify-between">
              <span className="text-gray-600">Final Score:</span>
              <span className="font-bold text-blue-600">{score}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Correct Answers:</span>
              <span className="font-bold text-green-600">{correctAnswers}/{questionsAnswered}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Accuracy:</span>
              <span className="font-bold text-purple-600">
                {questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0}%
              </span>
            </p>
          </div>
          <button
            onClick={startGame}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Play Again
          </button>
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          🧮 Solve math problems quickly. Each correct answer gives 10 points + bonus for streaks!
        </p>
      </div>
    </div>
  );
}