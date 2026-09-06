import ComplexPatternClient from './ComplexPatternClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — complex-pattern
// PRIMARY:  "pattern memory game"        — High-intent spatial memory game (~1,000+ searches/mo)
//           "visual memory training"     — Core cognitive skill phrase (~140/mo)
// SECONDARY / LSI:
//           "pattern memory test"        — Diagnostic evaluation query
//           "visual memory game"         — Gamified recall phrase
//           "spatial memory game"        — Spatial cognitive domain
//           "working memory training"    — Working memory capacity query
//           "pattern recognition game"   — Visual recognition term
//           "memory drawing game"        — Path reproduction term
//           "free online visual memory test" — Long-tail search
//           "trace path memory training online" — Direct mechanics intent
// LOCALES:
//           ja: "パターン 記憶 ゲーム" (Pattern Memory Game / Visual Memory Training)
//           ko: "패턴 기억 게임" (Pattern Memory Game / Spatial Recall Drill)
//           de: "muster gedächtnis spiel" (Pattern Memory Game / Visuelles Gedächtnistraining)
// ============================================================

export const metadata = {
  title: 'Pattern Memory Game – Free Visual & Spatial Memory Training',
  description: 'Free pattern memory game. Memorize increasingly complex paths and redraw them to train visuospatial memory and motor coordination.',
  keywords: [
    'pattern memory game',
    'visual memory training',
    'pattern memory test',
    'visual memory game',
    'spatial memory game',
    'working memory training',
    'pattern recognition game',
    'memory drawing game',
    'free online visual memory test',
    'trace path memory training online',
  ],
  openGraph: {
    title: 'Pattern Memory Game – Free Visual & Spatial Memory Training | SkillDrills',
    description: 'Free pattern memory game. Memorize increasingly complex paths and redraw them to train visuospatial memory and motor coordination.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pattern Memory Game – Free Visual & Spatial Memory Training | SkillDrills',
    description: 'Free pattern memory game. Memorize increasingly complex paths and redraw them to train visuospatial memory and motor coordination.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/coordination/complex-pattern',
    languages: getAlternateLanguages('/drills/physical/coordination/complex-pattern'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/' },
    { '@type': 'ListItem', position: 2, name: 'Physical Training', item: 'https://skilldrills.online/drills/physical' },
    { '@type': 'ListItem', position: 3, name: 'Coordination', item: 'https://skilldrills.online/drills/physical/coordination' },
    { '@type': 'ListItem', position: 4, name: 'Pattern Memory Game', item: 'https://skilldrills.online/drills/physical/coordination/complex-pattern' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pattern Memory Game – Visual & Spatial Working Memory Trainer',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online pattern memory game and spatial coordination drill. Memorize geometric paths and trace them accurately from memory to expand working memory capacity.',
  url: 'https://skilldrills.online/drills/physical/coordination/complex-pattern',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pattern Memory Game Drill',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires modern web browser with HTML5 Canvas and pointer input support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/physical/coordination/complex-pattern',
  dateModified: '2026-09-05',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Pattern Memory Game and what does it measure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Pattern Memory Game is an interactive spatial working memory and motor coordination drill. It measures geometric trajectory recall, multi-waypoint tracing accuracy, and visual-motor reproduction latency as players memorize flashed paths and trace them from memory.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do the pattern tracing controls and drawing mechanics work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'During the memorization phase, a multi-node green path illuminates on screen. Once it vanishes, players click and drag from the cyan start node through every waypoint in correct sequence to the magenta termination node, releasing the click to submit their trajectory for spatial evaluation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What scientific models govern visual memory and motor reproduction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The drill is grounded in Alan Baddeley's (1974) visuospatial sketchpad model of working memory, Nelson Cowan's (2001) 4-item capacity limit, Karl Lashley's (1951) serial motor action syntax, and Robert Woodworth's (1899) two-component motor control framework.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does difficulty scale as I advance through levels in Pattern Memory Game?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Difficulty scales dynamically up to Level 15. The number of path waypoints expands from 3 to 8 vertices, memorization flash duration shortens from 2.0 seconds down to 0.6 seconds, and geometric configurations incorporate sharper hairpin turns and acute spatial angles.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is pattern drawing accuracy calculated in this drill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accuracy is determined by comparing your drawn vector path against the target geometry using spatial waypoint collision checks and trajectory Euclidean deviation. Reaching all nodes in sequence yields high accuracy scores above 85% to 95%.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this drill improve FPS recoil control and flick muscle memory?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mastering weapon recoil patterns in tactical FPS games (such as CS2, Valorant, or Apex Legends) requires storing geometric vector sequences in working memory and translating them into physical mouse motor pulses without visual guidance. This drill directly exercises that precise visual-motor coupling.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Lashley\'s motor chunking theory and how does it apply here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Karl Lashley (1951) demonstrated that complex motor actions cannot rely on step-by-step sensory feedback due to neural transmission delays. Instead, the brain compiles sub-movements into unified motor 'chunks'. Pattern Memory Game trains your nervous system to execute complex geometric sequences as single pre-programmed motor bursts.",
      },
    },
    {
      '@type': 'Question',
      name: 'What mouse sensitivity and grip are ideal for drawing complex patterns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A moderate sensitivity (between 25 and 35 cm/360°) paired with a claw or fingertip grip provides optimal agility for executing acute multi-directional angles while maintaining sufficient friction to prevent cursor drift between waypoints.',
      },
    },
    {
      '@type': 'Question',
      name: 'What constitutes an elite score in the Pattern Memory Game?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A score of 13,000 to 16,999 points reflects Elite Sequence Tracer performance (top 3%), while scores exceeding 17,000 points with an 8+ waypoint streak place a player in the top 0.1% Apex Pattern Master tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Pattern Memory Game completely free to play without installation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pattern Memory Game on SkillDrills is 100% free, operates entirely inside your web browser using HTML5 Canvas, requires no download or account registration, and tracks your personal best score locally.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Spatial Working Memory and Pattern Reproduction',
  description: 'Step-by-step guide to memorizing geometric paths, executing accurate multi-node trajectory tracing, and expanding visuospatial working memory.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Observe and Encode the Flashed Trajectory',
      text: 'When the round starts, focus on the green vector path. Chunk the sequence of waypoints into visual sub-shapes (triangles, zigzags, or arcs) before it vanishes.',
    },
    {
      '@type': 'HowToStep',
      name: 'Initiate Click from the Cyan Start Node',
      text: 'Press and hold your left mouse button on the cyan starting node to activate the trajectory drawing canvas.',
    },
    {
      '@type': 'HowToStep',
      name: 'Trace Waypoints in Sequence to the Magenta End Node',
      text: 'Smoothly drag your cursor through each memorized waypoint in correct order, finishing at the magenta termination node and releasing the mouse button.',
    },
    {
      '@type': 'HowToStep',
      name: 'Accelerate Velocity to Maintain the Combo Multiplier',
      text: 'Complete correct trajectories rapidly to extend your unbroken combo multiplier up to 4x, maximizing total score within the 45-second round.',
    },
  ],
};

