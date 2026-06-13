'use client';

// ============================================================================
// PERFORMANCE TELEMETRY ENGINE
// Centralized session-level metrics recorder for all drills.
// Persists rolling history (max 20 sessions per drill) to localStorage.
// Provides cross-drill weakness profiling and progression trend analysis.
// ============================================================================

const TELEMETRY_KEY = 'skilldrills_telemetry';
const MAX_SESSIONS_PER_DRILL = 20;

// ── Drill-to-Pillar Mapping ─────────────────────────────────────────────────
// Each drill belongs to exactly one skill pillar. The pillar score is computed
// as a weighted average of its contributing drills' most recent session metrics.

export const SKILL_PILLARS = {
  flickPrecision: {
    label: 'Flick Precision',
    icon: '🎯',
    color: '#ef4444',
    drills: ['pro-flick', 'micro-flick-burst', 'micro-flick-precision', 'headshot-reflex'],
    primaryMetric: 'accuracy',     // 0-100
    secondaryMetric: 'reactionTimeMs', // lower is better
    maxBenchmark: 100,             // accuracy %
    proThreshold: 82,              // pro-level accuracy %
    reactionBenchmark: 220         // pro-level avg reaction ms
  },
  tracking: {
    label: 'Tracking',
    icon: '🔄',
    color: '#3b82f6',
    drills: ['pro-tracking', 'strafe-tracking', 'reactive-sphere', 'pro-smooth-pursuit', 'evasive-slide-track', 'vertical-air-pursuit', 'vertical-air-track'],
    primaryMetric: 'trackingAccuracy',
    secondaryMetric: 'score',
    maxBenchmark: 100,
    proThreshold: 75
  },
  recoilControl: {
    label: 'Recoil Control',
    icon: '💥',
    color: '#f59e0b',
    drills: ['recoil-control', 'pubg-dmr-rhythm'],
    primaryMetric: 'score',
    secondaryMetric: 'accuracy',
    maxBenchmark: 30,              // kills benchmark
    proThreshold: 22
  },
  movementSync: {
    label: 'Movement Sync',
    icon: '⚡',
    color: '#10b981',
    drills: ['counter-strafe', 'deadzone-jiggle-snap'],
    primaryMetric: 'accuracy',
    secondaryMetric: 'score',
    maxBenchmark: 100,
    proThreshold: 78
  },
  targetSwitching: {
    label: 'Target Switching',
    icon: '🔀',
    color: '#8b5cf6',
    drills: ['target-switching-swarm', 'target-prioritization'],
    primaryMetric: 'accuracy',
    secondaryMetric: 'score',
    maxBenchmark: 100,
    proThreshold: 75
  },
  gameSense: {
    label: 'Game Sense',
    icon: '🧠',
    color: '#06b6d4',
    drills: ['angle-hold', 'prefire-corner', '180-awareness', 'sound-spatial', 'instant-response'],
    primaryMetric: 'accuracy',
    secondaryMetric: 'reactionTimeMs',
    maxBenchmark: 100,
    proThreshold: 70,
    reactionBenchmark: 280
  }
};

// Reverse lookup: drillId → pillar key
const DRILL_TO_PILLAR = {};
Object.entries(SKILL_PILLARS).forEach(([pillarKey, pillar]) => {
  pillar.drills.forEach(drillId => {
    DRILL_TO_PILLAR[drillId] = pillarKey;
  });
});

