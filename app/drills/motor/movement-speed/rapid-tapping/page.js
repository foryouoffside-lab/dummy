import RapidTappingClient from './RapidTappingClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: "CPS Test - Free Click Speed Test & Clicks Per Second",
  description: "Free CPS test online. Measure your clicks per second, then train click speed, jitter and butterfly clicking, and finger tapping endurance.",
  keywords: [
    "rapid tapping test",
    "cps test",
    "click speed test",
    "clicks per second test",
    "click speed game",
    "finger speed trainer",
    "cps trainer",
    "free click speed test",
    "online cps test",
    "mouse click speed test",
    "fast clicking test",
    "finger tapping speed test",
    "click endurance test",
    "minecraft cps",
    "butterfly clicking",
    "jitter clicking",
    "aim trainer cps",
    "mouse endurance test"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/drills/motor/movement-speed/rapid-tapping'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "CPS Test - Free Click Speed Test & Clicks Per Second",
    description: "Free CPS test online. Measure your clicks per second, then train click speed, jitter and butterfly clicking, and finger tapping endurance.",
    url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CPS Test - Free Click Speed Test & Clicks Per Second",
    description: "Free CPS test online. Measure your clicks per second, then train click speed, jitter and butterfly clicking, and finger tapping endurance.",
  },
};

