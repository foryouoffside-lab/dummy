import StrobeLatencyClient from './StrobeLatencyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — light-reaction (visual-light-reaction)
// PRIMARY:  "light reaction test"           — High-intent visual reflex query (~1,100 searches/mo)
//           "visual reflex test"            — Psychomotor and athletics reflex query
//           "visual reaction time test"     — Human performance testing benchmark
// SECONDARY / LSI:
//           "strobe reaction test"          — Strobe stimulus specific term
//           "flash reaction test"           — Instant optical stimulus term
//           "simple reaction time test"     — Classical mental chronometry term
//           "millisecond latency test"      — High-precision chronometry query
//           "visual reflex drill"           — Training-specific intent
//           "strobe latency test online"    — Direct browser query
//           "optical reaction test"         — Clinical vision science query
//           "reflex training drill"         — Athletic and gamer reflex workout
//           "visual reaction speed test"    — Direct testing query
// LOCALES:
//           ja: "光 反応 テスト" (Hikari Hanno Tesuto — Japanese visual reaction test)
//           ko: "빛 반응 속도 검사" (Bit Baneung Sokdo Geomsa — Korean optical reaction test)
//           de: "lichtreaktion test" (German light reaction speed test)
// ============================================================

export const metadata = {
  title: "Light Reaction Test - Free Online Visual Reflex Drill",
  description: "Free light reaction test. Measure simple visual reaction time in milliseconds against the 200-250 ms range typical of healthy adults. No sign-up.",
  keywords: [
    "light reaction test",
    "visual reflex test",
    "visual reaction time test",
    "strobe reaction test",
    "flash reaction test",
    "simple reaction time test",
    "millisecond latency test",
    "visual reflex drill",
    "strobe latency test online",
    "optical reaction test",
    "reflex training drill",
    "visual reaction speed test",
    "reaction time test online",
    "visual training online"
  ],
  openGraph: {
    title: "Light Reaction Test - Free Online Visual Reflex Drill | SkillDrills",
    description: "Measure simple visual reaction time and millisecond optic-motor latency with this free online Light Reaction reflex drill.",
    type: "website",
    url: "https://skilldrills.online/drills/visual/reaction-speed/light-reaction",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Light Reaction Test - Free Online Visual Reflex Drill | SkillDrills",
    description: "Train visual reflex speed, strobe onset latency, and simple reaction time online. Free browser-based Light Reaction drill.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/reaction-speed/light-reaction",
    languages: getAlternateLanguages('/drills/visual/reaction-speed/light-reaction'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "Light Reaction Reflex Test", "item": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Light Reaction Reflex Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Interactive visual reflex and simple reaction time test measuring millisecond optic-motor transduction latency and strobe detection speed.",
  "featureList": [
    "Millisecond reaction chronometry via the performance.now() API",
    "Dynamic difficulty scaling with progressively tightening strobe flash windows",
    "Anti-spam heuristic preventing false anticipation clicking",
    "Strict client-side local performance storage with zero telemetry"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Light Reaction Reflex Test — Online Visual Reaction Drill | SkillDrills",
  "alternateName": "Light Reaction Pro",
  "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction",
  "dateModified": "2026-09-05",
  "description": "Free online visual reflex test. Tap as fast as possible when the central target flashes white with millisecond response chronometry.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with HTML5 Canvas support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Simple Visual Reaction Time, Optic-Motor Latency, Neuromuscular Reflex Speed, Phototransduction Threshold, Strobe Latency Chronometry"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Light Reaction Reflex Test",
  "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction",
  "description": "Free light reaction reflex test. Measure simple visual reaction time and millisecond optical reflex latency online.",
  "genre": ["Action", "Reaction Speed", "Reflex Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take the Light Reaction Reflex Test",
  "dateModified": "2026-09-05",
  "description": "Step-by-step instructions to test and train simple visual reaction time and neuromuscular reflex latency using the Light Reaction strobe protocol.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Anchor Visual Gaze on the Center Reticle",
      "text": "Position your eyes directly on the dark central circular target, maintaining focused foveal attention without premature muscle tension.",
      "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Wait for the Unpredictable White Strobe Flash",
      "text": "Anticipate the strobe flash across randomized inter-stimulus delay intervals ranging from 300 ms to 2,500 ms.",
      "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute Instant Motor Click on Flash Onset",
      "text": "Click the canvas or press the Spacebar immediately upon the first photon flash (+150 PTS × Combo × Level multiplier).",
      "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Avoid Speculative Spam Clicking",
      "text": "Tapping before the flash or clicking rapidly triggers a 1.2-second anti-spam cooldown, enforcing genuine neuromuscular reaction.",
      "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction#step-4"
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
      "name": "What is the Light Reaction reflex test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Light Reaction reflex test is a high-precision simple visual reaction time (SRT) protocol. It measures the exact elapsed time in milliseconds from the moment a central visual stimulus flashes bright white to the moment the user initiates a motor response (clicking or tapping)."
      }
    },
    {
      "@type": "Question",
      "name": "What is an average visual reaction time in milliseconds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In healthy young adults, typical simple visual reaction time averages between 200 ms and 250 ms. Trained reflex athletes, martial artists, and competitive tactical esports players frequently register visual reaction times between 160 ms and 190 ms."
      }
    },
    {
      "@type": "Question",
      "name": "What physiological stages occur between seeing the light and clicking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visual reaction time involves four consecutive physiological stages: (1) retinal phototransduction (~20–40 ms as photons activate rhodopsin), (2) neural transmission along the optic nerve and LGN to visual cortex V1 (~30–50 ms), (3) cortical perceptual and motor decision processing in parietal and motor cortex (~50–80 ms), and (4) efferent corticospinal motor nerve conduction down to the finger flexor muscles (~30–50 ms)."
      }
    },
    {
      "@type": "Question",
      "name": "What is Piéron's Law and how does brightness affect reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Piéron's Law (Piéron, 1952; Pins & Bonnet, 1996) is an empirical psychophysical principle stating that reaction time decreases hyperbolically as visual stimulus luminance increases above background threshold. A stark white flash against a dark canvas triggers the highest retinal ganglion cell firing rate, yielding the lowest possible physiological sensory delay."
      }
    },
    {
      "@type": "Question",
      "name": "Why is auditory reaction time faster than visual reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auditory reaction time is consistently 30 ms to 50 ms faster than visual reaction time (averaging 140–160 ms vs 200–250 ms). This is because mechanical cochlear hair cell transduction takes only 1–3 ms, whereas biochemical retinal phototransduction requires 20–40 ms, and the auditory pathway to the brainstem involves fewer synapses."
      }
    },
    {
      "@type": "Question",
      "name": "Can simple visual reaction time be improved through training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Neuroplastic training strengthens corticospinal motor pathway excitability and optimizes covert attentional orienting (Posner, 1980). Action video game players demonstrate significantly faster visual reaction times without sacrificing motor accuracy compared to non-gamers (Dye, Green, & Bavelier, 2009)."
      }
    },
    {
      "@type": "Question",
      "name": "How does monitor refresh rate (60 Hz vs 144 Hz vs 240 Hz) affect reflex scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitor refresh rate directly controls display quantization delay. A 60 Hz display introduces up to 16.7 ms of display lag before the white frame appears. A 144 Hz monitor reduces this to 6.9 ms, and a 240 Hz monitor to 4.1 ms. Using a 1,000 Hz gaming mouse further eliminates polling jitter down to ~1 ms."
      }
    },
    {
      "@type": "Question",
      "name": "What causes false starts or spam-click cooldowns in this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tapping before the white strobe appears or clicking rhythmically faster than 3 times per second triggers an automated anti-spam heuristic. The drill pauses the strobe for a 1.2-second cooldown to ensure that scores reflect genuine neuromuscular reaction rather than speculative guessing."
      }
    },
    {
      "@type": "Question",
      "name": "How do sleep, caffeine, and fatigue impact millisecond reaction latency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sleep deprivation and mental fatigue can degrade visual reaction time by 30 ms to 80 ms due to reduced prefrontal alertness. Moderate caffeine consumption (100–200 mg) antagonizes adenosine receptors, temporarily improving simple visual reaction time by approximately 10 ms to 20 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Is this Light Reaction test completely free, and is my data private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Light Reaction Reflex Test on SkillDrills is 100% free with no account registration, subscriptions, or paywalls. All performance metrics, reaction times, and best scores are stored locally in your browser and are never transmitted to external analytics servers."
      }
    }
  ]
};

