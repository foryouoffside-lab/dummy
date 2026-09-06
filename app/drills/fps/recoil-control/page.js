import RecoilControlClient from './RecoilControlClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Recoil Control Trainer — Spray Practice | SkillDrills",
  description: "Master weapon spray patterns, vertical mouse pull-down velocity, and horizontal recoil compensation for tactical shooters like CS2 and Valorant.",
  keywords: [
    "recoil control trainer",
    "spray pattern practice",
    "AK47 spray control drill",
    "CS2 recoil control practice",
    "Valorant spray control trainer",
    "how to control recoil in cs2",
    "how to master spray patterns fps",
    "best recoil control drill browser",
    "free spray pattern trainer online",
    "how to pull down on spray",
    "improve first magazine accuracy",
    "spray control training",
    "recoil compensation training",
    "burst fire accuracy",
    "cs2 spray transfer training",
    "vertical recoil pull down",
    "horizontal spray compensation",
    "リコイル 制御 練習",
    "반동 제어 연습"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/recoil-control",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Recoil Control Trainer — Spray Practice | SkillDrills",
    description: "Master weapon spray patterns, vertical mouse pull-down velocity, and horizontal recoil compensation for tactical shooters like CS2 and Valorant.",
    url: "https://skilldrills.online/drills/fps/recoil-control",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Recoil Control Trainer — Spray Practice | SkillDrills",
    description: "Master weapon spray patterns, vertical mouse pull-down velocity, and horizontal recoil compensation for tactical shooters like CS2 and Valorant.",
  },
};

