import ReactionTimeTestWrapper from './ReactionTimeTestWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-time-test
// PRIMARY: "reaction time test" — 8,223 exact / 8,350 broad US, 1,229 exact GB (Bing API 2026-09-04)
//          "reflex test"        — 127 exact / 190 broad US, 17 exact GB (Bing API 2026-09-04)
// SECONDARY / LSI:
//   "reaction speed test"   — 594 exact / 594 broad US, 106 exact GB (Bing API 2026-09-04)
//   "average reaction time" — 209 exact / 288 broad US, 45 exact GB (Bing API 2026-09-04)
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
  // hreflang is emitted again now that ko and ja locale pages exist for this route.
  // getAlternateLanguages() is route-aware -- it consults ROUTE_LOCALES and so
  // lists only the locales that actually have a page.js, never the full six.
  // Keep this in step with the locale pages: hreflang must be reciprocal, and
  // the localized pages already point back here, so dropping it silently voids
  // the annotation on both sides.
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reaction-time-test',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-time-test'),
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
  "dateModified": "2026-09-05",
  "description": "A free online visual reaction time test and reflex game. Measure your reaction latency and interval estimation accuracy in milliseconds.",
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
  "description": "Measure and train your visual reaction speed and mental chronometry using high-resolution millisecond tracking.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Drill",
      "text": "Click or tap Start Drill to enter the fullscreen reaction test arena.",
      "url": "https://skilldrills.online/drills/reaction-speed/reaction-time-test#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Memorize Target Interval",
      "text": "Observe the target millisecond duration displayed on screen before the timing sequence begins.",
      "url": "https://skilldrills.online/drills/reaction-speed/reaction-time-test#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Click on Cue",
      "text": "Click your mouse or tap your touchscreen at the exact instant the cue triggers to register your response latency.",
      "url": "https://skilldrills.online/drills/reaction-speed/reaction-time-test#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Analyze Latency & Tier",
      "text": "Complete multiple rounds to establish your median latency, standard deviation, and gamer tier rating.",
      "url": "https://skilldrills.online/drills/reaction-speed/reaction-time-test#step-4"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Reaction Time Test",
  "alternateName": ["Reaction Speed Test", "Reflex Test", "Human Benchmark Reaction Time"],
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "High-precision web browser visual reaction time test and reflex game tracking millisecond response latency.",
  "softwareVersion": "2.0"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Reaction Time Test - Free Visual Reflex Speed Game",
  "url": "https://skilldrills.online/drills/reaction-speed/reaction-time-test",
  "description": "Measure and train your visual reaction speed in milliseconds with zero setup or downloads.",
  "genre": ["Reflex Game", "Action", "Esports Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a good reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Average human reaction time to visual stimuli is approximately 200–250 ms (Kosinski, 2008), while auditory reaction time averages 140–160 ms (Jain et al., 2015). Latencies below 200 ms represent elite visual processing and optimized low-latency hardware."
      }
    },
    {
      "@type": "Question",
      "name": "How is reaction time measured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction time is measured in milliseconds (ms) from stimulus presentation to registered input using high-resolution performance.now() timestamps. Measured latency includes biological neural transmission plus display refresh quantization and peripheral input polling lag (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train your reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Action video game players and dedicated drill trainees demonstrate significant reductions in visual reaction latency without sacrificing accuracy, reflecting improved neural processing efficiency and motor preparation (Dye, Green, & Bavelier, 2009)."
      }
    },
    {
      "@type": "Question",
      "name": "Why do reaction times vary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction times fluctuate due to sleep deprivation, circadian arousal, cognitive fatigue, age, input hardware latency, display refresh rates, and level of focused attention."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect reaction scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Standard 60 Hz monitors draw a new frame every 16.67 ms, introducing up to 16.7 ms of display quantization delay. Higher refresh rates (144 Hz at 6.94 ms, 240 Hz at 4.17 ms) deliver visual stimuli sooner, reducing measured latency."
      }
    },
    {
      "@type": "Question",
      "name": "Is reaction the same as a reflex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. A reflex is an involuntary spinal circuit (e.g. patellar tendon stretch reflex) taking 20–50 ms that bypasses conscious brain processing. Reaction time involves sensory cortical reception, cognitive evaluation, and voluntary motor signaling (150–250+ ms)."
      }
    },
    {
      "@type": "Question",
      "name": "Why is auditory reaction time faster than visual reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auditory signals reach the brainstem auditory nuclei and cortex in 8–10 ms, whereas retinal phototransduction and visual cortical transmission take 20–40 ms. Consequently, human auditory response is consistently 30–50 ms faster than visual response (Shelton & Kumar, 2010)."
      }
    },
    {
      "@type": "Question",
      "name": "How does age affect reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple reaction time generally peaks between ages 18 and 24, slowing by approximately 2–6 ms per decade thereafter (Der & Deary, 2006). Regular cardiovascular exercise and cognitive reaction practice help preserve neuromuscular speed."
      }
    },
    {
      "@type": "Question",
      "name": "Does caffeine improve reaction speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Moderate caffeine intake blocks central nervous system adenosine receptors, increasing cortical arousal and temporarily reducing reaction times by 10–20 ms (Smith, 2002)."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill differ from Human Benchmark?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While Human Benchmark tests simple red-to-green reaction clicks, this drill tests mental chronometry and interval estimation—training you to eliminate motor anticipation, steady trigger control, and maintain focus across progressive difficulty levels."
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
  heading: "Reaction Time Test Guide & Mental Chronometry Standards",
  intro: [
    "Reaction time is the elapsed interval between sensory stimulus presentation and motor response execution. In competitive esports (Valorant, CS2, League of Legends) and motorsports, response latency measured in milliseconds determines who lands the opening shot, executes defensive flashes, or reacts to sudden track hazards.",
    "This drill trains visual temporal estimation and mental chronometry using high-precision performance.now() browser timestamps. By memorizing target intervals and triggering your click at the exact elapsed moment, you calibrate your internal neural clock and condition motor response consistency.",
    "Timing Methodology: All measurements are captured client-side using the high-resolution performance.now() API. Hardware latency adds display quantization delay (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz, ~4.1 ms at 240 Hz) and USB polling intervals (~8 ms at 125 Hz vs ~1 ms at 1000 Hz), as documented by Woods et al. (2015). For the lowest measurement overhead, use a high-refresh display and high-polling gaming mouse.",
    "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
  ],
  benchmarks: {
    title: "Visual Reaction Time Reference Tiers (ms)",
    headers: ["Latency / Error (ms)", "Classification", "Esports Tier Equivalent", "Neurological Profile"],
    rows: [
      ["< 150 ms", "Superhuman / Godlike", "Radiant / F1 Driver", "Sub-second timing mastery or anticipation; near physiological transmission limits"],
      ["150 – 190 ms", "Elite Competitive", "Immortal / Faceit Level 10", "Pro-tier visual processing and pre-activated motor synapses"],
      ["190 – 240 ms", "Advanced Gamer", "Diamond / Ascendant", "Fast stimulus discrimination and crisp crosshair release"],
      ["240 – 280 ms", "Average Human Baseline", "Gold / Platinum", "Typical healthy adult visual response time (Kosinski, 2008) under standard 60Hz displays"],
      ["> 300 ms", "Developing / Casual", "Silver / Bronze", "Delayed impulse gating, motor hesitation, or high display/hardware input lag"]
    ],
    note: "These performance tiers provide an editorial reference benchmark based on human chronometry literature (Kosinski, 2008; Woods et al., 2015). Standard 60Hz displays introduce ~16.7ms of display buffer delay per frame; 144Hz and 240Hz monitors reduce hardware frame latency."
  },
  techniques: {
    title: "Sensory Latency & Scientific Reaction Limits",
    items: [
      {
        name: "Visual Stimulus Latency (~200–250ms)",
        desc: "Photons hit retinal photoreceptors, convert into electrical signals via the optic nerve, travel to the primary visual cortex (V1), and signal the motor cortex to click (Kosinski, 2008).",
        tips: "Keep a relaxed soft gaze rather than hyper-straining eye muscles to let peripheral rod cells detect flashes faster."
      },
      {
        name: "Auditory Stimulus Latency (~140–170ms)",
        desc: "Audio signals reach the brainstem and auditory cortex significantly faster than visual signals, which is why audio cue reaction tests register 30–50ms faster (Shelton & Kumar, 2010; Jain et al., 2015).",
        tips: "In FPS games, listening for audio footsteps gives a massive reaction advantage over waiting for visual peeks."
      },
      {
        name: "Tactile / Somatosensory Latency (~130–160ms)",
        desc: "Physical touch and vibration stimuli bypass complex visual cortical processing, triggering fastest reflex loops.",
        tips: "High tactile feedback mechanical switches improve click trigger consistency."
      },
      {
        name: "Display & Hardware Lag Optimization",
        desc: "A 60Hz office monitor introduces 16.7ms of frame buffer delay per frame compared to 4.1ms on a 240Hz esports display (Woods et al., 2015).",
        tips: "Use a high-refresh monitor, 1000Hz polling rate gaming mouse, and disable V-Sync for lowest input lag."
      }
    ]
  },
  steps: [
    "Press Start Drill to enter the fullscreen reaction arena.",
    "Observe and memorize the target interval displayed before the clock begins.",
    "Click your mouse or tap your touch screen at the exact moment the target interval elapses.",
    "Complete multiple rounds to establish your median latency, standard deviation, and consistency grade."
  ],
  audience: "FPS and MOBA esports athletes, F1 and sim racing drivers, martial artists, athletes, and anyone training cognitive processing speed and neuromuscular reflexes.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('kosinski2008', 'woods2015', 'jain2015', 'shelton2010', 'dye2009', 'der2006', 'smith2002'),
  related: [
    { href: "/drills/reaction-speed/reflex-training-drill", label: "Reflex Training Drill" },
    { href: "/drills/reaction-speed/reaction-game", label: "Reaction Game" },
    { href: "/drills/reaction-speed/fps-tracking-trainer", label: "FPS Tracking Trainer" },
    { href: "/drills/motor/movement-speed/rapid-tapping", label: "CPS Test & Click Speed Test" },
    { href: "/drills/fps/flick-shot-training", label: "Flick Shot Trainer" }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReactionTimeTestWrapper copy={{ title: 'Reaction Time Test' }} />
      <DrillGuide guide={reactionGuide} />
      <DrillFooter />
    </>
  );
}
