import RecoilControlClient from './RecoilControlClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Recoil Control Trainer – Spray Practice | SkillDrills",
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
    "spray control training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/recoil-control",
    languages: getAlternateLanguages('/drills/fps/recoil-control'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Recoil Control Trainer – Spray Practice | SkillDrills",
    description: "Master weapon spray patterns, vertical mouse pull-down velocity, and horizontal recoil compensation for tactical shooters like CS2 and Valorant.",
    url: "https://skilldrills.online/drills/fps/recoil-control",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Recoil Control Trainer – Spray Practice | SkillDrills",
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

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Recoil Control Trainer",
    "url": "https://skilldrills.online/drills/fps/recoil-control",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free browser FPS drill for mastering recoil control, spray patterns, and weapon compensation for CS2, Valorant, PUBG, and other shooters."
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
          "text": "Recoil control is the physical counter-movement applied to the mouse to counteract the programmatic vertical climb and horizontal sway (spray pattern) of an automatic weapon during sustained fire."
        }
      },
      {
        "@type": "Question",
        "name": "Why is the first 8-10 bullet pull-down the most critical phase of a spray?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For the first 8-10 rounds of an assault rifle spray (such as the AK-47), recoil climb is predominantly vertical with minimal horizontal deviation. Mastering this initial pull-down guarantees reliable kills within the standard 200-400ms time-to-kill window."
        }
      },
      {
        "@type": "Question",
        "name": "How does recoil control differ between CS2, Valorant, and Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CS2 utilizes fully deterministic, static spray patterns that follow identical coordinate offsets across all 30 rounds. Valorant features deterministic vertical climb for the first 5-6 bullets, followed by randomized horizontal bloom. Apex Legends combines moderate per-weapon recoil curves with recoil smoothing (jitter aiming or strafe compensation) during movement."
        }
      },
      {
        "@type": "Question",
        "name": "How does generalized motor program (GMP) theory explain spray control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In motor control neuroscience (Schmidt & Lee, 2011), rapid motor actions under 700ms execute too quickly for closed-loop visual feedback. High-level aimers store the spray pattern as an open-loop generalized motor program with invariant relative timing and force parameters."
        }
      },
      {
        "@type": "Question",
        "name": "What is a spray transfer and how do you execute it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A spray transfer involves shifting sustained automatic fire from a neutralized target to a second adjacent target without releasing the trigger. It requires flicking to the new target while accounting for the ongoing vertical and horizontal offset of the current bullet index."
        }
      },
      {
        "@type": "Question",
        "name": "How do mouse sensitivity and mousepad friction affect recoil control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lower sensitivities require larger physical forearm strokes, which increases motor stability and reduces percentage-error variance. Control-oriented mousepads with higher dynamic friction prevent overshoot during rapid vertical mouse deceleration."
        }
      },
      {
        "@type": "Question",
        "name": "Should you pull down with your wrist or your forearm during a spray?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Short bursts (3-7 bullets) can be managed via finger flexion and wrist extension. Sustained sprays (15-30 bullets) require locking the wrist and gliding the entire forearm downward from the elbow to avoid reaching the end of wrist range of motion."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between weapon spread (bloom) and recoil pattern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recoil pattern is the predictable geometric displacement of the weapon barrel over time. Spread (bloom) is the random angular inaccuracy cone applied to each individual bullet, which expands during movement or continuous fire and cannot be fully compensated by mouse movement."
        }
      },
      {
        "@type": "Question",
        "name": "Is this recoil trainer completely free to use in the browser?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SkillDrills Recoil Control Trainer is 100% free, runs directly in modern desktop browsers via HTML5 Pointer Lock, and requires no account creation or downloads."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice recoil control drills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Practicing 10 to 15 minutes daily before matches establishes consistent neuromuscular activation. Overtraining beyond 30 continuous minutes often causes forearm fatigue and degraded motor precision."
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
        "position": 1,
        "name": "Configure Game Sensitivity",
        "text": "Align your DPI and in-game sensitivity in Session Settings to preserve 1:1 hardware coordinates.",
        "url": "https://skilldrills.online/drills/fps/recoil-control#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Initiate Sustained Fire",
        "text": "Hold left click to begin automatic fire, monitoring muzzle rise and initial bullet impact displacement.",
        "url": "https://skilldrills.online/drills/fps/recoil-control#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Pull Down Vertically",
        "text": "For the first 8–10 bullets, execute a steady downward mouse pull at constant velocity to cancel barrel climb.",
        "url": "https://skilldrills.online/drills/fps/recoil-control#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Counter-Steer Horizontal Sway",
        "text": "As the spray shifts horizontally, invert your mouse path (steering right when spray kicks left) to hold a tight grouping.",
        "url": "https://skilldrills.online/drills/fps/recoil-control#step-4"
      }
    ]
  };

  const recoilControlGuide = {
    heading: "Recoil Control Trainer Guide & Spray Biomechanics",
    intro: [
      "Recoil Control Trainer is an empirical sensorimotor drill engineered to build the muscle memory required to counteract programmatic weapon spray patterns, vertical climb velocity, and horizontal sway in first-person shooters. In tactical and battle royale shooters such as Counter-Strike 2, VALORANT, Apex Legends, and PUBG, combat frequently extends beyond single-tap headshots. When targets execute erratic evasive maneuvers, sustained automatic fire with tight bullet grouping decides the gunfight.",
      "The motor learning framework governing rapid recoil compensation is defined by Richard A. Schmidt and Timothy D. Lee's Generalized Motor Program (GMP) theory (Schmidt & Lee, 2011). Because 10-round bursts occur in under 700 milliseconds—faster than human closed-loop visual feedback can process individual bullet impacts—elite players execute a pre-structured open-loop motor program containing invariant relative timing and force parameters.",
      "This motor process aligns with Robert S. Woodworth's classic two-component model of aiming (Woodworth, 1899) and David E. Meyer's optimized submovement model (Meyer et al., 1988): an initial ballistic open-loop pull-down of the mouse followed by fine corrective submovements to compensate for horizontal sway and dynamic target strafes.",
      "Motor precision adheres to Fitts's Law (Fitts, 1954) and Schmidt's impulse variability model (Schmidt et al., 1979): as the velocity and force of downward mouse pulling increase, muscular output variability expands. By training with high-resolution digital chronometry using performance.now() (Woods et al., 2015), this drill isolates the steady pull-down velocity necessary to minimize grouping spread.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
    ],
    benchmarks: {
      title: "Magazine Accuracy & Recoil Control Skill Tiers",
      headers: ["Skill Tier", "Magazine Accuracy %", "Motor Control Characteristics", "In-Game Combat Implication"],
      rows: [
        ["Tier 1 (Apex Laser)", "78% – 90%+", "Near-perfect vertical velocity matching; sub-pixel horizontal counter-steering across all 30 rounds with zero wasted bullets.", "Lethal multi-target spray transfers in CS2 Faceit Level 10, VALORANT Radiant, and Apex Predator lobbies."],
        ["Tier 2 (Competitive Pro)", "62% – 78%", "Pinpoint first 10-round headshot grouping; rapid recentering during horizontal spray inversions on moving targets.", "Wins mid-range rifle duels reliably; consistently executes two-target spray transfers."],
        ["Tier 3 (High-Skill FPS)", "48% – 62%", "Solid vertical pull-down; minor over-compensation or delay during bullets 12–25 when horizontal recoil shifts.", "Reliable close-to-mid range sprays; struggles with long-range full-auto spray transfers."],
        ["Tier 4 (Intermediate)", "35% – 48%", "Inconsistent pull-down velocity; hesitates around bullet 7, allowing muzzle rise over the target's head.", "Loses spray duels frequently; forced to rely on single taps or short 3-round bursts."],
        ["Tier 5 (Developing / Jittery)", "Sub-35%", "Excessive hand tension causing erratic vertical jerks; bullets scatter across the full canvas.", "Fails the 40% magazine discipline threshold; wastes ammunition outside target hitbox."]
      ],
      note: "Accuracy percentages represent confirmed target hits divided by total rounds fired per magazine cycle, measured via performance.now() chronometry (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols for Perfecting Recoil Control",
      items: [
        {
          name: "Open-Loop First 10-Bullet Commitment",
          desc: "Do not wait to see where your bullets land before pulling down. The first 8–10 rounds of an assault rifle spray climb vertically at a fixed rate. Commit to an immediate, fluid downward pull the instant you press fire (Schmidt & Lee, 2011).",
          tips: "Focus 100% on a consistent initial pull-down speed before attempting horizontal corrections."
        },
        {
          name: "Elbow-Driven Forearm Gliding Over Wrist Cramping",
          desc: "Pulling down solely with the wrist causes the palm to compress against the pad, hitting the end of wrist articulation around bullet 12. Anchor wide vertical sprays from the elbow, gliding the entire forearm backward on the pad.",
          tips: "Keep your wrist locked in neutral alignment and let your forearm pull the mouse down smoothly."
        },
        {
          name: "Horizontal Inversion Counter-Steering",
          desc: "When a weapon's spray kicks to the right, your mouse must counter-steer to the left. Learn the inflection point where the vertical climb pauses and horizontal oscillation begins.",
          tips: "Anticipate the horizontal shift by rhythm rather than chasing bullet holes on screen."
        },
        {
          name: "Muscle Tension Modulation & Soft Grip",
          desc: "Tensing the forearm increases muscular noise and causes erratic vertical tremors (Schmidt et al., 1979). Maintain a light, relaxed grip so your mouse glides without stuttering.",
          tips: "If your sprays feel jittery or inconsistent, consciously reduce your grip pressure by half."
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
  const copyEn = {
    h1Prefix: null,
    h1Keyword: "Recoil Control Trainer",
    h1Suffix: null,
    rulesItems: [
      { num: "1", text: "Headshot Precision", highlight: "+100 PTS / +0.25s", result: "Top Priority Target Zone" },
      { num: "2", text: "Chest & Limb Hits", highlight: "+40 / +20 PTS", result: "Maintains Combo Streak" },
      { num: "3", text: "Level Progression", highlight: "+1 Level / 1400 PTS", result: "Speed & Recoil Scale" },
      { num: "4", text: "Magazine Discipline", highlight: "<40% Mag Penalty", result: "Resets Combo (-0.6s)" }
    ]
  };

  return (
    <>
      {/* 6 Schema.org JSON-LD definitions */}
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

      <RecoilControlClient copy={copyEn} />

      <DrillGuide guide={recoilControlGuide} />

      <DrillFooter />
    </>
  );
}

