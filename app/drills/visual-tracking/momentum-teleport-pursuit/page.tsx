import MomentumTeleportPursuitClient from './MomentumTeleportPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teleport Gaze Tracking Drill – Momentum | SkillDrills",
  description: "Track targets carrying momentum that teleport across the screen. Train rapid saccadic re-acquisition and continuous pursuit online. Free, no sign-up.",
  keywords: [
    "teleport tracking drill",
    "momentum eye tracking",
    "saccadic re-acquisition",
    "visual tracking drill",
    "smooth pursuit eye exercise",
    "post-saccadic pursuit",
    "gaze stability practice",
    "target jump reaction",
    "ocular motor training",
    "foveal centering drill",
    "fps teleport tracking",
    "dynamic visual acuity test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/momentum-teleport-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Teleport Gaze Tracking Drill – Momentum | SkillDrills",
    description: "Track targets carrying momentum that teleport across the screen. Train rapid saccadic re-acquisition and continuous pursuit online. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teleport Gaze Tracking Drill – Momentum | SkillDrills",
    description: "Track targets carrying momentum that teleport across the screen. Train rapid saccadic re-acquisition and continuous pursuit online. Free, no sign-up.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills",
      "item": "https://skilldrills.online/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Visual Tracking",
      "item": "https://skilldrills.online/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Momentum Teleport Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Momentum Teleport Pursuit Gaze Training",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Interactive ocular motor training assessing saccadic re-acquisition latency and momentum-conserved smooth pursuit."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Momentum Teleport Pursuit Drill",
  "url": "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All modern browsers",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Momentum Teleport Pursuit",
  "description": "Precision visual tracking exercise where moving targets abruptly jump locations while maintaining directional velocity vectors.",
  "genre": ["Aim Training", "Ocular Motor Assessment", "Reflex Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Web Browser"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Saccadic Re-acquisition with Momentum Teleport Pursuit",
  "description": "Step-by-step ocular motor protocol for maintaining continuous target tracking across instantaneous spatial displacements.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Foveate Initial Vector",
      "text": "Position yourself 50-70 cm from the screen. Fixate upon the moving target using smooth pursuit, matching its velocity vector."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Detect Spatial Jump",
      "text": "When the target abruptly teleports, allow peripheral retinal cells to register the new spatial coordinate without moving your head."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute Ballistic Saccade",
      "text": "Fire an immediate, linear catch-up saccade directly to the displaced coordinate to re-center the target in your fovea."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Engage Velocity Matching",
      "text": "Because linear momentum is conserved, instantaneously transition upon landing from saccadic arrest to feedforward pursuit."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Momentum Teleport Pursuit drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Momentum Teleport Pursuit drill conditions visual tracking agility by training your eyes to execute rapid corrective saccades when a target instantly teleports, followed immediately by smooth pursuit matching its preserved velocity momentum."
      }
    },
    {
      "@type": "Question",
      "name": "What is the physiological difference between a saccade and smooth pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A saccade is an explosive, high-speed ballistic eye jump (up to 700 deg/s) designed to shift gaze to a new position. Smooth pursuit is a slower, feedback-driven tracking movement (up to 40 deg/s) designed to keep a moving image steady on the fovea (Rashbass, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill benefit competitive FPS gamers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In games like Valorant, Overwatch 2, and Apex Legends, opponents frequently execute sudden dashes, teleports, or grappling maneuvers. Training fast re-acquisition with immediate velocity locking minimizes crosshair drift after target relocation."
      }
    },
    {
      "@type": "Question",
      "name": "How does anticipatory tracking transfer to ball and combat sports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In soccer, tennis, and combat sports, deflections, unexpected bounces, and rapid feints displace targets instantaneously. Developing rapid saccade-to-pursuit handoffs shortens visual recovery time."
      }
    },
    {
      "@type": "Question",
      "name": "What causes momentary visual blur during a teleport jump?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "During rapid saccadic eye movements, the brain initiates saccadic suppression to attenuate retinal blur. Clear vision is restored the moment your gaze lands on the re-acquired target (Findlay & Walker, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "Why is head stability critical during saccadic re-acquisition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moving your head triggers the vestibulo-ocular reflex (VOR), which attempts to counter-rotate your eyes and delays re-foveation. Keep your neck locked so only the extraocular muscles initiate the jump (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between primary and corrective saccades?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A primary saccade is the initial ballistic jump that covers 85% to 90% of the distance to the teleported target. A micro corrective saccade fires 100ms later to lock the fovea precisely onto target center (Findlay & Gilchrist, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "How does input device polling rate affect teleport intercept accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High-polling mice (1,000Hz+) register cursor movements every 1ms, ensuring zero perceptible input delay when retargeting teleported objects (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Is this tool free and ad-free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills provides this drill completely free without paywalls, subscriptions, or invasive ads."
      }
    },
    {
      "@type": "Question",
      "name": "How does consistent ocular motor tracking practice enhance neuroplasticity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Repetitive smooth pursuit and saccadic targeting stimulate cerebellar floccular adaptation and strengthen fronto-striatal pathways, improving dynamic visual acuity and reducing gaze jitter over time (Leigh & Zee, 2015)."
      }
    }
  ]
};

