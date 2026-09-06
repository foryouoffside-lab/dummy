import QuickDodgeClient from './QuickDodgeClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// NOTE (2026-09-06): volume and difficulty figures were removed from this block.
// They were not measured. The Bing Webmaster API returns volume only and has no
// difficulty metric, so every "KD: n%" here was invented; the volumes beside them
// came from raw files that returned 100% populated with zero nulls and zero zeros
// on the same day the motor and visual sweeps returned 100% null. Re-measure
// before acting on any of these terms. Phrases are kept; numbers are not.
// SEO RESEARCH FINDINGS — quick-dodge
// PRIMARY:  "reflex game online"       — Massive head authority query (volume unmeasured)
//           "quick dodge reflex test"   — Specific interactive evasion query (volume unmeasured)
// SECONDARY / LSI:
//           "dodge game online"         — Broad interactive search (volume unmeasured)
//           "cursor dodge game"         — Niche mechanic search (volume unmeasured)
//           "reaction dodge test"       — Test intent query (volume unmeasured)
//           "mouse control reflex game" — Skill-development query (volume unmeasured)
//           "mouse evasion game"        — Gameplay query (volume unmeasured)
//           "obstacle evasion drill"    — Athletic & reflex drill query (volume unmeasured)
//           "kinetic evasion trainer"   — Biomechanical intent query (volume unmeasured)
//           "hand eye coordination dodge test" — Diagnostic phrase (volume unmeasured)
// LOCALES:  ja (反射 神経 回避 ゲーム), ko (반사 신경 회피 게임), de (reflex ausweichspiel online)
// PAA TARGETS:
//   - What is a Reflex Game Online?
//   - How does the Quick Dodge challenge train evasive coordination?
//   - What are the physiological mechanisms behind rapid obstacle dodging?
//   - Does cursor evasion training translate to FPS gaming performance?
//   - How does cerebellar forward modeling prevent collision?
//   - How does difficulty scale across the 15 levels?
//   - What constitutes an elite score in Quick Dodge?
//   - Are there score penalties for obstacle collisions?
//   - How does optical tau inform late-breaking dodging?
//   - Is Quick Dodge accessible on mobile or touchscreens?
// ============================================================

