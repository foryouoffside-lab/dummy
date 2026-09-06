import ConcentrationStaminaClient from './ConcentrationStaminaClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — concentration-stamina
// PRIMARY:  "focus test"                    — 8 exact / 8 broad US, 2 exact GB (Bing API 2026-09-04)
//           "attention span test"           — 35 exact / 35 broad US, 1 exact GB (Bing API 2026-09-04)
// SECONDARY / LSI:
//           "concentration test"            — High informational intent, consumer focus query
//           "konzentrationstest"            — 20 exact / 20 broad DE (Bing API 2026-09-04)
//           "continuous performance test"   — Core neuropsychological paradigm (CPT)
//           "sustained attention test"      — Literature term (Mackworth 1948, Parasuraman 1979)
//           "vigilance decrement test"      — Task degradation measurement
//           "mental stamina test"           — Cognitive endurance query
// ============================================================

export const metadata = {
  title: "Focus Test - Free Online Concentration Stamina Drill",
  description: "Test your sustained attention and focus stamina. Free online continuous performance drill measuring target discrimination and cognitive rule switching.",
  keywords: [
    "focus test",
    "focus test online",
    "concentration test",
    "concentration test online",
    "attention span test",
    "sustained attention test",
    "continuous performance test",
    "mental stamina test",
    "concentration stamina test",
    "cpt test online",
    "vigilance decrement test",
    "cognitive endurance test",
    "target discrimination drill",
    "rule switching test",
    "attention training online",
    "free brain game",
    "cognitive focus exercises",
  ],
  openGraph: {
    title: "Focus Test & Concentration Stamina Drill | SkillDrills",
    description: "Measure your sustained attention and cognitive endurance with this free online Focus Test. Train target discrimination and rule-switching stamina.",
    type: "website",
    url: "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus Test & Concentration Stamina Drill | SkillDrills",
    description: "Test sustained attention and mental endurance in your browser. Free Continuous Performance Test with dynamic rule switching.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
    languages: getAlternateLanguages('/drills/cognitive/attention/concentration-stamina'),
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
    { "@type": "ListItem", "position": 4, "name": "Focus Test & Concentration Stamina Drill", "item": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Focus Test & Concentration Stamina Drill",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Continuous performance test and cognitive endurance drill measuring sustained attention, vigilance decrement, and rule-switching cognitive stamina.",
  "featureList": [
    "Dynamic 10-second rule switching (VOWELS vs PRIMES)",
    "Target discrimination and distractor inhibition testing",
    "Real-time vigilance and reaction latency chronometry",
    "Local browser score persistence with no telemetry"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Focus Test & Concentration Stamina Drill — Continuous Performance Test | SkillDrills",
  "alternateName": "Concentration Stamina",
  "url": "https://skilldrills.online/drills/cognitive/attention/concentration-stamina",
  "dateModified": "2026-09-05",
  "description": "Free online continuous performance test measuring sustained attention, vigilance decrement, and rule-switching cognitive stamina.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Sustained Attention, Target Discrimination, Cognitive Rule Switching, Vigilance Stamina, Inhibitory Control"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take the Focus Test",
  "dateModified": "2026-09-05",
  "description": "Measure and train your sustained attention, target discrimination, and rule-switching endurance.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Identify the Active Rule Class",
      "text": "Observe the active classification rule displayed at the top of the canvas (VOWELS or PRIMES)."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Discriminate Target Characters",
      "text": "Inspect each rapidly appearing stimulus and determine whether it matches the active rule class."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Tap or Press Spacebar for Targets Only",
      "text": "Tap the screen or press the Spacebar immediately when a matching target appears; withhold response for distractors."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Adapt to Dynamic Rule Switches",
      "text": "Every 10 seconds, the target classification rule shifts between VOWELS and PRIMES. Adapt quickly to maintain accuracy."
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
      "name": "What is a focus test and what does it measure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A focus test evaluates sustained attention and cognitive endurance—the ability of the prefrontal executive control network to maintain goal-directed vigilance and accurate target discrimination over extended periods without succumbing to fatigue or distraction."
      }
    },
    {
      "@type": "Question",
      "name": "What is the vigilance decrement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The vigilance decrement is the decline in signal detection accuracy and response speed that occurs over time during continuous monitoring tasks. First documented systematically by N. H. Mackworth (1948) using the Clock Test, vigilance degrades noticeably after 20 to 30 minutes of continuous cognitive effort (Parasuraman, 1979)."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Continuous Performance Test (CPT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Continuous Performance Test is a cognitive psychology paradigm that presents a rapid sequence of stimuli over several minutes, requiring participants to respond to specific target cues while inhibiting responses to non-target distractors (Robertson et al., 1997)."
      }
    },
    {
      "@type": "Question",
      "name": "Why does switching rules reduce focus speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Switching between classification rules incurs an unavoidable cognitive 'switch cost'—typically a 100 to 300 ms response latency delay and increased error rate—as executive control networks clear the prior stimulus-response mapping and configure the new task-set (Monsell, 2003)."
      }
    },
    {
      "@type": "Question",
      "name": "How long can a person concentrate with peak focus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Healthy adults typically sustain intense, uninterrupted attentional focus for approximately 20 to 45 minutes before mental fatigue and habituation impair accuracy. Short structured breaks, task variation, and regular cognitive drills help push this threshold."
      }
    },
    {
      "@type": "Question",
      "name": "Is an online attention test diagnostic for ADHD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Online attention and concentration drills are athletic and educational training tools designed to practice sustained focus and cognitive endurance. They are not medical diagnostic instruments and cannot identify or evaluate clinical conditions such as ADHD or cognitive impairment."
      }
    },
    {
      "@type": "Question",
      "name": "What causes cognitive fatigue during extended study or gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prolonged sustained attention taxes prefrontal neurotransmitter systems and metabolic resources, weakening sensory gating in the thalamus and prefrontal cortex. This causes increased distraction sensitivity and slower response inhibition under prolonged load."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on this focus stamina test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maintaining above 90% accuracy throughout the 45-second session while adapting smoothly to the 10-second rule shifts represents excellent sustained vigilance. Accuracy falling below 80% reflects attentional slips or impulse responses on distractors."
      }
    },
    {
      "@type": "Question",
      "name": "How does hardware affect focus and reaction timing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard 60 Hz displays introduce up to 16.7 ms of frame buffer quantization delay per frame, while high-refresh monitors (144 Hz at ~6.9 ms, 240 Hz at ~4.1 ms) reduce latency (Woods et al., 2015). Browser clocks are coarsened to approximately 1 ms as a Spectre mitigation."
      }
    },
    {
      "@type": "Question",
      "name": "Is this focus test completely free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Focus Test on SkillDrills is 100% free to play in any modern desktop or mobile browser, with no account creation, personal data collection, or downloads required."
      }
    }
  ]
};

