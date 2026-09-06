import InfinityPursuitClient from './InfinityPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Figure-8 Eye Tracking Exercise - Infinity Pursuit",
  description: "Condition smooth pursuit eye tracking along a continuous figure-8 Lemniscate loop. Train multi-axial ocular coordination online. Free, no sign-up.",
  keywords: [
    "infinity pursuit",
    "figure-8 eye tracking exercise",
    "infinity loop tracking",
    "lazy eight eye drill",
    "smooth pursuit training",
    "figure 8 visual tracking",
    "lemniscate eye exercise",
    "ocular motor training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Figure-8 Eye Tracking Exercise - Infinity Pursuit | SkillDrills",
    description: "Condition smooth pursuit eye tracking along a continuous figure-8 Lemniscate loop. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Figure-8 Eye Tracking Exercise - Infinity Pursuit | SkillDrills",
    description: "Condition smooth pursuit eye tracking along a continuous figure-8 Lemniscate loop. Free browser-based visual tracking drill.",
  },
};

export default function InfinityPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Infinity Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit" }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Figure-8 Eye Tracking Exercise - Infinity Pursuit",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires modern JavaScript and HTML5 Canvas",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Condition smooth pursuit eye tracking along a continuous figure-8 Lemniscate loop. Train multi-axial ocular coordination online. Free, no sign-up.",
    "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
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
    "name": "How to Train Multi-Axial Smooth Pursuit with Infinity Pursuit",
    "description": "A 4-step protocol for developing continuous multi-axial smooth pursuit and bilateral ocular coordination along a figure-8 Lemniscate path.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Set Baseline Speed and Duration",
        "text": "Select an initial base speed of 1.0x and configure your session duration to 60 seconds to establish baseline figure-8 ocular motor pacing."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Maintain Centered Head Posture",
        "text": "Sit upright with your eyes leveled with the screen center, keeping your head completely still to isolate pure extraocular motor tracking."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Lock Gaze on High-Contrast Target",
        "text": "Click Start Drill and track the target continuously as it traces the Lemniscate figure-8 loops across both visual hemifields."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Smooth Gaze Velocity Across Intersection",
        "text": "As the target traverses the central cross point, maintain continuous velocity matching without firing premature saccades."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Infinity Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Infinity Pursuit drill conditions smooth pursuit eye movements by having your eyes track a target along a continuous figure-8 Lemniscate curve, exercising multi-axial ocular coordination across horizontal and vertical axes."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Lemniscate of Bernoulli and why is it used for eye tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Lemniscate of Bernoulli is a continuous mathematical figure-8 curve. It is used in vision training because it smoothly blends horizontal and vertical vector components with continuous curvature reversals, avoiding abrupt stops."
        }
      },
      {
        "@type": "Question",
        "name": "How does figure-8 tracking differ from standard circular pursuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Circular pursuit operates with constant curvature and uniform directional bias. Figure-8 tracking introduces an intersection point where the velocity vector reverses rotational direction, challenging both ocular hemispheres and dynamic cerebellar gain modulation (Barnes, 2008)."
        }
      },
      {
        "@type": "Question",
        "name": "Why is smooth pursuit crossing the midline challenging for the visual system?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crossing the visual midline requires seamless interhemispheric transfer between cortical hemispheres and shifts muscle dominance between medial and lateral rectus extraocular pairs without triggering involuntary saccadic jumps."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Hide Line' setting train?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Toggling 'Hide Line' removes the static path outline. This forces your oculomotor cortex to rely solely on real-time visual velocity feedback rather than anticipating path boundaries."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Random Speed' setting train?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces continuous sinusoidal speed perturbations along the curve, preventing your brain from settling into a fixed rhythmic cadence and conditioning dynamic pursuit gain modulation."
        }
      },
      {
        "@type": "Question",
        "name": "How does figure-8 pursuit benefit competitive gamers and esports players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In competitive titles like Apex Legends and Overwatch 2, opponents execute complex 3D movement including slide-jumps, airstrafes, and grapple curves. Training along intersecting multi-axial curves conditions smoother reticle placement on non-linear targets."
        }
      },
      {
        "@type": "Question",
        "name": "How does this drill transfer to traditional sports performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In tennis, soccer, cricket, and basketball, balls travel in complex curved arcs involving Magnus effect bends and dip angles. Smooth pursuit calibration across dual axes ensures continuous visual clarity throughout flight."
        }
      },
      {
        "@type": "Question",
        "name": "Why shouldn't I move my head while following the infinity loop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Moving your head engages the vestibulo-ocular reflex (VOR) governed by the inner ear, which circumvents the cortical smooth pursuit pathways and extraocular muscles this drill is designed to train."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I practice figure-8 eye tracking each day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend 5 to 10 minutes of daily practice (5 to 8 rounds of 60 seconds). Consistent daily sessions develop neuromuscular efficiency without causing ocular strain or fatigue."
        }
      }
    ]
  };

  const guide = {
    heading: "Figure-8 eye tracking and multi-axial pursuit control",
    intro: [
      "Smooth pursuit is not a single muscle action; it requires continuous, proportional firing across all six extraocular muscles to guide the fovea along 2D spatial curves (Robinson, 1965; Leigh & Zee, 2015). While one-dimensional tracking exercises isolated horizontal or vertical muscles, real-world sports and gaming environments require simultaneous multi-axial coordination.",
      "Infinity Pursuit utilizes a Lemniscate of Bernoulli figure-8 trajectory. This continuous curve transitions smoothly between left and right visual hemifields, forcing the brain to modulate pursuit gain across diagonal, vertical, and horizontal vectors while executing seamless directional reversals at the central intersection (Barnes, 2008; Krauzlis, 2004)."
    ],
    benchmarks: {
      title: "Figure-8 Pursuit & Multi-Axial Coordination Standards",
      headers: ["Difficulty / Speed", "Loop Cycle Frequency", "Pursuit Velocity Range", "Oculomotor Control State", "Competitive Transfer"],
      rows: [
        ["0.5x – 1.0x", "0.2 – 0.4 Hz", "8° – 18°/s", "Pure Smooth Pursuit with Zero Saccades", "Baseline ocular motor warmup, fine crosshair centering"],
        ["1.5x – 2.5x", "0.5 – 0.9 Hz", "20° – 35°/s", "High-Gain Continuous Pursuit", "Tracking curved projectile trajectories, mid-range dynamic duels"],
        ["3.0x – 5.0x", "1.0 – 1.8 Hz", "40° – 65°/s", "Interleaved Pursuit with Corrective Catch-ups", "Elite close-quarter tracking, rapid multi-angle defensive reads"],
        ["6.0x – 9.0x", "> 2.0 Hz", "> 70°/s", "Reflex-Limit Saccadic Interception", "Stress-testing maximum ocular velocity limits under continuous curves"]
      ],
      note: "Normal human smooth pursuit maintains unity gain (eye velocity matching target velocity) up to approximately 30° to 40°/s (Robinson, 1965). Above this threshold, catch-up saccades naturally interleave to keep the target centered on the fovea."
    },
    mechanisms: [
      "Multi-Planar Muscle Coordination: Tracing a 2D Lemniscate requires continuous dynamic coordination across horizontal (medial/lateral rectus) and vertical/oblique (superior/inferior rectus, superior/inferior oblique) extraocular muscle pairs (Leigh & Zee, 2015).",
      "Midline Reversal and Hemispheric Transfer: As the target crosses the central focal point, gaze shifts across the vertical meridian, requiring rapid interhemispheric transfer between cortical visual areas (Barnes, 2008).",
      "Predictive Velocity Modulation: Continuous curvature variations require the cerebellum to modulate pursuit gain dynamically, accelerating through the loop apex and decelerating into curve reversals (Robinson, 1965; Krauzlis, 2004)."
    ],
    techniques: {
      title: "Techniques for Figure-8 Pursuit Training",
      items: [
        {
          name: "Anchor on Target Core",
          desc: "Fixate tightly on the high-contrast center of the target dot to provide the fovea with a clean position reference.",
          tips: "Keeping sight locked on the core minimizes perceptual blur through high-speed curved arcs."
        },
        {
          name: "Glide Smoothly Through the Intersection",
          desc: "Avoid the urge to predictively snap ahead when the target approaches the center crossing point.",
          tips: "Let your eyes follow the continuous curve rather than jumping diagonally across lobes."
        },
        {
          name: "Isolate Extraocular Muscle Movement",
          desc: "Keep your chin steady and prevent your neck from turning. All tracking must originate from eye rotations.",
          tips: "Resting your chin on your palm can help eliminate subtle head-movement compensation."
        },
        {
          name: "Disable Guide Line for True Autonomy",
          desc: "Once you are comfortable with the figure-8 shape at 1.0x, toggle 'Hide Line' on to remove the trajectory path.",
          tips: "Forces your visual system to track target velocity reactively without structural cues."
        }
      ]
    },
    steps: [
      "Select an initial base speed of 1.0x and configure your session duration to 60 seconds to establish baseline figure-8 ocular motor pacing.",
      "Sit upright with your eyes leveled with the screen center, keeping your head completely still to isolate pure extraocular motor tracking.",
      "Click Start Drill and track the target continuously as it traces the Lemniscate figure-8 loops across both visual hemifields.",
      "As the target traverses the central cross point, maintain continuous velocity matching without firing premature saccades."
    ],
    audience: "FPS esports athletes tracking curved movement paths, ball sport athletes conditioning multi-axial visual tracking, and vision training practitioners developing oculomotor endurance.",
    faqs: faqSchema.mainEntity.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })),
    sources: pickSources('barnes2008', 'robinson1965', 'rashbass1961', 'krauzlis2004', 'leigh2015'),
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

      <InfinityPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
