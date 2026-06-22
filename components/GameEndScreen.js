'use client';

import { Trophy, Target, Zap, BarChart3, Heart, Timer, Circle, Hash, Share2, Crown, XCircle, Layers, Download } from 'lucide-react';
import Link from 'next/link';
import { getPlayerName } from '../lib/leaderboard';

/**
 * Compact end screen for drills
 * Shows: score breakdown, rating, share + back + play again buttons
 */
export default function GameEndScreen({
  score,
  bestScore,
  accuracy,
  bestCombo,
  lives,
  maxLives,
  rating,
  newBest,
  visualHits,
  numberHits,
  missedCount,
  drillName,
  drillBackLink,
  isDarkMode,
  onPlayAgain,
  onShare,
  onDownload,
  level,
  levelName,
  levelEmoji,
  levelColor,
  levelChanged,
}) {
  const isNewBest = newBest && score >= bestScore && bestScore > 0;
  const ratingColor = rating?.color || 'text-gray-500';
  const ratingBg = rating?.bg || 'bg-gray-100';
  const ratingEmoji = rating?.emoji || '🎯';
  const ratingLetter = rating?.letter || 'C';
  const ratingLabel = rating?.label || 'Keep Going';
  const playerName = getPlayerName();

  const statCards = [
    { icon: <Target className="w-3.5 h-3.5" />, label: 'Score', value: score, color: 'yellow', isHighlight: true },
    { icon: <Trophy className="w-3.5 h-3.5" />, label: 'Best', value: bestScore, color: 'amber' },
    { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Accuracy', value: `${accuracy}%`, color: 'purple' },
    { icon: <Zap className="w-3.5 h-3.5" />, label: 'Combo', value: `${bestCombo}x`, color: 'orange' },
  ];
  if (visualHits !== undefined) statCards.push({ icon: <Circle className="w-3.5 h-3.5" />, label: 'Balls', value: visualHits, color: 'blue' });
  if (numberHits !== undefined) statCards.push({ icon: <Hash className="w-3.5 h-3.5" />, label: 'Numbers', value: numberHits, color: 'indigo' });
  if (lives !== undefined && maxLives) statCards.push({ icon: <Heart className="w-3.5 h-3.5" />, label: 'Lives', value: `${lives}/${maxLives}`, color: 'red' });
  if (missedCount !== undefined) statCards.push({ icon: <XCircle className="w-3.5 h-3.5" />, label: 'Missed', value: missedCount, color: 'gray' });

  const colorMap = {
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' },
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' },
    gray: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-500' },
  };

  return (
    <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
      <div className={`rounded-2xl p-4 sm:p-5 shadow-xl border w-full max-w-[400px] mx-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {/* Header */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-1.5">
            <Timer className="w-5 h-5 text-orange-500" />
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h2>
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{drillName}</p>
        </div>

        {/* New Best */}
        {isNewBest && (
          <div className="mb-2 p-2 rounded-lg border border-yellow-500/40 bg-yellow-500/10 text-center">
            <Crown className="w-5 h-5 text-yellow-500 mx-auto" />
            <p className="text-yellow-500 font-bold text-xs">NEW BEST!</p>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">{ratingEmoji}</span>
          <div className="text-center">
            <div className={`text-xl font-black ${ratingColor}`}>{ratingLetter}</div>
            <div className={`text-[10px] font-medium ${ratingColor}`}>{ratingLabel}</div>
          </div>
          <div className={`px-2 py-0.5 rounded-full ${ratingBg} ${ratingColor} text-lg font-bold`}>{score}</div>
        </div>

        {/* Level */}
        {level && (
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-lg">{levelEmoji || '⚡'}</span>
              <span className={`text-sm font-bold ${levelColor || 'text-blue-400'}`}>Lv.{level} {levelName || ''}</span>
              {levelChanged === 'up' && (
                <span className="px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold animate-pulse">⬆ LEVEL UP!</span>
              )}
              {levelChanged === 'down' && (
                <span className="px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold">⬇ Level Down</span>
              )}
            </div>
          </div>
        )}

        {/* Player */}
        <div className="text-center mb-3">
          <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Player</p>
          <p className={`text-xs font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            {playerName === 'Anonymous Player' ? 'You' : playerName}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {statCards.map((stat, i) => {
            const colors = colorMap[stat.color] || colorMap.yellow;
            return (
              <div key={i} className={`flex items-center justify-between p-1.5 rounded-lg border ${colors.bg} ${colors.border}`}>
                <div className="flex items-center gap-1 min-w-0">
                  <div className={colors.text} aria-hidden="true">{stat.icon}</div>
                  <span className={`text-[10px] truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</span>
                </div>
                <span className={`font-bold text-xs flex-shrink-0 ml-1 ${stat.isHighlight ? ratingColor : colors.text}`}>{stat.value}</span>
              </div>
            );
          })}
        </div>

        {/* Actions: Share + Download + Back + Play Again */}
        <div className="flex gap-2 mb-2">
          <button onClick={onShare} className="px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all active:scale-95 text-xs flex items-center justify-center gap-1">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          {onDownload && (
            <button onClick={onDownload} className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all active:scale-95 text-xs flex items-center justify-center gap-1">
              <Download className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          )}
          {drillBackLink && (
            <Link href={drillBackLink} className="flex-1">
              <span className={`block w-full px-3 py-2 rounded-lg font-semibold transition-all text-center text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                ← Back
              </span>
            </Link>
          )}
          <button onClick={onPlayAgain} className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all active:scale-[0.98] text-xs">
            Play Again →
          </button>
        </div>
      </div>
    </div>
  );
}