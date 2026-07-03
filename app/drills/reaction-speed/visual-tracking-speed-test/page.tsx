import VisualTrackingSpeedTestWrapper from './VisualTrackingSpeedTestWrapper';

// ============================================================
// SEO RESEARCH FINDINGS — visual-tracking-speed-test
// PRIMARY: "visual tracking test" — high-intent search, low KD ~28%
//          "visual tracking speed test" — exact concept match
// SECONDARY / LSI:
//   "mouse tracking test"             ~200-500/mo, KD ~25%
//   "reaction speed test"             ~6,600/mo,   KD ~45%
//   "visual processing speed test"    ~250/mo,     KD ~30%
//   "hand eye coordination gaming"    ~590/mo,     KD ~18%
//   "sports vision training"          ~720/mo,     KD ~26%
// PAA targets: "What is a visual tracking test?", "How do you test visual tracking speed?",
//   "Does visual tracking training help gaming?", "Is this visual tracking test free?"
// Key entities: visual tracking speed, foveal scanning, smooth pursuit, gaze stabilization,
//   choice reaction time, muscle memory, retinal slip, prefrontal cortex
// ============================================================

export const metadata = {
  title: 'Visual Tracking Test - Speed & Reflex Test Online | SkillDrills',
  description: 'Test your visual tracking speed and hand-eye reflexes with the free Visual Tracking Test. Measure your ability to track moving targets, compare scores, and train to improve. Free online, no download needed.',
  keywords: [
    // Primary / Head terms
    'visual tracking test', 'visual tracking speed test', 'mouse tracking test',
    // Secondary / LSI terms
    'reaction speed test', 'reflex test online', 'gaming reflex test',
    'hand eye coordination gaming', 'visual processing speed test', 'ocular tracking test',
    // Long-tail variants
    'how to test visual tracking speed', 'online visual tracking test free',
    'aim reflex training online', 'trace target tracking game',
    // General
    'free aim trainer browser', 'gaming hand eye coordination test', 'low latency reaction tool'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Visual Tracking Test - Speed & Reflex Test Online | SkillDrills',
    description: 'Test your visual tracking speed and hand-eye reflexes with the free Visual Tracking Test. Measure your ability to track moving targets and compare scores.',
    url: 'https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Visual Tracking Test - Speed & Reflex Test Online | SkillDrills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Tracking Test - Speed & Reflex Test Online',
    description: 'Test your visual tracking speed and hand-eye reflexes. Free browser-based visual tracking test with no downloads.',
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
    { "@type": "ListItem", "position": 4, "name": "Visual Tracking Speed Test", "item": "https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Visual Tracking Test — Speed & Reflex Test Online | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test",
  "description": "Train target tracking speed, reflexes, smooth pursuit, and hand-eye accuracy. A free device-adaptive reaction simulator for mobile, tablet, and desktop.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Visual Tracking, Reaction Speed, Dynamic Eye Movement, Focus Scanning, Hand-Eye Click Timing"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Visual Tracking Speed Test",
  "description": "Isolates and trains target speed changes, visual tracking reflexes, smooth pursuit accuracy, and foveal target acquisition.",
  "applicationCategory": "EducationalGame",
  "operatingSystem": "Web Browser",
  "isAccessibleForFree": true,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Test Your Visual Tracking Speed",
  "description": "Improve ocular tracking accuracy and visual reaction speed against target acceleration shifts.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Trial",
      "text": "Hit the Begin Reflex Trial button to enter the interactive viewport. Adjust target color presets and neon borders to fit your preference."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Follow Target Movement",
      "text": "Follow the target smoothly as it slides across the screen area, anticipating sudden dash accelerations."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Click",
      "text": "Tap or click the target core immediately before its lifespan duration limit expires and triggers a timeout."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Sustain Streak combos",
      "text": "Maintain your accuracy to raise the adaptive level and test your reflexes at higher target velocities."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Visual Tracking Speed Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Visual Tracking Speed Test is an online reflex game designed to measure how accurately and quickly you can track a moving target and coordinate a physical clicking response under speed-scaling pressure."
      }
    },
    {
      "@type": "Question",
      "name": "What is a visual tracking test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A visual tracking test measures your ability to follow a moving target across your field of vision continuously. It tests ocular coordination, smooth pursuit stability, foveal scanning efficiency, and brain-to-hand reaction latency."
      }
    },
    {
      "@type": "Question",
      "name": "How does this test measure reaction speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The test measures reaction speed by recording the exact milliseconds (ms) it takes from the moment a target shifts or dashes to the moment your cursor aligns and registers a click."
      }
    },
    {
      "@type": "Question",
      "name": "Why is visual tracking important for competitive gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In fast-paced games (such as Apex Legends, Overwatch, and Call of Duty), targets jump, slide, and strafe erratically. High visual tracking speed allows you to follow these sudden trajectory shifts cleanly and keep your crosshair centered on the opponent."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between smooth pursuit and saccadic tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit is the continuous tracking of a single moving target (like tracking a flying projectile). Saccades are rapid, jumpy ballistic shifts of the eyes when jumping between different static targets (like scanning different corners)."
      }
    },
    {
      "@type": "Question",
      "name": "Can visual tracking exercises prevent cognitive decline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, clinical research shows that active visual training, processing speed exercises, and hand-eye reaction games stimulate neural pathways, preserve spatial attention, and maintain cognitive agility as we age."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve my visual tracking test score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can improve your score by practicing daily for 5-10 minutes, using low-latency gaming peripherals, ensuring you are well-rested, and using a high refresh rate monitor (144Hz+) to reduce motion blur."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor input lag affect visual tracking speed test scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, significantly. Slow monitors (60Hz) display target positions with delay and blur, whereas high-refresh monitors (144Hz+) render movements smoothly, helping your eyes lock on instantly."
      }
    },
    {
      "@type": "Question",
      "name": "Is this visual tracking test free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all visual tracking tests and reaction drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required. You can play directly in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Can I take this visual tracking test on a phone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. This game is fully touch-optimized for smartphones and tablets. It dynamically scales to fit your screen size and supports high-accuracy touch inputs."
      }
    }
  ]
};

export default function VisualTrackingSpeedTestPage() {
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
      <VisualTrackingSpeedTestWrapper />
    </>
  );
}

