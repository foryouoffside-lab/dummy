import RapidTappingClient from './RapidTappingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — rapid-tapping (motor-rapid-tapping)
// PRIMARY:  "cps test"                    — Major global query (~22,000+ searches/mo)
//           "click speed test"            — Core synonym / benchmark term
// SECONDARY / LSI:
//           "clicks per second test"      — Direct calculation query
//           "rapid tapping test"          — Clinical and motor drill term
//           "finger tapping speed test"   — Neuromotor speed query
//           "cps trainer"                 — Training & skill drill term
//           "click speed game"            — Gamified search phrase
//           "jitter clicking test"        — Advanced PvP clicking technique
//           "butterfly clicking test"     — Dual-finger speed technique
//           "mouse click speed test"      — Hardware and dexterity search
//           "minecraft cps test"          — Title-specific competitive query
//           "fast clicking test"          — High-intent speed search
// LOCALES:
//           ja: "cps テスト" (CPS Test / Click Speed Test)
//           ko: "cps 테스트" (CPS Test / Click Speed Test)
//           de: "cps test" (CPS Test / Klickgeschwindigkeit Test)
// ============================================================

export const metadata = {
  title: 'CPS Test – Free Click Speed & Clicks Per Second Test',
  description: 'Free online CPS test. Test your clicks per second, burst tapping velocity, jitter and butterfly clicking, and forearm endurance over a 45-second session.',
  keywords: [
    'cps test',
    'click speed test',
    'clicks per second test',
    'rapid tapping test',
    'finger tapping speed test',
    'cps trainer',
    'click speed game',
    'jitter clicking test',
    'butterfly clicking test',
    'mouse click speed test',
    'minecraft cps test',
    'fast clicking test',
  ],
  openGraph: {
    title: 'CPS Test – Free Click Speed Test & Clicks Per Second Trainer | SkillDrills',
    description: 'Free online CPS test. Test your clicks per second, burst tapping velocity, jitter and butterfly clicking, and forearm endurance over a 45-second session.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CPS Test – Free Click Speed Test & Clicks Per Second Trainer | SkillDrills',
    description: 'Free online CPS test. Test your clicks per second, burst tapping velocity, jitter and butterfly clicking, and forearm endurance over a 45-second session.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/drills/motor/movement-speed/rapid-tapping'),
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
    { '@type': 'ListItem', position: 4, name: 'CPS Test', item: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CPS Test – Click Speed & Clicks Per Second Trainer',
  alternateName: ['Rapid Tapping Test', 'Click Speed Test'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based CPS click speed test and finger tapping endurance trainer. Test single-finger tapping, jitter clicking, and butterfly clicking against an accelerating target decay rate.',
  url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CPS Test',
  alternateName: 'Rapid Tapping Test',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires modern web browser with HTML5 Canvas and high-frequency pointer input support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'CPS Test – Free Click Speed Test & Clicks Per Second Trainer',
  url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
  description: 'Free online CPS test measuring clicks per second, burst tapping velocity, jitter and butterfly clicking.',
  genre: ['Clicker Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a CPS test (Clicks Per Second)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A CPS test is a digital motor assessment measuring the frequency of mouse or touchscreen clicks executed in one second. It evaluates high-frequency neuromuscular firing, tendon oscillation speed, and forearm muscular endurance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an average CPS score for casual gamers versus esports competitors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Untrained individuals average 5.0 to 6.5 CPS using deliberate single-finger tapping. Proficient gamers reach 8.0 to 10.5 CPS with optimized finger mechanics, while competitive Minecraft and rhythm game specialists reach 12.0 to 16.0+ CPS with jitter clicking and 16.0 to 20.0+ CPS with butterfly clicking.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is jitter clicking and how does it work physiologically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jitter clicking involves generating continuous isometric co-contraction in the forearm flexor and extensor muscles. These high-frequency micro-tremors are transmitted through a rigid wrist directly into the mouse button switch, achieving 11 to 15 CPS without requiring discrete voluntary finger actuations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is butterfly clicking and how does it differ from jitter clicking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Butterfly clicking utilizes alternating strikes between the index and middle fingers on a single mouse switch. Because each finger actuates independently with relaxed arm muscles, it produces less physiological strain than jitter clicking and can double click frequencies up to 16 to 22+ CPS on low-debounce mechanical switches.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is high CPS critical in competitive Minecraft PvP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In legacy Minecraft combat (1.8 mechanics), hit detection registers faster and deals consistent knockback when click frequency is maximized. Maintaining high CPS reduces player recoil and locks opponents into airborne hit combos, providing a decisive mechanical advantage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does click speed matter in tactical shooters like Valorant and CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While crosshair placement and micro-corrections are primary in tactical shooters, rapid tapping capability is essential for semi-automatic sidearm duels (Classic, Ghost, USP-S) and rapid burst firing without disturbing crosshair alignment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the neuromuscular limits of single-finger tapping frequency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neuropsychological studies (Halstead 1947, Todor & Kyprie 1980) demonstrate that voluntary dominant index finger tapping maxes out around 5.5 to 7.0 Hz (~55 taps in 10s) due to refractory periods in central motor command pathways. Exceeding 10 CPS requires biomechanical adaptations like micro-vibration resonance or multi-finger alternation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the 45-second rapid tapping drill scale in difficulty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unlike static 5-second CPS counters, this drill challenges sustained endurance: clicking expands a dynamic target ball while an accelerating decay engine contracts it by up to 600 pixels per second. Maintaining the target above critical threshold requires steady-state clicking cadence and fatigue resistance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I increase my clicking speed and prevent forearm muscle fatigue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Engage in interval-based distributed training sessions (45-second sprints followed by 60 seconds of complete relaxation). Focus on finger knuckle pivot rather than whole-arm downward pressure, and perform regular forearm flexor stretches to prevent repetitive strain injury (RSI).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I take the CPS click speed test on mobile devices and touchscreens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The drill incorporates multi-touch pointer event handlers that measure tap frequency directly on smartphone and tablet screens, enabling mobile gamers to benchmark two-finger and multi-finger tap rates.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Test and Train Click Speed (CPS)',
  description: 'Step-by-step training protocol for measuring clicks per second, testing advanced clicking techniques, and conditioning finger endurance.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Prepare Grip and Position Cursor',
      text: 'Rest your wrist comfortably on your mousepad. Align your index finger over the primary mouse button and position the crosshair within the arena.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Initiate 45-Second Sprint',
      text: 'Click "Start Drill" and tap the target ball as rapidly as possible during the 3-2-1 countdown to establish an immediate high CPS baseline.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Counter Dynamic Ball Decay',
      text: 'Each click expands the target ball radius. Maintain a rapid rhythm as the ball decay rate accelerates to prevent it from shrinking to zero.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analyze Average CPS and Peak Burst',
      text: 'Review your average CPS, peak click burst and total clicks on the completion scorecard, and compare them with your own earlier runs on the same mouse and display.',
      url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping#step-4'
    },
  ],
};

const guideProps = {
  sources: pickSources('halstead1947', 'todor1980', 'keele1968', 'woods2015'),
  intro: {
    title: 'How click speed is measured',
    paragraphs: [
      'A CPS test counts mouse clicks in one second. Sustained one-finger clicking runs to roughly 5\u20137 clicks per second, anchored to the published finger tapping baseline of about 50\u201355 taps per 10 seconds for a healthy adult\u2019s dominant index finger (Halstead, 1947; Todor & Kyprie, 1980). Bursts above that are open-loop: they run as a pre-programmed motor sequence rather than one deliberate press per click (Keele, 1968).',
      'How this is measured, and what it cannot resolve: timing comes from the browser\'s performance.now() clock, which is deliberately coarsened to roughly 1 ms as a Spectre mitigation, and the display quantizes every target to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz against about 1 ms at 1000 Hz. Treat any difference under about 5 ms as measurement noise, and compare your own runs on the same mouse and display rather than against someone else\'s setup. SkillDrills stores every score in your browser and collects no aggregate data, so nothing here is a population norm.',
    ],
  },
  benchmark: {
    title: 'Clicks Per Second (CPS) & Tapping Speed Benchmarks',
    description: 'An editorial guide to reading your own result, not measured population norms — SkillDrills collects no aggregate data. The single-finger figures are anchored to the published finger tapping baseline (Halstead 1947; Todor & Kyprie 1980); the jitter and butterfly rows are the drill author\'s own judgement. Columns cover steady-state CPS, 5-second burst peaks, and 45-second sustained endurance.',
    columns: ['Tier', 'Rank Title', 'Average CPS', 'Burst CPS (5s)', 'Tapping Technique', 'Editorial band'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Tapper',
        stat: '16.0+ CPS',
        level: '20.0+ CPS',
        accuracy: 'Butterfly / Drag Clicking',
        percentile: 'Exceptional',
      },
      {
        tier: 'Tier 2',
        rank: 'Pro Competitor',
        stat: '12.0–15.9 CPS',
        level: '15.0–19.0 CPS',
        accuracy: 'Mastered Jitter Clicking',
        percentile: 'Advanced',
      },
      {
        tier: 'Tier 3',
        rank: 'Competitive Gamer',
        stat: '9.0–11.9 CPS',
        level: '11.0–14.0 CPS',
        accuracy: 'High-Cadence Single Finger',
        percentile: 'Strong',
      },
      {
        tier: 'Tier 4',
        rank: 'Proficient Casual',
        stat: '6.0–8.9 CPS',
        level: '7.5–10.0 CPS',
        accuracy: 'Standard Single Finger',
        percentile: 'Typical',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Tapper',
        stat: 'Under 6.0 CPS',
        level: 'Under 7.5 CPS',
        accuracy: 'Untrained Single Finger',
        percentile: 'Starting out',
      },
    ],
  },
  protocols: {
    title: 'How to train clicking speed',
    description: 'Structured training regimens designed to increase motor unit firing rates, strengthen tendon resilience, and manage neuromuscular fatigue.',
    items: [
      {
        title: 'Protocol 1: Halstead Motor Rhythm Calibration (Deliberate Knuckle Pivot)',
        description: 'For standard single-finger clicking, anchor your wrist on the desk and isolate movement to the metacarpophalangeal (MCP) knuckle joint. Keeping your forearm relaxed reduces muscle tension and provides the cleanest transition between rapid clicks and precise crosshair tracking.',
      },
      {
        title: 'Protocol 2: Todor-Kyprie High-Frequency Burst Intervals (Micro-Rest Pacing)',
        description: 'Condition maximum motor unit recruitment by executing 5-second maximum-velocity tapping bursts followed by 3 seconds of controlled baseline clicking. This interval training trains the nervous system to sustain high motor discharge frequencies while delaying lactic acid accumulation.',
      },
      {
        title: 'Protocol 3: Isometric Forearm Micro-Vibration (Jitter Clicking Stabilization)',
        description: 'To master jitter clicking, generate gentle co-contraction in the wrist flexors and extensors, letting forearm tremors vibrate through the index finger. Lighten downward pressure on the mouse to ensure sensor tracking and mouse gliding remain fluid.',
      },
      {
        title: 'Protocol 4: Alternating Kinematic Dual-Finger Articulation (Butterfly Clicking)',
        description: 'Position index and middle fingers flat across the left mouse switch. Practice a rhythmic, alternating drumming motion. Ensure low mouse debounce times (0–4 ms) to allow mechanical switch bounce registration without missing inputs.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions About CPS & Click Speed Testing',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const copyEn = {
  title: "CPS Test",
  desc: "A CPS test counts how many times you can click a mouse button in one second. Sustained one-finger clicking runs to roughly 5–7 clicks per second, because the standard finger tapping test puts a healthy adult's dominant index finger near 50–55 taps per 10 seconds (Halstead, 1947) — the much higher numbers quoted online come from jitter and butterfly techniques, which do not use one finger press per click.",
  score: "Score",
  timeLeft: "Time Left",
  cpsRate: "CPS Rate",
  bestScore: "Best Score",
  startButtonText: "Start Drill",
  startSubtitle: "CPS Click Speed Trainer • Hardware Raw Input",
  getReady: "GET READY",
  playAgain: "Play Again",
  shareTitle: "Share Score",
  exitTitle: "Exit & Return",
  avgCps: "Average CPS",
  totalClicks: "Total Clicks",
  maxDifficulty: "Max Difficulty",
  peakCps: "Peak CPS",
  newBest: "NEW BEST",
  rulesTitle: "Drill Instructions & Scoring System",
  rulesItems: [
    { num: "1", text: "Rapid Target Tapping", highlight: "Tactical Emerald Target", result: "Expands target radius & prevents decay" },
    { num: "2", text: "Scoring Threshold", highlight: "+1 Point per 10 Clicks", result: "Builds final session score" },
    { num: "3", text: "Dynamic Shrink Rate", highlight: "Accelerates with Score", result: "Pushes finger speed & endurance limits" },
    { num: "4", text: "Tapping Techniques", highlight: "Jitter / Butterfly / Raw", result: "Maximize raw clicking speed" }
  ],
};

export default function RapidTappingPage() {
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
      <RapidTappingClient copy={copyEn} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/rapid-tapping" />
      </div>
      <DrillFooter />
    </>
  );
}
