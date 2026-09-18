import TargetAcquisitionClient from './TargetAcquisitionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
export const metadata = {
  title: "Target Acquisition Aim Trainer – Precision | SkillDrills",
  description: "Free target acquisition aim trainer. Train visual target detection, threat discrimination and first-shot flick accuracy under time pressure.",
  keywords: [
    "target acquisition aim trainer",
    "target acquisition trainer",
    "first shot accuracy drill",
    "first shot aim trainer",
    "target selection trainer",
    "target discrimination aim",
    "fps target acquisition",
    "CS2 target acquisition practice",
    "Valorant target priority drill",
    "how to find enemies faster in fps",
    "fast target acquisition fps",
    "visual discrimination training for gamers"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/target-acquisition",
    languages: getAlternateLanguages('/drills/fps/target-acquisition'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Target Acquisition Aim Trainer – Precision | SkillDrills",
    description: "Master visual target acquisition speed, feature contrast discrimination, and first-shot flick accuracy for competitive tactical FPS shooters like Valorant, CS2, and Apex Legends.",
    url: "https://skilldrills.online/drills/fps/target-acquisition",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Acquisition Aim Trainer – Precision | SkillDrills",
    description: "Master visual target acquisition speed, feature contrast discrimination, and first-shot flick accuracy for competitive tactical FPS shooters like Valorant, CS2, and Apex Legends.",
  },
};

export default function TargetAcquisitionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Acquisition", "item": "https://skilldrills.online/drills/fps/target-acquisition" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Target Acquisition Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/target-acquisition",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free browser FPS drill training visual target identification speed, threat recognition, and first-shot accuracy for competitive FPS games."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Target Acquisition Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training visual target identification speed, threat recognition, and first-shot accuracy for competitive FPS games.",
    "genre": "FPS Training / Target Acquisition",
    "url": "https://skilldrills.online/drills/fps/target-acquisition",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Target Acquisition Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/target-acquisition",
    "description": "A free browser FPS drill training visual target identification speed, threat recognition, and first-shot accuracy for competitive FPS games.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Acquisition"],
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
        "name": "What is target acquisition in competitive FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target acquisition is the combined cognitive and motor sequence of visually detecting an enemy within your field of view, discriminating them from environmental clutter and friendly entities, planning a motor trajectory, and executing a ballistic snap to land the first shot."
        }
      },
      {
        "@type": "Question",
        "name": "How does target acquisition differ from raw reaction time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simple reaction time tests only the latency between a single predictable stimulus and a click. Target acquisition incorporates visual search, selective spatial attention, feature discrimination (e.g. brightness, silhouette), and motor pointing accuracy under time pressure."
        }
      },
      {
        "@type": "Question",
        "name": "What is the cognitive Feature-Integration Theory of target detection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formulated by Anne Treisman & Garry Gelade (1980), Feature-Integration Theory establishes that basic visual features (luminance, color, orientation) are processed preattentively and in parallel across the visual field before focused spatial attention binds them into discrete target objects for motor selection."
        }
      },
      {
        "@type": "Question",
        "name": "Why do pro players acquire and shoot targets faster than ranked amateurs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional players possess superior visual salience filtering (Wolfe, 2007) and optimized submovement motor programs (Meyer et al., 1988). Their visual systems bypass serial scanning, allowing them to snap directly to the highest-threat visual contrast without cognitive hesitation."
        }
      },
      {
        "@type": "Question",
        "name": "How does first-shot accuracy affect duel outcomes in tactical shooters like Valorant and CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In low-TTK shooters where single-bullet headshots are lethal (e.g., Vandal or AK-47), the player who acquires the head target and clicks first wins the engagement. Failing to acquire the target cleanly on the initial flick results in missing the first-bullet accuracy window."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use focal vision or peripheral vision to locate enemy targets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Locate targets using peripheral vision, then rapidly guide focal vision and crosshair alignment onto the target centroid. Staring fixedly at your crosshair restricts your visual attention window and delays detection of peripheral threats."
        }
      },
      {
        "@type": "Question",
        "name": "How does target density and visual clutter degrade target acquisition speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When multiple distractors share similar visual features with the target, visual search transitions from fast parallel pop-out to slow serial processing, increasing acquisition latency by 40–120 ms per additional visual distractor."
        }
      },
      {
        "@type": "Question",
        "name": "What is the optimal mouse grip style for rapid multi-target acquisition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Claw and fingertip grips are favored for target acquisition because they allow fine micro-corrections and rapid deceleration via finger articulation while preserving broad forearm mobility for wide angle snaps."
        }
      },
      {
        "@type": "Question",
        "name": "How does raw unaccelerated mouse input improve target acquisition consistency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hardware raw input establishes a strictly linear relationship between physical hand displacement and onscreen reticle motion, allowing the motor cortex to reliably calibrate the exact ballistic impulse needed to land on the target."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I practice target acquisition drills daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Practicing 10 to 15 minutes of high-intensity target acquisition drills at the start of your daily routine primes visual contrast sensitivity and establishes sharp first-shot muscle memory without inducing neuromuscular fatigue."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Rapid Visual Target Acquisition",
    "description": "Step-by-step instructions to optimize visual feature discrimination and first-shot flick execution.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrate Raw Input Sensitivity",
        "text": "Configure matching sensitivity and DPI in Session Settings to preserve 1:1 hardware coordinates."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Maintain Preattentive Soft Gaze",
        "text": "Center your gaze with relaxed ocular attention, using peripheral vision to detect target cluster presentation."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Discriminate High-Priority Target Contrast",
        "text": "Identify the brightest target in the cluster instantly without serial scanning through individual elements."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Execute Ballistic Flick with Pad Braking",
        "text": "Snap directly to the verified target centroid and click to fire, using mouse pad friction to eliminate overflicking."
      }
    ]
  };

  const targetAcquisitionGuide = {
    heading: "Target Acquisition Aim Trainer Guide & Visual Discrimination Biomechanics",
    intro: [
      "Target Acquisition Aim Trainer is a specialized perceptual-cognitive drill engineered to cultivate split-second visual detection, feature contrast discrimination, and lethal first-shot accuracy. In tactical shooters such as Valorant, Counter-Strike 2, and Rainbow Six Siege, round outcomes hinge on the first 300 milliseconds of sightline exposure: the combatant who spots, identifies, and snaps to the opponent's critical silhouette first wins the engagement.",
      "The theoretical foundation of visual search and object identification was formulated by Anne Treisman & Garry Gelade (1980) in Feature-Integration Theory. Treisman demonstrated that low-level visual features—such as luminance contrast, color pop-out, and edge orientation—are extracted preattentively and simultaneously across the entire visual field. Only when focused spatial attention is directed to a specific coordinate are these features bound into a recognizable enemy threat.",
      "Expanding on parallel visual processing, Jeremy M. Wolfe's (1994, 2007) Guided Search model details how top-down cognitive expectations combine with bottom-up sensory salience maps to prioritize attention. When players train visual contrast discrimination, their visual cortex learns to reject low-contrast background clutter and distractors instantly, shortening the latency between target appearance and motor initiation.",
      "By integrating Paul M. Fitts's (1954) motor difficulty laws, David E. Meyer et al.'s (1988) stochastic optimized submovement theory, and high-precision digital chronometry (Woods et al., 2015), this drill trains players to eliminate cognitive hesitation, execute sharp primary flicks, and anchor first-shot precision under competitive pressure.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
    ],
    benchmarks: {
      title: "Target Acquisition & Discrimination Latency Benchmarks",
      headers: ["Performance Tier", "Acquisition Latency", "First-Shot Accuracy", "Competitive In-Game Implication"],
      rows: [
        ["Tier 1 (Apex Sentinel / Radiant Pro)", "Sub-260 ms", "95% – 99%+", "Instantaneous preattentive threat detection; flawless first-bullet headshots with zero discrimination hesitation"],
        ["Tier 2 (Competitive Master / Tier-2 Esports)", "260 – 320 ms", "88% – 95%", "Exceptional visual spotting speed; decisive priority target engagement with minimal distractor interference"],
        ["Tier 3 (High-Skill Diamond / Ascendant)", "320 – 400 ms", "80% – 88%", "Solid first-shot accuracy; experiences slight 50–80 ms delays when multiple high-density clusters appear"],
        ["Tier 4 (Intermediate / Gold / Platinum)", "400 – 500 ms", "70% – 80%", "Prone to serial scanning; occasionally clicks lower-priority distractors out of order or overshoots target"],
        ["Tier 5 (Developing / Novice)", "500 ms+", "Sub-70%", "High visual clutter confusion; slow target acquisition causing frequent losses in initial peek duels"]
      ],
      note: "Acquisition latency represents elapsed time from target cluster presentation to first validated click on the priority stimulus, timed with high-resolution digital chronometry (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols for Perfecting Target Acquisition",
      items: [
        {
          name: "Preattentive Parallel Scanning Over Serial Peeking",
          desc: "Avoid serial eye scanning across individual screen zones. Rely on preattentive feature filters (Treisman & Gelade, 1980) to detect high-contrast luminance pops in peripheral vision while maintaining a centralized soft gaze anchor.",
          tips: "Keep your eyes relaxed near the center of the display; let the brightest target trigger your initial saccade rather than searching actively."
        },
        {
          name: "Saccadic-Motor Coupling for First-Shot Snaps",
          desc: "Decouple eye movement from hand movement: drive foveal saccades first to acquire the target centroid, allowing peripheral proprioception to whip the crosshair along the verified ocular vector.",
          tips: "Your eyes should reach the target 30–50 ms before your crosshair arrives, confirming target coordinates while your hand finishes the flick."
        },
        {
          name: "Contrast Discrimination Thresholding",
          desc: "In cluttered gunfights, dimmer silhouettes represent distant or non-threatening targets while high-luminance models indicate imminent threats. Train fine threshold discrimination to filter out visual noise without pausing the ballistic flick sequence.",
          tips: "Condition yourself to ignore dimmer secondary targets completely until the highest-contrast stimulus is eliminated."
        },
        {
          name: "Submovement Deceleration & Pad Braking",
          desc: "Balance ballistic speed with terminal stopping power (Meyer et al., 1988). Use mouse pad friction and fingertip grip adjustments to halt the crosshair precisely on target center without overflicking into reverse correction penalties.",
          tips: "Apply gentle downward palm or fingertip pressure at the end of the flick to brake the mouse mechanically on your pad."
        }
      ]
    },
    steps: [
      "Configure your exact game, DPI, and in-game sensitivity in Session Settings to preserve 1:1 hardware coordinates, then lock the pointer.",
      "Anchor your eyes in a centered soft gaze, awaiting the multi-target cluster spawn across the display.",
      "Visually identify the brightest, highest-priority target in the set using parallel contrast pre-filtering.",
      "Execute a crisp ballistic flick to the target centroid and click to score +100 PTS (+0.4s bonus timer).",
      "Clear remaining targets in descending luminance order to trigger the +400 PTS set cleared bonus and level progression."
    ],
    audience: "Competitive FPS players in Valorant, Counter-Strike 2, Apex Legends, and Overwatch 2 seeking faster threat spotting, superior first-shot headshot precision, and reduced visual clutter distraction.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/drills/fps/target-prioritization", label: "Target Prioritization Aim Trainer" },
      { href: "/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
      { href: "/drills/fps/micro-correction-precision", label: "Micro-Correction Aim Trainer" },
      { href: "/drills/fps/180-degree-awareness", label: "180° Awareness Pro" },
      { href: "/drills/fps/target-switching-swarm", label: "Target Switching Aim Trainer" }
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
      <TargetAcquisitionClient
        copy={{
          h1Keyword: "Target Acquisition Aim Trainer",
          h1Suffix: " - First Shot Precision"
        }}
      />
      <DrillGuide guide={targetAcquisitionGuide} />
    </>
  );
}

