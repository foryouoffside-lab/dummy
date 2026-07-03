import PeripheralThreatSweeperClient from './PeripheralThreatSweeperClient';

// ============================================================
// SEO RESEARCH FINDINGS — peripheral-threat-sweeper
// PRIMARY: "peripheral vision training"  ~12,100/mo, KD ~25%
//          "reflex sweeper game"         ~110/mo,    KD ~12%
// SECONDARY / LSI:
//   "spatial awareness game"             ~590/mo,    KD ~16%
//   "peripheral reaction test"           ~260/mo,    KD ~14%
//   "visual motor integration"           ~4,400/mo,  KD ~38%
// PAA targets: "What is peripheral vision training?", "How does the Peripheral Threat Sweeper work?",
//   "Why is peripheral awareness important for gamers?", "What are the different threat types?",
//   "Is this reflex game free to play?"
// ============================================================

export const metadata = {
  title: 'Peripheral Vision Training - Free Reflex Sweeper Game | SkillDrills',
  description: 'Train peripheral vision, spatial awareness, and reflex reaction times. Defend the central core from radial threats in this free visual-motor training game.',
  keywords: [
    // Primary / Head terms
    'peripheral vision training', 'reflex sweeper game',
    // Secondary / LSI terms
    'spatial awareness game', 'peripheral reaction test', 'visual motor integration',
    'tactical awareness drill', 'gaming vision trainer', 'esports field of view',
    // Long-tail variants
    'free online visual-motor training', 'improve peripheral awareness gaming',
    'defend core radial threat reaction game', 'esports target scanning trainer'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Peripheral Vision Training - Free Reflex Sweeper Game | SkillDrills',
    description: 'Expand your active field of view and reflex speed. Intercept radial threats before they breach your core in this adaptive visual training game.',
    url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Peripheral Vision Training - Reflex Sweeper Game | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peripheral Vision Training - Free Reflex Sweeper Game | SkillDrills',
    description: 'Train peripheral vision and reflex reaction times. Defend the core from dynamic radial threats. No sign-up required.',
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
    { "@type": "ListItem", "position": 3, "name": "Reflex Training", "item": "https://skilldrills.online/drills/physical/reflex-training" },
    { "@type": "ListItem", "position": 4, "name": "Peripheral Vision Training (Threat Sweeper)", "item": "https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Peripheral Vision Training - Free Reflex Sweeper Game | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper",
  "description": "Improve peripheral vision speed and target scanning. Intercept radial targets before they reach the central shield. Features adaptive threat types, combo multipliers, and an intense 60-second survival loop.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Peripheral Vision, Spatial Awareness, Threat Interception, Visual Scanning, Eye-Hand Coordination"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Peripheral Threat Sweeper",
  "description": "A step-by-step guide to testing your peripheral awareness and visual-motor interception.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Hold Center Focus",
      "text": "Lock your cursor into the game and keep your physical eyes focused on the central cyan shield core."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Scan Peripherally",
      "text": "Threat nodes will spawn at the outer edges of your vision and move inward. Use your peripheral vision to detect them without moving your eyes from the center."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Intercept Threats",
      "text": "Flick your mouse to click and destroy the incoming threats before they breach the core. Successful intercepts grant +1.0s to your clock."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Survive the Adaptive Swarm",
      "text": "Misclicks and core breaches drain your time violently. As you level up, the engine will spawn faster threats and erratic 'wobbling' enemies to test your precision."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is peripheral vision training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peripheral vision training involves exercises designed to expand your active field of view, allowing your brain to process and react to visual stimuli occurring outside of your direct central focus."
      }
    },
    {
      "@type": "Question",
      "name": "How does the Peripheral Threat Sweeper work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You must keep your gaze anchored to a central core while identifying and intercepting threat nodes that spawn at the screen's edges and move inward, bridging the gap between visual detection and motor execution."
      }
    },
    {
      "@type": "Question",
      "name": "Why is peripheral awareness important for gamers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In esports titles like Valorant, CS2, and Apex Legends, players must keep their crosshair focused centrally while simultaneously monitoring the minimap, ammo, and flanking enemies. Strong peripheral vision reduces tunnel vision and reaction delay."
      }
    },
    {
      "@type": "Question",
      "name": "What are the different threat types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As the game difficulty adapts, you will face Standard threats (linear path), Fast threats (Orange, moving 1.5x speed), and Evasive threats (Purple, wobbling and altering their trajectory)."
      }
    },
    {
      "@type": "Question",
      "name": "Why do I lose time for clicking empty space?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To prevent 'spam clicking'. The drill trains precise visual-motor integration. If you fire without acquiring a valid target, the engine deducts 1.5 seconds from your survival clock to enforce accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "What happens during a core breach?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If a threat hits the central shield, it violently drains -3.5s from your master survival clock and immediately resets your combo multiplier back to 1.0x."
      }
    },
    {
      "@type": "Question",
      "name": "How does the Combo System work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consecutive intercepts without a core breach or false click build your multiplier. Reach a 40+ streak to unlock the maximum 3.0x score multiplier and rapidly scale the levels."
      }
    },
    {
      "@type": "Question",
      "name": "Does the difficulty scale automatically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every 150 points you score triggers a Level Up. The engine will accelerate target speeds, decrease the spawn intervals, and introduce harder threat variations."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex game free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The SkillDrills Peripheral Sweeper is entirely free, open-source, and runs purely in your web browser with zero downloads required."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score for the Peripheral Threat Sweeper?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score of 1000+ is Platinum tier. 2000+ indicates Diamond-level peripheral acquisition, and 3500+ with 90% accuracy places you in the Elite Master tier."
      }
    }
  ]
};

export default function PeripheralThreatSweeperPage() {
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
      <PeripheralThreatSweeperClient />
    </>
  );
}