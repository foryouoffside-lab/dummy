// lib/difficultyManager.js
// Adaptive difficulty scaling based on localStorage score history
// Analyzes recent game performance and adjusts difficulty level accordingly

/**
 * Difficulty level definitions
 * Each level adjusts timers, sizes, and scoring expectations
 */
export const DIFFICULTY_LEVELS = [
  {
    level: 1,
    name: 'Beginner',
    emoji: '🌱',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    ballTimer: 1800,
    numberTimer: 1800,
    ballSize: 88,
    ballSizeClass: 'w-[88px] h-[88px]',
    ballSizeFS: 'w-[110px] h-[110px]',
    promoteThreshold: 60,
    demoteThreshold: 0,
    // Universal per-drill params
    displayTime: 2000,      // ms to show item before hiding (memory drills)
    spawnRate: 2200,        // ms between new items spawning (fighter/matching)
    gridStart: 3,           // starting grid/board size
    numDigits: 4,           // digits in number recall sequences
    sequenceStart: 3,       // starting sequence length
    symbolCount: 4,         // number of symbols on screen
    timeBonus: 60,          // game time in seconds
    numberRange: 10,        // max number in arithmetic (quick math)
    disks: 3,               // tower of hanoi starting disks
    blanks: 6,              // sudoku blank cells
  },
  {
    level: 2,
    name: 'Normal',
    emoji: '⚡',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    ballTimer: 1400,
    numberTimer: 1400,
    ballSize: 80,
    ballSizeClass: 'w-20 h-20',
    ballSizeFS: 'w-[100px] h-[100px]',
    promoteThreshold: 80,
    demoteThreshold: 25,
    displayTime: 1700,
    spawnRate: 1900,
    gridStart: 4,
    numDigits: 5,
    sequenceStart: 4,
    symbolCount: 6,
    timeBonus: 60,
    numberRange: 20,
    disks: 4,
    blanks: 10,
  },
  {
    level: 3,
    name: 'Intermediate',
    emoji: '🔥',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    ballTimer: 1200,
    numberTimer: 1200,
    ballSize: 72,
    ballSizeClass: 'w-[72px] h-[72px]',
    ballSizeFS: 'w-[92px] h-[92px]',
    promoteThreshold: 100,
    demoteThreshold: 35,
    displayTime: 1400,
    spawnRate: 1600,
    gridStart: 4,
    numDigits: 6,
    sequenceStart: 5,
    symbolCount: 8,
    timeBonus: 60,
    numberRange: 30,
    disks: 4,
    blanks: 14,
  },
  {
    level: 4,
    name: 'Hard',
    emoji: '💎',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    ballTimer: 1000,
    numberTimer: 1000,
    ballSize: 64,
    ballSizeClass: 'w-16 h-16',
    ballSizeFS: 'w-[84px] h-[84px]',
    promoteThreshold: 130,
    demoteThreshold: 45,
    displayTime: 1100,
    spawnRate: 1300,
    gridStart: 5,
    numDigits: 7,
    sequenceStart: 6,
    symbolCount: 10,
    timeBonus: 60,
    numberRange: 50,
    disks: 5,
    blanks: 18,
  },
  {
    level: 5,
    name: 'Expert',
    emoji: '🏆',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    ballTimer: 800,
    numberTimer: 800,
    ballSize: 56,
    ballSizeClass: 'w-14 h-14',
    ballSizeFS: 'w-[76px] h-[76px]',
    promoteThreshold: 160,
    demoteThreshold: 55,
    displayTime: 850,
    spawnRate: 1050,
    gridStart: 5,
    numDigits: 8,
    sequenceStart: 7,
    symbolCount: 12,
    timeBonus: 60,
    numberRange: 100,
    disks: 5,
    blanks: 22,
  },
  {
    level: 6,
    name: 'Master',
    emoji: '👑',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    ballTimer: 650,
    numberTimer: 650,
    ballSize: 48,
    ballSizeClass: 'w-12 h-12',
    ballSizeFS: 'w-[68px] h-[68px]',
    promoteThreshold: Infinity,
    demoteThreshold: 70,
    displayTime: 650,
    spawnRate: 800,
    gridStart: 6,
    numDigits: 9,
    sequenceStart: 9,
    symbolCount: 14,
    timeBonus: 60,
    numberRange: 200,
    disks: 6,
    blanks: 26,
  },
];

const HISTORY_KEY_SUFFIX = '_history';
const LEVEL_KEY_SUFFIX = '_level';
const MAX_HISTORY = 10;
const GAMES_FOR_EVALUATION = 3; // evaluate based on last N games

/**
 * Get the current difficulty level for a drill
 * @param {string} drillId - Drill identifier
 * @returns {Object} Level config from DIFFICULTY_LEVELS
 */
