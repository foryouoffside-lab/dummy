const BASE_URL = 'https://skilldrills.online';

const drillRoutes = [
  // ==================== ACADEMIC DRILLS (12) ====================
  { path: '/drills/academic/comprehension/inference-drill', category: 'Academic > Comprehension', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/comprehension/listening-comprehension', category: 'Academic > Comprehension', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/comprehension/reading-comprehension', category: 'Academic > Comprehension', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/math-speed/arithmetic-race', category: 'Academic > Math Speed', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/math-speed/Math-Reaction', category: 'Academic > Math Speed', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/math-speed/mental-math', category: 'Academic > Math Speed', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/math-speed/multiplication-tables', category: 'Academic > Math Speed', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/reading-speed/peripheral-reader', category: 'Academic > Reading Speed', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/reading-speed/rsvp-reader', category: 'Academic > Reading Speed', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/reading-speed/speed-reader', category: 'Academic > Reading Speed', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/writing-speed/code-typing', category: 'Academic > Writing Speed', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/academic/writing-speed/typing-test', category: 'Academic > Writing Speed', priority: 0.9, changefreq: 'weekly' },

  // ==================== COGNITIVE DRILLS (16) ====================
  { path: '/drills/cognitive/attention/divided-attention', category: 'Cognitive > Attention', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/attention/selective-attention', category: 'Cognitive > Attention', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/attention/sustained-attention', category: 'Cognitive > Attention', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/focus/concentration-grid', category: 'Cognitive > Focus', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/focus/distraction-fighter', category: 'Cognitive > Focus', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/focus/focus-timer', category: 'Cognitive > Focus', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/memory/card-matching', category: 'Cognitive > Memory', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/memory/memory-sequence', category: 'Cognitive > Memory', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/memory/number-recall', category: 'Cognitive > Memory', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/memory/pattern-recognition', category: 'Cognitive > Memory', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/problem-solving/logic-puzzles', category: 'Cognitive > Problem Solving', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/problem-solving/sudoku', category: 'Cognitive > Problem Solving', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/problem-solving/tower-of-hanoi', category: 'Cognitive > Problem Solving', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/processing-speed/quick-math', category: 'Cognitive > Processing Speed', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/processing-speed/reaction-time', category: 'Cognitive > Processing Speed', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/cognitive/processing-speed/symbol-matching', category: 'Cognitive > Processing Speed', priority: 0.85, changefreq: 'weekly' },

  // ==================== FPS DRILLS (23) ====================
  { path: '/drills/fps/180-degree-awareness', category: 'FPS > Awareness', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/240fps-click-test', category: 'FPS > Aim Accuracy', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/360fps-reflex', category: 'FPS > Reaction Speed', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/chaos-tracking', category: 'FPS > Tracking', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/clinical-gray-grid', category: 'FPS > Aim Accuracy', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/flick-shot-240fps', category: 'FPS > Aim Accuracy', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/flick-shot-training', category: 'FPS > Aim Accuracy', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/flick-training', category: 'FPS > Aim Accuracy', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/headshot-trainer', category: 'FPS > Aim Accuracy', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/high-speed-kinetic-trainer', category: 'FPS > Reaction Speed', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/instant-response', category: 'FPS > Reaction Speed', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/map-prediction', category: 'FPS > Awareness', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/multi-target-tracking', category: 'FPS > Tracking', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/neural-tracker', category: 'FPS > Tracking', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/orbital-tracking-drill', category: 'FPS > Tracking', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/peripheral-awareness', category: 'FPS > Awareness', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/predictive-tracking', category: 'FPS > Tracking', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/pro-smooth-pursuit', category: 'FPS > Tracking', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/pro-tracking', category: 'FPS > Tracking', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/reactive-flick-training', category: 'FPS > Aim Accuracy', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/reactive-tracking', category: 'FPS > Tracking', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/single-target-track', category: 'FPS > Tracking', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/fps/target-acquisition', category: 'FPS > Aim Accuracy', priority: 1.0, changefreq: 'weekly' },

  // ==================== MEMORY DRILLS (15) ====================
  { path: '/drills/memory/associative-memory/concept-linking', category: 'Memory > Associative', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/associative-memory/name-face', category: 'Memory > Associative', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/associative-memory/sound-pattern', category: 'Memory > Associative', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/long-term-memory/image-association', category: 'Memory > Long-Term', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/long-term-memory/paired-associates', category: 'Memory > Long-Term', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/long-term-memory/story-recall', category: 'Memory > Long-Term', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/short-term-memory/color-sequence', category: 'Memory > Short-Term', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/short-term-memory/digit-span', category: 'Memory > Short-Term', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/short-term-memory/word-recall', category: 'Memory > Short-Term', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/spatial-memory/grid-memorization', category: 'Memory > Spatial', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/spatial-memory/object-location', category: 'Memory > Spatial', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/spatial-memory/path-tracing', category: 'Memory > Spatial', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/working-memory/mental-arithmetic', category: 'Memory > Working', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/working-memory/n-back', category: 'Memory > Working', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/memory/working-memory/sentence-span', category: 'Memory > Working', priority: 0.8, changefreq: 'weekly' },

  // ==================== MENTAL FITNESS DRILLS (6) ====================
  { path: '/drills/mental-fitness/breathing-exercises/4-7-8', category: 'Mental Fitness > Breathing', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/mental-fitness/breathing-exercises/box-breathing', category: 'Mental Fitness > Breathing', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/mental-fitness/breathing-exercises/wim-hof', category: 'Mental Fitness > Breathing', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/mental-fitness/stress-control/biofeedback', category: 'Mental Fitness > Stress', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/mental-fitness/stress-control/calm-under-pressure', category: 'Mental Fitness > Stress', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/mental-fitness/stress-control/stress-inoculation', category: 'Mental Fitness > Stress', priority: 0.8, changefreq: 'weekly' },

  // ==================== MOTOR DRILLS (12) ====================
  { path: '/drills/motor/hand-eye-coordination/aim-trainer', category: 'Motor > Coordination', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/hand-eye-coordination/click-accuracy', category: 'Motor > Coordination', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/hand-eye-coordination/drag-and-drop', category: 'Motor > Coordination', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/movement-speed/finger-sequencing', category: 'Motor > Speed', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/movement-speed/gesture-speed', category: 'Motor > Speed', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/movement-speed/rapid-tapping', category: 'Motor > Speed', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/precision-control/fine-motor', category: 'Motor > Precision', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/precision-control/steady-hand', category: 'Motor > Precision', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/precision-control/tracing', category: 'Motor > Precision', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/timing-accuracy/rhythm-tap', category: 'Motor > Timing', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/timing-accuracy/stopwatch-click', category: 'Motor > Timing', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor/timing-accuracy/synchronization', category: 'Motor > Timing', priority: 0.85, changefreq: 'weekly' },

  // ==================== PHYSICAL DRILLS (11) ====================
  { path: '/drills/physical/Balance-Training/dynamic-balance', category: 'Physical > Balance', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Balance-Training/single-leg-hold', category: 'Physical > Balance', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Balance-Training/stability-challenge', category: 'Physical > Balance', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Coordination/complex-pattern', category: 'Physical > Coordination', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Coordination/cross-body-movement', category: 'Physical > Coordination', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Fitness/agility-ladder', category: 'Physical > Fitness', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Fitness/jump-sequence', category: 'Physical > Fitness', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Fitness/speed-drill', category: 'Physical > Fitness', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Reflex-Training/drop-catch', category: 'Physical > Reflex', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Reflex-Training/quick-dodge', category: 'Physical > Reflex', priority: 0.75, changefreq: 'monthly' },
  { path: '/drills/physical/Reflex-Training/reaction-chain', category: 'Physical > Reflex', priority: 0.75, changefreq: 'monthly' },

  // ==================== PRODUCTIVITY DRILLS (10) ====================
  { path: '/drills/productivity/focus-endurance/concentration-stamina', category: 'Productivity > Focus Endurance', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/productivity/focus-endurance/deep-work', category: 'Productivity > Focus Endurance', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/productivity/focus-endurance/flow-state', category: 'Productivity > Focus Endurance', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/productivity/task-switching/context-switch', category: 'Productivity > Task Switching', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/productivity/task-switching/multi-tasking', category: 'Productivity > Task Switching', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/productivity/task-switching/switch-cost', category: 'Productivity > Task Switching', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/productivity/time-management/pomodoro-timer', category: 'Productivity > Time Management', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/productivity/time-management/priority-sorting', category: 'Productivity > Time Management', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/productivity/time-management/time-estimation', category: 'Productivity > Time Management', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/productivity/work-efficiency/batch-processing', category: 'Productivity > Work Efficiency', priority: 0.85, changefreq: 'weekly' },

  // ==================== VISUAL DRILLS (14) ====================
  { path: '/drills/visual/depth-perception/distance-judgment', category: 'Visual > Depth', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/peripheral-vision/peripheral-flash', category: 'Visual > Peripheral', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/peripheral-vision/wide-field', category: 'Visual > Peripheral', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/reaction-speed/go/no-go', category: 'Visual > Reaction', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/reaction-speed/light-reaction', category: 'Visual > Reaction', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/reaction-speed/sound-reaction', category: 'Visual > Reaction', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/tracking-accuracy/moving-target', category: 'Visual > Tracking', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/tracking-accuracy/multiple-targets', category: 'Visual > Tracking', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/tracking-accuracy/pursuit-tracker', category: 'Visual > Tracking', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/visual-recognition/difference-spotter', category: 'Visual > Recognition', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/visual-recognition/entropic-grid', category: 'Visual > Recognition', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/visual-recognition/rapid-object-id', category: 'Visual > Recognition', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/visual-recognition/rhythm-anomaly', category: 'Visual > Recognition', priority: 0.8, changefreq: 'weekly' },
  { path: '/drills/visual/visual-recognition/visual-search', category: 'Visual > Recognition', priority: 0.8, changefreq: 'weekly' },
];

const categoryPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/drills', priority: 0.95, changefreq: 'daily' },
  { path: '/drills/academic', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/cognitive', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/memory', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/fps', priority: 1.0, changefreq: 'weekly' },
  { path: '/drills/visual', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/mental-fitness', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/motor', priority: 0.85, changefreq: 'weekly' },
  { path: '/drills/physical', priority: 0.8, changefreq: 'monthly' },
  { path: '/drills/productivity', priority: 0.85, changefreq: 'weekly' },
];

export default async function sitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  const allPages = [
    ...categoryPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified: today,
      changeFrequency: page.changefreq,
      priority: page.priority,
    })),
    ...drillRoutes.map((drill) => ({
      url: `${BASE_URL}${drill.path}`,
      lastModified: today,
      changeFrequency: drill.changefreq,
      priority: drill.priority,
    })),
  ];
  
  return allPages;
}