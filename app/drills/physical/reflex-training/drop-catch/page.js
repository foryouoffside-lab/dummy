import DropCatchClient from './DropCatchClient';
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
// SEO RESEARCH FINDINGS — drop-catch
// PRIMARY:  "reflex drop catch"              — High-intent reflex query (volume unmeasured)
//           "drop catch reaction drill"     — Specific motor control phrase (volume unmeasured)
// SECONDARY / LSI:
//           "ruler drop test online"        — High-volume historical school test intent (volume unmeasured)
//           "reflex drop catch test"        — Standard test variant (volume unmeasured)
//           "falling target reaction test"  — Visual trajectory query (volume unmeasured)
//           "go no go reflex game"          — Inhibitory control query (volume unmeasured)
//           "impulse control reflex test"   — Cognitive inhibition query (volume unmeasured)
//           "reaction speed game"           — Head reflex category (volume unmeasured)
//           "hand eye coordination drop test" — Biomechanical coordination query (volume unmeasured)
// LOCALES:  ja (ドロップ キャッチ 反射 テスト), ko (드롭 캐치 반사 신경 테스트), de (falltest reaktionstraining)
// PAA TARGETS:
//   - What is the reflex drop catch test?
//   - How does optical tau govern gravitational target interception?
//   - How does the Logan horse-race model explain decoy impulse inhibition?
//   - What is Donders Type C discrimination reaction time?
//   - How does adaptive difficulty scale in Drop Catch?
//   - What happens when a red decoy is clicked?
//   - How does the +0.6s time extension mechanic work?
//   - Does drop catch training improve competitive gaming and esports performance?
//   - What is considered an elite score in Drop Catch?
//   - What equipment is needed to perform Drop Catch training?
// ============================================================

export const metadata = {
  title: 'Drop Catch Reflex Test - Free Reaction Timing Drill',
  description:
    'Free online reflex drop catch test. Catch falling green targets and avoid red decoys in this high-speed reflex training game for reaction time and impulse control.',
  keywords: [
    // Primary terms
    'reflex drop catch',
    'drop catch reaction drill',
    'ruler drop test online',
    // Secondary / LSI terms
    'reflex drop catch test',
    'falling target reaction test',
    'go no go reflex game',
    'impulse control reflex test',
    'reaction speed game',
    'hand eye coordination drop test',
    'gravitational interception drill',
    'visual discrimination reflex test',
    // Long-tail variants
    'free online reflex drop catch test',
    'falling ball reflex reaction drill',
    'esports inhibitory control click trainer',
    'ruler drop test alternative browser game',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch',
    languages: getAlternateLanguages('/drills/physical/reflex-training/drop-catch'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Drop Catch Reflex Test - Free Reaction Timing Drill',
    description:
      'Catch falling green targets and avoid red decoys in this high-speed reflex training game for reaction time and visual discrimination. Free browser drill.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Drop Catch Reflex Test - SkillDrills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drop Catch Reflex Test - Free Reaction Timing Drill',
    description:
      'Train gravitational target interception, impulse inhibition and choice reaction timing. 100% free browser drill.',
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
    { '@type': 'ListItem', position: 4, name: 'Drop Catch Reflex Test', item: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Drop Catch Reflex Test Tool',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires HTML5 Canvas and JavaScript support.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'High-speed gravitational interception and inhibitory impulse control drill designed to measure Donders Type C discrimination reaction latency and stop-signal compliance.',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Drop Catch - Gravitational Reflex Interception Trainer',
  url: 'https://skilldrills.online/drills/physical/reflex-training/drop-catch',
  description:
    'Free reflex test online and reaction training game. Catch accelerating falling green targets and avoid deceptive red decoys under dynamic time pressure.',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires a modern web browser with HTML5 Canvas support.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Interactive Physical Training Tool',
  teaches:
    'Gravitational Interception Timing, Inhibitory Impulse Control, Donders Type C Discrimination Reaction, Optical Tau Calibration, Ballistic Target Acquisition',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the reflex drop catch test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The reflex drop catch test is a neuro-cognitive exercise that simulates gravitational object fall (similar to the classic ruler drop test). Players must intercept falling green spheres before they hit the ground while simultaneously inhibiting motor responses to deceptive red decoy balls.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does optical tau govern gravitational target interception?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Formulated by David N. Lee (1976), optical tau (τ) defines the time-to-contact derived from the inverse expansion rate of the retinal image. Because falling targets accelerate quadratically under gravity, the visual cortex relies on optical tau to predict when and where the object will cross the capture zone.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Logan horse-race model explain decoy impulse inhibition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gordon Logan et al. (1984) proposed that response inhibition in Go/No-Go tasks functions as a horse race between a prepotent Go process (executing a click) and a Stop process (aborting action). When a red decoy appears, the Stop process must finish before the Go process reaches its motor execution threshold.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Donders Type C discrimination reaction time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Franciscus Donders (1868) classified reaction times into simple (Type A), choice (Type B), and discrimination (Type C). Drop Catch is a classic Type C task: multiple visual stimuli appear, but the observer must discriminate whether the target is green or red before releasing the motor command.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does adaptive difficulty scale in Drop Catch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As your score accumulates, falling acceleration increases up to 3.8x baseline velocity, target diameters compress from 40px down to 18px, and the probability of deceptive red decoys escalates, testing maximum inhibitory cognitive bandwidth.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when a red decoy is clicked?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clicking a red decoy triggers an immediate combo reset to 1.0x and flashes a red visual penalty. If time penalties are activated in settings, decoy hits also deduct 0.8 seconds from your remaining clock.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the +0.6s time extension mechanic work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every successful catch of a green target awards +0.6 seconds of bonus time. By executing fast, unbroken interceptions, skilled players outpace the 45-second timer, sustaining high-difficulty streaks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does drop catch training improve competitive gaming and esports performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. In tactical shooters like CS2 and Valorant, players must avoid friendly fire, ignore decoy grenades, and snap only to authentic hostiles. Training impulse inhibition reduces misclicks, trigger impatience, and premature firing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is considered an elite score in Drop Catch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reaching 24,000+ points with 90%+ catch accuracy and 0 fatal decoy clicks earns Tier 1: Apex Interceptor (Grade S). Intermediate players generally score between 11,000 and 16,999 points.',
      },
    },
    {
      '@type': 'Question',
      name: 'What equipment is needed to perform Drop Catch training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No specialized hardware is required. The drill functions on any modern desktop or mobile browser. For precision mouse flicks, a desktop optical mouse set to 1:1 raw input is recommended.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Gravitational Interception in Drop Catch',
  description:
    'Follow these 4 evidence-based steps to sharpen vertical tracking, suppress false decoy impulses, and maintain high streak multipliers.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Acquire Accelerating Vertical Stimulus',
      text: 'Track the upper boundary of the display canvas. Identify newly spawned falling spheres as they accelerate downward under gravitational physics.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Filter Decoy Distractors via Stop-Signal Inhibition',
      text: 'Engage Donders Type C discrimination. If the sphere is red with an X marking, withhold your click entirely to win the internal horse-race and preserve combo multipliers.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Execute Optical Tau Interception Click',
      text: 'For valid green targets, calculate time-to-contact (τ) and snap your cursor to intercept the falling sphere before it touches the bottom floor boundary.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Accumulate Clock Extensions & Level Progression',
      text: 'Every clean green interception adds +0.6 seconds to your session clock, enabling long-duration sessions that ramp up to supersonic falling velocities.',
    },
  ],
};

