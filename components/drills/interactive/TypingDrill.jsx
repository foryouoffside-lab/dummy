'use client';

import { useState, useEffect, useCallback } from 'react';
import { Keyboard, Zap, Clock, Award, Type } from 'lucide-react';

export default function TypingDrill({ onComplete, difficulty = 'medium' }) {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [wordsTyped, setWordsTyped] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  
  const wordLists = {
    easy: ['cat', 'dog', 'sun', 'car', 'tree', 'fish', 'bird', 'house', 'happy', 'smile'],
    medium: ['computer', 'keyboard', 'monitor', 'program', 'developer', 'website', 'application', 'database', 'network', 'software'],
    hard: ['algorithm', 'encryption', 'authentication', 'optimization', 'implementation', 'infrastructure', 'virtualization', 'synchronization'],
    expert: ['photosynthesis', 'electroencephalograph', 'counterrevolution', 'incomprehensibility', 'spectrophotometry']
  };
  
  const currentWordList = wordLists[difficulty] || wordLists.medium;
  
  useEffect(() => {
    if (gameState === 'playing') {
      generateNewWord();
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
  
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      // Update WPM every 5 seconds
      const wpmInterval = setInterval(() => {
        const minutesElapsed = (60 - timeLeft) / 60;
        if (minutesElapsed > 0) {
          const currentWpm = Math.round(wordsTyped / minutesElapsed);
          setWpm(currentWpm);
        }
      }, 5000);
      
      return () => clearInterval(wpmInterval);
    }
  }, [gameState, timeLeft, wordsTyped]);
  
  const generateNewWord = () => {
    const randomIndex = Math.floor(Math.random() * currentWordList.length);
    setCurrentWord(currentWordList[randomIndex]);
    setUserInput('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentWord) return;
    
    const isCorrect = userInput.trim().toLowerCase() === currentWord.toLowerCase();
    
    setWordsTyped(prev => prev + 1);
    
    if (isCorrect) {
      setCorrectWords(prev => prev + 1);
      const pointsEarned = Math.floor(10 * (timeLeft / 60) + 5);
      setScore(prev => prev + pointsEarned);
    }
    
    const newAccuracy = ((correctWords + (isCorrect ? 1 : 0)) / (wordsTyped + 1)) * 100;
    setAccuracy(newAccuracy);
    
    generateNewWord();
  };
  
  const endGame = () => {
    setGameState('gameOver');
    const finalWpm = Math.round((correctWords / (60 - timeLeft)) * 60);
    const finalAccuracy = wordsTyped > 0 ? (correctWords / wordsTyped) * 100 : 0;
    
    if (onComplete) {
      onComplete({
        score,
        wpm: finalWpm,
        accuracy: finalAccuracy,
        wordsTyped,
        correctWords
      });
    }
  };
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setWordsTyped(0);
    setCorrectWords(0);
    setWpm(0);
    setAccuracy(100);
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
          <Type className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-green-600">{wpm}</p>
          <p className="text-xs text-gray-500">WPM</p>
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
      
      {/* Typing Area */}
      {gameState === 'playing' && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-6">
          <div className="text-center">
            <p className="text-3xl font-mono font-bold text-white mb-6 tracking-wide">
              {currentWord}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-4 justify-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 max-w-md px-4 py-3 text-lg text-center border-2 border-white bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Type here..."
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Enter
              </button>
            </form>
            <p className="text-sm text-blue-100 mt-4">
              Words typed: {wordsTyped} | Correct: {correctWords}
            </p>
          </div>
        </div>
      )}
      
      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center">
          <Keyboard className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Typing Speed Test</h3>
          <p className="text-blue-100 mb-6">Type as many words as you can in 60 seconds!</p>
          <button
            onClick={startGame}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Test
          </button>
        </div>
      )}
      
      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Test Complete!</h3>
          <div className="space-y-2 mb-6">
            <p className="flex justify-between">
              <span className="text-gray-600">Final Score:</span>
              <span className="font-bold text-blue-600">{score}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Words Per Minute:</span>
              <span className="font-bold text-green-600">
                {wordsTyped > 0 ? Math.round((correctWords / (60 - timeLeft)) * 60) : 0}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Accuracy:</span>
              <span className="font-bold text-purple-600">
                {wordsTyped > 0 ? Math.round((correctWords / wordsTyped) * 100) : 0}%
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Words Typed:</span>
              <span className="font-bold text-gray-900">{wordsTyped}</span>
            </p>
          </div>
          <button
            onClick={startGame}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Test Again
          </button>
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          ⌨️ Type the displayed word as quickly and accurately as possible. 
          Each correct word gives points based on speed!
        </p>
      </div>
    </div>
  );
}