import BarrierSequencePursuitWrapper from './BarrierSequencePursuitWrapper';

export const metadata = {
  title: 'Jiggle Peek Trainer - Cover Peeking Reflex Drill | SkillDrills',
  description: 'Train your angle holding and jiggle peek defense with this free Cover Peeking Reflex Drill (Barrier Sequence Pursuit). Improve reaction speed against peeker\'s advantage, optimize visual scanning, and build esports-level target recognition.',
  keywords: [
    // Primary / Head terms
    'jiggle peek trainer', 'cover peeking reflex drill', 'corner peeking trainer',
    // Secondary / LSI terms
    'peeker\'s advantage trainer', 'Valorant angle holding drill', 'crosshair placement trainer',
    'jiggle peek practice', 'how to peek in valorant', 'esports vision training',
    // Long-tail variants
    'visual scanning drills for fps', 'counter peeker\'s advantage cs2',
    'how to hold angles in valorant', 'aimlabs jiggle peek scenario', 'hand eye coordination gaming',
    // General
    'visual tracking game free', 'fps reflex warmup online', 'cover checking drill'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Jiggle Peek Trainer - Cover Peeking Reflex Drill | SkillDrills',
    description: 'Train your angle holding and jiggle peek defense with this free Cover Peeking Reflex Drill. Improve reaction speed against peeker\'s advantage and optimize visual scanning.',
    url: 'https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jiggle Peek Trainer - Cover Peeking Reflex Drill',
    description: 'Improve reaction speed against peeker\'s advantage and optimize visual scanning. Free browser-based jiggle peek trainer.',
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
    { "@type": "ListItem", "position": 4, "name": "Jiggle Peek Trainer", "item": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Jiggle Peek Trainer — Cover Peeking Reflex Drill | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit",
  "description": "Train cover peeking recognition, eye scanning, and target acquisition. A free device-adaptive reaction simulator for mobile, tablet, and desktop.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Jiggle Peek Defense, Angle Holding, Peeker's Advantage Mitigation, Visual Scanning, Saccadic Target Re-acquisition"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Jiggle Peek Trainer (Barrier Sequence Pursuit)",
  "description": "Isolates and trains cover peeking reflex reaction speed, attention shifting, peripheral awareness, and visual re-acquisition speed.",
  "applicationCategory": "EducationalGame",
  "operatingSystem": "Web Browser",
  "isAccessibleForFree": true,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Jiggle Peek Defense and Angle Holding",
  "description": "Improve target recognition speed against peeking visual stimuli popping up behind sequential barrier blocks.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch the Drill",
      "text": "Hit the Start Drill button to enter full-screen interactive training mode."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Monitor Cover Barriers",
      "text": "Keep your gaze centered to monitor all cover barriers simultaneously using peripheral awareness and visual scanning."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Tap",
      "text": "As soon as a target peeks or jiggles out from behind a barrier, tap or click it immediately before it disappears to counter the simulated peeker's advantage."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Chain Consistent Hits",
      "text": "Avoid clicking empty space or missing. Consistent hits raise your level, making targets peek faster and shrink in size."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Barrier Sequence Pursuit (Jiggle Peek Trainer)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Barrier Sequence Pursuit is a reflex aim drill that isolates cover-peeking detection. Targets spawn behind cover barriers, testing visual re-acquisition speed and angle defense."
      }
    },
    {
      "@type": "Question",
      "name": "What is peeker's advantage in gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peeker's advantage is a networking phenomenon where a moving peeker sees a holding defender before the defender sees them. This drill trains quick reaction speed to counter it."
      }
    },
    {
      "@type": "Question",
      "name": "How do you counter a jiggle peek?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Countering a jiggle peek requires high visual scanning. You must place your crosshair slightly off the corner and click the instant the target breaks cover."
      }
    },
    {
      "@type": "Question",
      "name": "Does this help FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. In games like Valorant and CS2, players frequently peek from behind boxes. This drill translates directly to angle holding and reactive clicking."
      }
    },
    {
      "@type": "Question",
      "name": "How does adaptive difficulty work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score climbs, targets shrink in size, peeks occur faster, exposure duration decreases, and barrier cycle timing becomes completely unpredictable."
      }
    },
    {
      "@type": "Question",
      "name": "What mechanical skills does cover peeking pursuit improve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It targets peripheral detection, saccadic eye movement, target re-acquisition speed, and reflexive click accuracy under time pressure."
      }
    },
    {
      "@type": "Question",
      "name": "Is this jiggle peek trainer free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, this drill is completely free and runs directly in your web browser with 1:1 hardware raw input and mobile touch support."
      }
    },
    {
      "@type": "Question",
      "name": "What games benefit from jiggle peek defense training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fast-paced tactical shooters like CS2, Valorant, Rainbow Six Siege, and Apex Legends benefit heavily from enhanced angle defense and cover tracking."
      }
    }
  ]
};

export default function BarrierSequencePursuitPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BarrierSequencePursuitWrapper />
    </>
  );
}
