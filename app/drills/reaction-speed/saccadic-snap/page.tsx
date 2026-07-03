import SaccadicSnapClient from './SaccadicSnapClient';

// ============================================================
// SEO RESEARCH FINDINGS — saccadic-snap
// PRIMARY: "saccadic eye movement test" ~150/mo US, KD ~22% (Low-Medium)
//          "eye focus exercises" ~320/mo US, KD ~22% (Low-Medium)
// SECONDARY / LSI:
//   "visual processing speed test"    ~250/mo,   KD ~30%
//   "saccadic eye exercises"          ~480/mo,   KD ~25%
//   "foveal tracking"                 ~50/mo,    KD ~5%
//   "esports vision training"         ~250/mo,   KD ~12%
//   "aim reflex training"             ~150/mo,   KD ~10%
// PAA targets: "What is a saccadic eye movement test?", "How do you improve saccadic eye movement?",
//   "What does saccadic eye movement dysfunction look like?", "Can you train eye focus?",
//   "How does this improve reaction time?"
// Key entities: focus calibration, foveal pursuit, ballistic eye snaps, ocular agility,
//   retinal slip, target acquisition latency, cognitive sweep, prefrontal cortex
// ============================================================

export const metadata = {
  title: 'Saccadic Snap - Saccadic Eye Movement Test & Drill | SkillDrills',
  description: 'Calibrate your visual focus and test your reflexes with the free Saccadic Snap drill. Learn how to improve saccadic eye movement, practice foveal tracking, and speed up target acquisition online. Free, no download needed.',
  keywords: [
    // Primary / Head terms
    'saccadic eye movement test', 'eye focus exercises', 'saccadic snap',
    // Secondary / LSI terms
    'visual processing speed test', 'saccadic eye exercises', 'foveal tracking',
    'esports vision training', 'aim reflex training', 'focus snap calibration',
    // Long-tail variants
    'how to improve saccadic eye movement', 'cognitive eye exercises online',
    'ballistic eye movement test', 'fast target acquisition drill',
    // General
    'free online reaction game', 'sports vision training drills', 'low latency eye test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/saccadic-snap',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Saccadic Snap - Saccadic Eye Movement Test & Drill | SkillDrills',
    description: 'Calibrate your visual focus and test your reflexes with the free Saccadic Snap drill. Learn how to improve saccadic eye movement and speed up target acquisition.',
    url: 'https://skilldrills.online/drills/reaction-speed/saccadic-snap',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Saccadic Snap - Saccadic Eye Movement Test & Drill | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saccadic Snap - Saccadic Eye Movement Test',
    description: 'Calibrate focus acquisition with target points snapping randomly across the viewport. Free browser-based saccadic eye test.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
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
    { "@type": "ListItem", "position": 4, "name": "Saccadic Snap", "item": "https://skilldrills.online/drills/reaction-speed/saccadic-snap" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Saccadic Snap — Saccadic Eye Movement Test & Drill | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/saccadic-snap",
  "description": "Calibrate visual focus acquisition with target points snapping randomly across the viewport to train eye agility and click speed.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Saccadic Eye Movements, Visual Focus Calibration, Target Acquisition Speed, Eye Agility, Foveal Tracking"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calibrate Eye Focus with Saccadic Snap",
  "description": "Improve your target acquisition speed and eye movement agility against randomly snapping target points.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start the Drill",
      "text": "Open the Saccadic Snap drill. Choose your target size, select color preset, and click Begin Drill."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Locate Snapping Targets",
      "text": "Keep your head still and look for the target as it snaps randomly from one location on the screen to another."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Snap focus and click",
      "text": "The instant the target snaps, shift your gaze to align your foveal vision with the target core and click or tap it immediately."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintain speed and combo",
      "text": "Secure quick consecutive hits to increase your combo and prevent timeouts as the spawn speed increases."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Saccadic Snap drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic Snap is an interactive eye focus game where targets snap randomly to unpredictable screen coordinates. It calibrates your focus acquisition, trains ballistic eye jumps (saccades), and boosts hand-eye clicking speed."
      }
    },
    {
      "@type": "Question",
      "name": "What is a saccadic eye movement test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A saccadic eye movement test measures the velocity, accuracy, and latency of your eyes as they shift focus between targets. It is used in clinical setups to test neurological function and in sports setups to test athletic visual acuity."
      }
    },
    {
      "@type": "Question",
      "name": "What are eye focus exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eye focus exercises are targeted training routines that condition the ocular muscles to contract, relax, and track objects cleanly. They improve focus acquisition speed and reduce eye fatigue caused by prolonged screen time."
      }
    },
    {
      "@type": "Question",
      "name": "How do you improve saccadic eye movement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic eye movement is improved through targeted visual exercises like this Saccadic Snap drill. Shifting your eyes between sudden, unpredictable points forces the brain to calibrate motor commands to the eye muscles, increasing sweep accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between saccadic and smooth pursuit eye movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic movements are ballistic jumps the eyes make between static points (like jumping from one target to another). Smooth pursuit is the continuous tracking of a moving target (like tracking a flying projectile)."
      }
    },
    {
      "@type": "Question",
      "name": "How do eye focus exercises help gamers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gamers must process vast amounts of visual data — scanning the screen for enemies, looking at the UI, checking health, and adjusting crosshairs. Quick focus snap speed allows gamers to spot and lock onto targets much faster, reducing response delays."
      }
    },
    {
      "@type": "Question",
      "name": "Who should practice saccadic snap exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Competitive esports players, traditional athletes in speed sports, readers looking to improve visual scanning, and individuals doing vision training or tracking recovery exercises."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor input lag affect focus snap scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Slow monitors or high mouse latency add artificial delay between your actual muscle reaction and the click register, which lowers your recorded millisecond score."
      }
    },
    {
      "@type": "Question",
      "name": "Is this foveal tracking drill free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all eye exercises and reflex drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required. You can play directly in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Can I play this eye focus game on mobile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the drill is fully touch-optimized for smartphones and tablets. It dynamically scales to fit mobile viewports and supports high-accuracy stylus and tap inputs."
      }
    }
  ]
};

export default function SaccadicSnapPage() {
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
      <SaccadicSnapClient />
    </>
  );
}
