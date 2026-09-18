import VisualTrackingSpeedTestWrapper from './VisualTrackingSpeedTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

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
    'visual tracking test', 'visual tracking speed test', 'eye tracking test',
    'smooth pursuit test', 'smooth pursuit', 'visual tracking exercises',
    'mouse tracking test', 'dynamic visual acuity test', 'hand eye coordination test',
    'kinetic interception', 'reaction speed test', 'reflex test online',
    'foveal tracking', 'catch up saccades', 'visual processing speed test',
    'how to test visual tracking speed', 'online visual tracking test free',
    'free aim trainer browser', 'low latency reaction tool'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test',
    languages: getAlternateLanguages('/drills/reaction-speed/visual-tracking-speed-test'),
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
  "dateModified": "2026-09-05",
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
  "dateModified": "2026-09-05",
  "isAccessibleForFree": true,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Visual Tracking Speed",
  "description": "Step-by-step instructions on tracking dynamic targets and improving catch-up saccade accuracy.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start the Test",
      "text": "Press Start Drill to initialize the visual tracking arena in full screen.",
      "url": "https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Lock Gaze on Target",
      "text": "Focus your foveal vision on the moving orb as it travels across the arena.",
      "url": "https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Track Sudden Changes",
      "text": "Execute smooth pursuit and instant catch-up saccades when the orb changes trajectory or speed.",
      "url": "https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Review Pursuit Precision",
      "text": "Check your smooth pursuit fidelity, catch-up latency, and gaze stability scores.",
      "url": "https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test#step-4"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Visual Tracking Speed Test",
  "alternateName": ["Smooth Pursuit Test", "Eye Tracking Speed Drill", "Visual Reflex Test"],
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Scientific smooth pursuit and catch-up saccade visual tracking speed assessment tool.",
  "softwareVersion": "2.0"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Visual Tracking Speed Test - Smooth Pursuit Eye Training",
  "url": "https://skilldrills.online/drills/reaction-speed/visual-tracking-speed-test",
  "description": "Test and condition smooth pursuit eye movements and dynamic re-acquisition reflexes online.",
  "genre": ["Reflex Game", "Action", "Esports Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a visual tracking test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A visual tracking test evaluates how smoothly and accurately your eyes follow moving objects across space. It measures smooth pursuit eye stability, dynamic visual acuity, and catch-up saccadic latency when moving targets suddenly accelerate or alter course."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between smooth pursuit and saccades during visual tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit is a continuous, voluntary eye movement that stabilizes an image of an already acquired moving object on the fovea (typically up to 30°–60°/s; Krauzlis 2004). Saccades are rapid, ballistic jumps (200°–700°/s) that quickly reposition the eyes when the target speeds up or changes direction abruptly (Rashbass 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "Can a standard 20/20 eye exam detect visual tracking difficulties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Standard 20/20 eye exams measure static visual acuity—how clearly you can resolve stationary letters on a Snellen chart at 20 feet. They do not routinely test dynamic oculomotor control, smooth pursuit velocity gain, or kinematic target re-acquisition speed."
      }
    },
    {
      "@type": "Question",
      "name": "What causes poor visual tracking and eye movement delays?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deficits in visual tracking can result from prolonged digital eye strain, neuromuscular extraocular fatigue, poor sleep, or neurological disruptions such as concussions, whiplash, vestibular dysfunction, or cerebellar adaptation mismatches."
      }
    },
    {
      "@type": "Question",
      "name": "How does visual tracking speed affect athletic and gaming performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In fast-paced sports (baseball, hockey, tennis) and esports (FPS, arena shooters), visual tracking speed dictates how rapidly an athlete detects trajectory shifts and coordinates hand-eye interception (Land & McLeod 2000). Faster tracking minimizes lag when acquiring evasive opponents."
      }
    },
    {
      "@type": "Question",
      "name": "Can visual tracking speed and hand-eye coordination be improved with training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Repeated exposure to dynamic tracking drills strengthens cortical pathways between the middle temporal visual area (MT/V5), frontal eye fields (FEF), and cerebellar vermis, reducing tracking latency and improving interception accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "What are catch-up saccades in smooth pursuit tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When a tracked target accelerates beyond the maximum velocity capacity of the smooth pursuit system, the retinal image slips off the fovea. The brain triggers a rapid catch-up saccade to bridge the positional gap and re-center the target (Rashbass 1961; Krauzlis 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate impact visual tracking drills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A 60 Hz monitor renders frames every 16.7 ms, while a 144 Hz display updates every 6.9 ms and a 240 Hz screen updates every 4.1 ms (Woods et al. 2015). Higher refresh rates render continuous motion with significantly reduced micro-stuttering, enabling smoother ocular pursuit."
      }
    },
    {
      "@type": "Question",
      "name": "How often should you train visual tracking to see measurable improvements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Practicing for 3 to 5 minutes once or twice per day produces consistent improvements without causing ocular fatigue. Brief, high-focus sessions preserve neuromuscular responsiveness and prevent digital asthenopia."
      }
    },
    {
      "@type": "Question",
      "name": "Is this visual tracking speed test free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SkillDrills' Visual Tracking Speed Test is 100% free with no registration, software installations, or paywalls required. It runs natively in any modern web browser across desktop, tablet, and mobile devices."
      }
    }
  ]
};

