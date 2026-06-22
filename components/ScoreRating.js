'use client';

import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Score Rating component - converts scores to S/A/B/C/D/F tiers
 * @param {Object} props
 * @param {number} props.score - The score to rate
 * @param {number} props.maxScore - Maximum possible score (optional)
 * @param {number} props.size - Size of the badge: 'sm', 'md', 'lg'
 */
export default function ScoreRating({ score, maxScore, size = 'md' }) {
  // Calculate rating tier
  const getRating = (s) => {
    if (s >= 95) return { letter: 'S', color: 'text-yellow-500', bg: 'bg-yellow-100', emoji: '🏆', label: 'Legendary' };
    if (s >= 85) return { letter: 'A', color: 'text-green-500', bg: 'bg-green-100', emoji: '🌟', label: 'Excellent' };
    if (s >= 70) return { letter: 'B', color: 'text-blue-500', bg: 'bg-blue-100', emoji: '👍', label: 'Great' };
    if (s >= 55) return { letter: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50', emoji: '💪', label: 'Good' };
    if (s >= 40) return { letter: 'D', color: 'text-orange-500', bg: 'bg-orange-100', emoji: '📈', label: 'Keep Trying' };
    return { letter: 'F', color: 'text-red-500', bg: 'bg-red-100', emoji: '💀', label: 'Needs Practice' };
  };

  // Calculate percentage if maxScore provided
  const percentage = maxScore ? Math.round((score / maxScore) * 100) : score;
  const rating = getRating(percentage);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-lg px-4 py-2',
  };

  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1 font-bold rounded-full ${rating.bg} ${rating.color} ${sizeClasses[size]}`}
        title={`${rating.label} - ${percentage}%`}
      >
        <Trophy className={`w-${iconSize[size]} h-${iconSize[size]}`} />
        {rating.letter}
      </span>
      {score && (
        <span className="text-gray-600">
          {score}
          {maxScore && ` / ${maxScore}`}
        </span>
      )}
    </div>
  );
}