import MomentumTeleportPursuitClient from './MomentumTeleportPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Anticipatory Eye Tracking Drill - Momentum Teleport",
  description: "Predict target trajectory after instant teleportation jumps. Condition anticipatory smooth pursuit and rapid saccadic re-acquisition. Free, no sign-up.",
  keywords: [
    "momentum teleport pursuit",
    "anticipatory eye tracking drill",
    "target reacquisition practice",
    "momentum prediction drill",
    "saccade recovery training",
    "teleporting target tracking",
    "visual re-acquisition drill",
    "predictive pursuit training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Anticipatory Eye Tracking Drill - Momentum Teleport | SkillDrills",
    description: "Predict target trajectory after instant teleportation jumps. Condition anticipatory smooth pursuit and rapid saccadic re-acquisition. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anticipatory Eye Tracking Drill - Momentum Teleport | SkillDrills",
    description: "Predict target trajectory after instant teleportation jumps. Condition anticipatory smooth pursuit and rapid saccadic re-acquisition. Free, no sign-up.",
  },
};

export default function MomentumTeleportPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Momentum Teleport Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit" }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Anticipatory Eye Tracking Drill - Momentum Teleport",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires modern JavaScript and HTML5 Canvas",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Predict target trajectory after instant teleportation jumps. Condition anticipatory smooth pursuit and rapid saccadic re-acquisition. Free, no sign-up.",
    "url": "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit",
    "isAccessibleForFree": true,
    "dateModified": "2026-09-05",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Anticipatory Pursuit and Re-Acquisition with Momentum Teleport",
    "description": "A 4-step protocol for developing rapid saccadic re-acquisition and continuous velocity matching across spatial coordinate jumps.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configure Baseline Speed and Teleport Rate",
        "text": "Set base speed to 1.0x and session duration to 60 seconds to establish baseline visual re-acquisition pacing."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Track Moving Target Coordinates",
        "text": "Maintain steady foveal lock on the target as it travels smoothly across the canvas."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Fire Rapid Corrective Saccade Upon Teleport",
        "text": "When the target instantly jumps to a new spatial location, rapidly fire a saccade to locate the new coordinates."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Match Preserved Momentum Vector",
        "text": "Immediately transition from saccadic landing to smooth pursuit by matching the target's preserved velocity momentum."
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
        "name": "What happens to the target's velocity vector during teleportation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The target's spatial position jumps instantly to new random coordinates, but its directional velocity vector (speed and heading angle) is preserved. This forces your brain to separate position re-acquisition from velocity estimation."
        }
      },
      {
        "@type": "Question",
        "name": "What is the physiological difference between a saccade and smooth pursuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A saccade is an explosive, high-speed ballistic eye jump (up to 700°/s) designed to shift gaze to a new position. Smooth pursuit is a slower, feedback-driven tracking movement (up to 40°/s) designed to keep a moving image steady on the fovea (Rashbass, 1961)."
        }
      },
      {
        "@type": "Question",
        "name": "How does the visual system transition from a saccade back to smooth pursuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upon landing from a saccade, cortical visual area MT and the cerebellum immediately compute retinal slip velocity, engaging ocular motor neurons to match the target's speed within 100 milliseconds (Bahill et al., 1980; Krauzlis, 2004)."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Momentum Vector Line' show?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The directional vector line projecting from the target illustrates its instantaneous heading and velocity, helping your visual system calibrate internal trajectory prediction."
        }
      },
      {
        "@type": "Question",
        "name": "Why does hiding the vector line ('Hide Line') increase difficulty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding the vector line removes structural heading cues. Your visual cortex must estimate target speed and direction purely from dynamic retinal displacement after each teleport jump."
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
        "name": "How long should I train anticipatory eye tracking daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend 5 to 8 rounds of 60 seconds (5 to 10 minutes total). This delivers optimal neuromuscular adaptation without triggering ocular motor fatigue."
        }
      }
    ]
  };

  const guide = {
    heading: "Anticipatory eye tracking and velocity re-acquisition",
    intro: [
      "In natural dynamic environments, targets do not always move along unbroken, predictable paths. Rapid object deflections, sudden spatial repositioning, and visual occlusions force the human visual system to constantly coordinate two distinct ocular motor subsystems: ballistic saccades to locate the displaced object, and smooth pursuit to match its continuous velocity (Rashbass, 1961; Findlay & Walker, 1999).",
      "Momentum Teleport Pursuit isolates this exact neuromuscular mechanism. The target's spatial coordinates jump abruptly across the screen while its directional velocity vector is conserved. To excel, your oculomotor system must execute an accurate catch-up saccade to re-center the fovea, then instantaneously engage feedforward smooth pursuit to track the target without velocity lag (Bahill et al., 1980; Barnes, 2008)."
    ],
    benchmarks: {
      title: "Teleport Re-Acquisition & Pursuit Recovery Standards",
      headers: ["Difficulty / Speed", "Teleport Interval", "Saccade Re-Acquisition Latency", "Oculomotor Control State", "Competitive Transfer"],
      rows: [
        ["0.5x – 1.0x", "1.2 – 1.4s", "220 – 260 ms", "Clean Saccadic Jump + Smooth Lock", "Baseline target re-acquisition, radar cross-checking"],
        ["1.5x – 2.5x", "0.8 – 1.0s", "180 – 210 ms", "Express Saccade Re-acquisition", "Fast tactical flick-to-track transitions, dynamic flanker defense"],
        ["3.0x – 5.0x", "0.5 – 0.7s", "150 – 175 ms", "Predictive Velocity Interpolation", "Elite close-range tracking against teleporting/dashing enemies"],
        ["6.0x – 9.0x", "< 0.4s", "< 140 ms", "Reflex-Limit Saccadic Interception", "Stress-testing neurological target acquisition thresholds"]
      ],
      note: "Standard visual reaction time for reactive saccades is approximately 200 ms (Findlay & Walker, 1999). With consistent conditioning and internal forward modeling of target momentum, re-acquisition latency can drop below 170 ms (Barnes, 2008)."
    },
    mechanisms: [
      "Saccadic Re-Acquisition and Suppression: Instant spatial jumps trigger rapid saccadic eye movements. During saccades, visual perception is briefly attenuated (saccadic suppression) to prevent motion smear (Rashbass, 1961; Findlay & Walker, 1999).",
      "Velocity Momentum Preservation: When the target teleports, its velocity vector remains continuous. The brain's MT/MST cortical areas retain velocity memory, enabling immediate pursuit acceleration upon landing without starting from zero (Barnes, 2008).",
      "Dual-Mode Oculomotor Control: The cerebellum and superior colliculus coordinate the handoff between position-correcting saccades and velocity-matching pursuit, minimizing catch-up latency (Bahill et al., 1980; Krauzlis, 2004)."
    ],
    techniques: {
      title: "Techniques for Anticipatory Pursuit Training",
      items: [
        {
          name: "Snap Rapidly to New Target Coordinates",
          desc: "The instant the target jumps, fire a direct, decisive saccade to its new location rather than searching with a slow sweep.",
          tips: "Peripheral detection of the sudden flash coordinates helps trigger faster saccadic latency."
        },
        {
          name: "Match Velocity on Impact",
          desc: "Do not pause your gaze upon landing. Anticipate that the target is already moving and immediately initiate pursuit matching.",
          tips: "Matching velocity immediately prevents secondary corrective catch-up saccades."
        },
        {
          name: "Read Velocity Vector Cues",
          desc: "Observe the direction indicator line to learn how the target rebounds off container boundaries before disabling it.",
          tips: "Helps calibrate mental forward models of trajectory momentum."
        },
        {
          name: "Keep Head Position Stabilized",
          desc: "Maintain a still neck and chin posture to isolate ocular muscle movement from head movement compensation.",
          tips: "Pure ocular movements provide faster repositioning speed than combined eye-head gaze shifts."
        }
      ]
    },
    steps: [
      "Set base speed to 1.0x and session duration to 60 seconds to establish baseline visual re-acquisition pacing.",
      "Maintain steady foveal lock on the target as it travels smoothly across the canvas.",
      "When the target instantly jumps to a new spatial location, rapidly fire a saccade to locate the new coordinates.",
      "Immediately transition from saccadic landing to smooth pursuit by matching the target's preserved velocity momentum."
    ],
    audience: "FPS esports competitors tracking dashing/teleporting agents, ball-sport athletes recovering gaze after deflection, and vision training practitioners conditioning ocular agility.",
    faqs: faqSchema.mainEntity.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })),
    sources: pickSources('rashbass1961', 'bahill1980', 'findlay1999', 'krauzlis2004', 'barnes2008'),
    related: [
      { label: "Smooth Pursuit Eye Exercise", href: "/drills/visual-tracking/constant-slow-pursuit" },
      { label: "Erratic Motion Eye Drill", href: "/drills/visual-tracking/directional-chaos-pursuit" },
      { label: "Reactive Eye Tracking Drill", href: "/drills/visual-tracking/dynamic-evasion-pursuit" },
      { label: "Eye Fixation Stability Training", href: "/drills/visual-tracking/ghosting-suppress-pursuit" }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <MomentumTeleportPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
