import EliteNeuroSwitchClient from './EliteNeuroSwitchClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

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
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" }
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
      "name": "What is Hick\'s Law and how does it apply here?",
      "acceptedAnswer": { "@type": "Answer", "text": "Hick\'s Law states that reaction time increases logarithmically with the number of choices you must discriminate between before responding. Because this drill forces you to actively verify the current rule before reacting, it directly exercises the decision-time component Hick\'s Law describes, rather than pure reflex speed alone." }
    },
    {
      "@type": "Question",
      "name": "How can I improve my choice reaction time?",
      "acceptedAnswer": { "@type": "Answer", "text": "Evidence-based approaches include: (1) deliberate practice on choice-based (not just simple) reaction drills, since the two skills don't fully transfer, (2) consistent sleep, since fatigue disproportionately slows the decision stage, (3) regular aerobic exercise, which improves neural conduction velocity, and (4) fast-paced action gaming, shown in research to sharpen visual-motor choice reaction speed." }
    },
    {
      "@type": "Question",
      "name": "Why does reaction time matter for gaming and esports?",
      "acceptedAnswer": { "@type": "Answer", "text": "In competitive gaming, choice reaction time determines how quickly you can distinguish a real threat from a decoy and execute the correct response — exactly the skill this drill isolates. Elite esports athletes consistently test in the 150-180ms range for choice reaction tasks, well below the general population average." }
    },
    {
      "@type": "Question",
      "name": "How does scoring and grading work in this drill?",
      "acceptedAnswer": { "@type": "Answer", "text": "Each correct tap on the active rule's target earns points. Tapping the wrong-colored target resets your combo multiplier. When enabled, an opt-in time penalty of 0.8s is deducted. Your final score is graded against an elite benchmark, awarding letter grades from D up to S+." }
    },
    {
      "@type": "Question",
      "name": "Does reaction time change with age?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Choice reaction time is fastest in the late teens to mid-20s, then slows gradually — roughly 1-2ms per year after age 25, accelerating past 60. Regular training can partially offset this decline by keeping the decision-making pathway well-practiced." }
    },
    {
      "@type": "Question",
      "name": "Is this reaction time test free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. This reaction time test on SkillDrills is completely free. No registration, downloads, or subscriptions required. It runs entirely in your browser on both desktop and mobile devices." }
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
  description: "Free online choice reaction time test. Measure how fast you pick the right response, see how Hick\'s law affects your speed, and track your best.",
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
    description: "Free online choice reaction time test. Measure how fast you pick the right response, see how Hick\'s law affects your speed, and track your best.",
    url: "https://skilldrills.online/drills/cognitive/processing-speed/reaction-time",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Reaction Time Test | Online Neuro Speed & Reflex Trainer | SkillDrills",
    description: "Free online choice reaction time test. Measure how fast you pick the right response, see how Hick\'s law affects your speed, and track your best.",
  },
};


const reactiontimeGuide = {
  heading: "Choice Reaction Time Guide & Hick\'s Law",
  intro: [
    "Simple reaction time is responding to one expected signal. Choice reaction time is picking the correct response from several, and it is always slower, because a decision sits between the stimulus and the movement -- the subtraction logic Donders introduced in 1868.",
    "Hick (1952) and Hyman (1953) showed the cost is orderly: reaction time rises roughly with the logarithm of the number of alternatives, so going from two choices to four adds time, but far less than doubling it. Reaction time also slows gradually with age from the mid-twenties onward (Der &amp; Deary, 2006), and what a browser measures always includes your hardware as well as you.",
    "Timing methodology: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup.",
    "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work listed in the References panel below.",
    "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health. If you have concerns about your attention, memory or thinking, speak to a qualified clinician.",
  ],
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('donders1969', 'hick1952', 'hyman1953', 'der2006', 'woods2015'),
  related: [
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/cognitive/focus/distraction-fighter", label: "Stroop Test Online" },
    { href: "/drills/cognitive/processing-speed/symbol-matching", label: "Symbol Digit Modalities Test" },
  ],
};

export default function ReactionTimePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <EliteNeuroSwitchClient />
      <DrillGuide guide={reactiontimeGuide} />
    </>
  );
}
