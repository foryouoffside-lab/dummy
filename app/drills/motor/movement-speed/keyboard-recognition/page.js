import KeyboardRecognitionClient from './KeyboardRecognitionClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — keyboard-recognition (motor-keyboard-recognition)
// PRIMARY:  "keyboard speed test"         — Core search phrase (~2,400 searches/mo)
//           "keybind reaction trainer"    — Direct tactical gamer training query
// SECONDARY / LSI:
//           "keyboard recognition test"   — Core benchmark and familiarity query
//           "gaming keybind trainer"      — Competitive FPS mechanic term
//           "keybind muscle memory"       — Neuromuscular conditioning search
//           "keyboard reflex test"        — Reaction speed assessment query
//           "key press reaction time"     — Chronometry query
//           "keyboard layout trainer"     — Spatial keyboard mapping search
//           "keybind speed test"          — Velocity assessment phrase
//           "response inhibition test"    — Cognitive control search
//           "keyboard dexterity test"     — Fine motor skill phrase
//           "valorant keybind practice"   — Title-specific esports query
// LOCALES:
//           ja: "キーボード 反応速度 テスト" (Keyboard Reaction Speed Test)
//           ko: "키보드 반응속도 테스트" (Keyboard Reaction Speed Test)
//           de: "tastatur geschwindigkeitstest" (Keyboard Speed Test)
// ============================================================

export const metadata = {
  title: 'Keyboard Speed Test – Free Keybind Reaction Trainer',
  description: 'Free keyboard speed test. Measure how fast you press the right key for a prompt, against Hick\'s Law of choice reaction time. No sign-up.',
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
  name: 'Keyboard Speed Test – Keybind Reaction Trainer',
  alternateName: ['Keyboard Recognition Pro', 'Keybind Trainer'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based keybind reaction trainer and keyboard speed test. Measure visual prompt identification, spatial key layout mapping, response inhibition, and multi-key sequence execution.',
  url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Keyboard Speed Test',
  alternateName: 'Keyboard Recognition Pro',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires modern keyboard input listeners and JavaScript support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition',
  dateModified: '2026-09-05',
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
        text: 'A keyboard speed test is an interactive cognitive-motor assessment designed to condition the full neural chain of visual stimulus recognition, keyboard layout mapping, response inhibition, and finger motor execution under dynamic millisecond time constraints.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does keybind training improve gaming performance in Valorant, CS2, and Fortnite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In competitive tactical shooters and battle royales, split-second decisions like casting abilities, switching to utility, or building defensive walls require instantaneous actuation without visual inspection of the keyboard. Dedicated keybind training automates motor memory, bypassing conscious cortical search time and reducing input latency by 80–150 ms.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cognitive science behind choice reaction time and Hick’s Law?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'F.C. Donders (1868) demonstrated that Choice Reaction Time (CRT) requires distinct cognitive stages (stimulus discrimination and response selection) absent in Simple Reaction Time. William Edmund Hick (1952) formalized this as Hick’s Law (RT = b * log2(n + 1)), demonstrating that decision latency increases logarithmically with the number of possible key choices.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Fake Prompt (Inhibition Trap) mode train motor self-control?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fake prompt mode incorporates Gordon Logan’s (1984) stop-signal paradigm by presenting deceptive prompts that must be actively ignored. Pressing any key during a fake prompt penalizes your combo, training frontal lobe executive inhibition to prevent panic clicking and unintended ability deployments in clutch rounds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What esports game presets are available in this trainer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SkillDrills features pre-calibrated key profiles for top competitive titles including Valorant (Movement, Abilities, Weapons), Counter-Strike 2 (Movement, Buy/Grenade Hotkeys), Fortnite (Building & Weapon Binds), Minecraft (Hotbar & Utility), League of Legends (QWER Spells & Items), and Apex Legends.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the adaptive difficulty engine adjust prompt speeds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The adaptive engine continuously monitors your reaction latency and hit accuracy. Maintaining high accuracy and combo streaks progressively compresses prompt expiration windows from 1.5x down to 0.55x extreme speed, while miss penalties temporarily grant breathing room to restore baseline rhythm.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between single-key recognition and sequence mode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Single-key mode isolates raw discrete choice reaction latency for individual key locations. Sequence mode introduces multi-character chains (2 to 5 keys) that test Saul Sternberg’s (1966) working memory retrieval and rapid motor grouping across consecutive finger articulations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize which keys are included in my training routine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The drill features an interactive visual keyboard matrix allowing you to toggle individual letters (A–Z), numbers (0–9), modifiers (Shift, Ctrl, Alt, Space, Tab), and symbols, giving you complete freedom to target specific weak finger zones or esoteric macro binds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does tactile keyboard muscle memory develop neurologically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Repeated pairing of visual cues with specific proprioceptive finger displacements leads to long-term potentiation (LTP) in the primary motor cortex (M1) and supplementary motor area (SMA). Over time, movement programs become encapsulated into subcortical basal ganglia routines, enabling fully subconscious execution.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good benchmark reaction time for single-key prompt recognition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a multi-choice gaming setup (12–20 active keys), elite esports professionals achieve choice reaction latencies below 240 ms. Proficient players typically average 300–380 ms, while developing typists average 380–480 ms.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Train Keybind Speed and Keyboard Layout Familiarity',
  description: 'Step-by-step training protocol for mastering keyboard recognition, rapid keybind actuation, and cognitive response inhibition.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Select Profile and Key Set',
      text: 'Choose an esports preset (e.g., Valorant, CS2) or configure a custom selection using the visual key matrix in the configuration drawer.',
    },
    {
      '@type': 'HowToStep',
      name: 'Identify Prompt Stimulus',
      text: 'Fixate on the center arena. As a key symbol appears, identify its character and retrieve its physical spatial coordinate from proprioceptive memory.',
    },
    {
      '@type': 'HowToStep',
      name: 'Execute Rapid Ballistic Keystrokes',
      text: 'Actuate the matching mechanical key before the circular expiration timer elapses. For multi-key sequences, execute the full chain in left-to-right order.',
    },
    {
      '@type': 'HowToStep',
      name: 'Inhibit Panic on Fake Traps',
      text: 'When a deceptive or invalid prompt appears, freeze your hands and withhold all key presses until the trap dissolves to earn bonus points and preserve streak multipliers.',
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
        stat: '< 240 ms',
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
        stat: '> 480 ms',
        level: '< 140 KPM',
        accuracy: '< 80%',
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
