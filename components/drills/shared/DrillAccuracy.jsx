'use client';

import { Target, TrendingUp, TrendingDown } from 'lucide-react';

export default function DrillAccuracy({ accuracy, label = 'Accuracy', showTrend = false, previousAccuracy = null }) {
  
  const getAccuracyColor = () => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 70) return 'text-blue-600';
    if (accuracy >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getAccuracyBg = () => {
    if (accuracy >= 90) return 'bg-green-100';
    if (accuracy >= 70) return 'bg-blue-100';
    if (accuracy >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };
  
  const getAccuracyLabel = () => {
    if (accuracy >= 90) return 'Excellent';
    if (accuracy >= 70) return 'Good';
    if (accuracy >= 50) return 'Fair';
    return 'Needs Improvement';
  };
  
  const getTrend = () => {
    if (!previousAccuracy) return null;
    const diff = accuracy - previousAccuracy;
    if (diff > 0) return { icon: <TrendingUp className="w-3 h-3" />, color: 'text-green-600', value: `+${diff}%` };
    if (diff < 0) return { icon: <TrendingDown className="w-3 h-3" />, color: 'text-red-600', value: `${diff}%` };
    return { icon: null, color: 'text-gray-500', value: 'No change' };
  };
  
  const trend = getTrend();
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{label}</span>
        </div>
        {showTrend && trend && (
          <div className={`flex items-center gap-1 text-xs ${trend.color}`}>
            {trend.icon}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2 mb-2">
        <span className={`text-3xl font-bold ${getAccuracyColor()}`}>
          {Math.round(accuracy)}%
        </span>
        <span className="text-sm text-gray-400">accuracy</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${getAccuracyBg()}`}
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-gray-500">{getAccuracyLabel()}</p>
    </div>
  );
}