import TracingClient from './TracingClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — tracing (motor-tracing)
// PRIMARY:  "mouse tracing game"          — Core query (~3,600+ searches/mo)
//           "mouse tracking game"         — Tracking / aim training synonym
// SECONDARY / LSI:
//           "wave tracing game"           — Trajectory filament term
//           "cursor tracing game"         — Pointer path following query
//           "mouse tracking exercise"     — Skill drill / training search
//           "cursor tracking drill"       — Kinematic tracking phrase
//           "smooth mouse movement"       — Motor control & smoothness query
//           "smooth cursor game"          — Flow state / precision game
//           "flow state training game"    — Cognitive-motor focus search
//           "mouse precision training"    — Fine motor coordination
//           "fine motor control game"     — Clinical / occupational term
//           "aim smoothing game"          — FPS smoothness routine
//           "smooth pursuit training"     — Psychophysics / visual tracking
// LOCALES:
//           ja: "マウス トレース ゲーム" (Mouse Tracing Game / Cursor Tracking)
//           ko: "마우스 트레이싱 게임" (Mouse Tracing Game / Wave Tracking)
//           de: "maus tracing spiel" (Mouse Tracing Game / Tracking Drill)
// ============================================================

export const metadata = {
  title: 'Mouse Tracing Game – Free Wave Tracking & Precision Drill',
  description: 'Free online mouse tracing game. Follow a moving wave with your cursor to train smooth pursuit tracking and fine cursor control. No sign-up.',
  keywords: [
    'mouse tracing game',
    'mouse tracking game',
    'wave tracing game',
    'cursor tracing game',
    'mouse tracking exercise',
    'cursor tracking drill',
    'smooth mouse movement',
    'smooth cursor game',
    'flow state training game',
    'mouse precision training',
    'fine motor control game',
    'aim smoothing game',
    'smooth pursuit training',
  ],
  openGraph: {
    title: 'Mouse Tracing Game – Free Wave Tracking & Precision Drill | SkillDrills',
    description: 'Free online mouse tracing game. Follow a moving wave with your cursor to train smooth pursuit tracking and fine cursor control. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mouse Tracing Game – Free Wave Tracking & Precision Drill | SkillDrills',
    description: 'Free online mouse tracing game. Follow a moving wave with your cursor to train smooth pursuit tracking and fine cursor control. No sign-up.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/tracing',
    languages: getAlternateLanguages('/drills/motor/precision-control/tracing'),
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
    { '@type': 'ListItem', position: 4, name: 'Mouse Tracing Game', item: 'https://skilldrills.online/drills/motor/precision-control/tracing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Mouse Tracing Game – Wave Tracking Precision Trainer',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based mouse tracing game and smooth pursuit tracking drill. Follow an accelerating continuous wave filament with a 22px tolerance band to measure fine motor steadiness, velocity modulation, and flow integrity.',
  url: 'https://skilldrills.online/drills/motor/precision-control/tracing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Wave Tracing Trainer',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires modern web browser with HTML5 Canvas and continuous high-polling pointer input',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/motor/precision-control/tracing',
  dateModified: '2026-09-05',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Mouse Tracing Game and how does it evaluate motor control?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Mouse Tracing Game is an interactive neuromotor tracking assessment where users follow a continuously scrolling sinusoidal wave filament with their cursor within a 22-pixel tolerance corridor. It evaluates dynamic hand steadiness, smooth pursuit velocity matching, closed-loop error correction latency, and flow state endurance over a 45-second test.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does the wave continuously scroll instead of waiting for user input?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Continuous motion forces active kinematic engagement. In static drills, users can freeze to regain composure; in the Mouse Tracing Game, the wave never halts, demanding continuous forward prediction, smooth pursuit ocular tracking, and immediate micro-corrections whenever the cursor drifts off-line.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Flow Integrity and how is the 0–100% metric calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flow Integrity represents your real-time tracking consistency. It increases continuously during frames where your crosshair remains centered within the 22px tolerance zone and decays progressively when off-path. Maintaining a high percentage reflects sustained neuromuscular lock-on.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does scroll speed and wave amplitude ramp up during the 45-second drill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The session initiates at a baseline scroll velocity of 2.2 px/frame with a 90px vertical amplitude. Over the 45-second duration, velocity accelerates up to 4.5+ px/frame while secondary harmonic oscillations increase vertical displacement to 125px, testing higher motor unit firing rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'What scientific models explain continuous trajectory tracking in HCI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Dynamic corridor following is modeled by the Accot-Zhai Steering Law (Accot & Zhai, 1997) and Robert Woodworth's (1899) two-component motor model. Steering through narrow, shifting corridors requires uninterrupted closed-loop current control where visual feedback corrects submovements every 150 to 200 ms.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do smooth pursuit eye movements differ from corrective saccades during tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As demonstrated by Krauzlis (2004) and Rashbass (1961), smooth pursuit eye movements match target velocity continuously, while saccades are rapid ballistic jumps. When drifting off the wave, the visual cortex initiates a catch-up saccade followed by deceleration to re-engage smooth pursuit without overshooting the 22px boundary.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does mouse tracing transfer to competitive FPS games like Apex Legends and Overwatch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'High-TTK (time-to-kill) tracking in tactical shooters requires continuous crosshair contact on erratically strafing opponents. Tracing drills eliminate jerky micro-flicks, train forearm muscle gliding, and smooth out mouse friction transitions between directional reversals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What mouse sensitivity and DPI settings are best for wave tracing drills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Medium-to-low sensitivities (800 DPI with 25–45 cm/360°) provide greater physical resistance and arm engagement, suppressing involuntary high-frequency hand tremors. Ensure your mouse polling rate is set to 1000 Hz or higher to prevent spatial cursor micro-stutter.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I prevent muscle tension and hand fatigue during continuous tracking sessions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avoid clamping down on the mouse switch or surface. Maintain a relaxed fingertip or claw grip, glide from the elbow for broad vertical shifts, and use subtle wrist flexions for crest and trough micro-corrections.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I train with graphics tablets or trackballs on this tracing drill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The drill supports the standard Pointer Events API, enabling digital artists to practice stylus pressure and stroke continuity on graphic drawing tablets, as well as ergonomics testing with high-precision trackballs.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Smooth Pursuit Mouse Tracing & Flow State',
  description: 'Step-by-step training protocol for mastering continuous cursor wave tracking, maintaining flow integrity, and dampening motor jitter.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Align Cursor on Wave Starting Filament',
      text: 'Click "Start Drill" and align your crosshair on the illuminated wave filament during the 3-2-1 countdown to begin tracking immediately.',
    },
    {
      '@type': 'HowToStep',
      name: 'Match Wave Velocity and Vertical Curvature',
      text: 'Smoothly modulate your horizontal and vertical mouse gliding speed to stay locked within the 22-pixel glowing corridor.',
    },
    {
      '@type': 'HowToStep',
      name: 'Execute Immediate Catch-Up Re-Centering',
      text: 'If your cursor slips off-path, snap back to the moving wave without pausing to preserve your streak multiplier and flow integrity meter.',
    },
    {
      '@type': 'HowToStep',
      name: 'Sustain Flow State as Scroll Velocity Ramps',
      text: 'Maintain relaxed arm mechanics as the wave scrolls faster and vertical crests amplify toward the final 10 seconds of the session.',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'krauzlis2004', 'rashbass1961', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'How continuous tracking is measured',
    paragraphs: [
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every target to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same mouse and display rather than against someone else\'s setup. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Mouse Tracing & Smooth Pursuit Performance Benchmarks',
    description: 'An editorial guide to reading your own result, not measured population norms — SkillDrills collects no aggregate data. The pursuit figures follow Krauzlis (2004) and Rashbass (1961); the band boundaries are the drill author\'s own judgement. Columns evaluates overall flow score, peak flow state integrity, and continuous tracking frame streaks over 45 seconds.',
    columns: ['Tier', 'Rank Title', 'Flow Score', 'Peak Flow', 'Max Streak Frames', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Grandmaster',
        stat: '1400+ pts',
        level: '95–100%',
        accuracy: '600+ frames',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Tracker',
        stat: '1100–1399 pts',
        level: '85–94%',
        accuracy: '400–599 frames',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Follower',
        stat: '800–1099 pts',
        level: '70–84%',
        accuracy: '250–399 frames',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Cursor',
        stat: '500–799 pts',
        level: '50–69%',
        accuracy: '120–249 frames',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Tracer',
        stat: '< 500 pts',
        level: '< 50%',
        accuracy: '< 120 frames',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train continuous tracking',
    description: 'Coaching guidance from the models cited above, intended to cultivate smooth pursuit ocular control, suppress involuntary saccades, and optimize kinematic hand stability.',
    items: [
      {
        title: 'Protocol 1: Smooth Pursuit Gaze-Centering & Predictive Feedforward',
        description: 'As demonstrated by Krauzlis (2004), smooth pursuit requires anchoring visual foveation 15 to 25 pixels downstream on the oncoming wave rather than directly under the crosshair. This feedforward tracking enables the premotor cortex to compute anticipatory acceleration curves before inflection points occur.',
      },
      {
        title: 'Protocol 2: Rashbass Dual-Mode Tracking (Decoupling Saccades from Pursuit)',
        description: 'When drifting outside the 22px tolerance band, execute a single swift ballistic catch-up saccade (Rashbass 1961), then instantly relax muscle tension back into smooth pursuit mode. Avoid erratic multi-flick oscillations that trigger boundary bounces.',
      },
      {
        title: 'Protocol 3: Accot-Zhai Curvature Modulation (Crest & Trough Deceleration)',
        description: 'In accordance with the Accot-Zhai Steering Law (1997), curvature peaks demand lower tangential velocities than flatter wave segments. Feather your movement speed slightly when cresting sinusoidal peaks to prevent overshoot drift.',
      },
      {
        title: 'Protocol 4: Forearm Glide Ergonomics & Kinetic Friction Neutralization',
        description: 'Rest your forearm lightly on a smooth mousepad without anchoring the wrist heel into the desk. Pivot smoothly from the elbow to absorb large vertical sinusoidal oscillations, reserving finger flexion purely for fine 1–2 px micro-adjustments.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Mouse Tracing & Wave Tracking',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function TracingPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <TracingClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
