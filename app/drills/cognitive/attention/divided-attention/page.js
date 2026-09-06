import DividedAttentionClient from './DividedAttentionClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — divided-attention
// PRIMARY:  "divided attention test"         — Primary target head query
// SECONDARY / LSI:
//           "dual task test"                 — Core cognitive paradigm (Pashler 1994)
//           "split attention test"           — Colloquial user intent
//           "divided attention training"     — Skill building & athletic training query
//           "dual task training"             — High-performance neurocognitive drill
//           "multiple resource theory"       — Wickens (2002) cross-channel framework
//           "geteilte aufmerksamkeit test"  — German market target (de-DE)
//           "teste de atenção dividida"     — Brazilian market target (pt-BR)
//           "test de atención dividida"     — Spanish market target (es-ES)
// ============================================================

export const metadata = {
  title: "Divided Attention Test - Free Dual-Task Focus Game",
  description: "Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.",
  keywords: [
    "divided attention test",
    "divided attention test online",
    "dual task test",
    "dual task training",
    "split attention test",
    "divided attention task",
    "divided attention training",
    "split focus brain game",
    "cognitive multitasking test",
    "dual visual tracking test",
    "multimodal attention test",
    "simultaneous processing test",
    "psychological refractory period test",
    "attention training online",
    "free cognitive brain games",
    "executive function drill"
  ],
  openGraph: {
    title: "Divided Attention Test - Free Dual-Task Focus Game | SkillDrills",
    description: "Test your divided attention and dual-task capacity online. Track moving visual targets while processing numerical streams in this free split-focus drill.",
    type: "website",
    url: "https://skilldrills.online/drills/cognitive/attention/divided-attention",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divided Attention Test - Free Dual-Task Focus Game | SkillDrills",
    description: "Test your divided attention and dual-task capacity online. Free split-focus drill with concurrent visual and numerical processing.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/attention/divided-attention",
    languages: getAlternateLanguages('/drills/cognitive/attention/divided-attention'),
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
    { "@type": "ListItem", "position": 4, "name": "Divided Attention Test", "item": "https://skilldrills.online/drills/cognitive/attention/divided-attention" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Divided Attention Test — Free Online Dual-Task Split Focus Drill | SkillDrills",
  "alternateName": "Divided Attention",
  "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention",
  "dateModified": "2026-09-05",
  "description": "Free online dual-task divided attention test measuring concurrent visuospatial target tracking and numerical classification under continuous speed pressure.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Divided Attention, Dual-Task Processing, Visuospatial Tracking, Numerical Cognition, Bottleneck Management"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take the Divided Attention Test",
  "description": "Measure and train your split-focus capacity and dual-task coordination under escalating speed constraints.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Initiate the Dual Stream",
      "text": "Click or tap Start Drill to activate both the primary visuospatial target field and the concurrent numerical side panel."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track and Tap Moving Visual Targets",
      "text": "Monitor the canvas for moving blue target circles. Tap or click each target before its decay timer runs out to earn points and extend the clock (+0.6s)."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Classify the Numerical Stream Simultaneously",
      "text": "Simultaneously scan the right panel. When an EVEN number (0, 2, 4, 6, 8) appears, tap the MATCH button immediately; ignore odd numbers."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintain Dual Channel Accuracy",
      "text": "Clean hits on either channel build your combo multiplier. Missing a target, missing an even number, or false matching resets your combo."
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
      "name": "What is divided attention and what does this test measure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divided attention is the cognitive ability to allocate mental resources across two or more independent information channels concurrently. This test measures your ability to simultaneously track moving visuospatial targets while categorizing a continuous numerical stream, quantifying cross-channel accuracy, response latency, and dual-task degradation under time pressure."
      }
    },
    {
      "@type": "Question",
      "name": "What is the psychological refractory period (PRP)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The psychological refractory period (PRP) is the delay in response to a second stimulus when it closely follows a first stimulus. As demonstrated by Harold Pashler (1994), this delay occurs because central executive processing creates a structural bottleneck during response selection, preventing two decisions from being executed completely in parallel."
      }
    },
    {
      "@type": "Question",
      "name": "What is Multiple Resource Theory in divided attention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Developed by Christopher D. Wickens (2002), Multiple Resource Theory proposes that the brain possesses separate resource pools defined by sensory modalities (visual vs. auditory) and processing codes (spatial vs. verbal/symbolic). Dual-task interference is reduced when tasks utilize different pools—such as the spatial tracking and symbolic numerical processing paired in this drill."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between divided attention and selective attention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selective attention involves focusing cognitive capacity exclusively on a single target stream while actively suppressing all peripheral distractors (such as in the Stroop effect). Divided attention involves intentionally splitting mental bandwidth across multiple relevant streams, coordinating parallel goals without neglecting either channel."
      }
    },
    {
      "@type": "Question",
      "name": "Can divided attention and dual-task coordination be improved with practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Landmark research by Spelke, Hirst, and Neisser (1976) demonstrated that extensive dual-task training allows participants to automate sub-tasks, dramatically reducing the central cognitive load of each stream and enabling fluent simultaneous performance that previously appeared blocked by cognitive bottlenecks."
      }
    },
    {
      "@type": "Question",
      "name": "Is this divided attention test a diagnostic tool for ADHD or cognitive disorders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Online cognitive performance drills on SkillDrills are athletic and educational training tools designed to challenge coordination and executive function. They are not medical diagnostic devices and cannot evaluate, diagnose, or monitor ADHD, concussion, dementia, or any neurological condition."
      }
    },
    {
      "@type": "Question",
      "name": "How does divided attention capacity affect driving safety?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dual-task research by Strayer and Johnston (2001) revealed that dividing attention while driving—such as conversing on a phone—causes a twofold increase in missed traffic signals and significantly slower brake responses, demonstrating that inattention blindness stems from central cognitive load rather than physical manipulation."
      }
    },
    {
      "@type": "Question",
      "name": "What represents a strong score on this dual-task drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maintaining an overall dual accuracy above 88% while advancing past Level 5 indicates superior executive control and minimal cross-talk interference between the visual tracking and numerical classification streams. Scores below 75% typically indicate single-channel neglect under speed pressure."
      }
    },
    {
      "@type": "Question",
      "name": "How do display refresh rates and input devices affect dual-task timing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard 60 Hz displays introduce up to 16.7 ms of frame buffer quantization latency, whereas 144 Hz (~6.9 ms) and 240 Hz (~4.1 ms) monitors render visual target updates much closer to their generation timestamp (Woods et al., 2015). High-polling mice (1000 Hz) also minimize input registration delays."
      }
    },
    {
      "@type": "Question",
      "name": "Is this divided attention test free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Divided Attention Test on SkillDrills is 100% free with no registration, subscription fees, or software installation required. All performance data remains stored locally in your browser."
      }
    }
  ]
};

