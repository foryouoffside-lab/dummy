'use client';

// ============================================================================
// TRAINING PLAN ENGINE (S+ ELITE / PERIODIZED ROUTINES)
// Builds a personalized daily routine from the player's telemetry:
//   warmup → main (weakest-pillar focus) → cooldown
// Tracks daily streaks, rotates focus across the week, and exposes progress
// so the UI can show "Day 4 of your plan, 🔥 6-day streak".
//
// No API. Pure local logic over performanceTelemetry + adaptiveDifficulty.
// ============================================================================

import {
  SKILL_PILLARS, DRILL_METADATA, getWeaknessProfile, getWeakestPillar,
  getDrillSkillRating
} from './performanceTelemetry';
import { getCurrentTier, getTierDisplay } from './adaptiveDifficulty';

const STREAK_KEY      = 'skilldrills_streak';
const LASTDAY_KEY     = 'skilldrills_lastday';
const PLANSTATE_KEY   = 'skilldrills_planstate';

// ── Routine structure per session ────────────────────────────────────────────
// A balanced pro session: short warmup, focused main block, light cooldown.
const ROUTINE_TEMPLATE = {
  warmup:   { count: 1, label: 'Warmup',   note: 'Loosen up. No score pressure.' },
  main:     { count: 3, label: 'Main Block', note: 'Your weakness focus. Full effort.' },
  cooldown: { count: 1, label: 'Cooldown',  note: 'Confidence rep on a strength.' }
};

// Weekly focus rotation so the player trains the full skill spectrum, not just
// today's weakest pillar (prevents tunnel-training and overuse).
const WEEKLY_FOCUS = [
  'flickPrecision', // Mon
  'tracking',       // Tue
  'targetSwitching',// Wed
  'flickPrecision', // Thu
  'tracking',       // Fri
  'gameSense',      // Sat
  'recoilControl'   // Sun
];

// Good general warmup + cooldown drills (broad, low-pressure)
const WARMUP_DRILLS   = ['pro-flick', 'pro-tracking', 'instant-response'];
const COOLDOWN_DRILLS = ['pro-flick', 'pro-smooth-pursuit'];

// ── Storage helpers ──────────────────────────────────────────────────────────
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function loadJSON(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; }
  catch (e) { return fallback; }
}
function saveJSON(key, val) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
}
function loadStr(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try { return localStorage.getItem(key) ?? fallback; } catch (e) { return fallback; }
}
function saveStr(key, val) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, val); } catch (e) {}
}

// ── Streak tracking ──────────────────────────────────────────────────────────
function dayDiff(a, b) {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  const da = new Date(ay, am - 1, ad), db = new Date(by, bm - 1, bd);
  return Math.round((db - da) / 86400000);
}

/** Call once when a player completes any drill, to maintain the streak. */
export function registerActivity() {
  const last = loadStr(LASTDAY_KEY, '');
  const cur = today();
  let streak = parseInt(loadStr(STREAK_KEY, '0'), 10) || 0;

  if (last === cur) return streak;          // already counted today
  if (!last) streak = 1;
  else {
    const diff = dayDiff(last, cur);
    if (diff === 1) streak += 1;            // consecutive day
    else if (diff > 1) streak = 1;          // streak broken, restart
  }
  saveStr(STREAK_KEY, String(streak));
  saveStr(LASTDAY_KEY, cur);
  return streak;
}

export function getStreak() {
  const last = loadStr(LASTDAY_KEY, '');
  const cur = today();
  let streak = parseInt(loadStr(STREAK_KEY, '0'), 10) || 0;
  if (last && dayDiff(last, cur) > 1) streak = 0; // expired
  return { count: streak, trainedToday: last === cur };
}

// ── Focus selection ──────────────────────────────────────────────────────────
/**
 * Pick today's main focus. Blends the rotation (variety) with the player's
 * actual weakest pillar (priority): if the weakest pillar is significantly
 * behind, it overrides the rotation.
 */
export function getTodayFocus() {
  const dow = new Date().getDay(); // 0=Sun..6=Sat
  const rotationFocus = WEEKLY_FOCUS[(dow + 6) % 7]; // map so Mon=index0
  const weakest = getWeakestPillar();

  if (weakest && weakest.pillarData && weakest.pillarData.score < 50) {
    return { pillar: weakest.pillar, reason: 'weakness', overridden: rotationFocus !== weakest.pillar };
  }
  return { pillar: rotationFocus, reason: 'rotation', overridden: false };
}

