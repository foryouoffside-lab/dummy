// lib/drillDifficulty.js
//
// Difficulty is UNBOUNDED. There is no level ceiling and no terminal
// difficulty: `getDifficultyProgress` rises linearly forever, and drills scale
// their parameters off it with an exponential decay toward floors they never
// reach. A run therefore always ends eventually — the drill outruns the player,
// rather than plateauing and letting a strong player continue indefinitely.
//
// `MAX_LEVEL` is NOT a clamp. It is the reference span every drill's per-level
// tuning was authored against: progress runs 0 -> 1 across levels 1..15 exactly
// as before, so the opening of every drill feels unchanged. Past level 15 the
// curve simply keeps going at the same slope instead of flattening out.
export const MAX_LEVEL = 15;
const PROGRESS_SPAN = MAX_LEVEL - 1; // 14

/**
 * Where a session starts. ALWAYS level 1.
 *
 * Difficulty is deliberately not persisted: every visit begins at the bottom of
 * the curve and the player climbs it again under their own performance. This
 * keeps a session's difficulty a function of how you are playing right now, not
 * of a personal best set on some other day.
 */
export function getStartLevel() {
  return 1;
}

/**
 * In-session level, CONTINUOUS and monotonic.
 *
 * Returns a fractional level so difficulty rises smoothly with every point
 * scored. Rounding to an integer here is what used to make the ramp arrive in
 * visible steps — drills should keep the fractional value for their maths and
 * floor it only for display.
 *
 * `currentLevel` is passed in so a bad patch late in a run can never walk it back.
 */
export function getNextLevel(score, currentLevel, pointsPerLevel = 1000) {
  const earned = (Math.max(0, score) / pointsPerLevel) + 1;
  return Math.max(currentLevel, earned);
}

/**
 * Difficulty curve position. 0 at level 1, exactly 1 at level 15 (so every
 * drill's existing tuning is untouched through the old span), then keeps
 * climbing at the same rate forever — no asymptote, no ceiling, no kink in the
 * slope at the hand-off point.
 *
 * Accepts fractional levels.
 */
export function getDifficultyProgress(level) {
  return Math.max(0, (Math.max(1, level) - 1) / PROGRESS_SPAN);
}

/**
 * Exponential ramp from `start` toward `floor`, driven by curve position `p`.
 *
 * The value approaches `floor` but never reaches it, so a parameter tuned this
 * way keeps tightening for as long as the player survives. Set `floor` BELOW
 * the limit of human capability on whichever parameter decides the run (e.g. a
 * target's time-to-live against reaction time) and the drill is guaranteed to
 * end no matter how skilled the player is.
 *
 * DECAY is chosen so that at p = 1 the value has covered ~76% of the distance
 * from `start` to `floor`, which reproduces the old `Math.max(floor, start - p *
 * range)` tuning at level 15 almost exactly.
 */
export const DECAY = 1.43;

/**
 * Warm-up easing applied to `p` before the exponential.
 *
 * A raw `exp(-DECAY * p)` is FRONT-LOADED: its slope is steepest at p = 0, so
 * the very first level transition is the harshest one in the whole curve.
 * Level 1 -> 2 used to consume 9.7% of the start->floor range while level
 * 14 -> 15 consumed only 2.6% — a 3.8x spread, felt in play as a difficulty
 * wall the moment the player left level 1 and near-nothing thereafter.
 *
 * `EASE_A` shapes a quadratic warm-up that starts slow and accelerates:
 *
 *     ease(p) = p * (p + a) / (1 + a)          for p <= 1
 *
 * Two properties make this safe to drop under every existing drill:
 *
 *  - `ease(1) === 1` exactly, so `ramp()` at level 15 returns precisely what it
 *    returned before. Every drill's authored FLOOR/START pair still lands on its
 *    tuned level-15 value and no drill needs retuning.
 *  - `ease` is monotonic and C-1 continuous, so difficulty still only ever rises
 *    and the hand-off at p = 1 has no kink.
 *
 * Past p = 1 it continues as a straight line at the slope it reached there
 * (`EASE_SLOPE_AT_1`), which keeps the curve unbounded — a run must still end.
 *
 * Net effect on per-level steps across levels 1..15:
 *
 *     L1->2    9.71%  ->  4.20%
 *     L7->8    5.26%  ->  6.27%   (the new worst case)
 *     L14->15  2.57%  ->  4.19%
 *
 * i.e. the spread drops from 3.8x to 1.5x and the worst single step drops from
 * 9.7% to 6.3%.
 */
const EASE_A = 0.6;
const EASE_SLOPE_AT_1 = (1 + 2 * EASE_A) / (1 + EASE_A);

export function easeProgress(p) {
  const x = Math.max(0, p);
  if (x <= 1) return (x * (x + EASE_A)) / (1 + EASE_A);
  return 1 + EASE_SLOPE_AT_1 * (x - 1);
}

export function ramp(start, floor, p) {
  return floor + (start - floor) * Math.exp(-DECAY * easeProgress(p));
}

/**
 * LEGACY — kept at its original behaviour for the drills not yet converted.
 *
 * Grants whole bonus levels straight off the live combo streak, so difficulty
 * jumps a full level every 4th consecutive hit. That step is precisely the
 * "sudden spike" the continuous curve above is meant to remove, so a converted
 * drill should stop calling this and derive its level from score alone — combo
 * still matters there through the score multiplier and the drill's live "heat",
 * both of which are continuous.
 *
 * Do not neutralise this in place: ~31 drills still depend on it for their
 * pacing and would all get quietly easier at once.
 */
export function getComboBonusLevel(combo, comboPerLevel = 4) {
  return Math.floor(Math.max(0, combo || 0) / comboPerLevel);
}
