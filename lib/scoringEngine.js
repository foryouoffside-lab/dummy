// lib/scoringEngine.js
// SkillDrills Pro — Universal Scoring Engine
// ONE engine used by ALL drills. Same formula. Same ratings. Same XP.
// Never import ad-hoc scoring logic — always use this.

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY BASE CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORY_CONFIG = {
  cognitive: {
    basePoints: 6,
    fastWindow: 1200,
    livesEnabled: true,
    maxLives: 5,
    description: 'Cognitive Training',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GRADE TIERS — same across every single drill
// ─────────────────────────────────────────────────────────────────────────────

export const GRADE_TIERS = [
  { min: 95, grade: 'S+', label: 'LEGENDARY',      emoji: '🏆', color: 'text-yellow-400',  bg: 'bg-yellow-500/20',  border: 'border-yellow-500/40',  glow: 'shadow-yellow-500/30'  },
  { min: 85, grade: 'S',  label: 'Elite',          emoji: '⚡', color: 'text-cyan-400',    bg: 'bg-cyan-500/20',    border: 'border-cyan-500/40',    glow: 'shadow-cyan-500/30'    },
  { min: 75, grade: 'A',  label: 'Excellent',      emoji: '🌟', color: 'text-blue-400',    bg: 'bg-blue-500/20',    border: 'border-blue-500/40',    glow: 'shadow-blue-500/30'    },
  { min: 60, grade: 'B',  label: 'Great',          emoji: '💪', color: 'text-green-400',   bg: 'bg-green-500/20',   border: 'border-green-500/40',   glow: 'shadow-green-500/30'   },
  { min: 45, grade: 'C',  label: 'Good',           emoji: '👍', color: 'text-indigo-400',  bg: 'bg-indigo-500/20',  border: 'border-indigo-500/40',  glow: 'shadow-indigo-500/30'  },
  { min: 30, grade: 'D',  label: 'Keep Going',     emoji: '📈', color: 'text-orange-400',  bg: 'bg-orange-500/20',  border: 'border-orange-500/40',  glow: 'shadow-orange-500/30'  },
  { min: 0,  grade: 'F',  label: 'Needs Practice', emoji: '🎯', color: 'text-red-400',     bg: 'bg-red-500/20',     border: 'border-red-500/40',     glow: 'shadow-red-500/30'     },
];

/**
 * Get grade tier for a percentage (0–100).
 * Use this on every drill end screen.
 * @param {number} percentage — 0 to 100
 * @returns {Object} grade tier object
 */
export function getGrade(percentage) {
  return GRADE_TIERS.find(t => percentage >= t.min) || GRADE_TIERS[GRADE_TIERS.length - 1];
}

// ─────────────────────────────────────────────────────────────────────────────
// COMBO MULTIPLIER — universal, used by all drills
// ─────────────────────────────────────────────────────────────────────────────

export const COMBO_MILESTONES = [50, 30, 20, 15, 10, 7, 5, 3];

/**
 * Get combo multiplier for current hit streak.
 * @param {number} combo — consecutive correct actions
 * @returns {number} multiplier (1.0 → 3.0)
 */
export function getComboMultiplier(combo) {
  if (combo >= 50) return 3.0;
  if (combo >= 30) return 2.5;
  if (combo >= 20) return 2.0;
  if (combo >= 15) return 1.75;
  if (combo >= 10) return 1.5;
  if (combo >= 7)  return 1.35;
  if (combo >= 5)  return 1.25;
  if (combo >= 3)  return 1.1;
  return 1.0;
}

/**
 * Check if this combo count is a new milestone (for showing "COMBO!" banner).
 * @param {number} combo
 * @returns {boolean}
 */
export function isComboMilestone(combo) {
  return COMBO_MILESTONES.includes(combo);
}

// ─────────────────────────────────────────────────────────────────────────────
// PER-ACTION SCORE — call this every time the user hits/taps correctly
// ─────────────────────────────────────────────────────────────────────────────

export function scoreAction({
  category = 'cognitive',
  combo = 0,
  reactionMs = null,
  timeRemaining = null,
  totalGameTime = 60,
  livesRemaining = null,
  maxLives = 5,
  level = 1,
  maxLevel = 1,
}) {
  const cfg = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.cognitive;

  // 1. Base points
  let base = cfg.basePoints;

  // 2. Speed bonus (reaction time)
  let speedBonus = 0;
  if (reactionMs !== null && reactionMs > 0) {
    const t = cfg.fastWindow;
    if (reactionMs < t * 0.25)      speedBonus = Math.floor(base * 1.5);  // Lightning  +150%
    else if (reactionMs < t * 0.45) speedBonus = Math.floor(base * 1.0);  // Very fast  +100%
    else if (reactionMs < t * 0.65) speedBonus = Math.floor(base * 0.5);  // Fast       +50%
    else if (reactionMs < t * 0.85) speedBonus = Math.floor(base * 0.25); // Good       +25%
  }

  // 3. Late-game rush bonus (final 25% of game time)
  let lateGameBonus = 0;
  if (timeRemaining !== null && totalGameTime > 0) {
    const progress = 1 - (timeRemaining / totalGameTime);
    if (progress >= 0.75)      lateGameBonus = Math.floor(base * 0.5);
    else if (progress >= 0.5)  lateGameBonus = Math.floor(base * 0.25);
  }

  // 4. Survival bonus (if lives system is on)
  let survivalBonus = 0;
  if (cfg.livesEnabled && livesRemaining !== null && maxLives > 0) {
    survivalBonus = Math.floor(base * (livesRemaining / maxLives) * 0.4);
  }

  // 5. Combo multiplier
  const comboMultiplier = getComboMultiplier(combo);

  // 6. Difficulty-level multiplier
  const levelMultiplier = maxLevel > 1 ? 1 + ((Math.min(level, maxLevel) - 1) / (maxLevel - 1)) * 0.5 : 1;

  const subtotal = base + speedBonus + lateGameBonus;
  const total = Math.round(subtotal * comboMultiplier * levelMultiplier + survivalBonus);

  return {
    total,
    base,
    speedBonus,
    comboMultiplier,
    levelMultiplier,
    lateGameBonus,
    survivalBonus,
    breakdown: `${base}base + ${speedBonus}speed + ${lateGameBonus}rush × ${comboMultiplier}x combo × ${levelMultiplier.toFixed(2)}x level + ${survivalBonus}survival`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// END-GAME BONUSES — call once at the end of every drill session
// ─────────────────────────────────────────────────────────────────────────────

export function calcEndBonuses({
  rawScore = 0,
  accuracy = 0,
  bestCombo = 0,
  totalActions = 0,
  mistakes = 0,
  livesRemaining = null,
  maxLives = 5,
  category = 'cognitive',
}) {
  const cfg = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.cognitive;

  // Accuracy bonus
  let accuracyBonus = 0;
  if (accuracy >= 95)      accuracyBonus = Math.round(rawScore * 0.20);
  else if (accuracy >= 85) accuracyBonus = Math.round(rawScore * 0.10);
  else if (accuracy >= 70) accuracyBonus = Math.round(rawScore * 0.05);

  // Combo bonus
  let comboBonus = 0;
  if (bestCombo >= 50)      comboBonus = Math.round(rawScore * 0.25);
  else if (bestCombo >= 30) comboBonus = Math.round(rawScore * 0.15);
  else if (bestCombo >= 20) comboBonus = Math.round(rawScore * 0.10);
  else if (bestCombo >= 10) comboBonus = Math.round(rawScore * 0.05);

  // Perfect run bonus
  let perfectBonus = 0;
  if (mistakes === 0 && totalActions >= 5) {
    perfectBonus = 500;
  }

  // Survival bonus
  let survivalBonus = 0;
  if (cfg.livesEnabled && livesRemaining !== null && maxLives > 0) {
    const ratio = livesRemaining / maxLives;
    if (ratio >= 1.0)      survivalBonus = Math.round(rawScore * 0.15);
    else if (ratio >= 0.8) survivalBonus = Math.round(rawScore * 0.08);
    else if (ratio >= 0.6) survivalBonus = Math.round(rawScore * 0.03);
  }

  const totalBonus = accuracyBonus + comboBonus + perfectBonus + survivalBonus;
  const finalScore = rawScore + totalBonus;

  return { accuracyBonus, comboBonus, perfectBonus, survivalBonus, totalBonus, finalScore };
}

export const STREAK_MILESTONE_XP = { 3: 150, 7: 400, 14: 900, 30: 2000 };
export const MISSION_COMPLETE_XP = 250;
export const DAILY_SET_COMPLETE_XP = 200;

export function calcSessionXP({ finalScore, accuracy, isNewBest, firstPlay, dailyChallenge, dailyChallengeSetComplete = false, streakMilestone = null, missionComplete = false }) {
  const breakdown = [];
  let xp = 0;

  const baseXP = Math.max(10, Math.round(finalScore * 0.1));
  xp += baseXP;
  breakdown.push(`+${baseXP} base`);

  if (firstPlay) {
    xp += 50;
    breakdown.push('+50 first play');
  }

  if (isNewBest) {
    xp += 100;
    breakdown.push('+100 new best!');
  }

  if (accuracy >= 90) {
    xp += 30;
    breakdown.push('+30 accuracy');
  }

  if (dailyChallenge) {
    xp *= 2;
    breakdown.push('2x daily challenge bonus');
  }

  if (dailyChallengeSetComplete) {
    xp += DAILY_SET_COMPLETE_XP;
    breakdown.push(`+${DAILY_SET_COMPLETE_XP} all 3 daily challenges complete!`);
  }

  if (streakMilestone && STREAK_MILESTONE_XP[streakMilestone]) {
    const streakBonus = STREAK_MILESTONE_XP[streakMilestone];
    xp += streakBonus;
    breakdown.push(`+${streakBonus} ${streakMilestone}-day streak`);
  }

  if (missionComplete) {
    xp += MISSION_COMPLETE_XP;
    breakdown.push(`+${MISSION_COMPLETE_XP} mission complete`);
  }

  return { xp, breakdown };
}

export function isValidReactionTime(ms) {
  return ms >= 80 && ms <= 5000;
}

export function isPlaying(state) {
  return state === 'playing';
}

export function toPercentage(score, maxPossible) {
  if (!maxPossible || maxPossible <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((score / maxPossible) * 100)));
}

export const DRIFFICULTY_CONFIG = CATEGORY_CONFIG;
export const SCORE_TIERS = GRADE_TIERS.map(t => ({
  min: t.min, letter: t.grade, label: t.label,
  color: t.color, bg: t.bg, emoji: t.emoji,
}));

export function getScoreRating(percentage) {
  return getGrade(percentage);
}

export function getFpsScoreGrade(score, eliteScore) {
  if (!eliteScore || eliteScore <= 0) return getScoreRating(0);
  const pct = 100 * Math.sqrt(Math.max(0, score) / eliteScore);
  return getScoreRating(Math.min(100, pct));
}

export function calculateTotalPoints({
  category = 'cognitive',
  reactionTimeMs = null,
  combo = 0,
  livesRemaining = null,
  maxLives = 5,
  timeRemaining = null,
  totalGameTime = 60,
}) {
  return scoreAction({
    category,
    combo,
    reactionMs: reactionTimeMs,
    timeRemaining,
    totalGameTime,
    livesRemaining,
    maxLives,
  });
}

export function calculateEndGameBonuses({
  category = 'cognitive',
  totalScore = 0,
  accuracy = 100,
  combo = 0,
  livesRemaining = null,
  maxLives = 5,
}) {
  return calcEndBonuses({
    rawScore: totalScore,
    accuracy,
    bestCombo: combo,
    livesRemaining,
    maxLives,
    category,
  });
}

export function isValidGameState(currentState, requiredState = 'playing') {
  return currentState === requiredState;
}

export const DIFFICULTY_MAP = {
  fps:               { label: 'Expert',  color: 'text-red-400',    dot: 'bg-red-400'    },
  'reaction-speed':  { label: 'Hard',    color: 'text-orange-400', dot: 'bg-orange-400' },
  cognitive:         { label: 'Medium',  color: 'text-blue-400',   dot: 'bg-blue-400'   },
  memory:            { label: 'Medium',  color: 'text-indigo-400', dot: 'bg-indigo-400' },
  visual:            { label: 'Hard',    color: 'text-purple-400', dot: 'bg-purple-400' },
  'visual-tracking': { label: 'Medium',  color: 'text-cyan-400',   dot: 'bg-cyan-400'   },
  academic:          { label: 'Easy',    color: 'text-green-400',  dot: 'bg-green-400'  },
  motor:             { label: 'Hard',    color: 'text-orange-400', dot: 'bg-orange-400' },
  physical:          { label: 'Medium',  color: 'text-yellow-400', dot: 'bg-yellow-400' },
};

export function getDifficulty(category) {
  return DIFFICULTY_MAP[category] || { label: 'Medium', color: 'text-blue-400', dot: 'bg-blue-400' };
}

// ─────────────────────────────────────────────────────────────────────────────
// PER-DRILL DIFFICULTY RANK — for easy→hard ordering on category landing pages
// Two parallel vocabularies are used across the registry's per-drill
// `difficulty` field (Easy/Medium/Hard in memory/motor/physical vs
// Beginner/Intermediate/Advanced/Expert everywhere else); this maps both
// onto one numeric scale so they sort consistently.
// ─────────────────────────────────────────────────────────────────────────────

export const DIFFICULTY_RANK = {
  Easy: 1, Beginner: 1,
  Medium: 2, Intermediate: 2,
  Hard: 3, Advanced: 3,
  Expert: 4,
};

export function getDifficultyRank(difficulty) {
  return DIFFICULTY_RANK[difficulty] ?? 2;
}