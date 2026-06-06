'use client';

// ============================================================================
// ADAPTIVE DIFFICULTY ENGINE
// Reads telemetry history and auto-adjusts drill parameters per tier.
// Tier system: Bronze → Silver → Gold → Diamond → Radiant
// Promotion/demotion requires 3 consecutive sessions above/below thresholds.
// ============================================================================

import { getDrillHistory } from './performanceTelemetry';

const TIER_KEY_PREFIX = 'skilldrills_tier_';

// ── Tier Definitions (Esports-Calibrated) ───────────────────────────────────

export const TIERS = {
  bronze: {
    label: 'Bronze',
    order: 0,
    icon: '🥉',
    color: '#cd7f32',
    bgColor: 'bg-amber-900/30',
    borderColor: 'border-amber-700/40',
    textColor: 'text-amber-500',
    accuracy:       { min: 0,  max: 40 },
    reactionMs:     { min: 500, max: Infinity },
    targetSizeMult: 1.3,    // 30% larger targets
    speedMult:      0.7,    // 30% slower
    spawnDelayMult: 1.3,    // 30% more time to react
    sensAdjust:     0       // no sensitivity change
  },
  silver: {
    label: 'Silver',
    order: 1,
    icon: '🥈',
    color: '#c0c0c0',
    bgColor: 'bg-slate-700/30',
    borderColor: 'border-slate-500/40',
    textColor: 'text-slate-300',
    accuracy:       { min: 40, max: 60 },
    reactionMs:     { min: 350, max: 500 },
    targetSizeMult: 1.0,    // default
    speedMult:      1.0,    // default
    spawnDelayMult: 1.0,    // default
    sensAdjust:     0
  },
  gold: {
    label: 'Gold',
    order: 2,
    icon: '🥇',
    color: '#ffd700',
    bgColor: 'bg-yellow-900/30',
    borderColor: 'border-yellow-500/40',
    textColor: 'text-yellow-400',
    accuracy:       { min: 60, max: 75 },
    reactionMs:     { min: 250, max: 350 },
    targetSizeMult: 0.85,   // 15% smaller
    speedMult:      1.15,   // 15% faster
    spawnDelayMult: 0.85,   // 15% less time
    sensAdjust:     0
  },
  diamond: {
    label: 'Diamond',
    order: 3,
    icon: '💎',
    color: '#b9f2ff',
    bgColor: 'bg-cyan-900/30',
    borderColor: 'border-cyan-400/40',
    textColor: 'text-cyan-300',
    accuracy:       { min: 75, max: 88 },
    reactionMs:     { min: 180, max: 250 },
    targetSizeMult: 0.7,    // 30% smaller
    speedMult:      1.3,    // 30% faster
    spawnDelayMult: 0.7,    // 30% less time
    sensAdjust:     0
  },
  radiant: {
    label: 'Radiant',
    order: 4,
    icon: '👑',
    color: '#ff6b6b',
    bgColor: 'bg-red-900/30',
    borderColor: 'border-red-500/40',
    textColor: 'text-red-400',
    accuracy:       { min: 88, max: 100 },
    reactionMs:     { min: 0,   max: 180 },
    targetSizeMult: 0.55,   // 45% smaller (pro-level tiny targets)
    speedMult:      1.5,    // 50% faster
    spawnDelayMult: 0.6,    // 40% less time
    sensAdjust:     0
  }
};

const TIER_ORDER = ['bronze', 'silver', 'gold', 'diamond', 'radiant'];
const PROMOTION_THRESHOLD = 3;  // consecutive sessions needed

// ── Storage Helpers ─────────────────────────────────────────────────────────

function loadTier(drillId) {
  if (typeof window === 'undefined') return 'silver';
  try {
    return localStorage.getItem(TIER_KEY_PREFIX + drillId) || 'silver';
  } catch (e) {
    return 'silver';
  }
}

function saveTier(drillId, tier) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TIER_KEY_PREFIX + drillId, tier);
  } catch (e) {}
}

// ── Core API ────────────────────────────────────────────────────────────────

/**
 * Compute the appropriate tier for a drill based on telemetry history.
 * Does NOT save — use getAdaptiveParams() which handles save + promotion.
 * 
 * @param {string} drillId
 * @returns {string} Tier key (e.g. 'gold')
 */
export function computeTier(drillId) {
  const history = getDrillHistory(drillId);
  if (history.length < 2) return loadTier(drillId); // not enough data

  const currentTier = loadTier(drillId);
  const currentOrder = TIERS[currentTier]?.order ?? 1;

  // Check promotion
  if (shouldPromote(drillId, currentTier)) {
    const nextOrder = Math.min(currentOrder + 1, TIER_ORDER.length - 1);
    return TIER_ORDER[nextOrder];
  }

  // Check demotion
  if (shouldDemote(drillId, currentTier)) {
    const prevOrder = Math.max(currentOrder - 1, 0);
    return TIER_ORDER[prevOrder];
  }

  return currentTier;
}