const concentrationGuide = {
  heading: "Focus Test Guide & Cognitive Vigilance Standards",
  intro: [
    "Sustained attention is the capacity to maintain focused cognitive engagement on relevant stimuli over extended periods while actively suppressing distractors. In academic study, professional work, and high-tier competitive gaming, cognitive endurance determines whether decision quality holds steady or breaks down under fatigue.",
    "This drill adapts the Continuous Performance Test (CPT) paradigm with dynamic rule-switching mechanics. Every 10 seconds, the target classification shifts between VOWELS (A, E, I, O, U) and PRIMES (2, 3, 5, 7), challenging both sustained vigilance and executive task-set reconfiguration.",
    "Timing Methodology: Measurements are captured client-side using the high-resolution performance.now() API. Hardware latency adds display quantization delay (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz, ~4.1 ms at 240 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1000 Hz), as documented by Woods et al. (2015). Browser timers are coarsened to ~1 ms as a Spectre mitigation, so differences under 5 ms represent measurement noise. Compare your own runs on the same hardware setup.",
    "Data Transparency: SkillDrills collects no aggregate user performance data—all scores, accuracy percentages, and level progress remain strictly inside your browser's localStorage and are never uploaded."
  ],
  benchmarks: {
    title: "Sustained Attention & Vigilance Reference Tiers",
    headers: ["Accuracy Band", "Vigilance Classification", "Switch Cost Profile", "Cognitive Assessment"],
    rows: [
      [">= 95%", "Exceptional Vigilance", "< 120 ms switch penalty", "Near-flawless target discrimination and rapid rule integration"],
      ["88% – 94%", "High Sustained Focus", "120 – 180 ms switch penalty", "Strong executive control and consistent distractor suppression"],
      ["80% – 87%", "Standard Adult Baseline", "180 – 250 ms switch penalty", "Typical vigilance maintenance with mild late-session decrement"],
      ["70% – 79%", "Moderate Attentional Fatigue", "250 – 350 ms switch penalty", "Noticeable vigilance decrement or impulse responses on distractors"],
      ["< 70%", "Attentional Strain", "> 350 ms switch penalty", "High distractor false alarms or delayed category re-mapping"]
    ],
    note: "These tiers provide an editorial reference benchmark grounded in cognitive psychology literature (Mackworth, 1948; Parasuraman, 1979; Monsell, 2003). SkillDrills collects no aggregate user scores; individual performance naturally fluctuates with sleep, circadian alertness, and cognitive workload."
  },
  techniques: {
    title: "Cognitive Mechanisms of Sustained Attention & Focus",
    items: [
      {
        name: "Vigilance Decrement Mitigation",
        desc: "Signal detection performance degrades predictably over time during monotonous continuous monitoring (Mackworth, 1948; Parasuraman, 1979).",
        tips: "Avoid passive staring; maintain proactive vocalization or active sub-vocalization of the active rule to keep the prefrontal cortex engaged."
      },
      {
        name: "Task-Set Reconfiguration & Switch Cost",
        desc: "Alternating between cognitive rules incurs an unavoidable switch cost of 100–300 ms as executive networks suppress the old rule and activate the new one (Monsell, 2003).",
        tips: "When the rule flips from VOWELS to PRIMES, momentarily slow your trigger finger by 150 ms on the first two stimuli to prevent false-alarm motor slips."
      },
      {
        name: "Sensory Gating & Response Inhibition",
        desc: "As established by Donald Broadbent (1958) and Ian H. Robertson et al. (1997), continuous performance tests require filtering unattended sensory channels while actively inhibiting prepotent motor impulses toward non-target distractor stimuli.",
        tips: "Focus on stimulus feature confirmation before initiating finger movement rather than gambling on fast speculative taps."
      },
      {
        name: "Hardware Latency & Refresh Quantization",
        desc: "Display refresh rates introduce temporal quantization delay (~16.7 ms at 60 Hz down to ~4.1 ms at 240 Hz - Woods et al., 2015).",
        tips: "Use a high-refresh monitor with consistent mouse polling to ensure accurate millisecond stimulus rendering."
      }
    ]
  },
  steps: [
    "Click Start Drill to begin the 45-second continuous focus session.",
    "Check the active rule displayed at the top (starts with VOWELS: A, E, I, O, U).",
    "Tap the screen or press Spacebar only when a stimulus matches the active rule; withhold responses for non-matching distractors.",
    "Listen for the audio tone and visual cue every 10 seconds indicating that the rule has switched to PRIMES (2, 3, 5, 7) or back to VOWELS.",
    "Complete the session to review your accuracy percentage, final score, and peak difficulty level."
  ],
  audience: "Students preparing for extended examinations, competitive gamers maintaining late-game composure, software engineers and knowledge workers in deep-work blocks, and anyone training cognitive endurance and distractor suppression.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('mackworth1948', 'parasuraman1979', 'robertson1997', 'monsell2003', 'broadbent1958', 'woods2015'),
  related: [
    { href: "/drills/cognitive/focus/concentration-grid", label: "Schulte Table Trainer" },
    { href: "/drills/cognitive/focus/distraction-fighter", label: "Stroop Test Online" },
    { href: "/drills/cognitive/attention/divided-attention", label: "Divided Attention Test" },
    { href: "/drills/cognitive/attention/multi-tasking", label: "Multitasking Test" },
    { href: "/drills/cognitive/processing-speed/rsvp-reader", label: "Reading Speed Test" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "Neuro Speed & Reflex Test" }
  ]
};

export default function ConcentrationStaminaPage() {
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
      <ConcentrationStaminaClient />
      <DrillGuide guide={concentrationGuide} />
    </>
  );
}
