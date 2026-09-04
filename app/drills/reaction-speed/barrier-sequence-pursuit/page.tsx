import BarrierSequencePursuitWrapper from './BarrierSequencePursuitWrapper';

export const metadata = {
  title: 'Jiggle Peek Trainer - Cover Peeking Reflex Drill',
  description: 'Free jiggle peek trainer online. Train angle holding and cover peeking reflexes, beat peeker\'s advantage, and build esports target recognition.',
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
    title: 'Jiggle Peek Trainer - Cover Peeking Reflex Drill',
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
        "text": "It is an online reflex training drill where targets emerge from behind tactical cover barriers, testing your angle holding and rapid trigger timing."
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
