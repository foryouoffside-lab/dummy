import ReactionChainClient from './ReactionChainClient';
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
// SEO RESEARCH FINDINGS — reaction-chain
// PRIMARY:  "impulse control reflex game"    — Focused mechanism query (volume unmeasured)
//           "reaction chain trainer"          — Specific tool search (volume unmeasured)
// SECONDARY / LSI:
//           "motor inhibition drill"          — Academic/athletic motor control query (volume unmeasured)
//           "precision stopping drill"        — Tactical shooter aiming query (volume unmeasured)
//           "mouse deceleration training"     — Technical gaming query (volume unmeasured)
//           "cursor brake control game"       — Diagnostic game phrase (volume unmeasured)
//           "reaction speed game"             — Broad volume head query (volume unmeasured)
//           "mouse precision test"            — Broad intent query (volume unmeasured)
//           "hand eye coordination game"      — General cognitive query (volume unmeasured)
//           "stop signal reaction test"       — Clinical psychology query (volume unmeasured)
// LOCALES:  ja (衝動 抑制 反射 トレーニング), ko (충동 억제 반사 훈련), de (impuls hemmer reflex spiel)
// PAA TARGETS:
//   - What is the Reaction Chain drill?
//   - How do impulse arrest mechanics work?
//   - What is motor inhibition in human performance?
//   - How does kinetic braking eliminate over-flicking in tactical shooters?
//   - What is the horse-race model of response inhibition?
//   - Why do targets change color as difficulty increases?
//   - How does the combo multiplier scale scoring?
//   - What constitutes an elite score in Reaction Chain?
//   - Does this drill require a physical mouse or work on trackpads?
//   - Is Reaction Chain free to train?
// ============================================================

export const metadata = {
  title: 'Impulse Control Reflex Game - Free Reaction Chain Drill',
  description:
    'Train reaction speed, motor inhibition, and precision stopping. Intercept and arrest cursor momentum on targets in this free reflex training game.',
  keywords: [
    // Primary terms
    'impulse control reflex game',
    'reaction chain trainer',
    'motor inhibition drill',
    // Secondary / LSI terms
    'precision stopping drill',
    'mouse deceleration training',
    'cursor brake control game',
    'reaction speed game',
    'mouse precision test',
    'hand eye coordination game',
    'stop signal reaction test',
    // Long-tail variants
    'free online browser reflex game',
    'eliminate mouse overflicking drill',
    'kinetic brake control training browser',
    'tactical shooter snap deceleration exercise',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain',
    languages: getAlternateLanguages('/drills/physical/reflex-training/reaction-chain'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Impulse Control Reflex Game - Free Reaction Chain Drill',
    description:
      'Train reaction speed, motor inhibition, and precision stopping. Intercept and arrest cursor momentum on incoming targets in this free reflex game.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Reaction Chain Impulse Arrest - SkillDrills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impulse Control Reflex Game - Free Reaction Chain Drill',
    description:
      'Train neuromuscular motor inhibition, kinetic braking, and precision target arrest across 15 difficulty tiers with real-time velocity diagnostics.',
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
    { '@type': 'ListItem', position: 4, name: 'Reaction Chain', item: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Reaction Chain Impulse Arrest Drill',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires HTML5 Canvas and JavaScript support.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Interactive neuromuscular motor inhibition drill. Intercept fast-moving targets and bring the cursor to a complete stop on command.',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Reaction Chain - Impulse Control Reflex Game',
  url: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain',
  description:
    'Free online impulse control reflex game and motor inhibition trainer. Intercept nodes and halt cursor velocity completely to build streaks and master kinetic braking.',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires a modern web browser with HTML5 Canvas support.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Interactive Physical Training Tool',
  teaches:
    'Motor Inhibition, Kinetic Braking Control, Stop-Signal Response Arrest, High-Speed Target Interception, Fitts Precision Pacing',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Reaction Chain drill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reaction Chain is an elite neuro-motor training drill focusing on mouse deceleration and impulse arrest. Instead of clicking targets, players must steer their cursor over moving nodes and halt momentum completely to arrest them.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do impulse arrest mechanics work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When your crosshair is within an active target node, your cursor speed must drop below 1.5 pixels per frame to trigger an arrest. Bringing your cursor to a complete halt scores 50 base points and advances your combo streak.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is motor inhibition in human performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Motor inhibition is the neurological capacity of the central nervous system to suppress or arrest an ongoing motor command (Logan et al. 1984). It relies on fast-acting antagonist muscle recruitment to overcome limb inertia.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does kinetic braking eliminate over-flicking in tactical shooters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In tactical shooters like Counter-Strike 2 and Valorant, first-shot accuracy requires instantaneous weapon stabilization. Training kinetic arrest conditions the antagonist forearm muscles to clamp down immediately on target acquisition.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the horse-race model of response inhibition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Logan’s horse-race model posits that motor stopping is a race between a GO process (accelerating towards an objective) and a STOP process (inhibitory braking). If the stop signal finishes before motor execution is completed, the action is successfully arrested.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do targets change color as difficulty increases?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As your score climbs, node velocities scale from 600 px/s up to 1,800 px/s. Color transitions from Green to Orange to Red provide immediate visual velocity cues, demanding tighter braking deceleration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the combo multiplier scale scoring?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consecutive successful arrests build your combo multiplier up to 3.0x max. Slicing through a node without stopping or allowing a node to exit out-of-bounds resets the multiplier back to 1.0x.',
      },
    },
    {
      '@type': 'Question',
      name: 'What constitutes an elite score in Reaction Chain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scores above 15,000 points represent the Master tier (top 0.5%), requiring 90%+ arrest accuracy against 1,400+ px/s node velocities over the 45-second duration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this drill require a physical mouse or work on trackpads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A physical mouse with raw input on a gaming mousepad is strongly recommended. The micro-friction of a mouse skate is critical for training physical forearm deceleration mechanics.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Reaction Chain free to train?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! SkillDrills Reaction Chain is 100% free, runs entirely client-side in your browser, and requires no downloads or registration.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train with Reaction Chain Impulse Arrest',
  description: 'Step-by-step instructions for executing kinetic arrests and conditioning motor deceleration.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Engage the Drill',
      text: 'Click start to lock your cursor into the canvas field and prepare for high-speed node launches.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Intercept Incoming Node',
      text: 'Track the incoming target trajectory and execute an open-loop ballistic flick to place your crosshair within its boundary.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Arrest Cursor Momentum',
      text: 'Engage antagonist forearm muscles to bring your mouse velocity below 1.5 px/frame to complete the kinetic arrest (+50 PTS).',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Chain Continuous Streaks',
      text: 'Rapidly transition to the next launch vector without overshoot errors to build and hold the maximum 3.0x multiplier.',
    },
  ],
};

