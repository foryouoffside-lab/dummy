// lib/drillPreviews.js
// Presentation-layer registry for live drill card preview animations.
//
// WHY THIS FILE EXISTS
//
// Category cards on hub pages formerly sold drills with static icons.
// This registry maps drill routes to autonomous, lightweight 30fps canvas
// mini-demos (scenes) that illustrate each drill's core visual mechanic.
//
// HOW TO ADD A DRILL:
// 1. Pick or author an archetype in components/drill/previews/scenes.js
// 2. Add an entry below keyed by the drill's canonical href:
//      '/drills/category/drill-slug': { scene: 'scene-id', speed: 1.0 }
// 3. Any drill not listed here automatically falls back to its existing static icon.

export const DRILL_PREVIEWS = {
  // ---------------- REACTION SPEED ----------------
  '/drills/reaction-speed/reaction-time-test': {
    scene: 'reflex',
    speed: 1.0,
  },
  '/drills/reaction-speed/reflex-training-drill': {
    scene: 'burst',
    speed: 1.0,
  },
  '/drills/reaction-speed/saccadic-gallery': {
    scene: 'saccadic',
    speed: 1.0,
  },
  '/drills/reaction-speed/fps-tracking-trainer': {
    scene: 'track',
    speed: 1.0,
  },
  '/drills/reaction-speed/visual-tracking-speed-test': {
    scene: 'dash',
    speed: 1.0,
  },
  '/drills/reaction-speed/reaction-game': {
    scene: 'lanes',
    speed: 1.0,
  },
  '/drills/reaction-speed/market-doors-pursuit': {
    scene: 'doors',
    speed: 1.0,
  },
  '/drills/reaction-speed/barrier-sequence-pursuit': {
    scene: 'peek',
    speed: 1.0,
  },

  // ---------------- COGNITIVE ----------------
  '/drills/cognitive/focus/distraction-fighter': {
    scene: 'stroop',
    speed: 1.0,
  },
  '/drills/cognitive/focus/concentration-grid': {
    scene: 'scan',
    speed: 1.0,
  },
  '/drills/cognitive/processing-speed/rsvp-reader': {
    scene: 'stream',
    speed: 1.0,
  },
  '/drills/cognitive/processing-speed/reaction-time': {
    scene: 'choice',
    speed: 1.0,
  },
  '/drills/cognitive/processing-speed/symbol-matching': {
    scene: 'symbol-match',
    speed: 1.0,
  },
  '/drills/cognitive/attention/divided-attention': {
    scene: 'divided',
    speed: 1.0,
  },
  '/drills/cognitive/attention/multi-tasking': {
    scene: 'dual-flow',
    speed: 1.0,
  },
  '/drills/cognitive/attention/concentration-stamina': {
    scene: 'rule-switch',
    speed: 1.0,
  },

  // ---------------- MEMORY ----------------
  '/drills/memory/short-term-memory/color-sequence': {
    scene: 'sequence',
    speed: 1.0,
  },
  '/drills/memory/short-term-memory/digit-span': {
    scene: 'digit-span',
    speed: 1.0,
  },
  '/drills/memory/short-term-memory/word-recall': {
    scene: 'word-recall',
    speed: 1.0,
  },
  '/drills/memory/spatial-memory/grid-memorization': {
    scene: 'grid-recall',
    speed: 1.0,
  },
  '/drills/memory/spatial-memory/object-location': {
    scene: 'object-location',
    speed: 1.0,
  },
  '/drills/memory/spatial-memory/path-tracing': {
    scene: 'path-trace',
    speed: 1.0,
  },
  '/drills/memory/working-memory/n-back': {
    scene: 'n-back',
    speed: 1.0,
  },

  // ---------------- MOTOR ----------------
  '/drills/motor/hand-eye-coordination/aim-trainer': {
    scene: 'aim-shrink',
    speed: 1.0,
  },
  '/drills/motor/hand-eye-coordination/drag-and-drop': {
    scene: 'drag-drop',
    speed: 1.0,
  },
  '/drills/motor/hand-eye-coordination/precision-flick-shot': {
    scene: 'precision-flick',
    speed: 1.0,
  },
  '/drills/motor/movement-speed/finger-sequencing': {
    scene: 'scale-sequence',
    speed: 1.0,
  },
  '/drills/motor/movement-speed/keyboard-recognition': {
    scene: 'key-press',
    speed: 1.0,
  },
  '/drills/motor/movement-speed/rapid-tapping': {
    scene: 'tap',
    speed: 1.0,
  },
  '/drills/motor/precision-control/steady-hand': {
    scene: 'steady-corridor',
    speed: 1.0,
  },
  '/drills/motor/precision-control/tracing': {
    scene: 'wave-trace',
    speed: 1.0,
  },

  // ---------------- FPS ----------------
  '/drills/fps/180-degree-awareness': {
    scene: 'peripheral-snap',
    speed: 1.0,
  },
  '/drills/fps/angle-hold-trainer': {
    scene: 'angle-hold',
    speed: 1.0,
  },
  '/drills/fps/anti-strafe-jitter-duel': {
    scene: 'jitter-duel',
    speed: 1.0,
  },
  '/drills/fps/anti-zigzag-movement-trainer': {
    scene: 'zigzag-track',
    speed: 1.0,
  },
  '/drills/fps/flick-shot-training': {
    scene: 'flick',
    speed: 1.0,
  },
  '/drills/fps/flow-state': {
    scene: 'flow-rhythm',
    speed: 1.0,
  },
  '/drills/fps/instant-response': {
    scene: 'instant-trigger',
    speed: 1.0,
  },
  '/drills/fps/micro-correction-precision': {
    scene: 'micro-correction',
    speed: 1.0,
  },
  '/drills/fps/pro-smooth-pursuit': {
    scene: 'smooth-pursuit',
    speed: 1.0,
  },
  '/drills/fps/recoil-control': {
    scene: 'recoil-spray',
    speed: 1.0,
  },
  '/drills/fps/strafe-tracking': {
    scene: 'strafe-adad',
    speed: 1.0,
  },
  '/drills/fps/target-acquisition': {
    scene: 'contrast-snap',
    speed: 1.0,
  },
  '/drills/fps/target-prioritization': {
    scene: 'target-priority',
    speed: 1.0,
  },
  '/drills/fps/target-switching-swarm': {
    scene: 'switching-swarm',
    speed: 1.0,
  },
  '/drills/fps/vertical-air-track': {
    scene: 'vertical-parabola',
    speed: 1.0,
  },

  // ---------------- PHYSICAL ----------------
  '/drills/physical/balance-training/stability-challenge': {
    scene: 'stability-hold',
    speed: 1.0,
  },
  '/drills/physical/coordination/complex-pattern': {
    scene: 'pattern-trace',
    speed: 1.0,
  },
  '/drills/physical/coordination/cross-body-movement': {
    scene: 'cross-body',
    speed: 1.0,
  },
  '/drills/physical/coordination/dynamic-grid-evasion': {
    scene: 'grid-evasion',
    speed: 1.0,
  },
  '/drills/physical/fitness/agility-ladder': {
    scene: 'agility-ladder',
    speed: 1.0,
  },
  '/drills/physical/fitness/jump-sequence': {
    scene: 'jump-parabola',
    speed: 1.0,
  },
  '/drills/physical/fitness/speed-drill': {
    scene: 'speed-rings',
    speed: 1.0,
  },
  '/drills/physical/reflex-training/drop-catch': {
    scene: 'drop-catch',
    speed: 1.0,
  },
  '/drills/physical/reflex-training/peripheral-threat-sweeper': {
    scene: 'peripheral-sweep',
    speed: 1.0,
  },
  '/drills/physical/reflex-training/quick-dodge': {
    scene: 'quick-dodge',
    speed: 1.0,
  },
  '/drills/physical/reflex-training/reaction-chain': {
    scene: 'kinetic-arrest',
    speed: 1.0,
  },
};

/**
 * Look up the preview configuration for a drill by href.
 * Returns null when the drill has no preview mapped (fallback to static icon).
 * @param {string} href
 * @returns {{ scene: string, speed?: number } | null}
 */
export function getDrillPreview(href) {
  if (!href) return null;
  return DRILL_PREVIEWS[href] || null;
}
