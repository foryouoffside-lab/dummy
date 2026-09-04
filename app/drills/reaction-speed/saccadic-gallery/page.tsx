import SaccadicGalleryWrapper from './SaccadicGalleryWrapper';
import DrillGuide from '@/components/drill/DrillGuide';

// ============================================================
// SEO RESEARCH FINDINGS — saccadic-gallery
// PRIMARY: "saccadic eye exercises" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
//          "saccadic gallery"       — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
// SECONDARY / LSI:
//   "saccadic eye movement training" / "eye tracking training"
// ============================================================

export const metadata = {
  title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
  description: 'Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.',
  keywords: [
    'saccadic eye exercises', 'eye tracking training', 'saccadic gallery',
    'visual tracking exercises', 'saccadic eye movement training', 'esports vision training',
    'saccadic training online', 'saccadic tracking exercises', 'ocular coordination training',
    'how to improve saccadic eye movement', 'vision therapy exercises online',
    'zig zag eye tracking test', 'ballistic eye sweeps trainer',
    'free eye exercises game', 'sports vision drills free', 'cognitive eye warmup'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/saccadic-gallery',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
    description: 'Practice saccadic eye exercises online with the free Saccadic Gallery training drill. Improve your eye tracking, visual processing speed, and ballistic eye sweeps.',
    url: 'https://skilldrills.online/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
    description: 'Track glowing targets flashing in a zig-zag gallery pattern. Free browser-based saccadic eye trainer with no downloads.',
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
    { "@type": "ListItem", "position": 4, "name": "Saccadic Gallery", "item": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Saccadic Gallery — Online Saccadic Eye Exercises | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery",
  "description": "Sequence-based ballistic eye shifts. Track glowing targets flashing in a zig-zag gallery pattern to improve foveal sweep speed and eye movement agility.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Saccadic Eye Exercises, Visual Scanning, Ballistic Eye Sweeps, Eye Tracking Accuracy, Focus Speed"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Perform Saccadic Eye Exercises with Saccadic Gallery",
  "description": "Improve your foveal scanning and ballistic eye movements against glowing target sequence patterns.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure and Begin",
      "text": "Press Start Drill to launch Saccadic Gallery in full screen mode."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track Target Sequence",
      "text": "Focus your eyes on the sequence of targets as they light up in a gallery layout across the viewport."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Sweep Eyes Ballistically",
      "text": "Shift your focus quickly from one target to the next. Keep your head still; let your eye muscles execute the sweep."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Tap to Eliminate",
      "text": "Click or tap active targets as fast as possible to verify focus lock and keep your accuracy climbing."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between saccadic and smooth pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic movements are rapid jumps between targets, whereas smooth pursuit involves smoothly tracking a moving object across space."
      }
    },
    {
      "@type": "Question",
      "name": "Should I move my head or only my eyes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keep your head still and move only your eyes. Moving only your eyes conditions true saccadic agility and faster neural processing."
      }
    },
    {
      "@type": "Question",
      "name": "What is saccadic latency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic latency is the time delay (typically 150-200ms) between the appearance of a visual target and the initiation of an eye jump."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on Saccadic Gallery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score above 5,000 indicates strong ocular reflexes, while scores exceeding 10,000 represent elite saccadic eye speed."
      }
    }
  ]
};

