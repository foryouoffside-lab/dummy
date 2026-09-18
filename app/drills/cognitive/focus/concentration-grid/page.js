import ConcentrationGridClient from './ConcentrationGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — concentration-grid
// PRIMARY:  "concentration grid"             — Proven Bing Winner (pos 4.8, 127+ impr)
//           "schulte table"                  — High-intent global query
// SECONDARY / LSI:
//           "the concentration grid"         — Direct Bing top clicker
//           "concentration grid online"      — High-intent web query
//           "concentration grids"            — High volume plural query
//           "schulte table online"           — High-intent web query
//           "concentration grid test"        — Timed assessment search intent
//           "schulte table trainer"          — Specialized training tool query
//           "visual search test"             — Cognitive mechanism query
//           "tabela de schulte"              — Brazilian Portuguese target (pt-BR)
//           "tabla de schulte"               — Spanish target (es-ES)
//           "シュルテテーブル"                — Japanese target (ja-JP)
// ============================================================

export const metadata = {
  title: "Concentration Grid – Schulte Table Trainer | SkillDrills",
  description: "Train peripheral vision and visual search speed online. Tap sequential numbers on expanding Schulte tables and concentration grids. Free, no sign-up.",
  keywords: [
    "schulte table",
    "schulte table trainer",
    "concentration grid",
    "schulte table online",
    "concentration grid test",
    "concentration grid online",
    "visual search speed",
    "peripheral vision training",
    "schulte grid",
    "speed reading vision drill",
    "sequential number search",
    "focus training game",
    "free cognitive training",
    "saccadic eye movement training"
  ],
  openGraph: {
    title: "Concentration Grid – Schulte Table Trainer | SkillDrills",
    description: "Train peripheral vision and visual search speed online. Tap sequential numbers on expanding Schulte tables and concentration grids. Free, no sign-up.",
    type: "website",
    url: "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concentration Grid – Schulte Table Trainer | SkillDrills",
    description: "Train peripheral vision and visual search speed online. Tap sequential numbers on expanding Schulte tables and concentration grids. Free, no sign-up.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
    languages: getAlternateLanguages('/drills/cognitive/focus/concentration-grid'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
    { "@type": "ListItem", "position": 3, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 4, "name": "Schulte Table Trainer", "item": "https://skilldrills.online/drills/cognitive/focus/concentration-grid" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Schulte Table Trainer",
  "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
  "description": "An interactive web-based cognitive trainer that tests visual search speed and sustained attention by tapping sequential numbers on expanding grids.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-05",
  "educationalUse": ["Visual Search Speed", "Peripheral Span Expansion", "Saccadic Efficiency", "Sustained Attention"]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Schulte Table & Concentration Grid Trainer",
  "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "An interactive web-based cognitive trainer that tests visual search speed and sustained attention by tapping sequential numbers on expanding grids.",
  "genre": "Cognitive Training / Visual Search",
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train with Schulte Table & Concentration Grid",
  "description": "Step-by-step instructions for training visual search speed, peripheral vision, and sustained focus with expanding number grids.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid#step-1",
      "name": "Anchor Gaze at Grid Center",
      "text": "Position your eyes near the center of the display matrix. Maintain a soft visual focus rather than darting your fovea randomly across individual tiles."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid#step-2",
      "name": "Locate and Tap Numbers Sequentially",
      "text": "Find and tap each number in ascending order starting strictly from 1 (1, 2, 3...) as quickly as possible without hesitation."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid#step-3",
      "name": "Expand Parafoveal Vision",
      "text": "Use your peripheral vision to spot the locations of upcoming digits (e.g. locating 4 and 5 while tapping 3), chaining movements seamlessly."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid#step-4",
      "name": "Adapt to Expanding & Rotated Grids",
      "text": "Clearing each grid immediately expands the matrix (from 3x3 to 4x4 up to 8x8) and introduces rotational noise, testing visual search discipline within the 45-second clock."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Schulte Table and Concentration Grid drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Schulte Table is a classic psychodiagnostic test invented by Walter Schulte (1962) to assess visual search rate, attention allocation, and mental fatigue. The Concentration Grid is its sports psychology counterpart (Harris & Harris, 1984), challenging athletes to find sequential numbers under strict time pressure. SkillDrills unites both by providing expanding, dynamically rotated grids within a single 45-second continuous run."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill improve peripheral vision and speed reading?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By keeping your gaze anchored near the grid center and expanding your perceptual span (Rayner, 1998), you train your parafoveal visual field to recognize numeric features without moving your central fovea to every single tile. This reduces total saccadic fixations, a foundational skill in speed reading and situational athletic scanning."
      }
    },
    {
      "@type": "Question",
      "name": "Why do the numbers rotate at larger grid sizes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From the 5x5 grid onward, each number tile is rendered with slight random rotation. This removes reliance on familiar canonical bounding boxes and forces genuine top-down feature integration (Treisman & Gelade, 1980; Wolfe, 2007), keeping visual search difficulty climbing as grid density increases."
      }
    },
    {
      "@type": "Question",
      "name": "How is the performance score calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Score is awarded for each correct sequential tap with dynamic latency bonuses for sub-300ms reaction times. In addition, completing an entire grid awards a substantial clear bonus scaled by the grid dimension (e.g., 3x3, 4x4, 5x5...)."
      }
    },
    {
      "@type": "Question",
      "name": "Does the 45-second timer pause or reset between grids?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The drill operates on a single continuous 45-second clock with zero pauses, time refills, or deductions. Clearing a grid instantly loads the next larger dimension while the countdown continues uninterrupted, measuring sustained focus endurance."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I tap the wrong number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An incorrect tap flashes a red visual error warning and counts against your final accuracy percentage, but it does not end your session early or deduct seconds from your clock. Every session runs until the 45-second timer reaches zero."
      }
    },
    {
      "@type": "Question",
      "name": "What is considered an elite score on this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An elite (S+ Grade) score is 8,000+ points, which requires clearing through the 6x6 grid and advancing into 7x7+ matrices with sustained sub-300ms per-digit recognition and 98%+ accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "Who uses Schulte tables and concentration grids in real-world training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aviation academies, cosmonaut and military flight programs, Formula 1 drivers, tennis players, and esports competitors utilize grid scanning drills to sharpen rapid visual information processing, micro-saccadic precision, and mental focus under competitive pressure."
      }
    },
    {
      "@type": "Question",
      "name": "Can this drill diagnose ADHD or attentional disorders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. This drill is an athletic and educational cognitive performance trainer, not a medical or neuropsychological diagnostic tool. It does not screen for, treat, or prevent ADHD, dyslexia, or any cognitive condition. If you have medical concerns about attention, consult a certified clinical neuropsychologist."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Schulte Table Trainer free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Schulte Table Trainer on SkillDrills is 100% free with no registration, subscription fees, or software downloads required. It runs directly in any modern desktop or mobile browser with 60 FPS hardware acceleration."
      }
    }
  ]
};

