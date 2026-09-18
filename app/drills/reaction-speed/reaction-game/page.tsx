import ReactionSimulatorWrapper from './ReactionSimulatorWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-game
// PRIMARY: "reaction game" — 27 exact / 239 broad US, 5 exact / 11 broad GB (Bing API 2026-09-05)
// SECONDARY / LSI:
//   "reaction time trainer" — 128 exact US, 7 exact GB (Bing API 2026-09-05)
//   "reaction time game"    — 79 exact US, 12 exact GB (Bing API 2026-09-05)
//   "reaction test game"    — 33 exact US (Bing API 2026-09-05)
//   "reflex game"           — 25 exact US, 2 exact GB (Bing API 2026-09-05)
//   "reaction games"        — 23 exact US, 5 exact GB (Bing API 2026-09-05)
//   "reaction time games"   — 21 exact US, 3 exact GB (Bing API 2026-09-05)
// INTERNATIONAL:
//   "反射神経ゲーム" (ja-JP) — 606 exact (owned by reflex-training-drill; not reused)
//   "jogos de reflexo" (pt-BR) — 128 exact (below new-locale threshold of 1000/mo)
// ============================================================

export const metadata = {
  title: 'Reaction Game - Free Online Reaction Time Trainer',
  description: 'Free online reaction game. Intercept accelerating falling targets, train visual tracking, and find out how fast your reflexes really are. No sign-up.',
  keywords: [
    'reaction game', 'reflex game', 'reaction games', 'reaction time games',
    'reaction time game', 'reaction time trainer', 'reaction test game',
    'falling target reaction game', 'online reflex games free',
    'hand eye coordination game', 'reaction speed test',
    'vertical tracking aim trainer', 'free aim trainer browser',
    'gaming eye coordination drill', 'choice reaction time test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reaction-game',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-game'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reaction Game - Free Online Reaction Time Trainer | SkillDrills',
    description: 'Play this free online reaction game. Intercept accelerating falling targets, train vertical visual tracking, and improve your hand-eye coordination.',
    url: 'https://skilldrills.online/drills/reaction-speed/reaction-game',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Game - Free Online Reaction Time Trainer',
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
  "name": "Reaction Game — Free Online Reaction Time Trainer | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reaction-game",
  "dateModified": "2026-09-05",
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
  "name": "How to Play the Reaction Game",
  "description": "Step-by-step instructions on intercepting dynamic targets and training neuromuscular speed.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Game",
      "text": "Click or tap Start Drill to enter the reaction arena.",
      "url": "https://skilldrills.online/drills/reaction-speed/reaction-game#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track Incoming Targets",
      "text": "Keep your gaze centered to detect falling circular targets the moment they appear.",
      "url": "https://skilldrills.online/drills/reaction-speed/reaction-game#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Intercept Targets Fast",
      "text": "Click or tap targets high on screen to maximize time bonuses and preserve combo multipliers.",
      "url": "https://skilldrills.online/drills/reaction-speed/reaction-game#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Review Reaction Stats",
      "text": "Review your interception speed, hit rate, and highest achieved difficulty level at session end.",
      "url": "https://skilldrills.online/drills/reaction-speed/reaction-game#step-4"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Reaction Game",
  "alternateName": ["Falling Target Reaction Game", "Reaction Speed Game", "Reflex Game"],
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Kinetic interception reflex game testing vertical visual tracking and rapid motor reactions.",
  "softwareVersion": "2.0"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Reaction Game - Kinetic Interception Reflex Training",
  "url": "https://skilldrills.online/drills/reaction-speed/reaction-game",
  "description": "Intercept accelerating falling targets to condition hand-eye coordination and reflex speed.",
  "genre": ["Reflex Game", "Action", "Esports Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a reaction game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A reaction game is an interactive training tool designed to test and condition neuromuscular response speed, visual tracking, and hand-eye coordination through rapid stimulus interception."
      }
    },
    {
      "@type": "Question",
      "name": "What games test reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction time is tested by simple visual click timers, dynamic target interception games, fast-paced rhythm games, and tactical FPS aim trainers that challenge sensory processing latency."
      }
    },
    {
      "@type": "Question",
      "name": "What is the average reaction time for a human?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Average human visual reaction time to simple stimuli is 200–250ms. Complex choice reaction tasks requiring stimulus identification and motor selection typically take 250–350ms."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train your reaction time with games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Consistent reaction training conditions neuromuscular pathways, reduces visual discrimination hesitation, and sharpens anticipatory motor readiness."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between simple reaction time and choice reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple reaction time (SRT) measures response latency to a single known stimulus. Choice reaction time (CRT) requires evaluating multiple alternative targets or lanes before executing a motor action, scaling logarithmically with stimulus alternatives per Hick\'s Law (Hick, 1952)."
      }
    },
    {
      "@type": "Question",
      "name": "What games improve hand-eye coordination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vertical falling-target games, rhythm action titles, and fast tracking aim drills heavily train hand-eye coordination by forcing rapid spatial alignment between visual gaze and cursor position."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good reaction time for gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Competitive esports players typically maintain reaction speeds between 150ms and 190ms, giving them a critical advantage in fast tactical duels and twitch shooters."
      }
    },
    {
      "@type": "Question",
      "name": "Does playing video games increase reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peer-reviewed research by Dye, Green, and Bavelier (2009 in Neuropsychologia) demonstrated that action video game players exhibit approximately 10% faster reaction times across both simple and choice motor tasks without sacrificing decision accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my reaction time slow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction latency increases due to mental fatigue, sleep deprivation, cognitive distraction, high input hardware latency, and standard 60Hz display buffering."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect reflex game scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A 60Hz display draws a new frame every 16.7ms, whereas a 144Hz monitor refreshes every 6.9ms and a 240Hz monitor every 4.1ms, noticeably reducing input lag."
      }
    },
    {
      "@type": "Question",
      "name": "What is vertical tracking in gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vertical tracking is the motor skill of smoothly maintaining crosshair centering on targets moving, dropping, or jumping along the vertical Y-axis."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reaction game free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all drills on SkillDrills are 100% free to play directly in your web browser with no registration, downloads, or pop-up ads."
      }
    },
    {
      "@type": "Question",
      "name": "Does this drill support touchscreens and mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The drill features generous touch hitpads and automatic orientation detection for optimal play on mobile phones and tablets."
      }
    },
    {
      "@type": "Question",
      "name": "How does adaptive difficulty work in this reaction game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Difficulty scales dynamically with your score and combo streak. Targets accelerate downward, spawn intervals tighten, and target hitboxes shrink as your level increases."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice reflex training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A daily 5-to-10 minute warmup session provides optimal neuromuscular conditioning without inducing eye strain or hand fatigue."
      }
    }
  ]
};

