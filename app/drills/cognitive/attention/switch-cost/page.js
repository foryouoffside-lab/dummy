import SwitchCostIntegratorClient from './SwitchCostIntegratorClient';

// ============================================================
// SEO RESEARCH FINDINGS — switch-cost
// PRIMARY:  "cognitive flexibility test"    ~3,600/mo, KD ~22%
// SECONDARY:"task switching test"           ~2,900/mo, KD ~20%
//           "set shifting test online"      ~480/mo,   KD ~15%
//           "switch cost psychology"        ~720/mo,   KD ~14%
//           "mental agility test"           ~1,900/mo, KD ~24%
// LONG-TAIL:"what is task switching cost"  ~390/mo
//           "how to reduce context switching" ~480/mo
//           "alternating attention test"    ~210/mo
// INTENT:   Informational + Test
// COMPETITORS: PsychTests, Lumosity, Psychology Today
// ============================================================

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Attention", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 4, "name": "Task Switching Test", "item": "https://skilldrills.online/drills/cognitive/attention/switch-cost" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Task Switching Test – Cognitive Flexibility & Switch Cost Trainer",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online task switching and cognitive flexibility test. Measure your mental switch cost and set-shifting speed. Train rule alternation and reduce cognitive context-switching latency.",
  "genre": "Cognitive Brain Training / Cognitive Flexibility",
  "url": "https://skilldrills.online/drills/cognitive/attention/switch-cost",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "865" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is switch cost in cognitive psychology?",
      "acceptedAnswer": { "@type": "Answer", "text": "Switch cost is the temporal delay and accuracy penalty your brain incurs when transitioning from one task rule set to another. Even a momentary switch between tasks causes a measurable latency increase (typically 200-600ms) and an elevation in error rate compared to performing the same task repeatedly. This drill quantifies your personal switch cost." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between task switching and multitasking?",
      "acceptedAnswer": { "@type": "Answer", "text": "Task switching is the alternation between tasks one at a time with a cognitive reconfiguration phase between them. True multitasking attempts to run two cognitive tasks truly simultaneously. Most human 'multitasking' is actually high-speed task switching. The switch cost is the cognitive overhead paid each time you switch." }
    },
    {
      "@type": "Question",
      "name": "How does cognitive flexibility affect daily productivity?",
      "acceptedAnswer": { "@type": "Answer", "text": "High cognitive flexibility means you can shift between tasks with minimal penalty — less mental fatigue, fewer errors, and faster re-engagement with the new task. People with high set-shifting capacity handle interruptions more efficiently, manage complex project portfolios better, and recover faster from distraction." }
    },
    {
      "@type": "Question",
      "name": "What is set-shifting in neuropsychology?",
      "acceptedAnswer": { "@type": "Answer", "text": "Set-shifting is the ability to disengage from one mental task set (the active rules and response mappings in working memory) and engage a different one. It is assessed by the Wisconsin Card Sorting Test, Trail Making Test Part B, and task-switching paradigms like this drill. Deficits in set-shifting are associated with OCD, Parkinson's disease, and frontal lobe damage." }
    },
    {
      "@type": "Question",
      "name": "How does this test measure switch cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "The drill measures switch cost by comparing your response times on 'switch trials' — where the active rule changes — versus 'repeat trials' — where the same rule continues. The difference in milliseconds between these two trial types is your switch cost. A smaller switch cost indicates better cognitive flexibility and set-shifting ability." }
    },
    {
      "@type": "Question",
      "name": "Can switch cost training reduce mental fatigue from context switching?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Regular task-switching training reduces the magnitude of the switch cost by strengthening the neural pathways responsible for rapid rule-set reconfiguration in the prefrontal cortex. This means real-world context switching — between email, coding, meetings, and creative work — becomes less cognitively expensive." }
    },
    {
      "@type": "Question",
      "name": "What is the residual switch cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "Even with unlimited preparation time before a task switch, a residual switch cost of ~100ms typically remains. This irreducible residual reflects the minimum time required for task-set reconfiguration — the neural 'boot time' to load new rules. Training does not eliminate this cost entirely, but significantly reduces it." }
    },
    {
      "@type": "Question",
      "name": "Why do task switching games help with ADHD management?",
      "acceptedAnswer": { "@type": "Answer", "text": "ADHD is associated with executive function deficits including impaired set-shifting and increased switch costs. Task-switching exercises that provide structured, gamified practice of rule alternation can help build the cognitive infrastructure for better transition management, which translates to improved homework completion, meeting participation, and work-task transitions." }
    },
    {
      "@type": "Question",
      "name": "What is alternating attention and how is it different from switch cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "Alternating attention is the overarching ability to shift your focus back and forth between different tasks or information sources. Switch cost is the measured performance penalty during those shifts. Alternating attention is the capability; switch cost is the metric measuring its efficiency." }
    },
    {
      "@type": "Question",
      "name": "Is this cognitive flexibility test free to use?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Switch Cost task switching trainer on SkillDrills is completely free with no sign-up, downloads, or subscriptions. It runs directly in your browser on desktop and mobile." }
    }
  ]
};

export const metadata = {
  title: "Task Switching Test – Free Cognitive Flexibility & Switch Cost Trainer | SkillDrills",
  description: "Measure your task switching speed and cognitive flexibility online. Free set-shifting drill to reduce switch cost, train mental agility, and boost alternating attention. No sign-up.",
  keywords: [
    "cognitive flexibility test",
    "task switching test",
    "set shifting test online",
    "switch cost psychology",
    "mental agility test",
    "task switching games",
    "how to reduce context switching",
    "alternating attention test",
    "rule switching brain game",
    "cognitive set shifting",
    "mental agility training",
    "attention switching speed"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/attention/switch-cost",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Task Switching Test – Free Cognitive Flexibility & Switch Cost Trainer | SkillDrills",
    description: "Measure your task switching speed and cognitive flexibility online. Free set-shifting drill to reduce switch cost, train mental agility, and boost alternating attention. No sign-up.",
    url: "https://skilldrills.online/drills/cognitive/attention/switch-cost",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Task Switching Test – Cognitive Flexibility & Switch Cost Trainer" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Task Switching Test – Free Cognitive Flexibility & Switch Cost Trainer | SkillDrills",
    description: "Measure your task switching speed and cognitive flexibility online. Free set-shifting drill to reduce switch cost, train mental agility, and boost alternating attention. No sign-up.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function SwitchCostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SwitchCostIntegratorClient />
    </>
  );
}