const guide = {
  heading: "Momentum Teleport Pursuit - Ocular Motor Training Standards",
  intro: [
    "In natural dynamic environments, targets do not always move along unbroken, predictable paths. Rapid object deflections, sudden spatial repositioning, and visual occlusions force the human visual system to constantly coordinate two distinct ocular motor subsystems: ballistic saccades to locate the displaced object, and smooth pursuit to match its continuous velocity (Rashbass, 1961; Findlay & Walker, 1999).",
    "Momentum Teleport Pursuit isolates this exact neuromuscular mechanism. The target's spatial coordinates jump abruptly across the screen while its directional velocity vector is conserved. To excel, your oculomotor system must execute an accurate catch-up saccade to re-center the fovea, then instantaneously engage feedforward smooth pursuit to track the target without velocity lag (Bahill et al., 1980; Barnes, 2008).",
    "Hardware latency adds display quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores remain stored strictly in local browser storage."
  ],
  benchmarks: {
    title: "Teleport Re-acquisition & Momentum Tracking Benchmarks",
    headers: ["Performance Tier", "Re-acquisition Latency", "Landing Overshoot", "Velocity Match Gain", "Neurophysiological Profile"],
    rows: [
      ["Elite (Pro Aiming / Esports)", "< 140 ms", "< 3% (pinpoint foveal lock)", "97%+", "Flawless ballistic trajectory. Instantaneous post-saccadic pursuit lock with zero oscillatory searching."],
      ["Advanced (Competitive Rank)", "140 – 180 ms", "3% – 6%", "91% – 96%", "Rapid spatial re-acquisition. Minimal corrective micro-saccade with high velocity fidelity on landing."],
      ["Competent (Healthy Adult)", "181 – 240 ms", "7% – 14%", "80% – 90%", "Solid baseline reflex. Normal sensory refractory pause following saccade before steady pursuit engagement."],
      ["Developing (Elevated Lag)", "241 – 320 ms", "15% – 24%", "68% – 79%", "Noticeable target acquisition latency. Frequent overshoot requiring multiple corrective glissades."],
      ["Novice (Motor Refinement)", "> 320 ms", "> 24%", "< 68%", "Struggles with large angular displacements. Saccadic dysmetria and compensatory head movements present."]
    ],
    note: "※ Reference values derived from oculomotor pursuit studies at 50–70 cm viewing distance across 1.0x–2.0x target velocities during 60-second intervals. Re-acquisition latency measures time elapsed from target teleportation to foveal stabilization."
  },
  techniques: {
    title: "Four Essential Principles for Rapid Target Re-acquisition",
    items: [
      {
        name: "Direct Linear Ballistic Trajectory",
        desc: "Execute your saccade along the shortest straight-line path between the disappearance point and the teleport coordinate. Any curving saccadic arc dramatically delays target re-acquisition (Findlay & Walker, 1999).",
        tips: "Trust peripheral localization cues and throw your gaze decisively toward the new coordinate without intermediate hesitation."
      },
      {
        name: "Velocity Vector Retention (Internal Forward Model)",
        desc: "While target position jumps instantaneously, velocity and trajectory angle remain conserved. Utilize cerebellar internal models to maintain mental speed representation during saccadic suppression (Barnes, 2008).",
        tips: "Do not anticipate a stationary landing; prime your visual pursuit mechanism to match target drift the instant your eyes land."
      },
      {
        name: "Anticipatory Lead on Landing",
        desc: "Because saccades require 20-40 ms flight time, the target traverses forward during transit. Place your gaze slightly ahead of the landing point to avoid falling behind the target immediately upon arrival.",
        tips: "A slight forward offset compensates for ocular transit delay and prevents post-saccadic undershoot."
      },
      {
        name: "Cervical Motion Suppression",
        desc: "Large angular jumps tempt head movement. Moving the head triggers the vestibulo-ocular reflex (VOR), destabilizing foveal re-engagement (Leigh & Zee, 2015).",
        tips: "Keep your chin firmly stationary. Force the six extraocular muscles to execute the entire displacement."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('rashbass1961', 'bahill1980', 'findlay1999', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/drills/visual-tracking/constant-slow-pursuit", label: "Smooth Pursuit Eye Exercise (Constant Slow)" },
    { href: "/drills/visual-tracking/directional-chaos-pursuit", label: "Directional Chaos Pursuit (Erratic Motion)" },
    { href: "/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamic Evasion Pursuit (Reactive Tracking)" },
    { href: "/drills/visual-tracking/ghosting-suppress-pursuit", label: "Ghosting Suppress Pursuit (Fixation Stability)" },
    { href: "/drills/visual-tracking/infinity-pursuit", label: "Figure-8 Eye Tracking Exercise (Infinity)" },
    { href: "/drills/visual-tracking/predictive-pursuit", label: "Predictive Eye Tracking Drill (Predictive)" }
  ]
};

export default function MomentumTeleportPursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MomentumTeleportPursuitClient />

      <DrillGuide guide={guide} />

    </>
  );
}
