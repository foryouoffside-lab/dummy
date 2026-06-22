'use client';

import { useState, useEffect } from 'react';
import { Award, X, CheckCircle, Zap, Target, Trophy, Star, TrendingUp } from 'lucide-react';

/**
 * Achievement definitions
 */
export const ACHIEVEMENTS = [
  { id: 'first_score', icon: Star, label: 'First Steps', desc: 'Complete your first drill', check: (s) => s.completed > 0 },
  { id: 'combo_5', icon: Zap, label: 'On Fire', desc: 'Reach a 5x combo', check: (s) => s.bestCombo >= 5 },
  { id: 'combo_10', icon: Zap, label: 'Unstoppable', desc: 'Reach a 10x combo', check: (s) => s.bestCombo >= 10 },
  { id: 'combo_20', icon: Zap, label: 'Legendary Streak', desc: 'Reach a 20x combo', check: (s) => s.bestCombo >= 20 },
  { id: 'accuracy_90', icon: Target, label: 'Sharpshooter', desc: 'Achieve 90%+ accuracy', check: (s) => s.accuracy >= 90 },
  { id: 'accuracy_100', icon: Trophy, label: 'Perfect Aim', desc: 'Achieve 100% accuracy', check: (s) => s.accuracy >= 100 },
  { id: 'score_50', icon: TrendingUp, label: 'Getting Good', desc: 'Score 50+ points', check: (s) => s.score >= 50 },
  { id: 'score_100', icon: Award, label: 'Century Club', desc: 'Score 100+ points', check: (s) => s.score >= 100 },
  { id: 'perfect_lives', icon: CheckCircle, label: 'Flawless', desc: 'Finish with all lives intact', check: (s) => s.livesRemaining === s.maxLives && s.maxLives > 0 },
  { id: 'persistent', icon: Trophy, label: 'Dedicated', desc: 'Play 10 sessions total', check: (s) => s.totalSessions >= 10 },
];

const ACHIEVEMENT_STORAGE = 'skilldrills_achievements';

/**
 * Achievement Badge component
 * Shows unlocked achievements and animations for new unlocks
 */
export default function AchievementBadge({ achievement, isNew = false }) {
  if (!achievement) return null;

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
      isNew 
        ? 'bg-yellow-50 border-yellow-300 animate-bounce' 
        : 'bg-gray-50 border-gray-200 opacity-75'
    }`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isNew ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
      }`}>
        <achievement.icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${isNew ? 'text-yellow-800' : 'text-gray-600'}`}>
          {achievement.label}
        </p>
        <p className={`text-xs ${isNew ? 'text-yellow-600' : 'text-gray-400'}`}>
          {achievement.desc}
        </p>
      </div>
      {isNew && (
        <div className="flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-yellow-400 text-white flex items-center justify-center animate-ping">
            <Award className="w-3.5 h-3.5" />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Check and unlock new achievements
 * @param {Object} sessionData - Current session data
 * @returns {Array} Newly unlocked achievements
 */
export function checkAchievements(sessionData) {
  try {
    const stored = localStorage.getItem(ACHIEVEMENT_STORAGE);
    const unlocked = stored ? JSON.parse(stored) : {};
    const newAchievements = [];

    ACHIEVEMENTS.forEach(achievement => {
      if (!unlocked[achievement.id] && achievement.check(sessionData)) {
        unlocked[achievement.id] = {
          unlockedAt: new Date().toISOString(),
          ...sessionData,
        };
        newAchievements.push(achievement);
      }
    });

    localStorage.setItem(ACHIEVEMENT_STORAGE, JSON.stringify(unlocked));
    return newAchievements;
  } catch {
    return [];
  }
}

/**
 * Get all unlocked achievements
 * @returns {Object} Unlocked achievements map
 */
export function getUnlockedAchievements() {
  try {
    const stored = localStorage.getItem(ACHIEVEMENT_STORAGE);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Achievement Notification component that appears on new unlocks
 */
export function AchievementNotification({ achievements, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (achievements.length === 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [achievements, onClose]);

  if (achievements.length === 0 || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {achievements.map((ach, i) => (
        <div
          key={ach.id}
          className="bg-white rounded-xl shadow-2xl border-2 border-yellow-300 p-4 max-w-xs animate-in fade-in slide-in-from-bottom"
          style={{ animationDelay: `${i * 200}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <ach.icon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-yellow-600 font-medium uppercase tracking-wider">Achievement Unlocked!</p>
              <p className="font-bold text-gray-900">{ach.label}</p>
              <p className="text-sm text-gray-500">{ach.desc}</p>
            </div>
            <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}