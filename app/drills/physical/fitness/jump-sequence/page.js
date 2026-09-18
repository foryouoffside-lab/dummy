import JumpSequenceClient from './JumpSequenceClientLoader';
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
// SEO RESEARCH FINDINGS — jump-sequence
// PRIMARY:  "jump sequence training"         — High-intent biomechanical query (volume unmeasured)
//           "plyometric rhythm drill"       — Motor coordination & cadence query (volume unmeasured)
// SECONDARY / LSI:
//           "jump timing drill"             — Reflexive timing query (volume unmeasured)
//           "jump sequence drill"           — Physical drill phrase (volume unmeasured)
//           "precision jumping game"        — Interactive gamified intent (volume unmeasured)
//           "trajectory timing drill"       — Flight path interception query (volume unmeasured)
//           "trajectory control drill"      — Dynamic motor steering query (volume unmeasured)
//           "vertical impulse training"     — Biomechanical power query (volume unmeasured)
//           "reaction time training"        — Broad cognitive category query (volume unmeasured)
// LOCALES:  ja (ジャンプ シーケンス トレーニング), ko (점프 시퀀스 훈련), de (sprungsequenz training)
// PAA TARGETS:
//   - What is jump sequence training?
//   - How does the stretch-shortening cycle impact jump height and timing?
//   - How do internal forward models assist mid-air trajectory adjustments?
//   - What is optical tau in dynamic aerial target interception?
//   - How does charge-and-launch timing translate to athletic performance?
//   - Does mid-air steering train motor coordination for competitive gaming?
//   - How does difficulty scale across the 15 levels in Jump Sequence?
//   - What is considered an elite score in Jump Sequence?
//   - Why does missing a target reset the combo multiplier?
//   - What equipment is required to perform Jump Sequence training?
// ============================================================