// Drill metadata for recommendations
export const DRILL_METADATA = {
  'pro-flick':              { name: 'Flick Shot Training',         path: '/drills/fps/flick-shot-training' },
  'micro-flick-burst':      { name: 'Micro-Flick Burst',          path: '/drills/fps/micro-flick-burst' },
  'micro-flick-precision':  { name: 'Micro-Flick Precision',      path: '/drills/fps/micro-flick-precision' },
  'headshot-reflex':        { name: 'Headshot Micro-Adjust',       path: '/drills/fps/headshot-micro-adjust' },
  'pro-tracking':           { name: 'Pro Tracking',                path: '/drills/fps/pro-tracking' },
  'strafe-tracking':        { name: 'Strafe Tracking',             path: '/drills/fps/strafe-tracking' },
  'reactive-sphere':        { name: 'Reactive Sphere Tracking',    path: '/drills/fps/reactive-sphere-tracking' },
  'pro-smooth-pursuit':     { name: 'Pro Smooth Pursuit',          path: '/drills/fps/pro-smooth-pursuit' },
  'evasive-slide-track':    { name: 'Evasive Slide Track',         path: '/drills/fps/evasive-slide-track' },
  'vertical-air-pursuit':   { name: 'Vertical Air Pursuit',        path: '/drills/fps/vertical-air-pursuit' },
  'vertical-air-track':     { name: 'Vertical Air-Track',          path: '/drills/fps/vertical-air-track' },
  'recoil-control':         { name: 'Recoil Control Lab',          path: '/drills/fps/recoil-control' },
  'pubg-dmr-rhythm':        { name: 'PUBG DMR Rhythm & Recoil',   path: '/drills/fps/pubg-dmr-rhythm' },
  'counter-strafe':         { name: 'Counter-Strafe Trainer',      path: '/drills/fps/counter-strafe-trainer' },
  'deadzone-jiggle-snap':   { name: 'Deadzone Jiggle-Snap',       path: '/drills/fps/deadzone-jiggle-snap' },
  'target-switching-swarm': { name: 'Target Switching Swarm',      path: '/drills/fps/target-switching-swarm' },
  'target-prioritization':  { name: 'Target Prioritization',       path: '/drills/fps/target-prioritization' },
  'target-acquisition':     { name: 'Target Acquisition',          path: '/drills/fps/target-acquisition' },
  'angle-hold':             { name: 'Angle Hold & Peek',           path: '/drills/fps/angle-hold-trainer' },
  'prefire-corner':         { name: 'Prefire Corner Clearer',      path: '/drills/fps/prefire-corner-clearer' },
  '180-awareness':          { name: '180° Peripheral Scan',        path: '/drills/fps/180-degree-awareness' },
  'sound-spatial':          { name: '3D Audio-Spatial Reflex',     path: '/drills/fps/sound-spatial-reflex' },
  'instant-response':       { name: 'Instant Reflex Test',         path: '/drills/fps/instant-response' },
  'kinetic-trainer':        { name: 'High-Speed Kinetic',          path: '/drills/fps/high-speed-kinetic-trainer' },
  'pubg-drive-by':          { name: 'PUBG Drive-By Tracking',     path: '/drills/fps/pubg-drive-by' },
  'pubg-lead-drop':         { name: 'PUBG Lead & Drop',           path: '/drills/fps/pubg-lead-drop' },
  'parabolic-air-track':    { name: 'Parabolic Air-Track',        path: '/drills/fps/parabolic-air-track' },
  'pixel-hold-swing':       { name: 'Pixel Hold & Swing',         path: '/drills/fps/pixel-hold-swing' }
};

export function getDrillPillar(drillId) {
  return DRILL_TO_PILLAR[drillId] || null;
}

// ── Storage Helpers ─────────────────────────────────────────────────────────

function loadTelemetry() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(TELEMETRY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
  } catch (e) {
    console.warn('[Telemetry] Failed to load:', e);
    return {};
  }
}

function saveTelemetry(data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TELEMETRY_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('[Telemetry] Failed to save:', e);
  }
}

// ── Core API ────────────────────────────────────────────────────────────────

/**
 * Record a drill session result. Called from each drill's endGame().
 * 
 * @param {string} drillId - Unique drill identifier (e.g. 'pro-flick')
 * @param {object} metrics - Session metrics:
 *   score, accuracy (0-100), reactionTimeMs, trackingAccuracy (0-100),
 *   comboMax, overshoots, undershoots, sensitivity, dpi, gameType,
 *   tier, duration
 */
