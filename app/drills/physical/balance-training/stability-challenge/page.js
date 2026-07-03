import StabilityChallengeClient from './StabilityChallengeClient';

// ============================================================
// SEO RESEARCH FINDINGS — stability-challenge
// PRIMARY: "balance test online"   ~390/mo,  KD ~15%
//          "cursor stability test" ~110/mo,  KD ~8%
// SECONDARY / LSI:
//   "mouse control game"           ~320/mo,  KD ~24%
//   "hand eye coordination game"   ~2,900/mo, KD ~48%
//   "fine motor skills training"   ~140/mo,  KD ~12%
//   "precision mouse control"      ~90/mo,   KD ~6%
// PAA targets: "What is a cursor stability test?", "Does this improve mouse control for gaming?",
//   "Can this improve my FPS aim?", "How does the adaptive difficulty work?",
//   "Is this balance game free to play?"
// ============================================================

export const metadata = {
  title: 'Balance Test Online - Free Cursor Stability & Mouse Control Game | SkillDrills',
  description: 'Take the free online Balance Test and improve cursor stability, mouse precision, hand-eye coordination, and motor control. Resist dynamic wind forces in this 60-second challenge.',
  keywords: [
    // Primary / Head terms
    'balance test online', 'cursor stability test',
    // Secondary / LSI terms
    'mouse control game', 'mouse accuracy test', 'cursor control training',
    'hand eye coordination game', 'precision mouse control', 'motor coordination training',
    // Long-tail variants
    'free online cursor stability challenge', 'improve mouse precision and speed',
    'best mouse control games browser', 'wind resistance aim simulator online'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Balance Test Online - Free Cursor Stability & Mouse Control Game | SkillDrills',
    description: 'Improve cursor stability, mouse precision, and hand-eye coordination with this free online Balance Test. Resist dynamic wind forces for 60 seconds.',
    url: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Balance Test Online - Cursor Stability Challenge | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Balance Test Online - Free Cursor Stability & Mouse Control Game',
    description: 'Take the free online Balance Test and improve cursor stability and mouse precision. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
    { "@type": "ListItem", "position": 3, "name": "Stability Challenge (Balance Test)", "item": "https://skilldrills.online/drills/physical/balance-training/stability-challenge" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Balance Test Online - Cursor Stability Challenge | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/balance-training/stability-challenge",
  "description": "Free online balance test and cursor stability training game. Resist dynamic wind forces pushing your cursor off-center. Improve mouse control and hand-eye coordination over a 60-second trial.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Cursor Stability, Mouse Control, Motor Accuracy, Reaction Control, Fine Motor Control"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Online Balance Test",
  "description": "A guide to testing your mouse control and cursor stability in the browser.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Lock Cursor",
      "text": "Click the start button to lock your cursor into the raw-input tracking environment."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Resist the Wind",
      "text": "Anticipate the dynamic wind forces and physically resist them to keep your crosshair inside the center safe zone."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Build Combos",
      "text": "For every full second inside the center, you earn +10 points. Longer continuous holds build a massive combo multiplier."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Survive the Clock",
      "text": "The timer strictly counts down from 60 seconds. Survive the continuously scaling difficulty to achieve your high score."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a cursor stability test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cursor stability test is an interactive digital assessment that measures your ability to maintain precise mouse control against chaotic, simulated forces, testing your visual-motor pathways."
      }
    },
    {
      "@type": "Question",
      "name": "Does this improve mouse control for gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, by demanding smooth resistance over jittery corrections, it actively trains the fine motor precision required for high-level FPS mouse control."
      }
    },
    {
      "@type": "Question",
      "name": "Can this improve my FPS aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. It isolates the micro-adjustments needed for precise tracking and recoil control, which translates directly to maintaining crosshair placement in games like Valorant and Apex Legends."
      }
    },
    {
      "@type": "Question",
      "name": "How does the adaptive difficulty work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every time you score 100 points, your Level increases. Higher levels introduce stronger wind acceleration, violent momentum shifts, random gusts, and intense turbulence."
      }
    },
    {
      "@type": "Question",
      "name": "How is my balance score calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You earn +10 points for every full second perfectly centered. Staying stable continuously builds a combo multiplier up to 2.0x. Leaving the safe zone breaks the combo."
      }
    },
    {
      "@type": "Question",
      "name": "Is this hand eye coordination game suitable for beginners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The drill starts at Level 1 with minimal wind drag, allowing beginners to easily build combos before the chaotic momentum naturally scales up."
      }
    },
    {
      "@type": "Question",
      "name": "How do professional gamers train tracking accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pros use dedicated aim trainers and browser drills to isolate their tracking mechanics, practicing smooth, non-jittery mouse paths to eliminate overcorrection and build a consistent visual-motor link."
      }
    },
    {
      "@type": "Question",
      "name": "What is fine motor control in gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fine motor control is the ability to make millimeter-perfect adjustments with your mouse hand without tensing your wrist or over-flicking past your target."
      }
    },
    {
      "@type": "Question",
      "name": "How long should I practice mouse stability daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For optimal cognitive adaptation, practicing this drill for 5 to 10 minutes a day is more effective than occasional hour-long sessions."
      }
    },
    {
      "@type": "Question",
      "name": "Is this balance game free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The SkillDrills Balance Test is entirely free, open-source, and runs purely in your web browser with zero downloads required."
      }
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StabilityChallengeClient />
    </>
  );
}