const lightReactionGuide = {
  heading: "Visual Reflex Chronometry & Simple Reaction Time Standards",
  intro: [
    "Simple reaction time (SRT) represents the elementary psychomotor latency between the sudden presentation of a solitary visual stimulus and the execution of an unconditioned motor release. In track sprinting, combat sports, motorsports, and competitive esports, millisecond differences in visual stimulus transduction govern defensive evasion, starting-block clearance, and immediate counter-play.",
    "The neuromuscular cascade underlying light reaction spans four distinct physiological stages: (1) retinal phototransduction (~20–40 ms as photons trigger rhodopsin isomerization), (2) afferent transmission along optic tract axons via the lateral geniculate nucleus to primary visual cortex V1 (~30–50 ms), (3) cortical perceptual and motor preparation within posterior parietal and supplementary motor areas (~50–80 ms), and (4) efferent corticospinal motor transmission descending the pyramidal tract to contract the digital flexor muscles (~30–50 ms), establishing the natural healthy baseline of ~200–250 ms (Kosinski, 2008; Jain et al., 2015; Shelton & Kumar, 2010).",
    "According to Piéron's Law (Piéron, 1952; Pins & Bonnet, 1996), reaction latency decreases as a hyperbolic function of stimulus luminance and contrast above background levels. This drill operationalizes Piéron's Law by projecting an ultra-high-contrast stark white strobe against an absorbing dark canvas, generating maximal transient ganglion cell depolarization to minimize sensory transduction overhead. Michael Posner's covert attention orienting paradigms (1980) and Daphne Bavelier's action video game studies (Dye, Green, & Bavelier, 2009) demonstrate that focused spatial anticipation can further compress cortical motor planning latency.",
    "Timing & Measurement Methodology: All visual presentations and user input releases are recorded client-side via the high-resolution performance.now() API. Hardware latency adds display frame quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz, ~4.1 ms at 240 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores, level progressions, and latency histories remain stored entirely in your local browser storage with zero external tracking."
  ],
  benchmarks: {
    title: "Visual reaction latency bands (editorial guide)",
    headers: ["Performance Band", "Mean Reaction Latency", "Score & Combo Threshold", "Neuromuscular & Reflex Profile"],
    rows: [
      ["Tier 1: Apex Neural Reflex", "< 180 ms Latency", "Score: 15,000+ | Combo 28x+", "Elite motor cortex excitability; optimal phototransduction and corticospinal conductivity found in pro esports and Olympic sprinters."],
      ["Tier 2: Superior Visual Reflex", "180 – 219 ms Latency", "Score: 10,500 – 14,999 | Combo 18x+", "Rapid optic-motor coupling; consistent sub-220ms latencies with minimal temporal drift across long sessions."],
      ["Tier 3: Solid Baseline Reflex", "220 – 259 ms Latency", "Score: 6,000 – 10,499 | Combo 10x+", "Healthy adult baseline; typical unprimed visual motor response with occasional variance under fatigue."],
      ["Tier 4: Moderate Response Delay", "260 – 319 ms Latency", "Score: 2,500 – 5,999 | Combo 5x+", "Extended cognitive processing latency; susceptible to display lag, ocular fatigue, or mild attention lapses."],
      ["Tier 5: Extended Latency / Developing", "> 320 ms Latency", "Score: < 2,500 | Combo < 5x", "High temporal hesitation; substantial sensory processing overhead or uncalibrated 60 Hz hardware delays."]
    ],
    note: "These tiers represent an editorial reference benchmark grounded in classical human mental chronometry and simple visual reaction psychophysics (Kosinski, 2008; Woods et al., 2015; Pins & Bonnet, 1996; Jain et al., 2015). Individual latencies vary with circadian phase, caffeine, physical arousal, and hardware refresh rates."
  },
  techniques: {
    title: "How to train visual reaction speed",
    items: [
      {
        name: "Foveal Pre-Activation & Centroid Anchoring",
        desc: "As established by Posner (1980) in spatial orienting studies, keeping the visual fovea rigidly locked on the center target location eliminates the 20–30 ms penalty required for covert spatial attentional shifts.",
        tips: "Fixate your visual focus solidly on the dark central circle; do not let your gaze wander to surrounding HUD elements while waiting for the strobe."
      },
      {
        name: "Piéron Contrast Optimization & Photoreceptor Priming",
        desc: "Pins & Bonnet (1996) verified that maximum luminance contrast produces the highest retinal ganglion firing frequencies, shortening sensory transduction time.",
        tips: "Dim ambient room lighting so your pupils dilate slightly, amplifying the perceptual intensity and physiological impact of the white strobe flash."
      },
      {
        name: "Isometric Finger Pre-Tensioning",
        desc: "Woods et al. (2015) observed that physical key travel and switch debounce introduce unnecessary mechanical latency when fingers are positioned above the input device.",
        tips: "Rest your fingertip directly on the mouse switch or touchscreen with light, relaxed pre-tension, ready to flex the muscle with zero air travel."
      },
      {
        name: "Hardware Polling & High-Refresh Calibration",
        desc: "A standard 60 Hz monitor introduces up to 16.7 ms of frame buffer delay, whereas a 240 Hz display cuts this delay down to 4.1 ms (Woods et al., 2015).",
        tips: "Run the drill on a 144 Hz or 240 Hz monitor with a 1,000 Hz polling gaming mouse to ensure physical reflexes are recorded without hardware interference."
      }
    ]
  },
  steps: [
    "Click Start Drill to initialize the 45-second Light Reaction session.",
    "Fixate your eyes solidly on the dark circular target at the center of the canvas.",
    "Wait patiently across randomized delay intervals (300 ms to 2,500 ms) without anticipating.",
    "Tap the screen, click your mouse, or press Spacebar the instant the target flashes bright white (+150 PTS × Multiplier).",
    "Review your final average reaction time, peak level, and accuracy grade at the end of the run."
  ],
  audience: "FPS and tactical esports players, martial artists, track and field sprinters, motorsports drivers, pilots, and individuals seeking to train visual motor reflex speed.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'pins1996', 'posner1980', 'jain2015', 'dye2009'),
  related: [
    { href: "/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go Impulse Test" },
    { href: "/drills/visual/depth-perception/distance-judgment", label: "Distance Judgment Depth Test" },
    { href: "/drills/visual/tracking-accuracy/moving-target", label: "Moving Target Intercept" },
    { href: "/drills/visual/tracking-accuracy/multiple-targets", label: "Multiple Object Tracking" },
    { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "Smooth Pursuit Tracker" },
    { href: "/drills/visual/visual-recognition/entropic-grid", label: "Entropic Grid Search" }
  ]
};

export default function StrobeLatencyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <StrobeLatencyClient copy={{ title: "Light Reaction Reflex Test" }} />
      <DrillGuide guide={lightReactionGuide} />
    </>
  );
}