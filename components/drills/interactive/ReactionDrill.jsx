'use client';

import { useState, useEffect, useCallback } from 'react';
import { Zap, Clock, Award, Target, Activity } from 'lucide-react';

export default function ReactionDrill({ onComplete, difficulty = 'medium' }) {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [waitingForClick, setWaitingForClick] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [message, setMessage] = useState('');
  
  const difficulties = {
    easy: { attempts: 5, delayMin: 1000, delayMax: 3000 },
    medium: { attempts: 10, delayMin: 800, delayMax: 4000 },
    hard: { attempts: 15, delayMin: 500, delayMax: 5000 },
    expert: { attempts: 20, delayMin: 300, delayMax: 6000 }
  };
  
  const currentDiff = difficulties[difficulty] || difficulties.medium;
  
  useEffect(() => {
    if (gameState === 'playing' && attempts < currentDiff.attempts && !waitingForClick && !showTarget) {
      startNextRound();
    }
  }, [gameState, attempts, waitingForClick, showTarget]);
  
  const startNextRound = useCallback(() => {
    const delay = Math.random() * (currentDiff.delayMax - currentDiff.delayMin) + currentDiff.delayMin;
    setMessage('Wait for the target...');
    
    setTimeout(() => {
      setShowTarget(true);
      setStartTime(Date.now());
      setMessage('CLICK NOW!');
    }, delay);
  }, [currentDiff]);
  
  const handleClick = () => {
    if (gameState !== 'playing') return;
    
    if (showTarget && startTime) {
      const reactionTime = Date.now() - startTime;
      setReactionTimes(prev => [...prev, reactionTime]);
      setScore(prev => prev + Math.max(0, 100 - Math.floor(reactionTime / 10)));
      setAttempts(prev => prev + 1);
      setShowTarget(false);
      setWaitingForClick(false);
      setMessage(`Reaction: ${reactionTime}ms`);
      
      if (attempts + 1 >= currentDiff.attempts) {
        endGame();
      }
    } else if (!showTarget && !waitingForClick) {
      // Clicked too early
      setMessage('Too early! Wait for the target.');
      setWaitingForClick(true);
      setTimeout(() => {
        setWaitingForClick(false);
      }, 1000);
    }
  };
  
  const endGame = () => {
    setGameState('gameOver');
    const avgReaction = reactionTimes.length > 0 
      ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
      : 0;
    const bestReaction = reactionTimes.length > 0 ? Math.min(...reactionTimes) : 0;
    
    if (onComplete) {
      onComplete({
        score,
        averageReaction: avgReaction,
        bestReaction,
        totalAttempts: attempts
      });
    }
  };
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setAttempts(0);
    setReactionTimes([]);
    setShowTarget(false);
    setWaitingForClick(false);
    setCurrentReaction(null);
    setMessage('Get ready...');
  };
  
  const getAvgReaction = () => {
    if (reactionTimes.length === 0) return 0;
    return Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
  };
  
  const getBestReaction = () => {
    if (reactionTimes.length === 0) return 0;
    return Math.min(...reactionTimes);
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
          <Target className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-green-600">{attempts}/{currentDiff.attempts}</p>
          <p className="text-xs text-gray-500">Attempts</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <Clock className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-yellow-600">{getAvgReaction()}ms</p>
          <p className="text-xs text-gray-500">Average</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <Activity className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-purple-600">{getBestReaction()}ms</p>
          <p className="text-xs text-gray-500">Best</p>
        </div>
      </div>
      
      {/* Reaction Area */}
      <div 
        className={`
          relative bg-gray-100 rounded-xl overflow-hidden cursor-pointer transition-all duration-200
          ${gameState === 'playing' ? 'hover:bg-gray-200' : ''}
        `}
        style={{ height: '300px' }}
        onClick={handleClick}
      >
        {showTarget && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500 animate-pulse">
            <Target className="w-24 h-24 text-white" />
          </div>
        )}
        
        {gameState === 'playing' && !showTarget && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl text-gray-600">{message}</p>
              {waitingForClick && (
                <p className="text-sm text-red-500 mt-2">Wait for the green screen!</p>
              )}
            </div>
          </div>
        )}
        
        {gameState === 'start' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Test
            </button>
          </div>
        )}
        
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Test Complete!</h3>
              <div className="space-y-2 mb-6">
                <p className="flex justify-between">
                  <span className="text-gray-600">Final Score:</span>
                  <span className="font-bold text-blue-600">{score}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Average Reaction:</span>
                  <span className="font-bold text-green-600">{getAvgReaction()}ms</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Best Reaction:</span>
                  <span className="font-bold text-purple-600">{getBestReaction()}ms</span>
                </p>
              </div>
              <button
                onClick={startGame}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Test Again
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          ⚡ Click as fast as possible when the screen turns GREEN. 
          Don't click too early or you'll get a penalty!
        </p>
      </div>
    </div>
  );
}