import ReactionSimulatorWrapper from './ReactionSimulatorWrapper';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-simulator
// PRIMARY: "reaction simulator" ~1,300/mo US, KD ~28% (Easy-Medium)
//          "reflex training game" ~880/mo US, KD ~30% (Easy-Medium)
// SECONDARY / LSI:
//   "reflex game online"              ~1,000/mo, KD ~25%
//   "hand eye coordination games"     ~2,900/mo, KD ~48%
//   "reaction speed test"             ~6,600/mo, KD ~45%
//   "reflex simulator"                ~390/mo,   KD ~15%
// ============================================================

export const metadata = {
  title: 'Reaction Simulator - Free Reflex Training Game Online',
  description: 'Free online Reflex Training Game (Reaction Simulator). Intercept falling targets, train vertical tracking, and sharpen hand-eye coordination.',
  keywords: [
    'reaction simulator', 'reflex training game', 'reflex game online',
    'reflex simulator', 'hand eye coordination games', 'reaction speed test',
    'fps reaction time test', 'reflex training app', 'speed reflex training',
    'falling target reaction game', 'online reflex games free',
    'how to test reflexes at home', 'do reflex training games work',
    'vertical tracking aim trainer', 'mouse speed click trainer',
    'free aim trainer browser', 'gaming eye coordination drill', 'low latency reflex test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reaction-simulator',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reaction Simulator - Free Reflex Training Game Online | SkillDrills',
    description: 'Play this free online Reflex Training Game (Reaction Simulator). Intercept accelerating falling targets before they escape, train vertical visual tracking, and improve your hand-eye coordination.',
    url: 'https://skilldrills.online/drills/reaction-speed/reaction-simulator',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Simulator - Free Reflex Training Game',
    description: 'Intercept falling targets and train vertical tracking. Free browser-based reflex simulator with no downloads.',
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
    { "@type": "ListItem", "position": 4, "name": "Reaction Simulator", "item": "https://skilldrills.online/drills/reaction-speed/reaction-simulator" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reaction Simulator — Free Reflex Training Game Online | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reaction-simulator",
  "description": "Train reaction speed, vertical visual tracking, and hand-eye coordination. A free device-adaptive falling-target reflex simulator for mobile and desktop.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Speed, Vertical Visual Tracking, Hand-Eye Coordination, Rapid Interception, Reflex Timing"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Reaction Simulator Trainer",
  "description": "Isolates and trains vertical ocular tracking, hand-eye synchronization, rapid interception, and motor response time under high-speed falling waves.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support."
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Vertical Reflexes & Reaction Speed",
  "description": "Step-by-step instructions on improving your vertical tracking, interception speed, and hand-eye coordination.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Simulator",
      "text": "Press Start Drill to initialize the Reaction Simulator in full screen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track Falling Targets",
      "text": "Keep your eyes active along the top edge and visually track incoming falling spheres as they accelerate downwards."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Click",
      "text": "Click or tap the falling targets immediately before they escape the lower boundary. Be precise to prevent time deductions."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Intercept Speed Bursts",
      "text": "At higher levels, prioritize micro-targets and speed bursts to keep your hit rate up and survive the countdown."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Reaction Simulator (Reflex Interception Drill)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is an online reflex training game where targets descend vertically at accelerating speeds, testing your vertical tracking and interception reflexes."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on a reaction time test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Average human reaction time to visual stimuli is 200-250ms. Elite esports players achieve reaction speeds under 180ms."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train your reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Dedicated reflex training improves neuromuscular pathway efficiency, reducing visual processing delay and motor execution latency."
      }
    },
    {
      "@type": "Question",
      "name": "Does gaming improve reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research shows competitive gamers process visual information faster and execute choice motor responses with higher precision than non-gamers."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my reaction time slow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slow reaction time can be caused by muscle fatigue, high input latency, low refresh rates, lack of sleep, or cognitive distraction."
      }
    },
    {
      "@type": "Question",
      "name": "How do you test your reflexes by yourself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using online reflex simulators like SkillDrills provides precise millisecond telemetry to measure and track your reaction speed."
      }
    },
    {
      "@type": "Question",
      "name": "What is vertical tracking in FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vertical tracking is the ability to keep your crosshair centered on targets falling, jumping, or moving along Y-axis paths."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex training game free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect reflex scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Higher refresh rate monitors (144Hz, 240Hz, 360Hz) display target movement with lower input lag and smoother motion."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice reflex training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daily 5-10 minute warmup sessions improve neuromuscular speed, consistency, and hand-eye coordination over time."
      }
    },
    {
      "@type": "Question",
      "name": "What games benefit from vertical reflex training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fast vertical shooters like Apex Legends, Overwatch 2, Fortnite, Halo, and Quake benefit heavily from vertical tracking agility."
      }
    },
    {
      "@type": "Question",
      "name": "Can traditional athletes use this for vision training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Sports vision research shows vertical reflex training enhances spatial interception skills for volleyball, basketball, and tennis."
      }
    },
    {
      "@type": "Question",
      "name": "Should I click targets high up or wait until they drop?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clicking targets high up gives you more margin for error and builds fast-twitch reaction speed before targets reach the danger line."
      }
    },
    {
      "@type": "Question",
      "name": "Does this drill support touchscreens?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! It features generous touch hitpads and automatic orientation warnings for mobile devices."
      }
    },
    {
      "@type": "Question",
      "name": "How does adaptive level difficulty work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, falling speeds accelerate, targets shrink in size, and spawn intervals shorten."
      }
    }
  ]
};

export default function ReactionSimulatorPage() {
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
      <ReactionSimulatorWrapper />
    </>
  );
}
