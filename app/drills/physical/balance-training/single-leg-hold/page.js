import TrackingStabilityClient from './TrackingStabilityClient';

// ============================================================
// SEO RESEARCH FINDINGS — single-leg-hold
// PRIMARY: "hand eye coordination training" ~720/mo, KD ~26%
//          "tracking stability test"        ~150/mo, KD ~8%
// SECONDARY / LSI:
//   "hand eye coordination game"     ~2,900/mo, KD ~48%
//   "cursor tracking game"           ~200/mo,   KD ~11%
//   "mouse tracking game"             ~500/mo,   KD ~25%
//   "tracking accuracy test"         ~110/mo,   KD ~9%
// PAA targets: "What is hand eye coordination training?", "How can I improve hand eye coordination?",
//   "Does cursor tracking improve gaming performance?", "What is a tracking stability test?",
//   "Is this hand eye coordination game free?"
// ============================================================

export const metadata = {
  title: 'Hand Eye Coordination Training - Tracking Stability Test | SkillDrills',
  description: 'Improve hand eye coordination, tracking stability, and motor control with this free cursor tracking game. Follow a moving target, build streaks, and test your tracking accuracy online.',
  keywords: [
    // Primary / Head terms
    'hand eye coordination training', 'tracking stability test',
    // Secondary / LSI terms
    'hand eye coordination game', 'cursor tracking game', 'mouse tracking game',
    'tracking accuracy test', 'fine motor control game', 'visual motor coordination',
    // Long-tail variants
    'free hand eye coordination game online', 'aim tracking speed trainer',
    'cursor accuracy test online', 'improve hand eye coordination online'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/balance-training/single-leg-hold',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Hand Eye Coordination Training - Tracking Stability Test | SkillDrills',
    description: 'Improve hand eye coordination, tracking stability, and motor control with this free cursor tracking game. Test your tracking accuracy online.',
    url: 'https://skilldrills.online/drills/physical/balance-training/single-leg-hold',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Hand Eye Coordination Training - Tracking Stability Test | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hand Eye Coordination Training - Tracking Stability Test',
    description: 'Improve hand eye coordination with this free cursor tracking game. Follow a moving target and build streaks. No sign-up required.',
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
    { "@type": "ListItem", "position": 3, "name": "Single Leg Hold (Tracking Stability)", "item": "https://skilldrills.online/drills/physical/balance-training/single-leg-hold" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Hand Eye Coordination Training Game - Tracking Stability Test | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/balance-training/single-leg-hold",
  "description": "Free cursor tracking game to test and improve hand eye coordination and motor control. Features a dynamic survival loop, score-based difficulty scaling, and motor telemetry.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Hand Eye Coordination, Tracking Stability, Motor Control, Smooth Pursuit, Cursor Precision"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Tracking Stability Test",
  "description": "A step-by-step guide to testing your tracking stability using the free cursor tracking game.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Begin the Drill",
      "text": "Click the start button to lock your cursor into the game environment with raw input."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track the Target",
      "text": "Keep your crosshair within 60px of the moving anchor point to maintain a green link."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Survive the Clock",
      "text": "Stay connected to earn +1 point and +1s time every second. Falling off deducts time. Survive as long as possible up to the 120s cap."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Adapt to Speed",
      "text": "Every 10 points you score, the target speed and randomness will increase automatically."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is hand eye coordination training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hand eye coordination training involves specific drills, like cursor tracking games, that challenge your brain to rapidly process visual shifts and translate them into precise, fine motor hand movements."
      }
    },
    {
      "@type": "Question",
      "name": "How can I improve hand eye coordination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can improve hand eye coordination by practicing continuous pursuit tracking stability tests online. Focusing on smooth cursor control rather than rapid clicks builds stronger neuromuscular pathways."
      }
    },
    {
      "@type": "Question",
      "name": "Does cursor tracking improve gaming performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, cursor tracking games directly train 'smooth pursuit', which is the mechanical skill required to track moving targets, control weapon recoil, and duel strafing opponents in FPS games."
      }
    },
    {
      "@type": "Question",
      "name": "Can tracking games improve mouse control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Tracking drills punish jittery, tense mouse movements and reward smooth, deliberate tracing, which directly improves fine motor mouse control."
      }
    },
    {
      "@type": "Question",
      "name": "What is a tracking stability test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A tracking stability test measures your ability to maintain a consistent visual link with a randomly moving target. It records accuracy, tracking time, and penalty frequency to evaluate your fine motor control."
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
      "name": "How does the survival loop work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You start with 30 seconds. Every second you stay successfully locked on the target, you gain +1 second of time. Every second you fall off, you lose -1 second. If the timer hits zero, the game ends."
      }
    },
    {
      "@type": "Question",
      "name": "Why does the target get faster?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The game features dynamic speed scaling. Every time you score 10 points, the target's base velocity and chaotic randomness increase, pushing your motor control limits further."
      }
    },
    {
      "@type": "Question",
      "name": "Is this hand eye coordination game free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, this tracking trainer is completely free, open-source, and runs directly in your browser with zero downloads required."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score for the tracking stability test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score above 40 points is considered Intermediate, while 80+ indicates Advanced tracking control. 120+ is Elite level."
      }
    }
  ]
};

export default function TrackingStabilityPage() {
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
      <TrackingStabilityClient />
    </>
  );
}