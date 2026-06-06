// app/sitemap.js
// Dynamic XML Sitemap - 125 URLs covering all SkillDrills pages
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
];

// ============================================
// INDIVIDUAL DRILL PAGES (116 drills)
// ============================================
const drillRoutes = [
  
  // ==================== ACADEMIC DRILLS (12) ====================
  { path: '/drills/academic/comprehension/inference-drill', category: 'Academic > Comprehension', priority: 0.9 },
  { path: '/drills/academic/comprehension/listening-comprehension', category: 'Academic > Comprehension', priority: 0.9 },
  { path: '/drills/academic/comprehension/reading-comprehension', category: 'Academic > Comprehension', priority: 0.9 },
  { path: '/drills/academic/math-speed/arithmetic-race', category: 'Academic > Math Speed', priority: 0.9 },
  { path: '/drills/academic/math-speed/Math-Reaction', category: 'Academic > Math Speed', priority: 0.9 },
  { path: '/drills/academic/math-speed/mental-math', category: 'Academic > Math Speed', priority: 0.9 },
  { path: '/drills/academic/math-speed/multiplication-tables', category: 'Academic > Math Speed', priority: 0.9 },
  { path: '/drills/academic/reading-speed/peripheral-reader', category: 'Academic > Reading Speed', priority: 0.9 },
  { path: '/drills/academic/reading-speed/rsvp-reader', category: 'Academic > Reading Speed', priority: 0.9 },
  { path: '/drills/academic/reading-speed/speed-reader', category: 'Academic > Reading Speed', priority: 0.9 },
  { path: '/drills/academic/writing-speed/code-typing', category: 'Academic > Writing Speed', priority: 0.9 },
  { path: '/drills/academic/writing-speed/typing-test', category: 'Academic > Writing Speed', priority: 0.9 },

  // ==================== COGNITIVE DRILLS (16) ====================
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

  // ==================== FPS DRILLS (10) - Highest Priority ====================
  { path: '/drills/fps/180-degree-awareness', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/flick-shot-training', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/high-speed-kinetic-trainer', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/instant-response', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/pro-smooth-pursuit', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/pro-tracking', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/target-acquisition', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/counter-strafe-trainer', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/recoil-control', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/strafe-tracking', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/angle-hold-trainer', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/target-prioritization', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/vertical-air-track', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/prefire-corner-clearer', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/sound-spatial-reflex', category: 'FPS Training', priority: 1.0 },
  { path: '/drills/fps/target-switching-swarm', category: 'FPS Training', priority: 1.0 },

  // ==================== MEMORY DRILLS (15) ====================
  { path: '/drills/memory/associative-memory/concept-linking', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/associative-memory/name-face', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/associative-memory/sound-pattern', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/long-term-memory/image-association', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/long-term-memory/paired-associates', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/long-term-memory/story-recall', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/short-term-memory/color-sequence', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/short-term-memory/digit-span', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/short-term-memory/word-recall', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/spatial-memory/grid-memorization', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/spatial-memory/object-location', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/spatial-memory/path-tracing', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/working-memory/mental-arithmetic', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/working-memory/n-back', category: 'Memory Training', priority: 0.85 },
  { path: '/drills/memory/working-memory/sentence-span', category: 'Memory Training', priority: 0.85 },

  // ==================== MENTAL FITNESS DRILLS (6) ====================
  { path: '/drills/mental-fitness/breathing-exercises/4-7-8', category: 'Mental Fitness', priority: 0.8 },
  { path: '/drills/mental-fitness/breathing-exercises/box-breathing', category: 'Mental Fitness', priority: 0.8 },
  { path: '/drills/mental-fitness/breathing-exercises/wim-hof', category: 'Mental Fitness', priority: 0.8 },
  { path: '/drills/mental-fitness/stress-control/biofeedback', category: 'Mental Fitness', priority: 0.8 },
  { path: '/drills/mental-fitness/stress-control/calm-under-pressure', category: 'Mental Fitness', priority: 0.8 },
  { path: '/drills/mental-fitness/stress-control/stress-inoculation', category: 'Mental Fitness', priority: 0.8 },

  // ==================== MOTOR DRILLS (12) ====================
  { path: '/drills/motor/hand-eye-coordination/aim-trainer', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/hand-eye-coordination/click-accuracy', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/hand-eye-coordination/drag-and-drop', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/movement-speed/finger-sequencing', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/movement-speed/gesture-speed', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/movement-speed/rapid-tapping', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/precision-control/fine-motor', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/precision-control/steady-hand', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/precision-control/tracing', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/timing-accuracy/rhythm-tap', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/timing-accuracy/stopwatch-click', category: 'Motor Skills', priority: 0.85 },
  { path: '/drills/motor/timing-accuracy/synchronization', category: 'Motor Skills', priority: 0.85 },

  // ==================== PHYSICAL DRILLS (11) ====================
  { path: '/drills/physical/Balance-Training/dynamic-balance', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Balance-Training/single-leg-hold', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Balance-Training/stability-challenge', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Coordination/complex-pattern', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Coordination/cross-body-movement', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Fitness/agility-ladder', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Fitness/jump-sequence', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Fitness/speed-drill', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Reflex-Training/drop-catch', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Reflex-Training/quick-dodge', category: 'Physical Training', priority: 0.75 },
  { path: '/drills/physical/Reflex-Training/reaction-chain', category: 'Physical Training', priority: 0.75 },

  // ==================== PRODUCTIVITY DRILLS (10) ====================
  { path: '/drills/productivity/focus-endurance/concentration-stamina', category: 'Productivity', priority: 0.85 },
  { path: '/drills/productivity/focus-endurance/deep-work', category: 'Productivity', priority: 0.85 },
  { path: '/drills/productivity/focus-endurance/flow-state', category: 'Productivity', priority: 0.85 },
  { path: '/drills/productivity/task-switching/context-switch', category: 'Productivity', priority: 0.85 },
  { path: '/drills/productivity/task-switching/multi-tasking', category: 'Productivity', priority: 0.85 },
  { path: '/drills/productivity/task-switching/switch-cost', category: 'Productivity', priority: 0.85 },
  { path: '/drills/productivity/time-management/pomodoro-timer', category: 'Productivity', priority: 0.85 },
  { path: '/drills/productivity/time-management/priority-sorting', category: 'Productivity', priority: 0.85 },
  { path: '/drills/productivity/time-management/time-estimation', category: 'Productivity', priority: 0.85 },
  { path: '/drills/productivity/work-efficiency/batch-processing', category: 'Productivity', priority: 0.85 },

  // ==================== VISUAL DRILLS (13) ====================
  { path: '/drills/visual/depth-perception/distance-judgment', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/peripheral-vision/peripheral-flash', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/peripheral-vision/wide-field', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/reaction-speed/go/no-go', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/reaction-speed/light-reaction', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/reaction-speed/sound-reaction', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/tracking-accuracy/moving-target', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/tracking-accuracy/multiple-targets', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/tracking-accuracy/pursuit-tracker', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/difference-spotter', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/entropic-grid', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/rapid-object-id', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/rhythm-anomaly', category: 'Visual Training', priority: 0.85 },
  { path: '/drills/visual/visual-recognition/visual-search', category: 'Visual Training', priority: 0.85 },
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
  TOTAL URLS: 125
  ├── Category Pages: 10
  │   ├── Priority 1.0: Homepage, FPS Hub
  │   ├── Priority 0.9: Academic, Cognitive
  │   ├── Priority 0.85: Memory, Motor, Productivity, Visual
  │   └── Priority 0.75-0.8: Mental Fitness, Physical
  │
  └── Drill Pages: 115
      ├── Priority 1.0: FPS Drills (21)
      ├── Priority 0.9: Academic Drills (12)
      ├── Priority 0.85: Cognitive (16), Memory (15), Motor (12), Productivity (10), Visual (14)
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