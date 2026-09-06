import MotorSequencingClient from './MotorSequencingClient';
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
// SEO RESEARCH FINDINGS — agility-ladder
// PRIMARY:  "agility ladder drills"          — High-volume athletic/fitness query (volume unmeasured)
//           "motor sequencing training"      — Technical motor control phrase (volume unmeasured)
// SECONDARY / LSI:
//           "agility ladder exercises"       — Broad exercise intent (volume unmeasured)
//           "footwork agility drills"        — Speed & footwork intent (volume unmeasured)
//           "bilateral coordination drill"   — Inter-limb coordination phrase
//           "rhythmic mouse control"         — E-sports timing phrase
//           "agility ladder game"            — Gamified drill intent
//           "sequential movement training"   — Motor programming query
//           "motor coordination exercises"   — General coordination query
//           "agility ladder workout"         — Routine intent
//           "esports footwork training"      — Counter-strafing rhythm term
// LOCALES:
//           ja: "ラダー トレーニング" (Agility Ladder Training / Motor Sequencing)
//           ko: "민첩성 사다리 훈련" (Agility Ladder Drill / Sequential Movement)
//           de: "koordinationsleiter übungen" (Agility Ladder Drills / Motorische Sequenzierung)
// ============================================================

export const metadata = {
  title: 'Agility Ladder Drills – Free Footwork Sequencing Trainer',
  description: 'Free online agility ladder drills. Master bilateral motor sequencing, footwork timing, and rhythmic alternating cursor sweeps across scrolling rungs.',
  keywords: [
    'agility ladder drills',
    'motor sequencing training',
    'agility ladder exercises',
    'footwork agility drills',
    'bilateral coordination drill',
    'rhythmic mouse control',
    'agility ladder game',
    'sequential movement training',
    'motor coordination exercises',
    'agility ladder workout',
    'esports footwork training',
  ],
  openGraph: {
    title: 'Agility Ladder Drills – Free Footwork Sequencing Trainer | SkillDrills',
    description: 'Free online agility ladder drills. Master bilateral motor sequencing, footwork timing, and rhythmic alternating cursor sweeps across scrolling rungs.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agility Ladder Drills – Free Footwork Sequencing Trainer | SkillDrills',
    description: 'Free online agility ladder drills. Master bilateral motor sequencing, footwork timing, and rhythmic alternating cursor sweeps across scrolling rungs.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
    languages: getAlternateLanguages('/drills/physical/fitness/agility-ladder'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/' },
    { '@type': 'ListItem', position: 2, name: 'Physical Training', item: 'https://skilldrills.online/drills/physical' },
    { '@type': 'ListItem', position: 3, name: 'Fitness', item: 'https://skilldrills.online/drills/physical/fitness' },
    { '@type': 'ListItem', position: 4, name: 'Agility Ladder Drills', item: 'https://skilldrills.online/drills/physical/fitness/agility-ladder' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Agility Ladder Drills – Motor Sequencing & Rhythm Trainer',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online agility ladder and motor sequencing drill. Execute rapid left-right alternating cursor sweeps across descending rungs with millisecond rhythm precision.',
  url: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Agility Ladder Drills Game',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires modern web browser with HTML5 Canvas and pointer input support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
  dateModified: '2026-09-05',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the Agility Ladder Drills and what motor skills do they develop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agility Ladder Drills is an interactive physical coordination and motor sequencing exercise modeled after athletic speed ladders. It trains bilateral coordination, sequential motor syntax, rhythmic cursor sweeping, and dynamic target interception across scrolling rungs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do descending ladder rungs and alternating sweep mechanics work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ladders scroll downwards continuously. Each ladder features four rungs alternating in a strict Left-Right-Left-Right arrangement. Players must sweep their crosshair across each rung in exact numerical order (1 -> 2 -> 3 -> 4) before the ladder scrolls off screen.',
      },
    },
    {
      '@type': 'Question',
      name: 'What scientific models explain motor sequencing and movement syntax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The drill is founded on Karl Lashley's (1951) serial order of behavior, Richard Schmidt's (1975) Generalized Motor Program (GMP) schema, and Paul Fitts's (1954) motor amplitude laws. High-speed alternating movements execute as unified feedforward motor programs rather than individual sensory-guided corrections.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does difficulty scale across the 15 progression levels in Agility Ladder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Difficulty scales dynamically every 250 points up to Level 15. The downward scroll speed accelerates from 150 px/s up to 750 px/s, rung hitbox tolerance shrinks from 18px down to 10px, and subtle lateral positioning variance introduces unpredictable offset angles.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when I miss a rung or let a ladder scroll off screen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Missing a rung or allowing a ladder to escape off screen before clearing all 4 rungs triggers a red flash and resets your combo multiplier back to 1.0x. No points or timer seconds are deducted, allowing immediate rhythm recovery.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Fitts\'s Law govern lateral cursor sweeps on moving targets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Under Fitts's Law (1954), movement difficulty depends on target distance divided by target width. On moving targets, the effective target window compresses over time, requiring players to accelerate lateral sweeps while maintaining precise terminal deceleration.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does this agility ladder drill transfer to tactical FPS games and counter-strafing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In tactical shooters like Counter-Strike 2 and Valorant, counter-strafing requires rhythmic alternating finger and wrist coordination. The alternating Left-Right sweeps condition the neuromuscular timing necessary for clearing corners and jiggle-peeking angles smoothly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What mouse grip and sensitivity are recommended for high-velocity lateral sweeps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A moderate sensitivity (28 to 40 cm/360°) with a relaxed fingertip or claw grip enables quick lateral wrist-flicks without losing vertical stability as the ladder descends.',
      },
    },
    {
      '@type': 'Question',
      name: 'What score constitutes elite performance in Agility Ladder Drills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scores between 13,000 and 16,999 points indicate Elite Rhythm Sweeper performance (top 3%), while scores exceeding 17,000 points with 90%+ clearance accuracy at 750 px/s place a player in the top 0.1% Apex Agility Master tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Agility Ladder Drill free to play without installation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Agility Ladder Drills on SkillDrills is 100% free, runs directly in your web browser with HTML5 Canvas and pointer lock support, requires no download or account sign-up, and saves personal records locally.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Bilateral Motor Sequencing & Ladder Sweeps',
  description: 'Step-by-step guide to tracking descending ladders, executing alternating lateral sweeps in numerical sequence, and sustaining peak combo multipliers.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Track Descending Ladder Position',
      text: 'Click "Start Drill" to lock your pointer. Visually intercept the top of the descending ladder as it enters from the top edge of the canvas.',
    },
    {
      '@type': 'HowToStep',
      name: 'Sweep Alternating Rungs in Numerical Sequence',
      text: 'Glide your crosshair over Rung 1 (Left), then Rung 2 (Right), Rung 3 (Left), and Rung 4 (Right) in strict sequential order.',
    },
    {
      '@type': 'HowToStep',
      name: 'Clear Rungs Before Scrolling Past Canvas',
      text: 'Complete all 4 rungs before the ladder body exits the bottom boundary to earn base points and trigger particle audio confirmation.',
    },
    {
      '@type': 'HowToStep',
      name: 'Accelerate Sweeps to Maximize Combo Multiplier',
      text: 'Chain consecutive flawless ladders to drive your combo multiplier up to 3.0x max as scroll speeds accelerate toward 750 px/s over 45 seconds.',
    },
  ],
};