export function recordDrillResult(drillId, metrics = {}) {
  if (typeof window === 'undefined') return;

  const record = {
    drillId,
    timestamp: Date.now(),
    score:            metrics.score ?? 0,
    accuracy:         metrics.accuracy ?? null,
    reactionTimeMs:   metrics.reactionTimeMs ?? null,
    trackingAccuracy: metrics.trackingAccuracy ?? null,
    comboMax:         metrics.comboMax ?? 0,
    overshoots:       metrics.overshoots ?? 0,
    undershoots:      metrics.undershoots ?? 0,
    sensitivity:      metrics.sensitivity ?? null,
    dpi:              metrics.dpi ?? null,
    gameType:         metrics.gameType ?? null,
    tier:             metrics.tier ?? 'silver',
    duration:         metrics.duration ?? 60
  };

  const data = loadTelemetry();
  if (!Array.isArray(data[drillId])) data[drillId] = [];
  data[drillId].push(record);

  // Keep only the most recent MAX_SESSIONS_PER_DRILL sessions
  if (data[drillId].length > MAX_SESSIONS_PER_DRILL) {
    data[drillId] = data[drillId].slice(-MAX_SESSIONS_PER_DRILL);
  }

  saveTelemetry(data);
  return record;
}

/**
 * Get session history for a specific drill.
 * @param {string} drillId
 * @param {number} [count] - Number of most recent sessions (default: all)
 * @returns {Array} Session records, newest last
 */
export function getDrillHistory(drillId, count) {
  const data = loadTelemetry();
  const history = Array.isArray(data[drillId]) ? data[drillId] : [];
  if (count && count > 0) {
    return history.slice(-count);
  }
  return history;
}

/**
 * Get all drill histories.
 * @returns {Object} { drillId: [records] }
 */
export function getAllDrillHistories() {
  const data = loadTelemetry();
  return (data && typeof data === 'object' && !Array.isArray(data)) ? data : {};
}

/**
 * Compute a normalized 0-100 score for each skill pillar based on
 * the most recent session data from contributing drills.
 * 
 * @returns {Object} { pillarKey: { score: 0-100, label, icon, color, drillCount, sessionCount } }
 */
export function getWeaknessProfile() {
  const data = loadTelemetry();
  const profile = {};

  Object.entries(SKILL_PILLARS).forEach(([key, pillar]) => {
    let totalScore = 0;
    let drillsWithData = 0;
    let totalSessions = 0;

    pillar.drills.forEach(drillId => {
      const sessions = Array.isArray(data[drillId]) ? data[drillId] : [];
      if (sessions.length === 0) return;

      // Use average of last 3 sessions for stability
      const recent = sessions.slice(-3);
      totalSessions += recent.length;
      drillsWithData++;

      // Get primary metric average
      const metricKey = pillar.primaryMetric;
      const values = recent
        .map(s => s[metricKey])
        .filter(v => v !== null && v !== undefined && !isNaN(v));

      if (values.length > 0) {
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        // Normalize to 0-100
        const normalized = Math.min(100, (avg / pillar.maxBenchmark) * 100);
        totalScore += normalized;
      }
    });

    profile[key] = {
      score: drillsWithData > 0 ? Math.round(totalScore / drillsWithData) : 0,
      label: pillar.label,
      icon: pillar.icon,
      color: pillar.color,
      drillCount: drillsWithData,
      sessionCount: totalSessions,
      proThreshold: pillar.proThreshold
    };
  });

  return profile;
}

/**
 * Find the single weakest skill pillar and return a recommendation.
 * 
 * @returns {{ pillar: string, pillarData: object, recommendedDrill: object, score: number } | null}
 */
export function getWeakestPillar() {
  const profile = getWeaknessProfile();
  const data = loadTelemetry();

  let weakest = null;
  let lowestScore = Infinity;

  Object.entries(profile).forEach(([key, p]) => {
    // Pillars with 0 sessions are treated as needing attention (score = 0)
    if (p.score < lowestScore) {
      lowestScore = p.score;
      weakest = key;
    }
  });

  if (!weakest) return null;

  const pillarData = profile[weakest];
  const pillarDef = SKILL_PILLARS[weakest];

  // Find the weakest drill within the pillar
  let weakestDrill = null;
  let weakestDrillScore = Infinity;

  pillarDef.drills.forEach(drillId => {
    const sessions = Array.isArray(data[drillId]) ? data[drillId] : [];
    if (sessions.length === 0) {
      // Unplayed drills are highest priority
      if (weakestDrillScore > 0 || !weakestDrill) {
        weakestDrill = drillId;
        weakestDrillScore = -1;
      }
      return;
    }
    const recent = sessions.slice(-3);
    const metricKey = pillarDef.primaryMetric;
    const values = recent
      .map(s => s[metricKey])
      .filter(v => v !== null && v !== undefined);
    
    if (values.length > 0) {
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      if (avg < weakestDrillScore) {
        weakestDrillScore = avg;
        weakestDrill = drillId;
      }
    }
  });

  const drillMeta = DRILL_METADATA[weakestDrill] || { name: weakestDrill, path: '#' };

  return {
    pillar: weakest,
    pillarData,
    recommendedDrill: {
      id: weakestDrill,
      ...drillMeta
    },
    score: lowestScore
  };
}

