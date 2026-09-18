import ReflexTrainingDrillWrapper from './ReflexTrainingDrillWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — reflex-training-drill
// PRIMARY: "reflex training drill" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
// SECONDARY / LSI:
//   "multi target reflex trainer" / "burst reflex game"
// ============================================================

export const metadata = {
  title: 'Reflex Training Drill - Multi-Target Burst Reflex Game',
  description: 'Free reflex training drill online. React to multi-target bursts, sharpen divided attention and click response speed, and track your accuracy per round.',
  keywords: [
    'reflex training drill', 'multi target reflex trainer', 'aim reflex trainer',
    'reflex training game', 'reflex game online', 'hand eye coordination gaming',
    'fast reflex training', 'divided attention training', 'esports reaction training',
    'how to improve divided attention gaming', 'online reflex games free',
    'multi target acquisition trainer', 'burst reflex game',
    'free aim trainer browser', 'gaming hand eye coordination test', 'low latency reaction tool'
  ],
  // hreflang is emitted again now that ja locale pages exist for this route.
  // getAlternateLanguages() is route-aware -- it consults ROUTE_LOCALES and so
  // lists only the locales that actually have a page.js, never the full six.
  // Keep this in step with the locale pages: hreflang must be reciprocal, and
  // the localized pages already point back here, so dropping it silently voids
  // the annotation on both sides.
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reflex-training-drill',
    languages: getAlternateLanguages('/drills/reaction-speed/reflex-training-drill'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reflex Training Drill - Multi-Target Burst Reflex Game | SkillDrills',
    description: 'Improve your divided attention and click response with this free Reflex Training Drill. Multiple targets flash on screen at once — clear the whole burst before time runs out.',
    url: 'https://skilldrills.online/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reflex Training Drill - Multi-Target Burst Reflex Game',
    description: 'Improve your divided attention and click response. Free browser-based multi-target burst reflex drill with no downloads.',
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
  "name": "Reflex Training Drill — Multi-Target Burst Reflex Game | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill",
  "description": "Train reaction speed, divided attention, and simultaneous multi-target acquisition. A free device-adaptive burst reflex simulator for mobile, tablet, and desktop.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reflex Training, Divided Attention, Multi-Target Acquisition, Hand-Eye Coordination, Reflex Response",
  "dateModified": "2026-09-05"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Reflex Training Drill (Multi-Target Burst Trainer)",
  "description": "Isolates and trains simultaneous multi-target acquisition, divided attention, motor reaction speed, and hand-eye alignment.",
  "applicationCategory": "EducationalGame",
  "operatingSystem": "Web Browser",
  "dateModified": "2026-09-05"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Multi-Target Burst & Divided Attention Reflexes",
  "description": "Step-by-step instructions on improving your simultaneous target acquisition and click response speed.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Drill",
      "text": "Press Start Drill to initialize the Reflex Training Drill in full screen.",
      "url": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Scan the Burst",
      "text": "Keep your eyes alert to every target flashing on screen at once — watch each one's countdown ring.",
      "url": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Click",
      "text": "Click or tap each target's center before its individual timeout expires, prioritizing whichever is closest to disappearing.",
      "url": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Climb the Levels",
      "text": "Maintain high accuracy and consecutive hits to level up and face larger simultaneous target bursts.",
      "url": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill#step-4"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Reflex Training Drill",
  "alternateName": ["Reflex Game", "Divided Attention Reflex Trainer", "Reaction Speed Game"],
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Multi-target burst reflex trainer isolating divided attention and neuromuscular speed.",
  "softwareVersion": "2.0"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Reflex Training Drill - Multi-Target Burst Game",
  "url": "https://skilldrills.online/drills/reaction-speed/reflex-training-drill",
  "description": "Isolates and trains simultaneous multi-target acquisition, divided attention, and motor reaction speed.",
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
      "name": "What is a reflex training drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A reflex training drill is an interactive cognitive and motor exercise designed to condition rapid visual detection, spatial processing, and physical reaction speed against unexpected visual stimuli."
      }
    },
    {
      "@type": "Question",
      "name": "Can you actually train your reflexes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While innate peripheral nerve conduction velocity is largely biological, systematic reaction training drastically reduces central cognitive latency—specifically stimulus recognition, visual spatial indexing, and motor response selection (Donders, 1868)."
      }
    },
    {
      "@type": "Question",
      "name": "What is choice reaction time vs simple reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple reaction time (SRT) involves reacting to a single predictable stimulus with a single predetermined response (~180–220 ms). Choice reaction time (CRT) presents multiple possible stimuli or response options, requiring visual discrimination and cognitive decision-making, which adds 50 to 150 ms of processing delay."
      }
    },
    {
      "@type": "Question",
      "name": "How does Hick\'s Law affect reaction speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hick\'s Law (Hick, 1952; Hyman, 1953) states that reaction time increases logarithmically as the number of alternative choices increases: RT = a + b * log2(n + 1). In multi-target drills, training enables players to chunk visual space and compress this decision latency."
      }
    },
    {
      "@type": "Question",
      "name": "What is divided attention in gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divided attention is the cognitive ability to monitor and process multiple simultaneous visual inputs across wide angles of view without falling into tunnel vision. According to Broadbent's filter model (1958), practice expands visual-spatial bandwidth and accelerates attentional filter switching."
      }
    },
    {
      "@type": "Question",
      "name": "How do you practice multi-target acquisition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prioritize targets closest to expiration rather than randomly clicking nearest nodes. Mentally trace the shortest geometrical path connecting the cluster and practice decisive, non-oscillating stopping motions on each target."
      }
    },
    {
      "@type": "Question",
      "name": "Why do my reflexes feel slow in fast-paced games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slowed in-game reflexes typically stem from cognitive overload, high muscle tension, or the Psychological Refractory Period (Welford, 1952), where processing a preceding visual event temporarily delays responses to subsequent stimuli appearing within 300 ms."
      }
    },
    {
      "@type": "Question",
      "name": "How does monitor refresh rate affect reflex performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Display refresh rate directly quantizes visual presentation. Standard 60 Hz displays introduce ~16.7 ms frame intervals, whereas 240 Hz monitors reduce frame intervals to ~4.1 ms, eliminating visual latency and motion blur to expose target appearances earlier (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "How long should you practice reflex drills each day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10 to 20 minutes of high-intensity, deliberate burst drills per day provides optimal neurological adaptation without central nervous system exhaustion or tendon strain."
      }
    },
    {
      "@type": "Question",
      "name": "Is this reflex training drill free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SkillDrills' Reflex Training Drill is 100% free, runs client-side directly in your browser with zero downloads or registration, and timestamps every event with the High Resolution Time API (performance.now()). Note that browser clocks are deliberately coarsened for security, so treat differences smaller than about 5 ms as measurement noise rather than a real change in your speed."
      }
    }
  ]
};

