import AngleHoldClient from './AngleHoldClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Crosshair Placement & Angle Hold Trainer | SkillDrills",
  description: "Improve your crosshair placement and reaction time with our interactive angle holding trainer. Learn to counter peeker's advantage in Valorant and CS2.",
  keywords: [
    "angle hold aim trainer",
    "crosshair placement drill",
    "pre-fire training fps",
    "CS2 angle holding practice",
    "Valorant crosshair placement trainer",
    "how to hold an angle in cs2",
    "how to stop pre-firing",
    "best crosshair placement drill browser",
    "how to improve peek reaction time",
    "free angle holding trainer online",
    "how to punish jiggle peekers",
    "crosshair placement trainer",
    "pre aim training",
    "peeker advantage training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/angle-hold-trainer",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Crosshair Placement & Angle Hold Trainer | SkillDrills",
    description: "Improve your crosshair placement and reaction time with our interactive angle holding trainer. Learn to counter peeker's advantage in Valorant and CS2.",
    url: "https://skilldrills.online/drills/fps/angle-hold-trainer",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Crosshair Placement & Angle Hold Trainer | SkillDrills",
    description: "Improve your crosshair placement and reaction time with our interactive angle holding trainer. Learn to counter peeker's advantage in Valorant and CS2.",
  },
};