/**
 * Analyze progression trend for a specific drill.
 * Compares the first half of history vs the second half.
 * 
 * @param {string} drillId
 * @returns {'improving' | 'plateaued' | 'declining' | 'insufficient'}
 */
export function getProgressionTrend(drillId) {
  const sessions = getDrillHistory(drillId);
  if (sessions.length < 4) return 'insufficient';

  const mid = Math.floor(sessions.length / 2);
  const firstHalf = sessions.slice(0, mid);
  const secondHalf = sessions.slice(mid);

  // Use score as primary comparison metric
  const avgFirst = firstHalf.reduce((sum, s) => sum + (s.score || 0), 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((sum, s) => sum + (s.score || 0), 0) / secondHalf.length;

  const change = ((avgSecond - avgFirst) / Math.max(1, avgFirst)) * 100;

  if (change > 8) return 'improving';
  if (change < -8) return 'declining';
  return 'plateaued';
}

/**
 * Get progression trend display info.
 * @param {'improving' | 'plateaued' | 'declining' | 'insufficient'} trend
 * @returns {{ arrow: string, color: string, label: string }}
 */
export function getTrendDisplay(trend) {
  const map = {
    improving:    { arrow: '↑', color: '#10b981', label: 'Improving' },
    plateaued:    { arrow: '→', color: '#f59e0b', label: 'Plateaued' },
    declining:    { arrow: '↓', color: '#ef4444', label: 'Declining' },
    insufficient: { arrow: '·', color: '#64748b', label: 'Need Data' }
  };
  return map[trend] || map.insufficient;
}

/**
 * Clear history for one drill or all drills.
 * @param {string} [drillId] - If omitted, clears all history
 */
export function clearHistory(drillId) {
  if (drillId) {
    const data = loadTelemetry();
    delete data[drillId];
    saveTelemetry(data);
  } else {
    saveTelemetry({});
  }
}

/**
 * Get a summary of the last session for a drill (for coach analysis).
 * @param {string} drillId
 * @returns {object|null}
 */
export function getLastSession(drillId) {
  const sessions = getDrillHistory(drillId);
  return sessions.length > 0 ? sessions[sessions.length - 1] : null;
}

/**
 * Get average metrics across the last N sessions for a drill.
 * @param {string} drillId
 * @param {number} [count=3]
 * @returns {object}
 */
export function getRecentAverage(drillId, count = 3) {
  const sessions = getDrillHistory(drillId, count);
  if (sessions.length === 0) {
    return { score: 0, accuracy: 0, reactionTimeMs: 0, trackingAccuracy: 0, sessions: 0 };
  }

  const sum = sessions.reduce((acc, s) => ({
    score: acc.score + (s.score || 0),
    accuracy: acc.accuracy + (s.accuracy || 0),
    reactionTimeMs: acc.reactionTimeMs + (s.reactionTimeMs || 0),
    trackingAccuracy: acc.trackingAccuracy + (s.trackingAccuracy || 0)
  }), { score: 0, accuracy: 0, reactionTimeMs: 0, trackingAccuracy: 0 });

  return {
    score: Math.round(sum.score / sessions.length),
    accuracy: Math.round(sum.accuracy / sessions.length),
    reactionTimeMs: Math.round(sum.reactionTimeMs / sessions.length),
    trackingAccuracy: Math.round(sum.trackingAccuracy / sessions.length),
    sessions: sessions.length
  };
}
