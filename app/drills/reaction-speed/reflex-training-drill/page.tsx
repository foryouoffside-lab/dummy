import ReflexTrainingDrillWrapper from './ReflexTrainingDrillWrapper';

// ============================================================
// SEO RESEARCH FINDINGS — reflex-training-drill
// PRIMARY: "reflex training drill" — high-intent search, low KD
//          "target acquisition trainer" — exact mechanical concept match
// SECONDARY / LSI:
//   "reflex training game"            ~880/mo,   KD ~30%
//   "reflex game online"              ~1,000/mo, KD ~25%
//   "hand eye coordination gaming"    ~590/mo,   KD ~18%
//   "aim reflex trainer"              ~150/mo,   KD ~10%
//   "sports vision training"          ~720/mo,   KD ~26%
//   "fast reflex training"            ~120/mo,   KD ~12%
//   "visual tracking drill"           ~110/mo,   KD ~9%
// PAA targets: "What is a reflex training drill?", "Can you train your reflexes online?",
//   "How does target acquisition improve gaming?", "What is the difference between reflexes and reactions?",
//   "Is this reflex trainer free?"
// Key entities: target acquisition, visual scanning, hand-eye alignment,
//   reflex response, cognitive concentration, foveal pursuit, motor cortex
// ============================================================

export const metadata = {
  title: 'Reflex Training Drill - Target Acquisition Reflex Game | SkillDrills',
  description: 'Improve your target acquisition and click response with this free Reflex Training Drill. Track and hit fast-dashing targets, calibrate your hand-eye coordination, and reduce your reaction latency online. Free, no download needed.',
  keywords: [
    // Primary / Head terms
    'reflex training drill', 'target acquisition trainer', 'aim reflex trainer',
    // Secondary / LSI terms
    'reflex training game', 'reflex game online', 'hand eye coordination gaming',
    'fast reflex training', 'visual tracking drill', 'esports reaction training',
    // Long-tail variants
    'how to improve target acquisition aim', 'online reflex games free',
    'tactical target acquisition trainer', 'dashing target tracking game',
    // General
    'free aim trainer browser', 'gaming hand eye coordination test', 'low latency reaction tool'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reflex-training-drill',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reflex Training Drill - Target Acquisition Reflex Game | SkillDrills',
    description: 'Improve your target acquisition and click response with this free Reflex Training Drill. Track and hit fast-dashing targets and reduce your reaction latency.',
    url: 'https://skilldrills.online/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Reflex Training Drill - Target Acquisition Reflex Game | SkillDrills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reflex Training Drill - Target Acquisition Reflex Game',
    description: 'Improve your target acquisition and click response. Free browser-based reflex training drill with no downloads.',
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
    { "@type": "ListItem", "position": 4, "name": "Reflex Training Drill", "item": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reflex Training Drill — Target Acquisition Reflex Game | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill",
  "description": "Train reaction speed, reflexes, foveal scanning, and visual target acquisition. A free device-adaptive reaction simulator for mobile, tablet, and desktop.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reflex Training, Target Acquisition, Visual Scanning, Hand-Eye Coordination, Reflex Response"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Reflex Training Drill (Target Acquisition Trainer)",
  "description": "Isolates and trains target tracking and motor reaction speed, visual pursuit coordination, and hand-eye alignment.",
  "applicationCategory": "EducationalGame",
  "operatingSystem": "Web Browser",
  "isAccessibleForFree": true,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Target Acquisition and Reflexes",
  "description": "Improve target acquisition reaction speed and motor reflexes against sudden dashing visual targets.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Trial",
      "text": "Hit the Begin Reflex Trial button to enter the interactive viewport. Adjust target color presets to your liking."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track Target Dash Movement",
      "text": "Keep your eyes on the target core as it moves along its ease-out dash trajectory."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Click",
      "text": "Click or tap the target core before its lifespan duration limit expires and triggers a timeout."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Build Streak Combos",
      "text": "Maintain high accuracy and consecutive hits to level up and challenge higher target speeds, which prevents time deductions."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Reflex Training Drill (Target Acquisition Trainer)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Reflex Training Drill is an online visual reaction game designed to improve target acquisition. By presenting unpredictable target dashes, it trains your brain to quickly translate visual coordinate changes into precise clicking actions."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train your reflexes online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While your genetic nerve speed is mostly fixed, online reaction tests and training drills condition your visual processing, decision speed, and motor cortex pathway efficiency. Repetitive practice reduces your visual-motor response latency by up to 20%."
      }
    },
    {
      "@type": "Question",
      "name": "How does target acquisition affect gaming aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Target acquisition is the phase where you identify a target, snap your crosshair onto it, and fire. Fast target acquisition reduces the time you take to hit enemies, giving you a massive advantage in tactical shooters where milliseconds decide fights."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a reflex and a reaction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A reflex is an automatic, involuntary neural response processed directly by the spinal cord (such as flinching). A reaction is a conscious, voluntary response requiring the brain to process a stimulus (like seeing a target) and execute a motor action (like clicking)."
      }
    },
    {
      "@type": "Question",
      "name": "Does this aim trainer help in FPS games like Valorant and CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. In games like Valorant and CS2, targets often move quickly from behind cover or execute rapid dashes. Training your target acquisition helps you react to these sudden movement changes and secure clean hits."
      }
    },
    {
      "@type": "Question",
      "name": "How is reaction speed measured in this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction speed is measured in milliseconds (ms) from the moment the target spawns or relocates to the moment you successfully click or tap the target center."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice reflex training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend practicing for 5 to 10 minutes daily. Short, consistent daily sessions serve as a great reflex warmup and are highly effective for reinforcing neuroplasticity."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect target acquisition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Higher refresh rate monitors (144Hz, 240Hz, or 360Hz) show target movements much smoother with reduced motion blur. This allows your visual cortex to scan and track target borders much easier."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex training game free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all reaction and aim training games on SkillDrills are 100% free with no signups, downloads, or pop-up ads required. You can play directly in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Can I play this reflex drill on mobile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The simulator is fully touch-optimized for smartphones and tablets. It dynamically scales to fit your screen size and supports high-accuracy stylus and touch inputs."
      }
    }
  ]
};

export default function ReflexTrainingDrillPage() {
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
      <ReflexTrainingDrillWrapper />
    </>
  );
}

