'use client';

import { RotateCcw, Loader2 } from 'lucide-react';

export default function DrillRetryButton({ onRetry, isLoading = false, variant = 'primary', size = 'md' }) {
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      onClick={onRetry}
      disabled={isLoading}
      className={`
        inline-flex items-center gap-2 rounded-lg font-medium transition-all
        ${variants[variant]} ${sizes[size]}
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 active:scale-95
      `}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <RotateCcw className="w-4 h-4" />
      )}
      Try Again
    </button>
  );
}