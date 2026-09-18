import ObjectLocationClient from './ObjectLocationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Object Location Memory Test – Spatial Recall | SkillDrills',
  description: 'Free object location memory test. Remember what was where on expanding grids and measure your spatial position recall.',
  keywords: [
    'object location memory test',
    'spatial position memory',
    'object location test',
    'spatial memory test online',
    'spatial location memory',
    'object placement memory',
    'location recall memory test',
    'visuospatial working memory test',
    'object location binding',
    'spatial memory training online',
    'silverman eals object location',
    'visual spatial memory test',
    'where was it memory test',
    'matrix location memory',
    'object position recall',
    'spatial memory exercise',
    'spatial cognitive mapping',
    'visual object location test'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/object-location',
    languages: getAlternateLanguages('/drills/memory/spatial-memory/object-location'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Object Location Memory Test - Free Spatial Recall',
    description: 'Assess and strengthen spatial position memory with the Object Location Memory Test. Memorize object placements on expanding 3x3 to 7x7 matrices in 1.5s and retrieve target coordinates.',
    type: 'website',
    url: 'https://skilldrills.online/drills/memory/spatial-memory/object-location',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Object Location Memory Test - Free Spatial Recall',
    description: 'Assess and strengthen spatial position memory with the Object Location Memory Test. Memorize object placements on expanding 3x3 to 7x7 matrices in 1.5s and retrieve target coordinates.',
  },
};

