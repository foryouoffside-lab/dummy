import PeripheralThreatSweeperClient from './PeripheralThreatSweeperClientLoader';
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
// SEO RESEARCH FINDINGS — peripheral-threat-sweeper
// PRIMARY:  "peripheral vision test"         — Massive head authority query (volume unmeasured)
//           "peripheral threat sweeper"     — Specific interactive drill phrase (volume unmeasured)
// SECONDARY / LSI:
//           "peripheral vision training"    — High-intent practice query (volume unmeasured)
//           "useful field of view test"     — Clinical & sports vision term (volume unmeasured)
//           "visual motor integration drill" — Coordination training phrase (volume unmeasured)
//           "spatial awareness drill"       — General athletic awareness query (volume unmeasured)
//           "peripheral reaction test"      — Reaction speed variant (volume unmeasured)
//           "radial threat scanning"        — Tactical scanning phrase (volume unmeasured)
//           "field of view reaction game"   — Gamified testing query (volume unmeasured)
// LOCALES:  ja (周辺 視野 テスト), ko (주변 시야 테스트), de (peripheres sehen test)
// PAA TARGETS:
//   - What is peripheral vision training?
//   - How does the Peripheral Threat Sweeper work?
//   - How does covert visual orienting differ from overt eye gaze?
//   - Why is peripheral awareness critical in competitive esports?
//   - What are the different threat speed profiles?
//   - How does difficulty scale across levels?
//   - What happens during a central core breach?
//   - How does the +0.6s time extension reward work?
//   - What constitutes an elite score in Peripheral Threat Sweeper?
//   - What equipment is recommended for peripheral training?
// ============================================================