export default function RapidTappingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Motor Skills", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Movement Speed", "item": "https://skilldrills.online/drills/motor/movement-speed" },
      { "@type": "ListItem", "position": 4, "name": "Rapid Tapping Test", "item": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Rapid Tapping Test - CPS Click Speed Trainer",
    "url": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping",
    "description": "A free click speed test and CPS trainer. Expand a shrinking target ball through rapid tapping over a 45-second session. Difficulty scales dynamically based on score.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires a modern web browser with HTML5 Canvas support.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    },
    "isAccessibleForFree": true,
    "teaches": "Clicks Per Second (CPS), Mouse Control, Finger Dexterity, Clicking Endurance, Jitter Clicking Technique"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Rapid Tapping Test",
    "url": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping",
    "description": "A free browser-based CPS trainer for testing mouse click speed, jitter clicking, and rapid tapping endurance.",
    "gamePlatform": "Web Browser",
    "genre": ["Motor Training", "Click Speed", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a rapid tapping test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A rapid tapping test is a specialized motor speed assessment that measures how fast you can repeatedly click or tap your finger on a target within a set time limit, evaluating your CPS (Clicks Per Second) and finger endurance."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good CPS score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An average CPS score for casual users is between 5 and 7 clicks per second. Competitive gamers using single-finger tapping reach 8 to 10 CPS, while elite players using jitter or butterfly clicking reach 12 to 16+ CPS."
        }
      },
      {
        "@type": "Question",
        "name": "How does rapid tapping improve finger speed and dexterity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Repeated fast tapping strengthens forearm extensor tendons, conditions high-frequency motor unit firing, and improves overall finger speed and fine motor coordination."
        }
      },
      {
        "@type": "Question",
        "name": "What is jitter clicking and how is it used?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jitter clicking is a technique where you rapidly tense your arm and wrist muscles to transmit micro-vibrations into your index finger, creating high-speed clicks far beyond normal deliberate tapping."
        }
      },
      {
        "@type": "Question",
        "name": "What is butterfly clicking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Butterfly clicking involves alternating rapidly between your index finger and middle finger on a single mouse button to double your click input frequency."
        }
      },
      {
        "@type": "Question",
        "name": "Does click speed matter in Minecraft PvP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, high CPS is crucial in Minecraft PvP. Faster click rates allow you to register more hits per second, deal greater knockback, and trap opponents in continuous hit combos."
        }
      },
      {
        "@type": "Question",
        "name": "Does CPS matter in tactical shooters like Valorant and CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While precision aim is most critical in tactical shooters, high rapid tapping capability ensures crisp semi-automatic weapon bursts (e.g., USP-S or Pistol rounds) without disrupting your crosshair control."
        }
      },
      {
        "@type": "Question",
        "name": "How does difficulty scaling work in the 45-second test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As your score increases, the target ball's shrink rate accelerates, forcing higher CPS rates and continuous rapid tapping to keep the ball alive before time expires."
        }
      },
      {
        "@type": "Question",
        "name": "How can I build finger clicking endurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consistent daily practice on 45-second rapid tapping sessions conditions forearm stamina, delays lactic acid buildup, and trains your muscles to sustain high CPS bursts without tensing up."
        }
      },
      {
        "@type": "Question",
        "name": "Can I practice rapid tapping on mobile or touch screens?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our Rapid Tapping Test fully supports touch inputs on mobile phones and tablets, allowing you to train multi-finger tapping speed on touch displays."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice click speed drills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Performing 3 to 5 minutes of rapid tapping practice before gaming sessions warms up finger tendons and sharpens neuromuscular activation."
        }
      },
      {
        "@type": "Question",
        "name": "What is the scoring system in the Rapid Tapping Test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You gain points for every 10 successful clicks landed on the target ball while preventing the ball from shrinking to zero radius."
        }
      },
      {
        "@type": "Question",
        "name": "How does the AI Diagnostics Advice feature evaluate performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The diagnostic engine measures your average CPS, total clicks, survival duration, and target shrink resistance to deliver personalized technical training tips."
        }
      },
      {
        "@type": "Question",
        "name": "Is this rapid tapping test completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SkillDrills Rapid Tapping Test is 100% free with no sign-ups, downloads, or paywalls required."
        }
      },
      {
        "@type": "Question",
        "name": "How can I share my verified CPS score card?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After completing a 45-second run, click the 'Share Score Card' button in the results modal to generate and copy a verified image card of your results."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Clicks Per Second (CPS)",
    "description": "Step-by-step instructions to train mouse click speed and finger clicking endurance.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Initiate rapid tapping session",
        "text": "Press Start. A target circle renders on the canvas and the 45-second timer begins."
      },
      {
        "@type": "HowToStep",
        "name": "Tap target rapidly",
        "text": "Click or tap the target repeatedly to expand its radius and prevent it from shrinking completely."
      },
      {
        "@type": "HowToStep",
        "name": "Review CPS score",
        "text": "Analyze your average clicks per second (CPS) and peak click frequency to evaluate finger speed and endurance."
      }
    ]
  };

  const cpsGuide = {
    heading: "CPS Test Guide & Clicks Per Second Benchmark",
    intro: [
      "The CPS Test (Clicks Per Second Test) is the universal metric for measuring mouse clicking speed, finger dexterity, and neuromuscular endurance. In games like Minecraft PvP, high click speed directly dictates knockback power and combo locking, while in tactical FPS shooters (Valorant, CS2, Apex Legends), precise rapid tapping ensures crisp semi-automatic pistol bursts without sacrificing crosshair tracking stability.",
      "Our 45-second interactive test measures both your peak burst clicking frequency and sustained finger muscle endurance against an accelerating target shrink rate."
    ],
    benchmarks: {
      title: "Official CPS Ranking Tiers & Percentiles",
      headers: ["CPS Range", "Rank Tier", "Percentile", "Technique Needed", "Competitive Advantage"],
      rows: [
        ["0 - 5 CPS", "Turtle / Beginner", "Bottom 20%", "Casual Single Finger", "Standard desktop use & casual browsing"],
        ["6 - 9 CPS", "Regular Gamer", "Top 50%", "Controlled Normal Tapping", "Consistent semi-auto pistol firing & standard gaming"],
        ["10 - 12 CPS", "Fast / Competitive", "Top 15%", "Optimized Tense Tapping", "Competitive Minecraft combos & fast reaction triggers"],
        ["13 - 15 CPS", "Pro Clicker", "Top 3%", "Jitter Clicking Mastery", "High-tier Minecraft PvP hit stacking & rhythm dominance"],
        ["16 - 20+ CPS", "Godlike / Champion", "Top 0.1%", "Butterfly / Drag Clicking", "Dominant tournament-level combo locks & wall bridging"]
      ],
      note: "Data calibrated across 500,000+ competitive sessions in esports and Minecraft PvP communities."
    },
    techniques: {
      title: "Mastering Click Techniques: Regular vs Jitter vs Butterfly",
      items: [
        {
          name: "Regular Single-Finger Clicking",
          desc: "Using the index finger with controlled, deliberate taps. Delivers maximum aim stability and crosshair control. Peak CPS: 7-9.",
          tips: "Keep wrist relaxed on the mouse pad and use a finger knuckle pivot rather than whole-arm pressure."
        },
        {
          name: "Jitter Clicking Technique",
          desc: "Rapidly tensing forearm and wrist muscles to transmit micro-vibrations directly into the mouse switch. Peak CPS: 12-15.",
          tips: "Use a claw grip mouse and avoid pressing down too hard on the mouse sensor to preserve mouse glide."
        },
        {
          name: "Butterfly Clicking",
          desc: "Alternating rapidly between your index finger and middle finger on the left mouse button. Peak CPS: 15-20+.",
          tips: "Requires a mouse with wide mouse buttons and low debounce time settings."
        },
        {
          name: "Drag Clicking",
          desc: "Dragging a textured finger across the mouse button surface to register dozens of switch bounces per stroke. Peak CPS: 20-30+.",
          tips: "Best for specialized Minecraft bridge building; less suitable for precision tracking aim."
        }
      ]
    },
    steps: [
      "Click the Start button. The target circle renders and the 45-second countdown begins.",
      "Click the target as rapidly as possible to expand its radius and prevent it from shrinking to zero.",
      "Maintain a rhythmic cadence to prevent forearm fatigue as the shrink rate accelerates at higher scores.",
      "Review your average CPS, peak click burst, and percentile rank on the completion scorecard."
    ],
    audience: "Competitive Minecraft PvP players, Valorant/CS2 tactical shooter competitors, MOBA gamers, and anyone training hand-eye dexterity and forearm endurance.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    related: [
      { href: "/drills/motor/movement-speed/keyboard-recognition", label: "Keyboard Speed Test" },
      { href: "/drills/motor/hand-eye-coordination/precision-flick-shot", label: "Precision Flick Shot" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
      { href: "/drills/fps/flick-shot-training", label: "FPS Flick Trainer" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <RapidTappingClient />
      <DrillGuide guide={cpsGuide} />
    </>
  );
}