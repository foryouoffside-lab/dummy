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
//   "eye tracking training"           ~250/mo,   KD ~18%
//   "checking corners in fps"         ~100/mo,   KD ~10%
// PAA targets: "What is slicing the pie in tactical shooting?",
//   "How do you check corners in FPS games?", "What does saccadic eye movement look like?",
//   "What is the difference between saccadic and smooth pursuit eye movements?",
//   "What is the angle advantage in FPS games?"
// Key entities: saccadic sweeps, foveal scanning, spatial awareness, site entry,
//   geometry advantage, visual re-acquisition, choice response, motor response
// ============================================================

export const metadata = {
  title: 'Corner Checking Trainer - Saccadic Eye Training Drill | SkillDrills',
  description: 'Train your saccadic eye movements and corner checking reflexes with this free Corner Checking Trainer (Market Doors Pursuit). Improve your angle clearing, master \'slicing the pie\' in FPS games, and boost sports vision speed.',
  keywords: [
    // Primary / Head terms
    'corner checking trainer', 'saccadic eye movement training', 'corner checking drill',
    // Secondary / LSI terms
    'slicing the pie shooting', 'saccadic eye exercises', 'clearing angles fps',
    'how to clear corners valorant', 'checking corners in fps', 'visual tracking exercises',
    // Long-tail variants
    'eye tracking training for gamers', 'sports vision training drills',
    'tactical clearing angles trainer', 'saccadic eye movement dysfunction exercises',
    'prefire corner checking map', 'angle clearing drill online',
    // General
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
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Corner Checking Trainer - Saccadic Eye Training Drill | SkillDrills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corner Checking Trainer - Saccadic Eye Training Drill',
    description: 'Improve your angle clearing and master \'slicing the pie\' in FPS games. Free browser-based corner checking and saccadic eye trainer.',
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
  "applicationCategory": "EducationalGame",
  "operatingSystem": "Web Browser",
  "isAccessibleForFree": true,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Corner Checking and Saccadic Eye Movements",
  "description": "Improve horizontal eye sweeps and threat recognition speed against visual targets popping up behind five shifting entry doors.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start the Drill",
      "text": "Click the Begin Drill button to enter the interactive viewport. Adjust target color preset to your liking."
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
      "text": "Avoid miss clicks or timeouts to prevent losing time. Surpass level thresholds to unlock faster transitions and keep your combo high."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Market Doors Pursuit (Corner Checking Trainer)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Market Doors Pursuit is a reaction speed training game designed to improve visual scanning and target acquisition. Players scan five entry points horizontally and react immediately as targets peek out behind doors, simulating entry clears."
      }
    },
    {
      "@type": "Question",
      "name": "What is saccadic eye movement training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccades are rapid, voluntary jumps made by the eyes to change fixation points. Saccadic eye training exercises these quick visual shifts, improving your foveal scanning, threat checking, and spatial awareness under time pressure."
      }
    },
    {
      "@type": "Question",
      "name": "How do you check corners in FPS games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To check corners in FPS games, you should clear them sequentially rather than wide-swinging. Sweep your crosshair along the corner edge incrementally, checking angles one by one, keeping your eye focus alert for sudden enemy exposures."
      }
    },
    {
      "@type": "Question",
      "name": "What does 'slicing the pie' mean in tactical shooting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slicing the pie is a tactical entry method where you clear a corner by moving in an orbital arc relative to the corner edge. This allows you to incrementally expose and check narrow sectors of the room, isolating gunfights rather than exposing yourself to multiple angles at once."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between saccadic and smooth pursuit eye movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic movements are rapid, ballistic jumps the eyes make between fixed targets (like checking different corners). Smooth pursuit is the slow, continuous tracking of a single moving object (like tracking a running target across your screen)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the angle advantage in FPS games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The angle advantage (or geometry advantage) dictates that the player standing further away from a corner wall will see the opponent's shoulder/model before the opponent sees them. Standing further back increases your visual reaction window."
      }
    },
    {
      "@type": "Question",
      "name": "How does this corner checking drill improve gaming performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It sharpens your visual agility to scan multiple entry points or visual sectors rapidly, stabilizing your eyes and crosshair on emerging targets instead of panicking or lagging behind."
      }
    },
    {
      "@type": "Question",
      "name": "Does this help in games like Valorant and CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, deeply. Clearing bomb sites, entry paths, and choke points requires checking multiple doorways and angles sequentially. This drill simulates sweeping entry spots and catching quick peeks instantly."
      }
    },
    {
      "@type": "Question",
      "name": "Can I practice saccadic eye exercises on mobile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. This game fully supports mobile touch, trackpad, stylus, and mouse controls. It recommends landscape mode for an optimal visual sweep layout."
      }
    },
    {
      "@type": "Question",
      "name": "Is this eye tracking training free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required. You can practice directly in your browser."
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