export default function AngleHoldPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Angle Hold Trainer", "item": "https://skilldrills.online/drills/fps/angle-hold-trainer" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Angle Hold Pro",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser-based FPS trainer teaching crosshair placement discipline, corner pre-aiming, and defensive angle holding for competitive tactical shooters.",
    "genre": "FPS Training / Crosshair Placement",
    "url": "https://skilldrills.online/drills/fps/angle-hold-trainer",
    "dateModified": "2026-09-05",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Angle Hold Pro",
    "url": "https://skilldrills.online/drills/fps/angle-hold-trainer",
    "description": "A free browser-based FPS trainer teaching crosshair placement discipline, corner pre-aiming, and defensive angle holding for competitive tactical shooters.",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is crosshair placement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crosshair placement is the foundational tactical shooter mechanic of anticipating where an opponent's head will appear and pre-aiming that exact spatial coordinate at head level, eliminating the need to execute a reactive flick when an engagement begins."
        }
      },
      {
        "@type": "Question",
        "name": "What is peeker's advantage in tactical FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Peeker's advantage is an asymmetrical latency delay inherent to client-server networking. When an attacker rounds a corner, their client sends movement updates to the server before the stationary defender receives and renders the incoming opponent, granting the peeker a temporal window of 40 to 90 ms where they see the defender first."
        }
      },
      {
        "@type": "Question",
        "name": "How do CS2 and Valorant players hold angles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Competitive players hold angles by positioning their crosshair slightly off the corner edge. This offset gap accommodates human visual reaction latency and opponent swing velocity, enabling a single click as the enemy crosses the reticle rather than forcing a rushed micro-flick."
        }
      },
      {
        "@type": "Question",
        "name": "How far should my crosshair be from the corner wall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The ideal crosshair offset depends on anticipated swing speed: against wide-swinging opponents, hold wider (several character models off the wall) so they run directly into your pre-aim. Against shoulder peeks or tight jiggles, hold closer to the edge."
        }
      },
      {
        "@type": "Question",
        "name": "What causes players to pre-fire or shoot early when holding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pre-firing early typically results from high cognitive anticipation anxiety or failing Go/No-Go discrimination tasks when an opponent jiggle-peeks or baits utility. Deliberate trigger discipline training conditions players to fire only upon confirmed target commitment."
        }
      },
      {
        "@type": "Question",
        "name": "How does angle holding differ from jiggle peeking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Angle holding is a static defensive posture relying on reaction speed and pre-aim placement to punish incoming attackers. Jiggle peeking is an active information-gathering mechanic where the player rapidly AD-strafes in and out of cover to bait shots or spot enemies without committing to a full duel."
        }
      },
      {
        "@type": "Question",
        "name": "What is the netcode latency formula for peeker's advantage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Peeker's advantage latency is formulated as: T_advantage = (RTT_peeker / 2) + (RTT_holder / 2) + T_interp. The total delay equals the one-way ping of both players plus the server interpolation buffer, dictating the minimum offset distance required by the stationary holder."
        }
      },
      {
        "@type": "Question",
        "name": "Does monitor refresh rate affect angle holding reaction speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. A 240 Hz monitor refreshes every ~4.17 ms compared to 16.67 ms at 60 Hz, delivering the earliest visual frame of an opponent peeking around a wall and cutting end-to-end display latency."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice crosshair placement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A daily routine of 10 to 15 minutes of angle hold reaction drills combined with in-game deathmatch map clearing provides optimal neuromuscular trigger calibration."
        }
      },
      {
        "@type": "Question",
        "name": "Does this angle hold trainer support raw hardware mouse input?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Angle Hold Pro operates on the HTML5 Pointer Lock API with 1:1 hardware translation, so clicks are timed with performance.now() and free of browser mouse acceleration. Browser clocks are coarsened to about 1 ms for security, so differences under roughly 5 ms are measurement noise."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Practice Angle Holding & Pre-Aiming",
    "description": "Step-by-step instructions to train crosshair height and defensive angle holds against peeking targets.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Establish Crosshair Placement",
        "text": "Position your crosshair at head height, pre-aiming the corner edge where the peeking target will appear."
      },
      {
        "@type": "HowToStep",
        "name": "Start the Drill",
        "text": "Click 'Start' and lock in your visual focus. Keep your hand steady and prepare for the peeking target."
      },
      {
        "@type": "HowToStep",
        "name": "React and Shoot",
        "text": "Click instantly the millisecond the target crosses the corner plane. Do not over-flick; rely on your pre-aim."
      }
    ]
  };

  const angleHoldGuide = {
    heading: "Crosshair Placement & Angle Hold Guide — Reaction Latency & Geometry",
    intro: [
      "Defensive angle holding is a foundational tactical shooter discipline governed by Donders' simple reaction time (Donders, 1868) and visual Go/No-Go cognitive discrimination. Unlike flick targeting which requires a dynamic two-component motor impulse (Elliott et al., 2010), holding an angle pre-aligns the crosshair along the horizontal head plane, transforming the challenge from a 2D spatial search into a 1D temporal click-timing execution.",
      "In online multiplayer netcode architectures (such as Valve's CS2 sub-tick system and Riot Games' Valorant infrastructure), network packet transit produces an asymmetrical latency delay known as peeker's advantage: T_advantage = (RTT_peeker / 2) + (RTT_holder / 2) + T_interp. An attacker swinging a corner sees the defender before the defender's client receives the update. To systematically neutralize this deficit, stationary defenders must offset their crosshair away from the corner wall by D_offset = v_peeker × T_reaction, allowing the swinging opponent to enter the crosshair focal point precisely as the human click fires.",
      "High-resolution digital chronometry in Angle Hold Pro is powered by performance.now() timestamps under 1000 Hz mouse polling and display refresh synchronization. This minimizes input quantization jitter (Woods et al., 2015), providing an accurate, laboratory-grade evaluation of trigger discipline, reaction latency, and bait-peek discrimination under time pressure (Hick, 1952).",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
    ],
    benchmarks: {
      title: "Defensive Angle Hold & Peek Reaction Latency Benchmarks",
      headers: ["Engagement Phase / Metric", "Typical Latency (ms)", "Sensorimotor & Netcode Factor", "Performance Classification"],
      rows: [
        ["Simple Visual Trigger Latency", "150 – 190 ms", "Foveal retinal activation & motor cortex click", "Unconscious motor trigger on anticipated stimulus (Donders 1868)"],
        ["Discrimination Latency (Fake/Jiggle Peek)", "210 – 280 ms", "Go/No-Go cognitive identification of real swing", "Trigger discipline under bait pressure (Hick 1952)"],
        ["Peeker's Advantage Latency Deficit", "40 – 90 ms", "Client-server RTT packet transit + interpolation buffer", "Netcode transmission delay advantage for moving attacker"],
        ["Effective Net Defensive Response Window", "250 – 340 ms", "Combined visual latency + network deficit offset", "Standard baseline for competitive tactical FPS defenders"],
        ["Elite Pre-Aim Hold Precision", "170 – 220 ms", "Optimal crosshair offset matching swing velocity", "High-tier Valorant Radiant / CS2 Faceit 10 defensive mastery"]
      ],
      note: "Metrics synthesized from cognitive reaction chronometry (Donders 1868; Hick 1952; Woods et al. 2015) and tactical FPS netcode research (Riot Games engineering; Valve CS2 network analysis). Individual reaction times vary with display refresh rate, hardware polling, and cognitive alertness."
    },
    techniques: {
      title: "Tactical Crosshair Placement & Geometric Offset Guidelines",
      items: [
        {
          name: "Corner Offset Distance Calibration",
          desc: "Do not glue your crosshair directly to the edge of the wall. Leave a horizontal margin corresponding to your reaction speed: hold wider against expected wide swings, and hold tighter when anticipating slow shoulder peeks.",
          tips: "If opponents frequently push past your reticle before you click, widen your crosshair offset gap by 15-20%."
        },
        {
          name: "Head-Level Horizontal Discipline",
          desc: "Anchor crosshair elevation to environmental geometry such as crates, door frames, or wall trim stripes that correspond to head height across common engagement distances.",
          tips: "Avoid lazy downward crosshair drift when clearing passive angles."
        },
        {
          name: "The 'Click, Don't Adjust' Rule",
          desc: "When holding a calibrated pre-aim angle, commit to clicking as the enemy enters the reticle rather than attempting a reactive micro-flick, which introduces 80–120ms of unnecessary motor correction latency.",
          tips: "Trust your pre-aim placement and focus your visual gaze slightly in front of the crosshair."
        },
        {
          name: "Off-Angle Positioning Geometry",
          desc: "Holding common, predictable angles allows attackers to pre-fire your position. Stand in non-standard off-angles that force the peeker to sweep and micro-adjust after rounding the corner.",
          tips: "Ensure you maintain an unhindered retreat line when anchoring aggressive off-angles."
        }
      ]
    },
    steps: [
      "Click Start Drill to enter fullscreen mode and lock pointer control.",
      "Pre-aim your crosshair at the chokepoint corner at anticipated head height.",
      "Establish a calibrated gap between the corner wall and crosshair matching your reaction latency.",
      "When an enemy swings into view, click immediately without flinching or over-flicking.",
      "Maintain trigger discipline against fake bait peeks and review your reaction chronometry on the scorecard."
    ],
    audience: "Tactical FPS competitors (Valorant, CS2, Rainbow Six Siege), anchor defenders, and players seeking to build disciplined pre-aim mechanics and counter peeker's advantage.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('woods2015', 'elliott2010', 'donders1969', 'hick1952'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
      { href: "/drills/fps/180-degree-awareness", label: "180° Awareness Pro" },
      { href: "/drills/fps/micro-correction-precision", label: "Micro-Correction Aim Trainer" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" }
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
      <AngleHoldClient />
      <DrillGuide guide={angleHoldGuide} />
    </>
  );
}
