// lib/drillCatalog.js
// Card-level presentation data for the hub pages: a one-line subtitle per drill,
// and the order drills are offered in.
//
// WHY THIS FILE EXISTS
//
// 1. TAGLINES. `lib/drillsRegistry.js` descriptions are written for the drill
//    page itself — they carry parameters ("adaptive 100-200ms window", "opacity
//    1.0 -> 0.4") because a visitor already on that page wants them. On a hub
//    card they wrap to three or four lines on a phone and turn the grid into a
//    wall of text, which is the opposite of what a card is for. The tagline is
//    the same drill said in one line: what you actually do, no numbers.
//    The long description is untouched and still used on the drill page.
//
// 2. ORDER. `FEATURED_ORDER` decides which drill a visitor is shown first.
//    Where a page's target term has measured Bing volume (see SEO_PROGRESS.md
//    "Keyword research" and scripts/bing/baseline/), demand sets the order:
//      cps test 26,858 · reaction time test 10,978 · aim trainer 9,821 ·
//      stroop test 427 · reading speed test 250 · keyboard speed test 199 ·
//      color memory game 172 · schulte table 149 · peripheral vision test 106
//    55 of 81 drill terms register no measurable volume, so for those the order
//    is a judgement call, and the rule applied is: a drill a first-time visitor
//    can understand from its one-line subtitle comes before one that needs a
//    paragraph. It is an editorial ranking, not a measurement — say so before
//    treating this list as data.

