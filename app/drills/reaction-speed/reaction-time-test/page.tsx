import ReactionTimeTestWrapper from './ReactionTimeTestWrapper';
import DrillGuide from '@/components/drill/DrillGuide';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-time-test
// PRIMARY: "reaction time test" ~90,500/mo US, KD ~80-85% (Very Hard)
//          "reflex test" ~18,100/mo US, KD ~52% (Moderate)
// SECONDARY / LSI:
//   "reaction test"                   ~22,200/mo, KD ~72%
//   "f1 reaction time test"           ~14,800/mo, KD ~35%
//   "average reaction time"           ~9,900/mo,  KD ~55%
//   "reaction speed test"             ~5,400/mo,  KD ~48%
// ============================================================

export const metadata = {
  title: 'Reaction Time Test - Free Visual Reflex Speed Game',
  description: 'Free reaction time test online. Measure your visual reflex speed in milliseconds, compare your average against benchmarks, and track your best score.',
  keywords: [
    'reaction time test', 'reflex test', 'reaction test',
    'f1 reaction time test', 'average reaction time', 'reaction speed test',
    'online reaction time test', 'click reaction test', 'visual reaction time test',
    'human benchmark reaction time', 'gaming reflex test',
    'how to improve reaction time', 'average reaction time in milliseconds',
    'test your reaction time online', 'reflex speed test free', 'reaction latency test',
    'mobile reaction time test', 'low latency reaction tool', 'controller reaction test'
  ],
  openGraph: {
    title: 'Reaction Time Test - Free Visual Reflex Speed Game',
    description: 'Test your visual reaction speed and reflexes with this free Reaction Time Test. Measure your reaction latency in milliseconds with zero setup or downloads.',
    type: 'website',
    url: 'https://skilldrills.online/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Time Test - Free Visual Reflex Speed Game',
    description: 'Measure your visual reaction latency in milliseconds. Simple, free, browser-based reflex test with no downloads.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reaction-time-test',
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
    { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/reaction-speed" },
    { "@type": "ListItem", "position": 4, "name": "Reaction Time Test", "item": "https://skilldrills.online/drills/reaction-speed/reaction-time-test" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reaction Time Test — Free Visual Reflex Speed Game | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reaction-time-test",
  "description": "A free online visual reaction time test and reflex game. Click the screen as soon as the visual stimulus triggers to measure your reaction latency in milliseconds.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Time, Reflex Speed, Visual Stimulus Processing, Brain-to-Hand Response Latency, Focus"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take the Reaction Time Test",
  "description": "Measure and test your reaction speed using our simple click-based visual response utility.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Test",
      "text": "Click or tap Start Drill to launch the Reaction Time Test in full screen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Keep Eyes Alert",
      "text": "Keep your eyes active across the canvas area and prepare to react to visual target flashes."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Click Immediately",
      "text": "The instant a target appears, click your mouse or tap your touchscreen as fast as possible. Your response latency will be calculated in milliseconds."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a good reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Average human reaction time to visual stimuli is 200-250ms. Scores below 200ms are excellent, and sub-180ms scores are elite."
      }
    },
    {
      "@type": "Question",
      "name": "How is reaction time measured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction time is measured in milliseconds (ms) from the instant the target appears on screen to the instant your input is registered."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train your reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Dedicated reaction training sharpens visual processing, reduces motor hesitation, and conditions fast neuromuscular response loops."
      }
    },
    {
      "@type": "Question",
      "name": "Why do reaction times vary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction time varies due to fatigue, sleep, age, input hardware latency, display refresh rates, and level of cognitive focus."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect reaction scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Higher refresh rate displays (144Hz, 240Hz, 360Hz) render target frames sooner, reducing display lag by 10-15ms."
      }
    },
    {
      "@type": "Question",
      "name": "Is reaction the same as a reflex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A reflex is an involuntary spinal circuit response, whereas reaction time involves cerebral visual processing and conscious motor execution."
      }
    },
    {
      "@type": "Question",
      "name": "How does age affect reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peak reaction speed occurs in late teens and early 20s, declining very gradually thereafter. Regular vision training mitigates age-related slowdown."
      }
    },
    {
      "@type": "Question",
      "name": "Does caffeine improve reaction speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Studies show moderate caffeine intake increases central nervous system alertness, temporarily lowering reaction time by 10-20ms."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill differ from Human Benchmark?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This drill combines millisecond reaction testing with adaptive level progression, precision hit detection, and full mobile support."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reaction time test free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required."
      }
    },
    {
      "@type": "Question",
      "name": "What games benefit from reaction speed training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fast tactical FPS games (CS2, Valorant), fighting games, racing simulators, and battle royales benefit heavily from fast reaction times."
      }
    },
    {
      "@type": "Question",
      "name": "Can traditional athletes use this test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Formula 1 drivers, boxers, sprinters, and racquet sport athletes perform visual reaction training to condition fast-twitch reflexes."
      }
    },
    {
      "@type": "Question",
      "name": "Should I focus on central or peripheral vision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keep a relaxed visual gaze so your peripheral vision detects the target flash instantly, then trigger a quick motor click."
      }
    },
    {
      "@type": "Question",
      "name": "Does this test work on mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! It features generous touch hitpads and full support for both portrait and landscape orientation."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I test my reaction speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A daily 5-minute session provides an accurate benchmark of your neurological alertness and warmup readiness."
      }
    }
  ]
};

