'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Target, Zap, Clock, Award } from 'lucide-react';

export default function AimDrill({ onComplete, difficulty = 'medium' }) {
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetsHit, setTargetsHit] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [targets, setTargets] = useState([]);
  const [clicks, setClicks] = useState(0);
  const containerRef = useRef(null);
  
  const difficulties = {
    easy: { time: 30, targetSize: 60, targetCount: 1, speed: 0 },
    medium: { time: 30, targetSize: 45, targetCount: 2, speed: 0 },
    hard: { time: 30, targetSize: 35, targetCount: 3, speed: 0 },
    expert: { time: 30, targetSize: 25, targetCount: 4, speed: 0 }
  };
  
  const currentDifficulty = difficulties[difficulty] || difficulties.medium;
  
  useEffect(() => {
    let timer;
    let spawnInterval;
    
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      spawnInterval = setInterval(() => {
        spawnTargets();
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
      clearInterval(spawnInterval);
    };
  }, [gameState, currentDifficulty]);
  
  const spawnTargets = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newTargets = [];
    
    for (let i = 0; i < currentDifficulty.targetCount; i++) {
      const x = Math.random() * (containerRect.width - currentDifficulty.targetSize);
      const y = Math.random() * (containerRect.height - currentDifficulty.targetSize);
      
      newTargets.push({
        id: Date.now() + i + Math.random(),
        x,
        y,
        size: currentDifficulty.targetSize
      });
    }
    
    setTargets(prev => [...prev, ...newTargets]);
    
    // Remove targets after 2 seconds if not hit
    setTimeout(() => {
      setTargets(prev => prev.filter(t => !newTargets.some(nt => nt.id === t.id)));
    }, 2000);
  }, [currentDifficulty]);
  
  const handleTargetClick = (targetId) => {
    if (gameState !== 'playing') return;
    
    setTargets(prev => prev.filter(t => t.id !== targetId));
    setTargetsHit(prev => prev + 1);
    setClicks(prev => prev + 1);
    
    const pointsEarned = Math.floor(10 * (timeLeft / 30) + 5);
    setScore(prev => prev + pointsEarned);
  };
  
  const handleMissClick = () => {
    if (gameState !== 'playing') return;
    setClicks(prev => prev + 1);
  };
  
  const endGame = () => {
    setGameState('gameOver');
    const finalAccuracy = clicks > 0 ? (targetsHit / clicks) * 100 : 0;
    setAccuracy(finalAccuracy);
    
    if (onComplete) {
      onComplete({
        score,
        accuracy: finalAccuracy,
        targetsHit,
        totalClicks: clicks,
        timeSpent: currentDifficulty.time - timeLeft
      });
    }
  };
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(currentDifficulty.time);
    setTargetsHit(0);
    setClicks(0);
    setAccuracy(100);
    setTargets([]);
  };
  
  const getScoreColor = () => {
    if (score >= 200) return 'text-purple-600';
    if (score >= 100) return 'text-blue-600';
    return 'text-gray-600';
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Target className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-blue-600">{score}</p>
          <p className="text-xs text-gray-500">Score</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <Zap className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-green-600">{targetsHit}</p>
          <p className="text-xs text-gray-500">Hits</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <Clock className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-yellow-600">{timeLeft}s</p>
          <p className="text-xs text-gray-500">Time</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-purple-600">{Math.round(accuracy)}%</p>
          <p className="text-xs text-gray-500">Accuracy</p>
        </div>
      </div>
      
      {/* Game Area */}
      <div 
        ref={containerRef}
        className="relative bg-gray-100 rounded-xl overflow-hidden cursor-crosshair"
        style={{ height: '400px' }}
        onClick={handleMissClick}
      >
        {gameState === 'playing' && targets.map(target => (
          <button
            key={target.id}
            onClick={(e) => {
              e.stopPropagation();
              handleTargetClick(target.id);
            }}
            className="absolute bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-transform hover:scale-110"
            style={{
              width: target.size,
              height: target.size,
              left: target.x,
              top: target.y,
            }}
          >
            <Target className="w-full h-full p-2 text-white" />
          </button>
        ))}
        
        {gameState === 'start' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Game
            </button>
          </div>
        )}
        
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Game Over!</h3>
              <div className="space-y-2 mb-6">
                <p className="flex justify-between">
                  <span className="text-gray-600">Final Score:</span>
                  <span className={`font-bold ${getScoreColor()}`}>{score}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Targets Hit:</span>
                  <span className="font-bold text-gray-900">{targetsHit}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-bold text-gray-900">{Math.round(accuracy)}%</span>
                </p>
              </div>
              <button
                onClick={startGame}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          🎯 Click on the red targets to earn points. Misses reduce accuracy. 
          Faster clicks earn more points!
        </p>
      </div>
    </div>
  );
}