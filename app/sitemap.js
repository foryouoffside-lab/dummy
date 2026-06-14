// app/sitemap.js
// Dynamic XML Sitemap - 160 URLs covering all SkillDrills pages
// Auto-submitted to Google Search Console for indexing

const BASE_URL = 'https://skilldrills.online';

// ============================================
// CATEGORY LANDING PAGES (Higher priority)
// ============================================
const categoryPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/drills/academic', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/cognitive', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/fps', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/memory', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/mental-fitness', priority: 0.8, changefreq: 'monthly' },
  { path: '/drills/motor', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/physical', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/productivity', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/visual', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/visual-tracking', priority: 0.85, changefreq: 'weekly' },
];

// ============================================
// INDIVIDUAL DRILL PAGES (116 drills)
// ============================================
const drillRoutes = [
  // ==================== ACADEMIC DRILLS ====================
  { path: '/drills/academic/comprehension/inference-drill', category: 'Academic > Comprehension', priority: 0.9 },
  { path: '/drills/academic/comprehension/listening-comprehension', category: 'Academic > Comprehension', priority: 0.9 },
  { path: '/drills/academic/comprehension/reading-comprehension', category: 'Academic > Comprehension', priority: 0.9 },
  { path: '/drills/academic/math-speed/Math-Reaction', category: 'Academic > Math Speed', priority: 0.9 },
  { path: '/drills/academic/math-speed/arithmetic-race', category: 'Academic > Math Speed', priority: 0.9 },
  { path: '/drills/academic/math-speed/mental-math', category: 'Academic > Math Speed', priority: 0.9 },
  { path: '/drills/academic/math-speed/multiplication-tables', category: 'Academic > Math Speed', priority: 0.9 },
  { path: '/drills/academic/reading-speed/peripheral-reader', category: 'Academic > Reading Speed', priority: 0.9 },
  { path: '/drills/academic/reading-speed/rsvp-reader', category: 'Academic > Reading Speed', priority: 0.9 },
  { path: '/drills/academic/reading-speed/speed-reader', category: 'Academic > Reading Speed', priority: 0.9 },
  { path: '/drills/academic/writing-speed/code-typing', category: 'Academic > Writing Speed', priority: 0.9 },
  { path: '/drills/academic/writing-speed/typing-test', category: 'Academic > Writing Speed', priority: 0.9 },

  // ==================== COGNITIVE DRILLS ====================
  { path: '/drills/cognitive/attention/divided-attention', category: 'Cognitive > Attention', priority: 0.85 },
  { path: '/drills/cognitive/attention/selective-attention', category: 'Cognitive > Attention', priority: 0.85 },
  { path: '/drills/cognitive/attention/sustained-attention', category: 'Cognitive > Attention', priority: 0.85 },
  { path: '/drills/cognitive/focus/concentration-grid', category: 'Cognitive > Focus', priority: 0.85 },
  { path: '/drills/cognitive/focus/distraction-fighter', category: 'Cognitive > Focus', priority: 0.85 },
  { path: '/drills/cognitive/focus/focus-timer', category: 'Cognitive > Focus', priority: 0.85 },
  { path: '/drills/cognitive/memory/card-matching', category: 'Cognitive > Memory', priority: 0.85 },
  { path: '/drills/cognitive/memory/memory-sequence', category: 'Cognitive > Memory', priority: 0.85 },
  { path: '/drills/cognitive/memory/number-recall', category: 'Cognitive > Memory', priority: 0.85 },
  { path: '/drills/cognitive/memory/pattern-recognition', category: 'Cognitive > Memory', priority: 0.85 },
  { path: '/drills/cognitive/problem-solving/logic-puzzles', category: 'Cognitive > Problem Solving', priority: 0.85 },
  { path: '/drills/cognitive/problem-solving/sudoku', category: 'Cognitive > Problem Solving', priority: 0.85 },
  { path: '/drills/cognitive/problem-solving/tower-of-hanoi', category: 'Cognitive > Problem Solving', priority: 0.85 },
  { path: '/drills/cognitive/processing-speed/quick-math', category: 'Cognitive > Processing Speed', priority: 0.85 },
  { path: '/drills/cognitive/processing-speed/reaction-time', category: 'Cognitive > Processing Speed', priority: 0.85 },
  { path: '/drills/cognitive/processing-speed/symbol-matching', category: 'Cognitive > Processing Speed', priority: 0.85 },

  // ==================== FPS TRAINING DRILLS ====================
  { path: '/drills/fps/180-degree-awareness', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/angle-hold-trainer', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/counter-strafe-trainer', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/deadzone-jiggle-snap', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/evasive-slide-track', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/flick-shot-training', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/headshot-micro-adjust', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/high-speed-kinetic-trainer', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/instant-response', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/micro-flick-burst', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/micro-flick-precision', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/parabolic-air-track', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/pixel-hold-swing', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/prefire-corner-clearer', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/pro-smooth-pursuit', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/pro-tracking', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/pubg-dmr-rhythm', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/pubg-drive-by', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/pubg-lead-drop', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/reactive-sphere-tracking', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/recoil-control', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/sound-spatial-reflex', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/strafe-tracking', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/target-acquisition', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/target-prioritization', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/target-switching-swarm', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/vertical-air-pursuit', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/vertical-air-track', category: 'FPS Training', priority: 1.0 },

  // ==================== MEMORY TRAINING DRILLS ====================
  { path: '/drills/memory/associative-memory/concept-linking', category: 'Memory Training > Associative Memory', priority: 0.85 },
  { path: '/drills/memory/associative-memory/name-face', category: 'Memory Training > Associative Memory', priority: 0.85 },
  { path: '/drills/memory/associative-memory/sound-pattern', category: 'Memory Training > Associative Memory', priority: 0.85 },
  { path: '/drills/memory/long-term-memory/image-association', category: 'Memory Training > Long Term Memory', priority: 0.85 },
  { path: '/drills/memory/long-term-memory/paired-associates', category: 'Memory Training > Long Term Memory', priority: 0.85 },
  { path: '/drills/memory/long-term-memory/story-recall', category: 'Memory Training > Long Term Memory', priority: 0.85 },
  { path: '/drills/memory/short-term-memory/color-sequence', category: 'Memory Training > Short Term Memory', priority: 0.85 },
  { path: '/drills/memory/short-term-memory/digit-span', category: 'Memory Training > Short Term Memory', priority: 0.85 },
  { path: '/drills/memory/short-term-memory/word-recall', category: 'Memory Training > Short Term Memory', priority: 0.85 },
  { path: '/drills/memory/spatial-memory/grid-memorization', category: 'Memory Training > Spatial Memory', priority: 0.85 },
  { path: '/drills/memory/spatial-memory/object-location', category: 'Memory Training > Spatial Memory', priority: 0.85 },
  { path: '/drills/memory/spatial-memory/path-tracing', category: 'Memory Training > Spatial Memory', priority: 0.85 },
  { path: '/drills/memory/working-memory/mental-arithmetic', category: 'Memory Training > Working Memory', priority: 0.85 },
  { path: '/drills/memory/working-memory/n-back', category: 'Memory Training > Working Memory', priority: 0.85 },
  { path: '/drills/memory/working-memory/sentence-span', category: 'Memory Training > Working Memory', priority: 0.85 },

  // ==================== MENTAL FITNESS DRILLS ====================
  { path: '/drills/mental-fitness/breathing-exercises/4-7-8', category: 'Mental Fitness > Breathing Exercises', priority: 0.8 },
  { path: '/drills/mental-fitness/breathing-exercises/box-breathing', category: 'Mental Fitness > Breathing Exercises', priority: 0.8 },
  { path: '/drills/mental-fitness/breathing-exercises/wim-hof', category: 'Mental Fitness > Breathing Exercises', priority: 0.8 },
  { path: '/drills/mental-fitness/stress-control/biofeedback', category: 'Mental Fitness > Stress Control', priority: 0.8 },
  { path: '/drills/mental-fitness/stress-control/calm-under-pressure', category: 'Mental Fitness > Stress Control', priority: 0.8 },
  { path: '/drills/mental-fitness/stress-control/stress-inoculation', category: 'Mental Fitness > Stress Control', priority: 0.8 },

  // ==================== MOTOR SKILLS DRILLS ====================
  { path: '/drills/motor/hand-eye-coordination/aim-trainer', category: 'Motor Skills > Hand Eye Coordination', priority: 0.85 },
  { path: '/drills/motor/hand-eye-coordination/click-accuracy', category: 'Motor Skills > Hand Eye Coordination', priority: 0.85 },
  { path: '/drills/motor/hand-eye-coordination/drag-and-drop', category: 'Motor Skills > Hand Eye Coordination', priority: 0.85 },
  { path: '/drills/motor/movement-speed/finger-sequencing', category: 'Motor Skills > Movement Speed', priority: 0.85 },
  { path: '/drills/motor/movement-speed/gesture-speed', category: 'Motor Skills > Movement Speed', priority: 0.85 },
  { path: '/drills/motor/movement-speed/rapid-tapping', category: 'Motor Skills > Movement Speed', priority: 0.85 },
  { path: '/drills/motor/precision-control/fine-motor', category: 'Motor Skills > Precision Control', priority: 0.85 },
  { path: '/drills/motor/precision-control/steady-hand', category: 'Motor Skills > Precision Control', priority: 0.85 },
  { path: '/drills/motor/precision-control/tracing', category: 'Motor Skills > Precision Control', priority: 0.85 },
  { path: '/drills/motor/timing-accuracy/rhythm-tap', category: 'Motor Skills > Timing Accuracy', priority: 0.85 },
  { path: '/drills/motor/timing-accuracy/stopwatch-click', category: 'Motor Skills > Timing Accuracy', priority: 0.85 },
  { path: '/drills/motor/timing-accuracy/synchronization', category: 'Motor Skills > Timing Accuracy', priority: 0.85 },

  // ==================== PHYSICAL TRAINING DRILLS ====================
  { path: '/drills/physical/balance-training/dynamic-balance', category: 'Physical Training > Balance Training', priority: 0.75 },
  { path: '/drills/physical/balance-training/single-leg-hold', category: 'Physical Training > Balance Training', priority: 0.75 },
  { path: '/drills/physical/balance-training/stability-challenge', category: 'Physical Training > Balance Training', priority: 0.75 },
  { path: '/drills/physical/coordination/complex-pattern', category: 'Physical Training > Coordination', priority: 0.75 },
  { path: '/drills/physical/coordination/cross-body-movement', category: 'Physical Training > Coordination', priority: 0.75 },
  { path: '/drills/physical/fitness/agility-ladder', category: 'Physical Training > Fitness', priority: 0.75 },
  { path: '/drills/physical/fitness/jump-sequence', category: 'Physical Training > Fitness', priority: 0.75 },
  { path: '/drills/physical/fitness/speed-drill', category: 'Physical Training > Fitness', priority: 0.75 },
  { path: '/drills/physical/reflex-training/drop-catch', category: 'Physical Training > Reflex Training', priority: 0.75 },
  { path: '/drills/physical/reflex-training/quick-dodge', category: 'Physical Training > Reflex Training', priority: 0.75 },
  { path: '/drills/physical/reflex-training/reaction-chain', category: 'Physical Training > Reflex Training', priority: 0.75 },

  // ==================== PRODUCTIVITY DRILLS ====================
  { path: '/drills/productivity/focus-endurance/concentration-stamina', category: 'Productivity > Focus Endurance', priority: 0.85 },
  { path: '/drills/productivity/focus-endurance/deep-work', category: 'Productivity > Focus Endurance', priority: 0.85 },
  { path: '/drills/productivity/focus-endurance/flow-state', category: 'Productivity > Focus Endurance', priority: 0.85 },
  { path: '/drills/productivity/task-switching/context-switch', category: 'Productivity > Task Switching', priority: 0.85 },
  { path: '/drills/productivity/task-switching/multi-tasking', category: 'Productivity > Task Switching', priority: 0.85 },
  { path: '/drills/productivity/task-switching/switch-cost', category: 'Productivity > Task Switching', priority: 0.85 },
  { path: '/drills/productivity/time-management/pomodoro-timer', category: 'Productivity > Time Management', priority: 0.85 },
  { path: '/drills/productivity/time-management/priority-sorting', category: 'Productivity > Time Management', priority: 0.85 },
  { path: '/drills/productivity/time-management/time-estimation', category: 'Productivity > Time Management', priority: 0.85 },
  { path: '/drills/productivity/work-efficiency/batch-processing', category: 'Productivity > Work Efficiency', priority: 0.85 },

  // ==================== VISUAL TRAINING DRILLS ====================
  { path: '/drills/visual/depth-perception/distance-judgment', category: 'Visual Training > Depth Perception', priority: 0.85 },
  { path: '/drills/visual/peripheral-vision/peripheral-flash', category: 'Visual Training > Peripheral Vision', priority: 0.85 },
  { path: '/drills/visual/peripheral-vision/wide-field', category: 'Visual Training > Peripheral Vision', priority: 0.85 },
  { path: '/drills/visual/reaction-speed/go/no-go', category: 'Visual Training > Reaction Speed', priority: 0.85 },
  { path: '/drills/visual/reaction-speed/light-reaction', category: 'Visual Training > Reaction Speed', priority: 0.85 },
  { path: '/drills/visual/reaction-speed/sound-reaction', category: 'Visual Training > Reaction Speed', priority: 0.85 },
  { path: '/drills/visual/tracking-accuracy/moving-target', category: 'Visual Training > Tracking Accuracy', priority: 0.85 },
  { path: '/drills/visual/tracking-accuracy/multiple-targets', category: 'Visual Training > Tracking Accuracy', priority: 0.85 },
  { path: '/drills/visual/tracking-accuracy/pursuit-tracker', category: 'Visual Training > Tracking Accuracy', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/difference-spotter', category: 'Visual Training > Visual Recognition', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/entropic-grid', category: 'Visual Training > Visual Recognition', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/rapid-object-id', category: 'Visual Training > Visual Recognition', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/rhythm-anomaly', category: 'Visual Training > Visual Recognition', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/visual-search', category: 'Visual Training > Visual Recognition', priority: 0.85 },

  // ==================== VISUAL TRACKING DRILLS ====================
  { path: '/drills/visual-tracking/barrier-sequence-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/circular-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/constant-slow-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/directional-chaos-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/dynamic-evasion-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/ghosting-suppress-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/infinity-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/market-doors-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/momentum-teleport-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/peripheral-ping-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/predictive-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/reaction-simulator', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/reactive-strafe-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/saccadic-gallery', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/saccadic-snap', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/sine-wave-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/slide-dash-acceleration', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/slow-precision-tracking', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/spatial-shift-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/split-screen-tracking', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/staircase-step', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/stop-and-go-dash', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/strobe-prediction-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/triangular-pursuit', category: 'Visual Tracking', priority: 0.85 },
  { path: '/drills/visual-tracking/zig-zag-path-pursuit', category: 'Visual Tracking', priority: 0.85 },
];

// ============================================
// DYNAMIC SITEMAP GENERATION
// ============================================

export default async function sitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  // Category & Hub Pages
  const categoryEntries = categoryPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: today,
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
  
  // Individual Drill Pages
  const drillEntries = drillRoutes.map((drill) => ({
    url: `${BASE_URL}${drill.path}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: drill.priority,
  }));
  
  // Combine & Return
  return [...categoryEntries, ...drillEntries];
}

// ============================================
// SITEMAP STATISTICS (for development reference)
// ============================================

/*
  TOTAL URLS: 160
  ├── Category Pages: 11
  │   ├── Priority 1.0: Homepage, FPS Hub
  │   ├── Priority 0.9: Academic, Cognitive
  │   ├── Priority 0.85: Memory, Motor, Productivity, Visual, Visual Tracking
  │   └── Priority 0.75-0.8: Mental Fitness, Physical
  │
  └── Drill Pages: 149
      ├── Priority 1.0: FPS Drills (28)
      ├── Priority 0.9: Academic Drills (12)
      ├── Priority 0.85: Cognitive (16), Memory (15), Motor (12), Productivity (10), Visual (14), Visual Tracking (25)
      └── Priority 0.75-0.8: Mental Fitness (6), Physical (11)
*/

// ============================================
// HOW GOOGLE USES THIS:
// ============================================
// Priority 1.0 → Crawled first, indexed fastest
// Priority 0.9  → Crawled within days
// Priority 0.85 → Crawled within a week
// Priority 0.75-0.8 → Crawled within 2 weeks
// changefreq: 'daily' → Google revisits daily
// changefreq: 'weekly' → Google revisits weekly
// lastModified: Always current date
// ============================================