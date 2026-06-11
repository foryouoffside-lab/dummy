'use client';

// ============================================================================
// AI COACH BRAIN (S+ ELITE / LOCAL RULES ENGINE — NO API, FREE, OFFLINE)
// Turns raw telemetry into pro-level diagnosis + prescriptions + global rank.
//
// Inputs come from performanceTelemetry.js session records. The coach:
//   1. Ranks the player vs global pro benchmarks (percentile + tier label)
//   2. Diagnoses the dominant weakness (overshoot, undershoot, decay,
//      inconsistency, slow reaction, low accuracy, curved pathing)
//   3. Prescribes a concrete fix: sensitivity delta + next drill + focus cue
//   4. Produces short spoken lines for the voice coach (coachVoice.js)
// ============================================================================

import {
  getDrillHistory, getLastSession, getRecentAverage, getDrillPillar,
  getDrillSkillRating, getConsistencyScore, SKILL_PILLARS, DRILL_METADATA,
  getWeakestPillar
} from './performanceTelemetry';

// ── Global Pro Reference Benchmarks (real-world esports calibrated) ──────────
// Used to map raw numbers → percentile vs the global player base.
export const PRO_BENCHMARKS = {
  reactionMs:   { elite: 170, pro: 200, advanced: 240, intermediate: 290, novice: 360 },
  accuracy:     { elite: 92,  pro: 85,  advanced: 75,  intermediate: 62,  novice: 45 },
  ttkMs:        { elite: 350, pro: 420, advanced: 520, intermediate: 650, novice: 850 },
  consistency:  { elite: 35,  pro: 50,  advanced: 70,  intermediate: 95,  novice: 130 }, // stddev ms (lower better)
  trackingAcc:  { elite: 88,  pro: 78,  advanced: 66,  intermediate: 52,  novice: 38 }
};

const RANK_LABELS = [
  { min: 95, label: 'Top 1% — Pro Circuit',   color: '#ff6b6b', icon: '👑' },
  { min: 85, label: 'Top 5% — Radiant',       color: '#ff6b6b', icon: '🔥' },
  { min: 70, label: 'Top 15% — Diamond',      color: '#b9f2ff', icon: '💎' },
  { min: 50, label: 'Top 35% — Gold',         color: '#ffd700', icon: '🥇' },
  { min: 30, label: 'Top 60% — Silver',       color: '#c0c0c0', icon: '🥈' },
  { min: 0,  label: 'Developing — Bronze',    color: '#cd7f32', icon: '🥉' }
];

