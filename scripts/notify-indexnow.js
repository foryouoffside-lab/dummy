// scripts/notify-indexnow.js
// Automatically notifies search engines after deployment

const INDEXNOW_KEY = 'c8f7a3b2e1d4f5a6b7c8d9e0f1a2b3c4';

// All URLs to submit
const ALL_URLS = [
  '/',
  '/drills',
  '/drills/academic',
  '/drills/cognitive',
  '/drills/fps',
  '/drills/memory',
  '/drills/mental-fitness',
  '/drills/motor',
  '/drills/physical',
  '/drills/productivity',
  '/drills/visual',
  '/drills/visual-tracking',
  '/drills/academic/comprehension/inference-drill',
  '/drills/academic/comprehension/listening-comprehension',
  '/drills/academic/comprehension/reading-comprehension',
  '/drills/academic/math-speed/Math-Reaction',
  '/drills/academic/math-speed/arithmetic-race',
  '/drills/academic/math-speed/mental-math',
  '/drills/academic/math-speed/multiplication-tables',
  '/drills/academic/reading-speed/peripheral-reader',
  '/drills/academic/reading-speed/rsvp-reader',
  '/drills/academic/reading-speed/speed-reader',
  '/drills/academic/writing-speed/code-typing',
  '/drills/academic/writing-speed/typing-test',
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
  '/drills/fps/180-degree-awareness',
  '/drills/fps/angle-hold-trainer',
  '/drills/fps/counter-strafe-trainer',
  '/drills/fps/deadzone-jiggle-snap',
  '/drills/fps/evasive-slide-track',
  '/drills/fps/flick-shot-training',
  '/drills/fps/headshot-micro-adjust',
  '/drills/fps/high-speed-kinetic-trainer',
  '/drills/fps/instant-response',
  '/drills/fps/micro-flick-burst',
  '/drills/fps/micro-flick-precision',
  '/drills/fps/parabolic-air-track',
  '/drills/fps/pixel-hold-swing',
  '/drills/fps/prefire-corner-clearer',
  '/drills/fps/pro-smooth-pursuit',
  '/drills/fps/pro-tracking',
  '/drills/fps/pubg-dmr-rhythm',
  '/drills/fps/pubg-drive-by',
  '/drills/fps/pubg-lead-drop',
  '/drills/fps/reactive-sphere-tracking',
  '/drills/fps/recoil-control',
  '/drills/fps/sound-spatial-reflex',
  '/drills/fps/strafe-tracking',
  '/drills/fps/target-acquisition',
  '/drills/fps/target-prioritization',
  '/drills/fps/target-switching-swarm',
  '/drills/fps/vertical-air-pursuit',
  '/drills/fps/vertical-air-track',
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
  '/drills/mental-fitness/breathing-exercises/4-7-8',
  '/drills/mental-fitness/breathing-exercises/box-breathing',
  '/drills/mental-fitness/breathing-exercises/wim-hof',
  '/drills/mental-fitness/stress-control/biofeedback',
  '/drills/mental-fitness/stress-control/calm-under-pressure',
  '/drills/mental-fitness/stress-control/stress-inoculation',
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
  '/drills/physical/balance-training/dynamic-balance',
  '/drills/physical/balance-training/single-leg-hold',
  '/drills/physical/balance-training/stability-challenge',
  '/drills/physical/coordination/complex-pattern',
  '/drills/physical/coordination/cross-body-movement',
  '/drills/physical/fitness/agility-ladder',
  '/drills/physical/fitness/jump-sequence',
  '/drills/physical/fitness/speed-drill',
  '/drills/physical/reflex-training/drop-catch',
  '/drills/physical/reflex-training/quick-dodge',
  '/drills/physical/reflex-training/reaction-chain',
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
  '/drills/visual-tracking/barrier-sequence-pursuit',
  '/drills/visual-tracking/circular-pursuit',
  '/drills/visual-tracking/constant-slow-pursuit',
  '/drills/visual-tracking/directional-chaos-pursuit',
  '/drills/visual-tracking/dynamic-evasion-pursuit',
  '/drills/visual-tracking/ghosting-suppress-pursuit',
  '/drills/visual-tracking/infinity-pursuit',
  '/drills/visual-tracking/market-doors-pursuit',
  '/drills/visual-tracking/momentum-teleport-pursuit',
  '/drills/visual-tracking/peripheral-ping-pursuit',
  '/drills/visual-tracking/predictive-pursuit',
  '/drills/visual-tracking/reaction-simulator',
  '/drills/visual-tracking/reactive-strafe-pursuit',
  '/drills/visual-tracking/saccadic-gallery',
  '/drills/visual-tracking/saccadic-snap',
  '/drills/visual-tracking/sine-wave-pursuit',
  '/drills/visual-tracking/slide-dash-acceleration',
  '/drills/visual-tracking/slow-precision-tracking',
  '/drills/visual-tracking/spatial-shift-pursuit',
  '/drills/visual-tracking/split-screen-tracking',
  '/drills/visual-tracking/staircase-step',
  '/drills/visual-tracking/stop-and-go-dash',
  '/drills/visual-tracking/strobe-prediction-pursuit',
  '/drills/visual-tracking/triangular-pursuit',
  '/drills/visual-tracking/zig-zag-path-pursuit',
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