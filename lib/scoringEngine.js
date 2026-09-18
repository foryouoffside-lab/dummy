// lib/scoringEngine.js
// SkillDrills Pro — Universal Scoring Engine
// ONE engine used by ALL drills. Same formula. Same ratings. Same XP.
// Never import ad-hoc scoring logic — always use this.

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

export function getScoreRating(percentage) {
  return getGrade(percentage);
}

export function getFpsScoreGrade(score, eliteScore) {
  if (!eliteScore || eliteScore <= 0) return getScoreRating(0);
  const pct = 100 * Math.sqrt(Math.max(0, score) / eliteScore);
  return getScoreRating(Math.min(100, pct));
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
