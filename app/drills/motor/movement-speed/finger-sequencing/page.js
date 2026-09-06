import FingerSequencingClient from './FingerSequencingClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — finger-sequencing (motor-finger-sequencing)
// PRIMARY:  "sequence aim trainer"        — Core search phrase (~1,800 searches/mo)
//           "finger speed test"           — High-volume speed/dexterity assessment query
// SECONDARY / LSI:
//           "sequential clicking test"    — Direct mechanism search
//           "finger sequencing aim drill" — Specialized tactical aim routine term
//           "click speed test online"     — Universal speed query
//           "finger speed training fps"   — Esports mechanical training phrase
//           "mouse control aim drill"     — Motor coordination search
//           "fast target switching aim trainer" — In-game mechanic transfer query
//           "ordered target click trainer"— Mechanics-specific long-tail
//           "finger dexterity aim test"   — Neuromotor precision query
//           "crosshair pathing test"      — Movement efficiency query
// LOCALES:
//           ja: "シーケンス エイム 練習" (Sequence Aim Practice / Finger Speed Test)
//           ko: "시퀀스 에임 연습" (Sequence Aim Practice / Finger Agility Test)
//           de: "sequenz aim trainer" (Sequence Aim Trainer / Finger Dexterity Test)
// ============================================================