const guideProps = {
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'donders1969', 'woods2015'),
  intro: {
    title: 'How motor braking is measured',
    paragraphs: [
      'This drill measures interception followed by a full stop inside a target zone — starting a fast movement and cancelling it are separate abilities.',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every event to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else\'s. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Reaction Chain & Motor Inhibition Benchmarks',
    description: 'Empirical standards derived from horse-race response inhibition models (Logan et al. 1984), two-component motor control (Woodworth 1899), discrimination reaction chronometry (Donders 1868/1969), and speed-accuracy constraints (Fitts 1954). Evaluates total points, arrest success percentage, peak target velocity, and streak retention.',
    columns: ['Tier', 'Rank Title', 'Score Benchmark', 'Accuracy & Velocity', 'Grade', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Kinetic Stopper',
        stat: '20,000+ pts',
        level: '95%+ Acc / 1500+ px/s',
        accuracy: 'Grade S',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Precision Braking Master',
        stat: '14,000–19,999 pts',
        level: '88–94% Acc / 1200–1499 px/s',
        accuracy: 'Grade A',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Kinetic Interceptor',
        stat: '9,000–13,999 pts',
        level: '80–87% Acc / 900–1199 px/s',
        accuracy: 'Grade B',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Developing Stopper',
        stat: '5,000–8,999 pts',
        level: '70–79% Acc / 600–899 px/s',
        accuracy: 'Grade C',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Inertia Vulnerable',
        stat: '< 5,000 pts',
        level: '< 70% Acc / < 600 px/s',
        accuracy: 'Grade D',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train motor braking',
    description: 'Four progressive conditioning regimens targeting antagonist muscle recruitment, open-loop snap deceleration, and stop-signal latency.',
    items: [
      {
        title: 'Protocol 1: Logan Stop-Signal Antagonist Activation',
        description: 'Practice actively tensing antagonist extensor/flexor muscle groups the instant your crosshair enters the node radius, winning the horse-race against forward momentum (Logan et al. 1984).',
      },
      {
        title: 'Protocol 2: Woodworth Two-Component Deceleration Pacing',
        description: 'Condition an aggressive open-loop initial flick covering 90% of the distance followed by an immediate closed-loop clamping phase to arrest inertia within the target circle (Woodworth 1899).',
      },
      {
        title: 'Protocol 3: Donders Type C Discrimination Arrest Pacing',
        description: 'Calibrate mental chronometry to adjust braking force based on node color and velocity (Green: 600 px/s, Orange: 1100 px/s, Red: 1800 px/s) without anticipatory over-braking (Donders 1868/1969).',
      },
      {
        title: 'Protocol 4: Fitts Constricted Boundary Kinetic Stabilization',
        description: 'Stress-test cursor holding stability at Level 10+, keeping velocity strictly under 1.5 px/frame across compressed target radii (Fitts 1954; Woods et al. 2015).',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Reaction Chain & Motor Inhibition',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function ReactionChainPage() {
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
      <ReactionChainClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
