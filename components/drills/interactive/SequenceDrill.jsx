'use client';

import { useState, useEffect, useCallback } from 'react';
import { Brain, Zap, Clock, Award, ListChecks } from 'lucide-react';

export default function SequenceDrill({ onComplete, difficulty = 'medium' }) {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  
  const difficulties = {
    easy: { speed: 800, initialLength: 3, numbers: 4 },
    medium: { speed: 700, initialLength: 4, numbers: 6 },
    hard: { speed: 600, initialLength: 5, numbers: 8 },
    expert: { speed: 500, initialLength: 6, numbers: 10 }
  };
  
  const currentDiff = difficulties[difficulty] || difficulties.medium;
  
  useEffect(() => {
    if (gameState === 'playing' && sequence.length === 0) {
      startNewRound();
    }
  }, [gameState]);
  
  const generateSequence = useCallback(() => {
    const newSequence = [];
    const length = currentDiff.initialLength + Math.floor(level / 2);
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * currentDiff.numbers) + 1);
    }
    return newSequence;
  }, [level, currentDiff]);
  
  const showSequence = useCallback(async (seq) => {
    setIsShowing(true);
    setMessage('Watch the sequence...');
    
    for (let i = 0; i < seq.length; i++) {
      setCurrentIndex(i);
      await new Promise(resolve => setTimeout(resolve, currentDiff.speed));
      setCurrentIndex(-1);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsShowing(false);
    setMessage('Your turn! Repeat the sequence');
    setPlayerSequence([]);
  }, [currentDiff]);
  
  const startNewRound = () => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    showSequence(newSequence);
  };
  
  const handleNumberClick = (number) => {
    if (gameState !== 'playing' || isShowing) return;
    
    const newPlayerSequence = [...playerSequence, number];
    setPlayerSequence(newPlayerSequence);
    
    if (number !== sequence[playerSequence.length]) {
      setGameState('gameOver');
      setMessage(`Game Over! You reached level ${level}`);
      
      if (onComplete) {
        onComplete({
          score,
          level: level - 1,
          accuracy: (playerSequence.length / sequence.length) * 100
        });
      }
      return;
    }
    
    if (newPlayerSequence.length === sequence.length) {
      const pointsEarned = 100 * level;
      setScore(prev => prev + pointsEarned);
      setLevel(prev => prev + 1);
      setMessage(`Correct! +${pointsEarned} points!`);
      
      setTimeout(() => {
        const newSequence = generateSequence();
        setSequence(newSequence);
        showSequence(newSequence);
      }, 1500);
    }
  };
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setSequence([]);
    setPlayerSequence([]);
    setMessage('');
  };
  
  const numbers = Array.from({ length: currentDiff.numbers }, (_, i) => i + 1);
  
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
          <p className="text-2xl font-bold text-green-600">{level}</p>
          <p className="text-xs text-gray-500">Level</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <ListChecks className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-purple-600">{sequence.length}</p>
          <p className="text-xs text-gray-500">Sequence Length</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <Clock className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-yellow-600">{playerSequence.length}</p>
          <p className="text-xs text-gray-500">Progress</p>
        </div>
      </div>
      
      {/* Sequence Display */}
      {isShowing && currentIndex >= 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-6 text-center">
          <p className="text-6xl font-bold text-white">
            {sequence[currentIndex]}
          </p>
        </div>
      )}
      
      {/* Message */}
      {message && !isShowing && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-center">
          <p className="text-blue-700">{message}</p>
        </div>
      )}
      
      {/* Number Grid */}
      {gameState === 'playing' && !isShowing && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {numbers.map(number => (
            <button
              key={number}
              onClick={() => handleNumberClick(number)}
              className="h-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105"
            >
              {number}
            </button>
          ))}
        </div>
      )}
      
      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <Brain className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Number Sequence</h3>
          <p className="text-blue-100 mb-6">Watch the number sequence and repeat it in order!</p>
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
        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Game Over!</h3>
          <div className="space-y-2 mb-6">
            <p className="flex justify-between">
              <span className="text-gray-600">Final Score:</span>
              <span className="font-bold text-blue-600">{score}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Level Reached:</span>
              <span className="font-bold text-purple-600">{level - 1}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Longest Sequence:</span>
              <span className="font-bold text-green-600">{sequence.length}</span>
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
          🔢 Watch the number sequence carefully, then click the numbers in the same order. 
          Each correct round increases difficulty!
        </p>
      </div>
    </div>
  );
}