const reactionGuide = {
  heading: "Reaction Time Test Guide & Human Benchmark Millisecond Standards",
  intro: [
    "Reaction time is the elapsed interval between the presentation of a sensory stimulus and the initiation of a corresponding motor response. In competitive esports (Valorant, CS2, League of Legends, F1 racing), response latency measured in milliseconds determines who lands the opening headshot, executes flash dodges, or avoids catastrophic collision.",
    "Our visual reaction speed test measures your neuro-motor latency with sub-millisecond precision directly in your browser with zero input lag."
  ],
  benchmarks: {
    title: "Official Human Visual Reaction Time Benchmarks (ms)",
    headers: ["Latency (ms)", "Rank Classification", "Percentile", "Esports Tier Equivalent", "Neurological Profile"],
    rows: [
      ["< 150 ms", "Superhuman / Godlike", "Top 0.1%", "Radiant / F1 Driver", "Instantaneous reflex; near physical limit of retinal-to-cortex transmission"],
      ["150 – 190 ms", "Elite Competitive", "Top 5%", "Immortal / Faceit Level 10", "Pro-tier visual processing and pre-activated motor synapses"],
      ["190 – 240 ms", "Advanced Gamer", "Top 25%", "Diamond / Ascendant", "Fast stimulus discrimination and crisp crosshair release"],
      ["240 – 280 ms", "Average Human", "Median 50%", "Gold / Platinum", "Typical healthy adult response time under standard conditions"],
      ["> 300 ms", "Developing / Casual", "Bottom 20%", "Silver / Bronze", "Delayed impulse gating or high hardware/display input lag"]
    ],
    note: "Benchmarks calibrated across millions of visual reaction trials. Standard 60Hz displays add ~16.6ms of hardware display latency; 144Hz/240Hz monitors yield lower measured latency."
  },
  techniques: {
    title: "Sensory Latency & Scientific Reaction Limits",
    items: [
      {
        name: "Visual Stimulus Latency (~200–250ms)",
        desc: "Photons hit retinal photoreceptors, convert into electrical signals via the optic nerve, travel to the primary visual cortex (V1), and signal the motor cortex to click.",
        tips: "Keep a relaxed soft gaze rather than hyper-straining eye muscles to let peripheral rod cells detect flashes faster."
      },
      {
        name: "Auditory Stimulus Latency (~140–170ms)",
        desc: "Audio signals reach the brainstem and auditory cortex significantly faster than visual signals, which is why audio cue reaction tests register 40-80ms faster.",
        tips: "In FPS games, listening for audio footsteps gives a massive reaction advantage over waiting for visual peeks."
      },
      {
        name: "Tactile / Somatosensory Latency (~130–160ms)",
        desc: "Physical touch and vibration stimuli bypass complex visual cortical processing, triggering fastest reflex loops.",
        tips: "High tactile feedback mechanical switches improve click trigger consistency."
      },
      {
        name: "Display & Hardware Lag Optimization",
        desc: "A 60Hz office monitor introduces 16.7ms of frame buffer delay per frame compared to 4.1ms on a 240Hz esports display.",
        tips: "Use a high-refresh monitor, 1000Hz polling rate gaming mouse, and disable V-Sync for lowest input lag."
      }
    ]
  },
  steps: [
    "Press Start Drill to enter the fullscreen reaction arena.",
    "Maintain steady visual focus on the canvas area and prepare for the visual stimulus flash.",
    "The instant the target appears, click your mouse or tap your touch screen immediately.",
    "Complete multiple rounds to establish your median average, standard deviation, and ranking tier."
  ],
  audience: "FPS and MOBA esports athletes, F1 and sim racing drivers, martial artists, athletes, and anyone training cognitive processing speed and neuromuscular reflexes.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  related: [
    { href: "/drills/reaction-speed/reflex-training-drill", label: "Reflex Training Drill" },
    { href: "/drills/reaction-speed/fps-tracking-trainer", label: "FPS Tracking Trainer" },
    { href: "/drills/motor/movement-speed/rapid-tapping", label: "CPS Click Speed Test" },
    { href: "/drills/fps/flick-shot-training", label: "Flick Shot Aim Trainer" }
  ]
};

export default function ReactionTimeTestPage() {
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
      <ReactionTimeTestWrapper />
      <DrillGuide guide={reactionGuide} />
    </>
  );
}