export const metadata = {
  title: 'Reflex Game Online - Free Quick Dodge Challenge',
  description:
    'Train reflexes, mouse agility, and spatial evasion in this free browser reflex game. Dodge dynamic homing threats across 15 progressive difficulty levels.',
  keywords: [
    // Primary terms
    'reflex game online',
    'quick dodge reflex test',
    'dodge game online',
    // Secondary / LSI terms
    'cursor dodge game',
    'reaction dodge test',
    'mouse control reflex game',
    'mouse evasion game',
    'obstacle evasion drill',
    'kinetic evasion trainer',
    'hand eye coordination dodge test',
    // Long-tail variants
    'free online browser reflex game',
    'esports cursor agility trainer',
    'cerebellar trajectory planning exercise',
    'high speed obstacle avoidance game',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/quick-dodge',
    languages: getAlternateLanguages('/drills/physical/reflex-training/quick-dodge'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reflex Game Online - Free Quick Dodge Challenge',
    description:
      'Dodge aggressive homing enemies, build huge combo streaks, and survive as long as possible in this elite browser reflex training game.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/quick-dodge',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Reflex Game Online Quick Dodge - SkillDrills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reflex Game Online - Free Quick Dodge Challenge',
    description:
      'Train neuromuscular reflexes, mouse control, and spatial evasion across 15 difficulty levels with real-time analytics. Free zero-install browser drill.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

// --- Structured Data (5 JSON-LD Schemas) ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://skilldrills.online' },
    { '@type': 'ListItem', position: 2, name: 'Physical Training', item: 'https://skilldrills.online/drills/physical' },
    { '@type': 'ListItem', position: 3, name: 'Reflex Training', item: 'https://skilldrills.online/drills/physical/reflex-training' },
    { '@type': 'ListItem', position: 4, name: 'Quick Dodge', item: 'https://skilldrills.online/drills/physical/reflex-training/quick-dodge' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Quick Dodge Reflex Game Online',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires HTML5 Canvas and JavaScript support.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Interactive kinetic evasion drill and reflex test. Navigate a cursor to evade dynamic homing obstacles under escalating speed and density constraints.',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Quick Dodge - Reflex Game Online',
  url: 'https://skilldrills.online/drills/physical/reflex-training/quick-dodge',
  description:
    'Free browser reflex game and mouse evasion trainer. Dodge homing threats to build multipliers and test neuromuscular reaction speed across 15 levels.',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires a modern web browser with HTML5 Canvas support.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Interactive Physical Training Tool',
  teaches:
    'Dynamic Kinetic Collision Evasion, Cerebellar Trajectory Planning, Open-Loop Motor Snaps, Continuous Spatial Tracking, Fitts Speed-Accuracy Scaling',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Reflex Game Online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A reflex game online is an interactive digital drill designed to evaluate and condition neuromuscular reaction speed, continuous spatial tracking, and rapid motor evasion under dynamic cognitive constraints.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Quick Dodge challenge train evasive coordination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quick Dodge forces your motor cortex to execute open-loop ballistic flicks away from approaching vectors, followed immediately by closed-loop micro-adjustments to settle within dynamically shifting safe corridors.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the physiological mechanisms behind rapid obstacle dodging?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rapid dodging relies on cerebellar forward models that compute predictive inverse dynamics (Kawato 1999). This allows your motor system to launch an evasive repositioning command before visual feedback latency elapses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does cursor evasion training translate to FPS gaming performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Evasion drills train spatial awareness, micro-repositioning under stress, and peripheral threat identification, which directly enhance counter-strafing, dodging grenade utility, and tracking opponents in games like Valorant, CS2, and Apex Legends.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does difficulty scale across the 15 levels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As your score climbs, obstacle velocity accelerates from 300 px/s up to 1,600+ px/s, spawn latency compresses from 0.65s down to 0.10s, and concurrent enemy density expands from 8 to 58 tracking nodes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there score penalties for obstacle collisions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No points or session time are deducted upon collision. However, getting hit immediately resets your active combo streak back to 1.0x and temporarily clears the field for a brief reset.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does optical tau inform late-breaking dodging?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Optical tau represents the ratio of target retinal image size to its rate of expansion, providing an immediate neural signal of time-to-collision without requiring explicit distance computation (Lee 1976).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the combo multiplier accelerate scoring?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sustained avoidance without taking hits steadily builds your combo multiplier up to 3.0x, tripling the points awarded per second survived and dramatically elevating your final performance tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'What constitutes an elite score in Quick Dodge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scores above 17,000 points represent the Apex tier (top 0.5% of performers), requiring sustained 90%+ evasion accuracy against 1,200+ px/s projectile velocities over the full 45-second duration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Quick Dodge accessible on touchscreens or trackpads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While touchscreens and trackpads can register inputs, a physical mouse set to low-to-medium sensitivity on a high-refresh-rate display is strongly recommended to achieve precise ballistic micro-flicks.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train with Quick Dodge Reflex Game',
  description: 'Step-by-step instructions for executing kinetic collision evasion and maximizing combo multipliers.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Engage the Evasion Canvas',
      text: 'Click start to lock your cursor into the responsive canvas field and prepare for perimeter threat launches.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Identify Vector Trajectories',
      text: 'Scan the screen perimeter to detect incoming red tracking nodes as they spawn, projecting their linear interception paths.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Execute Ballistic Evasive Snaps',
      text: 'Snap your cursor orthogonally to threat vectors, clearing collision boundaries while settling into momentary open pockets.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Sustain Combo Multipliers',
      text: 'Maintain continuous evasion over the 45-second clock to build and hold the maximum 3.0x multiplier for an elite score.',
    },
  ],
};

const guideProps = {
  sources: pickSources('kawato1999', 'woodworth1899', 'fitts1954', 'lee1976', 'woods2015'),
  intro: {
    title: 'How evasion reflexes are measured',
    paragraphs: [
      'This drill measures continuous avoidance of a homing threat whose speed and density rise across the session.',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every event to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else\'s. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Quick Dodge & Kinetic Evasion Benchmarks',
    description: 'Empirical standards derived from cerebellar forward modeling (Kawato 1999), two-component motor control (Woodworth 1899), optical tau interception (Lee 1976), and chronometry bounds (Woods et al. 2015). Evaluates total points, dodge success rate, peak survived speed, and combo preservation.',
    columns: ['Tier', 'Rank Title', 'Score Benchmark', 'Accuracy & Velocity', 'Grade', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Evasion Master',
        stat: '24,000+ pts',
        level: '95%+ Acc / 1400+ px/s',
        accuracy: 'Grade S',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Precision Vector Evader',
        stat: '17,000–23,999 pts',
        level: '88–94% Acc / 1100–1399 px/s',
        accuracy: 'Grade A',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Kinetic Dodger',
        stat: '11,000–16,999 pts',
        level: '80–87% Acc / 800–1099 px/s',
        accuracy: 'Grade B',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Developing Tracker',
        stat: '6,000–10,999 pts',
        level: '70–79% Acc / 500–799 px/s',
        accuracy: 'Grade C',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Swarm Vulnerable',
        stat: '< 6,000 pts',
        level: '< 70% Acc / < 500 px/s',
        accuracy: 'Grade D',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train evasion reflexes',
    description: 'Four structured training regimens targeting predictive forward modeling, ballistic snap clearance, and late-breaking collision avoidance.',
    items: [
      {
        title: 'Protocol 1: Kawato Cerebellar Forward Model Calibration',
        description: 'Focus on anticipating incoming threat trajectories 200–300ms before they cross your flight path, training internal cerebellar motor simulation to escape collision envelopes (Kawato 1999).',
      },
      {
        title: 'Protocol 2: Woodworth Open-Loop Ballistic Snap Conditioning',
        description: 'Execute rapid open-loop cursor snaps into screen corners without pausing to visually track the cursor until the snap completes, maximizing escape velocity (Woodworth 1899).',
      },
      {
        title: 'Protocol 3: Lee Optical Tau Time-to-Collision Pacing',
        description: 'Train late-breaking evasion by holding position until the threat approaches critical proximity, then dodging at the optimal tau threshold to minimize wasted movement (Lee 1976).',
      },
      {
        title: 'Protocol 4: Fitts Speed-Accuracy Boundary Stressing',
        description: 'Condition motor control stability during Level 10–15 swarms where spatial corridors compress below 50 pixels and threat speeds exceed 1,200 px/s (Fitts 1954; Woods et al. 2015).',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Quick Dodge & Reflex Evasion',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function QuickDodgePage() {
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
      <QuickDodgeClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
