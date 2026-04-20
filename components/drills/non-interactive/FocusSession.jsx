'use client';

import { useState, useEffect } from 'react';
import { Target, Clock, Award, Zap, Play, Pause, RotateCcw, Bell } from 'lucide-react';

export default function FocusSession({ onComplete, duration = 25, breakDuration = 5 }) {
  const [sessionState, setSessionState] = useState('start'); // start, focusing, break, completed
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [breakTimeLeft, setBreakTimeLeft] = useState(breakDuration * 60);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  useEffect(() => {
    let interval;
    
    if ((sessionState === 'focusing' || sessionState === 'break') && !isPaused) {
      interval = setInterval(() => {
        if (sessionState === 'focusing') {
          setTimeLeft(prev => {
            if (prev <= 1) {
              // Focus session complete, start break
              setSessionsCompleted(s => s + 1);
              setSessionState('break');
              if (notifications) {
                playNotificationSound();
              }
              return duration * 60;
            }
            return prev - 1;
          });
        } else if (sessionState === 'break') {
          setBreakTimeLeft(prev => {
            if (prev <= 1) {
              // Break complete, check if all sessions done
              if (sessionsCompleted + 1 >= 4) {
                completeSession();
              } else {
                setSessionState('focusing');
                if (notifications) {
                  playNotificationSound();
                }
              }
              return breakDuration * 60;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [sessionState, isPaused, sessionsCompleted]);
  
  const playNotificationSound = () => {
    // Use Web Audio API for a simple beep
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 880;
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
    oscillator.stop(audioContext.currentTime + 1);
  };
  
  const startFocus = () => {
    setSessionState('focusing');
    setTimeLeft(duration * 60);
    setIsPaused(false);
  };
  
  const pauseSession = () => {
    setIsPaused(true);
  };
  
  const resumeSession = () => {
    setIsPaused(false);
  };
  
  const resetSession = () => {
    setSessionState('start');
    setTimeLeft(duration * 60);
    setBreakTimeLeft(breakDuration * 60);
    setSessionsCompleted(0);
    setIsPaused(false);
  };
  
  const completeSession = () => {
    setSessionState('completed');
    if (onComplete) {
      onComplete({
        sessionsCompleted,
        totalTime: duration * sessionsCompleted,
        breaksTaken: sessionsCompleted
      });
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getProgress = () => {
    if (sessionState === 'focusing') {
      return ((duration * 60 - timeLeft) / (duration * 60)) * 100;
    } else if (sessionState === 'break') {
      return ((breakDuration * 60 - breakTimeLeft) / (breakDuration * 60)) * 100;
    }
    return 0;
  };
  
  const getSessionIcon = () => {
    if (sessionState === 'focusing') return '🎯';
    if (sessionState === 'break') return '☕';
    return '🧘';
  };
  
  const getSessionTitle = () => {
    if (sessionState === 'focusing') return 'Focus Time';
    if (sessionState === 'break') return 'Break Time';
    return 'Ready to Focus?';
  };
  
  const getSessionColor = () => {
    if (sessionState === 'focusing') return 'from-blue-600 to-purple-600';
    if (sessionState === 'break') return 'from-green-500 to-teal-500';
    return 'from-gray-500 to-gray-600';
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{getSessionIcon()}</div>
        <h3 className="text-xl font-bold text-gray-900">{getSessionTitle()}</h3>
        <p className="text-sm text-gray-500">Pomodoro Technique</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Target className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-blue-600">{sessionsCompleted}/4</p>
          <p className="text-xs text-gray-500">Sessions</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <Clock className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-green-600">
            {sessionState === 'focusing' ? formatTime(timeLeft) : 
             sessionState === 'break' ? formatTime(breakTimeLeft) : 
             `${duration}:00`}
          </p>
          <p className="text-xs text-gray-500">Time Left</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <Zap className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-purple-600">
            {Math.floor((duration * 60 - timeLeft) / 60)}m
          </p>
          <p className="text-xs text-gray-500">Focused</p>
        </div>
      </div>
      
      {/* Timer Display */}
      {sessionState !== 'start' && (
        <div className={`bg-gradient-to-r ${getSessionColor()} rounded-xl p-8 mb-6 text-center`}>
          <p className="text-6xl font-bold text-white mb-2">
            {sessionState === 'focusing' ? formatTime(timeLeft) : formatTime(breakTimeLeft)}
          </p>
          <div className="w-full bg-white/30 rounded-full h-2 mt-4">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-1000"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Quote */}
      {sessionState === 'focusing' && (
        <div className="bg-gray-50 rounded-lg p-4 text-center mb-6">
          <p className="text-sm text-gray-600 italic">
            "Stay focused on your goal. Small steps lead to big results."
          </p>
        </div>
      )}
      
      {sessionState === 'break' && (
        <div className="bg-gray-50 rounded-lg p-4 text-center mb-6">
          <p className="text-sm text-gray-600 italic">
            "Take a moment to rest and recharge. You've earned it!"
          </p>
        </div>
      )}
      
      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        {sessionState === 'start' && (
          <button
            onClick={startFocus}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Focus Session
          </button>
        )}
        
        {(sessionState === 'focusing' || sessionState === 'break') && !isPaused && (
          <button
            onClick={pauseSession}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center gap-2"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}
        
        {(sessionState === 'focusing' || sessionState === 'break') && isPaused && (
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
      
      {/* Settings */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-6">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Notifications</span>
        </div>
        <button
          onClick={() => setNotifications(!notifications)}
          className={`w-10 h-5 rounded-full transition ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${notifications ? 'translate-x-5' : 'translate-x-1'}`}></div>
        </button>
      </div>
      
      {/* Completion Screen */}
      {sessionState === 'completed' && (
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">Great Work!</h4>
          <p className="text-gray-600 mb-4">
            You completed {sessionsCompleted} focus sessions!
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
        <h4 className="font-semibold text-gray-900 mb-2">How it works:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• {duration} minutes of focused work</li>
          <li>• {breakDuration} minute break between sessions</li>
          <li>• Complete 4 sessions for a full cycle</li>
          <li>• Stay focused and avoid distractions</li>
        </ul>
      </div>
    </div>
  );
}