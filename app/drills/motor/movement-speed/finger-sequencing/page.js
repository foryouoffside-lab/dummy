import FingerSequencingClient from './FingerSequencingClientLoader';
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
//           "valorant sequence drill"     — Tactical shooter mechanic query
//           "cs2 target switching"        — Tactical shooter target switching query
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

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Sequence Aim Trainer – Finger Speed Test',
  url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
  description: 'Measure how fast you switch between targets in a set order, built on serial-order motor programs.',
  genre: ['Aim Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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
        text: 'Train with your competitive shooter sensitivity, typically between 25 cm and 45 cm per 360-degree turn (800 DPI with 0.3 to 0.5 in Valorant, or 1.0 to 1.6 in CS2). Consistency between sequence training and live gameplay ensures direct motor cortex muscle memory transfer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is motor chunking and how does it speed up target acquisition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Motor chunking (Lashley 1951) is the neurobiological process of combining individual discrete movements into a unified motor program. Instead of perceiving three targets as separate decisions, expert players process the sequence as a single fluid kinematic trajectory, reducing reaction latency by 40% to 60%.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many minutes per day should I spend on sequence aim drills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dedicate 10 to 15 minutes of focused sequence aim training daily, divided into 3 to 4 blocks with 60-second recovery breaks. High-intensity neural training saturates motor cortex pathways quickly; practicing beyond mild wrist or forearm fatigue degrades fine motor coordination and introduces unwanted muscle tension.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does sequence training help rhythm and music games like osu!?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Ordered spatial clicking directly transfers to rhythm games like osu! and Muse Dash, where reading upcoming beatmap clusters and executing sequential singletap or streaming strokes requires tight visual-motor anticipation and inter-tap temporal consistency.',
      },
    },
    {
      '@type': 'Question',
      name: 'What hardware setup provides the most accurate sequence test results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A high-refresh monitor (144 Hz or 240 Hz), a low-latency gaming mouse with a 1000 Hz+ polling rate, and hardware acceleration enabled in your browser ensure minimal input lag. Disable pointer precision (mouse acceleration) in Windows settings for linear, reproducible 1:1 sensor tracking.',
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
  name: 'How to Train Sequential Aim and Finger Speed',
  description: 'Step-by-step training protocol for mastering multi-target ordered clicking and rapid target switching.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Scan the Sequential Chain Pattern',
      text: 'Observe numbered targets appearing on the canvas to plan the most efficient geometric pathing sequence.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Acquire Target 1 Rapidly',
      text: 'Execute a fast initial flick to the first target in the sequence and click promptly to activate the chain.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Flow Through Successive Targets in Order',
      text: 'Transition smoothly from node to node in strict numerical progression (1 to 2 to 3), minimizing dwell time between clicks.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analyze Sequence Speed & Path Efficiency',
      text: 'Review average inter-click intervals, completion velocity, and path efficiency metrics on the results scorecard.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('lashley1951', 'keele1968', 'fitts1954', 'mackenzie1992', 'woods2015'),
  intro: {
    title: 'How sequence aim training is measured',
    paragraphs: [
      'Sequential target switching is clicking a set of targets in a required order rather than whichever is nearest. Each transition between two targets is a Fitts’s Law movement, timed by the log of the gap between them divided by their width (Fitts, 1954; MacKenzie, 1992), and the order itself is held as a pre-planned motor program rather than re-decided at each target (Lashley, 1951; Keele, 1968).',
      'How this is measured, and what it cannot resolve: timing comes from the browser’s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every target to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same mouse and display rather than against someone else’s setup. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Sequence Aim & Target Switching Benchmarks',
    description: 'An editorial guide to reading your own result, not measured population norms — SkillDrills collects no aggregate data. The serial-order framing follows Lashley (1951) and Keele (1968); the band boundaries are the drill author’s own judgement. Columns cover inter-tap transition latency, chain completion speed, and level ceiling under dynamic radius shrinkage.',
    columns: ['Tier', 'Rank Title', 'Inter-Tap Latency', 'Level Ceiling', 'Chain Accuracy', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Sequencer',
        stat: 'Under 180 ms',
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
        stat: 'Over 400 ms',
        level: 'Level 1–2',
        accuracy: 'Under 82%',
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
      <FingerSequencingClient copy={{ title: 'Sequence Aim Trainer' }} />
      <DrillGuide {...guideProps} />
    </>
  );
}
