// lib/scoringEngine.js
// Universal scoring engine for all SkillDrills drills
// Handles: Difficulty tiers, speed bonuses, combos, accuracy, survival bonuses, late-game scaling

/**
 * Drill difficulty configuration
 * Each drill category has a base difficulty affecting scoring multipliers
 */
export const DRIFFICULTY_CONFIG = {
  fps: {
    basePoints: 5,
    timeWindow: 800, // ms for "fast" reaction
    livesEnabled: false,
    description: 'FPS Training - No lives, pure performance',
  },
  cognitive: {
    basePoints: 1,
    timeWindow: 1000,
    livesEnabled: true,
    maxLives: 5,
    description: 'Cognitive Training - Lives protect score',
  },
  memory: {
    basePoints: 3,
    timeWindow: 1500,
    livesEnabled: true,
    maxLives: 3,
    description: 'Memory Training - Penalty on mistakes',
  },
  academic: {
    basePoints: 2,
    timeWindow: 2000,
    livesEnabled: false,
    description: 'Academic Drills - Accuracy focused',
  },
  visual: {
    basePoints: 3,
    timeWindow: 900,
    livesEnabled: false,
    description: 'Visual Training - Speed focused',
  },
  motor: {
    basePoints: 4,
    timeWindow: 700,
    livesEnabled: false,
    description: 'Motor Skills - Precision focused',
  },
  productivity: {
    basePoints: 2,
    timeWindow: 1500,
    livesEnabled: false,
    description: 'Productivity - Consistency focused',
  },
  'mental-fitness': {
    basePoints: 1,
    timeWindow: 3000,
    livesEnabled: false,
    description: 'Mental Fitness - Relaxation focused',
  },
  physical: {
    basePoints: 1,
    timeWindow: 2000,
    livesEnabled: false,
    description: 'Physical Training - Execution focused',
  },
};

/**
 * Score rating tiers (S/A/B/C/D/F)
 */