// ── Plan builder ─────────────────────────────────────────────────────────────
function pickFrom(list, exclude = []) {
  const pool = list.filter(d => !exclude.includes(d));
  return (pool.length ? pool : list)[0];
}

function drillBlock(drillId, blockKey) {
  const meta = DRILL_METADATA[drillId] || { name: drillId, path: '#' };
  const tier = getCurrentTier(drillId);
  return {
    id: drillId,
    name: meta.name,
    path: meta.path,
    block: blockKey,
    tier,
    tierDisplay: getTierDisplay(tier),
    skillRating: getDrillSkillRating(drillId, 3)
  };
}

/**
 * Build today's full periodized routine.
 * @returns {{ focus, focusLabel, streak, blocks: [...], totalDrills }}
 */
export function buildDailyPlan() {
  const focus = getTodayFocus();
  const pillar = SKILL_PILLARS[focus.pillar] || SKILL_PILLARS.flickPrecision;

  const used = [];
  const blocks = [];

  // Warmup
  const warm = pickFrom(WARMUP_DRILLS, used);
  used.push(warm);
  blocks.push({ ...ROUTINE_TEMPLATE.warmup, drills: [drillBlock(warm, 'warmup')] });

  // Main: the weakest drills inside the focus pillar (lowest skill rating first)
  const ranked = [...pillar.drills]
    .map(id => ({ id, sr: getDrillSkillRating(id, 3) }))
    .sort((a, b) => a.sr - b.sr);
  const mainDrills = [];
  for (const r of ranked) {
    if (mainDrills.length >= ROUTINE_TEMPLATE.main.count) break;
    if (!used.includes(r.id)) { mainDrills.push(drillBlock(r.id, 'main')); used.push(r.id); }
  }
  // Pad if the pillar has few drills
  while (mainDrills.length < ROUTINE_TEMPLATE.main.count && ranked.length) {
    const r = ranked[mainDrills.length % ranked.length];
    mainDrills.push(drillBlock(r.id, 'main'));
  }
  blocks.push({ ...ROUTINE_TEMPLATE.main, focusLabel: pillar.label, drills: mainDrills });

  // Cooldown: a strength (highest skill rating among broad drills)
  const cool = [...COOLDOWN_DRILLS]
    .map(id => ({ id, sr: getDrillSkillRating(id, 3) }))
    .sort((a, b) => b.sr - a.sr)[0]?.id || COOLDOWN_DRILLS[0];
  blocks.push({ ...ROUTINE_TEMPLATE.cooldown, drills: [drillBlock(cool, 'cooldown')] });

  const totalDrills = blocks.reduce((n, b) => n + b.drills.length, 0);

  return {
    focus: focus.pillar,
    focusLabel: pillar.label,
    focusReason: focus.reason,            // 'weakness' | 'rotation'
    streak: getStreak(),
    blocks,
    totalDrills,
    generatedFor: today()
  };
}

// ── Plan progress (which drills in today's plan are done) ─────────────────────
export function getPlanProgress() {
  const state = loadJSON(PLANSTATE_KEY, { day: '', done: [] });
  if (state.day !== today()) return { day: today(), done: [] };
  return state;
}

/** Mark a drill from today's plan as completed. */
export function markPlanDrillDone(drillId) {
  let state = loadJSON(PLANSTATE_KEY, { day: '', done: [] });
  if (state.day !== today()) state = { day: today(), done: [] };
  if (!state.done.includes(drillId)) state.done.push(drillId);
  saveJSON(PLANSTATE_KEY, state);
  registerActivity();
  return state;
}

/** % of today's plan completed (0-100). */
export function getPlanCompletion() {
  const plan = buildDailyPlan();
  const progress = getPlanProgress();
  const planIds = plan.blocks.flatMap(b => b.drills.map(d => d.id));
  if (planIds.length === 0) return 0;
  const doneInPlan = planIds.filter(id => progress.done.includes(id)).length;
  return Math.round((doneInPlan / planIds.length) * 100);
}

// ── Motivational headline for the dashboard ──────────────────────────────────
export function getPlanHeadline() {
  const { count, trainedToday } = getStreak();
  if (count >= 7) return `🔥 ${count}-day streak — elite discipline. Keep it alive.`;
  if (count >= 3) return `🔥 ${count}-day streak. Pros train daily — don't break the chain.`;
  if (trainedToday) return `✅ Trained today. Consistency builds champions.`;
  return `Start today's session — build your streak.`;
}
