// scripts/notify-indexnow.js
// Automatically notifies search engines after deployment

const INDEXNOW_KEY = 'c8f7a3b2e1d4f5a6b7c8d9e0f1a2b3c4';

// All URLs to submit
const ALL_URLS = [
  '/',
  '/drills',
  '/drills/fps',
  '/drills/cognitive',
  '/drills/academic',
  '/drills/memory',
  '/drills/mental-fitness',
  '/drills/motor',
  '/drills/physical',
  '/drills/productivity',
  '/drills/visual',

  // FPS Drills
  '/drills/fps/180-degree-awareness',
  '/drills/fps/240fps-click-test',
  '/drills/fps/360fps-reflex',
  '/drills/fps/chaos-tracking',
  '/drills/fps/clinical-gray-grid',
  '/drills/fps/flick-shot-240fps',
  '/drills/fps/flick-shot-training',
  '/drills/fps/flick-training',
  '/drills/fps/high-speed-kinetic-trainer',
  '/drills/fps/instant-response',
  '/drills/fps/map-prediction',
  '/drills/fps/multi-target-tracking',
  '/drills/fps/neural-tracker',
  '/drills/fps/orbital-tracking-drill',
  '/drills/fps/peripheral-awareness',
  '/drills/fps/predictive-tracking',
  '/drills/fps/pro-smooth-pursuit',
  '/drills/fps/pro-tracking',
  '/drills/fps/reactive-tracking',
  '/drills/fps/single-target-track',
  '/drills/fps/target-acquisition',

  // Cognitive Drills
  '/drills/cognitive/attention/divided-attention',
  '/drills/cognitive/attention/selective-attention',
  '/drills/cognitive/attention/sustained-attention',
  '/drills/cognitive/focus/concentration-grid',
  '/drills/cognitive/focus/distraction-fighter',
  '/drills/cognitive/focus/focus-timer',
  '/drills/cognitive/memory/card-matching',
  '/drills/cognitive/memory/memory-sequence',
  '/drills/cognitive/memory/number-recall',
  '/drills/cognitive/memory/pattern-recognition',
  '/drills/cognitive/problem-solving/logic-puzzles',
  '/drills/cognitive/problem-solving/sudoku',
  '/drills/cognitive/problem-solving/tower-of-hanoi',
  '/drills/cognitive/processing-speed/quick-math',
  '/drills/cognitive/processing-speed/reaction-time',
  '/drills/cognitive/processing-speed/symbol-matching',

  // Academic Drills
  '/drills/academic/comprehension/inference-drill',
  '/drills/academic/comprehension/listening-comprehension',
  '/drills/academic/comprehension/reading-comprehension',
  '/drills/academic/math-speed/arithmetic-race',
  '/drills/academic/math-speed/Math-Reaction',
  '/drills/academic/math-speed/mental-math',
  '/drills/academic/math-speed/multiplication-tables',
  '/drills/academic/reading-speed/peripheral-reader',
  '/drills/academic/reading-speed/rsvp-reader',
  '/drills/academic/reading-speed/speed-reader',
  '/drills/academic/writing-speed/code-typing',
  '/drills/academic/writing-speed/typing-test',

  // Memory Drills
  '/drills/memory/associative-memory/concept-linking',
  '/drills/memory/associative-memory/name-face',
  '/drills/memory/associative-memory/sound-pattern',
  '/drills/memory/long-term-memory/image-association',
  '/drills/memory/long-term-memory/paired-associates',
  '/drills/memory/long-term-memory/story-recall',
  '/drills/memory/short-term-memory/color-sequence',
  '/drills/memory/short-term-memory/digit-span',
  '/drills/memory/short-term-memory/word-recall',
  '/drills/memory/spatial-memory/grid-memorization',
  '/drills/memory/spatial-memory/object-location',
  '/drills/memory/spatial-memory/path-tracing',
  '/drills/memory/working-memory/mental-arithmetic',
  '/drills/memory/working-memory/n-back',
  '/drills/memory/working-memory/sentence-span',

  // Mental Fitness
  '/drills/mental-fitness/breathing-exercises/4-7-8',
  '/drills/mental-fitness/breathing-exercises/box-breathing',
  '/drills/mental-fitness/breathing-exercises/wim-hof',
  '/drills/mental-fitness/stress-control/biofeedback',
  '/drills/mental-fitness/stress-control/calm-under-pressure',
  '/drills/mental-fitness/stress-control/stress-inoculation',

  // Motor Drills
  '/drills/motor/hand-eye-coordination/aim-trainer',
  '/drills/motor/hand-eye-coordination/click-accuracy',
  '/drills/motor/hand-eye-coordination/drag-and-drop',
  '/drills/motor/movement-speed/finger-sequencing',
  '/drills/motor/movement-speed/gesture-speed',
  '/drills/motor/movement-speed/rapid-tapping',
  '/drills/motor/precision-control/fine-motor',
  '/drills/motor/precision-control/steady-hand',
  '/drills/motor/precision-control/tracing',
  '/drills/motor/timing-accuracy/rhythm-tap',
  '/drills/motor/timing-accuracy/stopwatch-click',
  '/drills/motor/timing-accuracy/synchronization',

  // Physical
  '/drills/physical/Balance-Training/dynamic-balance',
  '/drills/physical/Balance-Training/single-leg-hold',
  '/drills/physical/Balance-Training/stability-challenge',
  '/drills/physical/Coordination/complex-pattern',
  '/drills/physical/Coordination/cross-body-movement',
  '/drills/physical/Fitness/agility-ladder',
  '/drills/physical/Fitness/jump-sequence',
  '/drills/physical/Fitness/speed-drill',
  '/drills/physical/Reflex-Training/drop-catch',
  '/drills/physical/Reflex-Training/quick-dodge',
  '/drills/physical/Reflex-Training/reaction-chain',

  // Productivity
  '/drills/productivity/focus-endurance/concentration-stamina',
  '/drills/productivity/focus-endurance/deep-work',
  '/drills/productivity/focus-endurance/flow-state',
  '/drills/productivity/task-switching/context-switch',
  '/drills/productivity/task-switching/multi-tasking',
  '/drills/productivity/task-switching/switch-cost',
  '/drills/productivity/time-management/pomodoro-timer',
  '/drills/productivity/time-management/priority-sorting',
  '/drills/productivity/time-management/time-estimation',
  '/drills/productivity/work-efficiency/batch-processing',

  // Visual Drills
  '/drills/visual/depth-perception/distance-judgment',
  '/drills/visual/peripheral-vision/peripheral-flash',
  '/drills/visual/peripheral-vision/wide-field',
  '/drills/visual/reaction-speed/go/no-go',
  '/drills/visual/reaction-speed/light-reaction',
  '/drills/visual/reaction-speed/sound-reaction',
  '/drills/visual/tracking-accuracy/moving-target',
  '/drills/visual/tracking-accuracy/multiple-targets',
  '/drills/visual/tracking-accuracy/pursuit-tracker',
  '/drills/visual/visual-recognition/difference-spotter',
  '/drills/visual/visual-recognition/entropic-grid',
  '/drills/visual/visual-recognition/rapid-object-id',
  '/drills/visual/visual-recognition/rhythm-anomaly',
  '/drills/visual/visual-recognition/visual-search',
];

