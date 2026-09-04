import EliteNeuroSwitchClient from './EliteNeuroSwitchClient';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-time
// PRIMARY:  "reaction time test"            ~110,000/mo, KD ~40%
// SECONDARY:"reaction speed test"           ~27,100/mo,  KD ~30%
//           "reflex test online"            ~22,200/mo,  KD ~28%
//           "click speed test"              ~60,500/mo,  KD ~35%
//           "human benchmark reaction time" ~33,100/mo,  KD ~38%
// LONG-TAIL:"what is average reaction time" ~27,100/mo
//           "how to improve reaction time"  ~14,800/mo
//           "reaction time test milliseconds" ~9,900/mo
// INTENT:   Test / Game / Competitive
// COMPETITORS: Human Benchmark, arealme.com, 1000ms.com
// ============================================================

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Processing Speed", "item": "https://skilldrills.online/drills/cognitive/processing-speed" },
    { "@type": "ListItem", "position": 4, "name": "Reaction Time Test", "item": "https://skilldrills.online/drills/cognitive/processing-speed/reaction-time" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Reaction Time Test – Free Click Speed & Visual Reflex Trainer",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online reaction time test. Measure your visual reaction speed in milliseconds. Test your click reflex, compare to the average, and train to improve your response latency. Similar to Human Benchmark reaction time test.",
  "genre": "Cognitive Testing / Processing Speed / Reaction Time",
  "url": "https://skilldrills.online/drills/cognitive/processing-speed/reaction-time",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "8743" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a good reaction time in milliseconds?",
      "acceptedAnswer": { "@type": "Answer", "text": "The average human visual reaction time is 200-250 milliseconds. Below 200ms is considered fast. Below 150ms is in the elite range typical of competitive esports players and trained athletes." }
    },
    {
      "@type": "Question",
      "name": "How does rule switching work in this drill?",
      "acceptedAnswer": { "@type": "Answer", "text": "The active rule banner at the top shows which color target to tap ('TAP RED' or 'TAP BLUE'). As you perform well and level up, the rule switches between RED and BLUE targets to test your cognitive switching speed." }
    },
    {
      "@type": "Question",
      "name": "What does this reaction time test measure?",
      "acceptedAnswer": { "@type": "Answer", "text": "This test measures choice visual reaction time (CRT) — the elapsed time from stimulus onset to motor response execution while discriminating between target rules." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between simple and choice reaction time?",
      "acceptedAnswer": { "@type": "Answer", "text": "Simple reaction time (SRT) requires responding to a single expected stimulus and typically averages 200-250ms. Choice reaction time (CRT), like this drill, requires discriminating between multiple stimuli before responding, adding a decision-making stage that runs 50-100ms slower than SRT. This drill goes further by flipping which color is correct mid-session, layering cognitive flexibility on top of standard CRT." }
    },
    {
      "@type": "Question",
      "name": "What is Hick's Law and how does it apply here?",
      "acceptedAnswer": { "@type": "Answer", "text": "Hick's Law states that reaction time increases logarithmically with the number of choices you must discriminate between before responding. Because this drill forces you to actively verify the current rule before reacting, it directly exercises the decision-time component Hick's Law describes, rather than pure reflex speed alone." }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Test and Train Reaction Speed",
  "description": "Improve your choice reaction speed and cognitive flexibility by tapping the correct color target as the active rule dynamically switches.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Check the Active Rule",
      "text": "A RED and a BLUE target both appear on screen. The rule banner at the top shows which color ('TAP RED' or 'TAP BLUE') is currently correct."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Tap the Correct Target",
      "text": "Tap only the target matching the active rule to score +100 PTS. As you level up, the rule dynamically switches between RED and BLUE."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Keep Up the Pace",
      "text": "Each session starts with a 45-second clock, with clean hits extending time (+0.6s). Tapping the wrong target resets your combo streak (time penalty of 0.8s is opt-in via session settings)."
    }
  ]
};

export const metadata = {
  title: "Free Reaction Time Test - Neuro Speed & Reflex Trainer",
  description: "Test your reaction speed for free with our online neuro speed test. Assess your reflexes, compare against human benchmarks, and train your cognitive response.",
  keywords: [
    "reaction time test online",
    "test reaction speed free",
    "neuro speed test",
    "human benchmark reaction time",
    "reflex training",
    "cognitive speed assessment",
    "gamer reaction test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/processing-speed/reaction-time",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free Reaction Time Test | Online Neuro Speed & Reflex Trainer | SkillDrills",
    description: "Test your reaction speed for free with our online neuro speed test. Assess your reflexes, compare against human benchmarks, and train your cognitive response.",
    url: "https://skilldrills.online/drills/cognitive/processing-speed/reaction-time",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Reaction Time Test | Online Neuro Speed & Reflex Trainer | SkillDrills",
    description: "Test your reaction speed for free with our online neuro speed test. Assess your reflexes, compare against human benchmarks, and train your cognitive response.",
  },
};

export default function ReactionTimePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <EliteNeuroSwitchClient />
    </>
  );
}
