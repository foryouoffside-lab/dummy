import TargetSwitchingSwarmClient from './TargetSwitchingSwarmClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Target Switching Aim Trainer – Multi-Target | SkillDrills',
  description: 'Free target switching aim trainer. Train rapid flicks between multiple targets with no reset pause, for multi-enemy fights in CS2 and Valorant.',
  keywords: [
    'target switching aim trainer',
    'target switching trainer',
    'target switching drill',
    'multi target aim trainer',
    'multi target flick training',
    'target swarm trainer',
    'flick transition trainer',
    'rapid target switching',
    'multi kill aim trainer',
    'valorant target switching',
    'cs2 spray transfer trainer',
    'flick deceleration training'
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/target-switching-swarm",
    languages: getAlternateLanguages('/drills/fps/target-switching-swarm'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Target Switching Aim Trainer – Multi-Target FPS | SkillDrills',
    description: "Improve rapid multi-target transitions, flick deceleration, and multi-kill mechanics with our free Target Switching Aim Trainer for Valorant, CS2, and Apex Legends.",
    url: "https://skilldrills.online/drills/fps/target-switching-swarm",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Switching Aim Trainer – Multi-Target FPS | SkillDrills',
    description: "Improve rapid multi-target transitions, flick deceleration, and multi-kill mechanics with our free Target Switching Aim Trainer for Valorant, CS2, and Apex Legends.",
  },
};

export default function TargetSwitchingSwarmPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Switching Swarm", "item": "https://skilldrills.online/drills/fps/target-switching-swarm" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Target Switching Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training multi-target flick transitions, spray transfers, and visual indexing across dynamic target swarms.",
    "genre": "FPS Training / Target Switching",
    "url": "https://skilldrills.online/drills/fps/target-switching-swarm",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Target Switching Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "Requires Pointer Lock API, JavaScript, HTML5 Canvas",
    "description": "A free browser FPS drill training multi-target flick transitions, spray transfers, and visual indexing across dynamic target swarms.",
    "url": "https://skilldrills.online/drills/fps/target-switching-swarm"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Target Switching Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/target-switching-swarm",
    "description": "A free browser FPS drill training multi-target flick transitions, spray transfers, and visual indexing across dynamic target swarms.",
    "dateModified": "2026-09-11",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Switching"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-11",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is target switching in FPS aim training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target switching is the mechanical and visual-cognitive ability to rapidly transition your crosshair between multiple distinct targets in rapid sequence, executing accurate clicks or sustained fire on each target without deceleration hesitation."
        }
      },
      {
        "@type": "Question",
        "name": "How is target switching different from a standard flick trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard flick trainer displays single isolated targets that disappear upon being clicked, allowing crosshairs to return to neutral rest positions. Target switching presents simultaneous or continuously spawning target swarms, requiring unbroken kinetic transitions and visual target indexing."
        }
      },
      {
        "@type": "Question",
        "name": "How does the target swarm format improve multi-kill mechanics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Swarm drills force the motor cortex to pre-plan ballistic flick trajectories while processing peripheral sensory feedback. This mirrors multi-enemy engagements in competitive tactical shooters where players must eliminate consecutive opponents during site takes or retakes."
        }
      },
      {
        "@type": "Question",
        "name": "Why do players hesitate between targets after eliminating an enemy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target hesitation stems from waiting for visual or auditory kill confirmation before initiating the next flick. Targeted switching drills train players to trust ballistic motor execution and begin saccadic eye transit toward the next target before the current shot resolves."
        }
      },
      {
        "@type": "Question",
        "name": "How does target switching improve CS2 and Valorant spray transfers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spray transfers require high-velocity angular crosshair displacement during continuous weapon recoil. Target switching drills condition the neuromuscular velocity and deceleration braking necessary to snap accurately across screen quadrants during sustained automatic fire."
        }
      },
      {
        "@type": "Question",
        "name": "Which competitive games require the best target switching mechanics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target switching is vital in tactical hero shooters like Valorant and Overwatch 2, high-intensity battle royales like Apex Legends and Warzone, and classic tactical shooters like Counter-Strike 2 where multi-man site pushes demand consecutive headshot snaps."
        }
      },
      {
        "@type": "Question",
        "name": "What is the optimal mouse grip for rapid target switching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Claw and fingertip grips typically provide superior vertical and horizontal micro-adjustability during rapid target switches because they allow the wrist and finger MCP joints to decouple from forearm gliding motions."
        }
      },
      {
        "@type": "Question",
        "name": "How does target switching relate to Fitts' Law and ballistic movement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under Fitts' Law, transit time is a function of target distance and size. Target switching utilizes the stochastic optimized submovement model, where an initial high-velocity ballistic stroke covers ~90% of the distance followed by rapid terminal braking."
        }
      },
      {
        "@type": "Question",
        "name": "How often should competitive gamers practice target switching swarm drills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ten to fifteen minutes of high-density target switching drills 3 to 4 times per week or as part of a pre-match warm-up routine provides optimal neuromuscular stimulus for developing fluid target sequencing and eliminating confirmation hesitation."
        }
      },
      {
        "@type": "Question",
        "name": "Is this Target Switching Swarm aim trainer free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this Target Switching Aim Trainer is completely free, open-source, and runs directly in modern web browsers via HTML5 Canvas with raw pointer-lock support and zero installation requirements."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Target Switching Swarm",
    "description": "Step-by-step instructions to train rapid target switches, visual indexing, and multi-kill kinematics.",
        "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrate Sensitivity and Engage Pointer Lock",
        "text": "Match your in-game DPI and sensitivity in Settings, click Start, and lock the hardware mouse cursor to the canvas.",
        "url": "https://skilldrills.online/drills/fps/target-switching-swarm#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Acquire Initial Swarm Target",
        "text": "Flick rapidly to the closest cyan target in the swarm and click to destroy it, gaining +100 PTS and session time bonus.",
        "url": "https://skilldrills.online/drills/fps/target-switching-swarm#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Transition Instantly Without Hesitation",
        "text": "Immediately launch a ballistic flick toward the next target in sequence without pausing to confirm the previous hit.",
        "url": "https://skilldrills.online/drills/fps/target-switching-swarm#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Maintain Unbroken Flow Rhythm",
        "text": "Decouple wrist tension to execute smooth multi-target snaps, chaining streaks to unlock high-difficulty swarm density.",
        "url": "https://skilldrills.online/drills/fps/target-switching-swarm#step-4"
      }
    ]
  };

  const targetSwitchingGuide = {
    heading: "Target Switching Aim Trainer Guide & Multi-Target Kinematics",
    intro: [
      "Target Switching Swarm is a high-velocity motor control and visual indexing drill engineered to condition rapid, unhesitating transitions between multiple hostile targets. In tactical shooters like Counter-Strike 2 and Valorant, and dynamic battle royales like Apex Legends, team fights rarely present isolated 1v1 duels. Winning clutch rounds requires eliminating a primary opponent and instantaneously snapping to neutralize a secondary flanker without post-kill cognitive pause.",
      "The psychophysics of target switching is governed by Fitts' Law (Fitts, 1954) and the stochastic optimized submovement model established by David E. Meyer et al. (1988). Under this framework, an aimed movement comprises an initial ballistic primary submovement covering approximately 90% of the trajectory, followed by feedback-guided micro-corrective secondary submovements. Novice aimers waste 100-250 ms pausing after each kill to confirm the elimination before re-engaging visual search. Elite target switchers initiate the primary saccade to the next target before the previous target's destruction animation even completes.",
      "Visual indexing in crowded target swarms relies on feature integration and preattentive visual search mechanisms (Anne M. Treisman & Garry Gelade, 1980; Jeremy M. Wolfe, 2007). The human visual cortex can track multiple spatial tokens concurrently via visual indexing (FINST theory), allowing players to route efficient spatial flick sequences through clusters of targets, minimizing cumulative angular distance traveled.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
    ],
    benchmarks: {
      title: "Target Switching & Rapid Transition Benchmarks",
      headers: ["Performance Tier", "Switch Transition Time", "Elimination Rate (Targets/Min)", "Competitive In-Game Implication"],
      rows: [
        ["Tier 1 (Radiant / Faceit Level 10 / Pro)", "Sub-210 ms", "110+ Targets/min", "Flawless multi-target spray transfers; zero confirmation pause; effortless 1v3 site defenses and clutch retakes"],
        ["Tier 2 (Immortal / Faceit 8-9 / Master)", "210 – 260 ms", "92 – 110 Targets/min", "Crisp target sequencing; minor deceleration wobble on wide-angle switches; consistently converts multi-kill trades"],
        ["Tier 3 (Ascendant / Diamond / High Skill)", "260 – 320 ms", "74 – 92 Targets/min", "Good switching within tight target clusters; struggles when secondary targets require switches across screen halves"],
        ["Tier 4 (Platinum / Gold / Intermediate)", "320 – 400 ms", "56 – 74 Targets/min", "Noticeable post-kill confirmation pause (100+ ms hesitation); frequently overshoots secondary targets due to poor deceleration braking"],
        ["Tier 5 (Silver / Bronze / Novice)", "400 ms+", "Sub-56 Targets/min", "Resets mouse completely between targets; visual search restarts from zero after every kill; heavy wrist tension prevents fluid flick chaining"]
      ],
      note: "Switch transition time measures the interval between target destruction and crosshair arrival at the subsequent target; elimination rate measures sustained destruction throughput over the active drill duration (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols for Mastering Target Switching",
      items: [
        {
          name: "Saccadic Pre-Routing & Visual Indexing",
          desc: "Shift your gaze to the secondary target while your hand is still completing the final micro-adjustment on the primary target (Treisman & Gelade, 1980; Wolfe, 2007). Eye movements precede hand movements by 50-80 ms.",
          tips: "Never stare at a target after clicking it; let peripheral vision confirm destruction while foveal vision locks onto the next candidate."
        },
        {
          name: "Terminal Braking & Ballistic Submovement Optimization",
          desc: "Apply firm muscular counter-tension during the final 10% of the flick trajectory to stop the mouse abruptly over target center without oscillating (Meyer et al., 1988).",
          tips: "Think of your mouse as having hydraulic brakes: accelerate explosively off the previous target, then clamp down firmly over the next."
        },
        {
          name: "Nearest-Neighbor Spatial Routing",
          desc: "Process the swarm layout to eliminate target clusters in order of minimal angular separation, rather than erratically crossing the canvas back and forth (Fitts, 1954).",
          tips: "Clear out adjacent pairs first before launching across wide screen diagonals."
        },
        {
          name: "Decoupled Grip Tension & Micro-Adjustability",
          desc: "Maintain light-to-moderate grip tension (level 3 out of 10) to permit rapid fingertip and wrist micro-adjustments at terminal velocity without locking the forearm.",
          tips: "If your hand cramps or aim stutters across long switches, deliberately relax your thumb and pinky finger pressure."
        }
      ]
    },
    steps: [
      "Set your in-game sensitivity and mouse DPI in Settings to match your primary competitive FPS game, then lock the cursor.",
      "Survey the swarm arena to identify dense target clusters with minimal angular separation.",
      "Snap rapidly to eliminate the initial target, gaining +100 PTS and +0.35s bonus time to extend the session clock.",
      "Immediately redirect crosshair momentum toward the nearest adjacent target without pausing to confirm the kill.",
      "Chain consecutive eliminations to build combo multipliers and progress into higher-velocity difficulty tiers."
    ],
    audience: "Competitive FPS players in Valorant, Counter-Strike 2, Apex Legends, and Overwatch 2 seeking faster multi-target acquisition, effortless spray transfers, and elimination of post-kill hesitation in multi-enemy engagements.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/drills/fps/target-prioritization", label: "Target Prioritization Aim Trainer" },
      { href: "/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
      { href: "/drills/fps/target-acquisition", label: "Target Acquisition Aim Trainer" },
      { href: "/drills/fps/180-degree-awareness", label: "180° Awareness Pro" },
      { href: "/drills/fps/recoil-control", label: "Recoil Control Trainer" }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
      <TargetSwitchingSwarmClient
        copy={{
          h1Keyword: "Target Switching Aim Trainer",
          h1Suffix: " - Free Multi-Target Drill"
        }}
      />
      <DrillGuide guide={targetSwitchingGuide} />
    </>
  );
}
