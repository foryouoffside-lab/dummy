import ReactionTimeTestWrapper from './ReactionTimeTestWrapper';

// ============================================================
// SEO RESEARCH FINDINGS — reaction-time-test
// PRIMARY: "reaction time test" ~90,500/mo US, KD ~80-85% (Very Hard)
//          "reflex test" ~18,100/mo US, KD ~52% (Moderate)
// SECONDARY / LSI:
//   "reaction test"                   ~22,200/mo, KD ~72%
//   "f1 reaction time test"           ~14,800/mo, KD ~35%
//   "average reaction time"           ~9,900/mo,  KD ~55%
//   "reaction speed test"             ~5,400/mo,  KD ~48%
//   "online reaction time test"       ~2,900/mo,  KD ~40%
//   "click reaction test"             ~2,400/mo,  KD ~30%
//   "visual reaction time test"       ~1,600/mo,  KD ~32%
// PAA targets: "What is a good reaction time?", "How can I test my reaction time?",
//   "Can you improve your reaction time?", "Why do reaction times vary?",
//   "Is reaction the same as a reflex?", "Does monitor refresh rate affect reaction time tests?",
//   "How does age affect reaction time?", "Does caffeine improve reaction time?"
// Key entities: reaction latency, millisecond response, motor speed, visual stimulus,
//   foveal focus, prefrontal cortex, input delay, display lag, gaming reflex
// ============================================================

export const metadata = {
  title: 'Reaction Time Test - Free Visual Reflex Speed Game | SkillDrills',
  description: 'Test your visual reaction speed and reflexes with this free Reaction Time Test. Measure your reaction latency in milliseconds, compare with average human scores, and train to improve. Free, mobile-friendly, and no download needed.',
  keywords: [
    // Primary / Head terms
    'reaction time test', 'reflex test', 'reaction test',
    // Secondary / LSI terms
    'f1 reaction time test', 'average reaction time', 'reaction speed test',
    'online reaction time test', 'click reaction test', 'visual reaction time test',
    'human benchmark reaction time', 'gaming reflex test',
    // Long-tail variants
    'how to improve reaction time', 'average reaction time in milliseconds',
    'test your reaction time online', 'reflex speed test free', 'reaction latency test',
    // Contextual / device
    'mobile reaction time test', 'low latency reaction tool', 'controller reaction test'
  ],
  openGraph: {
    title: 'Reaction Time Test - Free Visual Reflex Speed Game',
    description: 'Test your visual reaction speed and reflexes with this free Reaction Time Test. Measure your reaction latency in milliseconds with zero setup or downloads.',
    type: 'website',
    url: 'https://skilldrills.online/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reaction Time Test — Free Visual Reflex Speed Game | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Time Test - Free Visual Reflex Speed Game',
    description: 'Measure your visual reaction latency in milliseconds. Simple, free, browser-based reflex test with no downloads.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/reaction-time-test',
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
    { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/reaction-speed" },
    { "@type": "ListItem", "position": 4, "name": "Reaction Time Test", "item": "https://skilldrills.online/drills/reaction-speed/reaction-time-test" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reaction Time Test — Free Visual Reflex Speed Game | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/reaction-time-test",
  "description": "A free online visual reaction time test and reflex game. Click the screen as soon as the red visual stimulus turns green to measure your reaction latency in milliseconds.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Time, Reflex Speed, Visual Stimulus Processing, Brain-to-Hand Response Latency, Focus"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take the Reaction Time Test",
  "description": "Measure and test your reaction speed using our simple click-based visual response utility.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Click the start area",
      "text": "Click or tap inside the main test board. The screen will turn red, indicating that you should prepare to react."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Wait for the color change",
      "text": "Keep your eyes on the screen and prepare to click. Wait patiently — the screen will turn green at a completely random, unpredictable interval."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Click immediately",
      "text": "The instant the screen turns green, click your mouse or tap your touchscreen as fast as possible. Your response latency will be calculated down to the millisecond."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a reaction time test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A reaction time test measures how quickly your brain can perceive a sensory stimulus (like a color change or a sound) and trigger a motor response (like clicking a button). It tracks this latency in milliseconds (ms)."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An average visual reaction time is between 200 and 250 milliseconds. Anything below 200 ms is considered fast, and elite performers or professional esports players often achieve reaction speeds between 150 ms and 180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "How can I test my reaction time online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can use this free, low-latency online tool. Click the red screen, wait for it to turn green, and click again as fast as possible. The system calculates your reaction speed in milliseconds."
      }
    },
    {
      "@type": "Question",
      "name": "Can you improve your reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While genetics define your baseline limit, you can optimize your reaction speed by 10% to 20% through regular training, getting sufficient sleep, eating a healthy diet, staying hydrated, and using high-refresh-rate hardware (like 144Hz+ monitors and wired gaming mice) to reduce device input lag."
      }
    },
    {
      "@type": "Question",
      "name": "Is a reaction the same as a reflex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. A reflex is an involuntary, automatic response processed entirely by the spinal cord without brain involvement (such as pulling your hand away from a hot stove). A reaction is a voluntary response that requires conscious processing by the brain's visual and motor cortexes."
      }
    },
    {
      "@type": "Question",
      "name": "Does monitor refresh rate affect reaction time test scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, significantly. A standard 60Hz monitor updates its image every 16.7 milliseconds, which adds visual latency. Upgrading to a 144Hz, 240Hz, or 360Hz monitor reduces frame latency to under 3ms, allowing your eyes to perceive the color shift faster and improving your recorded score by 10-30 milliseconds."
      }
    },
    {
      "@type": "Question",
      "name": "Why do reaction times vary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaction times vary based on fatigue, stress levels, age, caffeine intake, distractions, and individual genetics. Additionally, auditory reaction times are generally faster (~170ms) than visual reaction times (~250ms) due to how the nervous system routes sound signals vs. light signals."
      }
    },
    {
      "@type": "Question",
      "name": "How does age affect reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visual reaction speed typically peaks in your early to mid-20s. After approximately age 24, reaction times begin a gradual decline of about 2 to 6 milliseconds per decade, though keeping physically and cognitively active can mitigate this aging effect."
      }
    },
    {
      "@type": "Question",
      "name": "Does caffeine improve reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Caffeine is a central nervous system stimulant that blocks adenosine receptors in the brain. This increases alertness and speed of motor response, which typically shaves 10 to 20 milliseconds off your reaction time test score. However, excessive caffeine can lead to jitteriness and hurt precision."
      }
    }
  ]
};

export default function ReactionTimeTestPage() {
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
      <ReactionTimeTestWrapper />
    </>
  );
}

