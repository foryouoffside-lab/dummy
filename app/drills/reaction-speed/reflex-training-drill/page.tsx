import ReflexTrainingDrillWrapper from './ReflexTrainingDrillWrapper';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';

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
  "teaches": "Reflex Training, Divided Attention, Multi-Target Acquisition, Hand-Eye Coordination, Reflex Response"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Reflex Training Drill (Multi-Target Burst Trainer)",
  "description": "Isolates and trains simultaneous multi-target acquisition, divided attention, motor reaction speed, and hand-eye alignment.",
  "applicationCategory": "EducationalGame",
  "operatingSystem": "Web Browser"
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
      "text": "Press Start Drill to initialize the Reflex Training Drill in full screen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Scan the Burst",
      "text": "Keep your eyes alert to every target flashing on screen at once — watch each one's countdown ring."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Click",
      "text": "Click or tap each target's center before its individual timeout expires, prioritizing whichever is closest to disappearing."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Climb the Levels",
      "text": "Maintain high accuracy and consecutive hits to level up and face larger simultaneous target bursts."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can you train divided attention and multi-target reflexes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Repeated exposure to simultaneous stimuli strengthens parallel visual processing and reduces the tunnel-vision effect of fixating on one target."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill differ from single-target reaction tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Single-target tests present one stimulus at a time. This drill spawns 2 to 5 targets simultaneously, so you must scan and clear a full burst under a shared time limit."
      }
    },
    {
      "@type": "Question",
      "name": "Which target should I clear first in a burst?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Watch the depleting countdown ring around each target and prioritize whichever is closest to timing out, not just the nearest one to your cursor."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score above 5,000 indicates strong divided-attention reflexes, while scores exceeding 10,000 represent elite multi-target acquisition speed."
      }
    }
  ]
};

const reflexDrillGuide = {
  heading: "Reflex Training Drill Guide: Conditioning Multi-Target Acquisition & Burst Reaction Speed",
  intro: [
    "A reflex training drill bridges the gap between simple reaction time (reacting to a single predictable flash) and choice reaction time in complex environments. In high-stakes gaming and fast-paced sports, you are rarely presented with one lone stimulus. Instead, multiple threats appear concurrently across wide visual angles, requiring you to triage targets and clear them rapidly.",
    "This burst reflex drill trains your neurological visual-spatial processing speed. By flashing clusters of targets that must be cleared before their expiration window closes, it forces your motor system to sequence rapid acquisitions without second-guessing or hesitation."
  ],
  benchmarks: {
    title: "Burst Reflex Acquisition Reference Tiers",
    headers: ["Target Clear Speed", "Performance Tier", "Target Accuracy", "Cognitive Profile", "Recommended Drill Focus"],
    rows: [
      ["< 220 ms / target", "Godlike / Apex", "98%+", "Near-instantaneous spatial clustering and robotic flick-stop mechanics", "Push burst density to maximum targets"],
      ["220 – 280 ms / target", "Master / Elite", "92% – 97%", "Exceptional divided attention; fluid eye-to-hand target switching", "Minimize reset delay between consecutive clicks"],
      ["281 – 350 ms / target", "Advanced Competitor", "85% – 91%", "Sharp reflexes on initial targets; slight hesitation on outer cluster edges", "Practice wider eye sweeps to spot outer targets earlier"],
      ["351 – 440 ms / target", "Intermediate", "75% – 84%", "Solid single-target speed; cognitive overload during dense bursts", "Triage targets by proximity: clear nearest targets first"],
      ["> 440 ms / target", "Developing", "< 75%", "Visual panic during bursts; frequent misses from rushing clicks", "Focus on clean precision before ramping up acquisition pace"]
    ],
    note: "These acquisition speed brackets are an editorial reference guide. Hardware input latency, mouse DPI, and monitor refresh rate impact recorded milliseconds."
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
  related: [
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/reaction-game", label: "Reaction Game" },
    { href: "/drills/reaction-speed/saccadic-gallery", label: "Saccadic Gallery" },
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
      <DrillGuide guide={reflexDrillGuide} />
    </>
  );
}
