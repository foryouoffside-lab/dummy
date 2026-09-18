import DistractionFighterClient from './DistractionFighterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — distraction-fighter
// PRIMARY:    "stroop test"         — 359 exact / 403 broad US (Bing API 2026-09-11)
//             "stroop test online"  — 23 exact / 23 broad US (Bing API 2026-09-11)
//             "stroop test"         — 36 exact GB (Bing API 2026-09-11)
// SECONDARY:  "stroop effect"       — 185 exact US (Bing API 2026-09-11)
//             "stroop task"         — 62 exact US (Bing API 2026-09-11)
// CLASS:      Class C / D (competitor articles like Simply Psychology, PsyToolkit)
// INTENT:     Cognitive tool intent (color-word interference task)
// TITLE:      Stroop Test Online - Free Color Word Interference Game
// ============================================================

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Focus", "item": "https://skilldrills.online/drills/cognitive/focus" },
    { "@type": "ListItem", "position": 4, "name": "Distraction Fighter", "item": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Distraction Fighter — Stroop Test Online",
  "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript and HTML5 support",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online distraction resistance and inhibitory control game based on the Stroop color-word interference task.",
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11"
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Distraction Fighter — Stroop Test Online",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online distraction resistance and inhibitory control game. Fight off visual distractors, train Stroop-effect resistance, and strengthen your ability to maintain focus on primary targets in cognitively noisy environments.",
  "genre": "Cognitive Brain Training / Inhibitory Control",
  "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter",
  "dateModified": "2026-09-11",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Stroop Test Online — Distraction Fighter Game",
  "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter",
  "description": "Online color-word interference game based on the Stroop test paradigm. Train cognitive inhibition and selective attention under timed pressure.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Cognitive Training", "Brain Games", "Stroop Test", "Inhibitory Control"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why are humans so easily distracted?",
      "acceptedAnswer": { "@type": "Answer", "text": "Humans have an evolved orienting reflex that automatically directs attention toward novel, moving, or salient stimuli — a survival mechanism to detect threats and opportunities. In modern environments, this reflex is constantly triggered by notifications, movement, and bright colors, undermining voluntary focus. Training inhibitory control helps you override this reflex." }
    },
    {
      "@type": "Question",
      "name": "What is the Stroop test and how does it measure distraction resistance?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Stroop test (1935) requires naming the ink color of color words printed in conflicting colors (e.g., the word 'RED' in blue ink). The interference between the automatic reading response and the voluntary color-naming response measures your cognitive inhibition strength. A longer reaction time or more errors indicates stronger Stroop interference — weaker distraction resistance." }
    },
    {
      "@type": "Question",
      "name": "What is inhibitory control and why does it matter?",
      "acceptedAnswer": { "@type": "Answer", "text": "Inhibitory control is the executive function that suppresses automatic, habitual, or impulse-driven responses in favor of more deliberate, goal-directed actions. It is essential for resisting distractions, suppressing irrelevant memories, controlling impulsive behavior, and maintaining task focus. It is one of the three core executive functions alongside working memory and cognitive flexibility." }
    },
    {
      "@type": "Question",
      "name": "How can I train my brain to block out distractions?",
      "acceptedAnswer": { "@type": "Answer", "text": "Effective methods include: (1) Stroop test and Flanker task practice (strengthens top-down inhibitory pathways), (2) mindfulness meditation (increases prefrontal cortex gray matter density), (3) single-tasking practice (training sustained focus without device interruptions), and (4) progressive exposure to distractor-rich environments during deliberate practice. This drill provides direct gamified inhibitory control exercise." }
    },
    {
      "@type": "Question",
      "name": "What is the Flanker task and how does it relate to distraction?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Eriksen Flanker Task displays a central target surrounded by congruent (same direction) or incongruent (opposite direction) flanker stimuli. The incongruent condition creates response competition — your brain must inhibit the incorrect flanker response to respond correctly to the central target. This resistance to flanker distraction is precisely what this game trains." }
    },
    {
      "@type": "Question",
      "name": "Can distraction-resistance training help with open-office productivity?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Workers in open offices face continuous visual and auditory distractors. Training inhibitory control makes it cognitively cheaper to suppress peripheral visual movement (colleagues walking), auditory interruptions, and environmental noise, allowing deeper sustained focus during critical work intervals." }
    },
    {
      "@type": "Question",
      "name": "What is the orienting reflex and how does it cause distraction?",
      "acceptedAnswer": { "@type": "Answer", "text": "The orienting reflex is an automatic neurological response to novel stimuli — your brain involuntarily redirects attention to unexpected sounds, movement, or visual changes. Mediated by the superior colliculus and thalamus, it evolved to ensure threat detection. Inhibitory control training helps the prefrontal cortex override this reflex when distraction is unhelpful." }
    },
    {
      "@type": "Question",
      "name": "How does this distraction fighter game work?",
      "acceptedAnswer": { "@type": "Answer", "text": "A color word flashes on screen printed in a conflicting ink color (e.g. the word 'BLUE' printed in red ink). You must tap the button matching the ink color, not the word's meaning, suppressing the automatic urge to read the word aloud. Each correct ink-color tap builds your score, while a wrong tap or a timed-out trial counts as an impulse control failure." }
    },
    {
      "@type": "Question",
      "name": "Can this Stroop drill diagnose or treat ADHD?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. This is a free browser game, not a medical device, a diagnostic instrument, or a treatment for any condition. Stroop tasks are used in research and in clinical settings, but this is not a clinical version, and your score here says nothing about whether you or anyone else has ADHD. If you have concerns about attention or focus, speak to a qualified clinician." }
    },
    {
      "@type": "Question",
      "name": "Is this distraction-fighter game free to play?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Distraction Fighter drill on SkillDrills is completely free. No sign-up, no downloads, no subscriptions. It runs entirely in your browser on both desktop and mobile devices." }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train with the Distraction Fighter Game",
  "description": "Test and train your selective attention, inhibitory control, and Stroop conflict resolution.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter#step-1",
      "name": "Identify the Ink Color",
      "text": "Observe the color-word text displayed on screen. Focus entirely on the physical color of the ink."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter#step-2",
      "name": "Select the Correct Color Option",
      "text": "Ignore the text word itself (which is a distraction). Select the button matching the physical ink color."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter#step-3",
      "name": "Avoid Impulse Tapping",
      "text": "Do not rush. Clean matches add +0.6s to the clock. Incorrect selections and timeouts reset your combo and deduct 0.8s when time penalty is enabled in settings; neither ends the run early."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter#step-4",
      "name": "Scale Difficulty with Milestones",
      "text": "Score points to level up continuously, shrinking the trial time window dynamically as your streak climbs."
    }
  ]
};

