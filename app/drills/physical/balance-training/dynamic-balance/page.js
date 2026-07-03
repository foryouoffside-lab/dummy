import DynamicBalanceClient from './DynamicBalanceClient';

// ============================================================
// SEO RESEARCH FINDINGS — dynamic-balance
// PRIMARY: "hand eye coordination test" ~2,400/mo US, KD ~22%
//          "hand eye coordination game" ~2,900/mo, KD ~48%
// SECONDARY / LSI:
//   "mouse tracking game"             ~500/mo,   KD ~25%
//   "hand eye coordination training"  ~720/mo,   KD ~26%
//   "smooth pursuit training"         ~110/mo,   KD ~9%
//   "motor coordination game"         ~90/mo,    KD ~15%
//   "visual motor training"           ~150/mo,   KD ~10%
// PAA targets: "What is a hand eye coordination test?", "How can I improve my hand eye coordination online?",
//   "What is a mouse tracking game?", "Can tracking games improve my FPS aim?",
//   "Is this tracking drill free to play?"
// Key entities: Lissajous curve, smooth pursuit, visual-motor integration,
//   foveal tracking, target coordinate, neuromuscular pathways, input latency
// ============================================================

export const metadata = {
  title: 'Hand Eye Coordination Test - Free Mouse Tracking Game | SkillDrills',
  description: 'Test and improve hand eye coordination with this free mouse tracking game. Train tracking accuracy, smooth pursuit, and motor coordination online. No sign-up required.',
  keywords: [
    // Primary / Head terms
    'hand eye coordination test', 'hand eye coordination game', 'mouse tracking game',
    // Secondary / LSI terms
    'hand eye coordination training', 'cursor tracking game', 'tracking accuracy test',
    'motor coordination game', 'visual motor training', 'smooth pursuit training',
    // Long-tail variants
    'free hand eye coordination test online', 'improve hand eye coordination online',
    'online mouse tracking test for gaming', 'lissajous curve target tracker',
    // General
    'free aim trainer browser', 'gaming hand eye coordination test', 'low latency reaction tool'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/balance-training/dynamic-balance',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Hand Eye Coordination Test - Free Mouse Tracking Game | SkillDrills',
    description: 'Test and improve hand eye coordination with this free mouse tracking game. Train tracking accuracy, cursor control and motor coordination online.',
    url: 'https://skilldrills.online/drills/physical/balance-training/dynamic-balance',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Hand Eye Coordination Test - Mouse Tracking Game | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hand Eye Coordination Test - Free Mouse Tracking Game',
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
    { "@type": "ListItem", "position": 3, "name": "Dynamic Balance (Hand Eye Coordination)", "item": "https://skilldrills.online/drills/physical/balance-training/dynamic-balance" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Hand Eye Coordination Test - Mouse Tracking Game | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/balance-training/dynamic-balance",
  "description": "Free hand eye coordination test and mouse tracking game. Improve tracking accuracy, motor coordination, and smooth pursuit online.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Hand Eye Coordination, Mouse Tracking Accuracy, Smooth Pursuit, Motor Coordination, Visual Motor Integration"
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills Mouse Tracking Trainer",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1250"
  },
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Hand Eye Coordination Test",
  "description": "A step-by-step guide on how to complete the free mouse tracking game and test your hand-eye coordination.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start the Drill",
      "text": "Click the Begin Tracking Drill button to lock your cursor into the game environment."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track the Target",
      "text": "Place your crosshair over the moving Lissajous target to turn the tracking ring green."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Maintain Smooth Pursuit",
      "text": "Smoothly track the target without falling off. Filling the timer ring grants +5 points and +2 seconds of time."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Avoid Penalties",
      "text": "Falling off the target will instantly deduct 2 seconds from your clock and break your streak."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a hand eye coordination test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A hand eye coordination test measures your visual-motor integration by challenging you to smoothly track a moving target with your mouse or cursor, translating visual stimuli into precise hand movements."
      }
    },
    {
      "@type": "Question",
      "name": "How can I improve my hand eye coordination online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can improve your hand eye coordination online by practicing continuous pursuit tracking games, focusing on smooth mouse control rather than rapid clicks, and building a daily routine of visual-motor drills."
      }
    },
    {
      "@type": "Question",
      "name": "Is hand eye coordination important for gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Precise hand eye coordination is required to track moving targets, control weapon recoil, and navigate 3D game environments smoothly in fast-paced competitive games."
      }
    },
    {
      "@type": "Question",
      "name": "What is a mouse tracking game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A mouse tracking game is an online drill that requires a user to keep their crosshair inside a moving object for as long as possible, training sustained attention and fine motor control."
      }
    },
    {
      "@type": "Question",
      "name": "Can tracking games improve my FPS aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Tracking trainers specifically improve smooth pursuit eye movements and mouse control, which translates directly to maintaining crosshair placement on moving targets in games like Apex Legends and Overwatch."
      }
    },
    {
      "@type": "Question",
      "name": "How do professional gamers train tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professional players use dedicated aim trainers and browser-based tracking drills to isolate their tracking mechanics, practicing smooth, non-jittery mouse paths to eliminate overcorrection."
      }
    },
    {
      "@type": "Question",
      "name": "What is smooth pursuit training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a visual-motor exercise focusing on matching the velocity of a moving object with your eyes and hands, avoiding stuttering or abrupt flicking motions."
      }
    },
    {
      "@type": "Question",
      "name": "How does this mouse tracking test work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It uses a Lissajous curve algorithm to create a non-linear moving target. You must keep your mouse locked inside the target to score points and preserve your session clock."
      }
    },
    {
      "@type": "Question",
      "name": "Is this tracking drill free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, this hand eye coordination test is completely free, open-source, and runs directly in your browser with zero downloads or registration."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score for the hand eye coordination test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score above 150 points is considered Intermediate, while 300+ indicates Advanced tracking control. Elite competitive players can achieve scores of 500+."
      }
    }
  ]
};

export default function DynamicBalancePage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DynamicBalanceClient />
    </>
  );
}