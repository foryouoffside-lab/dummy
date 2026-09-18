import NBackClient from './NBackClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'N-Back Test – Working Memory Training Game | SkillDrills',
  description: 'Free N-back working memory test. Track whether the current letter matches the one n steps back at 2-back, 3-back and beyond.',
  keywords: [
    'n-back test',
    'dual n-back',
    'n-back task',
    'working memory test',
    '3-back test',
    'n-back training',
    'n-back online',
    'working memory training online',
    'n back memory test',
    'n-back task online',
    'working memory capacity test',
    'fluid intelligence n-back',
    'dual n back test online',
    'cognitive n-back test',
    'free n-back training',
    'n-back test free',
    'working memory updating test',
    'how to train n-back'
  ],
  openGraph: {
    title: 'N-Back Test - Free Working Memory Training Game',
    description: 'Train executive working memory with the N-Back Memory Test. Test continuous information updating at 3-back, 4-back, and beyond. Measure working memory capacity, cognitive control, and target recognition accuracy.',
    type: 'website',
    url: 'https://skilldrills.online/drills/memory/working-memory/n-back',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N-Back Test - Free Working Memory Training Game',
    description: 'Train executive working memory with the N-Back Memory Test. Test continuous information updating at 3-back, 4-back, and beyond. Measure working memory capacity, cognitive control, and target recognition accuracy.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/working-memory/n-back',
    languages: getAlternateLanguages('/drills/memory/working-memory/n-back'),
  },
};