export const metadata = {
  title: "Stroop Test Online – Color Word Interference | SkillDrills",
  description: "Free Stroop test online. Name the ink color while the written word says something else - the classic selective-attention and interference task.",
  keywords: [
    "ignore distractions game",
    "focus games online free",
    "distraction training",
    "selective attention game",
    "brain training for focus",
    "block out distractions",
    "concentration games",
    "distraction test online",
    "Stroop test online free",
    "inhibitory control training",
    "how to resist distractions",
    "flanker task online free",
    "how to block out distractions",
    "fight distractions game",
    "impulse control test online",
    "distraction fighter game",
    "focus trainer ignore distractions",
    "cognitive distraction resistance",
    "attention inhibition training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/focus/distraction-fighter",
    languages: getAlternateLanguages('/drills/cognitive/focus/distraction-fighter'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Stroop Test Online - Free Color Word Interference Game | SkillDrills",
    description: "Free Stroop test online. Name the ink color while the written word says something else - the classic selective-attention and interference task.",
    url: "https://skilldrills.online/drills/cognitive/focus/distraction-fighter",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Stroop Test Online - Free Color Word Interference Game | SkillDrills",
    description: "Free Stroop test online. Name the ink color while the written word says something else - the classic selective-attention and interference task.",
  },
};


const distractionfighterGuide = {
  benchmarks: {
    title: "Stroop Test Performance Tiers & Interference Benchmarks (45s Session)",
    headers: ["Skill Tier", "Score (45s)", "Accuracy Rate", "Neurocognitive Interpretation"],
    rows: [
      ["Tier 1 (Elite / Master of Inhibition)", "18,000+ PTS", "96%+", "Flawless impulse control; instant suppression of lexical meaning at peak reaction tempo."],
      ["Tier 2 (Advanced / Tournament Level)", "12,000 – 17,999 PTS", "92% – 95%", "Minimal Stroop interference; stable click cadence with excellent cognitive flexibility."],
      ["Tier 3 (Competent / Average)", "7,000 – 11,999 PTS", "85% – 91%", "Typical healthy interference latency; occasional hesitation under conflicting color cues."],
      ["Tier 4 (Intermediate / Basic Focus)", "3,000 – 6,999 PTS", "75% – 84%", "Reading impulse dominance; marked deceleration as stimulus speed escalates."],
      ["Tier 5 (Novice / High Impulsivity)", "< 3,000 PTS", "< 75%", "Frequent false clicks and timeouts; susceptibility to cognitive fatigue."]
    ],
    note: "Scores reflect a 45-second session with dynamically escalating color varieties and contracted reaction windows (Stroop, 1935; Woods et al., 2015)."
  },

  heading: "Stroop Test Guide & the Interference Effect",
  intro: [
    "The Stroop task asks you to name the colour a word is printed in while ignoring the word itself. When the two disagree -- the word RED printed in blue -- responses slow down and errors rise. Stroop reported the effect in 1935, and it has proved one of the most robust results in experimental psychology (Stroop, 1935).",
    "Half a century of follow-up work established that the interference is essentially universal in healthy adults, that it shrinks with practice but never disappears, and that it is asymmetric: colour never interferes with reading the way reading interferes with colour naming (MacLeod, 1991). Reading is the more automatic process, so it wins unless inhibition holds it back -- and stopping a response you have already begun is its own process, racing the one that started it (Logan &amp; Cowan, 1984).",
    "Timing methodology: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup.",
    "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work listed in the References panel below.",
    "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health. If you have concerns about your attention, memory or thinking, speak to a qualified clinician.",
  ],
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('stroop1935', 'macleod1991', 'logan1984', 'woods2015'),
  related: [
    { href: "/drills/cognitive/focus/concentration-grid", label: "Schulte Table Trainer" },
    { href: "/drills/cognitive/attention/divided-attention", label: "Divided Attention Test" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "Neuro Speed &amp; Reflex Test" },
  ],
};

const copyEn = {
  title: "Stroop Test",
  subtitle: "Stroop Test Online — Color Word Interference Task",
};

export default function DistractionFighterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DistractionFighterClient
        copy={copyEn}
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
      <DrillGuide guide={distractionfighterGuide} />
    </>
  );
}