async function submitToIndexNow() {
  console.log(`\n🚀 SkillDrills IndexNow - Submitting ${ALL_URLS.length} URLs...\n`);

  const fullUrls = ALL_URLS.map(url => `https://skilldrills.online${url}`);

  // Submit in batches of 100
  const batchSize = 100;
  const batches = [];
  for (let i = 0; i < fullUrls.length; i += batchSize) {
    batches.push(fullUrls.slice(i, i + batchSize));
  }

  const engines = [
    { name: 'Bing', url: 'https://www.bing.com/indexnow' },
    { name: 'Yandex', url: 'https://yandex.com/indexnow' },
    { name: 'Seznam', url: 'https://search.seznam.cz/indexnow' },
  ];

  let totalSuccess = 0;
  let totalFailed = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`📦 Batch ${i + 1}/${batches.length}: ${batch.length} URLs`);

    const payload = {
      host: 'skilldrills.online',
      key: INDEXNOW_KEY,
      keyLocation: 'https://skilldrills.online/indexnow-key.txt',
      urlList: batch,
    };

    for (const engine of engines) {
      try {
        const response = await fetch(engine.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        });

        if (response.ok) {
          totalSuccess++;
          console.log(`   ✅ ${engine.name}: Submitted successfully`);
        } else {
          totalFailed++;
          const text = await response.text();
          console.log(`   ⚠️ ${engine.name}: HTTP ${response.status} - ${text.substring(0, 100)}`);
        }
      } catch (error) {
        totalFailed++;
        console.log(`   ❌ ${engine.name}: ${error.message}`);
      }
    }

    // Delay between batches
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n============================================`);
  console.log(`📊 IndexNow Summary:`);
  console.log(`   URLs Submitted: ${ALL_URLS.length}`);
  console.log(`   Engine Responses: ${totalSuccess} success, ${totalFailed} failed`);
  console.log(`   Time: ${new Date().toISOString()}`);
  console.log(`============================================\n`);
}

submitToIndexNow();