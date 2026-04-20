'use client';

import { forwardRef } from 'react';

const Progress = forwardRef(({ value = 0, max = 100, label, showValue = false, size = 'md', className = '' }, ref) => {
  
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5'
  };
  
  const getColor = () => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };
  
  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showValue && <span className="text-sm font-medium text-gray-900">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          ref={ref}
          className={`${getColor()} rounded-full transition-all duration-500 ${sizes[size]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

Progress.displayName = 'Progress';

export default Progress;