export const DRILL_TAGLINES = {
  // ---------------- COGNITIVE ----------------
  '/drills/cognitive/focus/distraction-fighter': 'Name the ink colour, not the word',
  '/drills/cognitive/processing-speed/reaction-time': 'Hit red, ignore blue, at speed',
  '/drills/cognitive/processing-speed/rsvp-reader': 'Read words flashed one at a time',
  '/drills/cognitive/focus/concentration-grid': 'Find the numbers in order',
  '/drills/cognitive/attention/divided-attention': 'Track balls and match numbers at once',
  '/drills/cognitive/attention/multi-tasking': 'Two target streams, one pair of eyes',
  '/drills/cognitive/processing-speed/symbol-matching': 'Match symbols to digits as keys change',
  '/drills/cognitive/attention/concentration-stamina': 'Stay sharp as the rule keeps flipping',

  // ---------------- FPS ----------------
  '/drills/fps/flick-shot-training': 'One-tap flicks on a shrinking timer',
  '/drills/fps/target-switching-swarm': 'Flick across a moving target swarm',
  '/drills/fps/instant-response': 'Click the instant the centre flashes',
  '/drills/fps/recoil-control': 'Pull down through the spray pattern',
  '/drills/fps/strafe-tracking': 'Stay locked on unpredictable strafing',
  '/drills/fps/180-degree-awareness': 'Snap to targets at the screen edges',
  '/drills/fps/flow-state': 'Hold your rhythm across endless spawns',
  '/drills/fps/target-acquisition': 'Click five targets brightest to dimmest',
  '/drills/fps/micro-correction-precision': 'Anchor, then snap to the micro-target',
  '/drills/fps/target-prioritization': 'Shoot by priority, skip the decoys',
  '/drills/fps/angle-hold-trainer': 'Hold the angle, punish the peek',
  '/drills/fps/anti-strafe-jitter-duel': 'Win a close-range jitter duel',
  '/drills/fps/anti-zigzag-movement-trainer': 'Track evasive zig-zag strafers',
  '/drills/fps/pro-smooth-pursuit': 'Stay glued to a looping curve',
  '/drills/fps/vertical-air-track': 'Track targets launched into the air',

  // ---------------- MEMORY ----------------
  '/drills/memory/short-term-memory/color-sequence': 'Repeat the colour pattern in order',
  '/drills/memory/short-term-memory/digit-span': 'Recall digit strings that keep growing',
  '/drills/memory/spatial-memory/grid-memorization': 'Memorise which cells lit up',
  '/drills/memory/working-memory/n-back': 'Match the letter from three steps back',
  '/drills/memory/spatial-memory/object-location': 'Remember where each object sat',
  '/drills/memory/short-term-memory/word-recall': 'Study a word list, then type it back',
  '/drills/memory/spatial-memory/path-tracing': 'Watch a path, then retrace it exactly',

  // ---------------- MOTOR ----------------
  '/drills/motor/movement-speed/rapid-tapping': 'How many clicks per second can you hold?',
  '/drills/motor/hand-eye-coordination/aim-trainer': 'Targets shrink as your streak grows',
  '/drills/motor/movement-speed/keyboard-recognition': 'Hit the right key on sight',
  '/drills/motor/hand-eye-coordination/precision-flick-shot': 'Flick into a shrinking aperture',
  '/drills/motor/precision-control/steady-hand': 'Trace a corridor that keeps narrowing',
  '/drills/motor/hand-eye-coordination/drag-and-drop': 'Drag the ball into the ring in time',
  '/drills/motor/precision-control/tracing': 'Follow a moving wave with your cursor',
  '/drills/motor/movement-speed/finger-sequencing': 'Click three nodes largest to smallest',

  // ---------------- PHYSICAL ----------------
  '/drills/physical/reflex-training/peripheral-threat-sweeper': 'Catch threats at the edge of vision',
  '/drills/physical/reflex-training/drop-catch': 'Catch the green, avoid the red',
  '/drills/physical/reflex-training/quick-dodge': 'Outrun red homing obstacles',
  '/drills/physical/fitness/speed-drill': 'Click the rings before they vanish',
  '/drills/physical/reflex-training/reaction-chain': 'Stop the moving nodes on the spot',
  '/drills/physical/coordination/dynamic-grid-evasion': 'Dodge across a three-by-three grid',
  '/drills/physical/fitness/agility-ladder': 'Step the ladder left, right, left',
  '/drills/physical/balance-training/stability-challenge': 'Hold the centre against the wind',
  '/drills/physical/fitness/jump-sequence': 'Charge, launch, steer in mid-air',
  '/drills/physical/coordination/cross-body-movement': 'Connect nodes across the screen',
  '/drills/physical/coordination/complex-pattern': 'Redraw the pattern from memory',

  // ---------------- REACTION SPEED ----------------
  '/drills/reaction-speed/reaction-time-test': 'Measure your reaction time in milliseconds',
  '/drills/reaction-speed/reflex-training-drill': 'Clear the burst before it times out',
  '/drills/reaction-speed/saccadic-gallery': 'Chase flashes in a zig-zag gallery',
  '/drills/reaction-speed/fps-tracking-trainer': 'Track human-like horizontal strafes',
  '/drills/reaction-speed/visual-tracking-speed-test': 'Catch targets that dash without warning',
  '/drills/reaction-speed/reaction-simulator': 'Catch falling targets in their lane',
  '/drills/reaction-speed/market-doors-pursuit': 'Sweep five doors for the flash',
  '/drills/reaction-speed/barrier-sequence-pursuit': 'Catch flashes behind corner gates',

  // ---------------- VISUAL ----------------
  '/drills/visual/reaction-speed/light-reaction': 'Click the moment the ball flashes',
  '/drills/visual/reaction-speed/go/no-go': 'Click green, never red',
  '/drills/visual/visual-recognition/visual-search': 'Find the one C among the Os',
  '/drills/visual/tracking-accuracy/moving-target': 'Catch fast targets crossing the screen',
  '/drills/visual/tracking-accuracy/pursuit-tracker': 'Keep the cursor on a wandering target',
  '/drills/visual/tracking-accuracy/multiple-targets': 'Track four targets hidden among eleven',
  '/drills/visual/depth-perception/distance-judgment': 'Intercept a sphere at the right depth',
  '/drills/visual/visual-recognition/entropic-grid': 'Find the target as the grid corrupts',
  '/drills/visual/visual-recognition/rhythm-anomaly': 'Spot the cell pulsing out of rhythm',

  // ---------------- VISUAL TRACKING ----------------
  '/drills/visual-tracking/peripheral-ping-pursuit': 'Hold centre, catch the edge pings',
  '/drills/visual-tracking/infinity-pursuit': 'Trace a figure-of-eight loop',
  '/drills/visual-tracking/sine-wave-pursuit': 'Ride a horizontal sine wave',
  '/drills/visual-tracking/constant-slow-pursuit': 'Slow, smooth pursuit on a set curve',
  '/drills/visual-tracking/zig-zag-path-pursuit': 'Follow a zig-zag guide path',
  '/drills/visual-tracking/triangular-pursuit': 'Follow a triangular guide path',
  '/drills/visual-tracking/predictive-pursuit': 'Read the path before it solidifies',
  '/drills/visual-tracking/split-screen-tracking': 'Track two targets at once',
  '/drills/visual-tracking/strobe-prediction-pursuit': 'Predict through the strobe blackouts',
  '/drills/visual-tracking/dynamic-evasion-pursuit': 'React to sharp direction changes',
  '/drills/visual-tracking/spatial-shift-pursuit': 'Adapt to random speed shifts',
  '/drills/visual-tracking/ghosting-suppress-pursuit': 'Ignore the trails, track the target',
  '/drills/visual-tracking/staircase-step': 'Follow slides and vertical snaps',
  '/drills/visual-tracking/momentum-teleport-pursuit': 'Predict where a teleport lands',
  '/drills/visual-tracking/directional-chaos-pursuit': 'Follow a target nudged into chaos',
};

// Most-likely-to-be-picked first. Object key order above is already the intended
// order within each category, so the featured order is derived from it rather
// than maintained as a second list that can drift out of sync.
const FEATURED_ORDER = Object.keys(DRILL_TAGLINES);
const FEATURED_RANK = new Map(FEATURED_ORDER.map((href, i) => [href, i]));

/**
 * One-line card subtitle for a drill. Falls back to the registry description
 * (trimmed at the first sentence/clause break) so a newly added drill still
 * renders something sane before it gets a hand-written tagline.
 */
export function getDrillTagline(href, fallbackDescription = '') {
  const tagline = DRILL_TAGLINES[href];
  if (tagline) return tagline;
  if (!fallbackDescription) return '';
  return fallbackDescription.split(/[:.]/)[0].trim();
}

/**
 * Sort drills so the ones a visitor is most likely to want come first.
 * Anything not in FEATURED_ORDER keeps its original relative position at the end.
 */
export function sortByInterest(drills, getHref = (d) => d.href) {
  const fallback = FEATURED_RANK.size;
  return [...drills]
    .map((drill, i) => ({ drill, i, rank: FEATURED_RANK.get(getHref(drill)) ?? fallback }))
    .sort((a, b) => a.rank - b.rank || a.i - b.i)
    .map((entry) => entry.drill);
}
