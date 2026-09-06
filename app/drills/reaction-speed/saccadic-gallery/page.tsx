import SaccadicGalleryWrapper from './SaccadicGalleryWrapper';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — saccadic-gallery
// PRIMARY: "saccadic eye exercises" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
//          "saccadic gallery"       — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
// SECONDARY / LSI:
//   "saccadic eye movement training" / "eye tracking training"
// ============================================================

export const metadata = {
  title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
  description: 'Free saccadic eye exercises online. Train rapid eye jumps between fixed targets to build faster visual scanning and sharper target acquisition.',
  keywords: [
    'saccadic eye exercises', 'saccades', 'saccadic eye movements', 'saccadic training',
    'saccadic gallery', 'visual tracking exercises', 'saccadic eye movement training',
    'esports vision training', 'saccadic training online', 'saccadic tracking exercises',
    'saccadic latency', 'saccadic dysmetria', 'express saccades', 'ocular coordination training',
    'how to improve saccadic eye movement', 'vision therapy exercises online',
    'free eye exercises game', 'sports vision drills free', 'cognitive eye warmup'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/saccadic-gallery',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
    description: 'Practice saccadic eye exercises online with the free Saccadic Gallery training drill. Improve your eye tracking, visual processing speed, and ballistic eye sweeps.',
    url: 'https://skilldrills.online/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saccadic Gallery - Online Saccadic Eye Exercises',
    description: 'Track glowing targets flashing in a zig-zag gallery pattern. Free browser-based saccadic eye trainer with no downloads.',
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
    { "@type": "ListItem", "position": 4, "name": "Saccadic Gallery", "item": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Saccadic Gallery — Online Saccadic Eye Exercises | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/saccadic-gallery",
  "description": "Sequence-based ballistic eye shifts. Track glowing targets flashing in a zig-zag gallery pattern to improve foveal sweep speed and eye movement agility.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05",
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Saccadic Eye Exercises, Visual Scanning, Ballistic Eye Sweeps, Eye Tracking Accuracy, Focus Speed"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Perform Saccadic Eye Exercises with Saccadic Gallery",
  "description": "Improve your foveal scanning and ballistic eye movements against glowing target sequence patterns.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure and Begin",
      "text": "Press Start Drill to launch Saccadic Gallery in full screen mode."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track Target Sequence",
      "text": "Focus your eyes on the sequence of targets as they light up in a gallery layout across the viewport."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Sweep Eyes Ballistically",
      "text": "Shift your focus quickly from one target to the next. Keep your head still; let your eye muscles execute the sweep."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Tap to Eliminate",
      "text": "Click or tap active targets as fast as possible to verify focus lock and keep your accuracy climbing."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a saccadic eye exercise?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A saccadic eye exercise is an oculomotor drill that trains rapid, conjugate jumps of the eyes between fixed fixation targets. Saccades are ballistic movements reaching velocities between 200° and 700° per second, coordinated by the brainstem paramedian pontine reticular formation (PPRF) and superior colliculus."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between saccadic and smooth pursuit eye movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccades are rapid, ballistic jumps that reposition the fovea onto new targets (lasting 20–40 ms), during which visual input is momentarily attenuated via saccadic suppression. In contrast, smooth pursuit movements are continuous, voluntary tracking movements that stabilize an already acquired moving object at velocities up to 30°–60° per second."
      }
    },
    {
      "@type": "Question",
      "name": "What is normal saccadic latency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Normative saccadic latency in healthy adults typically ranges from 180 to 250 milliseconds under standard visual step paradigms (Rayner 1998; Leigh & Zee 2015). This represents the interval needed for retinal transduction, cortical target selection in the frontal eye fields (FEF), and motor burst triggering."
      }
    },
    {
      "@type": "Question",
      "name": "What causes saccadic dysmetria (overshooting or undershooting)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic dysmetria occurs when an eye jump fails to land accurately on target, presenting as hypometria (undershoot) or hypermetria (overshoot) and requiring corrective secondary saccades. It is typically caused by neuromuscular eye fatigue, extended screen strain, or cerebellar adaptation mismatches in the dorsal vermis and fastigial oculomotor region."
      }
    },
    {
      "@type": "Question",
      "name": "Should you move your head or only your eyes during saccades?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You should consciously keep your head still and move only your eyes. Restricting cervical movement isolates the six extraocular rectus and oblique muscles, conditioning true ocular motor agility rather than relying on compensatory vestibulo-ocular head turns."
      }
    },
    {
      "@type": "Question",
      "name": "Can saccadic eye speed and accuracy be trained or improved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Structured oculomotor training reinforces cortical and brainstem gaze networks, decreasing reaction latency variability, eliminating wasted corrective micro-saccades, and enhancing target acquisition in competitive esports, fast-paced sports, and rapid reading."
      }
    },
    {
      "@type": "Question",
      "name": "What are express saccades?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Express saccades are ultra-short latency ocular jumps (80 to 120 milliseconds) that occur when visual attention disengages prior to target onset (Fischer & Weber 1993). They are commonly triggered in gap paradigms where the central fixation target disappears briefly before a peripheral stimulus illuminates."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect saccadic eye training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Computer display hardware quantizes visual presentations into frame intervals. A standard 60 Hz screen updates every 16.7 milliseconds, whereas 144 Hz (6.9 ms) and 240 Hz (4.1 ms) monitors provide significantly lower presentation jitter and smoother visual feedback (Woods et al. 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "How long should you perform saccadic eye exercises each day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saccadic drills should be performed in brief blocks of 3 to 5 minutes, 1 to 3 times per day. Because extraocular muscles and neural burst generators fatigue quickly under rapid eccentric loading, short bouts prevent ocular strain, headaches, and saccadic velocity decline."
      }
    },
    {
      "@type": "Question",
      "name": "Is this saccadic gallery eye exercise free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Saccadic Gallery is 100% free with no registration, subscription paywalls, or software downloads required. It executes directly in any modern desktop or mobile web browser."
      }
    }
  ]
};

