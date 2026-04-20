'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, Medal, Award, ChevronRight, Crown, Users } from 'lucide-react';

export default function LeaderboardPreview({ leaderboard, drillId, title = 'Top Performers' }) {
  
  const [showAll, setShowAll] = useState(false);
  
  const displayLeaderboard = showAll ? leaderboard : leaderboard?.slice(0, 5);
  
  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-500" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-gray-500">{rank}</span>;
  };
  
  const getRankBg = (rank) => {
    if (rank === 1) return 'bg-yellow-50 border-yellow-200';
    if (rank === 2) return 'bg-gray-50 border-gray-200';
    if (rank === 3) return 'bg-orange-50 border-orange-200';
    return 'bg-white border-gray-100';
  };
  
  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No scores yet</p>
        <p className="text-sm text-gray-400 mt-1">Be the first to complete this drill!</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">{title}</h3>
            <p className="text-blue-100 text-sm">Top scores on this drill</p>
          </div>
          {drillId && (
            <Link 
              href={`/leaderboard/drill/${drillId}`}
              className="text-white hover:text-blue-100 transition flex items-center gap-1 text-sm"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
      
      {/* Leaderboard List */}
      <div className="divide-y divide-gray-100">
        {displayLeaderboard.map((entry, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between p-4 ${getRankBg(entry.rank)}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 flex justify-center">
                {entry.rank === 1 ? (
                  <Crown className="w-5 h-5 text-yellow-500" />
                ) : (
                  getRankIcon(entry.rank)
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{entry.name}</p>
                <p className="text-xs text-gray-500">Level {entry.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-600">{entry.score}%</p>
              <p className="text-xs text-gray-500">{entry.accuracy}% accuracy</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Show More Button */}
      {leaderboard.length > 5 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-3 text-center text-sm text-blue-600 hover:bg-gray-50 transition font-medium"
        >
          Show More ({leaderboard.length - 5} more)
        </button>
      )}
      
      {showAll && leaderboard.length > 5 && (
        <button
          onClick={() => setShowAll(false)}
          className="w-full py-3 text-center text-sm text-gray-500 hover:bg-gray-50 transition"
        >
          Show Less
        </button>
      )}
    </div>
  );
}