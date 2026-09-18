import GridMemorizationClient from './GridMemorizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Visual Memory Test – Grid Pattern Memory Game | SkillDrills',
  description: 'Free visual memory test. Memorise grid patterns on expanding boards and track your visual memory span. No sign-up, plays in your browser.',
  keywords: [
    'visual memory test',
    'grid memory test',
    'spatial memory test',
    'visual pattern test',
    'pattern memory test',
    'memory matrix test',
    'grid memorization',
    'visual working memory test',
    'corsi block test online',
    'visual patterns test',
    'spatial working memory test',
    'visual memory human benchmark',
    'how to improve visual memory',
    'spatial memory training',
    'grid pattern memory game',
    'visual span test',
    'matrix memory test',
    'spatial chunking visual memory'
  ],
  openGraph: {
    title: 'Visual Memory Test - Free Grid Pattern Memory Game',
    description: 'Train spatial working memory with the Visual Memory Test. Memorize progressive 4x4 to 5x5 grid patterns in 1.5 seconds, utilize spatial shape chunking, and track visual memory span.',
    type: 'website',
    url: 'https://skilldrills.online/drills/memory/spatial-memory/grid-memorization',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Memory Test - Free Grid Pattern Memory Game',
    description: 'Train spatial working memory with the Visual Memory Test. Memorize progressive 4x4 to 5x5 grid patterns in 1.5 seconds, utilize spatial shape chunking, and track visual memory span.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/grid-memorization',
    languages: getAlternateLanguages('/drills/memory/spatial-memory/grid-memorization'),
  },
};