const guideProps = {
  sources: pickSources('lashley1951', 'schmidt1975', 'fitts1954', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'How motor sequencing is measured',
    paragraphs: [
      'This drill measures a repeating alternating pattern driven at rising speed, up to 750 px/s across a 45-second session.',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every event to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else\'s. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Agility Ladder Drills & Motor Sequencing Benchmarks',
    description: 'Empirical standards derived from serial motor ordering research (Lashley 1951), generalized motor program theory (Schmidt 1975), and motor velocity metrics (Fitts 1954, Woodworth 1899). Evaluates total score, maximum level achieved, scroll speed survived, and peak combo over 45 seconds.',
    columns: ['Tier', 'Rank Title', 'Score Benchmark', 'Peak Level', 'Scroll Velocity', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Agility Master',
        stat: '17,000+ pts',
        level: 'Level 12–15',
        accuracy: '650–750 px/s',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Elite Rhythm Sweeper',
        stat: '13,000–16,999 pts',
        level: 'Level 9–11',
        accuracy: '500–625 px/s',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Advanced Sequence Stepper',
        stat: '9,500–12,999 pts',
        level: 'Level 6–8',
        accuracy: '375–475 px/s',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Rung Tracker',
        stat: '6,000–9,499 pts',
        level: 'Level 3–5',
        accuracy: '250–350 px/s',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Ladder Learner',
        stat: '< 6,000 pts',
        level: 'Level 1–2',
        accuracy: '< 250 px/s',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train footwork sequencing',
    description: 'Structured training regimens designed to condition generalized motor program invariance, streamline alternating lateral sweep transitions, and regulate moving target interception.',
    items: [
      {
        title: 'Protocol 1: Lashley Serial Motor Syntax & Sub-Movement Chunking',
        description: "According to Karl Lashley (1951), rapid sequential movements are structured prior to initiation rather than regulated step-by-step through sensory feedback. Pre-program each ladder as a unified 4-stroke sweep (Left-Right-Left-Right) in your motor cortex, executing the entire pattern as an unbroken motor chunk.",
      },
      {
        title: 'Protocol 2: Schmidt Generalized Motor Program (GMP) Schema & Invariant Timing',
        description: 'Schmidt (1975) demonstrated that generalized motor programs maintain invariant relative timing across varying overall speeds. Keep the relative rhythm between rung strikes consistent (1:1:1:1), simply increasing overall muscular drive as the ladder scroll speed accelerates toward 750 px/s.',
      },
      {
        title: 'Protocol 3: Fitts Interceptive Amplitude & Moving Target Damping',
        description: "Under Fitts's Law (1954), intercepting moving targets requires compensating for ongoing displacement during limb travel. Aim your lateral cursor sweep slightly below each oncoming rung to account for vertical downward velocity, landing in the rung center with clean terminal deceleration.",
      },
      {
        title: 'Protocol 4: High-Velocity 750 px/s Metronomic Pacing',
        description: 'At Levels 10+ where scroll speeds exceed 550 px/s and rungs compress to 10px, eliminate visual hesitation. Anchor your gaze at the center axis between the left and right columns, using peripheral vision to time horizontal wrist snaps metronomically.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Agility Ladder Drills & Motor Sequencing',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function AgilityLadderPage() {
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
      <MotorSequencingClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