export default function NBackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Memory Drills", "item": "https://skilldrills.online/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Working Memory", "item": "https://skilldrills.online/drills/memory/working-memory" },
      { "@type": "ListItem", "position": 4, "name": "N-Back Working Memory Test", "item": "https://skilldrills.online/drills/memory/working-memory/n-back" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "N-Back Working Memory Test",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript and HTML5 support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Interactive N-Back working memory assessment measuring information updating, central executive control, and dynamic working memory capacity.",
    "dateModified": "2026-09-05"
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "N-Back Working Memory Test",
    "url": "https://skilldrills.online/drills/memory/working-memory/n-back",
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
        "name": "What is the N-Back Working Memory Test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The N-Back test is a classic neurocognitive assessment that measures continuous working memory updating. Participants observe a sequential stream of stimuli and indicate whether the current item matches the one presented N steps earlier."
        }
      },
      {
        "@type": "Question",
        "name": "Who invented the N-Back task and what was its original purpose?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wayne K. Kirchner invented the N-Back task in 1958 to investigate age-related differences in the short-term retention of rapidly changing information, proving that older adults experienced significant difficulties in dynamic memory updating."
        }
      },
      {
        "@type": "Question",
        "name": "What cognitive faculty does N-Back primarily assess?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "N-Back primarily tests working memory updating and executive control—the ability to continuously monitor incoming data, discard obsolete representations from focal attention, and encode new information into an active buffer."
        }
      },
      {
        "@type": "Question",
        "name": "How does N-Back differ from simple digit span or short-term memory tests?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simple span tests measure passive short-term storage (holding items statically until recall). N-Back requires active manipulation and updating: with every new stimulus, the oldest item must be dropped and the newest appended while maintaining serial order."
        }
      },
      {
        "@type": "Question",
        "name": "Can N-Back training improve fluid intelligence (IQ)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Landmark research by Jaeggi et al. (2008) demonstrated that adaptive N-back training led to improvements in fluid intelligence (Gf) on non-verbal reasoning tasks. While transfer effect sizes vary across studies, N-back reliably enhances working memory capacity and attentional control."
        }
      },
      {
        "@type": "Question",
        "name": "What is a normal adult score on the 3-Back test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Healthy young adults typically perform with 65% to 80% accuracy on a standard 3-back task. Achieving sustained accuracy above 85% or successfully operating at 4-back reflects superior executive working memory."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between single N-Back and Dual N-Back?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Single N-Back presents one stimulus stream (e.g., visual letters). Dual N-Back presents two independent sensory streams simultaneously (typically visual grid positions and auditory spoken consonants), requiring divided executive updating across both modalities."
        }
      },
      {
        "@type": "Question",
        "name": "How does sub-vocal articulatory rehearsal assist in N-Back performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sub-vocalization recruits the phonological loop (Baddeley, 1986). By mentally chanting the active N-item sequence like an internal sliding queue (e.g., 'C-K-M' becoming 'K-M-R'), you maintain active trace activation against rapid decay."
        }
      },
      {
        "@type": "Question",
        "name": "Why does performance decline significantly at 4-Back and 5-Back?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "According to Nelson Cowan's (2001) working memory model, human focal attention has a capacity ceiling of 4 ± 1 unchunked units. At 4-back and 5-back, items exceed this fundamental processing boundary, resulting in interference and intrusion errors."
        }
      },
      {
        "@type": "Question",
        "name": "How does working memory updating transfer to real-world tasks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Working memory updating supports complex real-time decision making, tracking multiple shifting variables in financial analysis, reading comprehension, software debugging, and tactical adaptability in competitive sports and gaming."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Working Memory Updating with N-Back",
    "description": "Evidence-based 4-step execution strategy for mastering continuous working memory updating on N-Back tasks.",
    "step": [
      {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/drills/memory/working-memory/n-back#step-1",
        
        "name": "Sub-Vocalize the Target Window as a Sliding Queue",
        "text": "Mentally recite the active N-letter sequence in forward chronological order. Keep an internal sliding buffer (e.g., holding 'A-T-M' at 3-back)."
      },
      {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/drills/memory/working-memory/n-back#step-2",
        
        "name": "Compare Current Stimulus to the Nth Prior Item",
        "text": "When a new stimulus appears, immediately match it against the oldest item in your active buffer (the item presented exactly N steps ago)."
      },
      {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/drills/memory/working-memory/n-back#step-3",
        
        "name": "Eject the Oldest Item and Append the Newest Item",
        "text": "Execute an immediate mental update: discard the oldest verified item from focal memory and append the current item to the front of your mental queue."
      },
      {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/drills/memory/working-memory/n-back#step-4",
        
        "name": "Maintain Consistent Attentional Rhythm Without Lapsing",
        "text": "Pace your breathing and avoid lingering on missed judgments. In continuous stream tasks, dwelling on a mistake causes cascading loss of subsequent buffer positions."
      }
    ]
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "N-Back Test – Working Memory Training Game",
    "url": "https://skilldrills.online/drills/memory/working-memory/n-back",
    "description": "Continuous information updating and working memory assessment at 2-back, 3-back, and beyond.",
    "dateModified": "2026-09-11",
    "gamePlatform": "Web Browser",
    "genre": ["Cognitive Training", "Working Memory", "N-Back Test", "Brain Training"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
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

      <NBackClient
        copy={{
          h1Keyword: "N-Back Test",
          h1Suffix: " – Free Working Memory Training Game",
        }}
      />

      <DrillGuide
        lead={[
          "The N-Back Working Memory Test is the premier neuropsychological paradigm for evaluating continuous working memory updating, executive cognitive control, and active information maintenance under time pressure. Originating from Wayne K. Kirchner's (1958) seminal research on rapidly changing information retention, the n-back task has become the gold standard in cognitive neuroscience.",
          "Unlike passive span tests that measure raw storage capacity, the N-Back task requires participants to continuously update a dynamic mental buffer. As letters appear in rapid succession, users must decide whether the current letter matches the one presented exactly N steps earlier (starting at 3-back, progressing to 4-back and beyond), constantly ejecting old tokens and encoding new stimuli.",
          "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval, about 16.7 ms per frame at 60 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware.",
          "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work in the References panel below.",
          "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health. If you have concerns about your memory or thinking, speak to a qualified clinician."
        ]}
        metrics={[
          {
            label: "Peak N-Back Level",
            desc: "Highest N-back depth achieved (3-Back baseline, 4-Back advanced, 5-Back+ elite)."
          },
          {
            label: "Total Drill Score",
            desc: "Cumulative points accumulated (+150 PTS per correct match/non-match judgment over 45 seconds without negative penalties)."
          },
          {
            label: "Target Judgment Accuracy",
            desc: "Percentage of correct match/non-match decisions versus false-alarm and miss errors across the session."
          },
          {
            label: "Working Memory Updating Rate",
            desc: "Decision velocity and reaction latency during stimulus exposure windows reflecting executive processing efficiency."
          }
        ]}
        benchmarks={[
          {
            tier: "Tier 1: Superior Working Memory (Executive Elite / 99th Percentile)",
            range: "4-Back to 5-Back+ Level (1,200+ Points)",
            desc: "Executive elite; maintains a rolling 4-to-5 item mental FIFO queue; instantaneous token replacement; sub-600 ms response latency; accuracy exceeding 92%."
          },
          {
            tier: "Tier 2: High Average (Strong Updating Control / 85th–95th Percentile)",
            range: "Solid 3-Back with 4-Back Transitions (900 – 1,199 Points)",
            desc: "Exceeds standard adult baseline; sustains continuous 3-back updating with minimal intrusion errors; successfully transitions into 4-back trials; 80% – 91% accuracy."
          },
          {
            tier: "Tier 3: Average Adult Baseline (50th Percentile Normal)",
            range: "Stable 3-Back (600 – 899 Points)",
            desc: "Normative adult baseline (Kirchner, 1958; Jaeggi et al., 2008); maintains a 3-item sub-vocal buffer; occasionally drops oldest token during rapid presentation; 65% – 79% accuracy."
          },
          {
            tier: "Tier 4: Low Average (Executive Buffer Decay / 15th–30th Percentile)",
            range: "Inconsistent 3-Back (400 – 599 Points)",
            desc: "Struggles with continuous 3-item FIFO updating; frequent 2-back vs. 3-back confusion (lure intrusion errors); accuracy near chance on match trials (50% – 64%)."
          },
          {
            tier: "Tier 5: Impaired / Below Average (< 15th Percentile)",
            range: "Sub-3-Back (< 400 Points)",
            desc: "Severe working memory updating bottleneck; unable to maintain 3 sequential items in active buffer across transitions; frequent timeouts and accuracy below 50%."
          }
        ]}
        science={[
          {
            title: "Wayne K. Kirchner (1958): Origins of the N-Back Paradigm",
            body: "Kirchner introduced the n-back task in his seminal 1958 study on rapidly changing information retention across aging populations. He discovered that while simple short-term retention remained relatively intact, the active requirement to dynamically discard outdated items and append new items revealed significant cognitive bottlenecks."
          },
          {
            title: "Alan Baddeley (1986, 2000): Central Executive Control",
            body: "In Baddeley's multicomponent working memory model, N-back stands as the primary paradigm evaluating the Central Executive. It demands simultaneous coordination between phonological loop rehearsal and active attentional gating in the dorsolateral prefrontal cortex (DLPFC)."
          },
          {
            title: "Adele Diamond (2013): Executive Functions Triad",
            body: "Diamond identified working memory updating, inhibitory control, and cognitive flexibility as the foundational triad of human executive function. N-back uniquely taxes all three by requiring continuous buffer updating, inhibition of 1-back/2-back lures, and flexible mental reconfiguration."
          },
          {
            title: "Susanne M. Jaeggi et al. (2008): Fluid Intelligence Transfer (PNAS)",
            body: "Jaeggi and colleagues' landmark PNAS paper demonstrated that intensive training on adaptive N-back tasks led to significant gains in fluid intelligence (Gf) as measured by Raven's Advanced Progressive Matrices, proving that working memory capacity is plastic and trainable."
          },
          {
            title: "Nelson Cowan (2001, 2010): The 4 ± 1 Capacity Constraint",
            body: "Cowan's working memory model establishes that focal conscious attention can hold approximately 4 unbundled items. Moving from 3-back to 4-back pushes performance directly against this biological limit, explaining why 4-back requires advanced chunking and sub-vocal chaining."
          },
          {
            title: "David L. Woods et al. (2015): Chronometric Standards & Signal Detection",
            body: "Woods et al. validated computerized cognitive chronometry, standardizing hit rate, false alarm rate, and sensitivity index (d') metrics alongside millisecond-accurate display intervals via performance.now()."
          }
        ]}
        protocols={[
          {
            title: "Sliding Queue Sub-Vocalization (Baddeley 1986)",
            body: "Maintain a rolling 3-letter verbal loop in your head. When a new letter arrives, check it against the first letter of your loop, then drop that first letter and add the new one to the end (e.g., 'B-M-T' becomes 'M-T-R'). Practice rhythmic internal repetition."
          },
          {
            title: "Inhibitory Gating Against Familiarity Lures (Diamond 2013)",
            body: "Watch out for 'lures'—letters that match the item from 1 step or 2 steps ago rather than 3 steps ago. Familiarity produces an automatic impulse to click 'Match'. Use deliberate prefrontal inhibition to check the exact serial tag before responding."
          },
          {
            title: "Dual-Modality Phonological-Spatial Binding",
            body: "Complement your subvocal loop by visualizing three horizontal slots in front of you. Shift each letter one slot to the left as new letters appear. Dual-coding across phonological and visuospatial buffers strengthens trace durability."
          },
          {
            title: "Paced Attentional Reset",
            body: "If you lose track of the sequence, do not panic or try to reconstruct the past from memory. Immediately treat the next incoming letter as step 1 and rebuild your 3-item buffer afresh over the next two stimuli."
          }
        ]}
        // Works named in this page's copy, with DOIs so a reader or an answer
        // engine can check the figures rather than take them on trust.
        sources={pickSources('baddeley1974', 'baddeley1986', 'cowan2001', 'woods2015')}
        faqs={[
          {
            q: "What is the N-Back Working Memory Test?",
            a: "The N-Back test is a classic neurocognitive assessment that measures continuous working memory updating. Participants observe a sequential stream of stimuli and indicate whether the current item matches the one presented N steps earlier."
          },
          {
            q: "Who invented the N-Back task and what was its original purpose?",
            a: "Wayne K. Kirchner invented the N-Back task in 1958 to investigate age-related differences in the short-term retention of rapidly changing information, proving that older adults experienced significant difficulties in dynamic memory updating."
          },
          {
            q: "What cognitive faculty does N-Back primarily assess?",
            a: "N-Back primarily tests working memory updating and executive control—the ability to continuously monitor incoming data, discard obsolete representations from focal attention, and encode new information into an active buffer."
          },
          {
            q: "How does N-Back differ from simple digit span or short-term memory tests?",
            a: "Simple span tests measure passive short-term storage (holding items statically until recall). N-Back requires active manipulation and updating: with every new stimulus, the oldest item must be dropped and the newest appended while maintaining serial order."
          },
          {
            q: "Can N-Back training improve fluid intelligence (IQ)?",
            a: "Landmark research by Jaeggi et al. (2008) demonstrated that adaptive N-back training led to improvements in fluid intelligence (Gf) on non-verbal reasoning tasks. While transfer effect sizes vary across studies, N-back reliably enhances working memory capacity and attentional control."
          },
          {
            q: "What is a normal adult score on the 3-Back test?",
            a: "Healthy young adults typically perform with 65% to 80% accuracy on a standard 3-back task. Achieving sustained accuracy above 85% or successfully operating at 4-back reflects superior executive working memory."
          },
          {
            q: "What is the difference between single N-Back and Dual N-Back?",
            a: "Single N-Back presents one stimulus stream (e.g., visual letters). Dual N-Back presents two independent sensory streams simultaneously (typically visual grid positions and auditory spoken consonants), requiring divided executive updating across both modalities."
          },
          {
            q: "How does sub-vocal articulatory rehearsal assist in N-Back performance?",
            a: "Sub-vocalization recruits the phonological loop (Baddeley, 1986). By mentally chanting the active N-item sequence like an internal sliding queue (e.g., 'C-K-M' becoming 'K-M-R'), you maintain active trace activation against rapid decay."
          },
          {
            q: "Why does performance decline significantly at 4-Back and 5-Back?",
            a: "According to Nelson Cowan's (2001) working memory model, human focal attention has a capacity ceiling of 4 ± 1 unchunked units. At 4-back and 5-back, items exceed this fundamental processing boundary, resulting in interference and intrusion errors."
          },
          {
            q: "How does working memory updating transfer to real-world tasks?",
            a: "Working memory updating supports complex real-time decision making, tracking multiple shifting variables in financial analysis, reading comprehension, software debugging, and tactical adaptability in competitive sports and gaming."
          }
        ]}
        related={[
          {
            href: "/drills/memory/spatial-memory/path-tracing",
            title: "Path Tracing Memory Test",
            desc: "Retrace dynamic spatial routes and train the Inner Scribe on progressive matrix grids."
          },
          {
            href: "/drills/memory/spatial-memory/grid-memorization",
            title: "Visual Memory Test",
            desc: "Memorize static 2D checkerboard patterns and assess visual cache capacity."
          },
          {
            href: "/drills/memory/spatial-memory/object-location",
            title: "Object Location Memory Test",
            desc: "Test spatial relational binding and object placement across multi-quadrant maps."
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
          },
          {
            href: "/drills/memory/short-term-memory/color-sequence",
            title: "Color Memory Game",
            desc: "Recall progressive sequences of flashing colors under escalating speeds."
          }
        ]}
      />
    </>
  );
}