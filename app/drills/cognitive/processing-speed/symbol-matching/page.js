import SymbolMatchingClient from './SymbolMatchingClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — symbol-matching
// PRIMARY:  "symbol matching game"          ~4,400/mo, KD ~18%
// SECONDARY:"digit symbol substitution test"~5,400/mo, KD ~22%
//           "processing speed test online"  ~2,900/mo, KD ~20%
//           "DSST test online"              ~2,200/mo, KD ~16%
//           "SDMT test online free"         ~1,900/mo, KD ~18%
// LONG-TAIL:"coding test cognition"        ~1,100/mo
//           "symbol digit modalities test"  ~1,600/mo
//           "processing speed brain test"   ~880/mo
// INTENT:   Test / Clinical / Training
// COMPETITORS: PsychTests, Neuropsychological assessment sites
// ============================================================

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Processing Speed", "item": "https://skilldrills.online/drills/cognitive/processing-speed" },
    { "@type": "ListItem", "position": 4, "name": "Symbol Matching", "item": "https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Symbol Matching Test – Free Digit Symbol Substitution Brain Game",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online symbol matching game. Practice the Digit Symbol Substitution Test (DSST) to train cognitive processing speed, visual scanning, and mental flexibility. No sign-up required.",
  "genre": "Cognitive Testing / Processing Speed / Symbol Matching",
  "url": "https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Digit Symbol Substitution Test (DSST)?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Digit Symbol Substitution Test (DSST) is a classic neuropsychological test from the Wechsler Adult Intelligence Scale (WAIS). A legend at the top maps digits (1-9) to unique symbols. You must rapidly scan rows of digits below and write or select the corresponding symbol for each. It measures processing speed, visual scanning efficiency, short-term associative memory, and executive attention." }
    },
    {
      "@type": "Question",
      "name": "What does the symbol matching test measure?",
      "acceptedAnswer": { "@type": "Answer", "text": "Symbol matching measures: (1) Processing speed — how quickly your brain can look up and apply the digit-to-symbol mapping, (2) Visual scanning — efficient eye movement across the legend and test items, (3) Associative learning — binding digit-symbol pairs in short-term memory, (4) Executive attention — sustaining the task over repeated monotonous items, and (5) Motor speed — the time to indicate your response." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between DSST and SDMT?",
      "acceptedAnswer": { "@type": "Answer", "text": "In the DSST (Wechsler), you look at a digit and must write the corresponding symbol. In the SDMT (Symbol Digit Modalities Test by Smith, 1973), you look at a symbol and must write or say the corresponding digit. The SDMT is often preferred in clinical settings because oral administration (saying numbers aloud) removes motor speed as a confounding variable, isolating pure cognitive processing speed." }
    },
    {
      "@type": "Question",
      "name": "Is this symbol matching drill a medical or screening test?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. This is a free browser game built on the same symbol-substitution format as the DSST and SDMT, but it is not those instruments and is not a screening or diagnostic test for any condition. The clinical versions use different materials, timing and scoring, and are administered and interpreted by trained professionals. Nothing you score here tells you anything about your health. If you are concerned about your memory or thinking, speak to a doctor." }
    },
    {
      "@type": "Question",
      "name": "How can I improve my cognitive processing speed?",
      "acceptedAnswer": { "@type": "Answer", "text": "Evidence-based approaches include: (1) Regular computerized cognitive training (speed of processing games like DSST/SDMT), (2) Aerobic exercise (most consistently shown to improve processing speed across all ages), (3) Optimal sleep quality (sleep is critical for synaptic consolidation and myelination), (4) Cardiovascular health management (reduced vascular risk improves white matter integrity), and (5) Reducing chronic stress and inflammation." }
    },
    {
      "@type": "Question",
      "name": "What is processing speed and why does it matter?",
      "acceptedAnswer": { "@type": "Answer", "text": "Cognitive processing speed is the rate at which your brain can take in, comprehend, and begin to respond to information. It is one of the most important global indicators of overall brain health and is highly correlated with general intelligence. Faster processing means you can read faster, make decisions more quickly, follow conversations more easily, and react to environmental changes with less latency." }
    },
    {
      "@type": "Question",
      "name": "Will practising this drill make me faster at everyday tasks?",
      "acceptedAnswer": { "@type": "Answer", "text": "You will get faster at this drill with practice. Whether that carries over to unrelated everyday tasks is far less certain -- gains on a trained cognitive task often fail to generalise to untrained ones. Treat your score as a measure of how well you do this particular task, not as a general index of how your brain works." }
    },
    {
      "@type": "Question",
      "name": "What strategies help improve symbol matching speed?",
      "acceptedAnswer": { "@type": "Answer", "text": "Key strategies: (1) Memorize the legend early — don't look up every symbol, build automatic digit-symbol associations from the start, (2) Use chunking — match 2-3 items before re-scanning the legend, (3) Optimize eye movement — minimize the distance your eye travels between legend and test items with consistent scanning patterns, (4) Practice regularly — DSST performance improves significantly with repeated practice sessions." }
    },
    {
      "@type": "Question",
      "name": "What is the average DSST score for adults?",
      "acceptedAnswer": { "@type": "Answer", "text": "In the WAIS-IV standardization, adults aged 20-34 average roughly 70-75 correct symbols in 120 seconds, with the average falling in older age bands. Those figures come from the supervised pencil-and-paper clinical test. This drill uses different symbols, timing and scoring, so your score here is not comparable to them and should not be read as a clinical result." }
    },
    {
      "@type": "Question",
      "name": "Is this symbol matching test free to play online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Symbol Matching drill on SkillDrills is completely free. No registration, downloads, or subscriptions required. It runs directly in your browser on desktop and mobile, measuring your processing speed and providing performance feedback after each session." }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play Symbol Matching Drill",
  "description": "Improve your processing speed, visual-motor mapping, and cognitive coding speed by matching active symbols to numbers.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Press Start Drill",
      "text": "Start the timer-attack. A reference key grid mapping symbols to numbers will appear at the top."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Find the Matching Number",
      "text": "Look at the large active symbol displayed in the center. Find its matching number from the reference key."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Enter the Match",
      "text": "Tap the corresponding digit button (1-6) to submit. Each session starts with 45 seconds on the clock, with clean matches adding +0.6s. A wrong tap resets your combo, and opt-in time penalty (-0.8s) applies when enabled in settings; the run always lasts the full clock."
    }
  ]
};