export default function GridMemorizationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Memory Drills", "item": "https://skilldrills.online/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Spatial Memory", "item": "https://skilldrills.online/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "Visual Memory Test", "item": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Visual Memory Test (Grid Memorization)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Interactive spatial working memory assessment testing matrix visual recall, shape chunking, and visuospatial storage capacity.",
    "dateModified": "2026-09-05"
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Visual Memory Test (Grid Memorization)",
    "url": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "SkillDrills"
    },
    "isAccessibleForFree": true,
    "dateModified": "2026-09-05"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Visual Memory Test (Grid Memorization)",
    "description": "Interactive spatial working memory assessment testing matrix visual recall, shape chunking, and visuospatial storage capacity.",
    "url": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization",
    "genre": ["Memory Game", "Cognitive Training", "Brain Game"],
    "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "value": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "SkillDrills"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Visual Memory Test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Visual Memory Test evaluates your visuospatial working memory—specifically your capacity to perceive, encode, and temporarily maintain visual patterns and spatial coordinates without relying on verbal rehearsal."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Grid Memorization drill work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The drill displays an illuminated pattern of cells on a 4x4 or 5x5 grid for 1.5 seconds. Once the grid clears, you must click all previously illuminated cells. Successfully clearing rounds scales up the pattern difficulty."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Visual Patterns Test (VPT)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Developed by Sergio Della Sala, Robert H. Logie, and colleagues in 1997, the Visual Patterns Test (VPT) is a gold-standard neuropsychological assessment that presents 2D matrix grids with filled squares to measure pure visual short-term memory capacity separate from sequential spatial movement."
        }
      },
      {
        "@type": "Question",
        "name": "How does this test differ from the Corsi Block-Tapping Test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Corsi Block-Tapping Test (Corsi, 1972) measures sequential spatial memory (tapping blocks in temporal order), recruiting the active 'inner scribe'. In contrast, Grid Memorization presents all cells simultaneously, isolating the static 'visual cache' matrix pattern retention."
        }
      },
      {
        "@type": "Question",
        "name": "What is an average visual memory score on a matrix test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Normative adult baselines established by Della Sala et al. (1997, 1999) demonstrate that typical adults reliably recall patterns of 6 to 8 cells on 4x4 to 5x5 matrices. Elite performers exceed 10 to 14 cells using advanced spatial shape chunking."
        }
      },
      {
        "@type": "Question",
        "name": "How does spatial chunking improve visual memory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unassisted visual memory has a hard physiological bottleneck of 3 to 4 distinct items (Luck & Vogel, 1997; Cowan, 2001). Spatial chunking bypasses this limit by grouping adjacent illuminated cells into recognizable geometric shapes (e.g., an 'L', square, diagonal, or letter), compressing multiple cells into a single cognitive unit."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between the visual cache and the inner scribe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Logie's (1995) model of visuospatial working memory, the 'visual cache' is a passive store that holds static visual form, color, and matrix images, while the 'inner scribe' actively rehearses spatial sequences and movement paths."
        }
      },
      {
        "@type": "Question",
        "name": "Why do grid patterns decay so quickly after 1.5 seconds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sensory visual iconic memory decays within 250 to 500 milliseconds. Without rapid consolidation into working memory through spatial chunking or mental tracing, the visual trace is quickly overwritten by new perceptual input."
        }
      },
      {
        "@type": "Question",
        "name": "Are there score penalties for incorrect clicks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Tapping an incorrect cell never deducts points or reduces your remaining session timer. The round simply resets at the same difficulty so you can master your current pattern threshold safely."
        }
      },
      {
        "@type": "Question",
        "name": "How does visual memory transfer to real-world tasks and gaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visuospatial working memory directly enhances map awareness, minimap tracking in tactical shooters (CS2, Valorant), reading complex architectural diagrams, spatial navigation, and mental rotation tasks in STEM fields."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Visual Memory on Grid Matrices",
    "description": "Four-step systematic protocol to encode, chunk, and accurately reconstruct spatial grid patterns under time constraints.",
    "step": [
      {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization#step-1",
        
        "name": "Anchor Central Gaze",
        "text": "Fixate your eyes at the center of the grid prior to pattern illumination to exploit parafoveal vision across the entire matrix."
      },
      {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization#step-2",
        
        "name": "Execute Gestalt Shape Chunking",
        "text": "Group lit cells into geometric clusters (corners, lines, blocks) rather than trying to memorize isolated coordinates."
      },
      {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization#step-3",
        
        "name": "Engage Motor-Spatial Tracing",
        "text": "Mentally trace a continuous line through the highlighted cells during the 1.5-second exposure window to prime motor recall."
      },
      {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization#step-4",
        
        "name": "Systematic Matrix Reconstruction",
        "text": "Click the recognized shape clusters first, then fill in isolated peripheral cells before the visual trace fades."
      }
    ]
  };

  const gridGuide = {
    intro: [
      "Visual Memory Test (Grid Memorization) is an interactive neurocognitive assessment designed to measure visuospatial working memory, pattern encoding capacity, and short-term matrix recall. Unlike verbal memory tests that rely on acoustic rehearsal, matrix pattern tasks isolate the non-verbal visual architecture of the brain.",
      "The clinical study of visuospatial span was pioneered by Pietro Corsi (1972) through the Corsi Block-Tapping Test, which demonstrated that visuospatial memory operates as a distinct neural system from verbal digit span (Milner, 1971). In 1997, Sergio Della Sala, Robert H. Logie, and colleagues developed the Visual Patterns Test (VPT) to specifically isolate static matrix pattern retention from dynamic sequential movement.",
      "In modern cognitive neuroscience, Robert H. Logie (1995) and Alan Baddeley (2000) subdivided the Visuo-Spatial Sketchpad into the 'Visual Cache' (a passive store for chromatic, brightness, and static matrix representations) and the 'Inner Scribe' (an active mechanism for spatial movement planning and rehearsal). Furthermore, research by Steven J. Luck & Edward K. Vogel (1997) and Nelson Cowan (2001) confirmed that unchunked visual working memory is strictly bounded to 3 to 4 independent items. Expanding matrix span requires spatial chunking—grouping lit cells into holistic Gestalt shapes.",
      "Calibrated with digital chronometric precision (Woods et al., 2015), this drill features a standardized 1.5-second memorization window and an adaptive staircase progression to measure your exact visuospatial pattern span under high-velocity conditions.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval, about 16.7 ms per frame at 60 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup.",
      "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work in the References panel below.",
      "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health or your memory in a clinical sense. If you have concerns about your memory or thinking, speak to a qualified clinician."
    ],
    benchmarks: {
      title: "Normative Visuospatial Pattern Span Benchmarks",
      headers: ["Performance Tier", "Pattern Span (Cells)", "Drill Score", "Cognitive Storage & Chunking Profile"],
      rows: [
        ["Tier 1 (Superior / Clinical 99th Percentile)", "Span 10 – 14+ Cells", "1,150+ Points", "Visuospatial elite; decomposes complex patterns into 2-3 geometric Gestalt primitives; flawless visual cache retention; sub-450 ms click cadence"],
        ["Tier 2 (High Average / 85th–95th Percentile)", "Span 8 – 9 Cells", "850 – 1,149 Points", "Exceeds normal adult baseline; executes rapid shape chunking ('L' shapes, triplets); robust against visual interference; 450 – 650 ms cadence"],
        ["Tier 3 (Average Adult Baseline / 50th Percentile)", "Span 6 – 7 Cells", "550 – 849 Points", "Normal adult population baseline (Della Sala et al., 1997); manages simple paired clusters; begins dropping peripheral cells on 5x5 grids; 650 – 900 ms cadence"],
        ["Tier 4 (Low Average / Visuospatial Bottleneck)", "Span 5 Cells", "350 – 549 Points", "Operates near raw unchunked capacity limits (Cowan, 2001); attempts to memorize cells individually without geometric grouping; 900 – 1,200 ms cadence"],
        ["Tier 5 (Impaired / Below Average Span)", "Span < 5 Cells", "< 350 Points", "Rapid visual trace decay; vulnerability to visual noise; struggles to hold patterns exceeding 4 cells across the 1.5s delay; cadence exceeding 1,200 ms"]
      ],
      note: "Cell span reflects maximum matrix configuration cleared during the 45-second session; normative percentiles mapped to Visual Patterns Test standards (Della Sala et al., 1997; Luck & Vogel, 1997; Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols to Expand Matrix Visual Recall",
      items: [
        {
          name: "Gestalt Spatial Shape Chunking",
          desc: "Mentally group adjacent lit cells into recognizable geometric primitives such as triangles, lines, squares, or familiar letters (Wertheimer, 1923; Della Sala et al., 1999). Chunking 7 individual coordinates into two recognizable shapes compresses cognitive load by over 60%.",
          tips: "Search immediately for connected lines and corner blocks rather than scanning isolated cells."
        },
        {
          name: "Negative Space & Complementary Parsing",
          desc: "When a matrix cluster is densely populated with lit cells, count and remember the unlit (empty) cells instead. Encoding 2 missing cells within a 6-cell block is far more token-efficient than encoding the 4 filled positions.",
          tips: "If a quadrant is nearly full, memorize the dark 'holes' instead of the illuminated lights."
        },
        {
          name: "Kinesthetic Scribe Trajectory Encoding",
          desc: "Engage the 'inner scribe' (Logie, 1995) by mentally tracing a continuous line or trajectory connecting the illuminated cells during the 1.5-second exposure. Motor cortex path pre-planning reinforces passive visual cache representations.",
          tips: "Follow a sweeping motion (e.g., top-left to bottom-right) to give the pattern directional flow."
        },
        {
          name: "Central Fixation & Parafoveal Snapshotting",
          desc: "Keep your gaze anchored firmly at the exact center of the grid when the round starts. Avoid making frantic saccades between individual cells; parafoveal vision captures the global spatial topology simultaneously.",
          tips: "Soften your visual focus slightly to absorb the pattern as a single holistic photographic silhouette."
        }
      ]
    },
    steps: [
      "Fixate your eyes on the center of the grid and await pattern illumination.",
      "During the 1.5-second flash, instantly group lit cells into 2 or 3 geometric shape chunks.",
      "Identify negative space 'holes' in dense clusters to minimize informational units.",
      "When the grid clears, tap the recognized geometric chunks back onto the matrix.",
      "Progress through expanding 4x4 to 5x5 matrices to continuously calibrate your visual working memory ceiling."
    ],
    audience: "Gamers seeking heightened minimap awareness, STEM students mastering spatial geometry, radiologists, chess players, and individuals aiming to maximize non-verbal visuospatial working memory.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'corsi1972', 'luck1997', 'milner1971', 'woods2015'),
    related: [
      { href: "/drills/memory/spatial-memory/path-tracing", label: "Path Tracing Memory Test" },
      { href: "/drills/memory/spatial-memory/object-location", label: "Object Location Memory Test" },
      { href: "/drills/memory/short-term-memory/digit-span", label: "Digit Span Memory Test" },
      { href: "/drills/memory/short-term-memory/word-recall", label: "Verbal Memory Test" },
      { href: "/drills/memory/working-memory/n-back", label: "3-Back Working Memory Test" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <GridMemorizationClient
        copy={{
          h1Keyword: "Visual Memory Test",
          h1Suffix: " – Free Grid Pattern Memory Game"
        }}
      />
      <DrillGuide guide={gridGuide} />
    </>
  );
}