/**
 * Check if the player should be promoted from current tier.
 * Requires PROMOTION_THRESHOLD consecutive sessions above the tier's max accuracy.
 * 
 * @param {string} drillId
 * @param {string} currentTier
 * @returns {boolean}
 */
export function shouldPromote(drillId, currentTier) {
  const tier = TIERS[currentTier];
  if (!tier || tier.order >= TIER_ORDER.length - 1) return false; // already at max

  const history = getDrillHistory(drillId, PROMOTION_THRESHOLD);
  if (history.length < PROMOTION_THRESHOLD) return false;

  // All recent sessions must exceed the tier's accuracy ceiling
  const allAbove = history.every(session => {
    const acc = session.accuracy ?? session.trackingAccuracy ?? 0;
    return acc >= tier.accuracy.max;
  });

  return allAbove;
}

/**
 * Check if the player should be demoted from current tier.
 * Requires PROMOTION_THRESHOLD consecutive sessions below the tier's min accuracy.
 * 
 * @param {string} drillId
 * @param {string} currentTier
 * @returns {boolean}
 */
export function shouldDemote(drillId, currentTier) {
  const tier = TIERS[currentTier];
  if (!tier || tier.order <= 0) return false; // already at min

  const history = getDrillHistory(drillId, PROMOTION_THRESHOLD);
  if (history.length < PROMOTION_THRESHOLD) return false;

  // All recent sessions must be below the tier's accuracy floor
  const allBelow = history.every(session => {
    const acc = session.accuracy ?? session.trackingAccuracy ?? 0;
    return acc < tier.accuracy.min;
  });

  return allBelow;
}

/**
 * Get adaptive parameters for a drill. This is the main entry point called
 * by drills in their startGame() function.
 * 
 * Computes the current tier, handles promotion/demotion, saves, and returns
 * multipliers for target size, speed, and spawn delay.
 * 
 * @param {string} drillId
 * @returns {{ 
 *   tier: string, tierData: object,
 *   targetSizeMultiplier: number, speedMultiplier: number,
 *   spawnDelayMultiplier: number, sensAdjust: number,
 *   promoted: boolean, demoted: boolean, previousTier: string|null
 * }}
 */
export function getAdaptiveParams(drillId) {
  const previousTier = loadTier(drillId);
  const newTier = computeTier(drillId);
  const tierData = TIERS[newTier] || TIERS.silver;

  let promoted = false;
  let demoted = false;

  if (newTier !== previousTier) {
    const prevOrder = TIERS[previousTier]?.order ?? 1;
    const newOrder = tierData.order;

    if (newOrder > prevOrder) promoted = true;
    if (newOrder < prevOrder) demoted = true;

    saveTier(drillId, newTier);
  }

  return {
    tier: newTier,
    tierData,
    targetSizeMultiplier: tierData.targetSizeMult,
    speedMultiplier: tierData.speedMult,
    spawnDelayMultiplier: tierData.spawnDelayMult,
    sensAdjust: tierData.sensAdjust,
    promoted,
    demoted,
    previousTier: (promoted || demoted) ? previousTier : null
  };
}

/**
 * Get display information for a tier (for UI rendering).
 * 
 * @param {string} tier
 * @returns {{ label: string, icon: string, color: string, bgColor: string, borderColor: string, textColor: string }}
 */
export function getTierDisplay(tier) {
  const t = TIERS[tier] || TIERS.silver;
  return {
    label: t.label,
    icon: t.icon,
    color: t.color,
    bgColor: t.bgColor,
    borderColor: t.borderColor,
    textColor: t.textColor
  };
}

/**
 * Get the current tier for a drill without computing promotion/demotion.
 * For display purposes only.
 * 
 * @param {string} drillId
 * @returns {string}
 */
export function getCurrentTier(drillId) {
  return loadTier(drillId);
}

/**
 * Get all drill tiers for display on the FPS Hub.
 * Uses a static drill list (client-safe, no require()).
 * @returns {Object} { drillId: { tier, display } }
 */
export function getAllDrillTiers() {
  const knownDrills = [
    'pro-flick', 'micro-flick-burst', 'micro-flick-precision', 'headshot-reflex',
    'pro-tracking', 'strafe-tracking', 'reactive-sphere', 'pro-smooth-pursuit',
    'evasive-slide-track', 'vertical-air-pursuit', 'vertical-air-track',
    'recoil-control', 'pubg-dmr-rhythm', 'counter-strafe', 'deadzone-jiggle-snap',
    'target-switching-swarm', 'target-prioritization', 'target-acquisition',
    'angle-hold', 'prefire-corner', '180-awareness', 'sound-spatial',
    'instant-response', 'kinetic-trainer', 'pubg-drive-by', 'pubg-lead-drop',
    'parabolic-air-track', 'pixel-hold-swing'
  ];

  const result = {};
  knownDrills.forEach(drillId => {
    const tier = loadTier(drillId);
    result[drillId] = {
      tier,
      display: getTierDisplay(tier)
    };
  });

  return result;
}

// Alias for backward compatibility
export const getAllDrillTiersClient = getAllDrillTiers;