const reflexDrillGuide = {
  heading: "Reflex Training Drill Guide: Conditioning Multi-Target Acquisition & Burst Reaction Speed",
  intro: [
    "A reflex training drill bridges the gap between simple reaction time (reacting to a single predictable flash) and choice reaction time in complex environments. In high-stakes gaming and fast-paced sports, you are rarely presented with one lone stimulus. Instead, multiple threats appear concurrently across wide visual angles, requiring you to triage targets and clear them rapidly.",
    "Mental chronometry research established by Donders (1868) classifies reactions into Simple Reaction Time (Type A) and Choice Reaction Time (Type B), which requires stimulus discrimination and response selection. Under the Hick-Hyman Law (Hick, 1952; Hyman, 1953), choice latency increases logarithmically with the number of alternative stimuli presented. Broadbent (1958) and Kahneman (1973) demonstrated that human divided attention operates through limited-capacity perceptual channels, while Welford (1952) identified the Psychological Refractory Period (PRP)—a neurological bottleneck that delays processing of secondary stimuli appearing within 300 ms of an initial event.",
    "This drill executes client-side using the HTML5 Canvas 2D API and the browser's requestAnimationFrame loop. High-precision event timestamps are recorded using the High Resolution Time API (performance.now()). Browser timer resolution is deliberately coarsened as a Spectre mitigation -- typically to about 1 ms in current browsers -- and display refresh adds its own quantization: ~16.7 ms per frame at 60 Hz, ~6.9 ms at 144 Hz and ~4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling contributes a further ~8 ms at 125 Hz versus ~1 ms at 1000 Hz. In practice that means this drill resolves real differences of roughly 5 ms and upward; anything finer is noise, not progress. This burst reflex drill trains your neurological visual-spatial processing speed by challenging you to clear simultaneous target clusters under active countdown decay.",
    "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
  ],
  benchmarks: {
    title: "Burst Reflex Acquisition Reference Tiers",
    headers: ["Average Clear Latency", "Performance Tier", "Choice Latency Profile", "Cognitive Characteristics", "Recommended Drill Focus"],
    rows: [
      ["< 250 ms / target", "Apex / Pro", "Sub-threshold choice delay", "Near-instantaneous spatial clustering with minimal Hick\'s Law penalty", "Maximize concurrent burst density"],
      ["250 – 320 ms / target", "Elite", "Compressed decision latency", "Rapid target triage; fluid inter-target saccadic transit", "Minimize dwell time between consecutive clicks"],
      ["321 – 400 ms / target", "Advanced Competitor", "Typical multi-alternative CRT", "Sharp initial target acquisition with mild hesitation on cluster extremes", "Expand peripheral scanning arc to detect outer nodes earlier"],
      ["401 – 500 ms / target", "Intermediate", "Elevated cognitive overhead", "Solid single-target reflex; brief processing freeze on dense bursts", "Triage targets by expiration countdown first"],
      ["> 500 ms / target", "Developing", "High decision delay", "Susceptible to PRP bottleneck and visual search hesitation", "Focus on clean geometric pathing before ramping up speed"]
    ],
    note: "These clear latency tiers represent an editorial reference guide grounded in human choice reaction chronometry (Donders, 1868; Hick, 1952). Hardware input latency, mouse DPI, and monitor refresh rate impact recorded milliseconds."
  },
  techniques: {
    title: "Multi-Target Reflex Optimization",
    items: [
      {
        name: "Triage & Shortest-Path Sequencing",
        desc: "When a burst of targets appears, mentally path the shortest route connecting them rather than jumping randomly across the screen. Clearing targets in a geometric line or arc minimizes unnecessary hand travel.",
        tips: "Scan the cluster as a single visual shape rather than individual dots."
      },
      {
        name: "Peripheral Target Registration",
        desc: "Your foveal (central) vision provides high resolution for clicking, but your peripheral vision is far faster at detecting sudden flashes. Use peripheral cues to locate subsequent targets while your hand is still executing the current click.",
        tips: "Keep your gaze centered on the cluster midpoint rather than trailing your cursor."
      },
      {
        name: "Decisive Stopping Power",
        desc: "Fast multi-target clicking requires instant deceleration. Overshooting a target and micro-correcting back wastes 50–100ms per target. Focus on crisp, definitive stops on each target center.",
        tips: "Use a control-focused mousepad surface if you find yourself sliding past targets."
      },
      {
        name: "Warmup Routine & Neuromuscular Readiness",
        desc: "Reflex speed is heavily affected by central nervous system arousal, sleep quality, and physical warmup. Performing 5 to 10 minutes of burst drills prior to competitive matches elevates baseline reaction readiness.",
        tips: "Hydrate properly and ensure hands and fingers are warm to optimize nerve conduction velocity."
      }
    ]
  },
  steps: [
    "Configure your round duration and difficulty tier, then click Start Drill.",
    "Fixate your visual attention at the center of the display canvas.",
    "When the target cluster flashes, instantly scan the layout and establish your click sequence.",
    "Click each target decisively before its expiration timer drains.",
    "Clear all burst waves to evaluate your average target acquisition time and clear rate."
  ],
  audience: "Tactical shooter players (Valorant, CS2, R6 Siege), battle royale competitors, esports athletes, martial artists, and anyone training rapid multi-stimulus reflexes.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('donders1969', 'hick1952', 'hyman1953', 'welford1952', 'woods2015'),
  related: [
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/reaction-game", label: "Reaction Game" },
    { href: "/drills/reaction-speed/saccadic-gallery", label: "Saccadic Eye Exercises" },
    { href: "/drills/reaction-speed/fps-tracking-trainer", label: "FPS Tracking Trainer" }
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
      <ReflexTrainingDrillWrapper copy={{ title: 'Reflex Training Drill' }} />
      <DrillGuide guide={reflexDrillGuide} />
    </>
  );
}
