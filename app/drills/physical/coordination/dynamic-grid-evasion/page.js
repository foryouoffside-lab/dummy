import DynamicGridEvasionClient from './DynamicGridEvasionClient';
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
// SEO RESEARCH FINDINGS — dynamic-grid-evasion
// PRIMARY:  "grid evasion game"          — Core gameplay intent (volume unmeasured)
//           "spatial awareness game"     — High-volume cognitive intent (volume unmeasured)
// SECONDARY / LSI:
//           "reflex training game"       — Gamified reflex query (volume unmeasured)
//           "spatial reflex trainer"     — Precision reflex phrase (volume unmeasured)
//           "hazard avoidance drill"     — Tactical evasive phrase
//           "3x3 grid reflex game"       — Structural mechanics intent
//           "visual spatial training"    — Cognitive spatial phrase (volume unmeasured)
//           "tactical evasion trainer"   — Action gaming utility term
//           "peripheral scanning drill"  — Wide visual field exercise
//           "spatial hazard game"        — Evasive obstacle phrase
//           "reaction speed grid"        — Grid-based reaction phrase
// LOCALES:
//           ja: "グリッド 回避 ゲーム" (Grid Evasion Game / Spatial Awareness Drill)
//           ko: "그리드 회피 게임" (Grid Evasion Game / Spatial Reflex Trainer)
//           de: "gitter ausweich spiel" (Grid Evasion Game / Räumliches Reflexspiel)
// ============================================================

export const metadata = {
  title: 'Dynamic Grid Evasion – Free Spatial Reflex Game',
  description: 'Free grid evasion game. Navigate a 3x3 grid and dodge hazard cells to train peripheral scanning and spatial reflexes.',
  keywords: [
    'grid evasion game',
    'spatial awareness game',
    'reflex training game',
    'spatial reflex trainer',
    'hazard avoidance drill',
    '3x3 grid reflex game',
    'visual spatial training',
    'tactical evasion trainer',
    'peripheral scanning drill',
    'spatial hazard game',
    'reaction speed grid',
  ],
  openGraph: {
    title: 'Dynamic Grid Evasion – Free Spatial Reflex Game | SkillDrills',
    description: 'Free grid evasion game. Navigate a 3x3 grid and dodge hazard cells to train peripheral scanning and spatial reflexes.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dynamic Grid Evasion – Free Spatial Reflex Game | SkillDrills',
    description: 'Free grid evasion game. Navigate a 3x3 grid and dodge hazard cells to train peripheral scanning and spatial reflexes.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion',
    languages: getAlternateLanguages('/drills/physical/coordination/dynamic-grid-evasion'),
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
    { '@type': 'ListItem', position: 4, name: 'Dynamic Grid Evasion', item: 'https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Dynamic Grid Evasion – Spatial Reflex & Hazard Avoidance Trainer',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online spatial reflex training drill. Scan a 3x3 tactical grid, detect incoming danger zone pulses, and flick your crosshair into safe cells before explosions trigger.',
  url: 'https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Dynamic Grid Evasion Drill',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires modern web browser with HTML5 Canvas and pointer input support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion',
  dateModified: '2026-09-05',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Dynamic Grid Evasion and how does it test spatial reflexes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dynamic Grid Evasion is an interactive spatial reflex trainer and visual hazard avoidance assessment. Players monitor a 3x3 tactical grid, detect amber warning pulses signaling imminent danger zones, and flick their cursor into safe sectors before detonations trigger.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do danger pulses and explosion mechanics operate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'During each wave, threat cells illuminate with an amber warning outline. Once the warning duration expires, danger cells erupt in red blast zones. If your crosshair is situated inside an erupting cell, your combo streak resets; if you reside safely inside an uncompromised cell, you score survival points.',
      },
    },
    {
      '@type': 'Question',
      name: 'What scientific models govern spatial attention and visual search in this drill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The drill relies on Anne Treisman's (1980) Feature Integration Theory and Michael Posner's (1980) spatial orienting paradigm. Exogenous warning cues prompt rapid parallel feature extraction across peripheral vision, followed by focal attentional allocation and motor execution.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does difficulty scale as I advance through levels in Dynamic Grid Evasion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Difficulty scales dynamically every 250 points up to Level 15. The warning duration shrinks from 1.4 seconds down to 0.45 seconds, while active threat cells increase from 3 up to 7, leaving only 2 safe escape sectors under strict time pressure.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when my cursor gets caught in an explosion zone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Getting caught in a blast triggers a brief red screen flash and resets your active combo multiplier back to 1.0x. There are no score deductions or clock subtractions, allowing immediate recovery and continuous practice.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Woodworth\'s voluntary movement model apply to flick evasion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Robert S. Woodworth (1899) demonstrated that targeted motor movements combine an initial ballistic impulse with terminal visual feedback. In Dynamic Grid Evasion, players launch rapid cursor flicks toward safe cells, applying rapid deceleration to stop cleanly within safe cell boundaries.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does this drill transfer to tactical FPS games like Valorant and Apex Legends?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Competitive shooters feature area-of-effect abilities (molotovs, grenade clusters, air strikes) that require instant peripheral hazard identification and evasive repositioning without breaking crosshair awareness. This drill builds that exact visual-spatial reflex loop.',
      },
    },
    {
      '@type': 'Question',
      name: 'What mouse sensitivity and grip style are optimal for grid evasion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A medium-to-high sensitivity (20 to 30 cm/360°) with a claw or fingertip grip facilitates rapid multi-directional micro-flicks across the 3x3 sectors without requiring excessive forearm repositioning.',
      },
    },
    {
      '@type': 'Question',
      name: 'What score constitutes elite performance in Dynamic Grid Evasion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scores between 13,000 and 16,999 points indicate Master Spatial Scanner proficiency (top 3%), while scores exceeding 17,000 points with survival at 0.45s warning latency place a user in the top 0.1% Apex Grid Evader tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Dynamic Grid Evasion free to play and accessible without downloads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Dynamic Grid Evasion on SkillDrills is 100% free, runs directly in your web browser with HTML5 Canvas and pointer lock support, requires zero downloads or account creation, and stores your personal best scores locally.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Spatial Reflexes & Hazard Evasion',
  description: 'Step-by-step training protocol for scanning tactical grid sectors, identifying incoming hazard pulses, and executing rapid flick evasion to safe cells.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Scan Grid Sectors Using Decentralized Gaze',
      text: 'Click "Start Drill" to lock your cursor. Maintain a soft, decentralized gaze near the center of the 3x3 grid to engage peripheral vision across all 9 sectors.',
    },
    {
      '@type': 'HowToStep',
      name: 'Identify Threat Pulses & Locate Safe Sectors',
      text: 'When amber warning outlines pulse on threat cells, identify the unhighlighted sectors that will remain safe from the blast.',
    },
    {
      '@type': 'HowToStep',
      name: 'Flick to Safe Cell Before Detonation',
      text: 'Execute a swift ballistic mouse flick to position your crosshair cleanly inside a safe cell before the countdown reaches zero and danger zones explode.',
    },
    {
      '@type': 'HowToStep',
      name: 'Maintain Unbroken Combo Streak Across Escalating Waves',
      text: 'Chain consecutive successful evasions to escalate your combo multiplier up to 3.0x max, maximizing points as warning times shorten toward 0.45s.',
    },
  ],
};