export const SCORE_TIERS = [
  { min: 95, letter: 'S', label: 'Legendary', color: 'text-yellow-500', bg: 'bg-yellow-100', emoji: '🏆' },
  { min: 85, letter: 'A', label: 'Excellent', color: 'text-green-500', bg: 'bg-green-100', emoji: '🌟' },
  { min: 70, letter: 'B', label: 'Great', color: 'text-blue-500', bg: 'bg-blue-100', emoji: '👍' },
  { min: 55, letter: 'C', label: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-50', emoji: '💪' },
  { min: 40, letter: 'D', label: 'Keep Trying', color: 'text-orange-500', bg: 'bg-orange-100', emoji: '📈' },
  { min: 0, letter: 'F', label: 'Needs Practice', color: 'text-red-500', bg: 'bg-red-100', emoji: '💀' },
];

/**
 * Get rating tier for a percentage score
 */
export function getScoreRating(percentage) {
  return SCORE_TIERS.find(tier => percentage >= tier.min) || SCORE_TIERS[SCORE_TIERS.length - 1];
}

/**
 * Calculate base score for an action
 * @param {string} category - Drill category
 * @param {number} reactionTimeMs - Time taken to respond (ms)
 * @returns {{ points: number, speedBonus: number }}
 */
export function calculateActionPoints(category, reactionTimeMs = null) {
  const config = DRIFFICULTY_CONFIG[category] || DRIFFICULTY_CONFIG.cognitive;
  let points = config.basePoints;
  let speedBonus = 0;

  // Speed bonus: faster reactions earn extra points
  if (reactionTimeMs !== null && reactionTimeMs > 0) {
    const threshold = config.timeWindow;
    if (reactionTimeMs < threshold * 0.3) {
      speedBonus = Math.floor(config.basePoints * 1.5); // Lightning fast: +150%
    } else if (reactionTimeMs < threshold * 0.5) {
      speedBonus = Math.floor(config.basePoints * 1.0); // Very fast: +100%
    } else if (reactionTimeMs < threshold * 0.75) {
      speedBonus = Math.floor(config.basePoints * 0.5); // Fast: +50%
    } else if (reactionTimeMs < threshold) {
      speedBonus = Math.floor(config.basePoints * 0.25); // Good: +25%
    }
    // threshold or slower: no speed bonus
  }

  return { points, speedBonus };
}

/**
 * Calculate combo multiplier
 * @param {number} combo - Current combo count
 * @returns {number} Multiplier (1.0 - 3.0)
 */
export function getComboMultiplier(combo) {
  if (combo >= 50) return 3.0;
  if (combo >= 30) return 2.5;
  if (combo >= 20) return 2.0;
  if (combo >= 15) return 1.75;
  if (combo >= 10) return 1.5;
  if (combo >= 7) return 1.35;
  if (combo >= 5) return 1.25;
  if (combo >= 3) return 1.1;
  return 1.0;
}

/**
 * Calculate total points for a successful action
 * @param {Object} params
 * @param {string} params.category - Drill category
 * @param {number} params.reactionTimeMs - Response time in ms
 * @param {number} params.combo - Current combo count
 * @param {number} params.livesRemaining - Lives left (if applicable)
 * @param {number} params.maxLives - Max lives (if applicable)
 * @param {number} params.timeRemaining - Seconds left in game
 * @param {number} params.totalGameTime - Total game duration in seconds
 * @returns {{ total: number, base: number, speedBonus: number, comboMultiplier: number, survivalBonus: number, lateGameBonus: number }}
 */
export function calculateTotalPoints({
  category = 'cognitive',
  reactionTimeMs = null,
  combo = 0,
  livesRemaining = null,
  maxLives = 5,
  timeRemaining = null,
  totalGameTime = 60,
}) {
  const config = DRIFFICULTY_CONFIG[category] || DRIFFICULTY_CONFIG.cognitive;
  const { points, speedBonus } = calculateActionPoints(category, reactionTimeMs);
  const comboMultiplier = getComboMultiplier(combo);

  // Survival bonus: more lives = more points
  let survivalBonus = 0;
  if (config.livesEnabled && livesRemaining !== null && maxLives > 0) {
    survivalBonus = Math.floor(points * (livesRemaining / maxLives) * 0.5);
  }

  // Late-game bonus: harder tasks get bonus in final stretch
  let lateGameBonus = 0;
  if (timeRemaining !== null && totalGameTime > 0) {
    const progress = 1 - (timeRemaining / totalGameTime);
    if (progress > 0.75) {
      lateGameBonus = Math.floor(points * 0.5); // Last 25%: +50%
    } else if (progress > 0.5) {
      lateGameBonus = Math.floor(points * 0.25); // Last 50%: +25%
    }
  }

  const total = Math.round((points + speedBonus + survivalBonus + lateGameBonus) * comboMultiplier);

  return {
    total,
    base: points,
    speedBonus,
    comboMultiplier,
    survivalBonus,
    lateGameBonus,
  };
}

/**
 * Calculate end-of-game bonus points
 * @param {Object} params
 * @param {string} params.category - Drill category
 * @param {number} params.totalScore - Raw score before bonuses
 * @param {number} params.accuracy - Accuracy percentage (0-100)
 * @param {number} params.combo - Best combo achieved
 * @param {number} params.livesRemaining - Lives left at end
 * @param {number} params.maxLives - Max lives
 * @returns {{ accuracyBonus: number, comboBonus: number, survivalBonus: number, totalBonus: number, finalScore: number }}
 */
export function calculateEndGameBonuses({
  category = 'cognitive',
  totalScore = 0,
  accuracy = 100,
  combo = 0,
  livesRemaining = null,
  maxLives = 5,
}) {
  let accuracyBonus = 0;
  let comboBonus = 0;
  let survivalBonus = 0;

  // Accuracy bonus: reward precision
  if (accuracy >= 95) {
    accuracyBonus = Math.round(totalScore * 0.2); // 95%+ : +20%
  } else if (accuracy >= 85) {
    accuracyBonus = Math.round(totalScore * 0.1); // 85%+ : +10%
  } else if (accuracy >= 70) {
    accuracyBonus = Math.round(totalScore * 0.05); // 70%+ : +5%
  }

  // Combo bonus: reward streak performance
  if (combo >= 50) {
    comboBonus = Math.round(totalScore * 0.25);
  } else if (combo >= 30) {
    comboBonus = Math.round(totalScore * 0.15);
  } else if (combo >= 20) {
    comboBonus = Math.round(totalScore * 0.1);
  } else if (combo >= 10) {
    comboBonus = Math.round(totalScore * 0.05);
  }

  // Survival bonus: reward for keeping lives
  const config = DRIFFICULTY_CONFIG[category] || DRIFFICULTY_CONFIG.cognitive;
  if (config.livesEnabled && livesRemaining !== null && maxLives > 0) {
    const survivalRatio = livesRemaining / maxLives;
    if (survivalRatio >= 1.0) {
      survivalBonus = Math.round(totalScore * 0.15); // Perfect: +15%
    } else if (survivalRatio >= 0.8) {
      survivalBonus = Math.round(totalScore * 0.08); // Great: +8%
    } else if (survivalRatio >= 0.6) {
      survivalBonus = Math.round(totalScore * 0.03); // Good: +3%
    }
  }

  const totalBonus = accuracyBonus + comboBonus + survivalBonus;
  const finalScore = totalScore + totalBonus;

  return { accuracyBonus, comboBonus, survivalBonus, totalBonus, finalScore };
}

/**
 * Generate a shareable score summary text
 * @param {Object} params
 * @returns {string} Formatted share text
 */
export function generateShareText({
  drillName = 'Drill',
  score = 0,
  rating = 'C',
  accuracy = null,
  bestCombo = null,
  bestScore = null,
}) {
  let text = `🎯 I scored ${score} (${rating}) on ${drillName}!`;
  if (accuracy !== null) text += ` ${accuracy}% accuracy`;
  if (bestCombo !== null) text += ` 🔥 ${bestCombo}x best combo`;
  if (bestScore !== null && score >= bestScore) text += ` 🏆 NEW PERSONAL BEST!`;
  text += `\n\nCan you beat me? Try it free at skilldrills.online 🎮`;
  return text;
}

/**
 * Get difficulty level for scoring display
 * @param {string} category 
 * @returns {{ label: string, color: string }}
 */
export function getDifficultyDisplay(category) {
  const difficultyMap = {
    fps: { label: 'Expert', color: 'text-red-500' },
    cognitive: { label: 'Medium', color: 'text-blue-500' },
    memory: { label: 'Medium', color: 'text-indigo-500' },
    academic: { label: 'Easy', color: 'text-green-500' },
    visual: { label: 'Hard', color: 'text-orange-500' },
    motor: { label: 'Hard', color: 'text-orange-500' },
    productivity: { label: 'Easy', color: 'text-green-500' },
    'mental-fitness': { label: 'Easy', color: 'text-teal-500' },
    physical: { label: 'Medium', color: 'text-yellow-500' },
  };
  return difficultyMap[category] || { label: 'Medium', color: 'text-blue-500' };
}

/**
 * Validate game state to prevent post-game scoring
 * @param {string} currentState - Current game state
 * @param {string} requiredState - Required state ('playing')
 * @returns {boolean}
 */
export function isValidGameState(currentState, requiredState = 'playing') {
  return currentState === requiredState;
}

/**
 * Anti-cheat: check if reaction time is realistic
 * @param {number} reactionTimeMs 
 * @returns {boolean}
 */
export function isValidReactionTime(reactionTimeMs) {
  // Minimum human reaction time ~100ms, maximum for validity ~5000ms
  return reactionTimeMs >= 80 && reactionTimeMs <= 5000;
}