const reactionGameGuide = {
  heading: "Reaction Game Guide: Training Vertical Tracking & Interception Reflexes",
  intro: [
    "A reaction game is an interactive training tool designed to test and condition neuromuscular response speed, visual tracking, and hand-eye coordination through rapid stimulus interception. Unlike static single-button reaction timers, multi-lane falling-target games engage choice reaction time by requiring players to track dynamic trajectories across the visual field and intercept targets before they escape.",
    "Our vertical reaction game runs directly in your browser with zero downloads, providing millisecond response telemetry, adaptive level scaling, and optional error penalty toggles for esports warmup and cognitive conditioning.",
    "Measurement Methodology & Display Latency: Target response latency is measured using the High Resolution Time API (performance.now()), calculating the exact duration between canvas frame dispatch and pointer contact. Benchmark interpretations must account for hardware display latency: a 60Hz screen introduces up to 16.7ms of frame buffer delay, whereas 144Hz displays reduce frame latency to 6.9ms and 240Hz monitors to 4.1ms.",
    "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
  ],
  benchmarks: {
    title: "Reaction Game Performance & Scoring Reference Tiers",
    headers: ["Score Range", "Difficulty Band", "Skill Profile", "Recommended Focus"],
    rows: [
      ["15,000+ pts", "Grandmaster", "Immediate foveal acquisition and micro-second click release", "Maintain composure during multi-sphere simultaneous drops"],
      ["10,000–14,999 pts", "Elite", "High-level anticipation with minimal miss penalties", "Push interception point higher up the vertical lanes"],
      ["6,000–9,999 pts", "Proficient", "Consistent baseline reflexes with occasional misses", "Focus on peripheral detection rather than tracking single targets"],
      ["2,500–5,999 pts", "Intermediate", "Comfortable with single targets, challenged by multi-lane waves", "Minimize mouse travel by resting cursor near mid-lane"],
      ["< 2,500 pts", "Novice", "Reactive clicking with higher panic and delay", "Prioritize accuracy over speed to build rhythm"]
    ],
    note: "These scoring bands are an editorial reference guide calibrated for standard 60–144Hz displays. This site collects no aggregate user data; scoring bands reflect game engine velocity tiers. Enabling the optional time penalty increases difficulty significantly."
  },
  techniques: {
    title: "Reaction & Interception Mechanics",
    items: [
      {
        name: "High-Screen Interception",
        desc: "Clicking falling targets near the upper-third of the screen maximizes time buffer and conditions fast-twitch motor release before targets reach critical velocity.",
        tips: "Keep your eye gaze slightly above screen center to register spawns the millisecond they appear."
      },
      {
        name: "Trajectory Projection & Choice Response",
        desc: "Rather than chasing targets reactively, project where the target will be 150ms in the future and let it fall into your crosshair to eliminate motor over-correction.",
        tips: "Anticipatory clicking engages cortical motor planning, noticeably reducing interception delay compared to reactive cursor dragging."
      },
      {
        name: "Peripheral Target Scanning",
        desc: "Fixating intently on one lane leaves you blind to adjacent drops. Soften your visual focus so retinal rod cells detect peripheral motion immediately upon target spawn.",
        tips: "Human peripheral vision possesses higher temporal resolution for rapid movement than central foveal vision."
      },
      {
        name: "Display Refresh & Hardware Latency",
        desc: "A standard 60Hz display introduces ~16.7ms of frame buffer latency, whereas 144Hz displays reduce latency to ~6.9ms and 240Hz to ~4.1ms.",
        tips: "Use a high-refresh monitor, 1000Hz polling rate gaming mouse, and disable browser hardware acceleration throttling for crisp click registration."
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
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('kosinski2008', 'hick1952', 'woods2015'),
  related: [
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/reflex-training-drill", label: "Reflex Training Drill" },
    { href: "/drills/reaction-speed/fps-tracking-trainer", label: "FPS Tracking Trainer" },
    { href: "/drills/reaction-speed/saccadic-gallery", label: "Saccadic Eye Exercises" }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
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
      <ReactionSimulatorWrapper copy={{ title: 'Reaction Game' }} />
      <DrillGuide guide={reactionGameGuide} />
    </>
  );
}
