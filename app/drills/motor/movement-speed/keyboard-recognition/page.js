import KeyboardRecognitionClient from './KeyboardRecognitionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — keyboard-recognition (motor-keyboard-speed)
// PRIMARY:  "keyboard speed test"         — Core search phrase (~3,600 searches/mo)
//           "keybind reaction trainer"    — Direct mechanism & utility search
// SECONDARY / LSI:
//           "keyboard recognition test"   — Cognitive mapping query
//           "gaming keybind trainer"      — Competitive FPS mechanic term
//           "keybind muscle memory"       — Neuromuscular conditioning search
//           "keyboard reflex test"        — Reaction speed assessment query
//           "key press reaction time"     — Chronometry query
//           "keyboard layout trainer"     — Spatial keyboard mapping search
//           "keybind speed test"          — Velocity assessment phrase
//           "response inhibition test"    — Cognitive control search
//           "keyboard dexterity test"     — Fine motor skill phrase
//           "valorant keybind practice"   — Title-specific esports query
//           "cs2 keybind practice"        — Counter-Strike utility query
// ============================================================

export const metadata = {
  title: 'Keyboard Speed Test – Free Keybind Reaction Trainer',
  description: "Free keyboard speed test. Measure how fast you press the right key for a prompt, against Hick's Law of choice reaction time. No sign-up.",
  keywords: [
    'keyboard speed test',
    'keybind reaction trainer',
    'keyboard recognition test',
    'gaming keybind trainer',
    'keybind muscle memory',
    'keyboard reflex test',
    'key press reaction time',
    'keyboard layout trainer',
    'keybind speed test',
    'response inhibition test',
    'keyboard dexterity test',
    'valorant keybind practice',
    'cs2 keybind practice',
  ],
  openGraph: {
    title: 'Keyboard Speed Test – Free Keybind Reaction Trainer | SkillDrills',
    description: 'Test keyboard layout familiarity, choice reaction time, and gaming keybind reflex speed with this free keybind trainer. Instant browser drill, zero install required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keyboard Speed Test – Free Keybind Reaction Trainer | SkillDrills',
    description: 'Test keyboard layout familiarity, choice reaction time, and gaming keybind reflex speed with this free keybind trainer. Instant browser drill, zero install required.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition',
    languages: getAlternateLanguages('/drills/motor/movement-speed/keyboard-recognition'),
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
    { '@type': 'ListItem', position: 4, name: 'Keyboard Speed Test', item: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Keyboard Speed Test – Free Keybind Reaction Trainer',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based keyboard speed test and keybind reaction trainer. Measure choice reaction latency, keybind muscle memory, and response inhibition.',
  url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Keyboard Speed Test',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires HTML5 Canvas and JavaScript support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Keyboard Speed Test – Keybind Reaction Trainer',
  url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition',
  description: "Measure how fast you press the right key for a prompt, against Hick's Law of choice reaction time.",
  genre: ['Keyboard Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a keyboard speed test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A keyboard speed test measures the latency between seeing a key prompt on screen and depressing the corresponding physical key on your keyboard. It evaluates choice reaction time, spatial keyboard layout familiarity, and motor response inhibition.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does keybind training improve FPS performance in Valorant and CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In tactical shooters, executing weapon switches, utility deployment (smokes, flashes), and ability casts under fire demands zero hesitation. Keybind training automates stimulus-response mapping in the motor cortex, eliminating glance-down delays and mispresses in high-pressure clutch rounds.',
      },
    },
    {
      '@type': 'Question',
      name: "What is choice reaction time and how does Hick's Law apply here?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Choice reaction time (Donders 1868) measures decision latency when selecting among multiple stimuli. Hick's Law states that reaction time increases logarithmically as the number of possible stimulus-response alternatives grows. Keybind muscle memory minimizes cognitive choice overhead, compressing reaction time toward simple reflex latencies.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does the Fake Prompt / trap mechanism test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Fake Prompt feature tests response inhibition (Logan 1984 stop-signal paradigm). When an invalid prompt or decoy key appears, your prefrontal cortex must actively suppress the prepared motor discharge. Resisting false triggers prevents catastrophic miscasts in competitive gaming.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an average single-key reaction time for gaming keybinds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Untrained keyboard users average 380–480 ms for single-key choice reactions. Competitive FPS and MOBA players achieve 240–300 ms through automated muscle memory. Elite esports athletes operate under 240 ms with near-flawless trap inhibition.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does sequence typing mode challenge motor programming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sequence mode presents multi-key combos (e.g. 3–5 keys in rapid succession) testing motor chunking and short-term working memory (Sternberg 1966). Instead of processing keys individually, expert typists fire pre-compiled kinematic motor bursts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What keyboard type provides the lowest input latency for testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mechanical keyboards with linear switches, optical actuation, or magnetic Hall-effect sensors (with Rapid Trigger enabled) and 1000 Hz+ USB polling provide sub-millisecond hardware debounce, ensuring measured latency reflects purely neurological transmission.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many minutes per day should I practice keybind reactions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Practice 10–15 minutes daily across 3–4 focused blocks. Neural adaptation for spatial key recognition occurs rapidly during deliberate practice, but mental fatigue quickly degrades response inhibition accuracy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does keybind training benefit MOBA games like League of Legends and Dota 2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Rapid ability combos (Q-W-E-R-D-F) and instant item actives require precise finger sequencing and spatial finger independence without looking down at the keyboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are KPM (Keys Per Minute) and accuracy calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KPM is computed as total correct key presses divided by active session duration in minutes. Accuracy reflects correct presses divided by total attempts (including incorrect key hits and triggered traps).',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Keyboard Speed & Keybind Muscle Memory',
  description: 'Step-by-step methodology to sharpen key recognition, choice reaction speed, and tactical gaming reflex responses.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Adopt the Tactical Home Position',
      text: 'Place your left hand on your default gaming cluster (WASD or custom keybind home layout) with fingers resting lightly on the switch caps.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Detect and Identify the Key Prompt',
      text: 'Keep your eyes anchored to the center display. When the target key symbol renders, resolve the required keystroke without glancing downward.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Actuate the Key with Ballistic Precision',
      text: 'Depress the target key crisply through its actuation point. If a Fake Prompt trap appears, recruit executive inhibition to hold finger position.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Evaluate Reaction Latency & Inhibition Rates',
      text: 'Review average decision latency, KPM typing velocity, and trap resistance accuracy on the final session scorecard to identify weak fingers.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'hick1952', 'logan1984', 'sternberg1966', 'woods2015'),
  intro: {
    title: 'How keyboard speed is measured',
    paragraphs: [
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every target to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same mouse and display rather than against someone else\'s setup. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Keyboard Speed & Keybind Reaction Benchmarks',
    description: 'An editorial guide to reading your own result, not measured population norms — SkillDrills collects no aggregate data. The choice-reaction framing follows Donders (1868), Hick (1952) and Logan (1984); the band boundaries are the drill author\'s own judgement. Columns evaluate single-key choice latency, sequence typing rhythm, and trap inhibition accuracy.',
    columns: ['Tier', 'Rank Title', 'Single-Key Latency', 'Sequence KPM', 'Trap Accuracy', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Keybinder',
        stat: 'Under 240 ms',
        level: '320+ KPM',
        accuracy: '98–100%',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Tactician',
        stat: '240–300 ms',
        level: '260–319 KPM',
        accuracy: '95–97%',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Operator',
        stat: '300–380 ms',
        level: '200–259 KPM',
        accuracy: '90–94%',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Typist',
        stat: '380–480 ms',
        level: '140–199 KPM',
        accuracy: '80–89%',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Keybinder',
        stat: 'Over 480 ms',
        level: 'Under 140 KPM',
        accuracy: 'Under 80%',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train keybind speed',
    description: 'Structured training methodologies designed to accelerate corticospinal motor transmission, reduce decision entropy, and strengthen executive motor inhibition.',
    items: [
      {
        title: 'Protocol 1: Donders Choice Latency Compression (Stimulus-Response Mapping)',
        description: 'Focus your gaze strictly on the screen center without glancing downward at your keyboard. Force the pre-motor cortex to resolve the mapping purely through proprioceptive finger position, progressively compressing decision latency from 350 ms toward the 240 ms physiological threshold.',
      },
      {
        title: 'Protocol 2: Hick’s Law Alternative Reduction (Sub-Cluster Zoning)',
        description: 'Mentally partition your active keyboard into functional sub-clusters (movement home keys WASD, tactical perimeter QECX, and upper numeral row 1-4). Organizing choices into hierarchical spatial zones reduces Hickian decision entropy compared to treating all keys as an unstructured set.',
      },
      {
        title: 'Protocol 3: Logan Countermanding & Stop-Signal Inhibition (Trap Pacing)',
        description: 'During Fake Prompt mode, cultivate deliberate input gating. When an invalid command is recognized, actively recruit prefrontal inhibitory networks to cancel motor discharge before the mechanical switch actuation point is reached.',
      },
      {
        title: 'Protocol 4: Sternberg Working-Memory Chunking (Multi-Key Sequence Blasts)',
        description: 'When tackling 3- to 5-key sequences, do not type each key in isolation. Read the full sequence as a unified cognitive chunk, allowing the motor cortex to fire the consecutive keystrokes in a single coordinated ballistic wave.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About Keyboard Speed & Keybinds',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function KeyboardRecognitionPage() {
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
      <KeyboardRecognitionClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
