import DigitSpanClient from './DigitSpanClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Digit Span Memory Test – Number Recall | SkillDrills",
  description: "Free digit span memory test. See how many numbers you can repeat back, and learn the chunking that stretches it past the usual limit.",
  keywords: [
    "digit span test",
    "digit span memory test",
    "forward digit span",
    "number memory test",
    "working memory test digit span",
    "wais digit span test",
    "short term memory test numbers",
    "digit span test online",
    "phonological loop digit span",
    "how to improve digit span",
    "数唱 検査",
    "숫자 기억 테스트"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/memory/short-term-memory/digit-span",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/digit-span'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Digit Span Memory Test – Number Recall | SkillDrills",
    description: "Measure and train numerical working memory with our free online Digit Span Memory Test. Master phonological chunking, test Miller's 7±2 limit, and build focus.",
    url: "https://skilldrills.online/drills/memory/short-term-memory/digit-span",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Digit Span Memory Test – Number Recall | SkillDrills",
    description: "Measure and train numerical working memory with our free online Digit Span Memory Test. Master phonological chunking, test Miller's 7±2 limit, and build focus.",
  },
};

export default function DigitSpanPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Memory Drills", "item": "https://skilldrills.online/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Short-Term Memory", "item": "https://skilldrills.online/drills/memory/short-term-memory" },
      { "@type": "ListItem", "position": 4, "name": "Digit Span", "item": "https://skilldrills.online/drills/memory/short-term-memory/digit-span" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Digit Span Memory Test",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free cognitive working memory assessment measuring forward numerical recall span, phonological loop capacity, and articulatory rehearsal speed.",
    "genre": "Cognitive Assessment / Working Memory",
    "url": "https://skilldrills.online/drills/memory/short-term-memory/digit-span",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Digit Span Memory Test",
    "url": "https://skilldrills.online/drills/memory/short-term-memory/digit-span",
    "description": "Free browser-based numerical digit span memory assessment with adaptive staircase progression and millisecond keystroke latency tracking.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Digit Span Memory Test",
    "description": "Free cognitive working memory assessment measuring forward numerical recall span, phonological loop capacity, and articulatory rehearsal speed.",
    "url": "https://skilldrills.online/drills/memory/short-term-memory/digit-span",
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
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Digit Span test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Digit Span test is a foundational neuropsychological assessment used to measure working memory capacity, verbal short-term memory, and attention. Test-takers observe or hear a sequence of numerical digits, hold them in immediate memory, and recall the exact sequence in forward order."
        }
      },
      {
        "@type": "Question",
        "name": "What is an average score on the Digit Span test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average adult forward digit span is between 5 and 7 digits (with a standard deviation of 1 to 2). Scoring 7 digits aligns with George A. Miller's classic 7 ± 2 benchmark, while scores of 9 or more reflect superior cognitive chunking capacity."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Forward and Backward Digit Span?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Forward Digit Span tests passive short-term storage and the phonological loop capacity. Backward Digit Span requires reversing the sequence before output, which demands active central executive manipulation and mental transformation, representing true working memory rather than passive holding."
        }
      },
      {
        "@type": "Question",
        "name": "What is the WAIS Digit Span subtest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Wechsler Adult Intelligence Scale (WAIS) includes Digit Span as a core subtest contributing to the Working Memory Index (WMI). It evaluates sequential processing, mental control, and freedom from distractibility."
        }
      },
      {
        "@type": "Question",
        "name": "How does the phonological loop affect digit span performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alan Baddeley's model shows that numbers are held in the phonological store ('inner ear') and maintained through sub-vocal articulatory rehearsal ('inner voice'). Because acoustic traces decay within approximately 1.5 to 2 seconds, rapid rehearsal speed directly dictates maximum recall span."
        }
      },
      {
        "@type": "Question",
        "name": "What is Miller's Law and the magical number 7?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formulated by psychologist George A. Miller in 1956, Miller's Law states that immediate human memory span is limited to approximately seven, plus or minus two items ($7 \\pm 2$). Modern cognitive models (Cowan, 2001) demonstrate that unchunked focal capacity is closer to 4 items, with higher spans achieved through chunking."
        }
      },
      {
        "@type": "Question",
        "name": "How does chunking improve digit span memory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chunking groups individual digits into meaningful, rhythmic multi-digit clusters (such as phone numbers: '839 - 241'). This recodes 6 individual items into 2 informational units, bypassing the 4-item cognitive bottleneck."
        }
      },
      {
        "@type": "Question",
        "name": "Why does the sequence length decrease after a mistake in this drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill utilizes a 1-up / 1-down adaptive staircase psychometric protocol. Decreasing sequence length following a mistake converges on your true performance threshold, preventing fatigue while maintaining optimal cognitive challenge."
        }
      },
      {
        "@type": "Question",
        "name": "Can playing Digit Span improve cognitive abilities and focus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regular digit span training strengthens sustained attentional control, reduces mind-wandering, accelerates mental processing speed, and trains the brain to deploy strategic chunking habits applicable to math, programming, and academic study."
        }
      },
      {
        "@type": "Question",
        "name": "Is this online Digit Span test free and browser-based?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SkillDrills Digit Span Memory Test is 100% free, runs client-side with zero installation or account requirements, and features millisecond-accurate digital latency measurement."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Forward Digit Span Memory",
    "description": "Step-by-step methodology to encode, rhythmically chunk, and accurately recall progressive numerical sequences.",
    "step": [
      {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/drills/memory/short-term-memory/digit-span#step-1",
        
        "name": "Encode the Presented Digit String",
        "text": "Focus centrally on the screen as the numerical string is presented during the 3-second memorization window."
      },
      {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/drills/memory/short-term-memory/digit-span#step-2",
        
        "name": "Apply Rhythmical Chunking in Triads",
        "text": "Group the digits into pairs or triplets (e.g., 3-digit clusters like phone numbers) to reduce cognitive load."
      },
      {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/drills/memory/short-term-memory/digit-span#step-3",
        
        "name": "Sustain Sub-Vocal Articulatory Loop Rehearsal",
        "text": "Sub-vocalize the sequence continuously in an internal loop to prevent trace decay across the phonological store."
      },
      {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/drills/memory/short-term-memory/digit-span#step-4",
        
        "name": "Enter the Sequence via Keyboard or Numpad",
        "text": "When the input prompt activates, type the digits in exact forward order with steady cadence before the phonological trace fades."
      }
    ]
  };

  const digitSpanGuide = {
    heading: "Digit Span Memory Test Guide & Working Memory Capacity",
    intro: [
      "Digit Span Memory Test is the premier neuropsychological assessment of verbal short-term memory, working memory span, and phonological processing capacity. Employed for over a century in cognitive psychology and clinical intelligence batteries, digit span measures the quantitative boundaries of the human mind's immediate holding buffer.",
      "The theoretical foundation of digit span began with George A. Miller's seminal 1956 paper, 'The Magical Number Seven, Plus or Minus Two', which identified human immediate memory span as approximately seven discrete informational items. David Wechsler (1939, 1955, 2008) incorporated forward, backward, and sequencing digit span into the Wechsler Adult Intelligence Scale (WAIS), establishing it as the clinical gold standard for the Working Memory Index (WMI).",
      "According to Alan Baddeley's multicomponent working memory model (Baddeley & Hitch, 1974; Baddeley, 1986, 2000), numerical strings are temporarily maintained in the Phonological Loop. The phonological store holds acoustic traces that decay within 1.5 to 2.0 seconds unless refreshed by the articulatory rehearsal component ('inner voice'). Furthermore, Nelson Cowan (2001, 2010) demonstrated that when rehearsal is controlled, pure unchunked focal capacity is strictly $4 \\pm 1$ items; reaching higher digit spans relies entirely on strategic chunking.",
      "Featuring high-precision digital chronometry (Woods et al., 2015), this drill tests your raw capacity and response cadence, converging on your true span through an adaptive psychometric staircase.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval, about 16.7 ms per frame at 60 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup.",
      "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work in the References panel below.",
      "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health or your memory in a clinical sense. If you have concerns about your memory or thinking, speak to a qualified clinician."
    ],
    benchmarks: {
      title: "Normative Digit Span & Working Memory Benchmarks",
      headers: ["Performance Tier", "Digit Span (Length)", "WAIS Scaled Equiv.", "Cognitive Storage & Processing Profile"],
      rows: [
        ["Tier 1 (Superior / Clinical 99th Percentile)", "Span 9 – 12+ Digits", "Scaled Score 16 – 19", "Mnemonic elite; executes 3-to-4 digit rhythmic clustering; flawless phonological loop maintenance; sub-350 ms per-key input cadence"],
        ["Tier 2 (High Average / 85th–95th Percentile)", "Span 7 – 8 Digits", "Scaled Score 12 – 15", "Reaches Miller's classic 7-item threshold; constructs stable binary/triplet chunks; robust against temporal decay; 350 – 500 ms cadence"],
        ["Tier 3 (Average Adult Baseline / 50th Percentile)", "Span 5 – 6 Digits", "Scaled Score 8 – 11", "Normal adult population average; manages basic paired chunking; begins encountering acoustic confusion and decay beyond 6 digits; 500 – 700 ms cadence"],
        ["Tier 4 (Low Average / Memory Bottleneck)", "Span 4 Digits", "Scaled Score 5 – 7", "Operates at Cowan's raw 4-item capacity limit; struggles when strings exceed 4 digits without vocal rehearsal; 700 – 950 ms cadence"],
        ["Tier 5 (Impaired / Below Average Span)", "Span 3 Digits", "Scaled Score 1 – 4", "Difficulty holding 3 sequential digits; high susceptibility to immediate decay and cognitive distraction; input cadence exceeding 950 ms"]
      ],
      note: "Digit span indicates maximum error-free string length; WAIS scaled score equivalence reflects adult normative standardization (Wechsler, 2008; Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols to Expand Digit Span Memory",
      items: [
        {
          name: "Phonetic Rhythm & Rhythmical Chunking",
          desc: "Divide continuous number strings into structured 3-digit clusters (e.g., '739 - 281 - 405') matching the prosody of telephone numbers (Miller, 1956). Grouping converts 9 independent digits into 3 manageable chunks, fitting comfortably within Cowan's 4-chunk bottleneck (Cowan, 2001).",
          tips: "Raise the mental pitch on the first digit of each triplet to establish distinct chunk boundaries."
        },
        {
          name: "Sub-Vocal Articulatory Loop Synchronization",
          desc: "Actively chant the numbers internally in a rapid, continuous loop (Baddeley, 1986). Because the acoustic trace in the phonological store fades in under 2 seconds, rapid articulatory rehearsal refreshes the signal before memory decay occurs.",
          tips: "Say digits as rapid multi-syllable phrases rather than isolated single digits."
        },
        {
          name: "Spatial Numpad Kinesthetic Path Association",
          desc: "Connect numeric strings to physical finger paths on the 3x3 numeric keypad layout (Logie, 1995). Translating abstract numbers into spatial strokes recruits motor cortex representations alongside auditory loops.",
          tips: "Visualize the geometric zigzag or column line drawn across the keypad as each number is shown."
        },
        {
          name: "Primacy-Recency Serial Position Buffering",
          desc: "Due to the serial position effect, early digits benefit from initial rehearsal (primacy), while the final 2 digits linger fresh in immediate echoic memory (recency). Concentrate conscious rehearsal on cementing the opening chunk, then pull the final digits from echoic memory.",
          tips: "Lock in the first 3-4 digits immediately; rely on auditory echo for the last 2 digits."
        }
      ]
    },
    steps: [
      "Center your gaze on the numeric display box and prepare for the 3-second presentation phase.",
      "As the digits appear, immediately divide them into 2 or 3-digit rhythmic groups.",
      "Chant the chunked sequence sub-vocally in a continuous loop to prevent phonological decay.",
      "When the input box activates, type or tap the digits decisively using the on-screen or hardware numpad.",
      "Allow the adaptive staircase to calibrate your current capacity and progressively expand your working memory boundaries."
    ],
    audience: "Students, professionals, cognitive fitness enthusiasts, and test candidates preparing for neuropsychological, civil service, or corporate evaluations (WAIS, Wonderlic) seeking to expand working memory capacity and mental focus.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'baddeley2000', 'logie1995', 'woods2015'),
    related: [
      { href: "/drills/memory/short-term-memory/color-sequence", label: "Color Memory Game" },
      { href: "/drills/memory/short-term-memory/word-recall", label: "Verbal Memory Test" },
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Visual Memory Test" },
      { href: "/drills/memory/spatial-memory/object-location", label: "Object Location Memory Test" },
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
      <DigitSpanClient
        copy={{
          h1Keyword: "Digit Span Memory Test",
          h1Suffix: " - Free Number Recall Game"
        }}
      />
      <DrillGuide guide={digitSpanGuide} />
    </>
  );
}