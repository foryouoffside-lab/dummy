import DynamicGridEvasionClient from './DynamicGridEvasionClient';

// ============================================================
// SEO RESEARCH FINDINGS — dynamic-grid-evasion
// PRIMARY: "grid evasion game"       ~1,100/mo, KD ~18%
//          "spatial awareness game"  ~3,900/mo, KD ~25%
// SECONDARY / LSI:
//   "reflex training game"           ~2,100/mo, KD ~22%
//   "coordination training"          ~4,800/mo, KD ~28%
//   "visual spatial training"        ~1,400/mo, KD ~18%
// PAA targets: "What is the Dynamic Grid Evasion exercise?", "How do grid evasion mechanics work?",
//   "How does difficulty scale in Dynamic Grid Evasion?", "What happens when I am caught in an explosion?",
//   "Is Dynamic Grid Evasion free to play?"
// ============================================================

export const metadata = {
  title: 'Dynamic Grid Evasion — Free Spatial Hazard Avoidance & Reflex Trainer | SkillDrills',
  description: 'Dodge dynamic hazard zones and master rapid spatial scanning in Dynamic Grid Evasion. Practice 3x3 grid evasion in this free reflex training game.',
  keywords: [
    // Primary / Head terms
    'grid evasion game', 'spatial awareness game',
    // Secondary / LSI terms
    'reflex training game', 'coordination training', 'visual spatial training',
    'free online grid evasion game', 'spatial hazard avoidance drill', '3x3 grid reflex game',
    // Long-tail variants
    'free online visual spatial evasion game', 'improve spatial awareness and speed',
    'tactical movement mouse trainer browser', 'peripheral vision hazard evasion trainer'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Dynamic Grid Evasion — Free Spatial Hazard Avoidance & Reflex Trainer | SkillDrills',
    description: 'Dodge dynamic hazard zones and master rapid spatial scanning in Dynamic Grid Evasion. Practice 3x3 grid evasion in this free reflex training game.',
    url: 'https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dynamic Grid Evasion — Free Spatial Hazard Avoidance & Reflex Trainer | SkillDrills',
    description: 'Dodge dynamic hazard zones and master rapid spatial scanning in Dynamic Grid Evasion. Practice 3x3 grid evasion in this free reflex training game.',
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
    { "@type": "ListItem", "position": 3, "name": "Coordination", "item": "https://skilldrills.online/drills/physical/coordination" },
    { "@type": "ListItem", "position": 4, "name": "Dynamic Grid Evasion", "item": "https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Dynamic Grid Evasion — Free Spatial Hazard Avoidance & Reflex Trainer",
  "url": "https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion",
  "description": "Free spatial awareness and grid evasion game. Navigate a 3x3 grid, dodge exploding hazard cells, and improve tactical mouse movement.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Spatial Awareness, Visual Spatial Training, Grid Navigation, Rapid Peripheral Scanning, Hazard Evasion"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Dynamic Grid Evasion — Free Spatial Hazard Avoidance & Reflex Trainer",
  "url": "https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion",
  "description": "Dodge dynamic hazard zones and master rapid spatial scanning in Dynamic Grid Evasion. Practice 3x3 grid evasion in this free reflex training game.",
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
      "name": "What is the Dynamic Grid Evasion exercise?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dynamic Grid Evasion is a spatial hazard avoidance drill. Players move their crosshair across a 3x3 grid to dodge active threat cells before explosions trigger."
      }
    },
    {
      "@type": "Question",
      "name": "How do grid evasion mechanics work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Danger cells pulse with an amber warning outline. You must move your crosshair into a safe, non-highlighted cell before the warning timer expires and red explosions fill the danger cells."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scale in Dynamic Grid Evasion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, the level rises up to Level 15. Warning durations shrink from 1.4s down to 0.45s, and the number of active danger cells increases from 3 to 7."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when I am caught in an explosion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Being in a danger cell during an explosion resets your combo multiplier back to 1.0x and triggers a red flash overlay. There are no score deductions or time penalties."
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
        "text": "Yes. It trains rapid peripheral scanning and instant flick-evasion needed to dodge AOE abilities, grenades, and mollies in games like Valorant and Apex Legends."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in Dynamic Grid Evasion?",
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
      "name": "Is Dynamic Grid Evasion free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Dynamic Grid Evasion on SkillDrills is 100% free, ad-free, and runs entirely in your web browser with zero downloads."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Practicing 5 to 10 minutes daily is recommended for optimal neuromuscular adaptation and rapid spatial scanning improvement."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Practice the Dynamic Grid Evasion Drill",
  "description": "Step-by-step instructions to train spatial hazard avoidance using the SkillDrills Dynamic Grid Evasion trainer.",
  "step": [
    { "@type": "HowToStep", "name": "Watch the Grid", "text": "Cells on a 3x3 grid pulse with an amber danger warning outline." },
    { "@type": "HowToStep", "name": "Identify the Safe Cell", "text": "Spot a non-highlighted cell before the warning timer runs out." },
    { "@type": "HowToStep", "name": "Evade the Explosion", "text": "Move your crosshair into a safe cell before red explosions fill the danger cells to score." }
  ]
};

export default function DynamicGridEvasionPage() {
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
      <DynamicGridEvasionClient />
    </>
  );
}