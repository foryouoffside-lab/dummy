'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, TrendingUp, Crown, X, Copy, Check, Share2, Star } from 'lucide-react';
import { getDrillLeaderboard, getPlayerRanking, generateShareScoreText, getPlayerName } from '../lib/leaderboard';
import { SCORE_TIERS } from '../lib/scoringEngine';

/**
 * Leaderboard Display component
 * Shows top scores for a drill with ranking and sharing
 * @param {Object} props
 * @param {string} props.drillId - Drill identifier
 * @param {string} props.drillName - Drill display name
 * @param {string} props.category - Drill category
 * @param {number} props.currentScore - Current session score
 * @param {number} props.currentAccuracy - Current session accuracy
 * @param {number} props.currentCombo - Current session best combo
 * @param {number} props.currentLives - Lives remaining
 * @param {boolean} props.showOnEnd - Show on end screen
 */
export default function LeaderboardDisplay({ 
  drillId, drillName, category, 
  currentScore, currentAccuracy, currentCombo, currentLives,
  showOnEnd = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [playerRank, setPlayerRank] = useState(null);
  const [copied, setCopied] = useState(false);
  const [autoShow, setAutoShow] = useState(false);

  // Auto-show leaderboard on game end if score > 0
  useEffect(() => {
    if (showOnEnd && currentScore > 0) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setAutoShow(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showOnEnd, currentScore]);

  const refreshLeaderboard = () => {
    setEntries(getDrillLeaderboard(drillId));
    setPlayerRank(getPlayerRanking(drillId));
  };

  useEffect(() => {
    if (isOpen) refreshLeaderboard();
  }, [isOpen, drillId]);

  const handleShare = () => {
    const text = generateShareScoreText({
      drillName,
      score: currentScore,
      playerName: getPlayerName(),
      rankName: playerRank?.entry?.rankName || 'Unranked',
      rankIcon: playerRank?.entry?.rankIcon || '🎯',
      accuracy: currentAccuracy,
      bestCombo: currentCombo,
    });
    
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getMedalIcon = (position) => {
    if (position === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (position === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (position === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return <span className="w-5 h-5 text-center text-gray-500 text-sm font-medium">{position}</span>;
  };

  return (
    <>
      {/* Leaderboard Trigger */}
      <button
        onClick={() => { setIsOpen(true); setAutoShow(false); }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
        aria-label="View leaderboard"
      >
        <Trophy className="w-4 h-4" />
        <span>Leaderboard</span>
      </button>

      {/* Leaderboard Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
        >
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-800 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Leaderboard
                </h2>
                <p className="text-xs text-gray-500">{drillName}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={handleShare} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors" aria-label="Share your score">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-gray-400" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors" aria-label="Close">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Current Score Banner */}
            {currentScore > 0 && (
              <div className="mx-6 mt-4 p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Your Score</p>
                    <p className="text-2xl font-bold text-yellow-400">{currentScore}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {playerRank ? `#${playerRank.position} of ${playerRank.total}` : 'Not ranked'}
                    </p>
                    {playerRank?.entry?.rankName && (
                      <p className="text-sm font-semibold text-gray-300">
                        {playerRank.entry.rankIcon} {playerRank.entry.rankName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Top Scores List */}
            <div className="px-6 py-4">
              <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Top Players</h3>
              {entries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-700" />
                  <p>No scores yet</p>
                  <p className="text-xs">Be the first to set a record!</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {entries.slice(0, 20).map((entry, index) => {
                    const tier = SCORE_TIERS.find(t => entry.score >= t.min) || SCORE_TIERS[SCORE_TIERS.length - 1];
                    const isCurrentPlayer = entry.playerName === getPlayerName();
                    return (
                      <div
                        key={entry.id}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isCurrentPlayer 
                            ? 'bg-yellow-500/10 border border-yellow-500/30' 
                            : 'bg-gray-800/50 hover:bg-gray-800 border border-transparent'
                        }`}
                      >
                        <div className="w-8 flex justify-center">
                          {getMedalIcon(index + 1)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium text-sm truncate ${isCurrentPlayer ? 'text-yellow-400' : 'text-gray-200'}`}>
                              {entry.playerName}
                              {isCurrentPlayer && <span className="text-[10px] text-yellow-500 ml-1">(You)</span>}
                            </span>
                            <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-700 text-gray-300">
                              {tier?.emoji || ''} {tier?.letter || ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{entry.rankIcon} {entry.rankName}</span>
                            {entry.accuracy && <span>🎯 {entry.accuracy}%</span>}
                            {entry.bestCombo && <span>🔥 {entry.bestCombo}x</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-base text-white">{entry.score}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Stats */}
            <div className="px-6 py-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
              <span>{entries.length} players ranked</span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Top score: {entries[0]?.score || '-'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}