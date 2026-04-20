'use client';

import { useEffect } from 'react';
import { X, CheckCircle, Award, Zap, Target, TrendingUp, Share2, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ResultModal({ 
  isOpen, 
  onClose, 
  result,
  onRetry,
  drillName
}) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const { score, accuracy, xpEarned, timeSpent, isNewBest, bestScore, newAchievements = [] } = result;
  
  const getScoreMessage = () => {
    if (score >= 90) return "Outstanding performance!";
    if (score >= 70) return "Great job! Keep it up!";
    if (score >= 50) return "Good effort!";
    return "Nice try! Practice makes perfect.";
  };
  
  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const shareResult = () => {
    const text = `I scored ${score}% on ${drillName} at Global Drill System! 🎯`;
    if (navigator.share) {
      navigator.share({ title: 'Drill Result', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Result copied to clipboard!');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 text-center rounded-t-2xl">
          <CheckCircle className="w-16 h-16 mx-auto mb-3" />
          <h2 className="text-2xl font-bold">Drill Complete!</h2>
          <p className="text-green-100 mt-1">{getScoreMessage()}</p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Score Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <Target className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className={`text-2xl font-bold ${getScoreColor()}`}>{Math.round(score)}%</p>
              <p className="text-xs text-gray-500">Score</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <Zap className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-purple-600">+{xpEarned}</p>
              <p className="text-xs text-gray-500">XP Earned</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-green-600">{Math.round(accuracy)}%</p>
              <p className="text-xs text-gray-500">Accuracy</p>
            </div>
          </div>
          
          {/* New Best Indicator */}
          {isNewBest && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-center">
              <Award className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
              <p className="text-sm font-semibold text-yellow-700">New Personal Best!</p>
              <p className="text-xs text-yellow-600">Beat previous score of {bestScore}%</p>
            </div>
          )}
          
          {/* New Achievements */}
          {newAchievements.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Achievements Unlocked!
              </h3>
              <div className="space-y-2">
                {newAchievements.map((ach, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl">{ach.icon}</div>
                    <div>
                      <p className="font-medium text-gray-900">{ach.name}</p>
                      <p className="text-xs text-gray-500">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onRetry}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
            
            <button
              onClick={shareResult}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share Result
            </button>
            
            <Link
              href="/drills"
              className="w-full py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition flex items-center justify-center gap-2 block text-center"
            >
              <Home className="w-5 h-5" />
              Back to Drills
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}