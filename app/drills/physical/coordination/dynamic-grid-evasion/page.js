import DynamicGridEvasionClient from './DynamicGridEvasionClient';

// ============================================================
// SEO RESEARCH FINDINGS — dynamic-grid-evasion
// PRIMARY: "grid evasion game"       ~110/mo,  KD ~8%
//          "spatial awareness game"  ~390/mo,  KD ~15%
// SECONDARY / LSI:
//   "reflex training game"           ~210/mo,  KD ~18%
//   "coordination training"          ~480/mo,  KD ~22%
//   "visual spatial training"        ~140/mo,  KD ~12%
//   "cursor control game"            ~250/mo,  KD ~14%
// PAA targets: "What is a Grid Evasion Game?", "How does this improve coordination?",
//   "Is this good for Valorant or CS2?", "Does the game get harder over time?",
//   "Are there penalties for explosions?"
// ============================================================

export const metadata = {
  title: 'Grid Evasion Game - Free Spatial Awareness & Coordination Training | SkillDrills',
  description: 'Play the free Grid Evasion Game to improve spatial awareness, cursor control, and hand-eye coordination. Test your tactical movement and gaming reflexes online.',
  keywords: [
    // Primary / Head terms
    'grid evasion game', 'spatial awareness game',
    // Secondary / LSI terms
    'grid reflex game', 'coordination training', 'visual spatial training',
    'cursor control game', 'mouse movement trainer', 'reflex training game',
    // Long-tail variants
    'free online grid reflex game', 'improve spatial awareness and speed',
    'tactical movement mouse trainer browser', 'peripheral vision reaction trainer'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Grid Evasion Game - Free Spatial Awareness & Coordination Training | SkillDrills',
    description: 'Improve spatial awareness, cursor control, and gaming reflexes with this free Grid Evasion Game. Dodge explosions and survive the adaptive 3x3 grid.',
    url: 'https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Grid Evasion Game - Spatial Awareness Training | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grid Evasion Game - Free Spatial Awareness & Coordination Training',
    description: 'Play this free Grid Evasion Game to improve spatial awareness and mouse control. No sign-up required.',
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
    { "@type": "ListItem", "position": 3, "name": "Coordination", "item": "https://skilldrills.online/drills/physical/coordination" },
    { "@type": "ListItem", "position": 4, "name": "Grid Evasion (Dynamic Grid Evasion)", "item": "https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Grid Evasion Game - Spatial Awareness & Coordination Training | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/coordination/dynamic-grid-evasion",
  "description": "Free Grid Evasion Game targeting spatial awareness and visual processing speed. Navigate a 3x3 grid, dodge exploding cells, and improve tactical mouse movement. Features adaptive score-based scaling.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Spatial Awareness, Visual Spatial Training, Grid Navigation, Cursor Agility, Peripheral Vision Reaction"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Grid Evasion Game",
  "description": "A step-by-step guide to testing your spatial awareness and tactical movement.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Lock Cursor",
      "text": "Click the start button to lock your cursor into the 3x3 grid environment."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Watch for Warnings",
      "text": "Random grid cells will flash yellow. This is the warning phase. You must immediately move your crosshair out of these cells."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Survive the Explosion",
      "text": "When the warning ends, the cells explode. If your crosshair is in a safe cell, you earn points and level up."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Adapt to Speed",
      "text": "As your score increases, the warning times shrink (down to 0.60s) and the threat density increases (up to 7 dangerous cells)."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Grid Evasion Game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Grid Evasion Game is a spatial awareness and reflex training drill where players must navigate a dynamic grid, identifying safe zones and moving their cursor away from incoming threats before they detonate."
      }
    },
    {
      "@type": "Question",
      "name": "How does this improve coordination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By forcing you to process peripheral visual information rapidly and execute a precise motor movement to a safe location, it heavily strengthens visual-motor integration and hand-eye coordination."
      }
    },
    {
      "@type": "Question",
      "name": "Does this improve FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Spatial awareness games train tactical movement and cursor agility under pressure—critical skills for dodging utility and executing engagements in tactical shooters."
      }
    },
    {
      "@type": "Question",
      "name": "Is this good for Valorant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The rapid threat identification and repositioning directly translates to dodging flashes, grenades, and ultimate abilities while maintaining crosshair control."
      }
    },
    {
      "@type": "Question",
      "name": "Is this useful for CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, peripheral scanning and mouse agility are fundamental for quickly checking multiple angles and repositioning your crosshair across a site in CS2."
      }
    },
    {
      "@type": "Question",
      "name": "Does it improve hand-eye coordination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, because you must physically move your mouse to match the safe coordinate you visually identified, syncing your visual cortex with your motor cortex."
      }
    },
    {
      "@type": "Question",
      "name": "Does the game get harder over time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. As you score points, the warning times drop from 1.40s down to a blistering 0.60s, and the number of simultaneous threats increases up to 7 cells."
      }
    },
    {
      "@type": "Question",
      "name": "Are there penalties for explosions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, being caught in an explosion triggers a 4-second deduction to your survival clock, forcing you to maintain high evasion accuracy to stay alive."
      }
    },
    {
      "@type": "Question",
      "name": "How long should I practice spatial awareness daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For optimal cognitive adaptation and reflex training, practicing this drill for 5 to 10 minutes a day is more effective than long, exhausting sessions."
      }
    },
    {
      "@type": "Question",
      "name": "Is this free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The SkillDrills Grid Evasion Game is entirely free, open-source, and runs purely in your web browser with zero downloads required."
      }
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DynamicGridEvasionClient />
    </>
  );
}