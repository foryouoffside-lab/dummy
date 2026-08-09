// lib/drillDifficulty.js
//
// No artificial level ceiling — a session's level rises forever, driven
// purely by performance. `MAX_LEVEL` is kept (not as a clamp, but as the
// reference span every drill's existing per-level tuning was authored
// against: progress runs 0→1 across levels 1–15, exactly as before).
// Past level 15, progress keeps climbing with diminishing returns —
// continuous, never a hard wall, never a sudden jump — so drills that
// scale canvas params off it (`size = min + progress * range`) keep
// getting harder for a skilled player instead of plateauing.
export const MAX_LEVEL = 15;
const PROGRESS_SPAN = MAX_LEVEL - 1; // 14

// Fraction of personal-best level a returning player resumes at (0.65)
export const RESUME_FACTOR = 0.65;

/** Where a session starts. First-timers get level 1. No upper bound. */
export function getStartLevel(bestLevel) {
  return Math.max(1, Math.round((bestLevel || 1) * RESUME_FACTOR));
}

/**
 * In-session level. MONOTONIC — can only ever rise. No ceiling.
 * `currentLevel` is passed in so a bad patch late in a run can never walk it back.
 */
export function getNextLevel(score, currentLevel, pointsPerLevel = 1000) {
  const earned = Math.floor(score / pointsPerLevel) + 1;
  return Math.max(currentLevel, earned);
}

/**
 * Difficulty curve position. 0 at level 1, exactly 1 at level 15 (so every
 * drill's existing tuning feels identical through the old cap), then keeps
 * rising asymptotically toward 2 forever after — later levels matter less
 * than earlier ones, but the climb never stops and never spikes.
 */
export function getDifficultyProgress(level) {
  const n = Math.max(1, level) - 1;
  if (n <= PROGRESS_SPAN) return n / PROGRESS_SPAN;
  const extra = n - PROGRESS_SPAN;
  return 1 + (1 - Math.exp(-extra / (PROGRESS_SPAN * 2)));
}

/**
 * Bonus levels earned directly off the live combo streak, stacked on top of
 * score-driven leveling. Makes difficulty escalate the instant a player is
 * mid-streak, not only once cumulative score crosses the next threshold.
 * Feed into `Math.max(currentLevel, rawLevel + this)` so it stays monotonic —
 * a combo drop never walks the level back down.
 */
export function getComboBonusLevel(combo, comboPerLevel = 4) {
  return Math.floor(Math.max(0, combo || 0) / comboPerLevel);
}