export function getDifficultyLevel(drillId) {
  try {
    const stored = localStorage.getItem(drillId + LEVEL_KEY_SUFFIX);
    if (stored) {
      const level = parseInt(stored, 10);
      if (level >= 1 && level <= DIFFICULTY_LEVELS.length) {
        return DIFFICULTY_LEVELS[level - 1];
      }
    }
  } catch (e) {}
  return DIFFICULTY_LEVELS[0]; // Default: Beginner
}

/**
 * Get score history for a drill
 * @param {string} drillId
 * @returns {Array<{score: number, timestamp: string, level: number}>}
 */
export function getScoreHistory(drillId) {
  try {
    const data = localStorage.getItem(drillId + HISTORY_KEY_SUFFIX);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Record a game score and evaluate level change
 * @param {string} drillId - Drill identifier
 * @param {number} score - Final score
 * @returns {{ levelChanged: 'up'|'down'|'none', oldLevel: Object, newLevel: Object, history: Array }}
 */
export function recordGameScore(drillId, score) {
  const currentLevel = getDifficultyLevel(drillId);
  const history = getScoreHistory(drillId);

  // Add new score
  history.unshift({
    score,
    timestamp: new Date().toISOString(),
    level: currentLevel.level,
  });

  // Keep only last MAX_HISTORY entries
  if (history.length > MAX_HISTORY) {
    history.length = MAX_HISTORY;
  }

  // Save history
  try {
    localStorage.setItem(drillId + HISTORY_KEY_SUFFIX, JSON.stringify(history));
  } catch (e) {}

  // Evaluate level change based on recent games AT CURRENT LEVEL
  const recentAtLevel = history
    .filter(h => h.level === currentLevel.level)
    .slice(0, GAMES_FOR_EVALUATION);

  if (recentAtLevel.length < GAMES_FOR_EVALUATION) {
    // Not enough games at this level to evaluate
    return { levelChanged: 'none', oldLevel: currentLevel, newLevel: currentLevel, history };
  }

  const avgScore = recentAtLevel.reduce((sum, h) => sum + h.score, 0) / recentAtLevel.length;

  let newLevelIndex = currentLevel.level - 1; // 0-indexed

  // Check for promotion
  if (avgScore >= currentLevel.promoteThreshold && newLevelIndex < DIFFICULTY_LEVELS.length - 1) {
    newLevelIndex++;
  }
  // Check for demotion
  else if (avgScore < currentLevel.demoteThreshold && newLevelIndex > 0) {
    newLevelIndex--;
  }

  const newLevel = DIFFICULTY_LEVELS[newLevelIndex];

  // Save new level
  try {
    localStorage.setItem(drillId + LEVEL_KEY_SUFFIX, newLevel.level.toString());
  } catch (e) {}

  const levelChanged = newLevel.level > currentLevel.level ? 'up'
    : newLevel.level < currentLevel.level ? 'down'
    : 'none';

  return { levelChanged, oldLevel: currentLevel, newLevel, history };
}

/**
 * Get level config by level number
 * @param {number} level - 1-indexed level number
 * @returns {Object} Level config
 */
export function getLevelConfig(level) {
  const index = Math.max(0, Math.min(DIFFICULTY_LEVELS.length - 1, level - 1));
  return DIFFICULTY_LEVELS[index];
}

/**
 * Get progress toward next level
 * @param {string} drillId
 * @returns {{ current: number, threshold: number, percentage: number, gamesNeeded: number }}
 */
export function getLevelProgress(drillId) {
  const currentLevel = getDifficultyLevel(drillId);
  const history = getScoreHistory(drillId);

  const recentAtLevel = history
    .filter(h => h.level === currentLevel.level)
    .slice(0, GAMES_FOR_EVALUATION);

  const avgScore = recentAtLevel.length > 0
    ? recentAtLevel.reduce((sum, h) => sum + h.score, 0) / recentAtLevel.length
    : 0;

  const threshold = currentLevel.promoteThreshold;
  const percentage = threshold === Infinity
    ? 100
    : Math.min(100, Math.round((avgScore / threshold) * 100));

  const gamesNeeded = Math.max(0, GAMES_FOR_EVALUATION - recentAtLevel.length);

  return {
    current: Math.round(avgScore),
    threshold: threshold === Infinity ? '∞' : threshold,
    percentage,
    gamesNeeded,
    gamesPlayed: recentAtLevel.length,
    totalGamesNeeded: GAMES_FOR_EVALUATION,
  };
}

/**
 * Reset difficulty for a drill
 * @param {string} drillId
 */
export function resetDifficulty(drillId) {
  try {
    localStorage.removeItem(drillId + LEVEL_KEY_SUFFIX);
    localStorage.removeItem(drillId + HISTORY_KEY_SUFFIX);
  } catch (e) {}
}
