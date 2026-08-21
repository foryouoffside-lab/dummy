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
// ============================================================

export const metadata = {
  title: 'Visual Tracking Test - Speed & Reflex Test Online',
  description: 'Free visual tracking speed test. Measure how fast your eyes and hand follow moving targets, and train hand-eye reflexes with progressive difficulty.',
  keywords: [
    'visual tracking test', 'visual tracking speed test', 'mouse tracking test',
    'reaction speed test', 'reflex test online', 'gaming reflex test',
    'hand eye coordination gaming', 'visual processing speed test', 'ocular tracking test',
    'how to test visual tracking speed', 'online visual tracking test free',
    'aim reflex training online', 'trace target tracking game',
    'free aim trainer browser', 'gaming hand eye coordination test', 'low latency reaction tool'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Visual Tracking Test - Speed & Reflex Test Online',
    description: 'Test your visual tracking speed and hand-eye reflexes with the free Visual Tracking Test. Measure your ability to track moving targets and compare scores.',
    url: 'https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Tracking Test - Speed & Reflex Test Online',
    description: 'Test your visual tracking speed and hand-eye reflexes. Free browser-based visual tracking test with no downloads.',
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
  "name": "How to Train Visual Pursuit & Tracking Speed",
  "description": "Step-by-step instructions on improving your visual tracking speed and click timing.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Test",
      "text": "Press Start Drill to initialize the Visual Tracking Speed Test in full screen mode."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Maintain Smooth Pursuit",
      "text": "Focus your eyes smoothly on moving targets as they accelerate across unpredictable trajectories."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Click",
      "text": "Tap or click the target center immediately before its lifespan duration limit expires and triggers a timeout."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Climb the Levels",
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
      "name": "What is a visual tracking speed test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is an interactive vision utility where you track and tap moving targets to measure visual processing latency and tracking precision."
      }
    },
    {
      "@type": "Question",
      "name": "What is smooth pursuit in vision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit is the visual eye movement mechanism that allows your eyes to closely follow a moving target across your visual field."
      }
    },
    {
      "@type": "Question",
      "name": "Can you train visual tracking speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Regular visual pursuit training sharpens brain-to-hand coordination, reduces tracking lag, and improves click timing."
      }
    },
    {
      "@type": "Question",
      "name": "How does visual tracking help in FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In games like CS2, Valorant, Apex Legends, and Overwatch 2, enemies strafe rapidly. Fast visual tracking lets you stay locked onto targets."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect visual tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! High refresh rates (144Hz, 240Hz, 360Hz) render target motion with less motion blur and lower input delay."
      }
    },
    {
      "@type": "Question",
      "name": "Is this visual tracking test free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all drills on SkillDrills are 100% free with no signups, downloads, or pop-up ads required."
      }
    },
    {
      "@type": "Question",
      "name": "How does level progression work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 250 points earned levels up the drill, accelerating target speed, shrinking target diameter, and shortening spawn TTL."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I miss a click?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clicking empty background space triggers a red alert flash and a miss is logged against your accuracy — there's no score penalty, so keep going."
      }
    },
    {
      "@type": "Question",
      "name": "Can traditional athletes use this test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Athletes in baseball, tennis, motorsports, and hockey use visual tracking exercises to improve spatial pursuit reflexes."
      }
    },
    {
      "@type": "Question",
      "name": "Does this test support touchscreens and mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! It features generous touch hitpads and automatic orientation warnings for mobile devices."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I practice visual tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A daily 5-10 minute session warms up your eye-hand coordination and maintains optimal visual pursuit readiness."
      }
    },
    {
      "@type": "Question",
      "name": "Should I lead the target or click directly on it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus your eyes directly on the center core of the target and execute a smooth click synced with its movement vector."
      }
    },
    {
      "@type": "Question",
      "name": "Does mouse DPI affect visual tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using a comfortable mouse DPI (400-1600 DPI) ensures smooth crosshair control without overshooting moving targets."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on this test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score above 5,000 indicates strong visual pursuit skills, while scores exceeding 10,000 represent elite tracking precision."
      }
    },
    {
      "@type": "Question",
      "name": "How does this test measure reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It records the millisecond latency between target appearance and your successful click input."
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
