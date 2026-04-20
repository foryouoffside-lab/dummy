'use client';

import { TrendingUp, TrendingDown, Award } from 'lucide-react';

export default function DrillScore({ 
  score, 
  label = 'Score', 
  showTrend = false, 
  previousScore = null,
  showBest = false,
  bestScore = null,
  size = 'md'
}) {
  
  const sizes = {
    sm: { text: 'text-2xl', icon: 'w-4 h-4' },
    md: { text: 'text-3xl', icon: 'w-5 h-5' },
    lg: { text: 'text-5xl', icon: 'w-7 h-7' }
  };
  
  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getScoreEmoji = () => {
    if (score >= 90) return '🏆';
    if (score >= 70) return '🎯';
    if (score >= 50) return '👍';
    return '💪';
  };
  
  const getTrend = () => {
    if (!previousScore) return null;
    const diff = score - previousScore;
    if (diff > 0) return { icon: <TrendingUp className="w-3 h-3" />, color: 'text-green-600', value: `+${diff}` };
    if (diff < 0) return { icon: <TrendingDown className="w-3 h-3" />, color: 'text-red-600', value: `${diff}` };
    return { icon: null, color: 'text-gray-500', value: 'Same' };
  };
  
  const trend = getTrend();
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{label}</span>
        </div>
        {showTrend && trend && (
          <div className={`flex items-center gap-1 text-xs ${trend.color}`}>
            {trend.icon}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className={`font-bold ${sizes[size].text} ${getScoreColor()}`}>
          {Math.round(score)}%
        </span>
        <span className="text-2xl">{getScoreEmoji()}</span>
      </div>
      
      {showBest && bestScore && (
        <p className="text-xs text-gray-400 mt-1">Best: {Math.round(bestScore)}%</p>
      )}
    </div>
  );
}