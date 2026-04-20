'use client';

import { useState, useEffect } from 'react';
import { Brain, Clock, Heart, Zap, Play, Pause, RotateCcw, Bell } from 'lucide-react';

export default function MeditationSession({ onComplete, type = 'mindfulness', duration = 10 }) {
  const [sessionState, setSessionState] = useState('start');
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMantra, setCurrentMantra] = useState('');
  const [bellCount, setBellCount] = useState(0);
  
  const meditationTypes = {
    mindfulness: {
      name: 'Mindfulness Meditation',
      description: 'Cultivate present-moment awareness',
      icon: '🧠',
      color: 'from-blue-600 to-cyan-600',
      mantras: [
        'I am present in this moment',
        'I observe my thoughts without judgment',
        'I am aware of my breath',
        'I accept things as they are',
        'I am calm and centered'
      ],
      bellInterval: 60
    },
    lovingKindness: {
      name: 'Loving-Kindness Meditation',
      description: 'Cultivate compassion for yourself and others',
      icon: '💕',
      color: 'from-pink-600 to-rose-600',
      mantras: [
        'May I be happy and peaceful',
        'May I be safe and protected',
        'May I be healthy and strong',
        'May I live with ease',
        'May all beings be happy'
      ],
      bellInterval: 90
    },
    transcendental: {
      name: 'Transcendental Meditation',
      description: 'Use a personal mantra for deep rest',
      icon: '🕉️',
      color: 'from-purple-600 to-indigo-600',
      mantras: [
        'Om',
        'So Hum',
        'Om Shanti',
        'Ah',
        'Om Namah Shivaya'
      ],
      bellInterval: 120
    }
  };
  
  const currentType = meditationTypes[type] || meditationTypes.mindfulness;
  
  useEffect(() => {
    let interval;
    let mantraInterval;
    let bellInterval;
    
    if (sessionState === 'active' && isPlaying) {
      // Timer countdown
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Mantra rotation
      mantraInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * currentType.mantras.length);
        setCurrentMantra(currentType.mantras[randomIndex]);
      }, 10000);
      
      // Bell ringing
      bellInterval = setInterval(() => {
        setBellCount(prev => prev + 1);
        playBellSound();
      }, currentType.bellInterval * 1000);
    }
    
    return () => {
      clearInterval(interval);
      clearInterval(mantraInterval);
      clearInterval(bellInterval);
    };
  }, [sessionState, isPlaying]);
  
  const playBellSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440;
    gainNode.gain.value = 0.2;
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 3);
    oscillator.stop(audioContext.currentTime + 3);
  };
  
  const startSession = () => {
    setSessionState('active');
    setIsPlaying(true);
    setCurrentMantra(currentType.mantras[0]);
  };
  
  const pauseSession = () => {
    setIsPlaying(false);
  };
  
  const resumeSession = () => {
    setIsPlaying(true);
  };
  
  const resetSession = () => {
    setSessionState('start');
    setTimeLeft(duration * 60);
    setBellCount(0);
    setIsPlaying(false);
    setCurrentMantra('');
  };
  
  const completeSession = () => {
    setSessionState('completed');
    setIsPlaying(false);
    if (onComplete) {
      onComplete({
        duration: duration,
        type,
        bellsHeard: bellCount
      });
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{currentType.icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{currentType.name}</h3>
        <p className="text-sm text-gray-500">{currentType.description}</p>
      </div>
      
      {/* Timer */}
      {sessionState === 'active' && (
        <>
          <div className={`bg-gradient-to-r ${currentType.color} rounded-xl p-6 mb-6 text-center`}>
            <p className="text-5xl font-bold text-white mb-2">{formatTime(timeLeft)}</p>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Mantra Display */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
            <Brain className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <p className="text-xl font-medium text-gray-900 mb-2">Current Mantra</p>
            <p className="text-2xl font-semibold text-purple-600">{currentMantra}</p>
            <p className="text-sm text-gray-500 mt-2">Repeat silently or aloud</p>
          </div>
          
          {/* Bell Counter */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-gray-100 rounded-lg p-3 text-center">
              <Bell className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-gray-900">{bellCount}</p>
              <p className="text-xs text-gray-500">Bells</p>
            </div>
          </div>
        </>
      )}
      
      {/* Start Screen */}
      {sessionState === 'start' && (
        <div className={`bg-gradient-to-r ${currentType.color} rounded-xl p-8 mb-6 text-center`}>
          <Heart className="w-16 h-16 text-white mx-auto mb-4" />
          <p className="text-white mb-4">Find a comfortable seated position and relax.</p>
          <p className="text-white/80 text-sm mb-6">Duration: {duration} minutes</p>
          <button
            onClick={startSession}
            className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            Begin Meditation
          </button>
        </div>
      )}
      
      {/* Controls */}
      {sessionState === 'active' && (
        <div className="flex justify-center gap-4 mb-6">
          {isPlaying ? (
            <button
              onClick={pauseSession}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center gap-2"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          ) : (
            <button
              onClick={resumeSession}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Resume
            </button>
          )}
          <button
            onClick={resetSession}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      )}
      
      {/* Completion Screen */}
      {sessionState === 'completed' && (
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <Zap className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">Meditation Complete!</h4>
          <p className="text-gray-600 mb-4">
            You meditated for {duration} minutes and heard {bellCount} bells.
          </p>
          <button
            onClick={resetSession}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Start New Session
          </button>
        </div>
      )}
      
      {/* Tips */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Meditation Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Sit with a straight but relaxed posture</li>
          <li>• Focus on your breath as an anchor</li>
          <li>• When distracted, gently return to your mantra</li>
          <li>• Start with shorter sessions and build up</li>
          <li>• Consistency is more important than duration</li>
        </ul>
      </div>
    </div>
  );
}