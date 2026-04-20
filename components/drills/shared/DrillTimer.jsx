'use client';

import { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export default function DrillTimer({ 
  timeLeft, 
  maxTime, 
  isActive = true,
  onTimeUp,
  size = 'md',
  showWarning = true
}) {
  
  const [isWarning, setIsWarning] = useState(false);
  
  const sizes = {
    sm: { text: 'text-xl', container: 'p-2' },
    md: { text: 'text-2xl', container: 'p-3' },
    lg: { text: 'text-4xl', container: 'p-4' }
  };
  
  useEffect(() => {
    if (showWarning && timeLeft <= 5 && timeLeft > 0) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
    
    if (timeLeft === 0 && onTimeUp) {
      onTimeUp();
    }
  }, [timeLeft, showWarning, onTimeUp]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getProgress = () => {
    return (timeLeft / maxTime) * 100;
  };
  
  const getTimerColor = () => {
    if (!isActive) return 'text-gray-400';
    if (timeLeft <= 5) return 'text-red-600';
    if (timeLeft <= 10) return 'text-orange-600';
    return 'text-blue-600';
  };
  
  const getProgressColor = () => {
    if (timeLeft <= 5) return 'bg-red-500';
    if (timeLeft <= 10) return 'bg-orange-500';
    return 'bg-blue-600';
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${sizes[size].container}`}>
      <div className="flex items-center gap-3 mb-2">
        <Clock className={`w-5 h-5 ${getTimerColor()}`} />
        <span className={`font-mono font-bold ${sizes[size].text} ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </span>
        {isWarning && (
          <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
        )}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full transition-all duration-1000 ${getProgressColor()}`}
          style={{ width: `${getProgress()}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-gray-400 mt-2">
        Time remaining
      </p>
    </div>
  );
}