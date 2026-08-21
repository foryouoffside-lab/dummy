import MotorSequencingClient from './MotorSequencingClient';

// ============================================================
// SEO RESEARCH FINDINGS — agility-ladder
// PRIMARY: "motor sequencing training" ~1,400/mo, KD ~20%
//          "agility ladder drills"       ~9,900/mo, KD ~30%
// SECONDARY / LSI:
//   "hand eye coordination game"        ~2,900/mo, KD ~25%
//   "bilateral coordination drill"      ~380/mo,   KD ~14%
//   "rhythmic mouse control"            ~210/mo,   KD ~10%
// PAA targets: "What is the Motor Sequencing Agility Ladder drill?", "How do ladder mechanics work?",
//   "How does difficulty scale in the Agility Ladder drill?", "What happens when I miss a rung or fail a ladder?",
//   "Is this Agility Ladder drill free to play?"
// ============================================================

export const metadata = {
  title: 'Motor Sequencing — Free Agility Ladder Drills Online',
  description: 'Free agility ladder drill online. Train bilateral motor sequencing, footwork timing and hand-eye coordination with progressive step patterns.',
  keywords: [
    // Primary / Head terms
    'motor sequencing training', 'agility ladder drills',
    // Secondary / LSI terms
    'hand eye coordination game', 'bilateral coordination drill', 'rhythmic mouse control',
    'free online agility ladder game', 'sequential movement drill', 'rhythmic metronome coordination game',
    // Long-tail variants
    'free online visual motor sequencing game', 'improve hand eye coordination online browser',
    'esports motor skills sequencing drill', 'agility ladder online test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Motor Sequencing — Free Agility Ladder Drills Online | SkillDrills',
    description: 'Free agility ladder drill online. Train bilateral motor sequencing, footwork timing and hand-eye coordination with progressive step patterns.',
    url: 'https://skilldrills.online/drills/physical/fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motor Sequencing — Free Agility Ladder Drills Online | SkillDrills',
    description: 'Free agility ladder drill online. Train bilateral motor sequencing, footwork timing and hand-eye coordination with progressive step patterns.',
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
  "@type": "SoftwareApplication",
  "name": "Motor Sequencing — Free Agility Ladder Drills Online",
  "url": "https://skilldrills.online/drills/physical/fitness/agility-ladder",
  "description": "Free motor sequencing training game. Hit scrolling rungs in a strict Left-Right alternating pattern.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Motor Sequencing, Bilateral Coordination, Hand-Eye Coordination, Rhythmic Mouse Control, Spatial Tracking"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Motor Sequencing — Free Agility Ladder Drills Online",
  "url": "https://skilldrills.online/drills/physical/fitness/agility-ladder",
  "description": "Master bilateral motor sequencing and hand-eye coordination in Motor Sequencing (Agility Ladder). Practice alternating ladder sweeps in this free reflex training game.",
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
      "name": "What is the Motor Sequencing Agility Ladder drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Motor Sequencing is a bilateral hand-eye coordination drill inspired by athletic agility ladders. Players sweep their cursor left and right across descending ladder rungs in exact numerical sequence."
      }
    },
    {
      "@type": "Question",
      "name": "How do ladder mechanics work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ladders scroll down the screen. Each ladder contains 4 rungs alternating left and right. Move your crosshair over each rung in sequence (1 -> 2 -> 3 -> 4) to complete the ladder."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scale in the Agility Ladder drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, the level rises up to Level 15. Scroll speed accelerates from 150 px/s up to 750 px/s, and rung hitboxes shrink."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when I miss a rung or fail a ladder?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Missing a rung or letting a ladder scroll off the screen before completing all 4 rungs resets your combo multiplier back to 1.0x and triggers a red flash overlay. There are no score deductions or time penalties."
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
      "name": "Does this drill help with FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Sweeping across rungs in rhythm conditions your arm and wrist muscles for smooth crosshair placement and rhythm control when clearing angles."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in Motor Sequencing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scoring 8,000+ points earns a Gold or Platinum grade, while reaching 17,000+ points with 90%+ accuracy places you in the Master tier."
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
      "name": "Is this Agility Ladder drill free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Motor Sequencing on SkillDrills is 100% free, ad-free, and runs entirely in your web browser with zero downloads."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Practicing 5 to 10 minutes daily is recommended for optimal neuromuscular adaptation and consistent bilateral rhythm control."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Practice the Motor Sequencing Agility Ladder Drill",
  "description": "Step-by-step instructions to train bilateral motor sequencing using the SkillDrills Motor Sequencing trainer.",
  "step": [
    { "@type": "HowToStep", "name": "Watch the Scrolling Ladder", "text": "A ladder with 4 alternating rungs scrolls down the screen." },
    { "@type": "HowToStep", "name": "Sweep Left-Right-Left-Right", "text": "Move your crosshair over each rung in exact numerical sequence." },
    { "@type": "HowToStep", "name": "Clear Before It Scrolls Off", "text": "Complete all 4 rungs before the ladder scrolls past to score and keep your combo." }
  ]
};

export default function AgilityLadderPage() {
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
      <MotorSequencingClient />
    </>
  );
}