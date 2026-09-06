import MarketDoorsPursuitWrapper from './MarketDoorsPursuitWrapper';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — market-doors-pursuit
// PRIMARY: "corner checking trainer" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-05)
//          "saccadic eye movements"   — 85 exact / 85 broad US (Bing API 2026-09-05)
// SECONDARY / LSI:
//   "saccades"            — 576 exact / 576 broad US (Bing API 2026-09-05)
//   "crosshair placement" — 4 exact US, 2 exact GB (Bing API 2026-09-05)
//   "slicing the pie fps" — tactical intent (Reddit r/FPSAimTrainer, YouTube)
//   "clearing angles"     — tactical intent (Refrag.gg, CS2 / Valorant entry guides)
// ============================================================

export const metadata = {
  title: 'Corner Checking Trainer - Saccadic Eye Training Drill',
  description: 'Free corner checking trainer online. Train saccadic eye movements, doorway clearing reflexes, and tactical pie-slicing for FPS games and sports vision.',
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
  "dateModified": "2026-09-05",
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
  "name": "Corner Checking Trainer",
  "alternateName": "Market Doors Pursuit",
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
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does 'slicing the pie' mean in FPS games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slicing the pie is a tactical clearing technique where a player moves along a circular arc outside a corner or doorway threshold, revealing narrow angle slices incrementally so only one potential threat angle is visible at any single moment."
      }
    },
    {
      "@type": "Question",
      "name": "What is the fatal funnel in doorway clearing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The fatal funnel is the narrow, exposed cone directly in front of an open doorway or corridor choke point. Lingering inside the threshold makes you an easy target from multiple interior angles; tactical players slice from outside before committing forward."
      }
    },
    {
      "@type": "Question",
      "name": "What is the '0-fixation-1-saccade' pattern in competitive gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In a study of 28 experienced first-person-shooter players and 35 non-players, the most common aiming pattern among the experienced group was a '0-fixation-1-saccade' sequence: they went from target appearance to shot in a single eye movement, with no intermediate fixation. It accounted for over 40% of their trials, against far fewer such trials in the non-player group (Yang et al., 2025). The study did not include professional esports athletes, so this describes experienced players rather than the elite tier."
      }
    },
    {
      "@type": "Question",
      "name": "What are horizontal saccades and how do they differ from smooth pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccades are rapid, ballistic eye jumps (lasting 20–40 ms) that reposition the high-acuity fovea between distinct spatial anchor points. Smooth pursuit is a slower, continuous gaze tracking of a steadily moving object (Rayner, 1998). Corner checking relies primarily on rapid horizontal saccades."
      }
    },
    {
      "@type": "Question",
      "name": "Why is crosshair placement more important than raw flick aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Proper crosshair placement pre-aligns your aiming reticle at head level along the threshold boundary where an opponent is expected to appear. This converts what would be a complex two-step flick-and-click into a simple timing click, eliminating 100–150 ms of travel latency."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect corner checking reaction speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Standard 60 Hz displays introduce up to 16.7 ms of frame buffer latency per visual update, whereas 144 Hz (6.9 ms) and 240 Hz (4.1 ms) esports displays render emerging doorway targets sooner, significantly reducing total input-to-render latency (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "How does perspective geometry create a distance advantage around corners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Due to angle geometry and optical ray occlusion, a player standing further back from a corner wall will see an opponent hugging the close side of the wall before the close player can see them. Maintaining distance while slicing the pie maximizes this geometric sightline advantage."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train your saccadic eye speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Digital sports vision training and oculomotor conditioning drills improve visual search efficiency, reduce fixation pause durations, and enhance foveal target acquisition under high cognitive load (Appelbaum & Erickson, 2018)."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill improve site entry in Valorant and CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Entering a bombsite requires checking multiple orthogonal doorways and choke points in rapid succession. Conditioning horizontal saccadic sweeps prevents visual over-commitment and builds consistent horizontal scanning discipline."
      }
    },
    {
      "@type": "Question",
      "name": "Does this drill work on mobile devices and touchscreens?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! It features touch hit detection and adapts automatically to mobile devices. On smartphones, landscape orientation is recommended to provide a wider horizontal field of view for door scanning."
      }
    }
  ]
};

