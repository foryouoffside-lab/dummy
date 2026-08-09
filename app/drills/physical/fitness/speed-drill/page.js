import SpeedDrillClient from './SpeedDrillClient';

// ============================================================
// SEO RESEARCH FINDINGS — speed-drill
// PRIMARY: "speed drill game"         ~2,900/mo, KD ~25%
//          "rapid tapping trainer"    ~410/mo,   KD ~14%
// SECONDARY / LSI:
//   "reaction time test"              ~33,100/mo, KD ~35%
//   "click speed test"                ~27,100/mo, KD ~28%
//   "target acquisition speed"        ~640/mo,   KD ~18%
// PAA targets: "What is the Speed Drill reflex exercise?", "How do target mechanics work?",
//   "How does difficulty scale in Speed Drill?", "What happens when I miss or let a target expire?",
//   "Is Speed Drill free to play?"
// ============================================================

export const metadata = {
  title: 'Speed Drill — Free Target Acquisition & Rapid Tapping Trainer | SkillDrills',
  description: 'Test target acquisition speed and rapid tapping in Speed Drill. Click moving, shrinking targets in this free reflex training game.',
  keywords: [
    // Primary / Head terms
    'speed drill game', 'rapid tapping trainer',
    // Secondary / LSI terms
    'reaction time test', 'click speed test', 'target acquisition speed',
    'free reflex speed test', 'rapid target tracking drill', 'fps movement velocity trainer',
    // Long-tail variants
    'free online visual speed drill', 'improve target acquisition speed gaming',
    'shrinking target speed reaction game', 'esports rapid tapping click trainer'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/speed-drill',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Speed Drill — Free Target Acquisition & Rapid Tapping Trainer | SkillDrills',
    description: 'Test target acquisition speed and rapid tapping in Speed Drill. Click moving, shrinking targets in this free reflex training game.',
    url: 'https://skilldrills.online/drills/physical/fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speed Drill — Free Target Acquisition & Rapid Tapping Trainer | SkillDrills',
    description: 'Test target acquisition speed and rapid tapping in Speed Drill. Click moving, shrinking targets in this free reflex training game.',
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
    { "@type": "ListItem", "position": 4, "name": "Speed Drill", "item": "https://skilldrills.online/drills/physical/fitness/speed-drill" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Speed Drill — Free Target Acquisition & Rapid Tapping Trainer",
  "url": "https://skilldrills.online/drills/physical/fitness/speed-drill",
  "description": "Free reaction time test and click speed game. Click shrinking, dynamically moving targets before they disappear.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Target Acquisition, Click Speed, Rapid Tapping, Visual Tracking, Neuromuscular Coordination"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Speed Drill — Free Target Acquisition & Rapid Tapping Trainer",
  "url": "https://skilldrills.online/drills/physical/fitness/speed-drill",
  "description": "Test target acquisition speed and rapid tapping in Speed Drill. Click moving, shrinking targets in this free reflex training game.",
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
      "name": "What is the Speed Drill reflex exercise?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Speed Drill is a high-velocity target acquisition exercise that challenges players to click moving, shrinking targets before they vanish. It measures raw reaction speed, click timing, and tracking precision."
      }
    },
    {
      "@type": "Question",
      "name": "How do target mechanics work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yellow targets spawn with random initial velocities and bounce off canvas borders while shrinking over time. You must acquire and click each target before its radius reaches zero."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scale in Speed Drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, the level rises up to Level 15. Initial target sizes shrink, target movement speed accelerates up to 3.5x, and target shrinking rates increase."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when I miss or let a target expire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Missing a target or letting a target shrink to zero resets your combo multiplier back to 1.0x and triggers a red flash overlay. There are no score deductions or time penalties."
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
      "name": "Does Speed Drill improve gaming performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Rapid target acquisition and micro-burst clicking translate directly to faster time-to-kill (TTK) and sharper flick timing in FPS games like Valorant, CS2, and Apex Legends."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in Speed Drill?",
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
      "name": "Is Speed Drill free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Speed Drill on SkillDrills is 100% free, ad-free, and runs entirely in your web browser with zero downloads."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Practicing 5 to 10 minutes daily is recommended for optimal neuromuscular adaptation and consistent click timing improvement."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Practice the Speed Drill",
  "description": "Step-by-step instructions to train target acquisition speed using the SkillDrills Speed Drill trainer.",
  "step": [
    { "@type": "HowToStep", "name": "Spot the Target", "text": "A yellow target spawns and moves with a bouncing velocity across the canvas." },
    { "@type": "HowToStep", "name": "Track Its Shrinking Radius", "text": "The target continuously shrinks in size as it moves." },
    { "@type": "HowToStep", "name": "Click Before It Vanishes", "text": "Acquire and click the target before its radius reaches zero to score." }
  ]
};

export default function SpeedDrillPage() {
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
      <SpeedDrillClient />
    </>
  );
}