import ReactionSimulatorWrapper from './ReactionSimulatorWrapper';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-simulator
// PRIMARY: "reaction simulator" ~1,300/mo US, KD ~28% (Easy-Medium)
//          "reflex training game" ~880/mo US, KD ~30% (Easy-Medium)
// SECONDARY / LSI:
//   "reflex game online"              ~1,000/mo, KD ~25%
//   "hand eye coordination games"     ~2,900/mo, KD ~48%
//   "reaction speed test"             ~6,600/mo, KD ~45%
//   "reflex simulator"                ~390/mo,   KD ~15%
//   "fps reaction time test"          ~1,300/mo, KD ~38%
//   "reflex training app"             ~1,600/mo, KD ~35%
//   "speed reflex training"           ~450/mo,   KD ~22%
// PAA targets: "What is a good score on a reaction time test?",
//   "Can you train your reaction time?", "What is the average human reaction time?",
//   "Does gaming improve reaction time?", "Why is my reaction time so slow?",
//   "How do you test your reflexes by yourself?"
// Key entities: falling-target interception, vertical tracking, input latency,
//   choice reaction time, muscle memory, neuromuscular efficiency, display lag
// ============================================================

export const metadata = {
  title: 'Reaction Simulator - Free Reflex Training Game Online | SkillDrills',
  description: 'Play this free online Reflex Training Game (Reaction Simulator). Intercept accelerating falling targets before they escape, train vertical visual tracking, and improve your hand-eye coordination. Mobile-friendly, no download needed.',
  keywords: [
    // Primary / Head terms
    'reaction simulator', 'reflex training game', 'reflex game online',
    // Secondary / LSI terms
    'reflex simulator', 'hand eye coordination games', 'reaction speed test',
    'fps reaction time test', 'reflex training app', 'speed reflex training',
    // Long-tail variants
    'falling target reaction game', 'online reflex games free',
    'how to test reflexes at home', 'do reflex training games work',
    'vertical tracking aim trainer', 'mouse speed click trainer',
    // General
    'free aim trainer browser', 'gaming eye coordination drill', 'low latency reflex test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reaction-simulator',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reaction Simulator - Free Reflex Training Game Online | SkillDrills',
    description: 'Play this free online Reflex Training Game (Reaction Simulator). Intercept accelerating falling targets before they escape, train vertical visual tracking, and improve your hand-eye coordination.',
    url: 'https://skilldrills.online/drills/reaction-speed/reaction-simulator',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Reaction Simulator - Free Reflex Training Game Online | SkillDrills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Simulator - Free Reflex Training Game',
    description: 'Intercept falling targets and train vertical tracking. Free browser-based reflex simulator with no downloads.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
    { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/reaction-speed" },
    { "@type": "ListItem", "position": 4, "name": "Reaction Simulator", "item": "https://skilldrills.online/drills/reaction-speed/reaction-simulator" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reaction Simulator — Free Reflex Training Game Online | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reaction-simulator",
  "description": "Train reaction speed, vertical visual tracking, and hand-eye coordination. A free device-adaptive falling-target reflex simulator for mobile and desktop.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Speed, Vertical Visual Tracking, Hand-Eye Coordination, Rapid Interception, Reflex Timing"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Reaction Simulator Trainer",
  "description": "Isolates and trains vertical ocular tracking, hand-eye synchronization, rapid interception, and motor response time under high-speed falling waves.",
  "applicationCategory": "EducationalGame",
  "operatingSystem": "Web Browser",
  "isAccessibleForFree": true,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Reflexes with the Reaction Simulator",
  "description": "Improve vertical visual tracking and rapid click timing against targets falling at varying speeds across dynamic lanes.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start the Simulator",
      "text": "Click the Begin Drill button to start the game board. Adjust target color presets and neon glow toggles to fit your visual preference."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track Falling Targets",
      "text": "Keep your eyes active along the top edge and visually track incoming falling spheres as they accelerate downwards."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Click",
      "text": "Click or tap the falling targets immediately before they escape the lower boundary. Be precise to prevent time deductions."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Intercept Speed Bursts",
      "text": "At higher levels, prioritize micro-targets, speed bursts, and double drops to sustain your combo and survive the countdown."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Reaction Simulator reflex training game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction Simulator is an online reflex training game where you intercept falling targets before they escape the lower boundary. It trains vertical visual tracking, hand-eye coordination, and rapid clicking reflexes in a browser-based format."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train your reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While genetic baseline limits exist, you can improve your cognitive processing speed, pattern recognition, and muscle memory (neuromuscular efficiency) through repetitive stimulation. This reduces your choice reaction latency."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on a reaction time test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An average score on a simple click-reaction test is around 250ms. Scores below 200ms are considered excellent, and elite competitive gamers often average 150-180ms."
      }
    },
    {
      "@type": "Question",
      "name": "What is the average human reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average reaction time to a visual stimulus is around 250 milliseconds. Auditory reactions are faster, averaging around 170 milliseconds, and tactile (touch) reactions average about 150 milliseconds due to shorter neural path routing."
      }
    },
    {
      "@type": "Question",
      "name": "Does gaming improve reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Studies show that playing action-heavy video games (like FPS, arcade, and rhythm games) enhances peripheral vision, spatial attention, and hand-eye response speeds by conditioning fast visual-motor feedback loops."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my reaction time slow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common factors include fatigue, lack of sleep, distractions, age (reaction speeds decline gradually after peak early-20s), and technical latency (slow monitors, high input-lag mice, or low wireless polling rates adding artificial lag)."
      }
    },
    {
      "@type": "Question",
      "name": "How do you test your reflexes by yourself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can test reflexes online using browser click tests (like Human Benchmark or this Reaction Simulator), or physically using the ruler drop test (measuring where you catch a dropped ruler) or juggling exercises."
      }
    },
    {
      "@type": "Question",
      "name": "How does this reaction simulator improve FPS aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In FPS games like Valorant, CS2, and Apex Legends, enemies jump, drop from ledges, and move dynamically. This simulator trains your vertical eye tracking and click synchronization, helping you snap onto vertically moving targets."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect my reaction simulator score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Higher refresh rate monitors (144Hz+) display target frames faster and smoother, helping you track the exact position of fast-falling targets and reducing visual delay."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex game online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the Reaction Simulator is 100% free to play on SkillDrills with no signups, downloads, or registration required."
      }
    }
  ]
};

export default function ReactionSimulatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReactionSimulatorWrapper />
    </>
  );
}

