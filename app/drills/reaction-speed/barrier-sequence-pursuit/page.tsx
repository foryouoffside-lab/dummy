import BarrierSequencePursuitWrapper from './BarrierSequencePursuitWrapper';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — barrier-sequence-pursuit
// PRIMARY CLUSTER: "jiggle peek trainer" (0 exact Bing US, high gamer intent)
// INTERNATIONAL BREAKOUT: "置きエイム" (857 exact / 1,949 broad ja-JP)
// TACTICAL SECONDARY / LSI:
//   "counter peekers advantage", "angle holding drill",
//   "crosshair placement trainer", "cover peeking practice"
// CITATIONS: Riot Games Netcode (deWet & Straily 2020), Valve Lag Compensation,
//            Donders (1868) Mental Chronometry, Woods et al. (2015)
// ============================================================

export const metadata = {
  title: 'Jiggle Peek Trainer - Free Cover Peeking Reflex Drill',
  description: 'Free jiggle peek trainer online. Train defensive angle holding, counter peeker\'s advantage, and master crosshair offsetting for CS2 and Valorant.',
  keywords: [
    'jiggle peek trainer', 'cover peeking reflex drill', 'counter peekers advantage',
    'angle holding drill', 'crosshair placement trainer', 'how to jiggle peek valorant',
    'how to jiggle peek cs2', 'peeker\'s advantage counter', 'fps reaction trainer'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Jiggle Peek Trainer - Free Cover Peeking Reflex Drill',
    description: 'Train defensive angle holding and cover peeking reflexes. Counter peeker\'s advantage and optimize visual scanning in this free browser drill.',
    url: 'https://skilldrills.online/drills/reaction-speed/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jiggle Peek Trainer - Free Cover Peeking Reflex Drill',
    description: 'Improve reaction speed against peeker\'s advantage and master angle holding. Free browser-based jiggle peek trainer.',
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
  "dateModified": "2026-09-05",
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Jiggle Peek Defense, Angle Holding, Peeker's Advantage Mitigation, Visual Scanning, Saccadic Target Re-acquisition"
};

const educationalSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Jiggle Peek Trainer",
  "alternateName": "Barrier Sequence Pursuit",
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
      "name": "Offset Your Crosshair",
      "text": "Position your aim 1–2 target widths away from the barrier edge rather than hugging the corner wall."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "React and Tap on True Emergence",
      "text": "The moment a target breaks cover past the barrier threshold, click immediately before it retreats."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Chain Consistent Hits",
      "text": "Avoid clicking empty space on shoulder baits. Sustained hits increase your multiplier and speed up subsequent peek cycles."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a jiggle peek trainer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A jiggle peek trainer is an interactive visual reaction drill that simulates opponents emerging and retreating behind cover barriers, training defensive angle holding and trigger timing."
      }
    },
    {
      "@type": "Question",
      "name": "What is peeker's advantage in tactical shooters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peeker's advantage is a networking discrepancy where an advancing player sees a stationary angle holder before the server updates the holder's screen, granting the peeker a 40–90 ms temporal lead."
      }
    },
    {
      "@type": "Question",
      "name": "How do you counter peeker's advantage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To counter peeker's advantage, avoid static corner hugging. Use dynamic off-angles, offset your crosshair away from the wall to accommodate human reaction latency, or actively counter-jiggle to flip the advantage."
      }
    },
    {
      "@type": "Question",
      "name": "Why is crosshair offsetting necessary when holding angles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Placing crosshairs directly on a wall edge causes misses because human visual reaction takes ~180–240 ms. Offsetting by 1–2 body widths ensures the moving opponent walks directly into your crosshair as your brain triggers the click."
      }
    },
    {
      "@type": "Question",
      "name": "How does the peeker's advantage formula work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "According to Riot Games engineering research, total advantage equals enemy client frametime plus enemy one-way network lag plus server tick time plus defender one-way network lag plus interpolation buffer delay."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a shoulder peek and a jiggle peek?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A shoulder peek exposes only the character's arm for 50–100 ms to bait an enemy shot without revealing the head. A jiggle peek involves a slightly wider strafe with counter-strafing to gain visual info or take a pre-fire shot."
      }
    },
    {
      "@type": "Question",
      "name": "Does peeker's advantage exist on LAN?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While LAN eliminates network ping, cognitive proactive advantage remains: the peeker knows the exact timing of their emergence (Simple Reaction Time), while the stationary defender must react reactively (Choice Reaction Time)."
      }
    },
    {
      "@type": "Question",
      "name": "What is an off-angle in FPS games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An off-angle is a defensive position situated away from standard pre-aim coordinates. It forces an advancing peeker to perform an unplanned flick adjustment, negating their pre-aim advantage."
      }
    },
    {
      "@type": "Question",
      "name": "How does monitor refresh rate affect peeker's advantage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Higher refresh rates reduce frame render latency (16.7 ms at 60 Hz down to 4.1 ms at 240 Hz). This displays the enemy's emerging pixels 10–12 ms sooner, partially reducing peeker's advantage."
      }
    },
    {
      "@type": "Question",
      "name": "Is this jiggle peek drill free and browser-based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SkillDrills is 100% free with no account creation, downloads, or third-party plug-ins required. It runs directly inside modern mobile and desktop web browsers."
      }
    }
  ]
};