const visualTrackingGuide = {
  heading: "Visual Tracking Speed Test Guide: Measuring Ocular Pursuit & Rapid Target Re-Acquisition",
  intro: [
    "Visual tracking speed is the rate at which your oculomotor and motor systems can follow dynamic movement, detect sudden kinematic anomalies, and realign focus. In sports science, optometry, and gaming psychology, visual tracking is recognized as a fundamental pillar of athletic performance (Krauzlis 2004; Land & McLeod 2000).",
    "Our Visual Tracking Speed Test measures your response to unpredictable target dashes and bounce trajectories. When a moving object suddenly breaks trajectory or accelerates, smooth pursuit momentarily breaks down and the central nervous system triggers a catch-up saccade (Rashbass 1961). The software records re-acquisition intervals using high-precision performance.now() timestamps. In accordance with digital chronometry standards (Woods et al. 2015), users should note that hardware display latency (16.7 ms per frame at 60 Hz down to 4.1 ms at 240 Hz) and peripheral input polling influence raw click confirmation times.",
    "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
  ],
  benchmarks: {
    title: "Visual Tracking & Dash Reaction Reference Tiers",
    headers: ["Re-Acquisition Latency", "Oculomotor Classification", "Pursuit & Catch-up Mechanics", "Functional Context", "Recommended Training Focus"],
    rows: [
      ["< 180 ms", "Express Predictive Re-Acquisition", "Near-instantaneous foveal realignment; anticipatory trajectory matching", "Elite motorsports / Fighter pilot / Pro esports (Land & McLeod 2000)", "Maintain soft-focus gaze across extended endurance runs"],
      ["180 – 230 ms", "High-Velocity Dynamic Pursuit", "Minimal catch-up saccade delay with sharp velocity matching", "Competitive ball sports / High-rank gaming (Krauzlis 2004)", "Refine peripheral velocity estimation to eliminate overshoot"],
      ["231 – 290 ms", "Standard Normative Tracking", "Expected physiological latency for visual motion re-acquisition", "Standard adult healthy visual-motor tracking baseline", "Condition extraocular rectus muscles for faster directional shifts"],
      ["291 – 360 ms", "Delayed / Visually Fatigued", "Extended lag before triggering catch-up saccade; trajectory trailing", "Prolonged screen time, ocular dryness, or low contrast", "Employ 20-20-20 visual rest intervals; check monitor refresh rate"],
      ["> 360 ms", "Sub-Optimal / Dysmetric Pursuit", "Multiple corrective micro-saccades required to re-center target", "Unconditioned oculomotor tracking or visual distractors", "Consult an eye care professional if persistent tracking difficulty occurs"]
    ],
    note: "Re-acquisition latency benchmarks reflect normative psychomotor and smooth pursuit literature (Rashbass 1961; Krauzlis 2004; Land & McLeod 2000) adapted for computer-based interactive visual drills. Web-based interaction includes operating system and display refresh quantization (typically ~16.7 ms at 60 Hz down to ~4.1 ms at 240 Hz; Woods et al. 2015) and does not substitute for clinical video-oculography (VOG) or optometric diagnosis."
  },
  techniques: {
    title: "Visual Tracking & Saccadic Pursuit Principles",
    items: [
      {
        name: "Smooth Pursuit vs. Catch-up Saccades",
        desc: "When a target moves smoothly under 30 degrees of visual angle per second, the eyes track it with smooth pursuit. When it accelerates rapidly or alters trajectory, pursuit breaks down and the brain fires a rapid catch-up saccade (Rashbass 1961; Krauzlis 2004).",
        tips: "Train yourself to stay visually locked without flinching or prematurely predictive jumping."
      },
      {
        name: "Anticipatory Gaze vs. Reactive Chasing",
        desc: "Rather than fixating strictly on the trailing edge of a moving target, top performers maintain an anticipatory focal window that projects the upcoming trajectory vector (Land & McLeod 2000).",
        tips: "Avoid predicting bounce angles before target impact; let the visual stimulus confirm the rebound vector."
      },
      {
        name: "Motor Decoupling & Neuromuscular Flow",
        desc: "Clenching forearm, neck, and shoulder muscles restricts fine motor cursor tracking. Maintaining relaxed isometric tone preserves high-frequency micro-adjustments during high-speed interception.",
        tips: "Perform brief wrist stretches and conscious breathing cycles between drill attempts."
      },
      {
        name: "Dynamic Visual Acuity (DVA) Conditioning",
        desc: "Dynamic visual acuity is the capacity to resolve fine visual detail while targets are in motion relative to the retina. Regular kinetic tracking drills strengthen vestibular-ocular and optokinetic reflex integration.",
        tips: "Ensure proper ambient screen lighting to prevent pupillary strain and maintain optimal contrast sensitivity."
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
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('krauzlis2004', 'rashbass1961', 'land2000', 'woods2015'),
  related: [
    { href: "/drills/reaction-speed/fps-tracking-trainer", label: "FPS Tracking Trainer" },
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/saccadic-gallery", label: "Saccadic Eye Exercises" },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
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
      <VisualTrackingSpeedTestWrapper copy={{ title: 'Visual Tracking Speed Test' }} />
      <DrillGuide guide={visualTrackingGuide} />
    </>
  );
}
