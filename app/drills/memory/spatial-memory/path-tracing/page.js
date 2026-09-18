import PathTracingClient from './PathTracingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Path Tracing Memory Test – Spatial Span Game | SkillDrills',
  description: 'Free path tracing memory test. Retrace step sequences on growing grids and measure your spatial span, the Corsi block-tapping skill.',
  keywords: [
    'path tracing memory test',
    'sequence memory test',
    'spatial sequence memory',
    'path memory test',
    'path recall test',
    'corsi block tapping test',
    'corsi block test online',
    'sequential memory test',
    'visual path memory',
    'path tracing drill',
    'sequence memory game',
    'route recall test',
    'spatial sequence recall',
    'path reproduction test',
    'visuomotor sequence learning',
    'spatial path memory',
    'how to train sequence memory',
    'visual sequential memory test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/path-tracing',
    languages: getAlternateLanguages('/drills/memory/spatial-memory/path-tracing'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Path Tracing Memory Test - Free Spatial Span Game',
    description: 'Train sequential spatial working memory with the Path Tracing Memory Test. Retrace progressive 3x3 to 7x7 dot trajectories, deploy directional vector chunking, and measure spatial span.',
    type: 'website',
    url: 'https://skilldrills.online/drills/memory/spatial-memory/path-tracing',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Path Tracing Memory Test - Free Spatial Span Game',
    description: 'Train sequential spatial working memory with the Path Tracing Memory Test. Retrace progressive 3x3 to 7x7 dot trajectories, deploy directional vector chunking, and measure spatial span.',
  },
};

