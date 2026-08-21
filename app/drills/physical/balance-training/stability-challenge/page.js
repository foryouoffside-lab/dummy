import StabilityChallengeClient from './StabilityChallengeClient';

// ============================================================
// SEO RESEARCH FINDINGS — stability-challenge
// PRIMARY: "balance test online"        ~2,400/mo, KD ~22%
//          "cursor stability challenge" ~880/mo,   KD ~16%
// SECONDARY / LSI:
//   "force vector counteraction"       ~310/mo,   KD ~12%
//   "postural equilibrium trainer"     ~240/mo,   KD ~11%
//   "wind resistance tracking drill"   ~180/mo,   KD ~10%
// PAA targets: "What is the Stability Challenge exercise?", "How do wind force mechanics work?",
//   "How does difficulty scale in Stability Challenge?", "What happens when my crosshair gets pushed out of the safe zone?",
//   "Is Stability Challenge free to play?"
// ============================================================

export const metadata = {
  title: 'Stability Challenge - Free Online Balance Trainer',
  description: 'Master force vector counteraction and postural equilibrium in Stability Challenge. Resist dynamic wind forces in this free online balance test.',
  keywords: [
    // Primary / Head terms
    'balance test online', 'cursor stability challenge',
    // Secondary / LSI terms
    'force vector counteraction', 'postural equilibrium trainer', 'wind resistance tracking drill',
    'free online balance test', 'motor control balance game', 'central crosshair stabilization',
    // Long-tail variants
    'free online cursor stability challenge game', 'improve force vector counteraction gaming',
    'wind resistance tracking accuracy drill', 'esports postural equilibrium trainer'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Stability Challenge — Free Resistance Tracking & Balance Trainer | SkillDrills',
    description: 'Master force vector counteraction and postural equilibrium in Stability Challenge. Resist dynamic wind forces in this free online balance test.',
    url: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stability Challenge — Free Resistance Tracking & Balance Trainer | SkillDrills',
    description: 'Master force vector counteraction and postural equilibrium in Stability Challenge. Resist dynamic wind forces in this free online balance test.',
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
    { "@type": "ListItem", "position": 3, "name": "Balance Training", "item": "https://skilldrills.online/drills/physical/balance-training" },
    { "@type": "ListItem", "position": 4, "name": "Stability Challenge", "item": "https://skilldrills.online/drills/physical/balance-training/stability-challenge" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Stability Challenge — Free Resistance Tracking & Balance Trainer",
  "url": "https://skilldrills.online/drills/physical/balance-training/stability-challenge",
  "description": "Free balance test and resistance tracking game. Resist dynamic wind force vectors pushing your crosshair away from the central safe ring.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Force Vector Counteraction, Postural Equilibrium, Resistance Tracking, Central Crosshair Stabilization, Micro-Adjustments"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Stability Challenge — Free Resistance Tracking & Balance Trainer",
  "url": "https://skilldrills.online/drills/physical/balance-training/stability-challenge",
  "description": "Master force vector counteraction and postural equilibrium in Stability Challenge. Resist dynamic wind forces in this free online balance test.",
  "genre": ["Reflex Training", "Esports", "Aim Trainer", "Reaction Speed"],
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
      "name": "What is the Stability Challenge exercise?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stability Challenge is a resistance tracking and postural stability drill. Players resist dynamic wind force vectors to keep their crosshair inside a central safe zone."
      }
    },
    {
      "@type": "Question",
      "name": "How do wind force mechanics work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dynamic wind vectors continuously push your crosshair away from the center. Apply smooth counter-directional mouse input to remain inside the central safe ring."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scale in Stability Challenge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, the level rises up to Level 15. Safe zone radiuses shrink from 45px down to 20px, and wind force pushes accelerate from 250 up to 850 force strength."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when my crosshair gets pushed out of the safe zone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Drifting outside the safe zone breaks your stability lock, resets your combo multiplier back to 1.0x, and triggers a red flash overlay. There are no score deductions or time penalties."
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
      "name": "Does Stability Challenge help with FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. It trains micro-stabilization and force counteraction needed for recoil control and precise crosshair placement in CS2, Valorant, and Apex Legends."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in Stability Challenge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scoring 9,500+ points earns an A grade or higher, while reaching 15,300+ points places you in the elite S+ tier. Grades are calculated purely from score against a 17,000-point elite benchmark."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need special hardware to practice this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No special hardware is required. Any standard computer mouse with 1:1 raw input support works ideally with our pointer lock system."
      }
    },
    {
      "@type": "Question",
      "name": "Is Stability Challenge free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Stability Challenge on SkillDrills is 100% free, ad-free, and runs entirely in your web browser with zero downloads."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Practicing 5 to 10 minutes daily is recommended for optimal neuromuscular adaptation and micro-correction stabilization."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Practice the Stability Challenge Drill",
  "description": "Step-by-step instructions to train force vector counteraction and postural equilibrium using the SkillDrills Stability Challenge trainer.",
  "step": [
    { "@type": "HowToStep", "name": "Center Your Crosshair", "text": "Start with your crosshair inside the central safe ring." },
    { "@type": "HowToStep", "name": "Counter the Wind Force", "text": "Apply smooth counter-directional mouse input as dynamic wind vectors push you off-center." },
    { "@type": "HowToStep", "name": "Hold the Safe Zone", "text": "Stay inside the safe ring as long as possible to build combo and score." }
  ]
};

export default function StabilityChallengePage() {
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
      <StabilityChallengeClient />
    </>
  );
}