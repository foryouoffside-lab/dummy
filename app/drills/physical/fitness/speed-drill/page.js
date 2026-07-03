import SpeedDrillClient from './SpeedDrillClient';

// ============================================================
// SEO RESEARCH FINDINGS — speed-drill
// PRIMARY: "reaction time test"       ~33,100/mo, KD ~35%
//          "click speed test"         ~27,100/mo, KD ~28%
// SECONDARY / LSI:
//   "reflex test"                     ~9,900/mo,  KD ~32%
//   "reflex training game"            ~210/mo,    KD ~18%
//   "reaction time trainer"           ~880/mo,    KD ~22%
// PAA targets: "What is a reaction time test?", "What is a good reaction time?",
//   "How can I improve my reaction time?", "Does reaction time matter in Valorant and CS2?",
//   "Is this click speed test free to play?"
// ============================================================

export const metadata = {
  title: 'Reaction Time Test - Free Click Speed & Reflex Trainer | SkillDrills',
  description: 'Take the free online Reaction Time Test. Improve your click speed, mouse accuracy, and gaming reflexes with this adaptive tracking trainer. No sign-up required.',
  keywords: [
    // Primary / Head terms
    'reaction time test', 'click speed test',
    // Secondary / LSI terms
    'reflex test', 'reflex training game', 'reaction time trainer',
    'reaction time test online', 'visual reaction test', 'click accuracy test',
    // Long-tail variants
    'free online visual reflex test', 'improve clicking reaction time gaming',
    'mouse precision reaction test browser', 'esports speed and agility click trainer'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/speed-drill',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reaction Time Test - Free Click Speed & Reflex Trainer | SkillDrills',
    description: 'Test and improve your reaction time, click speed, and mouse accuracy with this free online reflex training game. Features adaptive difficulty and motor telemetry.',
    url: 'https://skilldrills.online/drills/physical/fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reaction Time Test - Click Speed and Reflex Trainer | SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Time Test - Free Click Speed & Reflex Trainer',
    description: 'Play the ultimate Reaction Time Test online. Improve your gaming reflexes and click speed instantly. No download or sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
    { "@type": "ListItem", "position": 3, "name": "Fitness", "item": "https://skilldrills.online/drills/physical/fitness" },
    { "@type": "ListItem", "position": 4, "name": "Reaction Time Test (Speed Drill)", "item": "https://skilldrills.online/drills/physical/fitness/speed-drill" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reaction Time Test - Free Click Speed & Reflex Trainer | SkillDrills",
  "url": "https://skilldrills.online/drills/physical/fitness/speed-drill",
  "description": "Free reaction time test and click speed game. Click shrinking, dynamically moving rings before they disappear. Features a 60-second survival loop, level-based difficulty scaling, and professional motor telemetry.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaction Time, Click Speed, Reflex Evasion, Dynamic Target Tracking, Visual-Motor Coordination"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Play the Reaction Time Test",
  "description": "A step-by-step guide to testing your reaction speed, click accuracy, and visual processing.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Engage the Tracker",
      "text": "Click the start button to lock your cursor into the raw-input tracking canvas."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Acquire the Target",
      "text": "A dynamic ring will spawn and immediately begin shrinking and moving. Track it visually."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Click",
      "text": "Move your mouse and click inside the glowing center before the outer ring completely collapses. Success grants points and restores 2 seconds to your clock."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Survive the Scaling",
      "text": "Missing a target or letting it expire violently deducts 4 seconds. As your score reaches higher levels, the targets will spawn smaller, shrink faster, and move erratically."
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
        "text": "A reaction time test measures how quickly your brain can process a visual stimulus and translate it into a physical motor response (like clicking a mouse)."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average human visual reaction time is around 250 milliseconds (ms). Professional esports athletes often score between 150ms and 180ms. This drill tracks your fastest intercepts in real-time."
      }
    },
    {
      "@type": "Question",
      "name": "How can I improve my reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consistent practice with dynamic tracking games conditions your visual cortex to recognize targets faster and reinforces the neural pathways responsible for executing quick motor responses."
      }
    },
    {
      "@type": "Question",
      "name": "Does reaction time matter in Valorant and CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. In low time-to-kill (TTK) tactical shooters like Valorant and CS2, the player who processes visual information and clicks accurately first wins the duel. This drill directly simulates that pressure."
      }
    },
    {
      "@type": "Question",
      "name": "How does the adaptive difficulty work in this test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 100 points you score increases your Level. Higher levels accelerate the target's random velocity, increase the rate at which the ring shrinks, and reduce the maximum spawning size of the target."
      }
    },
    {
      "@type": "Question",
      "name": "Why does my clock drain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike standard aim trainers, this drill actively punishes bad accuracy. Missing a click triggers a penalty, violently draining your master clock by 4 seconds (with no point deductions). You must rely on precise tracking over spastic spamming."
      }
    },
    {
      "@type": "Question",
      "name": "Why are the targets changing colors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is the engine's adaptive speed radar. As you successfully hit the target and build your level, the engine scales up the target's random velocity. The colors shift from Green &rarr; Orange &rarr; Cyan &rarr; Red to visually warn you of the intense speed."
      }
    },
    {
      "@type": "Question",
      "name": "Is this click speed test free to play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The SkillDrills Reaction Time Test is entirely free, open-source, and runs purely in your web browser with zero downloads required."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score for the Reaction Time Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score of 250+ is Gold tier. 800+ indicates Diamond-level trajectory control, and 1200+ with 90% launch accuracy places you in the Master tier."
      }
    },
    {
      "@type": "Question",
      "name": "How long should I practice my reaction speed daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For optimal cognitive adaptation and motor learning, practicing this drill for 5 to 10 minutes a day is more effective than occasional hour-long sessions."
      }
    }
  ]
};

export default function SpeedDrillPage() {
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
      <SpeedDrillClient />
    </>
  );
}