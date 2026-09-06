import PathTracingClient from './PathTracingClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Path Tracing Memory Test - Free Spatial Span Game',
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
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/path-tracing',
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
        "name": "Fixate Initial Starting Dot & Anticipate Motion Trajectory",
        "text": "Anchor your gaze on the initial flashing coordinate. Rather than tracking individual tiles with rapid eye jumps, maintain parafoveal awareness across the matrix to perceive the global motion vector."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Group Discrete Steps into Directional Vector Chunks",
        "text": "Mentally compress sequential step coordinates into directional units (e.g., 'right-right-down' or 'L-shape'). Grouping adjacent steps into macro-vectors compresses working memory load below the 4-item threshold."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Rehearse Dynamic Route via the Inner Scribe",
        "text": "During the brief retention delay, trace the continuous movement trajectory internally using your motor cortex. Active spatial rehearsal prevents rapid memory trace decay."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Retrace the Sequence with Deliberate Motor Cadence",
        "text": "Tap the grid coordinates in exact forward sequence with a steady, rhythmic cadence. Avoid pauses that induce temporal decay, executing the full chunk in a single fluid motor burst."
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <PathTracingClient />

      <DrillGuide
        lead={[
          "The Path Tracing Memory Test evaluates sequential visuospatial working memory, dynamic route retention, and directional trajectory reconstruction across progressive 3x3 to 7x7 matrix grids. Rooted in the pioneering neuropsychological Corsi Block-Tapping paradigm (Milner, 1971; Corsi, 1972) and Robert H. Logie's (1995) 'Inner Scribe' model, this assessment isolates active spatiotemporal movement encoding from static visual pattern storage.",
          "During each trial, an animated target illuminates across a sequence of matrix coordinates at standardized 500 ms intervals. Users must encode both spatial coordinates and temporal order, then faithfully retrace the entire route in exact chronological sequence under a 45-second testing window.",
          "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval, about 16.7 ms per frame at 60 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware.",
          "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work in the References panel below.",
          "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health. If you have concerns about your memory or thinking, speak to a qualified clinician."
        ]}
        metrics={[
          {
            label: "Max Sequential Path Span",
            desc: "The longest error-free path sequence accurately retraced (normative adult forward span: 5–7 steps)."
          },
          {
            label: "Total Drill Score",
            desc: "Cumulative points acquired over 45 seconds (+150 PTS per completed path sequence without negative penalties)."
          },
          {
            label: "Mean Step Inter-Tap Latency",
            desc: "Millisecond interval between sequential tile taps reflecting motor-spatial retrieval speed."
          },
          {
            label: "Sequential Route Accuracy",
            desc: "Percentage of correct coordinate clicks versus false-target transpositions across the session."
          }
        ]}
        benchmarks={[
          {
            tier: "Tier 1: Superior Spatial Memory (Sequential Elite / 99th Percentile)",
            range: "Span 10 – 14+ Steps (1,200+ Points)",
            desc: "Visuospatial sequential elite; decomposes complex multi-grid routes into 2–3 directional macro-vectors; flawless inner scribe trajectory buffering; rapid sub-400 ms tapping cadence."
          },
          {
            tier: "Tier 2: High Average (Strong Trajectory Encoding / 85th–95th Percentile)",
            range: "Span 8 – 9 Steps (900 – 1,199 Points)",
            desc: "Exceeds normal population averages; executes robust spatial vector grouping (L-turns, diagonals, zigzag runs); resistant to serial interference; 400 – 600 ms cadence."
          },
          {
            tier: "Tier 3: Average Adult Baseline (50th Percentile Normal)",
            range: "Span 5 – 7 Steps (600 – 899 Points)",
            desc: "Normative adult baseline (Corsi, 1972; Kessels et al., 2000, 5.4 ± 0.9 span); comfortably manages 5–6 step sequences; begins dropping intermediate turn waypoints on 5x5 grids; 600 – 850 ms cadence."
          },
          {
            tier: "Tier 4: Low Average (Sequential Decay / 15th–30th Percentile)",
            range: "Span 4 Steps (400 – 599 Points)",
            desc: "Operates near unchunked working memory boundary (Cowan, 2001); attempts to recall each dot coordinate independently without spatial vector chunking; 850 – 1,100 ms cadence."
          },
          {
            tier: "Tier 5: Impaired / Below Average (< 15th Percentile)",
            range: "Span < 4 Steps (< 400 Points)",
            desc: "Rapid temporal trace decay; vulnerability to order transpositions; struggles to hold sequences beyond 3 steps across the retention delay; tapping cadence exceeding 1,100 ms."
          }
        ]}
        science={[
          {
            title: "Pietro Corsi (1972) Block-Tapping Test & Spatial Span",
            body: "The Corsi Block-Tapping Task (Milner, 1971; Corsi, 1972) is the cornerstone of clinical neuropsychology for measuring non-verbal spatial working memory span. Corsi proved that forward spatial span operates independently of phonological digit span, demonstrating anatomical dissociation between temporal-lobe auditory buffers and parietal-frontal spatial circuits."
          },
          {
            title: "Robert H. Logie (1995, 2003) & Alan Baddeley (2000): The Inner Scribe",
            body: "Logie subdivided the Visuo-Spatial Working Memory (VSWM) sketchpad into the passive Visual Cache (responsible for static visual form, matrix colors, and patterns) and the active Inner Scribe. The Inner Scribe serves as a dynamic spatial rehearsal mechanism that retains active movement trajectories, kinesthetic sequences, and temporal path progressions."
          },
          {
            title: "Nelson Cowan (2001, 2010): Working Memory Capacity Limits (4 ± 1)",
            body: "Cowan established that focal working memory without chunking is constrained to 4 ± 1 items. When sequential paths exceed 4 steps, retention decays precipitously unless individuals organize the discrete steps into integrated directional chunks."
          },
          {
            title: "George A. Miller (1956) & Herbert A. Simon (1974): Directional Vector Chunking",
            body: "Sequential memory relies on hierarchical recoding. In path tracing, top performers do not encode coordinates as independent (x, y) coordinates; instead, they encode directional vectors ('up 2, right 1, down 2'), effectively compressing long routes into 2 or 3 manageable cognitive tokens."
          },
          {
            title: "F. Kessels et al. (2000, 2008): Computerized Norms & Spatial Aging",
            body: "Standardized normative studies on computerized Corsi block tasks established the adult forward spatial span at 5.4 ± 0.9 steps. Kessels and colleagues showed that spatial sequence retention is sensitive to cognitive fatigue, sleep deprivation, and prefrontal executive function."
          },
          {
            title: "David L. Woods et al. (2015): Chronometric Test Standards",
            body: "Woods et al. set out the timing standards for browser-based neurocognitive testing, and their finding runs the other way from the usual marketing claim: the display quantizes every stimulus to its own refresh interval — about 16.7 ms at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz — and browser clocks are deliberately coarsened to roughly 1 ms as a Spectre mitigation. This drill therefore holds each step at a fixed 500 ms exposure, which is long relative to that jitter, and you should compare your own runs on the same hardware rather than against someone else's setup."
          }
        ]}
        protocols={[
          {
            title: "Directional Vector Chunking (Miller 1956; Simon 1974)",
            body: "Mentally group discrete sequential steps into directional macro-vectors. For example, instead of remembering steps 1, 2, 3, 4, 5, encode the path as 'two steps East, one step North, two steps West'. Chunking reduces raw memory tokens by over 60%."
          },
          {
            title: "Kinesthetic Scribe Trajectory Pre-Planning (Logie 1995)",
            body: "Engage the motor cortex during stimulus presentation by mentally tracing the continuous line connecting the tiles. Pre-activating motor planning circuits reinforces passive visual traces through active kinesthetic rehearsal."
          },
          {
            title: "Parafoveal Matrix Anchoring",
            body: "Keep your central visual fixation anchored on the centroid of the grid rather than making rapid, jerky saccades to each illuminated cell. Parafoveal vision accurately tracks sequential vector motion without saccadic suppression lag."
          },
          {
            title: "Rhythmical Cadence & Pacing",
            body: "Retrace the recorded path with steady, rhythmic tapping. Hesitation between clicks allows temporal decay to erode later sequence waypoints. Tap the memorized vector in a single fluent motor burst."
          }
        ]}
        // Works named in this page's copy, with DOIs so a reader or an answer
        // engine can check the figures rather than take them on trust.
        sources={pickSources('corsi1972', 'milner1971', 'logie1995', 'cowan2001', 'baddeley2000', 'miller1956', 'simon1974', 'woods2015')}
        faqs={[
          {
            q: "What is the Path Tracing Memory Test?",
            a: "The Path Tracing Memory Test evaluates sequential visuospatial working memory and route reproduction. Users observe an animated sequence of illuminated tiles across a grid and must retrace the exact path in identical forward order."
          },
          {
            q: "How does the Corsi Block-Tapping Test relate to path tracing?",
            a: "The Corsi Block-Tapping Task (Corsi, 1972) is the foundational neuropsychological assessment for spatial span. Path tracing adapts this paradigm into a computerized matrix format where waypoints light up sequentially, measuring active dynamic trajectory encoding."
          },
          {
            q: "What cognitive faculty does sequential path memory measure?",
            a: "Path tracing tests the 'Inner Scribe' component of visuospatial working memory (Logie, 1995), which is responsible for retaining active movement sequences, spatial planning, and dynamic motor trajectories rather than static visual forms."
          },
          {
            q: "What is the 'Inner Scribe' in working memory theory?",
            a: "Proposed by cognitive psychologist Robert H. Logie (1995), the Inner Scribe is an active spatial rehearsal mechanism that encodes movement transitions and sequential trajectories, distinct from the passive Visual Cache that stores static visual patterns."
          },
          {
            q: "What is an average adult spatial sequence memory span?",
            a: "According to normative Corsi block studies (Kessels et al., 2000, 2008), healthy adults achieve an average forward spatial span of 5.4 ± 0.9 items. Scores above 8 items represent superior visuospatial chunking."
          },
          {
            q: "How does directional vector chunking improve path recall?",
            a: "By compressing multiple individual step coordinates into continuous directional macro-vectors (such as 'two right, one up, diagonal left'), the user reduces cognitive load from six discrete units to two directional chunks, bypassing the 4-item capacity bottleneck."
          },
          {
            q: "How does path tracing differ from static grid pattern memorization?",
            a: "Static grid memorization (like the Visual Patterns Test) presents all lit cells simultaneously to test passive visual cache capacity. Path tracing requires temporal-order encoding: each step must be remembered in chronological sequence, requiring active sequential rehearsal."
          },
          {
            q: "Why do longer paths require hierarchical trajectory chunking?",
            a: "Nelson Cowan's (2001) working memory model establishes a hard limit of 4 ± 1 unchunked items. Sequences extending to 7–12 steps exceed raw capacity and demand hierarchical grouping into geometric sub-paths to avoid rapid serial decay."
          },
          {
            q: "How does spatial sequence memory impact real-world navigation and gaming?",
            a: "Sequential spatial memory governs route navigation, recalling turn-by-turn directions, learning dance or athletic choreography, and memorizing patrol routes and tactical rotations in competitive gaming (e.g., MOBAs and FPS games)."
          },
          {
            q: "Can path tracing memory and route recall be improved with deliberate practice?",
            a: "Yes. Repeated training strengthens the efficiency of the inner scribe, automates directional chunking schemas, reduces saccadic flight hesitation, and enhances motor execution cadence under time constraints."
          }
        ]}
        related={[
          {
            href: "/drills/memory/spatial-memory/grid-memorization",
            title: "Visual Memory Test",
            desc: "Memorize static 2D checkerboard matrix patterns and test visual cache capacity."
          },
          {
            href: "/drills/memory/spatial-memory/object-location",
            title: "Object Location Memory Test",
            desc: "Test spatial relational binding and object placement across multi-quadrant maps."
          },
          {
            href: "/drills/memory/short-term-memory/color-sequence",
            title: "Color Memory Game",
            desc: "Recall progressive sequences of flashing colors under escalating speeds."
          },
          {
            href: "/drills/memory/working-memory/n-back",
            title: "Dual N-Back Working Memory",
            desc: "The gold standard clinical assessment for continuous working memory updating."
          },
          {
            href: "/drills/memory/short-term-memory/digit-span",
            title: "Digit Span Memory Test",
            desc: "Evaluate forward numerical memory capacity and phonological loop rehearsal."
          },
          {
            href: "/drills/memory/short-term-memory/word-recall",
            title: "Verbal Memory Test",
            desc: "Measure immediate verbal recall and semantic clustering under time constraints."
          }
        ]}
      />
    </>
  );
}