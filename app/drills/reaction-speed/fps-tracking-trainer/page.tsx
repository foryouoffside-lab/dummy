import FPSTrackingTrainerWrapper from './FPSTrackingTrainerWrapper';

// ============================================================
// SEO RESEARCH FINDINGS — fps-tracking-trainer
// PRIMARY: "aim tracking trainer" ~650/mo US, KD ~28% (Moderate)
//          "fps tracking trainer" ~300/mo US, KD ~22% (Low-Moderate)
// SECONDARY / LSI:
//   "shaky aim fix"                   ~800/mo,  KD ~18%
//   "aim trainer tracking"            ~550/mo,  KD ~27%
//   "apex tracking routine"           ~600/mo,  KD ~26%
//   "how to track aim"                ~350/mo,  KD ~32%
//   "best tracking aim trainer"       ~250/mo,  KD ~24%
//   "reactive tracking scenarios"     ~180/mo,  KD ~16%
//   "smoothness routine aim"          ~150/mo,  KD ~15%
// ============================================================

export const metadata = {
  title: 'FPS Tracking Trainer - Smooth Aim & Strafe Practice | SkillDrills',
  description: 'Train smooth aim and strafe tracking with this free FPS Tracking Trainer. Fix shaky aim, practice reactive tracking scenarios, and improve your target tracking for Apex Legends, Valorant, and CS2. Free online, no download needed.',
  keywords: [
    'fps tracking trainer', 'aim tracking trainer', 'best tracking aim trainer',
    'strafe tracking aim', 'aim trainer tracking', 'shaky aim fix',
    'how to track aim', 'reactive tracking scenarios', 'smoothness routine aim',
    'how to improve tracking aim', 'why is my tracking aim shaky',
    'how to make aim tracking smoother', 'apex legends tracking routine',
    'strafe tracking drills for fps', 'online mouse tracking trainer',
    'free aim trainer browser', 'gaming reflex test', 'hand eye coordination gaming'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'FPS Tracking Trainer - Smooth Aim & Strafe Practice | SkillDrills',
    description: 'Train smooth aim and strafe tracking with this free FPS Tracking Trainer. Fix shaky aim, practice reactive tracking scenarios, and improve your target tracking.',
    url: 'https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FPS Tracking Trainer - Smooth Aim & Strafe Practice',
    description: 'Fix shaky aim and practice reactive target tracking. Free, browser-based FPS tracking trainer with no downloads.',
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
    { "@type": "ListItem", "position": 4, "name": "FPS Tracking Trainer", "item": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FPS Tracking Trainer — Smooth Aim & Strafe Practice | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer",
  "description": "Stabilize horizontal gaze pursuit against erratic, human-like target strafes to improve reflex response and tracking accuracy.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Aim Tracking, Smooth Pursuit, Reactive Mouse Control, Saccadic Re-acquisition, Hand-Eye Coordination"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Improve Tracking Aim",
  "description": "Improve your mouse tracking smoothness and reactivity against erratic horizontal strafing targets.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure sensitivity and start",
      "text": "Open the FPS Tracking Trainer page. Set your sensitivity parameters if applicable, and hit Begin Drill to launch the target space."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Look at the target core",
      "text": "Keep your focus strictly centered on the target circle itself rather than staring at your crosshair. Let your peripheral vision align the crosshair while your central vision tracks movement."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Follow target movements smoothly",
      "text": "Hold down your mouse button (or press spacebar/screen tap) and keep your cursor centered on the target. Relax your hand and arm to minimize muscle jitter. Track the target as it changes directions."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "React, don't predict",
      "text": "Do not try to guess when the target will change direction. Wait for the visual cue of direction reversal and execute a smooth motor correction rather than flicking erratically."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is FPS tracking training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPS tracking training exercises your eyes and hands to keep your crosshair centered on targets moving along horizontal, vertical, or dynamic paths."
      }
    },
    {
      "@type": "Question",
      "name": "Should you look at the crosshair or the target when tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Always look at the target character model rather than staring at your crosshair. Staring at the crosshair induces cognitive delay."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my tracking aim so shaky?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shaky tracking aim is primarily caused by excessive muscle tension (gripping mouse too tightly) or high sensitivity amplifying micro-jitters."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make my aim tracking smoother?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduce mouse sensitivity to 30-45 cm per 360, keep hand/wrist relaxed, and practice smooth pursuit drills consistently."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best sensitivity for tracking aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For tracking shooters, a low-to-moderate sensitivity between 30 cm/360 and 45 cm/360 provides maximum mechanical stability."
      }
    },
    {
      "@type": "Question",
      "name": "How do you practice strafe tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use reactive horizontal scenarios. Focus on reacting smoothly to direction changes rather than predicting turn timing."
      }
    },
    {
      "@type": "Question",
      "name": "Is Aim Lab or Kovaak's better for tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both are great. Kovaak's has huge scenario libraries, while Aim Lab offers telemetry. SkillDrills provides instant free browser access."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to improve tracking aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daily practice of 15 to 20 minutes yields noticeable improvements in tracking smoothness within 2 to 4 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Is this FPS tracking trainer free to practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all aim and reaction drills on SkillDrills are 100% free with no downloads, signups, or pop-up ads."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect tracking aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. High refresh rate monitors (144Hz, 240Hz, 360Hz) make target motion smoother and reduce display ghosting."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill improve reflexes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By presenting unpredictable horizontal target switches, it teaches the brain to translate visual coordinate changes into precise motor movements."
      }
    },
    {
      "@type": "Question",
      "name": "Can this improve gaming performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Fast reaction times and high-precision target tracking are critical for winning duels in competitive tournaments."
      }
    },
    {
      "@type": "Question",
      "name": "Is this useful for FPS games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Countering strafing players or tracking targets executing slide-cancels relies heavily on detecting speed transitions."
      }
    },
    {
      "@type": "Question",
      "name": "How is reaction speed measured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction time is measured in milliseconds (ms) from the moment the target relocates to the moment you successfully click it."
      }
    },
    {
      "@type": "Question",
      "name": "Is this suitable for beginners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The adaptive level system scales target sizes and duration limits dynamically so players of all skill levels can start training."
      }
    }
  ]
};

export default function FPSTrackingTrainerPage() {
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
      <FPSTrackingTrainerWrapper />
    </>
  );
}
