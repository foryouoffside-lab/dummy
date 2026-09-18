import SteadyHandClient from './SteadyHandClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — steady-hand (motor-steady-hand)
// PRIMARY:  "steady hand game"            — Core query (~5,400+ searches/mo)
//           "steady hand test"            — Diagnostic / benchmark intent
// SECONDARY / LSI:
//           "mouse path tracing"          — Kinematic trajectory query
//           "hand steadiness test"        — Clinical / motor stability search
//           "mouse precision test"        — Sensorimotor accuracy query
//           "cursor control test"         — Fine motor coordination phrase
//           "fine motor control test mouse" — Occupational / ergonomic query
//           "mouse steadiness drill"      — Training & practice search
//           "hand tremor test online"     — Neuromotor jitter evaluation
//           "mouse maze game"             — Gamified corridor navigation
//           "corridor tracing game"       — Trajectory-constrained motor task
//           "smooth cursor control"       — Velocity consistency query
// LOCALES:
//           ja: "イライラ棒" (Iraira-bō / Wire Loop Game / Steady Hand Game)
// ============================================================

export const metadata = {
  title: 'Steady Hand Game – Free Online Mouse Steadiness Test',
  description: 'Free online steady hand game. Steer a cursor down a corridor that narrows every lap and measure how far you drift. Grounded in the Accot-Zhai Steering Law.',
  keywords: [
    'steady hand game',
    'steady hand test',
    'mouse path tracing',
    'hand steadiness test',
    'mouse precision test',
    'cursor control test',
    'fine motor control test mouse',
    'mouse steadiness drill',
    'hand tremor test online',
    'mouse maze game',
    'corridor tracing game',
    'smooth cursor control',
  ],
  openGraph: {
    title: 'Steady Hand Game – Free Online Mouse Steadiness Test | SkillDrills',
    description: 'Free online steady hand game. Steer a cursor down a corridor that narrows every lap and measure how far you drift. Grounded in the Accot-Zhai Steering Law.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steady Hand Game – Free Online Mouse Steadiness Test | SkillDrills',
    description: 'Free online steady hand game. Steer a cursor down a corridor that narrows every lap and measure how far you drift. Grounded in the Accot-Zhai Steering Law.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
    languages: getAlternateLanguages('/drills/motor/precision-control/steady-hand'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/' },
    { '@type': 'ListItem', position: 2, name: 'Motor Training', item: 'https://skilldrills.online/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Precision Control', item: 'https://skilldrills.online/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: 'Steady Hand Game', item: 'https://skilldrills.online/drills/motor/precision-control/steady-hand' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Steady Hand Game – Mouse Path Tracing Drill',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based steady hand game and mouse path tracing drill. Trace a dynamically narrowing winding corridor to measure fine motor tremor, trajectory stability, and steering throughput.',
  url: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Steady Hand Circuit Trainer',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires modern web browser with HTML5 Canvas and continuous high-polling pointer support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Steady Hand Game & Motor Precision Drill',
  url: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
  description: 'Online steady hand wire maze game testing fine motor precision, micro-tremor control, and Steering Law speed.',
  genre: ['Precision Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Steady Hand Game and how does it measure motor control?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Steady Hand Game is an interactive neuromotor precision assessment requiring the user to navigate a continuous cursor along a winding corridor without contacting boundary walls. It measures trajectory stability, closed-loop visual feedback efficiency, and physiological tremor amplitude under progressive corridor narrowing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What scientific law governs mouse movement through narrow corridors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Movement through constrained corridors is governed by the Accot-Zhai Steering Law (Accot & Zhai, 1997), an extension of Fitts's Law for trajectory tasks. The law dictates that steering time is proportional to the integral of trajectory length divided by corridor width: narrower paths mathematically force slower velocities to avoid boundary collisions.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my cursor reset to the beginning when touching the corridor wall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The engine conducts continuous point-to-segment Euclidean distance calculations between the pointer coordinates and the center line. If the deviation exceeds half the current corridor width, an instant boundary breach occurs, resetting the cursor to enforce rigorous zero-tolerance motor precision.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does corridor width scale across successive laps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The corridor begins at a wide 50-pixel tolerance on Lap 1 and progressively constricts down to a razor-thin 12-pixel channel at Level 12+. Each completed lap accelerates corridor narrowing, demanding exponentially tighter motor unit coordination and micro-correction suppression.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes hand tremor during precision mouse navigation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Normal physiological tremor (8–12 Hz) is caused by synchronous firing of motor units and mechanical resonance in the limbs. In high-precision tasks, excessive muscle co-contraction (gripping the mouse too tightly), mental stress, or caffeine can amplify tremor amplitude, causing boundary wall strikes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What mouse grip and DPI settings are optimal for the steady hand drill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A relaxed palm or claw grip that allows both forearm gliding and subtle finger micro-adjustments works best. Lower DPI settings (400 to 800 DPI) reduce cursor jitter caused by micro-tremors, allowing smoother closed-loop trajectory steering compared to ultra-high sensitivities.',
      },
    },
    {
      '@type': 'Question',
      name: "How does Woodworth's two-component model apply to path tracing?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Robert S. Woodworth (1899) demonstrated that aimed movements consist of an initial ballistic impulse followed by a current-control feedback phase. In corridor tracing, steering requires uninterrupted closed-loop current control where continuous visual feedback guides minor adjustments before reaching the wall boundary.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can steady hand drills benefit digital artists and surgeons?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Both digital illustration (line art inking, bezier pen tool mastery) and laparoscopic surgery rely heavily on continuous fine motor steadiness, tremor suppression, and closed-loop visual-motor correction across constrained paths.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I prevent muscle fatigue and hand cramping during long sessions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Maintain an ergonomic arm posture with your elbow supported at roughly 90 degrees. Avoid pressing down heavily on the mouse skates, take 60-second micro-breaks between attempts, and consciously exhale during tight hairpin turns to relax your shoulder and forearm muscles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Steady Hand Game compatible with trackballs and stylus drawing tablets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The drill uses Pointer Events API standards, making it fully functional with standard optical mice, high-precision trackballs, and graphics tablet styluses to evaluate hand steadiness across diverse input modalities.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Mouse Steadiness and Corridor Steering',
  description: 'Step-by-step training protocol for navigating narrow corridors, suppressing tremor, and optimizing steering throughput.',
  step: [
    {
      '@type': 'HowToStep',
      "position": 1,
      "url": "https://skilldrills.online/drills/motor/precision-control/steady-hand#step-1",
      name: 'Position Cursor in Start Zone',
      text: 'Click "Start Drill" and place your cursor inside the starting green zone to activate the circuit timer and trace path.',
    },
    {
      '@type': 'HowToStep',
      "position": 2,
      "url": "https://skilldrills.online/drills/motor/precision-control/steady-hand#step-2",
      name: 'Maintain Steady Velocity Along the Path',
      text: 'Glide smoothly along the glowing corridor path. Balance forward speed against precision to stay within the 30-second lap time limit.',
    },
    {
      '@type': 'HowToStep',
      "position": 3,
      "url": "https://skilldrills.online/drills/motor/precision-control/steady-hand#step-3",
      name: 'Anticipate Corners and Choke Points',
      text: 'Decelerate slightly before sharp hairpins to allow closed-loop visual adjustments, then accelerate through straight corridor segments.',
    },
    {
      '@type': 'HowToStep',
      "position": 4,
      "url": "https://skilldrills.online/drills/motor/precision-control/steady-hand#step-4",
      name: 'Clear the Lap to Scale Narrowing Difficulty',
      text: 'Reach the destination safe zone to complete the lap. Each successful lap narrows the corridor width down to 12 pixels for extreme steadiness conditioning.',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'How hand steadiness is measured',
    paragraphs: [
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every target to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same mouse and display rather than against someone else\'s setup. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Steady Hand Corridor Steering Benchmarks',
    description: 'An editorial guide to reading your own result, not measured population norms — SkillDrills collects no aggregate data. The corridor model follows Accot & Zhai (1997); the band boundaries are the drill author\'s own judgement. Columns cover maximum cleared corridor level, mean centerline deviation, and steady steering velocity.',
    columns: ['Tier', 'Rank Title', 'Corridor Level', 'Corridor Width', 'Mean Deviation', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Surgeon',
        stat: 'Level 12+',
        level: '12–15 px',
        accuracy: '< 2.5 px',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Navigator',
        stat: 'Level 9–11',
        level: '16–22 px',
        accuracy: '< 4.0 px',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Steerer',
        stat: 'Level 6–8',
        level: '23–32 px',
        accuracy: '< 6.5 px',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Cursor',
        stat: 'Level 3–5',
        level: '33–42 px',
        accuracy: '< 9.0 px',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Tremor',
        stat: 'Level 1–2',
        level: '43–50 px',
        accuracy: '> 9.0 px',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train hand steadiness',
    description: 'Coaching guidance from the models cited above, for minimizing physiological tremor, optimizing velocity through narrow channels, and mastering closed-loop cursor steering.',
    items: [
      {
        title: 'Protocol 1: Accot-Zhai Steering Law Velocity Regulation (Tunnel Width Pacing)',
        description: 'According to the Accot-Zhai steering law (1997), traversing constrained tunnels requires dynamic velocity scaling inversely proportional to channel width. Accelerate during wide segments to bank lap time, and proactively drop velocity by 40% when entering narrow hairpins.',
      },
      {
        title: 'Protocol 2: Woodworth Continuous Closed-Loop Feedback (Current Control)',
        description: "Leverage Woodworth's (1899) current-control model: focus visual attention approximately 20 to 30 pixels ahead of your cursor rather than directly on the pointer. This feedforward tracking gives your visual cortex ~150 ms to compute corrective submovements before boundary breaches occur.",
      },
      {
        title: 'Protocol 3: Physiological Tremor Attenuation & Joint Decoupling',
        description: 'Isolate long curving strokes to the elbow and forearm while reserving finger flexion solely for micro-trimming. Consciously eliminate death-gripping: excessive agonist-antagonist co-contraction amplifies 8–12 Hz physiological tremor into catastrophic wall collisions.',
      },
      {
        title: 'Protocol 4: Dynamic Narrowing Anticipation & Corner Centering',
        description: 'As corridor widths contract past Level 6 (< 30 px), prioritize exact geometric centering over forward velocity. Entering corners slightly toward the inside apex provides maximum clearance buffer against centrifugal cursor drift.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Steady Hand Training & Motor Precision',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function SteadyHandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <SteadyHandClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
