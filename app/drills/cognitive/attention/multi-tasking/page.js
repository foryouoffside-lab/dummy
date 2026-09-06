import DualTargetFlowClient from './DualTargetFlowClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — multi-tasking
// PRIMARY:  "multitasking test"             — Primary target head query
// SECONDARY / LSI:
//           "task switching test"            — Core cognitive psychology paradigm (Rogers & Monsell 1995)
//           "multitasking test online"       — High-intent web query
//           "multitasking games"             — Educational & gaming query
//           "dual target flow game"          — Mechanic-specific query
//           "cognitive flexibility test"     — Executive function search intent
//           "teste de multitarefa"           — Brazilian Portuguese target (pt-BR)
//           "test de multitarea"             — Spanish target (es-ES)
//           "マルチタスク テスト"             — Japanese target (ja-JP)
//           "멀티태스킹 테스트"               — Korean target (ko-KR)
// ============================================================

export const metadata = {
  title: "Multitasking Test - Free Dual Target Flow Brain Game",
  description: "Test your multitasking and task-switching skills online. Track dual shape streams simultaneously in this free cognitive flow game. No sign-up required.",
  keywords: [
    "multitasking test",
    "multitasking test online",
    "multi tasking test",
    "task switching test",
    "multitasking games",
    "dual target flow game",
    "cognitive flexibility test",
    "task set reconfiguration",
    "switch cost test",
    "bilateral visual tracking",
    "executive function training",
    "divided attention multitasking",
    "attention training online",
    "free brain training games"
  ],
  openGraph: {
    title: "Multitasking Test - Free Dual Target Flow Brain Game | SkillDrills",
    description: "Test your multitasking and task-switching skills online. Track dual shape streams simultaneously in this free cognitive flow game. No sign-up required.",
    type: "website",
    url: "https://skilldrills.online/drills/cognitive/attention/multi-tasking",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multitasking Test - Free Dual Target Flow Brain Game | SkillDrills",
    description: "Test your multitasking and task-switching capacity in your browser. Free dual-stream target flow drill with zero sign-up.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/attention/multi-tasking",
    languages: getAlternateLanguages('/drills/cognitive/attention/multi-tasking'),
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
    { "@type": "ListItem", "position": 4, "name": "Multitasking Test", "item": "https://skilldrills.online/drills/cognitive/attention/multi-tasking" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Multitasking Test — Free Online Dual-Target Flow Brain Drill | SkillDrills",
  "alternateName": "Dual Target Flow",
  "url": "https://skilldrills.online/drills/cognitive/attention/multi-tasking",
  "dateModified": "2026-09-05",
  "description": "Free online multitasking test measuring bilateral visual tracking, task-switching latency, and dual-target flow coordination under progressive speed constraints.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Multitasking Capacity, Task-Set Reconfiguration, Bilateral Visual Tracking, Switch Cost Mitigation, Inhibitory Control"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take the Multitasking Test",
  "description": "Evaluate and train your dual-target tracking and rapid task-switching agility under escalating visual flow rates.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Note Active Target Templates",
      "text": "Inspect the active target shapes displayed at the top of the left and right panels (e.g., Triangle, Circle, Square)."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Monitor Dual Flow Streams",
      "text": "Geometric shapes continuously flow across the screen in opposing directions to engage bilateral visual processing."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Tap Matching Targets Only",
      "text": "Tap or click shapes that match the active target template for that stream (+100 PTS × Combo, +0.6s). Ignore distractor shapes."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Adapt to Dynamic Target Shifts",
      "text": "Target templates rotate and diverge as difficulty scales. Misclicks or missed targets reset your combo multiplier."
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
      "name": "Can humans actually multitask simultaneously?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For conscious cognitive decisions, true simultaneous processing is a neurological myth. Research by Rogers and Monsell (1995) and Pashler (1994) confirms that the brain rapidly switches between tasks rather than executing them in parallel. Executive control serializes response selection, meaning effective multitasking is essentially high-speed, low-latency task switching."
      }
    },
    {
      "@type": "Question",
      "name": "What is a task-switching cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A task-switching cost is the measurable performance degradation—typically a 100 to 300 ms latency delay and an increased error rate—that occurs when the brain alternates between cognitive tasks. It arises because the prefrontal cortex must suppress the previous task-set and reconfigure working memory with new operational rules (Monsell, 2003)."
      }
    },
    {
      "@type": "Question",
      "name": "What does this dual-target flow test measure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This drill measures your ability to maintain wide bilateral peripheral tracking across two simultaneous geometric streams, filter out non-matching distractor shapes, and adapt to template reconfiguration without sacrificing accuracy or response speed under escalating velocity."
      }
    },
    {
      "@type": "Question",
      "name": "What is the central bottleneck model in multitasking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formulated by Harold Pashler (1994), the central bottleneck model demonstrates that while sensory perception and motor execution can sometimes overlap, the central cognitive stage of decision-making and response selection can only process one item at a time, creating a processing queue known as the psychological refractory period."
      }
    },
    {
      "@type": "Question",
      "name": "Does heavy media multitasking improve multitasking ability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Surprisingly, no. A landmark study by Ophir, Nass, and Wagner (2009) at Stanford University demonstrated that chronic heavy media multitaskers are actually worse at filtering out irrelevant environmental distractors and exhibit slower task-switching speeds than light multitaskers due to fragmented attentional control."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between multitasking and divided attention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divided attention refers to splitting sensory bandwidth across continuous concurrent streams (such as tracking two visual targets simultaneously). Multitasking involves coordinating distinct task-sets and alternating decision goals (such as categorizing shapes on one panel while responding to rule changes on another)."
      }
    },
    {
      "@type": "Question",
      "name": "Is this multitasking test a medical diagnostic tool for ADHD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Online cognitive drills on SkillDrills are athletic and educational training tools designed to practice focus and motor coordination. They are not clinical diagnostic instruments and cannot identify, diagnose, or treat ADHD, executive dysfunction, or cognitive impairment."
      }
    },
    {
      "@type": "Question",
      "name": "What constitutes an elite score on this multitasking drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maintaining an overall accuracy above 90% while advancing to Level 5 or higher with diverging left and right target templates represents elite dual-stream control. Scores below 75% typically reflect frequent distractor false alarms or inability to recover from speed scaling."
      }
    },
    {
      "@type": "Question",
      "name": "How does display refresh rate affect multitasking reaction timing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard 60 Hz monitors introduce up to 16.7 ms of display quantization latency, while high-refresh gaming displays (144 Hz at ~6.9 ms, 240 Hz at ~4.1 ms) render moving shapes with greater temporal precision (Woods et al., 2015). High-polling input devices further reduce input registration latency."
      }
    },
    {
      "@type": "Question",
      "name": "Is this multitasking test completely free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Multitasking Test on SkillDrills is 100% free with no registration, subscription fees, or downloads required. All scores and session history remain stored locally in your browser's localStorage."
      }
    }
  ]
};

