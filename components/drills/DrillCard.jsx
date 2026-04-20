'use client';

import Link from 'next/link';
import { Clock, Zap, Star, TrendingUp, Award, ChevronRight } from 'lucide-react';

export default function DrillCard({ 
  drill, 
  variant = 'default', // default, compact, featured
  showStats = true,
  showProgress = false,
  onFavorite,
  isFavorite = false
}) {
  
  const { 
    id, 
    name, 
    category, 
    difficulty, 
    duration, 
    points, 
    description,
    icon,
    bestScore,
    timesPlayed,
    progress,
    rating
  } = drill;
  
  const difficulties = {
    beginner: { label: 'Beginner', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' },
    easy: { label: 'Easy', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' },
    intermediate: { label: 'Intermediate', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' },
    medium: { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' },
    advanced: { label: 'Advanced', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' },
    hard: { label: 'Hard', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' },
    expert: { label: 'Expert', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' }
  };
  
  const difficultyStyle = difficulties[difficulty?.toLowerCase()] || difficulties.intermediate;
  
  const variants = {
    default: 'bg-white hover:shadow-lg hover:-translate-y-1',
    compact: 'bg-white hover:shadow-md',
    featured: 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 hover:shadow-xl hover:-translate-y-1'
  };
  
  const getCategoryIcon = () => {
    const icons = {
      cognitive: '🧠',
      memory: '🧠',
      visual: '👁️',
      motor: '✋',
      academic: '📚',
      productivity: '⚡',
      'mental-fitness': '🧘',
      mental: '🧘',
      physical: '💪'
    };
    return icon || icons[category] || '🎯';
  };
  
  const getRatingStars = () => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 text-yellow-400" />);
    }
    return stars;
  };
  
  const cardContent = (
    <div className={`rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 ${variants[variant]}`}>
      {/* Card Content */}
      <div className="p-5">
        {/* Header - Icon and Difficulty */}
        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">{getCategoryIcon()}</div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyStyle.bg} ${difficultyStyle.color}`}>
            {difficultyStyle.label}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {name}
        </h3>
        
        {/* Description - only for default variant */}
        {variant !== 'compact' && description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {description}
          </p>
        )}
        
        {/* Stats */}
        {showStats && (
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              <span>{points} XP</span>
            </div>
            {rating && (
              <div className="flex items-center gap-1">
                {getRatingStars()}
                <span className="text-xs ml-1">{rating}</span>
              </div>
            )}
          </div>
        )}
        
        {/* User Progress (if logged in) */}
        {showProgress && (bestScore !== undefined || timesPlayed !== undefined) && (
          <div className="mb-4">
            {bestScore !== undefined && bestScore > 0 && (
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Best Score</span>
                <span className="font-medium text-blue-600">{bestScore}%</span>
              </div>
            )}
            {timesPlayed !== undefined && timesPlayed > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Times Played</span>
                <span className="font-medium text-gray-700">{timesPlayed}</span>
              </div>
            )}
            {progress !== undefined && progress > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Footer - Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {isFavorite !== undefined && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onFavorite?.(id);
                }}
                className={`text-sm ${isFavorite ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500 transition`}
              >
                ★
              </button>
            )}
            {variant === 'featured' && (
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <TrendingUp className="w-3 h-3" />
                <span>Popular</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all">
            <span className="text-sm font-medium">Start</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
  
  // Wrap with Link if href exists
  if (drill.href) {
    return (
      <Link href={drill.href} className="block group">
        {cardContent}
      </Link>
    );
  }
  
  return cardContent;
}