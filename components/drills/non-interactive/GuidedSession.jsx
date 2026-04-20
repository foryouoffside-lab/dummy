'use client';

import { useState, useEffect } from 'react';
import { Mic, Play, Pause, RotateCcw, Volume2, VolumeX, SkipForward } from 'lucide-react';

export default function GuidedSession({ onComplete, sessionType = 'meditation', duration = 10 }) {
  const [sessionState, setSessionState] = useState('start');
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const sessions = {
    meditation: {
      title: 'Guided Meditation',
      description: 'A calming meditation for relaxation and mindfulness',
      icon: '🧘',
      steps: [
        { time: 30, text: 'Find a comfortable position. Close your eyes if you feel comfortable.', instruction: 'Settle in' },
        { time: 60, text: 'Take three deep breaths. In through your nose, out through your mouth.', instruction: 'Deep breaths' },
        { time: 90, text: 'Bring your attention to your breath. Notice the natural rhythm.', instruction: 'Focus on breath' },
        { time: 120, text: 'If your mind wanders, gently bring it back to your breath.', instruction: 'Stay present' },
        { time: 180, text: 'Notice any sensations in your body without judgment.', instruction: 'Body awareness' },
        { time: 60, text: 'Slowly bring your awareness back to the room.', instruction: 'Return gently' }
      ]
    },
    visualization: {
      title: 'Visualization Exercise',
      description: 'Use your imagination to create a peaceful mental image',
      icon: '🎨',
      steps: [
        { time: 30, text: 'Close your eyes and take a few deep breaths.', instruction: 'Relax' },
        { time: 60, text: 'Imagine a peaceful place. It could be a beach, forest, or mountain.', instruction: 'Choose your place' },
        { time: 120, text: 'Notice the details. What do you see? Hear? Smell?', instruction: 'Engage senses' },
        { time: 120, text: 'Feel the peace and calm of this place.', instruction: 'Absorb the feeling' },
        { time: 60, text: 'Slowly return to the present moment.', instruction: 'Return' }
      ]
    },
    affirmation: {
      title: 'Positive Affirmations',
      description: 'Build confidence with guided positive statements',
      icon: '💪',
      steps: [
        { time: 30, text: 'Sit comfortably and take a few deep breaths.', instruction: 'Center yourself' },
        { time: 60, text: 'Repeat after me: "I am capable and strong."', instruction: 'Say it aloud' },
        { time: 60, text: '"I trust myself to make good decisions."', instruction: 'Feel it' },
        { time: 60, text: '"I am worthy of success and happiness."', instruction: 'Believe it' },
        { time: 60, text: '"I can handle whatever comes my way."', instruction: 'Embrace it' },
        { time: 60, text: 'Take a moment to feel these affirmations.', instruction: 'Integrate' }
      ]
    }
  };
  
  const currentSession = sessions[sessionType] || sessions.meditation;
  
  useEffect(() => {
    let interval;
    
    if (sessionState === 'active' && isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
        
        // Update current step based on time
        let accumulatedTime = 0;
        let stepIndex = 0;
        for (let i = 0; i < currentSession.steps.length; i++) {
          accumulatedTime += currentSession.steps[i].time;
          if (duration * 60 - (timeLeft - 1) <= accumulatedTime) {
            stepIndex = i;
            break;
          }
        }
        setCurrentStep(stepIndex);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [sessionState, isPlaying, timeLeft]);
  
  const startSession = () => {
    setSessionState('active');
    setIsPlaying(true);
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
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const completeSession = () => {
    setSessionState('completed');
    setIsPlaying(false);
    if (onComplete) {
      onComplete({
        duration: duration,
        sessionType,
        stepsCompleted: currentStep + 1
      });
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  const currentStepData = currentSession.steps[currentStep];
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{currentSession.icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{currentSession.title}</h3>
        <p className="text-sm text-gray-500">{currentSession.description}</p>
      </div>
      
      {/* Timer and Progress */}
      {sessionState === 'active' && (
        <>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-6 text-center">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
              </button>
              <p className="text-4xl font-bold text-white">{formatTime(timeLeft)}</p>
              <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition opacity-0">
                <SkipForward className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Current Instruction */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
            <Mic className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {currentStepData?.instruction}
            </p>
            <p className="text-gray-600">
              {currentStepData?.text}
            </p>
          </div>
        </>
      )}
      
      {/* Start Screen */}
      {sessionState === 'start' && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 mb-6 text-center">
          <Mic className="w-16 h-16 text-white mx-auto mb-4" />
          <p className="text-white mb-6">Find a quiet space and prepare for your {duration}-minute session.</p>
          <button
            onClick={startSession}
            className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            Begin Session
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
      
      {/* Steps Preview */}
      {sessionState === 'start' && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Session Overview:</h4>
          <div className="space-y-2">
            {currentSession.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs text-purple-600">
                  {index + 1}
                </div>
                <span className="text-gray-600">{step.instruction}</span>
                <span className="text-xs text-gray-400 ml-auto">{Math.floor(step.time / 60)}:{String(step.time % 60).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Completion Screen */}
      {sessionState === 'completed' && (
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">✨</div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Session Complete!</h4>
          <p className="text-gray-600 mb-4">
            You completed {currentStep + 1} guided exercises.
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
        <h4 className="font-semibold text-gray-900 mb-2">Tips for success:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Find a quiet, comfortable space</li>
          <li>• Use headphones for better immersion</li>
          <li>• Don't worry about "doing it right"</li>
          <li>• Be patient and kind to yourself</li>
        </ul>
      </div>
    </div>
  );
}