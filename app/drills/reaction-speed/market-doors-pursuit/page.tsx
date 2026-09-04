import MarketDoorsPursuitWrapper from './MarketDoorsPursuitWrapper';
import DrillGuide from '@/components/drill/DrillGuide';

// ============================================================
// SEO RESEARCH FINDINGS — market-doors-pursuit
// PRIMARY: "corner checking trainer" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
//          "saccadic eye movement training" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
// SECONDARY / LSI:
//   "slicing the pie" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
//   "clearing angles" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
// ============================================================

export const metadata = {
  title: 'Corner Checking Trainer - Saccadic Eye Training Drill',
  description: 'Free corner checking trainer online. Train saccadic eye movements and angle clearing reflexes - practice slicing the pie for FPS games and sports vision.',
  keywords: [
    'corner checking trainer', 'saccadic eye movement training', 'corner checking drill',
    'slicing the pie shooting', 'saccadic eye exercises', 'clearing angles fps',
    'how to clear corners valorant', 'checking corners in fps', 'visual tracking exercises',
    'eye tracking training for gamers', 'sports vision training drills',
    'tactical clearing angles trainer', 'saccadic eye movement dysfunction exercises',
    'prefire corner checking map', 'angle clearing drill online',
    'free reflex trainer browser', 'gaming eye coordination test', 'threat checking speed game'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/market-doors-pursuit',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Corner Checking Trainer - Saccadic Eye Training Drill | SkillDrills',
    description: 'Train your saccadic eye movements and corner checking reflexes with this free Corner Checking Trainer. Improve your angle clearing and master \'slicing the pie\' in FPS games.',
    url: 'https://skilldrills.online/drills/reaction-speed/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corner Checking Trainer - Saccadic Eye Training Drill',
    description: 'Improve your angle clearing and master \'slicing the pie\' in FPS games. Free browser-based corner checking and saccadic eye trainer.',
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
    { "@type": "ListItem", "position": 4, "name": "Corner Checking Trainer", "item": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Corner Checking Trainer — Saccadic Eye Training Drill | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit",
  "description": "Train reaction speed, visual pursuit tracking, and saccadic eye movements. A free device-adaptive visual reflex simulator for mobile and desktop.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Saccadic Eye Movements, Corner Checking, Angle Clearing, Visual Scanning, Slicing the Pie, Threat Identification"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Corner Checking Trainer (Market Doors Pursuit)",
  "description": "Isolates and trains foveal scanning, rapid target acquisition, visual pursuit, and hand-eye reaction speed across multiple entry points.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support."
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Saccadic Eye Movements & Corner Checking",
  "description": "Step-by-step instructions on improving your angle clearing, visual scanning, and reaction speed across multiple doorways.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Drill",
      "text": "Press Start Drill to initialize the Market Doors environment in full screen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Scan the Entry Doors",
      "text": "Keep your gaze alert across the horizontal line of doors, sweep your eyes from door to door, simulating slicing the pie around corners."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Track and Eliminate Targets",
      "text": "As a target flashes inside an open door, click or tap it immediately before it goes out of view."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintain a Streak",
      "text": "Chain successful hits back to back to level up faster — targets peek quicker and shrink in size the higher you climb."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does 'slicing the pie' mean in FPS games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slicing the pie is a tactical technique where a player sweeps around a corner incrementally to clear narrow angles one by one."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill improve site entry in Valorant and CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Site entries require checking multiple doorways simultaneously. Training saccadic sweeps reduces hesitation when clearing entry points."
      }
    },
    {
      "@type": "Question",
      "name": "Does this drill train choice reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Targets appear randomly in any doorway, forcing your visual cortex to process spatial location and execute immediate taps."
      }
    },
    {
      "@type": "Question",
      "name": "Should I look at the doorways or my crosshair?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus your eyes directly on the open doorway spaces while allowing your motor reflex to snap the crosshair onto emerging targets."
      }
    }
  ]
};

