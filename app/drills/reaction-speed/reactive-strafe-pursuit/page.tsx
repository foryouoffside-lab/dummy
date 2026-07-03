import ReactiveStrafePursuitClient from './ReactiveStrafePursuitClient';

// ============================================================
// SEO RESEARCH FINDINGS — reactive-strafe-pursuit
// PRIMARY: "reactive tracking aim trainer" — high-intent gamer search, low KD
//          "reactive tracking scenarios" ~180/mo US, KD ~16% (Low)
// SECONDARY / LSI:
//   "strafe tracking aim"             ~200/mo,   KD ~18%
//   "aim trainer tracking"            ~550/mo,   KD ~27%
//   "smooth pursuit eye training"     ~1,300/mo, KD ~30% (clinical overlap)
//   "visual tracking drill"           ~110/mo,   KD ~9%
//   "how to practice strafe tracking"  ~110/mo,   KD ~15%
// PAA targets: "What is reactive tracking?", "Why is my tracking aim shaky?",
//   "Should you look at the crosshair or the target when tracking?",
//   "How do you practice strafe tracking?", "Is reactive tracking better than predictive tracking?"
// Key entities: horizontal gaze pursuit, ocular muscle agility, ADAD strafing,
//   foveal pursuit, motor cortex, neural delay, latency compensation
// ============================================================

export const metadata = {
  title: 'Reactive Tracking Aim Trainer - Strafe Pursuit Drill | SkillDrills',
  description: 'Train your target tracking with this free Reactive Tracking Aim Trainer. Stabilize horizontal gaze pursuit against erratic, human-like ADAD strafes, improve target re-acquisition speed, and warm up your aim.',
  keywords: [
    // Primary / Head terms
    'reactive tracking aim trainer', 'reactive tracking scenarios', 'strafe tracking aim',
    // Secondary / LSI terms
    'aim trainer tracking', 'smooth pursuit eye training', 'visual tracking drill',
    'how to practice strafe tracking', 'horizontal gaze pursuit drill', 'foveal tracking',
    // Long-tail variants
    'apex legends reactive tracking routine', 'improve target re-acquisition speed',
    'how to track strafing targets', 'fix shaky aim tracking',
    // General
    'free online aim trainer', 'esports vision training', 'gaming reflex test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reactive-strafe-pursuit',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reactive Tracking Aim Trainer - Strafe Pursuit Drill | SkillDrills',
    description: 'Train your target tracking with this free Reactive Tracking Aim Trainer. Stabilize horizontal gaze pursuit against erratic, human-like ADAD strafes.',
    url: 'https://skilldrills.online/drills/reaction-speed/reactive-strafe-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reactive Tracking Aim Trainer — Strafe Pursuit Drill | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reactive Tracking Aim Trainer - Strafe Pursuit Drill',
    description: 'Stabilize horizontal gaze pursuit against erratic ADAD strafes. Free browser-based reactive tracking aim trainer with no downloads.',
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
    { "@type": "ListItem", "position": 4, "name": "Reactive Strafe Pursuit", "item": "https://skilldrills.online/drills/reaction-speed/reactive-strafe-pursuit" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reactive Tracking Aim Trainer — Strafe Pursuit Drill | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reactive-strafe-pursuit",
  "description": "Stabilize horizontal gaze pursuit against erratic, human-like target strafes to improve target re-acquisition speed and mouse tracking control.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reactive Aim Tracking, Smooth Pursuit, Saccadic Re-acquisition, Horizontal Gaze Stability, Ocular Muscle Agility"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Reactive Tracking with the Strafe Pursuit Drill",
  "description": "Improve your mouse tracking smoothness and direction-change reactivity against horizontal target sweeps.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure and Start",
      "text": "Open the Reactive Strafe Pursuit drill. Set your color preferences and click Begin Drill to spawn the target."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Focus on Target Center",
      "text": "Keep your eyes locked on the moving target's core. Avoid staring at your crosshair; let your motor reflexes naturally align the cursor."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Track Erratic Strafes",
      "text": "Hold down your click (or tap the screen) and follow the target as it sweeps horizontally. Relax your hand to maintain smooth tracking."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Re-acquire Instantly on Direction Change",
      "text": "When the target suddenly switches directions (strafes back), execute a rapid, smooth correction to re-acquire foveal focus and cursor alignment."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Reactive Strafe Pursuit drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reactive Strafe Pursuit is an online aim tracking scenario designed to stabilize horizontal gaze pursuit against erratic, human-like target strafes. It trains eye coordination, smooth tracking, and quick re-acquisition on direction changes."
      }
    },
    {
      "@type": "Question",
      "name": "What is reactive tracking in FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reactive tracking is the ability to follow a target that is moving unpredictably and changing directions rapidly (such as an enemy ADAD strafing or dodging). Unlike predictive tracking, it requires you to react immediately to visual direction changes rather than guessing."
      }
    },
    {
      "@type": "Question",
      "name": "Why is reactive tracking harder than predictive tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Predictive tracking relies on following a target moving at a constant speed or along a predictable arc, allowing you to anticipate its position. Reactive tracking forces your brain to register sudden speed or direction changes, route that visual data to your motor cortex, and execute a correction, which introduces neural latency."
      }
    },
    {
      "@type": "Question",
      "name": "Should I look at my crosshair or the target when tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Always look at the target. Focusing on the target allows your brain to process its exact movements and direction changes. Your peripheral vision will align your crosshair with the target automatically. Looking at the crosshair causes visual delay and jerky movements."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill simulate human movement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The target changes direction erratically at random intervals with acceleration offsets, replicating how competitive FPS players jiggle and strafe during close-quarters gunfights."
      }
    },
    {
      "@type": "Question",
      "name": "Does this aim trainer help with games like Apex Legends and Overwatch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Apex Legends and Overwatch feature high time-to-kill (TTK) and rapid character movement. Reactive tracking is the most critical mechanical skill needed to win gunfights in these games."
      }
    },
    {
      "@type": "Question",
      "name": "How can I fix shaky aim when tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shaky tracking is caused by high muscle tension in your hand/arm or excessively high mouse sensitivity. Try to consciously relax your grip, use a larger mousepad, and lower your sensitivity (e.g. to 30-45 cm/360) to damp out micro-jitters."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best sensitivity for reactive tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A moderate-to-low sensitivity range is optimal for reactive tracking (typically 30 cm to 45 cm per 360-degree rotation). This offers a balance of stability for smooth tracking and speed for fast direction corrections."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reactive tracking aim trainer free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required. You can play directly in your web browser."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect reactive tracking accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, deeply. High-refresh-rate monitors (144Hz, 240Hz, or 360Hz) update target positions much faster and reduce motion blur. This allows your visual cortex to spot direction changes and initiate motor corrections 10 to 30 milliseconds faster than on a standard 60Hz screen."
      }
    }
  ]
};

export default function ReactiveStrafePursuitPage() {
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
      <ReactiveStrafePursuitClient />
    </>
  );
}