const marketDoorsGuide = {
  heading: "Corner Checking Trainer Guide: Slicing the Pie & Clearing Tactical Angles",
  intro: [
    "Corner checking is a foundational tactical discipline in close-quarters battle (CQB), tactical sports, and first-person shooters (CS2, Valorant, Rainbow Six Siege). Entering a room or corridor without methodically clearing angles exposes you to ambushes from blind spots.",
    "Known as 'slicing the pie', angle clearance involves systematically checking small sectors of an opening from outside the threshold before committing forward. The Corner Checking Trainer gamifies this discipline by presenting five tactical doorways where targets flash unpredictably, conditioning your visual sweeping speed and threat engagement.",
    "Timing Methodology: Target presentation latency and player click times are recorded client-side using the high-resolution performance.now() API. Hardware latency adds display quantization delay (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz, ~4.1 ms at 240 Hz) and mouse polling latency (~8 ms at 125 Hz vs ~1 ms at 1000 Hz), as documented by Woods et al. (2015).",
    "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
  ],
  benchmarks: {
    title: "Corner Checking & Angle Clearing Reference Tiers",
    headers: ["Clear & Engagement Latency (ms)", "Tactical Tier", "Esports Equivalent", "Key Area of Improvement"],
    rows: [
      ["< 210 ms", "Apex Operator", "Pro CS2 Entry Fragger / Radiant", "Flawless horizontal crosshair placement with instantaneous visual target confirmation"],
      ["210 – 260 ms", "Tactical Specialist", "Faceit Level 10 / Immortal", "Consistent angle sweep discipline with minimal prefire hesitation"],
      ["261 – 320 ms", "Competent Fragger", "Diamond / Ascendant", "Effective sweeping rhythm; occasional delay when clearing peripheral doorway angles"],
      ["321 – 400 ms", "Developing", "Gold / Platinum", "Tendency to visually linger on cleared doors rather than snapping smoothly to the next angle"],
      ["> 400 ms", "Novice", "Silver / Casual", "Erratic horizontal sweeping; slow recognition of target emergence behind doorway frames"]
    ],
    note: "These engagement tiers represent an editorial reference guide for horizontal saccadic scanning and doorway target clearance under standard 60Hz display conditions."
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
        desc: "Never clear an angle with lazy eyes. Anticipating target emergence engages frontal eye fields and premotor neural circuits, significantly reducing target acquisition latency compared to passive observation (Rayner, 1998; Findlay & Walker, 1999).",
        tips: "Maintain high cognitive readiness ('pre-aim mentality') on every doorway sweep."
      },
      {
        name: "The '0-Fixation-1-Saccade' Aiming Pattern",
        desc: "Among 28 experienced FPS players, the most frequent aiming pattern was a '0-fixation-1-saccade' sequence -- target appearance to shot in one eye movement, with no intermediate fixation -- in over 40% of trials (Yang et al., 2025). The sample did not include professional players.",
        tips: "Commit to decisive, single-flick target acquisition rather than two-stage micro-adjustments."
      },
      {
        name: "Saccadic Sweep Cadence",
        desc: "When scanning multiple entryways in sequence, establish a stable horizontal rhythm. Jerky, uneven eye movements induce motion blur and visual suppression, reducing detection fidelity across doorway gaps.",
        tips: "Let your fovea settle for a brief 150–200 ms fixation on each threshold to confirm clarity before advancing."
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
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('rayner1998', 'findlay1999', 'appelbaum2018', 'yang2025', 'woods2015'),
  related: [
    { href: "/drills/reaction-speed/barrier-sequence-pursuit", label: "Jiggle Peek Trainer" },
    { href: "/drills/reaction-speed/reaction-game", label: "Reaction Game" },
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/saccadic-gallery", label: "Saccadic Eye Exercises" },
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
