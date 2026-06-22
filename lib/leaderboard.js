// lib/leaderboard.js
// Global leaderboard system with rank tiers, username, and cross-device sharing

/**
 * Rank tiers with thresholds
 */
export const RANK_TIERS = [
  { id: 'diamond',  name: 'Diamond',    minScore: 90,  icon: '💎', color: 'text-cyan-400',  bg: 'bg-cyan-100',  border: 'border-cyan-300' },
  { id: 'platinum', name: 'Platinum',   minScore: 80,  icon: '💎', color: 'text-blue-500',  bg: 'bg-blue-100',   border: 'border-blue-300' },
  { id: 'gold',     name: 'Gold',       minScore: 65,  icon: '🥇', color: 'text-yellow-500', bg: 'bg-yellow-100', border: 'border-yellow-300' },
  { id: 'silver',   name: 'Silver',     minScore: 45,  icon: '🥈', color: 'text-gray-500',  bg: 'bg-gray-100',   border: 'border-gray-300' },
  { id: 'bronze',   name: 'Bronze',     minScore: 25,  icon: '🥉', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300' },
  { id: 'iron',     name: 'Iron',       minScore: 0,   icon: '⛓️', color: 'text-gray-600',  bg: 'bg-gray-200',   border: 'border-gray-400' },
];

const LEADERBOARD_KEY = 'skilldrills_leaderboard';
const PLAYER_NAME_KEY = 'skilldrills_player_name';
const MAX_ENTRIES = 100;

/**
 * Get rank tier based on score percentage
 * @param {number} scorePercentage - 0-100
 * @returns {Object} Rank tier object
 */
export function getRankTier(scorePercentage) {
  return RANK_TIERS.find(t => scorePercentage >= t.minScore) || RANK_TIERS[RANK_TIERS.length - 1];
}

/**
 * Get display rank for a raw score based on drill category max
 * @param {number} score - Raw score
 * @param {number} maxPossibleScore - Maximum possible score (optional)
 * @returns {Object} Rank tier
 */
export function getScoreRank(score, maxPossibleScore = 100) {
  const percentage = maxPossibleScore ? Math.min(100, Math.round((score / maxPossibleScore) * 100)) : score;
  return getRankTier(percentage);
}

/**
 * Get or create player name
 * @returns {string} Player name
 */
export function getPlayerName() {
  try {
    return localStorage.getItem(PLAYER_NAME_KEY) || 'Anonymous Player';
  } catch {
    return 'Anonymous Player';
  }
}

/**
 * Set player name
 * @param {string} name 
 */
export function setPlayerName(name) {
  try {
    localStorage.setItem(PLAYER_NAME_KEY, name.trim() || 'Anonymous Player');
  } catch {}
}

/**
 * Save a score to the leaderboard
 * @param {Object} entry - { drillId, drillName, category, score, accuracy, bestCombo, livesRemaining }
 * @returns {Object|null} Entry if saved, null if error
 */
export function saveLeaderboardEntry(entry) {
  try {
    const leaderboard = getLeaderboard();
    const playerName = getPlayerName();
    const timestamp = new Date().toISOString();
    const rank = getScoreRank(entry.score);

    const newEntry = {
      id: `${entry.drillId}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      playerName,
      timestamp,
      ...entry,
      rank: rank.id,
      rankName: rank.name,
      rankIcon: rank.icon,
    };

    if (!leaderboard[entry.drillId]) {
      leaderboard[entry.drillId] = [];
    }

    leaderboard[entry.drillId].unshift(newEntry);

    // Keep only top entries sorted by score
    leaderboard[entry.drillId].sort((a, b) => b.score - a.score);
    if (leaderboard[entry.drillId].length > MAX_ENTRIES) {
      leaderboard[entry.drillId] = leaderboard[entry.drillId].slice(0, MAX_ENTRIES);
    }

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
    return newEntry;
  } catch {
    return null;
  }
}

/**
 * Get full leaderboard
 * @returns {Object} Leaderboard data keyed by drillId
 */
export function getLeaderboard() {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/**
 * Get leaderboard for a specific drill
 * @param {string} drillId - Drill identifier
 * @param {number} limit - Max entries (default 20)
 * @returns {Array} Sorted leaderboard entries
 */
export function getDrillLeaderboard(drillId, limit = 20) {
  const leaderboard = getLeaderboard();
  const entries = leaderboard[drillId] || [];
  return entries.slice(0, limit);
}

/**
 * Get player's personal best ranking on a drill
 * @param {string} drillId 
 * @returns {Object|null} Player's best entry
 */
export function getPersonalBest(drillId) {
  const playerName = getPlayerName();
  const entries = getDrillLeaderboard(drillId);
  return entries.find(e => e.playerName === playerName) || null;
}

/**
 * Get player's global ranking position on a drill
 * @param {string} drillId 
 * @returns {{ position: number, total: number, entry: Object|null }}
 */
export function getPlayerRanking(drillId) {
  const entries = getDrillLeaderboard(drillId);
  const playerName = getPlayerName();
  const position = entries.findIndex(e => e.playerName === playerName);
  return {
    position: position >= 0 ? position + 1 : entries.length + 1,
    total: entries.length,
    entry: position >= 0 ? entries[position] : null,
  };
}

/**
 * Get best score across all drills
 * @param {number} limit 
 * @returns {Array} Top scores sorted globally
 */
export function getGlobalBestScores(limit = 50) {
  const leaderboard = getLeaderboard();
  const allEntries = [];

  Object.entries(leaderboard).forEach(([drillId, entries]) => {
    entries.forEach(entry => {
      allEntries.push({ ...entry, drillId });
    });
  });

  return allEntries
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Export leaderboard as JSON
 * @returns {string} JSON string
 */
export function exportLeaderboard() {
  return JSON.stringify(getLeaderboard(), null, 2);
}

/**
 * Generate a challenge URL with player's score
 * @param {Object} entry 
 * @returns {string} URL
 */
export function generateChallengeUrl(entry) {
  const base = 'https://skilldrills.online';
  // Use custom path if provided, otherwise build from category/drillId
  const drillPath = entry.customPath || `drills/${entry.category}/${entry.drillId}`;
  const params = new URLSearchParams({
    drill: entry.drillId,
    score: entry.score.toString(),
    player: entry.playerName,
    rank: entry.rankName,
  });
  return `${base}/${drillPath}?challenge=${params.toString()}`;
}

/**
 * Generate share text for a score
 * @param {Object} entry 
 * @returns {string} Share text
 */
export function generateShareScoreText(entry) {
  const { drillName = 'Drill', score, playerName, rankName, rankIcon, accuracy, bestCombo } = entry;
  let text = `${rankIcon} ${playerName} scored ${score} points on ${drillName}!`;
  text += `\n🏅 Rank: ${rankName}`;
  if (accuracy) text += `\n🎯 Accuracy: ${accuracy}%`;
  if (bestCombo) text += `\n🔥 Best Combo: ${bestCombo}x`;
  text += `\n\nCan you beat my score? Try it free at skilldrills.online 🎮`;
  return text;
}

/**
 * Clear all leaderboard data
 */
export function clearLeaderboard() {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
  } catch {}
}