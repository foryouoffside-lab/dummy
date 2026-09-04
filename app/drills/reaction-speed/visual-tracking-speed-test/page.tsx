import VisualTrackingSpeedTestWrapper from './VisualTrackingSpeedTestWrapper';
import DrillGuide from '@/components/drill/DrillGuide';

// ============================================================
// SEO RESEARCH FINDINGS — visual-tracking-speed-test
// PRIMARY: "visual tracking test" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
//          "visual tracking speed test" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
// SECONDARY / LSI:
//   "mouse tracking test" / "visual pursuit test"
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
      "name": "What is smooth pursuit in vision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit is the visual eye movement mechanism that allows your eyes to closely follow a moving target across your visual field."
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

const visualTrackingGuide = {
  heading: "Visual Tracking Speed Test Guide: Measuring Ocular Pursuit & Rapid Target Re-Acquisition",
  intro: [
    "Visual tracking speed is the rate at which your oculomotor and motor systems can follow dynamic movement, detect sudden kinematic anomalies, and realign focus. In sports science, optometry, and gaming psychology, visual tracking is recognized as a fundamental pillar of athletic performance.",
    "Our Visual Tracking Speed Test measures your response to unpredictable target dashes. When a moving object suddenly breaks trajectory or accelerates unexpectedly, your visual system experiences a brief lag called saccadic latency before your eyes jump to re-acquire the target. This drill isolates and measures that exact re-acquisition window."
  ],
  benchmarks: {
    title: "Visual Tracking & Dash Reaction Reference Tiers",
    headers: ["Re-Acquisition Latency", "Performance Category", "Tracking Consistency", "Athletic Equivalent", "Recommended Training Focus"],
    rows: [
      ["< 190 ms", "Exceptional / Elite", "95%+", "F1 / Fighter Pilot / Pro Esports", "Maintain extreme focus across extended duration endurance runs"],
      ["190 – 240 ms", "Advanced", "85% – 94%", "Collegiate Athlete / High ELO Gamer", "Refine soft-focus gaze to eliminate anticipatory flinches"],
      ["241 – 300 ms", "Competent / Above Average", "75% – 84%", "Recreational Sports / Active Gamer", "Reduce mouse grip tension to enable faster directional shifts"],
      ["301 – 380 ms", "Average", "60% – 74%", "Typical Healthy Adult Baseline", "Practice tracking steady movements before challenging high-velocity dashes"],
      ["> 380 ms", "Developing", "< 60%", "Sedentary / Unconditioned", "Check monitor refresh rate and reduce background cognitive fatigue"]
    ],
    note: "These re-acquisition benchmarks serve as an editorial reference guide. Visual tracking scores improve steadily with consistent daily training and adequate rest."
  },
  techniques: {
    title: "Visual Tracking & Saccadic Pursuit Principles",
    items: [
      {
        name: "Smooth Pursuit vs. Catch-up Saccades",
        desc: "When a target moves smoothly under 30 degrees of visual angle per second, the eyes track it with smooth pursuit. When it dashes rapidly, smooth pursuit fails, and the brain triggers a rapid catch-up saccade.",
        tips: "Train yourself not to blink or break gaze during the smooth tracking phase."
      },
      {
        name: "Anticipatory Gaze vs. Reactive Chasing",
        desc: "Rather than staring directly at the center of the moving target, maintain a slightly broad focus that encompasses the surrounding space. This allows you to perceive sudden acceleration instantly.",
        tips: "Avoid predicting dash directions prematurely; wait for the visual confirmation."
      },
      {
        name: "Motor Decoupling",
        desc: "Many individuals clench their shoulders, neck, and hand muscles during high-speed tracking drills, which restricts fine motor adjustments. Consciously relax your arm and wrist.",
        tips: "Perform brief shoulder rolls and wrist stretches between drill sessions."
      },
      {
        name: "Dynamic Visual Acuity (DVA)",
        desc: "Dynamic visual acuity is the ability to resolve fine detail when there is relative motion between the observer and the target. Regular tracking drills condition the vestibular-ocular reflex (VOR) and ocular motor coordination.",
        tips: "Ensure proper desk lighting to prevent eye strain and maintain maximum pupil responsiveness."
      }
    ]
  },
  steps: [
    "Position yourself at a comfortable distance from your monitor (approximately arm's length).",
    "Click Start Drill and lock your eyes onto the moving tracking sphere.",
    "Follow the target smoothly as it travels along its initial trajectory.",
    "The instant the target executes a sudden dash, react immediately and re-center your cursor.",
    "Complete the test battery to analyze your average re-acquisition latency, accuracy, and tracking stamina."
  ],
  audience: "Athletes across baseball, tennis, motorsports, hockey, competitive gamers training reactive aim, and individuals undergoing vision performance conditioning.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  related: [
    { href: "/drills/reaction-speed/fps-tracking-trainer", label: "FPS Tracking Trainer" },
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/saccadic-gallery", label: "Saccadic Gallery" },
    { href: "/drills/reaction-speed/reaction-game", label: "Reaction Game" }
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
      <DrillGuide guide={visualTrackingGuide} />
    </>
  );
}