const dividedAttentionGuide = {
  heading: "Divided Attention Test Guide & Dual-Task Benchmarks",
  intro: [
    "Divided attention is the capacity of the human executive control network to distribute processing bandwidth across concurrent stimulus streams without suffering catastrophic degradation on either task. Whether piloting an aircraft, navigating high-speed traffic, or managing complex esports encounters, high performers must monitor spatial movement while categorizing symbolic data in real time.",
    "This drill operationalizes the classical dual-task paradigm by forcing simultaneous engagement with two functionally independent channels: a visuospatial motion-tracking canvas on the left, and a continuous symbolic numerical stream on the right. Under Christopher D. Wickens' Multiple Resource Theory (2002), separating tasks across distinct cognitive dimensions (spatial tracking vs. numerical classification) reduces direct sensory interference, yet taxes the central executive bottleneck (Pashler, 1994).",
    "Timing Methodology: All stimulus lifespans and response timestamps are measured client-side via the browser's high-resolution performance.now() API. Hardware latency contributes display quantization delay (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz, ~4.1 ms at 240 Hz) and input polling jitter (~8 ms at 125 Hz vs ~1 ms at 1000 Hz), as characterized by Woods et al. (2015). Browser timers are coarsened to ~1 ms as a Spectre defense, meaning variations under 5 ms reflect hardware and rendering noise.",
    "Data Transparency: SkillDrills maintains zero aggregate telemetry or user profiling. Your dual accuracy percentages, hit tallies, and session records exist exclusively inside your browser's localStorage and are never transmitted to external servers."
  ],
  benchmarks: {
    title: "Dual-Task Coordination & Interference Reference Tiers",
    headers: ["Dual Accuracy Band", "Performance Classification", "Interference Cost Profile", "Cognitive Resource Allocation"],
    rows: [
      [">= 94%", "Elite Dual-Task Control", "< 80 ms latency degradation", "Seamless multi-channel tracking with near-zero cross-talk interference"],
      ["86% – 93%", "High Multimodal Coordination", "80 – 160 ms latency degradation", "Effective visual-spatial tracking with stable numerical classification"],
      ["78% – 85%", "Standard Adult Baseline", "160 – 240 ms latency degradation", "Typical central bottleneck interference under continuous dual demand"],
      ["68% – 77%", "Elevated Cross-Stream Strain", "240 – 350 ms latency degradation", "Frequent channel neglect or delayed reaction to secondary stream"],
      ["< 68%", "Severe Bottleneck Collapse", "> 350 ms latency degradation", "Single-stream fixation or high false-positive matches under pressure"]
    ],
    note: "These tiers serve as an editorial and literature-grounded reference framework (Pashler, 1994; Wickens, 2002; Spelke et al., 1976). SkillDrills gathers no central aggregate performance database; individual dual-task limits fluctuate based on rest, sensory fatigue, and hardware configuration."
  },
  techniques: {
    title: "Cognitive Mechanisms of Divided Attention & Dual-Tasking",
    items: [
      {
        name: "Multiple Resource Allocation",
        desc: "Processing multiple streams simultaneously is significantly easier when the tasks engage separate cognitive codes (spatial motion vs. verbal/numerical symbols) rather than competing for the same sensory channel (Wickens, 2002).",
        tips: "Avoid trying to verbally narrate both tasks; allow your visuospatial network to track targets intuitively while reserving inner speech for parity checking on numbers."
      },
      {
        name: "Central Bottleneck Management",
        desc: "Even when sensory inputs differ, response selection creates a central cognitive bottleneck known as the psychological refractory period (Pashler, 1994).",
        tips: "Stagger your motor outputs rather than clicking simultaneously; prioritize the expiring visual circle before tapping the numerical match button."
      },
      {
        name: "Dual-Task Plasticity & Automation",
        desc: "Extensive dual-task practice enables the brain to automate sub-components of stimulus processing, dramatically shrinking attentional overhead (Spelke, Hirst, & Neisser, 1976).",
        tips: "Consistent daily 2-minute sessions build automated numerical parity recognition, freeing executive working memory for target trajectory tracking."
      },
      {
        name: "Hardware Quantization & Polling Latency",
        desc: "Display refresh intervals introduce fixed temporal quantization delays (~16.7 ms at 60 Hz down to ~4.1 ms at 240 Hz - Woods et al., 2015).",
        tips: "Use a high-refresh display and high-polling mouse to ensure target movements and tap inputs register with minimum latency."
      }
    ]
  },
  steps: [
    "Click Start Drill to begin the 45-second dual-task session.",
    "Keep your central gaze balanced between the visual canvas on the left and the number stream on the right.",
    "Click or tap moving blue target circles before their decay timer elapses (+100 PTS × Combo, +0.6s).",
    "Monitor the numerical side panel and tap MATCH immediately whenever an EVEN number appears (0, 2, 4, 6, 8).",
    "Withhold matches on odd numbers and avoid letting targets expire to preserve your combo multiplier."
  ],
  audience: "Esports competitors managing minimaps and aim concurrently, aviators and air traffic controllers monitoring multi-instrument telemetry, drivers cultivating heightened situational awareness, and athletes training multimodal perception.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('pashler1994', 'wickens2002', 'strayer2001', 'spelke1976', 'woods2015'),
  related: [
    { href: "/drills/cognitive/attention/concentration-stamina", label: "Focus Test" },
    { href: "/drills/cognitive/attention/multi-tasking", label: "Multitasking Test" },
    { href: "/drills/cognitive/focus/concentration-grid", label: "Schulte Table Trainer" },
    { href: "/drills/cognitive/focus/distraction-fighter", label: "Stroop Test Online" },
    { href: "/drills/cognitive/processing-speed/rsvp-reader", label: "Reading Speed Test" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "Neuro Speed & Reflex Test" }
  ]
};

export default function DividedAttentionPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DividedAttentionClient />
      <DrillGuide guide={dividedAttentionGuide} />
    </>
  );
}
