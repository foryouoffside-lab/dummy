import ReactionSimulatorWrapper from './ReactionSimulatorWrapper';
import DrillGuide from '@/components/drill/DrillGuide';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-game
// PRIMARY: "reaction game" — 27 exact / 239 broad US, 5 exact GB (Bing API 2026-09-04)
//          "reflex game"   — 25 exact US, 2 exact GB (Bing API 2026-09-04)
// SECONDARY / LSI:
//   "reaction games"        — 23 exact US, 5 exact GB (Bing API 2026-09-04)
//   "reaction time games"   — 21 exact US, 3 exact GB (Bing API 2026-09-04)
// ============================================================

export const metadata = {
  title: 'Reaction Game - Free Online Reflex Training Game',
  description: 'Free online reaction game. Intercept falling targets, train vertical tracking speed, and sharpen hand-eye coordination with zero downloads.',
  keywords: [
    'reaction game', 'reflex game', 'reaction games', 'reaction time games',
    'falling target reaction game', 'online reflex games free',
    'hand eye coordination game', 'reaction speed test',
    'fps reaction time test', 'vertical tracking aim trainer',
    'mouse speed click trainer', 'free aim trainer browser',
    'gaming eye coordination drill', 'low latency reflex test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reaction-game',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reaction Game - Free Online Reflex Training Game | SkillDrills',
    description: 'Play this free online reaction game. Intercept accelerating falling targets before they escape, train vertical visual tracking, and improve your hand-eye coordination.',
    url: 'https://skilldrills.online/drills/reaction-speed/reaction-game',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Game - Free Online Reflex Training Game',
    description: 'Intercept falling targets and train vertical tracking. Free browser-based reaction game with no downloads.',
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
    { "@type": "ListItem", "position": 4, "name": "Reaction Game", "item": "https://skilldrills.online/drills/reaction-speed/reaction-game" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reaction Game — Free Online Reflex Training Game | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reaction-game",
  "description": "Train reaction speed, vertical visual tracking, and hand-eye coordination. A free device-adaptive falling-target reaction game for mobile and desktop.",
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
  "name": "Reaction Game Trainer",
  "description": "Isolates and trains vertical ocular tracking, hand-eye synchronization, rapid interception, and motor response time under high-speed falling waves.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support."
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Vertical Reflexes & Reaction Speed",
  "description": "Step-by-step instructions on improving your vertical tracking, interception speed, and hand-eye coordination.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Game",
      "text": "Press Start Drill to initialize the Reaction Game in full screen."
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
      "text": "At higher levels, prioritize micro-targets and speed bursts to keep your hit rate up and survive the countdown."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Reaction Simulator (Reflex Interception Drill)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is an online reflex training game where targets descend vertically at accelerating speeds, testing your vertical tracking and interception reflexes."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on a reaction time test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Average human reaction time to visual stimuli is 200-250ms. Elite esports players achieve reaction speeds under 180ms."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train your reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Dedicated reflex training improves neuromuscular pathway efficiency, reducing visual processing delay and motor execution latency."
      }
    },
    {
      "@type": "Question",
      "name": "Does gaming improve reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research shows competitive gamers process visual information faster and execute choice motor responses with higher precision than non-gamers."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my reaction time slow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slow reaction time can be caused by muscle fatigue, high input latency, low refresh rates, lack of sleep, or cognitive distraction."
      }
    },
    {
      "@type": "Question",
      "name": "How do you test your reflexes by yourself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using online reflex simulators like SkillDrills provides precise millisecond telemetry to measure and track your reaction speed."
      }
    },
    {
      "@type": "Question",
      "name": "What is vertical tracking in FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vertical tracking is the ability to keep your crosshair centered on targets falling, jumping, or moving along Y-axis paths."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex training game free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect reflex scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Higher refresh rate monitors (144Hz, 240Hz, 360Hz) display target movement with lower input lag and smoother motion."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice reflex training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daily 5-10 minute warmup sessions improve neuromuscular speed, consistency, and hand-eye coordination over time."
      }
    },
    {
      "@type": "Question",
      "name": "What games benefit from vertical reflex training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fast vertical shooters like Apex Legends, Overwatch 2, Fortnite, Halo, and Quake benefit heavily from vertical tracking agility."
      }
    },
    {
      "@type": "Question",
      "name": "Can traditional athletes use this for vision training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Sports vision research shows vertical reflex training enhances spatial interception skills for volleyball, basketball, and tennis."
      }
    },
    {
      "@type": "Question",
      "name": "Should I click targets high up or wait until they drop?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clicking targets high up gives you more margin for error and builds fast-twitch reaction speed before targets reach the danger line."
      }
    },
    {
      "@type": "Question",
      "name": "Does this drill support touchscreens?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! It features generous touch hitpads and automatic orientation warnings for mobile devices."
      }
    },
    {
      "@type": "Question",
      "name": "How does adaptive level difficulty work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, falling speeds accelerate, targets shrink in size, and spawn intervals shorten."
      }
    }
  ]
};

