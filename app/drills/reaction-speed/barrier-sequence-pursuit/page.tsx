import BarrierSequencePursuitWrapper from './BarrierSequencePursuitWrapper';
import DrillGuide from '@/components/drill/DrillGuide';

// ============================================================
// SEO RESEARCH FINDINGS — barrier-sequence-pursuit
// PRIMARY: "jiggle peek trainer" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
// SECONDARY / LSI:
//   "cover peeking reflex drill" / "peeker's advantage" — 0 exact / 0 broad (Bing API 2026-09-04)
// ============================================================

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

const barrierSequenceGuide = {
  heading: "Jiggle Peek Trainer Guide: Beating Peeker's Advantage & Mastering Cover Reflexes",
  intro: [
    "In competitive first-person shooters like CS2 and Valorant, the duel between an angle holder and an angle peeker is determined by milliseconds, visual reaction speed, and network latency. The phenomenon known as 'peeker's advantage' gives an accelerating peeker a brief temporal lead because client-side position data must travel to the server and down to the angle holder.",
    "To neutralize peeker's advantage, players use techniques like jiggle peeking (brief micro-strafes behind cover to bait shots or gather info) and dynamic crosshair offsetting. This Jiggle Peek Trainer isolates cover peeking reflexes, conditioning your ability to react to micro-targets flashing behind barrier sequences."
  ],
  benchmarks: {
    title: "Cover Peeking & Angle Hold Reference Tiers",
    headers: ["Reaction Window", "Hold Rank", "Detection Accuracy", "Tactical Equivalent", "Recommended Training Focus"],
    rows: [
      ["< 185 ms", "Radiant / Pro Hold", "98%+", "Elite AWPer / Sniper / Pro Anchor", "Micro-adjust for shoulder baits without discharging ammo prematurely"],
      ["185 – 225 ms", "Immortal / Faceit 10", "92% – 97%", "High-level tactical anchor", "Maintain crosshair offset discipline against varied peek speeds"],
      ["226 – 280 ms", "Ascendant / Diamond", "85% – 91%", "Solid competitive player", "Avoid holding too close to the barrier edge where peek speed is highest"],
      ["281 – 350 ms", "Platinum / Gold", "70% – 84%", "Average FPS gamer", "Learn to re-peek rather than remaining static after missing the initial shot"],
      ["> 350 ms", "Silver / Bronze", "< 70%", "Developing / Casual", "Prone to getting caught off-guard by wide swings and shoulder peeks"]
    ],
    note: "These reaction brackets are an editorial reference guide. Network ping, display refresh rate, and monitor input lag heavily modulate live online peeking duels."
  },
  techniques: {
    title: "Cover Peeking & Counter-Peek Mechanics",
    items: [
      {
        name: "Crosshair Offsetting vs. Edge Hugging",
        desc: "Beginner angle holders place their crosshair directly on the corner edge of a barrier. Because human visual reaction takes ~200ms and peeking targets move at high speed, the enemy will travel past your crosshair before you can click. Offsetting your crosshair 1–2 target widths from the barrier edge allows the enemy to run directly into your shot.",
        tips: "Widen your crosshair offset when holding against fast full-strafing opponents."
      },
      {
        name: "Shoulder Bait Discrimination",
        desc: "Savvy opponents execute shoulder peeks without exposing their head to bait your shot and force a reload. Training target discrimination helps you identify whether an emerging shape is a full swing or a micro-bait before firing.",
        tips: "Wait for the central mass of the target before releasing your click."
      },
      {
        name: "Jiggle Peeking Execution",
        desc: "When executing a jiggle peek yourself, tap counter-movement keys (A and D) with minimal amplitude so only your shoulder peeks past the wall for 50–80ms before disappearing.",
        tips: "Keep your crosshair centered on the pre-aim location even while rapidly jiggling."
      },
      {
        name: "Offsetting Hardware & Network Lag",
        desc: "Monitor refresh rates (144Hz vs 240Hz) and input latency compounds with online ping. Maximizing display framerates minimizes the visual penalty imposed by enemy peeker's advantage.",
        tips: "Enable low-latency modes (NVIDIA Reflex / AMD Anti-Lag) in your driver settings."
      }
    ]
  },
  steps: [
    "Select your barrier speed and difficulty preset, then enter full screen mode.",
    "Offset your crosshair slightly off the barrier boundary at anticipated head level.",
    "Focus your attention on the gap where the peeking target emerges.",
    "The instant the target breaks cover past the barrier, click immediately to score the tag.",
    "Review your reaction latency, hit percentage, and reaction consistency across rounds."
  ],
  audience: "Tactical FPS players (Valorant, CS2, Rainbow Six Siege), sniper/AWP anchors, and competitive gamers seeking to counter peeker's advantage.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  related: [
    { href: "/drills/reaction-speed/market-doors-pursuit", label: "Corner Checking Trainer" },
    { href: "/drills/reaction-speed/fps-tracking-trainer", label: "FPS Tracking Trainer" },
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/reaction-game", label: "Reaction Game" }
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
      <DrillGuide guide={barrierSequenceGuide} />
    </>
  );
}
