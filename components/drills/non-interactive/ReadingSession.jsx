'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Clock, Zap, Award, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReadingSession({ onComplete, text = 'sample', speed = 250 }) {
  const [sessionState, setSessionState] = useState('start');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wordsRead, setWordsRead] = useState(0);
  const [comprehensionScore, setComprehensionScore] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  
  const readingTexts = {
    sample: {
      title: 'The Power of Daily Practice',
      content: `The journey of self-improvement begins with a single step. Every day presents a new opportunity to grow, learn, and become better than we were yesterday. The key to lasting change lies not in dramatic transformations, but in consistent, small actions repeated over time. When we commit to daily practice, we build neural pathways that make our desired behaviors automatic. This is the power of habit. Research shows that it takes approximately 66 days to form a new habit. During this time, consistency matters more than intensity. Showing up every day, even for just a few minutes, is more effective than occasional marathon sessions. Remember that progress is not always linear. There will be good days and challenging days. The important thing is to keep moving forward. Celebrate small wins along the way, as they provide motivation and momentum. With patience and persistence, small daily actions compound into remarkable results.`,
      questions: [
        { id: 1, question: 'How many days does research show it takes to form a new habit?', options: ['30 days', '66 days', '90 days', '100 days'], correct: 1 },
        { id: 2, question: 'What is more important according to the text?', options: ['Intensity', 'Duration', 'Consistency', 'Speed'], correct: 2 },
        { id: 3, question: 'What should we celebrate along the way?', options: ['Big achievements only', 'Small wins', 'Perfect days', 'Speed reading'], correct: 1 }
      ]
    },
    mindfulness: {
      title: 'Understanding Mindfulness',
      content: `Mindfulness is the practice of paying attention to the present moment without judgment. It involves observing our thoughts, feelings, and sensations as they arise, without getting caught up in them. This simple yet profound practice has been shown to reduce stress, improve focus, and enhance overall well-being. The beauty of mindfulness is that it can be practiced anywhere, at any time. Whether you're eating, walking, or working, you can bring mindful awareness to your experience. Start by focusing on your breath. Notice the sensation of air entering and leaving your body. When your mind wanders, gently return your attention to your breath. This act of returning is the practice. Over time, you'll find that you're able to maintain focus for longer periods. Mindfulness isn't about emptying the mind, but about becoming aware of what's already there. It's about developing a different relationship with your thoughts—one of curiosity and compassion rather than judgment and resistance.`,
      questions: [
        { id: 1, question: 'What is mindfulness?', options: ['Emptying the mind', 'Paying attention without judgment', 'Controlling thoughts', 'Meditation only'], correct: 1 },
        { id: 2, question: 'What should you focus on first?', options: ['Thoughts', 'Feelings', 'Breath', 'Sounds'], correct: 2 },
        { id: 3, question: 'What does the text say about returning attention?', options: ['It\'s failure', 'It\'s the practice', 'It\'s unnecessary', 'It\'s difficult'], correct: 1 }
      ]
    }
  };
  
  const currentText = readingTexts[text] || readingTexts.sample;
  const words = currentText.content.split(' ');
  
  useEffect(() => {
    let interval;
    
    if (sessionState === 'active' && isPlaying && currentWordIndex < words.length) {
      interval = setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev + 1 >= words.length) {
            completeReading();
            return prev;
          }
          setWordsRead(prev => prev + 1);
          return prev + 1;
        });
      }, speed);
    }
    
    return () => clearInterval(interval);
  }, [sessionState, isPlaying, currentWordIndex, words.length, speed]);
  
  const startReading = () => {
    setSessionState('active');
    setIsPlaying(true);
    setCurrentWordIndex(0);
    setWordsRead(0);
  };
  
  const pauseReading = () => {
    setIsPlaying(false);
  };
  
  const resumeReading = () => {
    setIsPlaying(true);
  };
  
  const completeReading = () => {
    setIsPlaying(false);
    setShowQuestions(true);
  };
  
  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };
  
  const submitComprehension = () => {
    let correct = 0;
    currentText.questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    
    const score = (correct / currentText.questions.length) * 100;
    setComprehensionScore(score);
    setSessionState('completed');
    
    if (onComplete) {
      onComplete({
        wordsRead: wordsRead,
        wpm: Math.round((wordsRead / (wordsRead / speed)) * 60),
        comprehensionScore: score,
        text: text
      });
    }
  };
  
  const resetSession = () => {
    setSessionState('start');
    setCurrentWordIndex(0);
    setWordsRead(0);
    setIsPlaying(false);
    setShowQuestions(false);
    setComprehensionScore(null);
    setAnswers({});
  };
  
  const calculateWPM = () => {
    const minutes = (wordsRead * speed) / 1000 / 60;
    return Math.round(wordsRead / minutes) || 0;
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📖</div>
        <h3 className="text-xl font-bold text-gray-900">{currentText.title}</h3>
        <p className="text-sm text-gray-500">Speed Reading Exercise</p>
      </div>
      
      {/* Stats during reading */}
      {sessionState === 'active' && !showQuestions && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <Eye className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-blue-600">{calculateWPM()}</p>
            <p className="text-xs text-gray-500">WPM</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <BookOpen className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-green-600">{currentWordIndex}/{words.length}</p>
            <p className="text-xs text-gray-500">Words</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <Zap className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-purple-600">{Math.round((currentWordIndex / words.length) * 100)}%</p>
            <p className="text-xs text-gray-500">Progress</p>
          </div>
        </div>
      )}
      
      {/* Reading Display - RSVP Mode */}
      {sessionState === 'active' && !showQuestions && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 mb-6 text-center min-h-[200px] flex items-center justify-center">
          <p className="text-3xl font-semibold text-white">
            {words[currentWordIndex]}
          </p>
        </div>
      )}
      
      {/* Comprehension Questions */}
      {showQuestions && (
        <div className="space-y-6 mb-6">
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Comprehension Check</h4>
            <p className="text-sm text-gray-600">Answer these questions based on what you read:</p>
          </div>
          
          {currentText.questions.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <p className="font-medium text-gray-900 mb-3">{idx + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, optIdx) => (
                  <label key={optIdx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={optIdx}
                      checked={answers[q.id] === optIdx}
                      onChange={() => handleAnswer(q.id, optIdx)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          
          <button
            onClick={submitComprehension}
            disabled={Object.keys(answers).length !== currentText.questions.length}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            Submit Answers
          </button>
        </div>
      )}
      
      {/* Start Screen */}
      {sessionState === 'start' && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-6 text-center">
          <BookOpen className="w-16 h-16 text-white mx-auto mb-4" />
          <p className="text-white mb-2">You'll read one word at a time at {speed}ms per word.</p>
          <p className="text-white/80 text-sm mb-6">Approximate reading time: {Math.ceil((words.length * speed) / 1000 / 60)} minutes</p>
          <button
            onClick={startReading}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            Start Reading
          </button>
        </div>
      )}
      
      {/* Controls */}
      {sessionState === 'active' && !showQuestions && (
        <div className="flex justify-center gap-4 mb-6">
          {isPlaying ? (
            <button
              onClick={pauseReading}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center gap-2"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          ) : (
            <button
              onClick={resumeReading}
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
      {sessionState === 'completed' && comprehensionScore !== null && (
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">Reading Complete!</h4>
          <div className="space-y-2 mb-4">
            <p className="flex justify-between">
              <span className="text-gray-600">Words Read:</span>
              <span className="font-bold text-gray-900">{wordsRead}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Reading Speed:</span>
              <span className="font-bold text-blue-600">{calculateWPM()} WPM</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Comprehension:</span>
              <span className="font-bold text-green-600">{comprehensionScore}%</span>
            </p>
          </div>
          <button
            onClick={resetSession}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Read Another Text
          </button>
        </div>
      )}
      
      {/* Tips */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Speed Reading Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Focus on the center of each word</li>
          <li>• Avoid subvocalization (saying words in your head)</li>
          <li>• Use your peripheral vision</li>
          <li>• Practice regularly to improve speed</li>
          <li>• Balance speed with comprehension</li>
        </ul>
      </div>
    </div>
  );
}