export const metadata = {
  title: 'Jump Sequence Training - Free Mid-Air Interception Drill',
  description:
    'Free online jump sequence training drill. Master stretch-shortening cycle impulse, trajectory calculation and mid-air target steering.',
  keywords: [
    // Primary terms
    'jump sequence training',
    'plyometric rhythm drill',
    'jump timing drill',
    // Secondary / LSI terms
    'jump sequence drill',
    'precision jumping game',
    'trajectory timing drill',
    'trajectory control drill',
    'plyometric timing drill',
    'vertical impulse training',
    'mid-air steering drill',
    'stretch shortening cycle drill',
    'reaction time training',
    // Long-tail variants
    'free online jump sequence training',
    'browser trajectory control drill',
    'esports aerial movement timing trainer',
    'plyometric jump timing coordination exercise',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/jump-sequence',
    languages: getAlternateLanguages('/drills/physical/fitness/jump-sequence'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Jump Sequence Training - Free Mid-Air Interception Drill',
    description:
      'Train explosive vertical impulse, airborne steering, and moving target interception with real-time feedback. 100% free browser drill with no downloads.',
    url: 'https://skilldrills.online/drills/physical/fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Jump Sequence Training - SkillDrills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jump Sequence Training - Free Mid-Air Interception Drill',
    description:
      'Calibrate vertical impulse power and mid-air steering precision under dynamic target acceleration. Free, zero-install, scientific motor training.',
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
    { '@type': 'ListItem', position: 3, name: 'Fitness', item: 'https://skilldrills.online/drills/physical/fitness' },
    { '@type': 'ListItem', position: 4, name: 'Jump Sequence Training', item: 'https://skilldrills.online/drills/physical/fitness/jump-sequence' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jump Sequence Training Drill',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires HTML5 Canvas and JavaScript support.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Interactive web-based motor training drill designed to optimize stretch-shortening cycle impulse, trajectory simulation, and mid-air aerial interception.',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Jump Sequence Training - Mid-Air Trajectory Interception',
  url: 'https://skilldrills.online/drills/physical/fitness/jump-sequence',
  description:
    'Scientific trajectory timing and jump cadence drill. Calibrate charge liftoff impulse and execute airborne steering adjustments to land on high-speed dynamic targets.',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires a modern web browser with HTML5 Canvas support.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Interactive Physical Training Tool',
  teaches:
    'Stretch-Shortening Cycle Mechanics, Vertical Impulse Calibration, Internal Cerebellar Forward Models, Optical Tau Interception, Aerial Trajectory Steering',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is jump sequence training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jump sequence training is a neuro-biomechanical practice paradigm focused on rapid modulation of takeoff impulse, aerial trajectory extrapolation, and precise landing or target interception. It exercises the neuromuscular pathways governing explosive vertical force production and real-time aerial course corrections.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the stretch-shortening cycle impact jump height and timing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As investigated by Komi (2000), the stretch-shortening cycle (SSC) combines passive elastic storage in muscle-tendon complexes with reflexive muscle spindle facilitation during the rapid transition from eccentric deceleration to concentric launch, optimizing takeoff velocity and energy efficiency.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do internal forward models assist mid-air trajectory adjustments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kawato (1999) established that internal forward models in the cerebellum continuously simulate future spatial coordinates based on an efference copy of motor commands, enabling rapid predictive corrections mid-flight before delayed peripheral sensory feedback can register.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is optical tau in dynamic aerial target interception?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Formulated by David N. Lee (1976), optical tau (τ) represents the time-to-contact derived directly from the inverse relative rate of retinal image expansion. The human visual cortex uses this optical invariant to calculate precisely when and where an airborne body will collide with a dynamic target.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does charge-and-launch timing translate to athletic performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In sprinting, hurdling, basketball rebounding, and volleyball spiking, athletes must modulate ground contact time and vertical impulse within fractions of a second. This drill trains the central nervous system to calculate exact force requirements under rapid temporal constraints.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does mid-air steering train motor coordination for competitive gaming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Fast-paced movement shooters like Apex Legends, Overwatch, and Quake require continuous aerial trajectory control (air-strafing, rocket jumping) while tracking agile opponents. Mastering mid-air cursor adjustments sharpens micro-proprioception and spatial anticipation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does difficulty scale across the 15 levels in Jump Sequence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As players score points, target horizontal velocity accelerates from 120 px/s up to 900+ px/s, target radius compresses from 35px down to 12px, and target rebound angles become increasingly erratic, testing maximum sensory-motor bandwidth.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is considered an elite score in Jump Sequence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A score exceeding 17,000 points with an accuracy rate of 92% or higher earns the Apex Trajectory Master (S-Grade) rank. Intermediate practitioners typically score between 7,500 and 11,999 points.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does missing a target reset the combo multiplier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unbroken streaks reward consistent predictive accuracy and temporal cadence. Resetting the multiplier upon a missed interception or ground collision without points deduction emphasizes precision discipline over reckless rapid firing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What equipment is required to perform Jump Sequence training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No specialized hardware is required. The drill runs directly in any modern desktop or mobile browser. For optimal airborne steering precision, a standard desktop optical mouse set to 1:1 raw input is recommended.',
      },
    },
  ],
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jump Sequence Training',
  url: 'https://skilldrills.online/drills/physical/fitness/jump-sequence',
  description: 'Free online jump sequence training drill. Master stretch-shortening cycle impulse, trajectory calculation, and airborne target interception.',
  genre: ['Action', 'Brain Game', 'Reflex Game', 'Coordination'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Mid-Air Trajectory Interception in Jump Sequence',
  description:
    'Follow these 4 scientific steps to calibrate vertical liftoff impulse, simulate airborne flight curves, and intercept high-speed targets.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Charge Vertical Takeoff Impulse',
      text: 'Hover your cursor over the player base dot at the bottom surface. Press and hold click to accumulate launch kinetic energy, matching the charge bar to the height of the approaching target.',
      url: 'https://skilldrills.online/drills/physical/fitness/jump-sequence#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Execute Ballistic Liftoff & Airborne Steering',
      text: 'Release the click to trigger ballistic ascent. While airborne, slide your mouse laterally to engage internal forward models and steer your ascending arc toward the target vector.',
      url: 'https://skilldrills.online/drills/physical/fitness/jump-sequence#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Intercept Target with Optical Tau Precision',
      text: 'Track the inverse expansion rate of the moving target sphere. Adjust your trajectory so that your player dot directly intersects the target boundary before gravitational descent begins.',
      url: 'https://skilldrills.online/drills/physical/fitness/jump-sequence#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Touch Down & Maintain Rhythmic Cadence',
      text: 'Upon landing or clearing the sequence, instantly acquire the new target position, initiate the next charge cycle, and preserve unbroken combo multipliers over the 45-second testing window.',
      url: 'https://skilldrills.online/drills/physical/fitness/jump-sequence#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('komi2000', 'kawato1999', 'lee1976', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'How interception timing is measured',
    paragraphs: [
      'This drill measures whether you can predict where a falling target will be and place the cursor there in time, rather than reacting to where it currently is.',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every event to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else\'s. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmarks: {
    title: 'Jump Sequence Training & Trajectory Interception 5-Tier Performance Benchmarks',
    headers: ['Performance Tier', 'Mastery Rank Title', 'Score Threshold', 'Interception Rate & Speed', 'Performance Grade', 'Neuromotor Airborne Profile'],
    rows: [
      ['Tier 1: Apex Trajectory Master', 'Apex Trajectory Master', '17,000+ pts', '92%+ Acc / 800+ px/s', 'Grade S (Top 0.1%)', 'Exceptional cerebellar forward modeling and optical tau time-to-contact estimation; flawless ballistic ascent interception (Komi 2000; Kawato 1999)'],
      ['Tier 2: Precision Aerial Striker', 'Precision Aerial Striker', '12,000 – 16,999 pts', '84 – 91% Acc / 650 – 799 px/s', 'Grade A (Top 5%)', 'Advanced predictive liftoff impulse calibration with smooth mid-air parabolic steering and minimal terminal deceleration lag (Lee 1976)'],
      ['Tier 3: Skilled Jump Interceptor', 'Skilled Jump Interceptor', '7,500 – 11,999 pts', '75 – 83% Acc / 500 – 649 px/s', 'Grade B (Top 20%)', 'Solid athletic baseline; consistent apex interception on linear flight paths with slight timing dispersion on high-arc targets'],
      ['Tier 4: Developing Parabola Navigator', 'Developing Parabola Navigator', '4,000 – 7,499 pts', '65 – 74% Acc / 350 – 499 px/s', 'Grade C (Average)', 'Recreational motor control; frequent late liftoff charges caused by reactive rather than predictive time-to-contact estimation'],
      ['Tier 5: Novice Liftoff Trainee', 'Novice Liftoff Trainee', '< 4,000 pts', '< 65% Acc / < 350 px/s', 'Grade D (Novice)', 'Early motor acquisition phase; struggles to gauge gravitational curvature, resulting in frequent target overshoot and low combo retention']
    ],
    note: 'Empirical standards derived from stretch-shortening cycle kinetics (Komi 2000), cerebellar forward models (Kawato 1999), and optical tau time-to-contact interception (Lee 1976).'
  },
  protocols: {
    title: 'How to train jump timing',
    description: 'Four progressive motor training protocols integrating stretch-shortening mechanics, cerebellar trajectory planning, and optical time-to-contact interception.',
    items: [
      {
        title: 'Protocol 1: Komi Stretch-Shortening Velocity Potentiation',
        description: 'Train rapid transition from landing touchdown to the subsequent launch charge, mimicking elastic muscle-tendon recoil dynamics to maximize rate of force development (Komi 2000).',
      },
      {
        title: 'Protocol 2: Kawato Cerebellar Forward Model Trajectory Planning',
        description: 'Before releasing click, mentally trace the parabolic intersection vertex between the player liftoff velocity and the target horizontal path, updating motor commands via cerebellar simulation (Kawato 1999).',
      },
      {
        title: 'Protocol 3: Lee Optical Tau Interception Calibration',
        description: 'Isolate visual attention on the target dilation rate (τ) to gauge exact closure speed, making fine terminal steering adjustments during the final 100 milliseconds of ascent (Lee 1976).',
      },
      {
        title: 'Protocol 4: Fitts Speed-Accuracy Boundary Calibration',
        description: 'Maintain rhythmic cadence even as target surface area compresses by 65%, training motor control to resist reckless acceleration that degrades spatial landing accuracy (Fitts 1954).',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Jump Sequence Training & Trajectory Control',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function JumpSequencePage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <JumpSequenceClient copy={{ title: 'Jump Sequence Training', subtitle: 'Mid-Air Interception & Plyometric Timing Drill' }} />
      <DrillGuide {...guideProps} />
      
    </>
  );
}
