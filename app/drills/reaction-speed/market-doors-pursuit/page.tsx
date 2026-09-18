import MarketDoorsPursuitWrapper from './MarketDoorsPursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Corner Checking Trainer - Saccadic Eye Training Drill",
  description: "Free corner checking trainer online. Train saccadic eye movements, doorway clearing reflexes, and tactical pie-slicing for FPS games and sports vision.",
  keywords: ["corner checking trainer", "saccadic eye movement training", "corner checking drill", "slicing the pie shooting", "saccadic eye exercises", "clearing angles fps", "how to clear corners valorant", "checking corners in fps", "visual tracking exercises", "eye tracking training for gamers", "sports vision training drills", "tactical clearing angles trainer", "saccadic eye movement dysfunction exercises", "prefire corner checking map", "angle clearing drill online", "free reflex trainer browser", "gaming eye coordination test", "threat checking speed game"],
  openGraph: {
    title: "Corner Checking Trainer - Saccadic Eye Training Drill",
    description: "Free corner checking trainer online. Train saccadic eye movements, doorway clearing reflexes, and tactical pie-slicing for FPS games and sports vision.",
    type: 'article',
    url: 'https://skilldrills.online/drills/reaction-speed/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Corner Checking Trainer - Saccadic Eye Training Drill",
    description: "Free corner checking trainer online. Train saccadic eye movements, doorway clearing reflexes, and tactical pie-slicing for FPS games and sports vision.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/market-doors-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/market-doors-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://skilldrills.online"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Drills Hub",
      "item": "https://skilldrills.online/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Reaction Speed",
      "item": "https://skilldrills.online/drills/reaction-speed"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Corner Checking Trainer",
      "item": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Corner Checking Trainer — Saccadic Eye Training Drill",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free corner checking trainer online. Train saccadic eye movements, doorway clearing reflexes, and tactical pie-slicing for FPS games and sports vision.",
  "url": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Corner Checking Trainer",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas, modern web browser with Pointer Lock support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit",
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Corner Checking Trainer – Tactical Doorway Clearing & Saccadic Pursuit Game",
  "url": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit",
  "description": "Free corner checking trainer online. Train saccadic eye movements, doorway clearing reflexes, and tactical pie-slicing for FPS games and sports vision.",
  "genre": [
    "Action",
    "Tactical Training",
    "Esports Vision"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is corner checking in tactical shooters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Corner checking is the systematic practice of clearing potential ambush angles one by one (slicing the pie) so that you only expose your character model to a single threat vector at any given moment."
      }
    },
    {
      "@type": "Question",
      "name": "What is 'slicing the pie' in tactical FPS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slicing the pie is a tactical movement technique where a player moves in an arc around a doorway or corner, revealing thin geometric slivers of the room incrementally to isolate opponents."
      }
    },
    {
      "@type": "Question",
      "name": "How do saccadic eye movements assist in corner clearing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each time you check a new angle, your eyes execute a rapid saccade (20–40 ms, Rayner, 1998) followed by instant visual foveation to verify if an enemy is positioned in that slice."
      }
    },
    {
      "@type": "Question",
      "name": "What causes players to get caught while clearing angles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Players often rush past multiple sightlines simultaneously (over-exposing to multiple angles) or look at their crosshair rather than scanning the depth of the revealed doorway."
      }
    },
    {
      "@type": "Question",
      "name": "What is pre-aiming (crosshair placement) during corner checks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pre-aiming is positioning your crosshair through walls at the exact coordinates where an enemy's head will be when you step out, eliminating flick time upon visual exposure."
      }
    },
    {
      "@type": "Question",
      "name": "How does dynamic doorway breakout training work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This drill spawns high-threat targets breaking through sequential doors and barriers, testing both your angle verification speed and your stopping-power reaction time."
      }
    },
    {
      "@type": "Question",
      "name": "What role does mental chronometry play in corner clearing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple reaction time is ~200 ms, but in complex multi-door scenarios, choice reaction latency increases as the brain evaluates threat priority across multiple openings (Donders, 1868)."
      }
    },
    {
      "@type": "Question",
      "name": "How does high refresh rate display technology aid corner checking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 144Hz+ display updates door breakout animations at sub-7 ms intervals (Woods et al., 2015), allowing faster visual confirmation before an enemy crosses your path."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best training schedule for clearing angles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10 to 15 minutes of dedicated corner checking practice before competitive matchmaking sharpens visual scanning habits and reduces fatal blindspot rushes."
      }
    },
    {
      "@type": "Question",
      "name": "Is this drill completely free on SkillDrills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this training tool 100% free with no registration, software installation, or subscriptions."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Corner Checking Trainer",
  "description": "Free corner checking trainer online. Train saccadic eye movements, doorway clearing reflexes, and tactical pie-slicing for FPS games and sports vision.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Inspect Doorway Geometry and Prepare Saccades",
      "text": "Scan the layout of incoming doorways and identify sequential clearing priorities.",
      "url": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Slice the Angle Incrementally",
      "text": "Approach the opening systematically, checking outer boundaries before sweeping deeper into the room.",
      "url": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Identify Target Breakout Stimulus",
      "text": "Foveate immediately on any target emerging from door portals or barrier gaps.",
      "url": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Execute Decisive Center Hit",
      "text": "Deliver a precise reaction shot directly on the target center before it slips past your crosshair threshold.",
      "url": "https://skilldrills.online/drills/reaction-speed/market-doors-pursuit#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rayner1998', 'donders1868', 'woods2015'),
  intro: {
    title: "Corner Checking Trainer",
    paragraphs: [
      "Free corner checking trainer online. Train saccadic eye movements, doorway clearing reflexes, and tactical pie-slicing for FPS games and sports vision.",
      "Slicing the pie is a tactical movement technique where a player moves in an arc around a doorway or corner, revealing thin geometric slivers of the room incrementally to isolate opponents.",
      "Each time you check a new angle, your eyes execute a rapid saccade (20–40 ms, Rayner, 1998) followed by instant visual foveation to verify if an enemy is positioned in that slice.",
    ],
  },
  benchmarks: {
    title: 'Standardized Performance Benchmarks',
    headers: ['Tier', 'Rank', 'Rating', 'Accuracy', 'Percentile'],
    rows: [
      { tier: 'Tier 1', rank: 'Grandmaster / Pro', stat: 'Top 1%', level: 'Elite', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Master', stat: 'Top 5%', level: 'Diamond', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Pro', stat: 'Top 15%', level: 'Platinum', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Intermediate', stat: 'Top 50%', level: 'Gold', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Novice', stat: 'Base', level: 'Silver', accuracy: '<78%', percentile: 'Novice' },
    ],
  },
  protocols: {
    title: 'Core Performance Training Protocols',
    description: 'Evidence-based cognitive and neuromuscular enhancement routines.',
    items: [
      { title: "Inspect Doorway Geometry and Prepare Saccades", description: "Scan the layout of incoming doorways and identify sequential clearing priorities." },
      { title: "Slice the Angle Incrementally", description: "Approach the opening systematically, checking outer boundaries before sweeping deeper into the room." },
      { title: "Identify Target Breakout Stimulus", description: "Foveate immediately on any target emerging from door portals or barrier gaps." },
      { title: "Execute Decisive Center Hit", description: "Deliver a precise reaction shot directly on the target center before it slips past your crosshair threshold." },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function EnhancedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <MarketDoorsPursuitWrapper copy={{ title: "Corner Checking Trainer" }} />
      <DrillGuide {...guideProps} />
    </>
  );
}
