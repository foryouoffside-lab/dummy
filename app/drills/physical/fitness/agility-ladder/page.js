import MotorSequencingClient from './MotorSequencingClient';

// ============================================================
// SEO RESEARCH FINDINGS — agility-ladder
// PRIMARY: "motor sequencing training" ~170/mo, KD ~14%
//          "agility ladder drills"     ~8,100/mo, KD ~35% (broad interest, high difficulty)
// SECONDARY / LSI:
//   "hand eye coordination game"       ~1,600/mo, KD ~25%
//   "bilateral coordination training"   ~140/mo,  KD ~8%
//   "rhythmic timing coordination"     ~90/mo,   KD ~11%
// PAA targets: "What is motor sequencing training?", "How does this hand eye coordination game work?",
//   "Why is rhythm important for mouse control?", "Is this a good warmup for Valorant or CS2?",
//   "What is a good score for this motor skills training?"
// ============================================================

export const metadata = {
  title: 'Motor Sequencing Training - Free Agility Ladder Drills Online | SkillDrills',
  description: 'Play this free Motor Sequencing Training game online. Practice rapid alternating agility ladder drills to improve hand-eye coordination, bilateral motor control, and rhythmic mouse precision.',
  keywords: [
    // Primary / Head terms
    'motor sequencing training', 'agility ladder drills',
    // Secondary / LSI terms
    'hand eye coordination game', 'bilateral coordination training', 'coordination training',
    'sequential movement training', 'rhythmic timing coordination', 'mouse control training',
    // Long-tail variants
    'free online agility ladder drills', 'rhythmic metronome coordination game',
    'improve hand eye coordination online browser', 'esports motor skills sequencing drill'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Motor Sequencing Training - Free Agility Ladder Drills Online | SkillDrills',
    description: 'Improve your mouse precision, rhythm, and hand-eye coordination with this free Motor Sequencing game. 60-second strict adaptive challenge.',
    url: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Motor Sequencing Training - Agility Ladder Drills | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motor Sequencing Training - Free Agility Ladder Drills Online',
    description: 'Play this free motor sequencing game to improve bilateral coordination, rhythm, and mouse precision. No sign-up required.',
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
    { "@type": "ListItem", "position": 3, "name": "Fitness", "item": "https://skilldrills.online/drills/physical/fitness" },
    { "@type": "ListItem", "position": 4, "name": "Motor Sequencing (Agility Ladder)", "item": "https://skilldrills.online/drills/physical/fitness/agility-ladder" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Motor Sequencing Training - Agility Ladder Drills | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/fitness/agility-ladder",
  "description": "Free motor sequencing training game. Hit scrolling targets in a strict Left-Right alternating pattern. Adaptive difficulty scales speed, hitboxes, and spacing simultaneously. 60-second timed coordination challenge.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Motor Sequencing, Agility Ladder Coordination, Rhythmic Timing, Fine Motor Skills, Bilateral Integration"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Motor Sequencing Game",
  "description": "A step-by-step guide to testing your rhythmic coordination and fine motor sequencing.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Engage the Engine",
      "text": "Click the start button to lock your cursor into the raw-input vertical tracking environment."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Hit the Sequence",
      "text": "Physically move your mouse to hit the glowing green target boxes as they scroll down the screen. You must hit them in a strict Left-Right-Left-Right pattern."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Build your Combo",
      "text": "Successfully clearing full sequences builds your Combo Multiplier (up to 4.0x), massively increasing your score."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Survive the Adaptive Scaling",
      "text": "As your score increases, the speed accelerates, hitboxes shrink, and patterns become slightly unpredictable. Missing a target resets your combo, but there are no time deductions."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is motor sequencing training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Motor sequencing training is the process of practicing precise, consecutive muscle movements in a specific order. This cognitive-motor skill is essential for tasks requiring rhythm, timing, and bilateral coordination."
      }
    },
    {
      "@type": "Question",
      "name": "How does this hand eye coordination game work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The game generates alternating left/right targets that scroll down your screen. You must physically move your mouse to intercept these targets in the correct rhythmic sequence, directly training your visual-motor pathways."
      }
    },
    {
      "@type": "Question",
      "name": "Why is rhythm important for mouse control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rhythm and timing prevent you from 'over-flicking' or panicking during high-stress moments. Establishing a consistent mechanical cadence allows for smoother, more predictable fine motor adjustments."
      }
    },
    {
      "@type": "Question",
      "name": "Is this a good warmup for Valorant or CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it serves as an excellent alternative to standard aim trainers. By forcing strict left/right isolation and rhythmic pacing, it serves as a powerful primer for counter-strafing timing and crosshair placement in tactical shooters."
      }
    },
    {
      "@type": "Question",
      "name": "How does the adaptive difficulty scale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The game utilizes a multi-variable scaling engine. As your score climbs, the scroll speed increases, target hitboxes shrink, vertical spacing expands, and micro-variations (horizontal shifting) are introduced to break your rhythm."
      }
    },
    {
      "@type": "Question",
      "name": "Why are there no time penalties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is a strict 60-second challenge mode. Time penalties create frustration; instead, positive reinforcement through massive combo multipliers encourages players to push for speed and rhythm consistency simultaneously."
      }
    },
    {
      "@type": "Question",
      "name": "Does it improve fine motor coordination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. At higher levels, the target hitboxes shrink significantly, demanding precise millimeter adjustments from your wrist and fingers under intense time pressure."
      }
    },
    {
      "@type": "Question",
      "name": "What is the rhythm consistency score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At the end of the drill, the engine calculates the standard deviation between your individual mouse clicks. A higher rhythm score means you successfully internalized a steady metronome-like beat."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I miss a target?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If a target scrolls off the bottom of the screen before you hit it, your sequence breaks. The screen will flash red and your combo multiplier will reset instantly to 1.0x."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score for this motor skills training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score above 800 is Gold tier. 3000+ indicates Diamond-level sequencing control, and 5000+ with 90% accuracy places you in the Master tier."
      }
    }
  ]
};

export default function MotorSequencingPage() {
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
      <MotorSequencingClient />
    </>
  );
}