const barrierSequenceGuide = {
  heading: "Jiggle Peek Trainer Guide: Angle Holding, Peeker's Advantage & Cover Reflexes",
  intro: [
    "In competitive tactical shooters like CS2 and Valorant, duels between angle holders and peeking attackers are decided by milliseconds, visual reaction speed, and network latency. The phenomenon known as 'peeker's advantage' provides an accelerating attacker with an unavoidable temporal lead because client-side position packets must travel across the network before rendering on the defender's display.",
    "Timing precision & measurement methodology: Reaction time inside this trainer is measured using performance.now() high-resolution monotonic timestamps. Client-side measurements are subject to display refresh quantization (16.7 ms at 60 Hz, 6.9 ms at 144 Hz, 4.1 ms at 240 Hz) and USB mouse polling jitter (Woods et al. 2015). In online environments, these local hardware delays compound with network transmission lag.",
    "According to netcode analysis from Riot Games engineers Matt deWet and David Straily (2020), peeker's advantage is governed by the cumulative latency formula: Total Advantage = Enemy Frametime + Enemy 1-Way Lag + Server Tick Duration + Defender 1-Way Lag + Interpolation Buffering. Under standard online conditions (30–40 ms ping on 128-tick servers), this produces an unavoidable 40–90 ms visual lead for the attacker. Furthermore, cognitive chronometry (Donders 1868) demonstrates that attackers operate under proactive Simple Reaction Time (<180 ms), whereas stationary defenders must process Choice Reaction Time (250–350 ms) to discriminate whether an emerging edge is an empty shoulder bait or a committed swing.",
    "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
  ],
  benchmarks: {
    title: "Cover Peeking & Angle Hold Reference Tiers",
    headers: ["Reaction Window", "Hold Rank", "Tactical Equivalent", "Recommended Training Focus"],
    rows: [
      ["< 185 ms", "Radiant / Faceit Level 10", "Elite Sniper / Pro Anchor", "Micro-adjust for shoulder baits without discharging ammo prematurely"],
      ["185 – 225 ms", "Immortal / Advanced", "High-level tactical anchor", "Maintain crosshair offset discipline against varied peek speeds"],
      ["226 – 280 ms", "Ascendant / Intermediate", "Solid competitive player", "Avoid holding too close to the barrier edge where peek speed is highest"],
      ["281 – 350 ms", "Platinum / Developing", "Average FPS gamer", "Learn to re-peek rather than remaining static after missing the initial shot"],
      ["> 350 ms", "Silver / Casual", "Novice player", "Prone to getting caught off-guard by wide swings and shoulder peeks"]
    ],
    note: "Reference reaction brackets grounded in human chronometry literature (Donders 1868; Woods et al. 2015). Live online duels are modulated by display refresh rates, network jitter, and server tick rates."
  },
  techniques: {
    title: "Cover Peeking & Counter-Peek Mechanics",
    items: [
      {
        name: "Crosshair Offsetting vs. Edge Hugging",
        desc: "Placing your crosshair directly on the corner edge of a barrier guarantees a missed shot. Because human visual reaction requires ~180–240 ms and peeking players move at high strafe velocities, opponents will travel past your crosshairs before motor execution completes. Offsetting crosshairs 1–2 target widths away from the wall lets the attacker run directly into your crosshair.",
        tips: "Widen your crosshair offset further when holding against opponents executing full-speed wide swings."
      },
      {
        name: "Shoulder Bait Discrimination",
        desc: "Experienced opponents execute shoulder peeks without exposing their head to bait defensive fire and force reload downtime. Training visual discrimination prevents premature trigger release on empty shoulder baits.",
        tips: "Wait for the central target mass to emerge beyond the barrier boundary before executing your click."
      },
      {
        name: "Counter-Strafing & ADAD Movement Reset",
        desc: "When executing a jiggle peek yourself, tap opposing movement keys (A and D) with minimal duration so only your shoulder peeks past cover for 50–80 ms before retreating. To fire accurately upon peeking, counter-strafe to zero your velocity.",
        tips: "Maintain your crosshair at head level on the pre-aim coordinate even while rapidly jiggling."
      },
      {
        name: "Mitigating System & Network Latency",
        desc: "Monitor refresh rates (144 Hz vs 240 Hz) and GPU render queue latency compound with network ping. Maximizing display framerates and utilizing low-latency drivers (NVIDIA Reflex / AMD Anti-Lag) minimizes the hardware component of peeker's advantage.",
        tips: "Enable low-latency mode in GPU drivers to eliminate pre-rendered frame queuing."
      }
    ]
  },
  steps: [
    "Select your barrier difficulty preset and launch full-screen training mode.",
    "Position your cursor slightly offset from the barrier edge at target center level.",
    "Monitor the boundary gap where targets emerge from occlusion.",
    "The instant a target breaks cover past the barrier, click immediately to register the hit.",
    "Review your average reaction latency and consistency across rounds to track reaction speed."
  ],
  audience: "Tactical FPS players (Valorant, CS2, Rainbow Six Siege), sniper/AWP anchors, and competitive gamers seeking to counter peeker's advantage.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('kosinski2008', 'woods2015'),
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
