'use client';

import { useState, useEffect, useCallback } from 'react';
import { Wind, Clock, Heart, Activity, Play, Pause, RotateCcw } from 'lucide-react';

export default function BreathingSession({ onComplete, technique = 'box', duration = 5 }) {
  const [sessionState, setSessionState] = useState('start'); // start, active, paused, completed
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [breaths, setBreaths] = useState(0);
  
  const techniques = {
    box: {
      name: 'Box Breathing',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose...', color: 'from-blue-400 to-cyan-400' },
        { name: 'Hold', duration: 4, instruction: 'Hold your breath...', color: 'from-cyan-400 to-teal-400' },
        { name: 'Exhale', duration: 4, instruction: 'Breathe out slowly through your mouth...', color: 'from-teal-400 to-green-400' },
        { name: 'Hold', duration: 4, instruction: 'Hold empty...', color: 'from-green-400 to-emerald-400' }
      ],
      icon: '📦'
    },
    '478': {
      name: '4-7-8 Breathing',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in quietly through your nose...', color: 'from-purple-400 to-pink-400' },
        { name: 'Hold', duration: 7, instruction: 'Hold your breath...', color: 'from-pink-400 to-rose-400' },
        { name: 'Exhale', duration: 8, instruction: 'Exhale completely through your mouth...', color: 'from-rose-400 to-red-400' }
      ],
      icon: '🌬️'
    },
    wimhof: {
      name: 'Wim Hof Method',
      phases: [
        { name: 'Deep Breath', duration: 3, instruction: 'Take a deep breath in...', color: 'from-indigo-400 to-purple-400' },
        { name: 'Release', duration: 1, instruction: 'Let go naturally...', color: 'from-purple-400 to-pink-400' },
        { name: 'Hold', duration: 15, instruction: 'Hold after exhale...', color: 'from-pink-400 to-rose-400' }
      ],
      icon: '❄️'
    },
    calm: {
      name: 'Calm Breathing',
      phases: [
        { name: 'Inhale', duration: 5, instruction: 'Slowly breathe in...', color: 'from-green-400 to-teal-400' },
        { name: 'Exhale', duration: 5, instruction: 'Slowly breathe out...', color: 'from-teal-400 to-blue-400' }
      ],
      icon: '😌'
    }
  };
  
  const currentTech = techniques[technique] || techniques.box;
  
  useEffect(() => {
    let interval;
    
    if (sessionState === 'active') {
      interval = setInterval(() => {
        setPhaseTimeLeft(prev => {
          if (prev <= 1) {
            // Move to next phase
            const nextPhase = (currentPhase + 1) % currentTech.phases.length;
            setCurrentPhase(nextPhase);
            setBreaths(prevBreaths => prevBreaths + 1);
            
            if (nextPhase === 0) {
              setCycleCount(c => c + 1);
            }
            
            return currentTech.phases[nextPhase].duration;
          }
          return prev - 1;
        });
        
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [sessionState, currentPhase, currentTech]);
  
  const startSession = () => {
    setSessionState('active');
    setCurrentPhase(0);
    setPhaseTimeLeft(currentTech.phases[0].duration);
    setCycleCount(0);
    setBreaths(0);
  };
  
  const pauseSession = () => {
    setSessionState('paused');
  };
  
  const resumeSession = () => {
    setSessionState('active');
  };
  
  const resetSession = () => {
    setSessionState('start');
    setTimeLeft(duration * 60);
    setCurrentPhase(0);
    setPhaseTimeLeft(0);
    setCycleCount(0);
    setBreaths(0);
  };
  
  const completeSession = () => {
    setSessionState('completed');
    if (onComplete) {
      onComplete({
        duration: duration * 60 - timeLeft,
        cycles: cycleCount,
        breaths: breaths,
        technique
      });
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const currentPhaseData = currentTech.phases[currentPhase];
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{currentTech.icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{currentTech.name}</h3>
        <p className="text-sm text-gray-500">Guided breathing exercise</p>
      </div>
      
      {/* Timer and Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-blue-600">{formatTime(timeLeft)}</p>
          <p className="text-xs text-gray-500">Time Left</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <Wind className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-green-600">{cycleCount}</p>
          <p className="text-xs text-gray-500">Cycles</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <Heart className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-purple-600">{breaths}</p>
          <p className="text-xs text-gray-500">Breaths</p>
        </div>
      </div>
      
      {/* Breathing Animation */}
      {sessionState === 'active' && (
        <div className="relative mb-6">
          <div className={`
            w-48 h-48 mx-auto rounded-full flex items-center justify-center
            bg-gradient-to-r ${currentPhaseData.color}
            transition-all duration-1000
            ${currentPhaseData.name === 'Inhale' ? 'scale-110' : 
              currentPhaseData.name === 'Exhale' ? 'scale-90' : 'scale-100'}
          `}>
            <div className="text-center text-white">
              <p className="text-2xl font-bold">{phaseTimeLeft}s</p>
              <p className="text-sm">{currentPhaseData.name}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Session Progress: {Math.round(progress)}%
            </p>
          </div>
        </div>
      )}
      
      {/* Instruction */}
      {sessionState === 'active' && (
        <div className="bg-gray-50 rounded-lg p-4 text-center mb-6">
          <p className="text-lg font-medium text-gray-700">{currentPhaseData.instruction}</p>
          <p className="text-sm text-gray-500 mt-2">Follow the rhythm</p>
        </div>
      )}
      
      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        {sessionState === 'start' && (
          <button
            onClick={startSession}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Session
          </button>
        )}
        
        {sessionState === 'active' && (
          <button
            onClick={pauseSession}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center gap-2"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}
        
        {sessionState === 'paused' && (
          <>
            <button
              onClick={resumeSession}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Resume
            </button>
            <button
              onClick={resetSession}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </>
        )}
      </div>
      
      {/* Completion Screen */}
      {sessionState === 'completed' && (
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <Activity className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">Session Complete!</h4>
          <p className="text-gray-600 mb-4">
            You completed {cycleCount} cycles with {breaths} breaths.
          </p>
          <button
            onClick={resetSession}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Start New Session
          </button>
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">How to practice:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Sit comfortably with your back straight</li>
          <li>• Follow the breathing rhythm on screen</li>
          <li>• Focus on the sensation of your breath</li>
          <li>• If your mind wanders, gently bring it back</li>
        </ul>
      </div>
    </div>
  );
}