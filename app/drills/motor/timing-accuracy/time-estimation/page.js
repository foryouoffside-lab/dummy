import TemporalPrecisionClient from './TemporalPrecisionClient';

// ============================================================
// SEO RESEARCH FINDINGS — time-estimation
// Primary: "time perception test" ~9,500/mo US, KD ~22% (Low)
//          "time estimation test" ~3,200/mo US, KD ~16% (Low)
// Long-tail winners (Very Easy / Easy):
//   "chronoception test online"        ~580/mo, KD ~7%
//   "internal clock test"             ~1,100/mo, KD ~13%
//   "how long is 5 seconds game"      ~2,800/mo, KD ~11%
//   "time interval estimation game"    ~320/mo,  KD ~5%
//   "mental chronometry test online"   ~240/mo,  KD ~6%
//   "time sense test"                  ~480/mo,  KD ~8%
//   "can you guess 5 seconds game"    ~1,900/mo, KD ~9%
// Competitors: arealme.com (Time Perception Test), humanbenchmark.com,
//   cognifit.com, helpfulprofessors.com (articles) — none offer survival mechanics
// PAA targets: "What is chronoception?", "Can humans accurately estimate time?",
//   "How do I test my sense of time?", "Does anxiety affect time perception?",
//   "What is the average time estimation accuracy?", "How can I improve my internal clock?"
// Key entities: chronoception, temporal lobe, scalar expectancy theory,
//   circadian rhythm, mental chronometry, time dilation effect
// ============================================================

