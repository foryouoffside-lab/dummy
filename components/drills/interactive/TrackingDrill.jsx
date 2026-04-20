'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Target, Zap, Clock, Award, Move } from 'lucide-react';

export default function TrackingDrill({ onComplete, difficulty = 'medium' }) {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetsHit, setTargetsHit] = useState(0);
  const [targetsMissed, setTargetsMissed] = useState(0);
  const [targets, setTargets] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  const difficulties = {
    easy: { time: 30, speed: 2, targetSize: 40, targetCount: 1 },
    medium: { time: 30, speed: 3, targetSize: 35, targetCount: 2 },
    hard: { time: 30, speed: 4, targetSize: 30, targetCount: 3 },
    expert: { time: 30, speed: 5, targetSize: 25, targetCount: 4 }
  };
  
  const currentDiff = difficulties[difficulty] || difficulties.medium;
  
  useEffect(() => {
    if (gameState === 'playing') {
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
      
      spawnTargets();
      animateTargets();
      
      return () => {
        clearInterval(timer);
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, [gameState]);
  
  const spawnTargets = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const newTargets = [];
    
    for (let i = 0; i < currentDiff.targetCount; i++) {
      const x = Math.random() * (canvas.width - currentDiff.targetSize);
      const y = Math.random() * (canvas.height - currentDiff.targetSize);
      const vx = (Math.random() - 0.5) * currentDiff.speed * 2;
      const vy = (Math.random() - 0.5) * currentDiff.speed * 2;
      
      newTargets.push({
        id: Date.now() + i,
        x,
        y,
        vx,
        vy,
        size: currentDiff.targetSize
      });
    }
    
    setTargets(prev => [...prev, ...newTargets]);
  }, [currentDiff]);
  
  const animateTargets = useCallback(() => {
    if (!canvasRef.current || gameState !== 'playing') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw targets
    setTargets(prev => {
      const updated = prev.map(target => {
        let newX = target.x + target.vx;
        let newY = target.y + target.vy;
        
        // Bounce off walls
        if (newX <= 0 || newX + target.size >= canvas.width) {
          target.vx = -target.vx;
          newX = target.x + target.vx;
        }
        if (newY <= 0 || newY + target.size >= canvas.height) {
          target.vy = -target.vy;
          newY = target.y + target.vy;
        }
        
        // Draw target
        ctx.beginPath();
        ctx.arc(newX + target.size / 2, newY + target.size / 2, target.size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw crosshair
        ctx.beginPath();
        ctx.moveTo(newX + target.size / 2 - 10, newY + target.size / 2);
        ctx.lineTo(newX + target.size / 2 + 10, newY + target.size / 2);
        ctx.moveTo(newX + target.size / 2, newY + target.size / 2 - 10);
        ctx.lineTo(newX + target.size / 2, newY + target.size / 2 + 10);
        ctx.stroke();
        
        return { ...target, x: newX, y: newY };
      });
      
      return updated;
    });
    
    animationRef.current = requestAnimationFrame(animateTargets);
  }, [gameState]);
  
  const handleCanvasClick = (e) => {
    if (gameState !== 'playing') return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;
    
    let hit = false;
    setTargets(prev => {
      const remaining = prev.filter(target => {
        const isHit = clickX >= target.x && clickX <= target.x + target.size &&
                      clickY >= target.y && clickY <= target.y + target.size;
        
        if (isHit) {
          hit = true;
          setTargetsHit(h => h + 1);
          const pointsEarned = 10;
          setScore(s => s + pointsEarned);
          return false;
        }
        return true;
      });
      
      return remaining;
    });
    
    if (!hit) {
      setTargetsMissed(prev => prev + 1);
    }
  };
  
  const endGame = () => {
    setGameState('gameOver');
    const accuracy = targetsHit + targetsMissed > 0 
      ? (targetsHit / (targetsHit + targetsMissed)) * 100 
      : 0;
    
    if (onComplete) {
      onComplete({
        score,
        accuracy,
        targetsHit,
        targetsMissed,
        timeSpent: currentDiff.time - timeLeft
      });
    }
  };
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(currentDiff.time);
    setTargetsHit(0);
    setTargetsMissed(0);
    setTargets([]);
  };
  
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 600;
      canvasRef.current.height = 400;
    }
  }, []);
  
  const getAccuracy = () => {
    const total = targetsHit + targetsMissed;
    if (total === 0) return 0;
    return Math.round((targetsHit / total) * 100);
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
          <p className="text-2xl font-bold text-purple-600">{getAccuracy()}%</p>
          <p className="text-xs text-gray-500">Accuracy</p>
        </div>
      </div>
      
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full bg-gray-100 rounded-xl cursor-crosshair"
        onClick={handleCanvasClick}
      />
      
      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
          <div className="bg-white rounded-xl p-8 text-center max-w-sm">
            <Move className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tracking Drill</h3>
            <p className="text-gray-600 mb-6">Click on the moving targets to score points!</p>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Game
            </button>
          </div>
        </div>
      )}
      
      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
          <div className="bg-white rounded-xl p-8 text-center max-w-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Game Over!</h3>
            <div className="space-y-2 mb-6">
              <p className="flex justify-between">
                <span className="text-gray-600">Final Score:</span>
                <span className="font-bold text-blue-600">{score}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Targets Hit:</span>
                <span className="font-bold text-green-600">{targetsHit}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Accuracy:</span>
                <span className="font-bold text-purple-600">{getAccuracy()}%</span>
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
      
      {/* Instructions */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          🎯 Click on the moving red targets to earn points. 
          Each hit gives 10 points. Misses reduce accuracy!
        </p>
      </div>
    </div>
  );
}