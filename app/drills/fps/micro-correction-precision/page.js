import MicroCorrectionClient from './MicroCorrectionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
export const metadata = {
  title: "Micro-Correction Aim Trainer – Headshots | SkillDrills",
  description: "Master terminal deceleration, snap landing accuracy, and sub-degree micro-adjustments for tactical FPS games like Valorant and CS2 with raw pointer lock.",
  keywords: [
    "micro-correction aim trainer",
    "micro correction aim",
    "micro flick training",
    "headshot precision drill",
    "overflick correction",
    "micro adjustments aim",
    "micro flick aim trainer",
    "micro-adjustment aim training",
    "headshot accuracy trainer",
    "snap deceleration training",
    "tactical shooter micro adjustment",
    "fine motor aim control"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/micro-correction-precision",
    languages: getAlternateLanguages('/drills/fps/micro-correction-precision'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Micro-Correction Aim Trainer – Headshots | SkillDrills",
    description: "Master terminal deceleration, snap landing accuracy, and sub-degree micro-adjustments for tactical FPS games like Valorant and CS2 with raw pointer lock.",
    url: "https://skilldrills.online/drills/fps/micro-correction-precision",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Micro-Correction Aim Trainer – Headshots | SkillDrills",
    description: "Master terminal deceleration, snap landing accuracy, and sub-degree micro-adjustments for tactical FPS games like Valorant and CS2 with raw pointer lock.",
  },
};

export default function MicroCorrectionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Micro-Correction Aim Trainer", "item": "https://skilldrills.online/drills/fps/micro-correction-precision" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Micro-Correction Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/micro-correction-precision",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free browser FPS micro-correction aim trainer. Train your crosshair micro-adjustments, snap deceleration, and headshot precision under pressure."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Micro-Correction Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training micro-corrections, snap deceleration after large flicks, and precision headshot consistency for tactical shooters.",
    "genre": "FPS Training / Precision Aim",
    "url": "https://skilldrills.online/drills/fps/micro-correction-precision",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Micro-Correction Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/micro-correction-precision",
    "description": "A free browser FPS drill training micro-corrections, snap deceleration after large flicks, and precision headshot consistency for tactical shooters.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Precision Aim"],
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
        "name": "What is mouse deceleration in FPS aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mouse deceleration is the biomechanical ability to brake mouse momentum quickly and stably at the end of a rapid swipe. Developing controlled deceleration counteracts kinetic inertia, preventing your crosshair from sliding past the enemy hitbox and eliminating costly overshoot."
        }
      },
      {
        "@type": "Question",
        "name": "Why do players overflick past targets in tactical shooters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overflicking occurs when the initial ballistic movement generates more kinetic energy than the hand flexors can absorb upon landing. Under Woodworth's two-component aiming model (1899), an uncalibrated primary impulse overshoots the target boundary, forcing an emergency reverse micro-correction that drastically increases time-to-damage."
        }
      },
      {
        "@type": "Question",
        "name": "How does the two-component aiming model explain micro-adjustments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formalized by Robert S. Woodworth (1899) and expanded by Meyer et al. (1988), human rapid targeting consists of an initial open-loop ballistic impulse that covers 85–95% of target distance, followed by a closed-loop corrective submovement guided by visual and proprioceptive feedback to lock exactly onto the target center."
        }
      },
      {
        "@type": "Question",
        "name": "How do pro Valorant and CS2 players train micro-precision?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional tactical shooter players practice disciplined crosshair placement combined with micro-flicking routines. Rather than sweeping wildly across screens, they calibrate fingertip and wrist micro-adjustments to snap 5–30 pixels onto enemy head hitboxes immediately after holding or clearing an angle."
        }
      },
      {
        "@type": "Question",
        "name": "What is target confirmation before firing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target confirmation is the cognitive split-second where the visual cortex verifies that the reticle has fully settled inside the target bounding box before triggering index finger motor discharge. Without target confirmation, players suffer from panic firing during the deceleration phase, resulting in missed shots."
        }
      },
      {
        "@type": "Question",
        "name": "Can micro-correction drills improve headshot percentage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. In games like Counter-Strike 2 and Valorant, head hitboxes represent tiny angular visual angles. Training micro-adjustments refines fine motor motor-unit recruitment in the lumbricals and interossei, allowing sub-degree crosshair corrections that convert body-shot misses into lethal first-bullet headshots."
        }
      },
      {
        "@type": "Question",
        "name": "How do monitor refresh rates and mouse polling rates affect micro-flicking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "High refresh rates (144Hz–360Hz) deliver higher temporal frame density, reducing display quantization delay and visual motion smear during fast flicks (Woods et al., 2015). A 1000Hz+ mouse polling rate ensures low-latency coordinate updates, preventing micro-stutter when executing delicate 2-pixel fine adjustments."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice micro-correction drills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Engaging in 10 to 15 minutes of dedicated micro-correction training daily before ranked sessions builds strong neuromuscular myelin pathways without inducing hand fatigue. For mechanical rebuilding, 20 to 30 minutes with periodic rest intervals delivers optimal motor consolidation."
        }
      },
      {
        "@type": "Question",
        "name": "How does hand grip style affect fine fingertip micro-adjustments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Claw and fingertip grips provide superior vertical and horizontal micro-mobility because the base of the palm does not anchor rigidly to the mouse shell. This allows the fingers to curl and extend dynamically, executing 1–10 pixel adjustments far more rapidly than a rigid palm grip."
        }
      },
      {
        "@type": "Question",
        "name": "Why does missing or timing out reset my combo in this drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By default, missing a shot or allowing a target to expire resets your combo multiplier to enforce click discipline and penalize hasty, unconfirmed shooting. Players seeking higher tactical stakes can enable the optional Time Penalty in session settings to deduct 0.6 seconds per error."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Practice Aim Micro-Adjustments",
    "description": "Step-by-step instructions to train micro-correction speed, snap deceleration, and target confirmation.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configure Game Sensitivity",
        "text": "Set your game and sensitivity in Session Settings to mirror your 1:1 hardware coordinates and bypass operating system mouse curves."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Execute the Primary Ballistic Flick",
        "text": "Flick rapidly toward the target spawn location, utilizing arm and wrist acceleration to cover the majority of the distance."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Engage Friction Deceleration",
        "text": "Apply immediate muscular braking to stop mouse momentum within the target's immediate perimeter."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Micro-Adjust with Fingertips and Confirm",
        "text": "Execute a subtle sub-degree fingertip adjustment to place the reticle dead center on the target, confirm visually, and click."
      }
    ]
  };

  const microCorrectionGuide = {
    heading: "Micro-Correction Aim Trainer Guide & Precision Chronometry",
    intro: [
      "Micro-Correction Aim Trainer is an empirical sensorimotor training drill engineered to isolate, calibrate, and master the secondary adjustment phase of visual targeting. In high-stakes competitive shooters such as Valorant, Counter-Strike 2, and Rainbow Six Siege, combat encounters are frequently won or lost by sub-degree corrections of only 5 to 25 pixels.",
      "The theoretical framework governing rapid targeted movement was established by Robert S. Woodworth (1899) in his seminal two-component model: an initial open-loop ballistic impulse propelling the limb toward the visual stimulus, followed by a closed-loop current control phase governed by continuous sensory feedback. This speed-accuracy trade-off was mathematically codified by Paul M. Fitts (1954) in Fitts' Law, where movement time scales logarithmically with target distance and inversely with target width (Index of Difficulty = log2(2D / W)).",
      "Later neuro-computational refinements by David E. Meyer et al. (1988) introduced the Stochastic Optimized Submovement Model, demonstrating that human motor control plans primary movements to fall slightly short of or near the target boundary, relying on rapid corrective submovements to resolve coordinate discrepancy without excessive kinetic overrun.",
      "During the high-acuity terminal fixation phase, human ocular dynamics deploy microsaccades—involuntary, rapid foveal shifts of less than 1 degree—to refresh neural representations and center the retina over high-frequency visual targets (Rolfs, 2009; Martinez-Conde et al., 2004). This drill pairs raw pointer lock hardware input with performance.now() digital chronometry (Woods et al., 2015) to help players eliminate terminal oscillation, conquer overflick drift, and land pinpoint headshots with robotic consistency.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
    ],
    benchmarks: {
      title: "Micro-Correction Latency & Target Acquisition Tiers",
      headers: ["Performance Tier", "Correction Latency Window", "Motor Control Mechanics", "Competitive In-Game Implication"],
      rows: [
        ["Tier 1 (Apex Precision)", "Sub-280 ms", "Near-instantaneous deceleration; sub-10px fingertip micro-adjustments executed with zero overshoot oscillation", "Lethal first-bullet headshot conversion in Radiant, CS2 Faceit 10, and high-tier competitive lobbies"],
        ["Tier 2 (Competitive Pro)", "280 – 340 ms", "Disciplined muscular braking; smooth transition from primary flick to secondary micro-landing", "Consistently out-duels aggressive angle peekers; reliable headshot accuracy on micro-targets"],
        ["Tier 3 (High-Skill FPS)", "340 – 420 ms", "Solid target acquisition; occasional 10–15px overshoot requiring minor dual-submovement corrections", "Effective tactical gunplay; minor hesitation when micro-adjusting across vertical offsets"],
        ["Tier 4 (Intermediate)", "420 – 520 ms", "Loose terminal braking; tendency to float or drag past hitboxes before initiating correction", "Prone to spraying or losing duels when targets perform rapid counter-strafes"],
        ["Tier 5 (Developing / High Jitter)", "520 ms+", "Excessive ballistic momentum with severe overshooting; delayed target visual confirmation", "Vulnerable to common peeks; crosshair frequently lands off-target requiring wide re-flicks"]
      ],
      note: "Latencies represent combined deceleration, visual target confirmation, micro-adjustment, and click execution times measured via performance.now() chronometry (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols for Perfecting Terminal Deceleration & Micro-Aim",
      items: [
        {
          name: "Terminal Muscular Braking & Pad Friction",
          desc: "Rather than allowing mouse momentum to drift freely after a swipe, intentionally push your mouse downward slightly into the pad weave or clamp your ring and pinky fingers against the pad. This biomechanical friction brake instantly bleeds kinetic inertia at the target perimeter.",
          tips: "A hybrid cloth mousepad with moderate dynamic stopping friction assists deceleration without sacrificing low static startup friction."
        },
        {
          name: "The Two-Phase Aiming Cadence",
          desc: "Consciously divide your aim into two distinct rhythms: a fast, relaxed primary flick covering 90% of distance, followed by a deliberate, sharp micro-nudge. Never rush the final click before the micro-adjustment has confirmed the crosshair on target.",
          tips: "Resist the urge to panic click simultaneously with the flick landing; decouple movement completion from trigger actuation."
        },
        {
          name: "Fingertip Articulation for Sub-Degree Offsets",
          desc: "Use the wrist and forearm solely for the primary displacement, reserving fingertip curling and extending (controlled by the flexor digitorum and intrinsic hand lumbricals) for the final 5–20 pixel micro-correction.",
          tips: "Adopt a relaxed claw or fingertip grip that allows unobstructed vertical and horizontal finger mobility within your palm arch."
        },
        {
          name: "Visual Anchor Fixation (Microsaccadic Locking)",
          desc: "Lock your ocular gaze directly onto the center pixel of the target before your crosshair arrives. According to visual psychophysics (Rolfs, 2009), moving your eyes ahead of the cursor primes the pre-motor cortex with exact coordinate feedback.",
          tips: "Keep your eyes fixed on the target center—do not watch your crosshair travel across the screen."
        }
      ]
    },
    steps: [
      "Configure your exact game, DPI, and in-game sensitivity in the Session Settings modal to guarantee 1:1 cm/360 motor memory transfer, then engage raw Pointer Lock.",
      "When a micro-target spawns, execute a swift primary flick toward the target boundary covering approximately 90% of the displacement.",
      "Apply immediate muscular braking near the target rim, execute a subtle sub-degree fingertip micro-adjustment onto the target center, confirm visual lock, and click.",
      "Review your mean latency, accuracy percentage, and combo retention in the post-session analytics to diagnose undershoot versus overshoot tendencies."
    ],
    audience: "Tactical FPS competitors in Valorant, CS2, and Rainbow Six Siege seeking lethal first-bullet headshot consistency, players eliminating overflick oscillation, and marksmen calibrating sub-degree motor control.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'martinezConde2004', 'rolfs2009', 'woodworth1899'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
      { href: "/drills/fps/angle-hold-trainer", label: "Crosshair Placement & Angle Hold Trainer" },
      { href: "/drills/fps/instant-response", label: "FPS Reaction Time Test" },
      { href: "/drills/fps/fps-tracking-trainer", label: "FPS Tracking Speed Trainer" }
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

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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

      <MicroCorrectionClient
        copy={{
          h1Keyword: "Micro-Correction Aim Trainer",
          h1Suffix: " - Headshot Precision & Deceleration",
          subtitle: "Master terminal deceleration, snap landing accuracy, and sub-degree micro-adjustments for tactical FPS games.",
          statScore: "Score",
          statTime: "Time",
          statAccuracy: "Accuracy",
          statBestScore: "Best Score",
          statAvgCorrection: "Avg Correction",
          statMaxCombo: "Max Combo",
          statPeakLevel: "Peak Level",
          startTitle: "Micro-Correction Aim Trainer",
          startSubtitle: "Hardware Raw Input • Endless Level Progression",
          getReady: "GET READY",
          toggleFlash: "Toggle Miss Flash",
          toggleSound: "Toggle Sound",
          stageCaption: "Click the anchor target then instantly adjust your crosshair to hit the small micro-target.",
          rulesTitle: "Drill Instructions & Scoring System",
          rulesItems: [
            { num: "1", text: "Hit Anchor Target", highlight: "+10 PTS (+0.2s)", result: "Unlocks Micro" },
            { num: "2", text: "Micro Target Hit", highlight: "Up To +585 PTS", result: "Precision × Combo" },
            { num: "3", text: "Level Progression", highlight: "+1 Level / 1400 PTS", result: "Adaptive Scaling" },
            { num: "4", text: "Miss / Timeout", highlight: "Penalty", result: "Resets Combo (-0.6s)" }
          ],
          aboutTitle: "About Micro-Correction Aim Trainer",
          aboutHeading: "What Is Micro-Correction Aiming?",
          aboutText: "Most aimed movements are not one motion but two: a fast ballistic launch, then a slower corrective submovement near the target — the two-component pattern Woodworth described in 1899 and Meyer et al. (1988) later formalised. This drill trains the second half, where accuracy is actually decided."
        }}
      />

      <DrillGuide guide={microCorrectionGuide} />
      <DrillFooter />
    </>
  );
}