export const metadata = {
  title: 'Time Perception Test - Free Time Estimation Game | SkillDrills',
  description: 'Test your chronoception with this free time estimation game. Hold and release to match random target intervals — no visible timer. Train your internal clock, improve timing accuracy, and survive the endless clock. No download needed.',
  keywords: [
    // Primary targets
    'time perception test', 'time estimation test', 'internal clock test',
    // Long-tail opportunities (Easy / Very Easy)
    'chronoception test online', 'how long is 5 seconds game',
    'time interval estimation game', 'mental chronometry test online',
    'time sense test', 'can you guess 5 seconds', 'time estimation game free',
    // Secondary / LSI
    'timing accuracy game', 'reaction time test', 'brain timing test',
    'hold and release game', 'stopwatch challenge', 'human timer test',
    // Cognitive / academic segment
    'time dilation perception', 'scalar expectancy theory game',
    'temporal perception online', 'circadian rhythm timing test',
    // Gamer / esports segment
    'FPS timing trainer', 'peeker advantage timing practice',
    'Valorant timing practice', 'chronoception training',
    // General
    'free brain game no download', 'millisecond challenge online'
  ],
  openGraph: {
    title: 'Time Perception Test - Free Time Estimation Game',
    description: 'Test your chronoception: hold and release to match a hidden target time. Train your internal clock with this free browser time estimation game. No download needed.',
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/timing-accuracy/time-estimation',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Time Perception Test — Free Time Estimation Game | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Perception Test - Free Time Estimation Game',
    description: 'Train your chronoception. Hold and release to match random target times — no visible timer. Free browser internal clock game.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/time-estimation',
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
    { "@type": "ListItem", "position": 3, "name": "Timing Accuracy", "item": "https://skilldrills.online/drills/motor/timing-accuracy" },
    { "@type": "ListItem", "position": 4, "name": "Time Perception Test", "item": "https://skilldrills.online/drills/motor/timing-accuracy/time-estimation" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Time Perception Test — Free Time Estimation Game | SkillDrills",
  "url": "https://skilldrills.online/drills/motor/timing-accuracy/time-estimation",
  "description": "A free time estimation and internal clock test (chronoception drill). Press and hold, then release exactly when the target time has elapsed — with no visible timer. Endless survival mechanics scale difficulty dynamically.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Chronoception, Time Estimation, Mental Chronometry, Internal Clock Calibration, Temporal Precision, Focus"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Time Perception Test",
  "description": "Train your chronoception (time sense) by estimating hidden time intervals without a visible timer.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Read the target time",
      "text": "A random target duration (e.g., 1.47 seconds) is displayed on screen. Memorize it — you will not see a timer once you start."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Press and hold",
      "text": "Press and hold the mouse button (or tap and hold on mobile). The timer is now running invisibly inside your mind. Subdivide the seconds mentally using rhythm or counting."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Release at the target time",
      "text": "Release at exactly the target duration. The closer you are to the exact millisecond, the higher your accuracy rating: Exact → Perfect → Good → Miss. Accurate releases add survival time; misses drain it."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Time Estimation Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A time estimation test challenges your brain's internal clock (chronoception). You are given a target duration, and you must hold and release an input exactly when that time has passed, without looking at a physical stopwatch."
      }
    },
    {
      "@type": "Question",
      "name": "What is chronoception?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chronoception is your sensory system for perceiving the passage of time. Unlike sight or hearing, it has no dedicated receptor organ — instead, it emerges from coordinated activity across the brain's basal ganglia, cerebellum, and prefrontal cortex. This drill directly challenges and trains your chronoceptive accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "Why is there no visible timer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Having a visible timer turns the exercise into a simple reflex test. Hiding the timer forces your brain to actively process the passage of time, which builds authentic temporal precision and internal rhythm — skills that transfer to gaming, music, and sports."
      }
    },
    {
      "@type": "Question",
      "name": "Can humans accurately estimate time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but it requires training. Untrained humans typically have a time estimation error of 10–25% on intervals under 5 seconds. With consistent practice on exercises like this drill, that error shrinks to under 3–5%, approaching the accuracy of trained musicians and professional athletes."
      }
    },
    {
      "@type": "Question",
      "name": "How does the survival scoring work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You start with 60 seconds on your global clock. Highly accurate time estimates reward you with additional time (+0.2s up to +1.0s) and large combo points. Missing the target window heavily deducts time. The game ends when your global clock hits zero."
      }
    },
    {
      "@type": "Question",
      "name": "Does this game improve FPS aiming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, temporal precision is crucial in FPS games like Valorant, CS2, and Apex Legends. It helps you perfectly time peeker's advantage, ability cooldowns, and precise movement pauses (counter-strafing)."
      }
    },
    {
      "@type": "Question",
      "name": "Does anxiety affect time perception?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — this is a documented phenomenon. High stress causes the brain to release more adrenaline and dopamine, which can make time feel slower (time dilation). The Adrenaline Mode in this game deliberately triggers this by flashing red warnings when your survival clock drops below 15 seconds, forcing you to maintain chronoception accuracy under pressure."
      }
    },
    {
      "@type": "Question",
      "name": "What is considered a Perfect score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Perfect score is achieved by releasing your hold within a few milliseconds of the target time. Hitting exactly 0ms triggers a rare 'Exact' bonus."
      }
    },
    {
      "@type": "Question",
      "name": "How does the difficulty increase?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score grows, your Level increases. The game starts requesting highly specific decimals (e.g., 1.47s instead of 1.5s), target times become longer, and the acceptable hit window shrinks rapidly."
      }
    },
    {
      "@type": "Question",
      "name": "What is Adrenaline Mode?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When your survival timer drops below 15 seconds, the game triggers Adrenaline Mode. The screen begins to pulse red, heartbeat audio plays, and the pressure is maximized to simulate a clutch scenario — testing if your internal clock holds up under stress."
      }
    },
    {
      "@type": "Question",
      "name": "Can musicians benefit from this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Musicians and drummers rely heavily on internal tempo. This drill acts as a strict metronome test, forcing you to subdivide time mentally without an audible click track."
      }
    },
    {
      "@type": "Question",
      "name": "How can I improve my internal clock?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For optimal internal clock calibration, practice for 5 to 10 minutes a day. Consistent daily exposure trains the brain's temporal processing centers (basal ganglia and cerebellum) much better than long, infrequent sessions. Also try rhythmic activities like drumming, breathing exercises, and counting subdivisions."
      }
    },
    {
      "@type": "Question",
      "name": "Is this Timing Accuracy Game free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the SkillDrills Time Estimation Test is 100% free. It runs completely in your web browser with zero downloads, no latency, and no required sign-ups."
      }
    },
    {
      "@type": "Question",
      "name": "Does it work on mobile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, this game handles touch events perfectly. You can press and hold anywhere on your smartphone or tablet screen to train your reaction and estimation speed."
      }
    },
    {
      "@type": "Question",
      "name": "Is this related to mental chronometry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Mental chronometry is the scientific study of processing speed and internal time perception. This game digitizes those concepts into a competitive, endless survival format that anyone can access for free."
      }
    }
  ]
};

export default function TemporalPrecisionPage() {
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
      <TemporalPrecisionClient />
    </>
  );
}
