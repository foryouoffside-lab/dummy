import ProSmoothPursuitClient from './ProSmoothPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
export const metadata = {
  title: "Smooth Pursuit Aim Trainer – Curve Tracking | SkillDrills",
  description: "Free smooth pursuit aim trainer. Train continuous target tracking and velocity matching against high-mobility targets in Apex and Overwatch 2.",
  keywords: [
    "smooth pursuit aim trainer",
    "smooth pursuit aim",
    "smooth pursuit training fps",
    "curve tracking aim trainer",
    "lissajous curve tracking drill",
    "apex legends curve tracking",
    "overwatch 2 smooth pursuit",
    "forearm tracking stability tool",
    "high ttk smooth pursuit drill",
    "free smooth pursuit aim trainer",
    "visual pursuit tracking drill",
    "foveal vision aim trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
    languages: getAlternateLanguages('/drills/fps/pro-smooth-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Smooth Pursuit Aim Trainer – Curve Tracking | SkillDrills",
    description: "Master continuous smooth pursuit, harmonic Lissajous curve tracking, and forearm motor stabilization for high-TTK FPS games like Apex Legends and Overwatch 2.",
    url: "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Pursuit Aim Trainer – Curve Tracking | SkillDrills",
    description: "Master continuous smooth pursuit, harmonic Lissajous curve tracking, and forearm motor stabilization for high-TTK FPS games like Apex Legends and Overwatch 2.",
  },
};

export default function ProSmoothPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Smooth Pursuit Aim Trainer", "item": "https://skilldrills.online/drills/fps/pro-smooth-pursuit" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Smooth Pursuit Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free browser FPS drill training smooth pursuit aiming, harmonic Lissajous curve reading, and forearm motor stabilization for competitive games."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Smooth Pursuit Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training smooth pursuit aiming, harmonic Lissajous curve reading, and forearm motor stabilization for competitive games.",
    "genre": "FPS Training / Smooth Pursuit Aim",
    "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Smooth Pursuit Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
    "description": "A free browser FPS drill training smooth pursuit aiming, harmonic Lissajous curve reading, and forearm motor stabilization for competitive games.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Smooth Pursuit"],
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
        "name": "What is smooth pursuit training in FPS gaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth pursuit training isolates your neuromuscular visual system's capacity to follow continuous, curved trajectories smoothly without resorting to erratic catch-up saccades or jerky micro-flicks. It develops real-time velocity matching between ocular tracking and mouse movement."
        }
      },
      {
        "@type": "Question",
        "name": "How does the neurological smooth pursuit system differ from saccadic flicking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "First demonstrated by Cyril Rashbass (1961), smooth pursuit and saccades operate via independent neurological pathways. Saccades are open-loop ballistic leaps triggered by position errors, whereas smooth pursuit is a continuous closed-loop velocity-guided system mediated by visual motion areas MT/V5 and frontal eye fields (Krauzlis, 2004)."
        }
      },
      {
        "@type": "Question",
        "name": "Why is my tracking aim shaky or jittery during curve tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Shaky tracking is caused by excessive forearm or wrist tension, high static friction on the mouse pad, or over-reliance on visual crosshair confirmation. When a player watches the crosshair instead of the target, the brain generates constant micro-corrections that produce physical hand tremor."
        }
      },
      {
        "@type": "Question",
        "name": "What is foveal gaze leading in smooth pursuit aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Discovered by Land & McLeod (2000), elite performers do not stare directly at their current tool position; instead, their foveal gaze tracks slightly ahead of the moving object. This anticipatory gaze leading allows the motor cortex to prepare upcoming directional adjustments before the cursor reaches the inflection point."
        }
      },
      {
        "@type": "Question",
        "name": "How do high-TTK games like Apex Legends and Overwatch 2 rely on smooth pursuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In high-TTK (time-to-kill) shooters, targets survive multiple seconds of continuous damage while executing multi-directional strafes, wall bounces, and vertical slides. Winning duels requires sustaining unbroken damage uptime via smooth pursuit rather than relying on a single initial flick."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Lissajous curve and why is it used for tracking aim practice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Lissajous curve is a harmonic trajectory produced by two perpendicular sinusoidal oscillations operating at differing frequencies and phases. It creates continuously shifting, non-linear acceleration patterns that prevent predictable linear memory, forcing true reactive pursuit."
        }
      },
      {
        "@type": "Question",
        "name": "How does monitor refresh rate and mouse polling affect smooth pursuit accuracy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "High refresh rates (144Hz–360Hz) provide continuous retinal motion updates, preventing motion blur and stroboscopic tearing (Woods et al., 2015). A 1000Hz+ mouse polling rate delivers low-latency coordinate updates, allowing smooth continuous integration without coordinate stepping."
        }
      },
      {
        "@type": "Question",
        "name": "What mouse grip style provides the highest stability for continuous tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A relaxed claw or palm-claw hybrid grip with generous palm support provides superior tracking stability. It anchors forearm rotation from the elbow while allowing subtle wrist micro-adjustments, eliminating erratic finger twitching during wide sweeping arcs."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice smooth pursuit drills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Practicing 10 to 15 minutes daily before launching competitive matches warms up forearm motor units and recalibrates ocular smooth pursuit. Avoid overtraining beyond 30 continuous minutes to prevent forearm extensor fatigue."
        }
      },
      {
        "@type": "Question",
        "name": "Why does falling off-target reset my combo multiplier in this drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Falling off-target resets your combo multiplier to reward continuous tracking uptime and beam discipline. If optional Time Penalty is enabled in Session Settings, being off-target for a cumulative 1.0 second will also deduct 0.6 seconds from your remaining round timer."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Smooth Pursuit Tracking Aim",
    "description": "Step-by-step instructions to calibrate continuous ocular pursuit and forearm motor tracking along Lissajous curves.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configure Game Sensitivity",
        "text": "Adjust your DPI, primary game, and sensitivity in Session Settings to preserve 1:1 hardware coordinates.",
        "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Engage Raw Pointer Lock",
        "text": "Click 'Start Drill' to enter fullscreen mode and lock the system cursor to bypass OS mouse acceleration.",
        "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Fixate Foveal Gaze on Target Model",
        "text": "Focus your eyes directly on the leading edge of the moving target rather than watching your crosshair.",
        "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Match Continuous Curve Velocity",
        "text": "Glide your mouse with relaxed forearm pressure, matching target speed and phase through harmonic direction shifts.",
        "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit#step-4"
      }
    ]
  };

  const proSmoothPursuitGuide = {
    heading: "Smooth Pursuit Aim Trainer Guide & Tracking Biomechanics",
    intro: [
      "Smooth Pursuit Aim Trainer is an empirical sensorimotor training drill engineered to cultivate continuous ocular target tracking, harmonic Lissajous curve reading, and jitter-free forearm motor stabilization. In high-TTK competitive shooters such as Apex Legends, Overwatch 2, and The Finals, combat outcomes are governed by damage uptime—demanding that players maintain sustained reticle connection throughout multi-second aerial and ground mobility maneuvers.",
      "The neurological basis of ocular pursuit was mapped by Richard J. Krauzlis (2004), demonstrating that smooth pursuit eye movements are regulated through recurrent cortical loops between the medial superior temporal area (MST), the frontal eye field (FEF), and the primary visual motion cortex (MT/V5). Rather than reacting passively, this neural circuit models target velocity vectors to continuously drive the oculomotor plant in real time.",
      "In a landmark series of psychophysical experiments, Cyril Rashbass (1961) proved that smooth pursuit and saccadic movements are anatomically and functionally dissociated: saccades respond to retinal position displacement, whereas smooth pursuit responds exclusively to retinal image velocity (slip). When players tense their hands or try to 'micro-flick' across a moving target, they disrupt smooth pursuit circuitry, triggering involuntary catch-up saccades that cause noticeable aim stutter.",
      "By combining harmonic Lissajous coordinate generation with foveal gaze leading principles (Land & McLeod, 2000), dynamic attentional tracking expansion (Green & Bavelier, 2003), and high-resolution digital chronometry (Woods et al., 2015), this drill teaches players to eliminate forearm tension, glide through complex non-linear curves, and sustain laser-like beam tracking under competitive pressure.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
    ],
    benchmarks: {
      title: "Tracking Uptime & Velocity Matching Performance Tiers",
      headers: ["Performance Tier", "Target On-Time %", "Neuromuscular & Oculomotor State", "Competitive In-Game Implication"],
      rows: [
        ["Tier 1 (Apex Beam)", "85% – 95%+", "Uninterrupted foveal lock; perfect velocity matching through Lissajous inflection points with zero catch-up saccades", "Lethal tracking beam in Apex Predator, Top 500 Overwatch, and Grandmaster tracking lobbies"],
        ["Tier 2 (Competitive Pro)", "72% – 85%", "Fluid forearm modulation; immediate velocity compensation when target reaches harmonic curvature apex", "Wins sustained high-TTK 1v1 duels against strafing and sliding opponents with high weapon efficiency"],
        ["Tier 3 (High-Skill FPS)", "58% – 72%", "Solid linear tracking; minor hesitation and 10–15% tracking loss during rapid non-linear direction inversions", "Competitive tracking capability; struggles slightly against erratic grapple or dash mechanics"],
        ["Tier 4 (Intermediate)", "42% – 58%", "Tendency to step or flick rather than glide; forearm tension creates periodic jitter and target overrun", "Vulnerable to high-mobility characters; frequently breaks continuous tracking beam during sprays"],
        ["Tier 5 (Developing / Jittery)", "Sub-42%", "High ocular latency; crosshair repeatedly trails behind target requiring wide corrective re-flicks", "Misses majority of tracking shots; high mouse friction or excessive hand tension causing aim stutter"]
      ],
      note: "Tracking uptime percentages represent cumulative on-target duration divided by total active drill time, computed with performance.now() digital chronometry (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols for Perfecting Smooth Pursuit Aim",
      items: [
        {
          name: "Foveal Gaze Leading Over Crosshair Fixation",
          desc: "Never look directly at your crosshair while tracking. As shown by Land & McLeod (2000), fixating on the tool rather than the target degrades velocity prediction. Focus your ocular gaze 2–5 pixels ahead of the moving target's leading edge, allowing peripheral vision and proprioception to align the reticle automatically.",
          tips: "If your aim feels jerky, consciously shift your eyes directly onto the target surface and breathe out slowly."
        },
        {
          name: "Forearm Micro-Tension Release & Joint Decoupling",
          desc: "Muscle tension is the primary cause of tracking jitter. Tensing the forearm activates antagonist muscle groups, causing physical tremors. Rest the fleshy base of your forearm lightly on the mousepad and initiate wide curve tracking from the elbow rather than twisting the wrist.",
          tips: "Keep your grip force at approximately 30–40% of maximum hand strength—loose hands track smoothly."
        },
        {
          name: "Harmonic Curve Velocity Anticipation",
          desc: "Lissajous curves follow sinusoidal kinematics: they decelerate at peak inflection turns and accelerate through the central axis. Krauzlis's research (2004) confirms that the cerebellum can predict sinusoidal harmonics, allowing you to decelerate before the apex and accelerate through the center without lagging.",
          tips: "Listen to the harmonic rhythm of the movement; anticipate the deceleration curve rather than reacting to it."
        },
        {
          name: "Catch-Up Saccade Suppression",
          desc: "When you fall slightly off target, resist the instinctive urge to violently flick back on. Cyril Rashbass (1961) proved that sudden saccades blind visual processing for 20–50 ms. Instead, gently increase your continuous glide speed to smoothly re-intercept the target outline.",
          tips: "Treat tracking like steering a high-speed vehicle on ice—smooth acceleration always beats sharp jerky corrections."
        }
      ]
    },
    steps: [
      "Configure your exact game, DPI, and in-game sensitivity in Session Settings to preserve 1:1 hardware coordinates, then lock the pointer.",
      "Fixate your eyes onto the glowing target model as it begins its harmonic Lissajous path across the display.",
      "Glide your mouse with relaxed forearm pressure from the elbow, matching target speed and continuous curvature without pausing.",
      "Build your continuous tracking uptime to increase the combo multiplier up to the 3.0x maximum, earning level advancements every 1400 points.",
      "Review your tracking accuracy percentage and off-target duration in the end-session analytics to identify inflection-point weaknesses."
    ],
    audience: "Competitive FPS tracking specialists in Apex Legends, Overwatch 2, The Finals, and Call of Duty Warzone seeking jitter-free beam accuracy, smooth gaze tracking, and high damage uptime against fast-moving opponents.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('woods2015', 'krauzlis2004', 'green2003', 'rashbass1961', 'land2000'),
    related: [
      { href: "/drills/fps/anti-zigzag-movement-trainer", label: "Anti-Zigzag Aim Trainer" },
      { href: "/drills/fps/anti-strafe-jitter-duel", label: "Anti-Strafe Jitter Trainer" },
      { href: "/drills/fps/fps-tracking-trainer", label: "FPS Tracking Trainer" },
      { href: "/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
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

      <ProSmoothPursuitClient />

      <DrillGuide guide={proSmoothPursuitGuide} />
    </>
  );
}
