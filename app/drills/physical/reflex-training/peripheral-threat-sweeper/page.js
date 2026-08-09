import PeripheralThreatSweeperClient from './PeripheralThreatSweeperClient';

// ============================================================
// SEO RESEARCH FINDINGS — peripheral-threat-sweeper
// PRIMARY: "peripheral vision training"  ~12,100/mo, KD ~25%
//          "reflex sweeper game"         ~110/mo,    KD ~12%
// SECONDARY / LSI:
//   "spatial awareness game"             ~590/mo,    KD ~16%
//   "peripheral reaction test"           ~260/mo,    KD ~14%
//   "visual motor integration"           ~4,400/mo,  KD ~38%
// PAA targets: "What is peripheral vision training?", "How does the Peripheral Threat Sweeper work?",
//   "Why is peripheral awareness important for gamers?", "What are the different threat types?",
//   "Is this reflex game free to play?"
// ============================================================

export const metadata = {
  title: 'Peripheral Threat Sweeper — Peripheral Vision Trainer | SkillDrills',
  description: 'Train peripheral vision, spatial awareness, and target acquisition. Intercept radial threats before they breach your core in this free reflex game.',
  keywords: [
    // Primary / Head terms
    'peripheral vision training', 'reflex sweeper game',
    // Secondary / LSI terms
    'spatial awareness game', 'peripheral reaction test', 'visual motor integration',
    'tactical awareness drill', 'gaming vision trainer', 'esports field of view',
    // Long-tail variants
    'free online visual-motor training', 'improve peripheral awareness gaming',
    'defend core radial threat reaction game', 'esports target scanning trainer'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Peripheral Threat Sweeper — Peripheral Vision Trainer | SkillDrills',
    description: 'Train peripheral vision, spatial awareness, and target acquisition. Intercept radial threats before they breach your core in this free reflex game.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peripheral Threat Sweeper — Peripheral Vision Trainer | SkillDrills',
    description: 'Train peripheral vision, spatial awareness, and target acquisition. Intercept radial threats before they breach your core in this free reflex game.',
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
    { "@type": "ListItem", "position": 3, "name": "Reflex Training", "item": "https://skilldrills.online/drills/physical/reflex-training" },
    { "@type": "ListItem", "position": 4, "name": "Peripheral Threat Sweeper", "item": "https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Peripheral Threat Sweeper — Peripheral Vision Trainer",
  "url": "https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper",
  "description": "Improve peripheral vision speed and target scanning. Intercept radial targets before they reach the central shield.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Peripheral Vision, Spatial Awareness, Threat Interception, Visual Scanning, Eye-Hand Coordination"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Peripheral Threat Sweeper — Peripheral Vision Trainer",
  "url": "https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper",
  "description": "Train peripheral vision, spatial awareness, and target acquisition. Intercept radial threats before they breach your core in this free reflex game.",
  "genre": ["Reflex Training", "Esports", "Aim Trainer", "Peripheral Vision"],
  "gamePlatform": "Web Browser",
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is peripheral vision training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peripheral vision training involves exercises designed to expand your active field of view, allowing your brain to process and react to visual stimuli occurring outside of your direct central focus."
      }
    },
    {
      "@type": "Question",
      "name": "How does the Peripheral Threat Sweeper work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You must keep your gaze anchored to a central core while identifying and intercepting threat nodes that spawn at the screen's edges and move inward, bridging the gap between visual detection and motor execution."
      }
    },
    {
      "@type": "Question",
      "name": "Why is peripheral awareness important for gamers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In esports titles like Valorant, CS2, and Apex Legends, players must keep their crosshair focused centrally while simultaneously monitoring the minimap, ammo, and flanking enemies. Strong peripheral vision reduces tunnel vision and reaction delay."
      }
    },
    {
      "@type": "Question",
      "name": "What are the different threat types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As the game difficulty adapts, you will face Standard threats (Red, linear path), Fast threats (Orange, moving 1.6x speed), and Evasive threats (Purple, wobbling and altering their trajectory)."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scale in Peripheral Threat Sweeper?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, the level rises up to Level 15. Threat movement speed accelerates from 80 px/s up to 500 px/s, spawn interval drops from 1.4s down to 0.3s, and evasive wobbling threats appear more frequently."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when I miss or allow a core breach?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Missing a threat or allowing a core breach resets your combo multiplier back to 1.0x and triggers a red flash overlay. There are no score deductions or time penalties."
      }
    },
    {
      "@type": "Question",
      "name": "How long does each session run?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each session runs for a fixed 45 seconds. The game timer counts down steadily from 45s to 0s, providing a standard, reproducible performance benchmark."
      }
    },
    {
      "@type": "Question",
      "name": "Does this game help with Valorant or CS2 aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. It trains rapid peripheral target acquisition and micro-flicks. Spotting enemy movement off-center without losing crosshair control is critical for tactical shooter success."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in Peripheral Threat Sweeper?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scoring 8,000+ points earns a Gold or Platinum grade, while reaching 17,000+ points with 90%+ accuracy places you in the Master tier."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex game free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Peripheral Threat Sweeper on SkillDrills is 100% free, ad-free, and runs entirely in your web browser with zero downloads."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Practice the Peripheral Threat Sweeper Drill",
  "description": "Step-by-step instructions to train peripheral vision and threat interception using the SkillDrills Peripheral Threat Sweeper trainer.",
  "step": [
    { "@type": "HowToStep", "name": "Hold the Center", "text": "Keep your crosshair anchored near the central core." },
    { "@type": "HowToStep", "name": "Scan the Edges", "text": "Threat nodes spawn at the perimeter and move inward toward the core." },
    { "@type": "HowToStep", "name": "Intercept Before Breach", "text": "Click each threat before it reaches the core to score and build combo." }
  ]
};

export default function PeripheralThreatSweeperPage() {
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
      <PeripheralThreatSweeperClient />
    </>
  );
}