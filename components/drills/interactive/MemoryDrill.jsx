'use client';

import { useState, useEffect, useCallback } from 'react';
import { Brain, Zap, Clock, Award, Eye } from 'lucide-react';

export default function MemoryDrill({ onComplete, difficulty = 'medium' }) {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMessage] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const difficulties = {
    easy: { speed: 800, initialLength: 2 },
    medium: { speed: 600, initialLength: 3 },
    hard: { speed: 500, initialLength: 4 },
    expert: { speed: 400, initialLength: 5 }
  };
  
  const currentDiff = difficulties[difficulty] || difficulties.medium;
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const colorNames = { red: '🔴 Red', blue: '🔵 Blue', green: '🟢 Green', yellow: '🟡 Yellow', purple: '🟣 Purple', orange: '🟠 Orange' };
  
  useEffect(() => {
    if (gameState === 'playing' && sequence.length === 0) {
      startNewRound();
    }
  }, [gameState]);
  
  const generateSequence = useCallback(() => {
    const newSequence = [];
    const length = currentDiff.initialLength + Math.floor(level / 3);
    for (let i = 0; i < length; i++) {
      newSequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return newSequence;
  }, [level, currentDiff]);
  
  const showSequence = useCallback(async (seq) => {
    setIsShowing(true);
    setMessage('Watch the sequence...');
    
    for (let i = 0; i < seq.length; i++) {
      setHighlightedIndex(i);
      await new Promise(resolve => setTimeout(resolve, currentDiff.speed));
      setHighlightedIndex(-1);
      await new Promise(resolve => setTimeout(resolve, 150));
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
  
  const handleColorClick = (color) => {
    if (gameState !== 'playing' || isShowing) return;
    
    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);
    
    if (color !== sequence[playerSequence.length]) {
      // Wrong color - game over
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
      // Correct! Move to next level
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
  
  const getDifficultyColor = () => {
    if (level <= 3) return 'text-green-600';
    if (level <= 6) return 'text-yellow-600';
    if (level <= 9) return 'text-orange-600';
    return 'text-red-600';
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
          <p className={`text-2xl font-bold ${getDifficultyColor()}`}>{level}</p>
          <p className="text-xs text-gray-500">Level</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-purple-600">{sequence.length}</p>
          <p className="text-xs text-gray-500">Sequence Length</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <Eye className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-yellow-600">{playerSequence.length}</p>
          <p className="text-xs text-gray-500">Progress</p>
        </div>
      </div>
      
      {/* Message */}
      {message && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-center">
          <p className="text-blue-700">{message}</p>
        </div>
      )}
      
      {/* Color Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {colors.map((color, index) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            disabled={gameState !== 'playing' || isShowing}
            className={`
              h-24 rounded-lg transition-all transform hover:scale-105
              ${gameState !== 'playing' || isShowing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${highlightedIndex === index ? 'ring-4 ring-yellow-400 scale-105 shadow-lg' : ''}
            `}
            style={{ backgroundColor: color }}
          >
            <span className="sr-only">{colorNames[color]}</span>
          </button>
        ))}
      </div>
      
      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 text-center">
          <Brain className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Memory Sequence</h3>
          <p className="text-purple-100 mb-6">Watch the sequence and repeat it in order!</p>
          <button
            onClick={startGame}
            className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
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
          🧠 Watch the color sequence carefully, then click the colors in the same order. 
          Each correct round increases difficulty!
        </p>
      </div>
    </div>
  );
}