export default function RecoilControlPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Recoil Control Trainer", "item": "https://skilldrills.online/drills/fps/recoil-control" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Recoil Control Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill for mastering recoil control, spray patterns, and weapon compensation for CS2, Valorant, PUBG, and other shooters.",
    "genre": "FPS Training / Recoil & Spray Control",
    "url": "https://skilldrills.online/drills/fps/recoil-control",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Recoil Control Trainer",
    "url": "https://skilldrills.online/drills/fps/recoil-control",
    "description": "A free browser FPS drill for mastering recoil control, spray patterns, and weapon compensation for CS2, Valorant, PUBG, and other shooters.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Recoil Control"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is recoil control in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recoil control is the mechanical motor compensation players execute by moving their mouse in the exact opposite direction and timing of an automatic weapon's muzzle climb to maintain pinpoint bullet grouping."
        }
      },
      {
        "@type": "Question",
        "name": "How do I control recoil in CS2 and Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In CS2, weapons like the AK-47 feature fixed spray patterns requiring a firm downward mouse pull for the first 8–10 bullets, followed by controlled left-and-right horizontal sweeps. Valorant weapons like the Vandal feature deterministic vertical climb for the first 5–6 bullets before shifting into randomized horizontal bloom."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between weapon recoil and inaccuracy spread bloom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recoil is the predictable, repeatable geometric displacement path of the weapon's barrel during automatic fire. Spread bloom is the randomized cone of inaccuracy added on top of recoil, which expands with movement or continuous fire."
        }
      },
      {
        "@type": "Question",
        "name": "Why is the first 8 to 10 bullets the most critical part of a spray pattern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The first 8 to 10 bullets of automatic rifles (like the AK-47 and M4A1-S) exhibit linear vertical climb with minimal horizontal deviation. Compensating this initial burst requires simple vertical pull-down, offering the highest damage conversion before horizontal spray kicks in."
        }
      },
      {
        "@type": "Question",
        "name": "How does Motor Schema Theory explain spray pattern muscle memory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formalized by Richard A. Schmidt & Timothy D. Lee (2011), rapid motor actions are stored as Generalized Motor Programs (GMPs). Deliberate spray training establishes invariant neuromuscular timing schemas in the motor cortex, allowing players to execute pull-down patterns automatically without conscious visual latency."
        }
      },
      {
        "@type": "Question",
        "name": "What is spray transfer and how do pro players execute multi-target sprays?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spray transfer is the technique of redirecting ongoing automatic fire from an eliminated target to a secondary enemy without releasing the trigger, adjusting for the active mid-magazine recoil offset during the flick."
        }
      },
      {
        "@type": "Question",
        "name": "How do mouse sensitivity and mousepad friction affect spray control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Low sensitivity requires larger forearm pull-downs, providing higher mechanical stability and error tolerance. High dynamic pad friction assists controlled deceleration, preventing hand over-pull during vertical compensation."
        }
      },
      {
        "@type": "Question",
        "name": "What arm and wrist mechanics produce the smoothest vertical recoil pull-down?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Initiating the primary vertical drag from the wrist and fingers for short bursts, and transitioning to a smooth forearm drag anchored at the elbow for full 30-round sprays, prevents wrist jamming and preserves horizontal micro-steering."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice recoil control drills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Practicing 5 to 10 minutes of disciplined spray pattern compensation daily before ranked matches solidifies motor schemas and primes neuromuscular readiness without inducing wrist fatigue."
        }
      },
      {
        "@type": "Question",
        "name": "Why does missing shots or poor magazine accuracy reset my combo streak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Missing shots or emptying a magazine with less than 40% accuracy resets your combo multiplier to enforce spray discipline and penalize uncontrolled ammo dumping. When optional Time Penalty is enabled, it also deducts 0.6 seconds from your timer."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Master Weapon Recoil Control",
    "description": "Step-by-step instructions to train weapon spray pattern compensation, vertical pull-down velocity, and horizontal counter-steering.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Configure Game Sensitivity",
        "text": "Align your DPI and in-game sensitivity in Session Settings to preserve 1:1 hardware coordinates."
      },
      {
        "@type": "HowToStep",
        "name": "Initiate Sustained Fire",
        "text": "Hold left click to begin automatic fire, monitoring muzzle rise and initial bullet impact displacement."
      },
      {
        "@type": "HowToStep",
        "name": "Pull Down Vertically",
        "text": "For the first 8–10 bullets, execute a steady downward mouse pull at constant velocity to cancel barrel climb."
      },
      {
        "@type": "HowToStep",
        "name": "Counter-Steer Horizontal Sway",
        "text": "As the spray shifts horizontally, invert your mouse path (steering right when spray kicks left) to hold a tight grouping."
      }
    ]
  };

  const recoilControlGuide = {
    heading: "Recoil Control Trainer Guide & Spray Compensation Mechanics",
    intro: [
      "Recoil Control Trainer is an empirical sensorimotor training drill engineered to calibrate muscle memory for weapon spray patterns, vertical pull-down velocity, and horizontal counter-steering. In competitive tactical shooters such as Counter-Strike 2, Valorant, and Rainbow Six Siege, gunfights frequently extend beyond single-tap headshots—demanding that players sustain laser-accurate bullet clusters through full 30-round automatic bursts.",
      "The motor learning foundation of rapid recoil compensation is explained by Generalized Motor Program (GMP) theory, formalized by Richard A. Schmidt & Timothy D. Lee (2011). Under GMP theory, complex rapid movements that unfold too quickly for continuous unprimed visual feedback (such as compensating 10 bullets in under 700 ms) are executed as pre-structured motor programs with invariant relative timing and force parameters stored in the motor cortex.",
      "During sustained fire, human motor control deploys Robert S. Woodworth's two-component aiming model (1899) and David E. Meyer's optimized submovement framework (1988): an initial open-loop muscular pull-down countering known vertical climb, followed by closed-loop sensory-guided micro-adjustments that counter-weave against horizontal weapon sway and moving target hitboxes.",
      "Governed by Fitts' Law speed-accuracy dynamics (1954) and tracked with performance.now() digital chronometry (Woods et al., 2015), this drill teaches players to eliminate spray panic, develop rock-solid pull-down mechanics, and secure multi-kill spray transfers under pressure.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
    ],
    benchmarks: {
      title: "Magazine Accuracy & Spray Control Performance Tiers",
      headers: ["Performance Tier", "Magazine Accuracy %", "Motor Control Mechanics", "Competitive In-Game Implication"],
      rows: [
        ["Tier 1 (Apex Laser)", "78% – 90%+", "Near-perfect vertical pull-down; sub-pixel horizontal counter-weaving across all 30 rounds with zero bloom overrun", "Dominates multi-kill spray transfers in CS2 Faceit 10, Radiant, and professional competitive lobbies"],
        ["Tier 2 (Competitive Pro)", "62% – 78%", "Crisp first-10 bullet headshot cluster; smooth horizontal transition with rapid re-centering on evasive targets", "Consistently wins medium-range rifle duels; reliable spray transfers against adjacent enemies"],
        ["Tier 3 (High-Skill FPS)", "48% – 62%", "Solid initial pull-down; minor over-pull or delayed horizontal compensation on rounds 12–25", "Effective close-to-medium spray control; occasional bullet climb over enemy shoulders at range"],
        ["Tier 4 (Intermediate)", "35% – 48%", "Inconsistent pull-down velocity; bullets climb over target head after bullet 7 due to hesitation", "Prone to losing spray duels; forced to rely on single-taps or short 3-round bursts"],
        ["Tier 5 (Developing / Bloom Jitter)", "Sub-35%", "Excessive hand tension causing erratic vertical dragging; uncontrolled bloom spread across entire screen", "Fails magazine discipline threshold; bullets scatter wildly outside enemy hitboxes"]
      ],
      note: "Accuracy percentages represent confirmed target hits divided by total rounds fired per magazine, tracked with performance.now() chronometry (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols for Perfecting Recoil Spray Control",
      items: [
        {
          name: "The First-10 Vertical Pull-Down Impulse",
          desc: "The initial 8–10 rounds of standard assault rifles feature purely vertical climb with virtually zero horizontal sway. Memorize this linear downward impulse as an automated motor program (Schmidt & Lee, 2011). A smooth pull-down repeats better than a hard one because motor output grows more variable as a movement gets faster and more forceful (Schmidt et al., 1979).",
          tips: "Do not wait to see bullets rise on screen; initiate downward mouse movement simultaneously with trigger press."
        },
        {
          name: "Inverted S-Curve Horizontal Counter-Weaving",
          desc: "After bullet 10, rifles sway into an inverted S-curve pattern. Compensate by steering your mouse in the mirror direction: if the weapon kicks right, guide your hand gently left (Meyer et al., 1988).",
          tips: "Smooth micro-steering beats sharp jerks—over-correcting horizontally throws bullets outside the hitbox."
        },
        {
          name: "Forearm Gliding & Wrist Stability Decoupling",
          desc: "For short 3–7 round bursts, pull down using fine finger flexor and wrist curling. For extended 15–30 round sprays, lock the wrist angle and glide your entire forearm downward along the mousepad from the elbow to prevent running out of vertical wrist travel.",
          tips: "Ensure your forearm has unobstructed pad clearance so your arm does not stick to your desk."
        },
        {
          name: "Spray Reset & Burst Cadence Discipline",
          desc: "If your crosshair completely loses connection with the target past bullet 15, do not hold down the trigger hoping for random bloom hits. Release mouse1 for 200–300 ms to allow inaccuracy bloom to fully reset, then re-acquire the target with a fresh burst.",
          tips: "Disciplined spray resets win more gunfights than desperate full-magazine prayers."
        }
      ]
    },
    steps: [
      "Configure your exact game, DPI, and in-game sensitivity in Session Settings to preserve 1:1 hardware coordinates, then engage Pointer Lock.",
      "Press and hold the left mouse button to initiate automatic fire against the evasive tactical target.",
      "Execute a smooth downward mouse pull to counteract initial vertical rise, keeping bullets centered in the high-value head and chest zones.",
      "Counter-steer horizontally as the spray pattern develops, maintaining continuous connection through the entire 30-round magazine.",
      "Analyze your magazine accuracy percentage, headshot count, and spray discipline in the post-session analytics."
    ],
    audience: "Competitive tactical shooter players in CS2, Valorant, PUBG, and Call of Duty Warzone seeking laser-tight spray clusters, reliable multi-target spray transfers, and rock-solid full-auto weapon control.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'schmidtLee2011', 'schmidt1979', 'woodworth1899'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
      { href: "/drills/fps/pro-smooth-pursuit", label: "Smooth Pursuit Aim Trainer" },
      { href: "/drills/fps/micro-correction-precision", label: "Micro-Correction Aim Trainer" },
      { href: "/drills/fps/anti-strafe-jitter-duel", label: "Anti-Strafe Jitter Trainer" },
      { href: "/drills/fps/target-acquisition", label: "Target Acquisition Aim Trainer" }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <RecoilControlClient />

      <DrillGuide guide={recoilControlGuide} />
    </>
  );
}