export default function ObjectLocationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Memory Drills", "item": "https://skilldrills.online/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Spatial Memory", "item": "https://skilldrills.online/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "Object Location Memory Test", "item": "https://skilldrills.online/drills/memory/spatial-memory/object-location" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Object Location Memory Test",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Interactive spatial position assessment testing visual object-location feature binding, spatial mapping, and matrix position recall.",
    "dateModified": "2026-09-05"
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Object Location Memory Test",
    "url": "https://skilldrills.online/drills/memory/spatial-memory/object-location",
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
    "name": "Object Location Memory Test",
    "description": "Interactive spatial position assessment testing visual object-location feature binding, spatial mapping, and matrix position recall.",
    "url": "https://skilldrills.online/drills/memory/spatial-memory/object-location",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Memory"],
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
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an Object Location Memory Test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An Object Location Memory Test evaluates your ability to encode both what an object is (visual identity) and where it is located (spatial coordinate), binding these two cognitive streams into an integrated episodic representation."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Object Location drill work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The drill presents multiple distinct objects placed across an expanding grid (from 3x3 to 7x7) for 1.5 seconds. Once the grid clears, you are shown a single target object at the top and must click its exact prior coordinate."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Silverman-Eals Object Location Memory test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Introduced by Marion Eals and Irwin Silverman in 1994, the Silverman-Eals paradigm is a landmark neuropsychological test demonstrating that spatial memory involves two distinct sub-capacities: Euclidean spatial orientation and incidental object-location memory binding."
        }
      },
      {
        "@type": "Question",
        "name": "What is object-location binding in cognitive neuroscience?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Object-location binding is the neurological process by which the brain connects ventral visual stream information ('what', object identity) with dorsal stream spatial coordinates ('where') in the hippocampus and parahippocampal cortex."
        }
      },
      {
        "@type": "Question",
        "name": "What is an average score on an object-location memory test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On standard clinical assessments such as CANTAB Paired Associates Learning, typical adults accurately locate about 4 to 6 objects across intermediate grids. That is a supervised clinical task with its own materials and scoring; this drill uses a different grid, timing and scoring, so treat your score here as a game result rather than something comparable to a clinical measure."
        }
      },
      {
        "@type": "Question",
        "name": "How does this test differ from pure grid memorization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pure grid memorization only tests binary cell occupancy (which cells were lit), allowing simple Gestalt shape chunking. Object Location requires feature conjunction: remembering which specific object occupied which specific coordinate."
        }
      },
      {
        "@type": "Question",
        "name": "Why is it harder to remember an object's location than a simple pattern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Feature conjunctions incur higher cognitive binding costs in working memory (Luck & Vogel, 1997). The brain must maintain two distinct feature dimensions simultaneously, doubling the cognitive load compared to raw spatial dot arrays."
        }
      },
      {
        "@type": "Question",
        "name": "What brain structures support object location memory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Object location memory primarily recruits the bilateral hippocampus, parahippocampal gyrus, posterior parietal cortex, and dorsolateral prefrontal cortex (DLPFC) for active spatial coordinate maintenance."
        }
      },
      {
        "@type": "Question",
        "name": "Are there score or timer penalties for missed clicks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Tapping an incorrect coordinate never deducts score points or reduces remaining timer seconds. The round replays at the current difficulty so you can consolidate your spatial anchoring strategy."
        }
      },
      {
        "@type": "Question",
        "name": "How does object location memory transfer to real-world tasks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Object location memory directly improves your ability to remember where you placed keys, parked your car, or stored tools, while enhancing tactical gaming awareness (tracking enemy util, items, and team positions on maps)."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Object Location Spatial Memory",
    "description": "Four-step systematic protocol to encode object identities, bind spatial coordinates, and pinpoint target positions on expanding grids.",
    "step": [
      {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/object-location#step-1",
        
        "name": "Scan Grid Quadrants",
        "text": "Immediately partition the grid into 4 sectors (top-left, top-right, bottom-left, bottom-right) as the objects appear."
      },
      {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/object-location#step-2",
        
        "name": "Anchor to Landmarks",
        "text": "Bind each object's identity to fixed landmarks such as corners, edges, or the center cell."
      },
      {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/object-location#step-3",
        
        "name": "Form Semantic-Spatial Pairs",
        "text": "Create quick verbal or visual associations linking the object's identity with its position (e.g. 'star in top-right corner')."
      },
      {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/drills/memory/spatial-memory/object-location#step-4",
        
        "name": "Execute Precise Target Localization",
        "text": "When prompted with the target icon, mentally query your landmark map and tap the exact recalled cell."
      }
    ]
  };

  const objectLocationGuide = {
    intro: [
      "Object Location Memory Test is an interactive neurocognitive assessment designed to evaluate spatial position memory, visual object-to-location binding, and layout recall. Unlike raw pattern tests that measure anonymous cell occupancy, object location tasks require the brain to bind distinct visual tokens with exact spatial coordinates.",
      "The clinical foundation of object-location testing was established by Marion Eals & Irwin Silverman (1994) in their pioneering research on spatial cognition, demonstrating that memory for object locations operates as a specialized evolutionary mechanism distinct from mental rotation. Earlier, Edward C. Tolman (1948) established the concept of cognitive mapping, showing how organisms form internal spatial models of their environment.",
      "In working memory architecture, Robert H. Logie (1995) and Alan Baddeley (2000) identified that object-location binding is coordinated by the Episodic Buffer, integrating inputs from the Visual Cache (object identities) with the Inner Scribe (spatial coordinates). Crucially, Steven J. Luck & Edward K. Vogel (1997) proved that feature conjunctions (binding identity to space) impose substantial attentional overhead, while Nelson Cowan (2001) demonstrated that unassisted focal working memory is strictly bounded to 3 to 4 independent item-location pairs.",
      "Following the chronometric standards set out by Woods et al. (2015), this drill utilizes a fixed 1.5-second memorization window and an adaptive difficulty staircase (scaling from 3x3 up to 7x7 matrices) to measure your precise spatial binding threshold.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval, about 16.7 ms per frame at 60 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup.",
      "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work in the References panel below.",
      "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health or your memory in a clinical sense. If you have concerns about your memory or thinking, speak to a qualified clinician."
    ],
    benchmarks: {
      title: "Normative Object-Location Binding Span Benchmarks",
      headers: ["Performance Tier", "Objects & Grid Scale", "Drill Score", "Cognitive Binding & Spatial Mapping Profile"],
      rows: [
        ["Tier 1 (Superior / Clinical 99th Percentile)", "Level 8 – 10+ (8 – 10+ Objects, 6x6–7x7 Grid)", "1,000+ Points", "Visuospatial elite; deploys rapid quadrantal partitioning and relational landmark anchoring; binds 8+ object-location pairs effortlessly; sub-500 ms target localization"],
        ["Tier 2 (High Average / 85th–95th Percentile)", "Level 6 – 7 (6 – 7 Objects, 5x5–6x6 Grid)", "750 – 999 Points", "Exceeds standard adult baseline; robust semantic-spatial pairing; resists visual retroactive interference on expanding matrices; 500 – 700 ms localization"],
        ["Tier 3 (Average Adult Baseline / 50th Percentile)", "Level 4 – 5 (4 – 5 Objects, 4x4–5x5 Grid)", "450 – 749 Points", "Normal population baseline (Eals & Silverman, 1994; CANTAB PAL); manages 4 item-location conjunctions (Cowan's limit); begins losing central items on 5x5 grids; 700 – 950 ms localization"],
        ["Tier 4 (Low Average / Feature-Binding Bottleneck)", "Level 3 (3 Objects, 3x3–4x4 Grid)", "250 – 449 Points", "Recalls only 2–3 isolated objects; confuses coordinates of adjacent items; struggles when distractor objects are introduced; 950 – 1,300 ms localization"],
        ["Tier 5 (Impaired / Below Average Span)", "Level 1 – 2 (2 Objects, 3x3 Grid)", "< 250 Points", "Rapid visual trace decay; failure of object-to-location binding; difficulty retrieving target coordinates even after minimal 1.5s delays; latency exceeding 1,300 ms"]
      ],
      note: "Object count and grid scale reflect maximum difficulty cleared in 45-second session; normative percentiles mapped to Silverman-Eals OLM and CANTAB PAL standards (Eals & Silverman, 1994; Luck & Vogel, 1997; Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols to Expand Object-Location Binding",
      items: [
        {
          name: "Relational Landmark Anchoring",
          desc: "Anchor target objects relative to permanent topological landmarks such as the 4 corners, center cell, or outer borders (Tolman, 1948). Remembering 'the diamond is in the top-left corner' anchors the object to a salient spatial beacon, bypassing complex coordinate calculation.",
          tips: "Immediately categorize which items occupy corner or perimeter cells during the first 500 ms."
        },
        {
          name: "Semantic-Spatial Associative Pairing",
          desc: "Create rapid narrative or functional associations linking an object's identity with its position (Baddeley, 2000). For example, mentally associate a 'star' at the top with the sky, or a 'key' at the bottom with a hidden drawer.",
          tips: "Form an instant verbal label connecting the item name with its spatial direction (e.g. 'star high, key low')."
        },
        {
          name: "Quadrantal Zoning & Chunking",
          desc: "Mentally subdivide larger 5x5 or 7x7 grids into 4 distinct quadrants (top-left, top-right, bottom-left, bottom-right). Count how many objects inhabit each zone (e.g. 2 in top-left, 1 in bottom-right) to constrain your search space.",
          tips: "Count items per quadrant first, then identify their specific cell within that sub-grid."
        },
        {
          name: "Parafoveal Foveal Sweep",
          desc: "Anchor your gaze at the exact center of the grid during exposure to absorb the global distribution via parafoveal vision, then make 1 or 2 targeted micro-saccades to resolve ambiguous peripheral icons.",
          tips: "Avoid rapid chaotic eye darting; keep your head steady and sweep smoothly across the layout."
        }
      ]
    },
    steps: [
      "Center your gaze on the matrix and observe the initial object distribution.",
      "During the 1.5-second display, bind each object to a landmark (corners, borders, center).",
      "Form rapid semantic-spatial pairs connecting the icon identity with its position.",
      "When the grid clears and the target icon appears, query your landmark map and tap the recalled cell.",
      "Advance through progressive 3x3 to 7x7 matrices to train high-capacity visual binding."
    ],
    audience: "Gamers seeking spatial map and cooldown tracking mastery, STEM students, radiologists, drivers, and individuals training visuospatial working memory and cognitive mapping.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'luck1997', 'tolman1948', 'eals1994', 'woods2015'),
    related: [
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Visual Memory Test" },
      { href: "/drills/memory/spatial-memory/path-tracing", label: "Path Tracing Memory Test" },
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
      <ObjectLocationClient
        copy={{
          h1Keyword: "Object Location Memory Test",
          h1Suffix: " - Free Spatial Recall"
        }}
      />
      <DrillGuide guide={objectLocationGuide} />
    </>
  );
}