export default function PathTracingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Memory Drills", "item": "https://skilldrills.online/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Spatial Memory", "item": "https://skilldrills.online/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "Path Tracing Memory Test", "item": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Path Tracing Memory Test",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript and HTML5 support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Interactive spatial sequence memory assessment measuring route tracing, directional chunking, and visuospatial working memory span on expanding matrix grids.",
    "dateModified": "2026-09-05"
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Path Tracing Memory Test",
    "url": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing",
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
    "name": "Path Tracing Memory Test",
    "description": "Interactive spatial sequence memory assessment measuring route tracing, directional chunking, and visuospatial working memory span on expanding matrix grids.",
    "url": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Sequence Memory"],
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
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Path Tracing Memory Test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Path Tracing Memory Test evaluates sequential visuospatial working memory and route reproduction. Users observe an animated sequence of illuminated tiles across a grid and must retrace the exact path in identical forward order."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Corsi Block-Tapping Test relate to path tracing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Corsi Block-Tapping Task (Corsi, 1972) is the foundational neuropsychological assessment for spatial span. Path tracing adapts this paradigm into a computerized matrix format where waypoints light up sequentially, measuring active dynamic trajectory encoding."
        }
      },
      {
        "@type": "Question",
        "name": "What cognitive faculty does sequential path memory measure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Path tracing tests the 'Inner Scribe' component of visuospatial working memory (Logie, 1995), which is responsible for retaining active movement sequences, spatial planning, and dynamic motor trajectories rather than static visual forms."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 'Inner Scribe' in working memory theory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Proposed by cognitive psychologist Robert H. Logie (1995), the Inner Scribe is an active spatial rehearsal mechanism that encodes movement transitions and sequential trajectories, distinct from the passive Visual Cache that stores static visual patterns."
        }
      },
      {
        "@type": "Question",
        "name": "What is an average adult spatial sequence memory span?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "According to normative Corsi block studies (Kessels et al., 2000, 2008), healthy adults achieve an average forward spatial span of 5.4 ± 0.9 items. Scores above 8 items represent superior visuospatial chunking."
        }
      },
      {
        "@type": "Question",
        "name": "How does directional vector chunking improve path recall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By compressing multiple individual step coordinates into continuous directional macro-vectors (such as 'two right, one up, diagonal left'), the user reduces cognitive load from six discrete units to two directional chunks, bypassing the 4-item capacity bottleneck."
        }
      },
      {
        "@type": "Question",
        "name": "How does path tracing differ from static grid pattern memorization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Static grid memorization (like the Visual Patterns Test) presents all lit cells simultaneously to test passive visual cache capacity. Path tracing requires temporal-order encoding: each step must be remembered in chronological sequence, requiring active sequential rehearsal."
        }
      },
      {
        "@type": "Question",
        "name": "Why do longer paths require hierarchical trajectory chunking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nelson Cowan's (2001) working memory model establishes a hard limit of 4 ± 1 unchunked items. Sequences extending to 7–12 steps exceed raw capacity and demand hierarchical grouping into geometric sub-paths to avoid rapid serial decay."
        }
      },
      {
        "@type": "Question",
        "name": "How does spatial sequence memory impact real-world navigation and gaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sequential spatial memory governs route navigation, recalling turn-by-turn directions, learning dance or athletic choreography, and memorizing patrol routes and tactical rotations in competitive gaming (e.g., MOBAs and FPS games)."
        }
      },
      {
        "@type": "Question",
        "name": "Can path tracing memory and route recall be improved with deliberate practice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Repeated training strengthens the efficiency of the inner scribe, automates directional chunking schemas, reduces saccadic flight hesitation, and enhances motor execution cadence under time constraints."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Sequential Spatial Memory with Path Tracing",
    "description": "Evidence-based 4-step execution strategy for mastering sequential route retention and expanding forward spatial span.",
    "step": [
      {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing#step-1",
        
        "name": "Fixate Initial Starting Dot & Anticipate Motion Trajectory",
        "text": "Anchor your gaze on the initial flashing coordinate. Rather than tracking individual tiles with rapid eye jumps, maintain parafoveal awareness across the matrix to perceive the global motion vector."
      },
      {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing#step-2",
        
        "name": "Group Discrete Steps into Directional Vector Chunks",
        "text": "Mentally compress sequential step coordinates into directional units (e.g., 'right-right-down' or 'L-shape'). Grouping adjacent steps into macro-vectors compresses working memory load below the 4-item threshold."
      },
      {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing#step-3",
        
        "name": "Rehearse Dynamic Route via the Inner Scribe",
        "text": "During the brief retention delay, trace the continuous movement trajectory internally using your motor cortex. Active spatial rehearsal prevents rapid memory trace decay."
      },
      {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing#step-4",
        
        "name": "Retrace the Sequence with Deliberate Motor Cadence",
        "text": "Tap the grid coordinates in exact forward sequence with a steady, rhythmic cadence. Avoid pauses that induce temporal decay, executing the full chunk in a single fluid motor burst."
      }
    ]
  };

  const pathTracingGuide = {
    intro: [
      "The Path Tracing Memory Test evaluates sequential visuospatial working memory, dynamic route retention, and directional trajectory reconstruction across progressive 3x3 to 7x7 matrix grids. Rooted in the pioneering neuropsychological Corsi Block-Tapping paradigm (Milner, 1971; Corsi, 1972) and Robert H. Logie's (1995) 'Inner Scribe' model, this assessment isolates active spatiotemporal movement encoding from static visual pattern storage.",
      "During each trial, an animated target illuminates across a sequence of matrix coordinates at standardized 500 ms intervals. Users must encode both spatial coordinates and temporal order, then faithfully retrace the entire route in exact chronological sequence under a 45-second testing window.",
      "In working memory architecture, Logie (1995) and Alan Baddeley (2000) identified that sequential movement is retained by the Inner Scribe, a dynamic spatial rehearsal loop. George A. Miller (1956) and Herbert A. Simon (1974) proved that sequential performance hinges on directional chunking, while Nelson Cowan (2001) established that unassisted focal working memory is limited to roughly 4 items.",
      "Standardized normative studies on computerized Corsi block tasks (Kessels et al., 2000) established the healthy adult forward spatial span at 5.4 ± 0.9 steps, showing that sequential retention is highly sensitive to cognitive fatigue, sleep, and executive function.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval, about 16.7 ms per frame at 60 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup.",
      "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work in the References panel below.",
      "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health or your memory in a clinical sense. If you have concerns about your memory or thinking, speak to a qualified clinician."
    ],
    benchmarks: {
      title: "Normative Spatial Path Sequence Span Benchmarks",
      headers: ["Performance Tier", "Span Range & Grid Scale", "Drill Score", "Cognitive Profile & Trajectory Retention"],
      rows: [
        ["Tier 1 (Superior / Clinical 99th Percentile)", "Span 10 – 14+ Steps (6x6–7x7 Grid)", "1,200+ Points", "Visuospatial sequential elite; decomposes complex multi-grid routes into 2–3 directional macro-vectors; flawless inner scribe trajectory buffering; rapid sub-400 ms tapping cadence"],
        ["Tier 2 (High Average / 85th–95th Percentile)", "Span 8 – 9 Steps (5x5–6x6 Grid)", "900 – 1,199 Points", "Exceeds normal population averages; executes robust spatial vector grouping (L-turns, diagonals, zigzag runs); resistant to serial interference; 400 – 600 ms cadence"],
        ["Tier 3 (Average Adult Baseline / 50th Percentile)", "Span 5 – 7 Steps (4x4–5x5 Grid)", "600 – 899 Points", "Normative adult baseline (Corsi, 1972; Kessels et al., 2000, 5.4 ± 0.9 span); comfortably manages 5–6 step sequences; begins dropping intermediate turn waypoints on 5x5 grids; 600 – 850 ms cadence"],
        ["Tier 4 (Low Average / Sequential Decay)", "Span 4 Steps (3x3–4x4 Grid)", "400 – 599 Points", "Operates near unchunked working memory boundary (Cowan, 2001); attempts to recall each dot coordinate independently without spatial vector chunking; 850 – 1,100 ms cadence"],
        ["Tier 5 (Impaired / Below Average Span)", "Span < 4 Steps (3x3 Grid)", "< 400 Points", "Rapid temporal trace decay; vulnerability to order transpositions; struggles to hold sequences beyond 3 steps across the retention delay; tapping cadence exceeding 1,100 ms"]
      ],
      note: "Span length and grid scale reflect maximum difficulty cleared in 45-second session; normative percentiles mapped to Corsi Block-Tapping standards (Corsi, 1972; Kessels et al., 2000; Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols to Expand Spatial Path Memory",
      items: [
        {
          name: "Directional Vector Chunking (Miller 1956; Simon 1974)",
          desc: "Mentally group discrete sequential steps into directional macro-vectors. For example, instead of remembering steps 1, 2, 3, 4, 5, encode the path as 'two steps East, one step North, two steps West'. Chunking reduces raw memory tokens by over 60%.",
          tips: "Look for geometric shapes like L-turns, triangles, and staircases rather than individual dots."
        },
        {
          name: "Kinesthetic Scribe Trajectory Pre-Planning (Logie 1995)",
          desc: "Engage the motor cortex during stimulus presentation by mentally tracing the continuous line connecting the tiles. Pre-activating motor planning circuits reinforces passive visual traces through active kinesthetic rehearsal.",
          tips: "Feel the movement in your hand before touching the screen."
        },
        {
          name: "Parafoveal Matrix Anchoring",
          desc: "Keep your central visual fixation anchored on the centroid of the grid rather than making rapid, jerky saccades to each illuminated cell. Parafoveal vision accurately tracks sequential vector motion without saccadic suppression lag.",
          tips: "Keep your head and eyes still, allowing the flashing dots to register across your visual field."
        },
        {
          name: "Rhythmical Cadence & Pacing",
          desc: "Retrace the recorded path with steady, rhythmic tapping. Hesitation between clicks allows temporal decay to erode later sequence waypoints. Tap the memorized vector in a single fluent motor burst.",
          tips: "Execute each path in an unbroken rhythmic sequence rather than hesitating between individual cells."
        }
      ]
    },
    steps: [
      "Fixate your gaze on the matrix centroid and watch the animated dot path sequence.",
      "Mentally chunk individual tile flashes into continuous directional vectors (e.g. 'right-up-right').",
      "During the brief retention delay, trace the continuous movement trajectory internally with the inner scribe.",
      "Retrace the exact coordinate sequence in identical forward order with fluid rhythmic tapping.",
      "Advance through progressive matrices from 3x3 to 7x7 to expand your sequential spatial span."
    ],
    audience: "Competitive gamers mastering patrol routes and ability rotations, STEM students, choreographers, drivers, and individuals seeking to expand sequential spatial working memory.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('corsi1972', 'milner1971', 'logie1995', 'cowan2001', 'baddeley2000', 'miller1956', 'simon1974', 'kessels2000', 'woods2015'),
    related: [
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Visual Memory Test" },
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
      <PathTracingClient
        copy={{
          h1Keyword: "Path Tracing Memory Test",
          h1Suffix: " - Free Spatial Span Game"
        }}
      />
      <DrillGuide guide={pathTracingGuide} />
    </>
  );
}