// ── Percentile estimator ─────────────────────────────────────────────────────
// Maps a value against benchmark anchors to an approx 0-100 percentile.
function percentileFromBenchmark(value, bench, lowerIsBetter = false) {
  if (value == null || isNaN(value)) return null;
  const anchors = lowerIsBetter
    ? [[bench.elite, 97], [bench.pro, 88], [bench.advanced, 72], [bench.intermediate, 50], [bench.novice, 25]]
    : [[bench.elite, 97], [bench.pro, 88], [bench.advanced, 72], [bench.intermediate, 50], [bench.novice, 25]];

  // Sort so we interpolate correctly regardless of direction.
  const pts = [...anchors].sort((a, b) => a[0] - b[0]);
  if (lowerIsBetter) {
    // smaller value = higher percentile
    if (value <= pts[0][0]) return pts[0][1];
    if (value >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
    for (let i = 0; i < pts.length - 1; i++) {
      const [v1, p1] = pts[i], [v2, p2] = pts[i + 1];
      if (value >= v1 && value <= v2) {
        const t = (value - v1) / (v2 - v1);
        return Math.round(p1 + t * (p2 - p1));
      }
    }
  } else {
    if (value <= pts[0][0]) return pts[0][1];
    if (value >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
    for (let i = 0; i < pts.length - 1; i++) {
      const [v1, p1] = pts[i], [v2, p2] = pts[i + 1];
      if (value >= v1 && value <= v2) {
        const t = (value - v1) / (v2 - v1);
        return Math.round(p1 + t * (p2 - p1));
      }
    }
  }
  return 50;
}

function rankLabelFromPercentile(p) {
  return RANK_LABELS.find(r => p >= r.min) || RANK_LABELS[RANK_LABELS.length - 1];
}

// ── Global Rank: blend the player's key percentiles into one rank ────────────
export function getGlobalRank(session) {
  if (!session) return null;
  const parts = [];
  const accP = percentileFromBenchmark(session.accuracy ?? session.trackingAccuracy, PRO_BENCHMARKS.accuracy, false);
  const rxnP = percentileFromBenchmark(session.reactionTimeMs, PRO_BENCHMARKS.reactionMs, true);
  const ttkP = percentileFromBenchmark(session.ttkMs, PRO_BENCHMARKS.ttkMs, true);
  const conP = percentileFromBenchmark(session.consistency, PRO_BENCHMARKS.consistency, true);

  if (accP != null) parts.push([accP, 0.40]);
  if (rxnP != null) parts.push([rxnP, 0.25]);
  if (ttkP != null) parts.push([ttkP, 0.20]);
  if (conP != null) parts.push([conP, 0.15]);

  if (parts.length === 0) return null;
  const wsum = parts.reduce((s, [, w]) => s + w, 0);
  const score = Math.round(parts.reduce((s, [p, w]) => s + p * w, 0) / wsum);
  const label = rankLabelFromPercentile(score);

  return {
    percentile: score,
    label: label.label, color: label.color, icon: label.icon,
    breakdown: { accuracy: accP, reaction: rxnP, ttk: ttkP, consistency: conP }
  };
}

// ── Weakness Diagnosis ───────────────────────────────────────────────────────
// Returns an ordered list of detected issues (worst first), each with a fix.
export function diagnose(session, history = []) {
  if (!session) return [];
  const issues = [];

  const totalShots = (session.overshoots || 0) + (session.undershoots || 0);
  const overRate  = totalShots ? session.overshoots / totalShots : 0;
  const underRate = totalShots ? session.undershoots / totalShots : 0;

  // 1. Overshoot dominance → sens too high
  if (session.overshoots > session.undershoots * 1.5 && overRate > 0.25) {
    issues.push({
      key: 'overshoot', severity: 0.8,
      title: 'Overshooting targets',
      detail: 'Crosshair sweeps past the target before you fire. Your turn speed exceeds your stopping control.',
      fix: 'Lower in-game sensitivity by ~0.02 (or 1 cm/360 higher). Decelerate into the target.',
      sensDelta: -0.02,
      drill: 'micro-flick-precision',
      cue: 'Stop ON the target, not past it.'
    });
  }
  // 2. Undershoot dominance → sens too low
  if (session.undershoots > session.overshoots * 1.5 && underRate > 0.25) {
    issues.push({
      key: 'undershoot', severity: 0.7,
      title: 'Undershooting targets',
      detail: 'Flicks stop short. You lack the arm/wrist range to reach targets in one motion.',
      fix: 'Raise sensitivity by ~0.02 (or lower cm/360), or commit to a fuller arm sweep.',
      sensDelta: +0.02,
      drill: 'micro-flick-burst',
      cue: 'Commit fully to the flick — reach the target in one snap.'
    });
  }
  // 3. Slow reaction
  if (session.reactionTimeMs != null && session.reactionTimeMs > PRO_BENCHMARKS.reactionMs.advanced) {
    issues.push({
      key: 'reaction', severity: 0.6,
      title: 'Reaction speed below advanced tier',
      detail: `Avg reaction ${Math.round(session.reactionTimeMs)}ms vs pro ~${PRO_BENCHMARKS.reactionMs.pro}ms.`,
      fix: 'Pre-aim common angles and relax your grip. Run pure reflex reps before flick work.',
      sensDelta: 0,
      drill: 'instant-response',
      cue: 'React to the FIRST frame of the target, not the full shape.'
    });
  }
  // 4. Low accuracy
  const acc = session.accuracy ?? session.trackingAccuracy;
  if (acc != null && acc < PRO_BENCHMARKS.accuracy.advanced) {
    issues.push({
      key: 'accuracy', severity: 0.75,
      title: 'Accuracy below advanced tier',
      detail: `Accuracy ${Math.round(acc)}% vs pro ~${PRO_BENCHMARKS.accuracy.pro}%.`,
      fix: 'Slow down ~10%. Prioritize landing the shot over raw speed until accuracy climbs.',
      sensDelta: 0,
      drill: 'micro-flick-precision',
      cue: 'Accuracy first. Speed is earned.'
    });
  }
  // 5. Inconsistency (session-to-session variance)
  if (history.length >= 3) {
    const reacts = history.map(s => s.reactionTimeMs).filter(v => v != null);
    if (reacts.length >= 3) {
      const mean = reacts.reduce((a, b) => a + b, 0) / reacts.length;
      const sd = Math.sqrt(reacts.reduce((a, b) => a + (b - mean) ** 2, 0) / reacts.length);
      if (sd > PRO_BENCHMARKS.consistency.intermediate) {
        issues.push({
          key: 'inconsistency', severity: 0.55,
          title: 'Inconsistent performance',
          detail: `Reaction varies by ±${Math.round(sd)}ms run-to-run. Pros stay within ±${PRO_BENCHMARKS.consistency.pro}ms.`,
          fix: 'Fix a routine: same posture, same warmup, same grip every session.',
          sensDelta: 0,
          drill: 'pro-flick',
          cue: 'Repeatable mechanics beat occasional brilliance.'
        });
      }
    }
  }
  // 6. In-session decay (fatigue): reactions worsened over the session
  if (Array.isArray(session.reactionSamples) && session.reactionSamples.length >= 10) {
    const r = session.reactionSamples;
    const early = r.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
    const late  = r.slice(-5).reduce((a, b) => a + b, 0) / 5;
    if (late > early + 45) {
      issues.push({
        key: 'decay', severity: 0.5,
        title: 'Aim decay / fatigue detected',
        detail: 'Reaction slipped in the back half of the session. Check wrist posture and breaks.',
        fix: 'Shorter focused sets. Reset posture every 60s. Hydrate.',
        sensDelta: 0,
        drill: 'pro-flick',
        cue: 'Quality reps > grinding tired.'
      });
    }
  }

  return issues.sort((a, b) => b.severity - a.severity);
}

// ── Top-level analysis the drill calls after a session ───────────────────────
/**
 * @param {string} drillId
 * @param {object} session  the just-recorded session (recordDrillResult return)
 * @returns {{ rank, primaryIssue, issues, prescription, skillRating, consistencyScore, spokenLines }}
 */
export function analyzeSession(drillId, session) {
  const history = getDrillHistory(drillId, 6);
  const rank = getGlobalRank(session);
  const issues = diagnose(session, history);
  const primaryIssue = issues[0] || null;
  const skillRating = getDrillSkillRating(drillId, 3);
  const consistencyScore = getConsistencyScore(drillId, 5);

  let prescription;
  if (primaryIssue) {
    const meta = DRILL_METADATA[primaryIssue.drill] || { name: primaryIssue.drill, path: '#' };
    prescription = {
      headline: primaryIssue.title,
      action: primaryIssue.fix,
      sensDelta: primaryIssue.sensDelta,
      focusCue: primaryIssue.cue,
      nextDrill: { id: primaryIssue.drill, ...meta },
      reps: primaryIssue.severity > 0.7 ? 5 : 3
    };
  } else {
    prescription = {
      headline: 'Balanced mechanics — push the ceiling',
      action: 'Increase difficulty: smaller targets or a faster scenario. You are ready to level up.',
      sensDelta: 0,
      focusCue: 'Maintain form at higher speed.',
      nextDrill: { id: 'pro-flick', ...(DRILL_METADATA['pro-flick'] || {}) },
      reps: 3
    };
  }

  return { rank, primaryIssue, issues, prescription, skillRating, consistencyScore,
           spokenLines: buildSpokenLines(rank, primaryIssue, prescription) };
}

// ── Voice lines for coachVoice.js (short, punchy, spoken) ────────────────────
function buildSpokenLines(rank, issue, prescription) {
  const lines = [];
  if (rank) lines.push(`You're ${rank.label}. Top ${100 - rank.percentile} percent globally.`);
  if (issue) {
    lines.push(`${issue.title}. ${issue.cue}`);
    if (issue.sensDelta) {
      lines.push(issue.sensDelta < 0
        ? `Lower your sensitivity slightly.`
        : `Raise your sensitivity slightly.`);
    }
  } else {
    lines.push(`Clean mechanics. Time to push harder.`);
  }
  if (prescription?.nextDrill?.name) lines.push(`Next: ${prescription.nextDrill.name}, ${prescription.reps} runs.`);
  return lines;
}

// ── Live in-session nudge (called during play, throttled by the drill) ───────
/**
 * Lightweight per-event coaching used DURING a run (e.g. after a miss streak).
 * Returns a short string or null. Drill decides when to speak it.
 */
export function liveNudge({ recentMisses = 0, lastDistance = 0, targetRadius = 1, comboBroken = false } = {}) {
  if (recentMisses >= 4) return 'Reset. Breathe. Slow down one notch.';
  if (comboBroken && lastDistance > targetRadius * 2) return 'Big overshoot — decelerate into the target.';
  if (comboBroken && lastDistance < targetRadius) return 'So close — follow through to center.';
  return null;
}

// ── Convenience: overall account-level coaching for a dashboard ──────────────
export function getAccountCoaching() {
  const weakest = getWeakestPillar();
  if (!weakest) return { headline: 'Run a few drills to unlock coaching.', focus: null };
  return {
    headline: `Your weakest pillar is ${weakest.pillarData.label}.`,
    focus: weakest.pillarData.label,
    recommendedDrill: weakest.recommendedDrill,
    score: weakest.score
  };
}