const marketDoorsGuide = {
  heading: "Corner Checking Trainer Guide: Slicing the Pie & Clearing Tactical Angles",
  intro: [
    "Corner checking is a foundational tactical discipline in close-quarters battle (CQB), tactical sports, and first-person shooters (CS2, Valorant, Rainbow Six Siege). Entering a room or corridor without methodically clearing angles exposes you to ambushes from blind spots.",
    "Known as 'slicing the pie', angle clearance involves systematically checking small sectors of an opening from outside the threshold before committing forward. The Corner Checking Trainer gamifies this discipline by presenting five tactical doorways where targets flash unpredictably, conditioning your visual sweeping speed and threat engagement."
  ],
  benchmarks: {
    title: "Corner Checking & Angle Clearing Reference Tiers",
    headers: ["Clear & Engagement Latency", "Tactical Tier", "Threat Recognition Rate", "Tactical Equivalent", "Key Area of Improvement"],
    rows: [
      ["< 210 ms", "Apex Operator", "98%+", "Pro CS2 Entry Fragger / Radiant", "Flawless crosshair placement with instantaneous target confirmation"],
      ["210 – 260 ms", "Tactical Specialist", "92% – 97%", "Faceit Level 10 / Immortal", "Consistent angle sweep discipline with minimal prefire over-commitment"],
      ["261 – 320 ms", "Competent Fragger", "84% – 91%", "Diamond / Ascendant", "Effective sweeping rhythm; occasional delay when clearing deep corner blindspots"],
      ["321 – 400 ms", "Developing", "72% – 83%", "Gold / Platinum", "Tendency to visually linger on cleared doors rather than snapping to the next angle"],
      ["> 400 ms", "Novice", "< 72%", "Silver / Casual", "Erratic sweeping; slow recognition of target emergence behind doorway frames"]
    ],
    note: "These tactical engagement brackets are an editorial reference guide designed to evaluate speed and threat discrimination across multiple doorway vectors."
  },
  techniques: {
    title: "Tactical Angle Clearance & Pie-Slicing Mechanics",
    items: [
      {
        name: "Methodical Slicing vs. Wide Peeking",
        desc: "Slicing the pie means revealing yourself to only one possible enemy position at a time by inching along a circular arc. Wide swinging exposes you to multiple angles simultaneously, making survival near impossible.",
        tips: "Keep your crosshair glued to the door frame as your perspective changes."
      },
      {
        name: "Crosshair Placement Discipline",
        desc: "Crosshair placement is about pre-aiming at the exact height and depth where an enemy's head will emerge. If your crosshair is already at head level, your reaction requires only a click rather than a flick-plus-click.",
        tips: "Keep your cursor at head level across all doorway openings."
      },
      {
        name: "Pre-Aiming vs. Reaction Drag",
        desc: "Never clear an angle with lazy eyes. Anticipate that an opponent is behind every door frame you check. Expecting a target shortens motor initiation latency by 40–70ms compared to passive observing.",
        tips: "Maintain high cognitive readiness ('pre-aim mentality') on every check."
      },
      {
        name: "Saccadic Sweep Rhythm",
        desc: "When checking multiple doors in sequence, establish a consistent cadence. Jerky, uneven sweeps cause visual motion blur and decrease threat detection accuracy.",
        tips: "Let your eyes settle for a fraction of a second on each opening to confirm clarity."
      }
    ]
  },
  steps: [
    "Launch the trainer in full screen and prepare for the 5-doorway tactical layout.",
    "Position your crosshair on the first designated doorway boundary.",
    "Sweep rhythmically across the doors, systematically slicing angles from left to right or right to left.",
    "The instant a hostile target flashes within a doorway, engage immediately with precise crosshair alignment.",
    "Complete the drill waves to assess your angle clearance speed, sweep consistency, and hit rate."
  ],
  audience: "Tactical shooter players (Valorant, CS2, Rainbow Six Siege, Tarkov), military and law enforcement trainees, and esports athletes conditioning visual angle awareness.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  related: [
    { href: "/drills/reaction-speed/barrier-sequence-pursuit", label: "Jiggle Peek Trainer" },
    { href: "/drills/reaction-speed/saccadic-gallery", label: "Saccadic Gallery" },
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/fps-tracking-trainer", label: "FPS Tracking Trainer" }
  ]
};

export default function MarketDoorsPursuitPage() {
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
      <MarketDoorsPursuitWrapper />
      <DrillGuide guide={marketDoorsGuide} />
    </>
  );
}