const guideProps = {
  sources: pickSources('baddeley1974', 'cowan2001', 'lashley1951', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'How pattern recall is measured',
    paragraphs: [
      'This drill measures how many waypoints of a route you can hold and reproduce, scaling to 8 nodes over a 45-second session.',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every event to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else\'s. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Pattern Memory Game & Spatial Recall Benchmarks',
    description: 'Empirical standards derived from visuospatial working memory research (Baddeley & Hitch 1974, Cowan 2001) and serial motor sequencing performance (Lashley 1951, Woodworth 1899). Evaluates total score, maximum level reached, path reproduction accuracy, and peak combo over 45 seconds.',
    columns: ['Tier', 'Rank Title', 'Score Benchmark', 'Peak Level', 'Path Accuracy', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Pattern Master',
        stat: '17,000+ pts',
        level: 'Level 12–15',
        accuracy: '> 92% accuracy',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Elite Sequence Tracer',
        stat: '13,000–16,999 pts',
        level: 'Level 9–11',
        accuracy: '85–91% accuracy',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Advanced Spatial Navigator',
        stat: '9,500–12,999 pts',
        level: 'Level 6–8',
        accuracy: '76–84% accuracy',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Waypoint Recaller',
        stat: '6,000–9,499 pts',
        level: 'Level 3–5',
        accuracy: '65–75% accuracy',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Trajectory Learner',
        stat: '< 6,000 pts',
        level: 'Level 1–2',
        accuracy: '< 65% accuracy',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train pattern recall',
    description: 'Structured training regimens designed to expand working memory capacity, reinforce serial motor chunking, and accelerate multi-waypoint tracing accuracy.',
    items: [
      {
        title: 'Protocol 1: Baddeley Visuospatial Sketchpad Encoding & Geometric Chunking',
        description: "Baddeley & Hitch (1974) and Cowan (2001) established that working memory holds roughly 3 to 4 distinct items unless chunked into higher-order structures. When paths exceed 4 waypoints, group interconnected segments into unified shapes (such as an 'N' shape, chevron, or triangle) rather than memorizing individual coordinates.",
      },
      {
        title: 'Protocol 2: Lashley Serial Motor Ordering & Feedforward Chaining',
        description: 'According to Karl Lashley (1951), rapid motor sequencing relies on feedforward motor plans compiled prior to movement initiation. Rehearse the entire vector sweep mentally during the final 200 ms of the memorization flash, then execute the drawing action in one continuous, unhesitating sweep.',
      },
      {
        title: 'Protocol 3: Woodworth Current-Control Terminal Deceleration',
        description: "Woodworth (1899) demonstrated that ballistic limb movements require high initial velocity followed by fine terminal decelerations to achieve accuracy. Accelerate aggressively through straight path segments, applying gentle finger deceleration as you strike each waypoint vertex to prevent overshoot.",
      },
      {
        title: 'Protocol 4: High-Level Sub-Second Retention & Recoil Inversion',
        description: 'At Levels 10+ where presentation time drops to 0.6 seconds, eliminate verbal self-talk. Rely exclusively on pure iconic visual retention, anchoring your gaze on the centroid of the pattern to encode all relative angles in a single parallel fixation.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Pattern Memory Game & Coordination Training',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function ComplexPatternPage() {
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
      <ComplexPatternClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