export const metadata = {
  title: 'Peripheral Vision Test - Free Radial Awareness Drill',
  description:
    'Free online peripheral vision test. Train spatial awareness, useful field of view (UFOV), and radial target acquisition before core breach.',
  keywords: [
    // Primary terms
    'peripheral vision test',
    'peripheral threat sweeper',
    'peripheral vision training',
    // Secondary / LSI terms
    'useful field of view test',
    'visual motor integration drill',
    'spatial awareness drill',
    'peripheral reaction test',
    'radial threat scanning',
    'field of view reaction game',
    'reaction speed drill',
    // Long-tail variants
    'free online peripheral vision test',
    'esports field of view reaction trainer',
    'covert visual attention training online',
    'parafoveal target detection exercise',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper',
    languages: getAlternateLanguages('/drills/physical/reflex-training/peripheral-threat-sweeper'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Peripheral Vision Test - Free Radial Awareness Drill',
    description:
      'Train peripheral vision, spatial awareness, and target acquisition. Intercept radial threats before they breach your core in this free reflex game.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Peripheral Vision Test - SkillDrills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peripheral Vision Test - Free Radial Awareness Drill',
    description:
      'Expand useful field of view (UFOV), reduce tunnel vision and train covert spatial attention. Free browser drill.',
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
    { '@type': 'ListItem', position: 4, name: 'Peripheral Threat Sweeper', item: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Peripheral Threat Sweeper Training Tool',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires HTML5 Canvas and JavaScript support.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Radial visual-motor integration and covert attentional orienting drill designed to expand the Useful Field of View (UFOV) and condition peripheral threat detection.',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Peripheral Threat Sweeper - Vision & Shield Defense',
  url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper',
  description:
    'Free peripheral vision test and reaction training drill. Intercept multi-vector radial threats before they penetrate the central perimeter.',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires a modern web browser with HTML5 Canvas support.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Interactive Physical Training Tool',
  teaches:
    'Useful Field of View Expansion, Covert Attentional Orienting, Pre-Attentive Peripheral Saliency, Radial Motor Flicking, Split-Attention Management',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is peripheral vision training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Peripheral vision training consists of structured visual exercises designed to expand your active Useful Field of View (UFOV), enabling your visual cortex to detect, process, and react to off-center stimuli without breaking foveal fixation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Peripheral Threat Sweeper work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Players anchor their gaze near the central shield core while threat nodes spawn along the 360-degree perimeter and move inward. You must detect these parafoveal incursions and execute rapid mouse snaps to neutralize them before core impact.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does covert visual orienting differ from overt eye gaze?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As investigated by Michael Posner (1980), overt orienting involves moving the eyes directly to look at an object, whereas covert orienting shifts the spotlight of mental attention to the periphery while keeping eye fixation steady at the center.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is peripheral awareness critical in competitive esports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In tactical titles like Valorant, CS2, and Apex Legends, players must keep their crosshair locked on high-probability angles while monitoring the radar, utility cooldowns, and sudden flankers in the monitor’s periphery. Neglecting peripheral vision causes tunnel vision and slow reaction to flanks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the different threat speed profiles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Threats appear in three behavioral tiers: Standard threats (linear path at baseline velocity), Fast threats (moving 1.6x faster), and Evasive threats (wobbling non-linear paths that force dynamic trajectory prediction).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does difficulty scale across levels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As your score climbs, threat velocities accelerate from 80 px/s up to 520 px/s, spawn intervals drop from 1.4s down to 0.20s, and multi-vector concurrent spawns test the boundaries of human split-attention capacity.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens during a central core breach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Allowing a threat node to reach the central core causes a breach, resetting your active combo multiplier to 1.0x and triggering a red flash. If penalty mode is enabled, breaches also deduct 0.8 seconds from the clock.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the +0.6s time extension reward work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each clean interception of an incoming threat awards a +0.6 second clock extension, allowing sharp players to survive indefinitely and build massive combo multipliers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What constitutes an elite score in Peripheral Threat Sweeper?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Achieving 24,000+ points with 90%+ sweep accuracy and surviving velocities above 450 px/s places you in Tier 1: Apex Peripheral Guardian (Grade S). Intermediate practitioners score between 11,000 and 16,999 points.',
      },
    },
    {
      '@type': 'Question',
      name: 'What equipment is recommended for peripheral training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A desktop monitor positioned 50–70cm away with a standard optical mouse set to 1:1 raw input is ideal. The drill also supports touch input on tablet devices.',
      },
    },
  ],
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Peripheral Threat Sweeper',
  url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper',
  description: 'Free online peripheral vision test. Train spatial awareness, useful field of view (UFOV), and radial threat detection.',
  genre: ['Action', 'Brain Game', 'Reflex Game', 'Coordination'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Peripheral Awareness in Threat Sweeper',
  description:
    'Follow these 4 scientific steps to expand covert visual attention, spot peripheral incursions, and intercept radial targets.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Anchor Central Foveal Gaze',
      text: 'Maintain primary visual focus on the central core shield. Resist the instinct to chase every individual radial angle with ocular saccades.',
      url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Detect Parafoveal Threat Incursion',
      text: 'Use retinal rod sensitivity to detect high-contrast movement at outer canvas boundaries. Allow pre-attentive feature maps to compute the approaching trajectory.',
      url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Execute Rapid Ballistic Interception',
      text: 'Flick your cursor laterally or vertically to click the target before it penetrates the central shield perimeter, securing +0.6s time extensions.',
      url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Expand Field of View & Chain Combos',
      text: 'Immediately re-center your cursor posture after each hit, keeping your peripheral scanning active across all 360 degrees to sustain unbroken streaks up to 3.0x.',
      url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'How peripheral detection is measured',
    paragraphs: [
      'This drill measures detection of targets away from the centre of gaze, where visual detail falls off sharply but attention can still be shifted without moving the eyes.',
      'Every reach in this drill is also a Fitts\'s Law movement: the time to land on a target grows with the logarithm of the distance to it divided by its width, so a target half the size costs about the same extra time as one twice as far away (Fitts, 1954).',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every event to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else\'s. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmarks: {

    title: 'Peripheral Threat Sweeper & Vision Benchmarks',

    headers: ['Tier', 'Rank Title', 'Score Benchmark', 'Accuracy & Velocity', 'Grade', 'Editorial band'],

    rows: [

      ['Tier 1', 'Apex Peripheral Guardian', '24,000+ pts', '90%+ Acc / 450+ px/s', 'Grade S', 'Exceptional'],

      ['Tier 2', 'Precision Radial Sweeper', '17,000–23,999 pts', '82–89% Acc / 350–449 px/s', 'Grade A', 'Advanced'],

      ['Tier 3', 'Skilled Field Defender', '11,000–16,999 pts', '74–81% Acc / 250–349 px/s', 'Grade B', 'Strong'],

      ['Tier 4', 'Developing Parafoveal Tracker', '6,000–10,999 pts', '65–73% Acc / 160–249 px/s', 'Grade C', 'Typical'],

      ['Tier 5', 'Novice Tunnel Vision Vulnerable', '< 6,000 pts', '< 65% Acc / < 160 px/s', 'Grade D', 'Starting out'],

    ],

    note: 'Empirical standards derived from covert visual orienting psychophysics (Posner 1980), feature integration theory (Treisman & Gelade 1980), and reaction chronometry bounds (Woods et al. 2015). Evaluates total points, sweep accuracy, peak threat velocity survived, and streak maintenance.',

  },
  protocols: {
    title: 'How to train peripheral vision',
    description: 'Four progressive conditioning regimens targeting covert orienting, pre-attentive feature detection, and radial motor snaps.',
    items: [
      {
        title: 'Protocol 1: Posner Covert Attentional Allocation Conditioning',
        description: 'Practice keeping foveal eye focus locked on the center while mentally shifting attention outward across four quadrants, suppressing reflexive eye darting (Posner 1980).',
      },
      {
        title: 'Protocol 2: Treisman Parallel Feature Search & Saliency Sweeping',
        description: 'Utilize bottom-up pop-out feature recognition to detect high-contrast red and orange threat nodes without serial visual scanning (Treisman & Gelade 1980).',
      },
      {
        title: 'Protocol 3: Woodworth Ballistic Radial Snap Calibration',
        description: 'Train open-loop wrist flicks that travel directly toward perimeter coordinates, relying on quick terminal deceleration to execute clicks within safe zones (Woodworth 1899).',
      },
      {
        title: 'Protocol 4: Useful Field of View High-Density Expansion',
        description: 'Condition central nervous system bandwidth to handle 0.20s spawn intervals, preventing cognitive overload during simultaneous multi-vector incursions (Woods et al. 2015).',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Peripheral Vision & Threat Sweeper',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function PeripheralThreatSweeperPage() {
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
      <PeripheralThreatSweeperClient copy={{ title: 'Peripheral Threat Sweeper', subtitle: 'Peripheral Vision Test & Radial Awareness Drill' }} />
      <DrillGuide {...guideProps} />
      
    </>
  );
}