const reactionGameGuide = {
  heading: "Online Reaction Game Guide: Training Vertical Tracking & Interception Reflexes",
  intro: [
    "Reaction games train your visual perception, response speed, and motor execution by forcing you to identify dynamic stimuli and act within a fraction of a second. In our vertical falling-target reaction game, targets drop at variable acceleration across multiple lanes, requiring you to balance rapid target selection with precise click accuracy.",
    "Unlike simple single-button reaction timers, multi-lane reaction games engage choice reaction time and visual tracking. You must continuously monitor the upper visual field, project target landing trajectories, and prioritize imminent escapees to sustain high-speed combo streaks."
  ],
  benchmarks: {
    title: "Reaction Game Performance & Scoring Reference Tiers",
    headers: ["Score Range", "Difficulty Band", "Target Speed", "Skill Profile", "Recommended Focus"],
    rows: [
      ["15,000+ pts", "Grandmaster", "Extreme (>1400 px/s)", "Immediate foveal acquisition and micro-second click release", "Maintain composure during multi-sphere simultaneous drops"],
      ["10,000–14,999 pts", "Elite", "Fast (1000–1400 px/s)", "High-level anticipation with minimal miss penalties", "Push interception point higher up the vertical lanes"],
      ["6,000–9,999 pts", "Proficient", "Moderate (700–1000 px/s)", "Consistent baseline reflexes with occasional misses", "Focus on peripheral detection rather than tracking single targets"],
      ["2,500–5,999 pts", "Intermediate", "Standard (450–700 px/s)", "Comfortable with single targets, challenged by multi-lane waves", "Minimize mouse travel by resting cursor near mid-lane"],
      ["< 2,500 pts", "Novice", "Slow (<450 px/s)", "Reactive clicking with higher panic and delay", "Prioritize accuracy over speed to build rhythm"]
    ],
    note: "These scoring bands are an editorial reference guide calibrated for standard 60–144Hz displays. Enabling the optional time penalty increases difficulty significantly."
  },
  techniques: {
    title: "Reaction & Interception Mechanics",
    items: [
      {
        name: "High-Screen Interception",
        desc: "Clicking falling targets near the top or upper-third of the screen maximizes time buffer and prevents last-second panic clicks near the danger baseline.",
        tips: "Keep your eye gaze slightly above screen center to register spawns the millisecond they appear."
      },
      {
        name: "Trajectory Projection & Pre-Aiming",
        desc: "Rather than chasing a fast-falling target with your cursor, project where the target will be 150ms in the future and let it fall into your crosshair.",
        tips: "Anticipatory clicking reduces muscular over-correction and fatigue."
      },
      {
        name: "Peripheral Target Scanning",
        desc: "Fixating intently on one lane leaves you blind to adjacent drops. Soften your visual focus to use peripheral motion detectors for new spawns.",
        tips: "Human peripheral vision has higher temporal resolution for rapid movement than central vision."
      },
      {
        name: "Input Latency Management",
        desc: "Browser rendering at 60Hz incurs ~16.7ms frame intervals. Running on a 144Hz+ monitor with a high-polling mouse cuts input response latency.",
        tips: "Turn off background heavy browser tabs and disable GPU throttling for crisp click delivery."
      }
    ]
  },
  steps: [
    "Select your preferred settings (opt-in time penalties, sound cues) and click Start Drill.",
    "Position your cursor in the upper-middle region of the playfield with a light, relaxed grip.",
    "Monitor the lane entry zone using a soft visual gaze to spot spawns immediately.",
    "Intercept targets cleanly as high up their lane as possible to keep pace with accelerating waves.",
    "Survive the countdown, maintain your combo multiplier, and review your final accuracy and grade."
  ],
  audience: "Gamers training for vertical movement shooters (Apex Legends, Overwatch 2, Fortnite), athletes conditioning interception reflexes, and anyone wanting a fast, free reaction game to sharpen hand-eye coordination.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  related: [
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/reflex-training-drill", label: "Reflex Training Drill" },
    { href: "/drills/reaction-speed/fps-tracking-trainer", label: "FPS Tracking Trainer" },
    { href: "/drills/reaction-speed/saccadic-gallery", label: "Saccadic Eye Gallery" }
  ]
};

export default function ReactionGamePage() {
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
      <DrillGuide guide={reactionGameGuide} />
    </>
  );
}
