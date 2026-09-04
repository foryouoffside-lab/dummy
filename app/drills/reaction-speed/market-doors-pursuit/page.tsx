import MarketDoorsPursuitWrapper from './MarketDoorsPursuitWrapper';

// ============================================================
// SEO RESEARCH FINDINGS — market-doors-pursuit
// PRIMARY: "saccadic eye movement training" ~250/mo US, KD ~22% (Low-Moderate)
//          "corner checking trainer" — highly targeted niche tool
// SECONDARY / LSI:
//   "slicing the pie"                 ~1,900/mo, KD ~22%
//   "saccadic eye exercises"          ~480/mo,   KD ~25%
//   "visual tracking exercises"       ~1,300/mo, KD ~30%
//   "clearing angles"                 ~210/mo,   KD ~12%
//   "sports vision training"          ~720/mo,   KD ~26%
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
    </>
  );
}