export const metadata = {
  title: 'Sequence Aim Trainer – Free Finger Speed Test',
  description: 'Free sequence aim trainer. Measure how fast you switch between targets in a set order, built on Lashley and Keele on serial-order motor programs.',
  keywords: [
    'sequence aim trainer',
    'finger speed test',
    'sequential clicking test',
    'finger sequencing aim drill',
    'click speed test online',
    'finger speed training fps',
    'mouse control aim drill',
    'fast target switching aim trainer',
    'ordered target click trainer',
    'finger dexterity aim test',
    'crosshair pathing test',
    'valorant sequence drill',
    'cs2 target switching',
  ],
  openGraph: {
    title: 'Sequence Aim Trainer – Free Finger Speed Test | SkillDrills',
    description: 'Train sequential target switching, finger speed, and ordered mouse accuracy with this free online sequence aim trainer. Instant browser drill, no install required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sequence Aim Trainer – Free Finger Speed Test | SkillDrills',
    description: 'Train sequential target switching, finger speed, and ordered mouse accuracy with this free online sequence aim trainer. Instant browser drill, no install required.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
    languages: getAlternateLanguages('/drills/motor/movement-speed/finger-sequencing'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/' },
    { '@type': 'ListItem', position: 2, name: 'Motor Training', item: 'https://skilldrills.online/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Movement Speed', item: 'https://skilldrills.online/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Sequence Aim Trainer', item: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Sequence Aim Trainer – Free Finger Speed Test',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based sequence aim trainer and finger speed test. Practice sequential target acquisition, descending node size micro-adjustments, and crosshair pathing efficiency.',
  url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Sequence Aim Trainer',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires HTML5 Canvas and JavaScript support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
  dateModified: '2026-09-05',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a sequence aim trainer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A sequence aim trainer is an interactive motor speed drill where users click multiple target nodes in a strict size order (largest to smallest) before a countdown timer expires. It trains ballistic target acquisition, visual scanning, and rapid crosshair pathing between successive targets.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does finger sequencing improve FPS aiming in Valorant and CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In tactical shooters, multi-enemy clutch engagements require rapidly switching focus and crosshair alignment across several targets in prioritized order. Finger sequencing exercises the brain’s motor cortex to pre-plan sequential movement chunks (Lashley 1951), eliminating inter-target hesitation and overshooting.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does sequence aim training differ from a raw click speed (CPS) test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A CPS test measures stationary spam clicking without spatial relocation. Sequence aim training combines high-speed clicking with dynamic spatial navigation, requiring foveal re-acquisition, trajectory planning, antagonist deceleration, and precise submovement corrections under Fitts’s Law constraints.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do targets shrink in size within each sequence chain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shrinking node radii mimic tactical target acquisition: an initial wide flick to acquire a broad target area (e.g. torso/shoulder), immediately followed by finer micro-adjustments onto smaller high-value targets (e.g. headshot hitboxes). This trains both rapid open-loop ballistics and closed-loop visual feedback.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the optimal mouse sensitivity for sequence aim training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Train with your competitive shooter sensitivity, typically between 25 cm and 45 cm per 360-degree turn (800 DPI with 0.3 to 0.5 in Valorant, or 1.0 to 1.6 in CS2). Consistency between your training drill and in-game sensitivity ensures direct neural transfer of muscle memory.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the difficulty scaling system work in this drill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Difficulty scales continuously across 15 levels based on your score and combo streak. As you advance, starting node radii shrink from 32px down to 8px, sequence expiration windows compress from 3.2s down to 0.85s, node count expands from 3 to 5, and spatial node spread widens across the canvas.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the motor psychophysics principles behind sequential aiming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sequential motor execution relies on Karl Lashley’s (1951) serial order hierarchy and Steven Keele’s (1968) motor programming model. Elite performers do not compute each click after the previous one finishes; instead, the motor cortex compiles and fires the sequence as a unified motor chunk, drastically cutting inter-tap latencies below 180 ms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can this sequence trainer be practiced on mobile or touchscreens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The drill features full multi-touch event listeners and pointer coordinates that work natively on smartphones and tablets, allowing you to train raw multi-finger tap sequencing and visual search speed anywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should a daily sequence aim warmup routine last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A focused 5 to 10 minute warmup consisting of 4 to 6 full sessions is ideal. Research into motor skill consolidation indicates that brief, high-intensity distributed practice sessions yield superior motor retention compared to fatiguing endurance grinds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the live accuracy score computed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accuracy represents the ratio of correct, in-order target node clicks to total registered clicks (including missed clicks on empty space or clicking targets out of size sequence). Sustaining 95%+ accuracy while advancing levels reflects mastery of the speed-accuracy tradeoff.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Sequential Aiming and Finger Speed',
  description: 'Step-by-step training protocol for mastering sequential target acquisition, rapid finger speed, and crosshair pathing efficiency.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Calibrate Sensitivity and Start',
      text: 'Match your in-game sensitivity multiplier using the settings drawer and click "Start Drill" to engage the sequence arena.',
    },
    {
      '@type': 'HowToStep',
      name: 'Scan and Identify Descending Node Order',
      text: 'Scan the canvas instantly using peripheral vision to identify the sequence nodes ordered from largest radius to smallest radius.',
    },
    {
      '@type': 'HowToStep',
      name: 'Execute Rapid Ballistic Clicks in Order',
      text: 'Flick directly to the largest node, click it cleanly, and immediately transition your crosshair to the next smaller node before the sequence timer expires.',
    },
    {
      '@type': 'HowToStep',
      name: 'Maintain Combo Multiplier and Scale Levels',
      text: 'Each clean hit rewards +0.6 seconds of bonus clock and builds your combo multiplier up to 3.0x. Avoid misclicks to maintain peak scoring and unlock advanced difficulty tiers.',
    },
  ],
};

const guideProps = {
  sources: pickSources('lashley1951', 'keele1968', 'fitts1954', 'mackenzie1992', 'woods2015'),
  intro: {
    title: 'How sequence aim training is measured',
    paragraphs: [
      'Sequential target switching is clicking a set of targets in a required order rather than whichever is nearest. Each transition between two targets is a Fitts\u2019s Law movement, timed by the log of the gap between them divided by their width (Fitts, 1954; MacKenzie, 1992), and the order itself is held as a pre-planned motor program rather than re-decided at each target (Lashley, 1951; Keele, 1968).',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every target to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same mouse and display rather than against someone else\'s setup. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Sequence Aim & Target Switching Benchmarks',
    description: 'An editorial guide to reading your own result, not measured population norms — SkillDrills collects no aggregate data. The serial-order framing follows Lashley (1951) and Keele (1968); the band boundaries are the drill author\'s own judgement. Columns cover inter-tap transition latency, chain completion speed, and level ceiling under dynamic radius shrinkage.',
    columns: ['Tier', 'Rank Title', 'Inter-Tap Latency', 'Level Ceiling', 'Chain Accuracy', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Sequencer',
        stat: '< 180 ms',
        level: 'Level 12+',
        accuracy: '98–100%',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Tactician',
        stat: '180–230 ms',
        level: 'Level 9–11',
        accuracy: '95–97%',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Operator',
        stat: '230–300 ms',
        level: 'Level 6–8',
        accuracy: '90–94%',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Clicker',
        stat: '300–400 ms',
        level: 'Level 3–5',
        accuracy: '82–89%',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Sequencer',
        stat: '> 400 ms',
        level: 'Level 1–2',
        accuracy: '< 82%',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train target switching',
    description: 'Structured training methodologies grounded in motor programming, ballistic open-loop pacing, and foveal pre-planning.',
    items: [
      {
        title: 'Protocol 1: Hierarchical Motor Chunking (Lashley 1951)',
        description: 'Before initiating your first click, scan the spatial configuration of all active nodes. Group the sequence into a single mental motor program rather than reacting to each node individually. Committing the path to pre-motor memory reduces transition latency between targets.',
      },
      {
        title: 'Protocol 2: Keele Open-Loop Ballistic Pacing (Keele 1968)',
        description: 'Execute the initial movement between widely spaced nodes at maximum ballistic speed without visual mid-course corrections. Rely on proprioceptive arm and wrist velocity to transport the crosshair onto the target boundary before applying terminal deceleration.',
      },
      {
        title: 'Protocol 3: Descending Radius Micro-Deceleration',
        description: 'As node sizes decrease from largest (32px) to smallest (8px), adjust braking force dynamically. Use large arm movements for the primary node and transition into fine finger-and-wrist micro-corrections for the terminal high-precision nodes.',
      },
      {
        title: 'Protocol 4: High-Stress Combo Rhythm Synchronization',
        description: 'Maintain a steady acoustic cadence across consecutive node chains. Rushing erratically induces motor noise and miss penalties; cultivating an even, metronomic clicking tempo prevents streak collapses during tight late-game timer windows.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Sequence Aim Training',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function FingerSequencingPage() {
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
      <FingerSequencingClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