// --- Guide Content ---

const concentrationGridGuide = {
  heading: "Schulte Table Trainer Guide & Visual Search Benchmarks",
  intro: [
    "The Schulte table is a seminal psychodiagnostic paradigm developed by German psychiatrist Walter Schulte (1962) to measure visual search efficiency, selective attention allocation, and mental fatigue resistance. In its traditional implementation, numbers from 1 to 25 are randomly dispersed across a 5x5 grid, requiring the subject to locate each numeral in strict ascending sequence while attempting to hold visual fixation near the grid center.",
    "In applied sports psychology, the exercise evolved into the 'concentration grid' (Harris & Harris, 1984), widely used by elite coaches in tennis, baseball, and motor sports to train visual scanning velocity and present-moment cognitive discipline under timed stress. An event-related potential study of 27 children aged 8-11 searching Schulte grids found that searching for numbers in sequence took longer than locating a single target, and that adding a second colour slowed both, with matching differences in the recorded ERP signal (Lu et al., 2022).",
    "The SkillDrills Schulte Table Trainer elevates this classic protocol into a modern dynamic continuous performance task. Rather than presenting an isolated static matrix, the drill dynamically expands the grid architecture from 3x3 up to 8x8 as each stage is completed, while introducing rotational perturbations from 5x5 onward. This tests the outer limits of your perceptual span and foveal-parafoveal coordination within a fixed 45-second window.",
    "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval, about 16.7 ms per frame at 60 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup.",
    "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work in the References panel below.",
    "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health. If you have concerns about your attention, memory or thinking, speak to a qualified clinician."
  ],
  benchmarks: {
    title: "Schulte Table & Grid Scanning Performance Tiers",
    headers: ["Grade Tier", "Score Range", "Peak Grid", "Search Latency", "Cognitive Classification"],
    rows: [
      ["S+ (Elite)", "8,000+ PTS", "7x7+ (49+ tiles)", "< 300 ms / target", "World-class visual scanning rate, exceptional peripheral span, and instant rotational invariance."],
      ["S (Master)", "6,000 – 7,999 PTS", "6x6 (36 tiles)", "300 – 450 ms / target", "Superior visual search efficiency; seamless parafoveal previewing and minimal fixation pause."],
      ["A (Advanced)", "4,500 – 5,999 PTS", "5x5 (25 tiles)", "450 – 600 ms / target", "Strong visual field processing; consistent paired chunking across medium-density matrices."],
      ["B (Proficient)", "3,000 – 4,499 PTS", "4x4 (16 tiles)", "600 – 800 ms / target", "Above-average search discipline; occasional central refixation pauses on larger grids."],
      ["C (Intermediate)", "1,800 – 2,999 PTS", "3x3 (9 tiles)", "800 – 1,100 ms / target", "Standard baseline performance; relies predominantly on central foveal saccades."],
      ["D (Developing)", "< 1,800 PTS", "3x3 (partial)", "> 1,100 ms / target", "Visual crowding interference; high saccadic count and slow target discrimination."]
    ],
    note: "These tiers serve as an editorial and literature-grounded reference framework (Lu et al., 2022; Treisman & Gelade, 1980; Rayner, 1998; Wolfe, 2007). Individual scores vary based on monitor refresh rate, mouse vs touch input, and ocular fatigue."
  },
  techniques: {
    title: "Evidence-Based Techniques for Peak Grid Performance",
    items: [
      {
        name: "Center Foveal Anchor with Soft Peripheral Focus",
        desc: "Do not chase each number with full-body eye saccades. Keep your primary gaze loosely anchored near the center of the grid, allowing your wider visual field to register candidate numbers simultaneously (Lu et al., 2022).",
        tips: "Avoid pinning your eyes to the screen corners; widen your attentional aperture."
      },
      {
        name: "Paired Sequential Chunking (Lookahead Technique)",
        desc: "Never search for one digit in isolation. If you spot '4' while looking for '3', store its spatial coordinate in visuospatial working memory. When '3' is tapped, immediately execute the planned saccade to '4' with zero latency (Rayner, 1998).",
        tips: "Maintain a mental map of 1-2 upcoming numbers to chain consecutive rapid taps."
      },
      {
        name: "Feature Integration & Guided Search (Wolfe, 2007)",
        desc: "Top-down cognitive expectations bias preattentive visual saliency maps (Wolfe, 2007; Treisman & Gelade, 1980). Holding the target digit's topological shape in active working memory primes visual cortex feature detectors to notice matching features ahead of random scanning.",
        tips: "Mentally visualize the next numeral's distinct geometry before scanning the board."
      },
      {
        name: "Rotational Invariance & Invariant Feature Extraction",
        desc: "Rotating number tiles disrupts canonical spatial orientation, preventing automatic shape template matching. The visual system must recruit ventral stream inferotemporal pathways to compute rotation-invariant representations.",
        tips: "Identify structural invariant landmarks (e.g. the loop of a 6/9, the horizontal crossbar of a 4)."
      }
    ]
  },
  steps: [
    "Anchor your gaze softly near the grid center to take in the full matrix.",
    "Locate '1' and tap it cleanly to start the sequential search chain.",
    "Look ahead: as you confirm the current target, scan your peripheral field for subsequent numbers.",
    "Advance through expanding grids: clear smaller boards swiftly to unlock larger 5x5, 6x6, and 7x7 layouts.",
    "Sustain visual discipline: navigate rotated number tiles without breaking your scanning rhythm across the full 45 seconds."
  ],
  audience: "Speed readers, competitive athletes, esports professionals, military/aviation candidates, and cognitive fitness enthusiasts seeking to widen peripheral visual span, improve visual search efficiency, and build mental focus stamina.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('lu2022', 'treisman1980', 'rayner1998', 'rayner2016', 'wolfe2007', 'woods2015'),
  related: [
    { href: "/drills/cognitive/attention/concentration-stamina", label: "Focus Test" },
    { href: "/drills/cognitive/attention/divided-attention", label: "Divided Attention Test" },
    { href: "/drills/cognitive/attention/multi-tasking", label: "Multitasking Test" },
    { href: "/drills/cognitive/focus/distraction-fighter", label: "Stroop Test Online" },
    { href: "/drills/cognitive/processing-speed/rsvp-reader", label: "Reading Speed Test" },
    { href: "/drills/cognitive/processing-speed/symbol-matching", label: "Symbol Digit Modalities Test" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "Neuro Speed & Reflex Test" }
  ]
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Concentration Grid – Schulte Table Trainer Online",
  "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
  "description": "Sequential number search on expanding Schulte tables and concentration grids. Train peripheral vision and visual search speed.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Cognitive Training", "Visual Search", "Schulte Table", "Concentration Grid"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const copyEn = {
  h1Keyword: "Concentration Grid",
  h1Suffix: " — Schulte Table Trainer Online",
};

export default function ConcentrationGridPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ConcentrationGridClient copy={copyEn} />
      <DrillGuide guide={concentrationGridGuide} />
    </>
  );
}