const multitaskingGuide = {
  heading: "Multitasking Test Guide & Dual-Flow Benchmarks",
  intro: [
    "Multitasking in human cognition is characterized not by true parallel execution of central decisions, but by rapid, coordinated task-set reconfiguration. Whether piloting an aircraft, navigating fast-moving highway traffic, or managing complex team fights in competitive esports, elite performers must sustain bilateral visual awareness while rapidly updating motor decision templates under pressure.",
    "This drill operationalizes the dual-target flow paradigm by generating two concurrent geometric streams moving in opposing directions. As stream velocities climb and active target templates diverge across panels, the exercise taxes prefrontal executive control networks and tests your resistance to task-switching interference (Rogers & Monsell, 1995; Pashler, 1994).",
    "Timing Methodology: All stimulus coordinates, lifespans, and tap timestamps are captured client-side using the high-resolution performance.now() API. Hardware latency adds display quantization delay (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz, ~4.1 ms at 240 Hz) and input polling jitter (~8 ms at 125 Hz vs ~1 ms at 1000 Hz), as documented by Woods et al. (2015). Browser clocks are coarsened to ~1 ms as a Spectre defense, meaning variations below 5 ms reflect hardware and rendering noise.",
    "Data Transparency: SkillDrills gathers zero aggregate telemetry or user tracking. Your accuracy percentages, session scores, and difficulty level records exist exclusively within your browser's localStorage and are never sent to external servers."
  ],
  benchmarks: {
    title: "Dual-Stream Coordination & Task-Switching Reference Tiers",
    headers: ["Dual Accuracy Band", "Cognitive Classification", "Switch Cost Profile", "Executive Control Assessment"],
    rows: [
      [">= 94%", "Elite Executive Flow", "< 90 ms switch latency", "Flawless bilateral tracking with near-instantaneous template switching"],
      ["86% – 93%", "High Multimodal Agility", "90 – 170 ms switch latency", "Strong dual-stream coordination with minimal distractor interference"],
      ["78% – 85%", "Standard Adult Baseline", "170 – 260 ms switch latency", "Typical task-set reconfiguration cost under escalating stream velocity"],
      ["68% – 77%", "Elevated Context Switching Cost", "260 – 360 ms switch latency", "Frequent single-stream fixation or delayed reaction to target divergence"],
      ["< 68%", "Attentional Fragmentation", "> 360 ms switch latency", "High error rate on distractor shapes or complete channel drop-off"]
    ],
    note: "These tiers serve as an editorial and literature-grounded reference framework (Rogers & Monsell, 1995; Monsell, 2003; Pashler, 1994). SkillDrills maintains no aggregate user database; individual performance naturally fluctuates with sleep, circadian rhythm, and cognitive fatigue."
  },
  techniques: {
    title: "Cognitive Mechanisms of Multitasking & Task Switching",
    items: [
      {
        name: "Task-Set Reconfiguration (Switch Cost)",
        desc: "Switching between active task goals incurs an unavoidable 100–300 ms switch cost as executive networks disengage the old rule and configure the new one (Rogers & Monsell, 1995; Monsell, 2003).",
        tips: "When the target templates change, momentarily anchor your gaze on the top indicators for 200 ms to confirm both shapes before resuming high-speed tapping."
      },
      {
        name: "Central Bottleneck Management",
        desc: "The central cognitive stage of decision-making and motor initiation operates serially rather than in parallel (Pashler, 1994; Wickens, 2002).",
        tips: "Stagger your responses between streams rather than attempting simultaneous double taps; alternate focus rhythmically between left and right channels."
      },
      {
        name: "Distractor Suppression & Filter Strength",
        desc: "Effective multitaskers excel at filtering irrelevant distractors rather than processing everything simultaneously (Ophir, Nass, & Wagner, 2009).",
        tips: "Focus your visual cortex on identifying the single defining feature of the target shape (such as vertices or curves) to immediately reject non-matching distractors."
      },
      {
        name: "Display Refresh & Polling Jitter",
        desc: "Display refresh intervals introduce fixed temporal quantization delays (~16.7 ms at 60 Hz down to ~4.1 ms at 240 Hz - Woods et al., 2015).",
        tips: "Use a high-refresh monitor with consistent mouse polling to ensure target movements and tap inputs register with minimum latency."
      }
    ]
  },
  steps: [
    "Click Start Drill to begin the 45-second dual-stream session.",
    "Check the active target shapes shown at the top of the left and right panels.",
    "Track shapes flowing across the screen and tap only those matching the active template for that stream (+100 PTS × Combo, +0.6s).",
    "Withhold taps on all non-matching distractor shapes to protect your combo multiplier.",
    "Adapt immediately when target templates rotate and diverge as the speed scales upward."
  ],
  audience: "Esports gamers managing multi-lane awareness and minimap telemetry, pilots and air traffic controllers tracking concurrent flight paths, drivers navigating complex traffic, and knowledge workers training rapid task recovery.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rogers1995', 'monsell2003', 'pashler1994', 'wickens2002', 'ophir2009', 'woods2015'),
  related: [
    { href: "/drills/cognitive/attention/concentration-stamina", label: "Focus Test" },
    { href: "/drills/cognitive/attention/divided-attention", label: "Divided Attention Test" },
    { href: "/drills/cognitive/focus/concentration-grid", label: "Schulte Table Trainer" },
    { href: "/drills/cognitive/focus/distraction-fighter", label: "Stroop Test Online" },
    { href: "/drills/cognitive/processing-speed/rsvp-reader", label: "Reading Speed Test" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "Neuro Speed & Reflex Test" }
  ]
};

export default function MultiTaskingPage() {
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
      <DualTargetFlowClient />
      <DrillGuide guide={multitaskingGuide} />
    </>
  );
}
