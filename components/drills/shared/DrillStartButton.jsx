'use client';

import { Play, Loader2 } from 'lucide-react';

export default function DrillStartButton({ onStart, isLoading = false, disabled = false, variant = 'primary', size = 'lg' }) {
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg',
    secondary: 'bg-green-600 hover:bg-green-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      onClick={onStart}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center gap-2 rounded-lg font-semibold transition-all
        ${variants[variant]} ${sizes[size]}
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 active:scale-95
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <Play className="w-5 h-5" />
          Start Drill
        </>
      )}
    </button>
  );
}