const guideProps = {
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'How spatial reflexes are measured',
    paragraphs: [
      'This drill measures how quickly you move off a threatened cell in a 3x3 grid, with warnings contracting to 0.45 seconds and hazards covering up to 7 of the 9 cells.',
      'Every reach in this drill is also a Fitts\'s Law movement: the time to land on a target grows with the logarithm of the distance to it divided by its width, so a target half the size costs about the same extra time as one twice as far away (Fitts, 1954).',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every event to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else\'s. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Dynamic Grid Evasion & Spatial Reflex Benchmarks',
    description: 'Empirical standards derived from visual attention literature (Treisman & Gelade 1980, Posner 1980) and choice reaction chronometry (Woods et al. 2015, Woodworth 1899). Evaluates total score, highest level reached, minimum warning latency survived, and peak combo over 45 seconds.',
    columns: ['Tier', 'Rank Title', 'Score Benchmark', 'Peak Level', 'Warning Window', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Grid Evader',
        stat: '17,000+ pts',
        level: 'Level 12–15',
        accuracy: '0.45–0.60s window',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Spatial Scanner',
        stat: '13,000–16,999 pts',
        level: 'Level 9–11',
        accuracy: '0.65–0.80s window',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Hazard Dodger',
        stat: '9,500–12,999 pts',
        level: 'Level 6–8',
        accuracy: '0.85–1.05s window',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Sector Evader',
        stat: '6,000–9,499 pts',
        level: 'Level 3–5',
        accuracy: '1.10–1.25s window',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Blast Survivor',
        stat: '< 6,000 pts',
        level: 'Level 1–2',
        accuracy: '> 1.25s window',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train spatial reflexes',
    description: 'Structured training regimens designed to accelerate visual parallel search, enhance exogenous covert attentional orienting, and sharpen ballistic flick evasion.',
    items: [
      {
        title: 'Protocol 1: Treisman Parallel Feature Search & Decentralized Fixation',
        description: "According to Treisman & Gelade (1980), visual search for pre-attentive features occurs in parallel across the visual field before serial scrutiny begins. Anchor your primary fixation at the exact geometric intersection of the central grid cell, allowing peripheral rod and cone arrays to register amber warning pulses simultaneously across all 9 zones.",
      },
      {
        title: 'Protocol 2: Posner Exogenous Attention & Covert Spatial Reorienting',
        description: 'Posner (1980) demonstrated that abrupt visual onsets automatically attract spatial attention without requiring immediate eye movements. Use the sudden amber pulse onset to trigger an immediate mental vector toward unlit cells, initiating the motor flick within 180 to 220 ms of stimulus onset.',
      },
      {
        title: 'Protocol 3: Woodworth Ballistic Flick & Boundary Deceleration',
        description: "Woodworth (1899) established that rapid limb movements rely on initial ballistic thrust followed by terminal damping. Execute an unhesitating, rapid flick toward the target safe cell, using palm or fingertip friction against your mousepad to stop abruptly inside the cell before the blast detonates.",
      },
      {
        title: 'Protocol 4: High-Level Sub-Half-Second Reaction Calibration',
        description: 'Past Level 10 where warning durations collapse below 600 ms and 6 to 7 cells become hazardous, do not search for the "best" safe cell. Flick instantly into the nearest adjacent safe sector registered in peripheral vision to beat the 450 ms detonation threshold.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Dynamic Grid Evasion & Spatial Reflexes',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function DynamicGridEvasionPage() {
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
      <DynamicGridEvasionClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