const saccadicGalleryGuide = {
  heading: "Saccadic Eye Exercises Guide: Training Rapid Ocular Repositioning & Target Acquisition",
  intro: [
    "A saccade is a rapid, conjugate movement of both eyes between phases of fixation. Ranging from 200 to 700 degrees per second, saccades are among the fastest biological movements produced by the human body. Saccadic eye exercises train the extraocular muscles and cortical gaze centers to acquire visual targets swiftly and accurately.",
    "In daily life, competitive sports, and digital work, saccadic efficiency dictates how rapidly you can shift attention between dashboard displays, read text lines, spot an opponent on the screen edge, or react to peripheral motion. The Saccadic Gallery isolates these rapid eye jumps across wide zig-zag vectors."
  ],
  benchmarks: {
    title: "Saccadic Fixation & Eye Exercise Reference Tiers",
    headers: ["Fixation Latency", "Saccadic Tier", "Fixation Accuracy", "Visual Function Equivalent", "Key Clinical / Training Focus"],
    rows: [
      ["< 180 ms", "Elite / High-Performance", "98%+", "Professional esports / High-speed motorsport driver", "Maintain ocular stamina without saccadic drift or fatigue"],
      ["180 – 230 ms", "Optimal / Athletic", "92% – 97%", "Competitive athlete / High visual reader", "Eliminate micro-overshoots (hypermetria) on wide angle targets"],
      ["231 – 290 ms", "Normal / Functional", "85% – 91%", "Standard adult healthy ocular motor function", "Improve visual scanning rhythm and peripheral cue pickup"],
      ["291 – 360 ms", "Sluggish / Fatigued", "72% – 84%", "Visual fatigue, prolonged screen time, or lack of sleep", "Take regular 20-20-20 visual breaks; reduce digital eye strain"],
      ["> 360 ms", "Sub-Optimal", "< 72%", "Sedentary or unconditioned oculomotor performance", "Consult an eye care professional if persistent fixation difficulty occurs"]
    ],
    note: "These saccadic latency bands are an editorial reference guide for computer-based visual exercises. They do not substitute for clinical electro-oculography or optometric diagnosis."
  },
  techniques: {
    title: "Oculomotor Conditioning & Saccade Protocols",
    items: [
      {
        name: "Eliminating Saccadic Dysmetria",
        desc: "Dysmetria occurs when the eyes either overshoot (hypermetria) or undershoot (hypometria) the intended target, requiring a corrective secondary saccade that wastes 80–120ms.",
        tips: "Keep your head stable and move only your eyes to build true ocular muscle control."
      },
      {
        name: "Head-Still Isolation Protocol",
        desc: "Many individuals inadvertently rotate their neck and head to follow target jumps rather than moving their extraocular muscles. True saccadic training requires isolating the eye muscles from cervical spine movement.",
        tips: "Rest your chin lightly in a resting hand or focus consciously on maintaining head stability."
      },
      {
        name: "Wide-Angle Visual Scanning",
        desc: "Targets in the Saccadic Gallery jump across large visual degrees. Practicing wide jumps strengthens the lateral and medial rectus muscles, enhancing horizontal and oblique field scanning.",
        tips: "Ensure full screen coverage so targets leverage your full monitor dimensions."
      },
      {
        name: "Ocular Fatigue Prevention",
        desc: "The extraocular muscles tire quickly when subjected to rapid eccentric contractions. Sessions should be capped at 5–10 minutes to prevent muscle strain and headaches.",
        tips: "Follow each session with gentle palming (covering eyes with warm palms) to relax ocular muscles."
      }
    ]
  },
  steps: [
    "Sit upright with your monitor directly at eye level and your head centered.",
    "Click Start Drill and focus on the initial center target marker.",
    "As targets illuminate across the zig-zag gallery, jump your eyes immediately to the new coordinate.",
    "Click or confirm the target the moment your fovea locks onto its center.",
    "Complete the sequence to review your median saccadic reaction time, spatial accuracy, and drift."
  ],
  audience: "Athletes seeking faster visual field awareness, individuals doing eye strain recovery exercises, esports competitors, and readers looking to improve scan efficiency.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  related: [
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/visual-tracking-speed-test", label: "Visual Tracking Speed Test" },
    { href: "/drills/reaction-speed/market-doors-pursuit", label: "Corner Checking Trainer" },
    { href: "/drills/reaction-speed/barrier-sequence-pursuit", label: "Jiggle Peek Trainer" }
  ]
};

export default function SaccadicGalleryPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SaccadicGalleryWrapper />
      <DrillGuide guide={saccadicGalleryGuide} />
    </>
  );
}
