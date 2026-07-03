import StopAndGoDashClient from './StopAndGoDashClient';

// ============================================================
// SEO RESEARCH FINDINGS — stop-and-go-dash
// PRIMARY: "smooth pursuit eye exercises" — high-intent clinical & athletic search
//          "reaction speed training" ~880/mo US, KD ~30%
// SECONDARY / LSI:
//   "visual tracking exercises"       ~1,300/mo, KD ~30%
//   "aim tracking practice"           ~150/mo,   KD ~10%
//   "saccadic eye movement test"      ~150/mo,   KD ~22%
//   "dynamic visual acuity exercises" ~90/mo,    KD ~15%
//   "esports vision training"         ~250/mo,   KD ~12%
// PAA targets: "What are smooth pursuit eye exercises?", "How do you improve visual tracking?",
//   "Can you train eye tracking online?", "What is the difference between smooth pursuit and saccades?"
// Key entities: stop and go dash, ease-out dash, foveal tracking, visual pursuit,
//   gaze stabilization, retinal slip, neural pathway, choice reaction time
// ============================================================

export const metadata = {
  title: 'Stop and Go Dash - Smooth Pursuit Eye Exercises | SkillDrills',
  description: 'Practice smooth pursuit eye exercises with the free Stop and Go Dash training drill. Improve your visual scanning, foveal tracking, and hand-eye reaction speed online against dynamic targets. Free, no download needed.',
  keywords: [
    // Primary / Head terms
    'smooth pursuit eye exercises', 'reaction speed training', 'stop and go dash',
    // Secondary / LSI terms
    'visual tracking exercises', 'aim tracking practice', 'esports vision training',
    'saccadic eye movement test', 'dynamic visual acuity exercises', 'foveal tracking',
    // Long-tail variants
    'how to improve visual tracking speed', 'online eye tracking exercises',
    'tactical eye tracking trainer', 'reaction speed drills online',
    // General
    'free online reaction game', 'sports vision drills free', 'low latency eye test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/stop-and-go-dash',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Stop and Go Dash - Smooth Pursuit Eye Exercises | SkillDrills',
    description: 'Practice smooth pursuit eye exercises with the free Stop and Go Dash training drill. Improve your visual scanning, foveal tracking, and hand-eye reaction speed.',
    url: 'https://skilldrills.online/drills/reaction-speed/stop-and-go-dash',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Stop and Go Dash - Smooth Pursuit Eye Exercises | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stop and Go Dash - Smooth Pursuit Eye Exercises',
    description: 'Track a target that rests in position and executes rapid ease-out dashes. Free browser-based smooth pursuit eye exercises.',
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
    { "@type": "ListItem", "position": 4, "name": "Stop and Go Dash", "item": "https://skilldrills.online/drills/reaction-speed/stop-and-go-dash" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Stop and Go Dash — Smooth Pursuit Eye Exercises | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/stop-and-go-dash",
  "description": "Track a target that rests in position and executes rapid ease-out dashes to random locations to train foveal pursuit, gaze stabilization, and visual reaction speed.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Smooth Pursuit Eye Exercises, Visual Scanning, Dynamic Target Tracking, Focus Agility, Hand-Eye Click Timing"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train with Stop and Go Dash",
  "description": "Improve your foveal tracking and visual re-acquisition speed against targets executing rapid ease-out dashes.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure and Begin",
      "text": "Open the Stop and Go Dash drill page. Select your visual preferences and color options, and click Begin Drill to spawn the target."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Focus on the stationary target",
      "text": "The target will rest in position briefly. Keep your eyes centered on its core and prepare for sudden acceleration."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Track the ease-out dash",
      "text": "When the target dashes rapidly to a random location, sweep your eyes smoothly to track its path and re-acquire focus instantly."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Hold click to score",
      "text": "Align your cursor and click the target core before the session survival countdown timer expires to level up."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Stop and Go Dash Drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stop and Go Dash is a browser-based reaction training game where you track a target that rests in place and executes rapid, unpredictable dashes. It trains visual pursuit, foveal re-acquisition, and hand-eye click timing."
      }
    },
    {
      "@type": "Question",
      "name": "What are smooth pursuit eye exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit eye exercises are drills that train the eyes to follow a moving target continuously and smoothly without lagging behind or making jumpy adjustments. They help improve ocular muscle control and tracking accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill help with eye tracking agility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By combining resting phases with sudden, high-speed ease-out dashes, it forces the eyes to transition rapidly from static fixation to active smooth pursuit, conditioning your visual processing speed and ocular reflexes."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between smooth pursuit and saccadic eye movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit is the continuous tracking of a single moving target. Saccades are rapid, jumpy ballistic shifts of the eyes when jumping between different static targets (like looking between two separate points)."
      }
    },
    {
      "@type": "Question",
      "name": "How does this training benefit competitive gamers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In competitive games, enemies frequently shift between walking, stopping, and running/dashing (e.g. counter-strafing or slide-canceling). This drill trains your eyes to track these sudden speed transitions cleanly and keep your crosshair aligned."
      }
    },
    {
      "@type": "Question",
      "name": "Who can benefit from practicing smooth pursuit exercises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Esports players, traditional athletes in sports requiring tracking (like baseball or tennis), readers looking to scan fields of text faster, and individuals performing visual therapy or rehabilitation exercises."
      }
    },
    {
      "@type": "Question",
      "name": "How do I fix shaky tracking aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shaky aim is caused by muscle tension in your arm or excessively high sensitivity. Keep your grip relaxed, lower your mouse sensitivity (typically between 30-45 cm/360), and practice tracing targets smoothly."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor input lag affect visual tracking scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Slow refresh rate monitors (60Hz) display target positions with delay and blur, whereas high-refresh monitors (144Hz+) render movements smoothly, helping your eyes lock on instantly."
      }
    },
    {
      "@type": "Question",
      "name": "Is this eye exercise training free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all eye exercises and reaction training games on SkillDrills are 100% free with no signups, downloads, or pop-up ads required. You can play directly in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Can I play this dynamic tracking game on mobile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Stop and Go Dash is fully touch-optimized for mobile viewports, allowing you to trace and track targets directly on your tablet or smartphone screen."
      }
    }
  ]
};

export default function StopAndGoDashPage() {
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
      <StopAndGoDashClient />
    </>
  );
}