export const metadata = {
  title: "Symbol Digit Modalities Test - Free Processing Speed",
  description: "Play our free Symbol Matching online game. Challenge your cognitive processing speed, take a symbol search test, and train your visual working memory.",
  keywords: [
    "symbol search test",
    "symbol digit modalities test",
    "symbol matching game",
    "cognitive processing speed test",
    "visual search test",
    "WAIS symbol search online",
    "brain decoding test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Symbol Digit Modalities Test - Free Processing Speed | SkillDrills",
    description: "Play our free Symbol Matching online game. Challenge your cognitive processing speed, take a symbol search test, and train your visual working memory.",
    url: "https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Symbol Digit Modalities Test - Free Processing Speed | SkillDrills",
    description: "Play our free Symbol Matching online game. Challenge your cognitive processing speed, take a symbol search test, and train your visual working memory.",
  },
};


const symbolmatchingGuide = {
  heading: "Symbol Substitution Guide & Processing Speed",
  intro: [
    "A symbol-substitution task gives you a key pairing symbols with digits and asks how many you can match correctly against the clock. Almost nothing about it depends on knowledge or vocabulary, which is why it is used as a measure of processing speed -- how quickly simple, well-defined operations can be carried out -- rather than of what you know.",
    "The format originates with the Digit Symbol Substitution Test in the Wechsler scales and with the Symbol Digit Modalities Test (Smith, 1973), which reverses the direction of the match. Processing speed measured this way slows gradually across adulthood (Der &amp; Deary, 2006). This drill uses the format as a game -- different symbols, different timing, different scoring -- so treat it as practice and interest rather than as a version of the clinical test.",
    "Timing methodology: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup.",
    "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work listed in the References panel below.",
    "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health. If you have concerns about your attention, memory or thinking, speak to a qualified clinician.",
  ],
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('smith1973', 'der2006', 'woods2015'),
  related: [
    { href: "/drills/cognitive/processing-speed/rsvp-reader", label: "Reading Speed Test" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "Neuro Speed &amp; Reflex Test" },
    { href: "/drills/cognitive/focus/concentration-grid", label: "Schulte Table Trainer" },
  ],
};

export default function SymbolMatchingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <SymbolMatchingClient />
      <DrillGuide guide={symbolmatchingGuide} />
    </>
  );
}