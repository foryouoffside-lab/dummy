import SynchronizationClient from './SynchronizationClient';

// ============================================================
// SEO RESEARCH FINDINGS — synchronization
// Primary: "timing game online" ~8,200/mo US, KD ~28% (Medium)
// Long-tail winners (Easy / Very Easy):
//   "visual timing test online"      ~1,100/mo, KD ~14%
//   "click timing game browser"      ~920/mo,   KD ~11%
//   "online timing game no download" ~750/mo,   KD ~10%
//   "timing accuracy test"           ~480/mo,   KD ~12%
//   "synchronization game free"      ~420/mo,   KD ~9%
//   "bar alignment game"             ~310/mo,   KD ~6%
//   "sensorimotor synchronization test" ~140/mo, KD ~8%
// Competitors: Human Benchmark, Senwitt, PlayBrain, Bemuse, CrazyGames
//   — none offer survival + predictive timing mechanics
// PAA targets: "What is a timing game?", "How do I improve timing in games?",
//   "What is sensorimotor synchronization?", "Is visual synchronization the same
//   as reaction time?", "What games improve timing and rhythm?",
//   "Can timing drills improve gaming performance?"
// Key entities: sensorimotor synchronization, visuomotor, Interactive Metronome,
//   NeuroTracker, predictive timing, peeker's advantage, motor timing drill
// ============================================================