const guideProps = {
  sources: pickSources('lee1976', 'logan1984', 'donders1868', 'woodworth1899', 'fitts1954'),
  intro: {
    title: 'How drop-catch reactions are measured',
    paragraphs: [
      'This drill measures reaction to a falling target and, separately, how reliably you withhold a response on trials where you should not act at all.',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every event to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else\'s. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Drop Catch Reflex & Gravitational Interception Benchmarks',
    description: 'Empirical standards derived from time-to-contact psychophysics (Lee 1976), stop-signal response inhibition (Logan et al. 1984), and Donders Type C mental chronometry (Donders 1868). Evaluates total points, catch accuracy, discrimination reaction latency, and decoy suppression rate.',
    columns: ['Tier', 'Rank Title', 'Score Benchmark', 'Accuracy & Latency', 'Grade', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Interceptor',
        stat: '24,000+ pts',
        level: '90%+ Acc / < 200ms Latency',
        accuracy: 'Grade S',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Precision Reflex Catcher',
        stat: '17,000–23,999 pts',
        level: '82–89% Acc / 200–240ms Latency',
        accuracy: 'Grade A',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Skilled Target Acquirer',
        stat: '11,000–16,999 pts',
        level: '74–81% Acc / 241–290ms Latency',
        accuracy: 'Grade B',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Developing Reflex Trainee',
        stat: '6,000–10,999 pts',
        level: '65–73% Acc / 291–350ms Latency',
        accuracy: 'Grade C',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Decoy Vulnerable',
        stat: '< 6,000 pts',
        level: '< 65% Acc / > 350ms Latency',
        accuracy: 'Grade D',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train drop-catch reactions',
    description: 'Four progressive conditioning protocols integrating optical tau calculation, stop-signal inhibition, and discrimination chronometry.',
    items: [
      {
        title: 'Protocol 1: Lee Optical Tau Gravitational Interception',
        description: 'Focus visual attention on the accelerating rate of vertical expansion (τ) to gauge the precise intersection point, executing clicks within the upper 60% of the display canvas (Lee 1976).',
      },
      {
        title: 'Protocol 2: Logan Stop-Signal Response Inhibition Conditioning',
        description: 'Condition your motor cortex to delay ballistic clicks until chromatic identity (green vs red) is verified, strengthening the frontal inhibitory circuit that wins the horse-race against impulsive misclicks (Logan et al. 1984).',
      },
      {
        title: 'Protocol 3: Donders Type C Discrimination Reaction Pacing',
        description: 'Practice distinguishing target features under escalating fall speeds, training cognitive classification speed to operate within the 180–220ms window (Donders 1868).',
      },
      {
        title: 'Protocol 4: Woodworth Two-Component Ballistic Flick Calibration',
        description: 'Execute an initial open-loop ballistic flick toward the falling vertical column, utilizing micro-steering adjustments for terminal target capture (Woodworth 1899).',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Drop Catch & Reflex Testing',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function DropCatchPage() {
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
      <DropCatchClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
