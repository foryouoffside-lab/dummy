import ComplexPatternClient from './ComplexPatternClient';

// ============================================================
// SEO RESEARCH FINDINGS — complex-pattern
// PRIMARY: "pattern memory game"     ~1,000/mo, KD ~22%
//          "visual memory training"   ~140/mo,   KD ~10%
// SECONDARY / LSI:
//   "pattern memory test"             ~170/mo,   KD ~14%
//   "visual memory game"             ~590/mo,   KD ~25%
//   "spatial memory game"            ~110/mo,   KD ~8%
//   "working memory training"        ~320/mo,   KD ~24%
// PAA targets: "What is a pattern memory game?", "How does a pattern memory game improve working memory?",
//   "Is this a visual memory test?", "Can this game improve spatial memory?",
//   "Is this memory drawing game free?"
// ============================================================

export const metadata = {
  title: 'Pattern Memory Game - Free Visual & Spatial Memory Training',
  description: 'Free pattern memory game online. Memorize increasingly complex paths and redraw them from memory to train visual memory and spatial recall.',
  keywords: [
    // Primary / Head terms
    'pattern memory game', 'visual memory training',
    // Secondary / LSI terms
    'pattern memory test', 'visual memory game', 'spatial memory game',
    'working memory training', 'pattern recognition game', 'memory drawing game',
    // Long-tail variants
    'free online visual memory test', 'trace path memory training online',
    'improve spatial memory exercises browser', 'visual motor integration coordination game'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/coordination/complex-pattern',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Pattern Memory Game - Free Visual & Spatial Memory Training | SkillDrills',
    description: 'Play a free Pattern Memory Game online. Memorize complex paths, redraw them from memory, and improve visual and spatial memory.',
    url: 'https://skilldrills.online/drills/physical/coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Pattern Memory Game - Visual Memory Training | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pattern Memory Game - Free Visual & Spatial Memory Training',
    description: 'Memorize increasingly complex paths and redraw them from memory to improve hand-eye coordination. No sign-up required.',
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
    { "@type": "ListItem", "position": 4, "name": "Pattern Memory Game (Complex Pattern)", "item": "https://skilldrills.online/drills/physical/coordination/complex-pattern" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pattern Memory Game - Visual & Spatial Memory Training | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/coordination/complex-pattern",
  "description": "Free pattern memory game and coordination training exercise. Memorize path geometries, draw from memory. Adaptive complexity features tighter patterns, faster flash times, and shape-based scoring.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Pattern Memory, Visual Working Memory, Spatial Recall, Path Tracing Accuracy, Visual-Motor Integration"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Pattern Memory Game",
  "description": "A guide to testing your spatial working memory and motor coordination.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Memorize the Path",
      "text": "Watch the green vector path flash on the screen. Study its angles, nodes, and length carefully."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Trace from Memory",
      "text": "Once the path disappears, hold your click to draw the exact shape starting at the Cyan Node and ending at the Magenta Node."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Adapt to Difficulty",
      "text": "As you score points, the game levels up. The patterns will become denser, the flash times shorter, and the accuracy threshold stricter."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Beat the Clock",
      "text": "You have exactly 60 seconds. Reproduce patterns correctly to build your combo multiplier and maximize your score."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Complex Pattern Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Complex Pattern Pro is a physical coordination & visual memory drill testing spatial geometry retention and mouse tracing accuracy. Players memorize multi-node patterns flashed briefly on canvas and reproduce them accurately."
      }
    },
    {
      "@type": "Question",
      "name": "How do pattern tracing controls work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "During the drawing phase, click and drag from the cyan start node through all waypoints to the magenta end node. Releasing mouse click submits your drawn trajectory for similarity evaluation."
      }
    },
    {
      "@type": "Question",
      "name": "Does this drill improve gaming performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Retaining spatial geometry and executing fine cursor sweeps trains the visual cortex and motor precision needed for recoil control patterns, crosshair placement, and rapid gesture commands."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scaling work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As you score points, your level rises up to Level 15. Node count increases from 3 up to 8, memorization time drops from 2.0s to 0.6s, and required similarity accuracy increases."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score in Complex Pattern Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scoring 8,000+ points earns a Gold or Platinum grade, while reaching 17,000+ points with 85%+ average accuracy places you in the Master tier."
      }
    }
  ]
};

export default function ComplexPatternPage() {
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
      <ComplexPatternClient />
    </>
  );
}