export const metadata = {
  title: 'Timing Game Online - Free Visual Synchronization Test | SkillDrills',
  description: 'Play the free visual synchronization timing game online. Click when converging bars align to survive. Train sensorimotor timing, predictive reaction, and motor accuracy in your browser — no download needed.',
  keywords: [
    // Primary targets
    'timing game online', 'visual timing test', 'timing accuracy test',
    // Long-tail opportunities
    'visual synchronization test', 'click timing game browser', 'online timing game no download',
    'synchronization game free', 'bar alignment game', 'sensorimotor synchronization test',
    // Secondary / LSI
    'rhythm game online', 'timing precision drill', 'motor timing training',
    'visual reaction time test', 'reaction time benchmark', 'Human Benchmark alternative',
    // Gamer / esports segment
    'predictive timing training', "peeker's advantage timing", 'Valorant timing drill',
    'CS2 counter-strafe timing', 'hand eye coordination game',
    // Academic / brain training segment
    'visuomotor synchronization', 'brain timing game', 'cognitive motor training online',
    'Interactive Metronome alternative', 'timing and rhythm brain training'
  ],
  openGraph: {
    title: 'Timing Game Online - Free Visual Synchronization Test',
    description: 'Click when converging bars align. Free browser timing game training sensorimotor synchronization, predictive reaction, and motor accuracy. No download needed.',
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/timing-accuracy/synchronization',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Visual Synchronization Timing Game — SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timing Game Online - Free Visual Synchronization Test',
    description: 'Train sensorimotor timing, predictive reaction, and motor accuracy free in your browser. Click when the bars align to survive.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/synchronization',
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
    { "@type": "ListItem", "position": 3, "name": "Timing Accuracy", "item": "https://skilldrills.online/drills/motor/timing-accuracy" },
    { "@type": "ListItem", "position": 4, "name": "Visual Synchronization Timing Game", "item": "https://skilldrills.online/drills/motor/timing-accuracy/synchronization" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Visual Synchronization Timing Game — SkillDrills",
  "url": "https://skilldrills.online/drills/motor/timing-accuracy/synchronization",
  "description": "Free browser timing game training sensorimotor synchronization. Converging bars approach a center line — click at the perfect moment to score. Features endless difficulty scaling, survival mechanics, and millisecond-level accuracy feedback.",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript enabled.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Sensorimotor Synchronization, Predictive Timing, Visual Timing Accuracy, Motor Timing, Hand-Eye Coordination"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Visual Synchronization Timing Game",
  "description": "Train sensorimotor synchronization and predictive timing using the SkillDrills convergence bar game.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Watch the converging bars",
      "text": "Two bars start from opposite sides and move inward toward a fixed center line. Watch their speed and anticipate exactly when they will overlap."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Click at the moment of alignment",
      "text": "Click (or tap) the instant both bars perfectly overlap the center line. A Perfect Sync = within 10ms of the exact alignment point. Early or late clicks register lower accuracy and deduct survival time."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Survive and level up",
      "text": "Your clock starts at 60 seconds. Accurate clicks add time; misses remove it. Every 100 points triggers a Level Up — bars accelerate and tolerance windows shrink, pushing your sensorimotor timing to its limit."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a timing game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A timing game is a digital exercise that tests your ability to perform an action at a precise moment. Unlike simple reaction time tests that respond to random events, timing games require prediction — you see the stimulus coming and must plan your click at the exact millisecond of alignment. This trains sensorimotor synchronization, the brain's ability to couple motor actions to external rhythmic events."
      }
    },
    {
      "@type": "Question",
      "name": "How is this different from a standard reaction time test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard reaction time test (like Human Benchmark) measures how fast you respond to an unpredictable stimulus — you don't know when it will appear. This synchronization timing game tests predictive reaction: you see the bars moving, must calculate their convergence point, and click at that exact moment. It trains a different neural pathway — the predictive motor system, not just the reflexive system."
      }
    },
    {
      "@type": "Question",
      "name": "What is sensorimotor synchronization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sensorimotor synchronization (SMS) is the scientific term for the human ability to coordinate motor actions (like clicking or tapping) with external rhythmic stimuli (like converging bars or a metronome beat). Research shows auditory SMS is typically more precise than visual SMS. Training visual sensorimotor synchronization — as in this drill — can improve timing accuracy in music, sports, and gaming."
      }
    },
    {
      "@type": "Question",
      "name": "Is visual synchronization the same as reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Reaction time measures simple stimulus-response speed (see signal, click fast). Visual synchronization measures your ability to precisely time an action to a predictable moving event. Synchronization uses predictive motor planning — your brain anticipates the alignment point and pre-programs the click — rather than purely reflexive neural pathways."
      }
    },
    {
      "@type": "Question",
      "name": "How does the survival scoring system work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You start with 60 seconds. Accurate clicks reward bonus time and score multipliers. Perfect Syncs (within 10ms) give the maximum reward. Misses deduct time from your clock. The goal is to survive as long as possible while accumulating combo streaks that multiply your score."
      }
    },
    {
      "@type": "Question",
      "name": "What games can timing drills improve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Timing drills benefit a wide range of competitive contexts: FPS gamers use timing accuracy for peeker's advantage in Valorant and CS2 (clicking at the precise moment a target crosses a gap); musicians use it to lock timing with a beat; athletes use motor timing for anticipatory movement. The same predictive timing neural system underlies all of these."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scale in this timing game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 100 points triggers a Level Up. Each level increases the bar convergence speed, shrinks the hit-tolerance window (tightening the timing precision required), and eliminates pauses between rounds. There is no hard cap — the game continues accelerating until you exhaust your time clock."
      }
    },
    {
      "@type": "Question",
      "name": "Is this an alternative to the Interactive Metronome or Human Benchmark?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It covers different ground than both. The Interactive Metronome (IM) uses auditory feedback to improve neural timing, typically in rehabilitation contexts. Human Benchmark tests simple reaction speed. This visual synchronization game trains visual-motor timing with escalating survival mechanics, millisecond feedback, and combo scoring — more akin to rhythm game mechanics combined with brain training."
      }
    },
    {
      "@type": "Question",
      "name": "Is this timing game free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — 100% free, no download, no account required. It runs directly in any modern desktop or mobile browser and is part of the free SkillDrills training suite."
      }
    }
  ]
};

export default function SynchronizationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SynchronizationClient />
    </>
  );
}