const saccadicGalleryGuide = {
  heading: "Saccadic Eye Exercises Guide: Training Rapid Ocular Repositioning & Target Acquisition",
  intro: [
    "A saccade is a rapid, conjugate movement of both eyes between phases of fixation. Ranging from 200 to 700 degrees per second with durations between 20 and 40 milliseconds, saccades are among the fastest biological movements produced by the human body (Rayner 1998; Leigh & Zee 2015). Saccadic eye exercises train the extraocular rectus muscles and cortical gaze centers to acquire visual targets swiftly and accurately.",
    "The Saccadic Gallery isolates these rapid eye jumps across wide zig-zag vectors. The software records target acquisition intervals using high-precision performance.now() timestamps. In accordance with digital chronometry standards (Woods et al. 2015), users should note that hardware display latency (16.7 ms per frame at 60 Hz down to 4.1 ms at 240 Hz) and peripheral input polling influence raw click confirmation times.",
    "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
  ],
  benchmarks: {
    title: "Saccadic Fixation & Eye Exercise Reference Tiers",
    headers: ["Fixation Latency", "Saccadic Classification", "Primary Characteristics", "Functional Context", "Key Focus / Training Note"],
    rows: [
      ["< 180 ms", "Express / Anticipatory Saccade", "Fixation release prior to target onset; low directional programming", "Short-latency reflex triggers or gap paradigms (Fischer & Weber 1993)", "Verify fixation lock; minimize premature anticipation"],
      ["180 – 220 ms", "High-Velocity Target Acquisition", "Sharp single-saccade landing with minimal secondary correction", "Elite athletic & fast-paced digital scanning (Rayner 1998)", "Maintain ocular stamina without saccadic drift"],
      ["221 – 280 ms", "Standard Normative Fixation", "Expected physiological latency for visual-motor foveation", "Standard adult reading and visual search baseline", "Train horizontal and oblique peripheral pickup"],
      ["281 – 350 ms", "Delayed / Visually Fatigued", "Elevated processing time before ocular motor burst initiation", "Prolonged screen time, mental fatigue, or low contrast", "Employ 20-20-20 visual rest intervals; reduce strain"],
      ["> 350 ms", "Sub-Optimal / Hypometric Search", "Persistent hesitation or multi-step hypometric undershooting", "Unconditioned oculomotor tracking or visual distractors", "Consult an eye care professional if persistent fixation difficulty occurs"]
    ],
    note: "Latency ranges reflect normative psychophysics literature (Rayner 1998; Leigh & Zee 2015; Fischer & Weber 1993) adapted for computer-based browser visual drills. Web-based interaction includes operating system and display refresh quantization (typically ~16.7 ms at 60 Hz down to ~4.1 ms at 240 Hz; Woods et al. 2015) and does not replace diagnostic clinical electro-oculography (EOG) or infrared scleral reflection tracking."
  },
  techniques: {
    title: "Oculomotor Conditioning & Saccade Protocols",
    items: [
      {
        name: "Eliminating Saccadic Dysmetria",
        desc: "Dysmetria occurs when the eyes either overshoot (hypermetria) or undershoot (hypometria) the intended target, requiring a corrective secondary saccade that wastes 80–120 ms (Leigh & Zee 2015). Regular target jumps calibrate cerebellar burst-step gain.",
        tips: "Focus on landing directly on the center pip of each flashing target before initiating a mouse or touch confirmation."
      },
      {
        name: "Head-Still Isolation Protocol",
        desc: "Many individuals inadvertently rotate their neck and head to follow target jumps rather than moving their extraocular muscles. True saccadic training requires isolating extraocular rectus muscles from cervical spine movement.",
        tips: "Rest your chin lightly in a resting hand or consciously stabilize your neck to ensure 100% ocular motor engagement."
      },
      {
        name: "Wide-Angle Visual Scanning",
        desc: "Targets in the Saccadic Gallery jump across large visual eccentricities (20°–45°). Practicing wide jumps activates the paramedian pontine reticular formation (PPRF) and superior colliculus, enhancing horizontal and oblique field scanning.",
        tips: "Use a full-screen browser viewport so targets leverage the full dimensions of your display."
      },
      {
        name: "Ocular Fatigue Prevention & 20-20-20 Rest",
        desc: "Extraocular muscles tire rapidly under repeated ballistic contractions. Prolonged unconditioned training can lead to asthenopia, transient blur, and increased latency variability.",
        tips: "Cap practice blocks at 3–5 minutes. After completing a drill, look at an object 20 feet away for at least 20 seconds to relax ciliary muscle tone."
      }
    ]
  },
  steps: [
    "Sit upright with your monitor directly at eye level and your head centered.",
    "Click Start Drill and focus on the initial center target marker.",
    "As targets illuminate across the zig-zag gallery, jump your eyes immediately to the new coordinate.",
    "Click or confirm the target the moment your fovea locks onto its center.",
    "Complete the sequence to review your median saccadic reaction time, spatial accuracy, and drift."
  ],
  audience: "Athletes seeking faster visual field awareness, individuals doing eye strain recovery exercises, esports competitors, and readers looking to improve scan efficiency.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('rayner1998', 'fischer1993', 'leigh2015', 'woods2015'),
  related: [
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/visual-tracking-speed-test", label: "Visual Tracking Speed Test" },
    { href: "/drills/reaction-speed/market-doors-pursuit", label: "Corner Checking Trainer" },
    { href: "/drills/reaction-speed/barrier-sequence-pursuit", label: "Jiggle Peek Trainer" }
  ]
};

export default function SaccadicGalleryPage() {
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
      <SaccadicGalleryWrapper />
      <DrillGuide guide={saccadicGalleryGuide} />
    </>
  );
}
