import ReactionSpeedDrillsClient from './ReactionSpeedDrillsClient';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-speed category hub
// PRIMARY: "reaction time test" ~90,500/mo US, KD ~45% (High volume)
//          "reaction speed training" ~880/mo US, KD ~30%
// SECONDARY / LSI:
//   "reflex training"                 ~480/mo,   KD ~25%
//   "reflex test online"              ~590/mo,   KD ~15%
//   "click speed test"                ~49,500/mo, KD ~55%
//   "hand eye coordination test"      ~2,400/mo, KD ~22%
//   "gaming reflex trainer"           ~170/mo,   KD ~15%
// Key entities: simple reaction time, choice reaction time, foveal pursuit,
//   saccadic sweeps, target acquisition, millisecond latency, neuroplasticity
// ============================================================

export const metadata = {
  title: 'Free Reaction Time Test & Reaction Speed Training | SkillDrills',
  description: 'Improve your reflexes with free online Reaction Time Tests and Reaction Speed Training drills. Train your click speed, saccadic tracking, and eye agility with 12 free tools.',
  keywords: [
    // Primary / Head terms
    'reaction time test', 'reaction speed training', 'reflex training',
    // Secondary / LSI terms
    'reflex test online', 'click speed test', 'hand eye coordination test',
    'gaming reflex trainer', 'esports reaction training', 'visual tracking training',
    // Long-tail variants
    'free online reaction speed exercises', 'improve click reaction speed gaming',
    'eye tracking coordination test', 'how to reduce reaction time latency',
    // General
    'free online aim trainer', 'sports vision training drills', 'low latency reaction test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free Reaction Time Test & Reaction Speed Training | SkillDrills',
    description: 'Improve your reflexes with free online Reaction Time Tests and Reaction Speed Training drills. Train your click speed, saccadic tracking, and eye agility.',
    url: 'https://skilldrills.online/drills/reaction-speed',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Reaction Time Test & Reaction Speed Training | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Reaction Time Test & Reaction Speed Training',
    description: 'Train click speed, saccadic reflex calibration, and visual processing speeds with 12 free interactive reaction speed drills.',
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
    { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/reaction-speed" }
  ]
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Free Reaction Time Test & Reaction Speed Training Drills",
  "url": "https://skilldrills.online/drills/reaction-speed",
  "description": "A curated collection of 12 free interactive reaction time tests and reflex training games online. Practice eye coordination, smooth pursuit tracking, corner checking, and click speed responses.",
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "hasPart": [
    { "@type": "WebApplication", "name": "Reaction Time Test", "url": "https://skilldrills.online/drills/reaction-speed/reaction-time-test" },
    { "@type": "WebApplication", "name": "Reaction Simulator", "url": "https://skilldrills.online/drills/reaction-speed/reaction-simulator" },
    { "@type": "WebApplication", "name": "Reflex Training Drill", "url": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill" },
    { "@type": "WebApplication", "name": "Saccadic Gallery (Eye Exercises)", "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery" },
    { "@type": "WebApplication", "name": "Saccadic Snap (Eye Focus exercises)", "url": "https://skilldrills.online/drills/reaction-speed/saccadic-snap" },
    { "@type": "WebApplication", "name": "Visual Tracking Speed Test", "url": "https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test" },
    { "@type": "WebApplication", "name": "Aim Tracking Trainer (FPS Tracking)", "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer" },
    { "@type": "WebApplication", "name": "Reactive Strafe Pursuit", "url": "https://skilldrills.online/drills/reaction-speed/reactive-strafe-pursuit" },
    { "@type": "WebApplication", "name": "Cover Peeking Reflex Drill (Barrier sequence)", "url": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit" },
    { "@type": "WebApplication", "name": "Corner Checking Trainer (Market doors)", "url": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit" },
    { "@type": "WebApplication", "name": "Slide Dash Acceleration (Visual tracking)", "url": "https://skilldrills.online/drills/reaction-speed/slide-dash-acceleration" },
    { "@type": "WebApplication", "name": "Stop and Go Dash (Smooth pursuit)", "url": "https://skilldrills.online/drills/reaction-speed/stop-and-go-dash" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is reaction speed training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction speed training involves performing repetitive visual and physical drills designed to reduce response latency. By training your brain to recognize visual stimuli (like color changes or target spawns) and execute motor actions (clicking or tapping) faster, you reinforce neuroplastic pathways."
      }
    },
    {
      "@type": "Question",
      "name": "How can I improve my reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can improve your reaction time through consistent reflex training, staying well-hydrated, maintaining a regular sleep cycle, and reducing screen input latency using high refresh rate monitors (144Hz+) and low-latency mouse/keyboard setups."
      }
    },
    {
      "@type": "Question",
      "name": "What is a normal human reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average human reaction time to visual stimuli is approximately 250 milliseconds (ms). With dedicated training and optimal physical conditioning, elite gamers and athletes can lower their visual reaction time to 150-180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between simple and choice reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple reaction time involves responding to a single visual cue (e.g. clicking when a screen turns green). Choice reaction time involves identifying one specific target among distractors or adapting to erratic movement changes, requiring cognitive decision-making before execution."
      }
    },
    {
      "@type": "Question",
      "name": "How do visual tracking exercises improve reflexes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visual tracking exercises coordinate the ocular muscles to trace moving targets smoothly (smooth pursuit) or jump accurately between targets (saccades). Conditioning these movements allows your visual cortex to process object coordinate changes faster, leading to a quicker motor response."
      }
    },
    {
      "@type": "Question",
      "name": "Can reaction speed training help in competitive gaming (esports)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, absolutely. Fast reaction speed, clean saccadic sweep accuracy, and stable target acquisition are crucial for aiming, crosshair placement, dodging, and spatial awareness in tactical shooters (Valorant, CS2) and fast-paced battle royales."
      }
    },
    {
      "@type": "Question",
      "name": "Do these reflex drills work on mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All reaction and reflex drills on SkillDrills are fully responsive and touch-optimized, allowing you to train on smartphones, tablets, and desktop computers directly in your web browser."
      }
    },
    {
      "@type": "Question",
      "name": "Are all reaction time tests and drills free on SkillDrills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all games, cognitive training drills, and reflex tests on SkillDrills are 100% free with no signups, downloads, or ads. You can practice directly in your browser."
      }
    }
  ]
};

export default function ReactionSpeedDrillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReactionSpeedDrillsClient />
    </>
  );
}

