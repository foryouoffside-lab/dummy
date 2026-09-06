import PredictivePursuitClient from './PredictivePursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Predictive Eye Tracking Drill - Free Online Test",
  description: "Anticipate moving targets and interpolate smooth trajectory paths. Condition predictive gaze shifts and motion extrapolation online. Free, no sign-up.",
  keywords: [
    "predictive eye tracking drill",
    "predictive pursuit",
    "predictive smooth pursuit",
    "trajectory anticipation drill",
    "occlusion prediction training",
    "anticipatory eye tracking",
    "predictive gaze shifts",
    "motion prediction eye exercise",
    "visual anticipation training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Predictive Eye Tracking Drill - Free Online Test | SkillDrills",
    description: "Anticipate moving targets and interpolate smooth trajectory paths. Condition predictive gaze shifts and motion extrapolation online. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Predictive Eye Tracking Drill - Free Online Test | SkillDrills",
    description: "Anticipate moving targets and interpolate smooth trajectory paths. Condition predictive gaze shifts and motion extrapolation online. Free, no sign-up.",
  },
};

export default function PredictivePursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Predictive Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/predictive-pursuit" }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Predictive Eye Tracking Drill - Free Online Test",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires modern JavaScript and HTML5 Canvas",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Anticipate moving targets and interpolate smooth trajectory paths. Condition predictive gaze shifts and motion extrapolation online. Free, no sign-up.",
    "url": "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
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
    "name": "How to Train Anticipatory Ocular Motor Tracking with Predictive Pursuit",
    "description": "A 4-step protocol for training trajectory anticipation, smooth predictive acceleration, and motion extrapolation without guide lines.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Set Baseline Speed and Duration",
        "text": "Configure base speed to 1.0x and session duration to 60 seconds with trajectory lines visible to calibrate path timing."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Lock Smooth Pursuit onto Origin Node",
        "text": "Fixate smoothly on the target node at its trajectory launch coordinate as it initiates movement along the motion vector."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Anticipate Vector Path and Landing Zone",
        "text": "Project the target's forward velocity vector across the screen to predict its exact destination coordinates ahead of arrival."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Toggle Hide Line for Mental Extrapolation",
        "text": "Activate the 'Hide Line' setting to eliminate visual path guides and force internal cognitive trajectory calculation."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Predictive Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Predictive Pursuit drill exercises trajectory interpolation by requiring your eyes to predict upcoming target landing coordinates along smooth motion vectors, conditioning predictive pursuit and reducing tracking lag."
        }
      },
      {
        "@type": "Question",
        "name": "How does predictive smooth pursuit differ from reactive visual tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reactive tracking relies on visual sensory feedback with a physiological delay of 130 to 150 ms. Predictive pursuit utilizes internal cognitive models stored in working memory to guide eye movements synchronously with or ahead of target motion (Barnes, 2008)."
        }
      },
      {
        "@type": "Question",
        "name": "What role does visual working memory play in trajectory extrapolation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visual working memory stores the recent velocity and spatial directional vectors of moving objects, enabling the frontal eye fields to extrapolate trajectories even during temporary target occlusion (Bennett & Barnes, 2003)."
        }
      },
      {
        "@type": "Question",
        "name": "Why should I train with the 'Hide Line' setting enabled?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding the predicted trajectory vector removes external path guidance, forcing the visual cortex to internally construct the velocity vector and project landing coordinates autonomously."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Random Speed' setting condition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces continuous sinusoidal speed modulation, training the ocular motor system to dynamically adjust internal velocity gain rather than locking into a rigid temporal cadence."
        }
      },
      {
        "@type": "Question",
        "name": "How does anticipatory eye tracking benefit competitive esports athletes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In competitive tactical shooters and battle royales, crosshairs must be pre-aimed where opponents are projected to emerge. Superior predictive pursuit minimizes reaction latency when engaging moving opponents."
        }
      },
      {
        "@type": "Question",
        "name": "How does predictive visual tracking transfer to dynamic field sports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Athletes in baseball, tennis, and soccer must extrapolate the parabolic flight paths of balls long before arrival, positioning limbs and equipment ahead of time based on early trajectory cues."
        }
      },
      {
        "@type": "Question",
        "name": "Can human eyes track motion faster than the visual feedback reflex latency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Because retinal feedback requires ~150 ms to reach motor output, zero-lag smooth tracking of predictable targets is driven entirely by internal anticipatory velocity models (Kowler, 1989; Robinson, 1965)."
        }
      },
      {
        "@type": "Question",
        "name": "What visual cues help interpolate trajectory vectors most accurately?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Early retinal slip velocity, background spatial grid lines, and target acceleration profiles provide initial kinematic signals that the cerebellum and frontal pursuit areas use to calculate destination coordinates."
        }
      },
      {
        "@type": "Question",
        "name": "What is an optimal training volume for predictive tracking conditioning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend 5 to 8 rounds of 60 seconds (5 to 10 minutes daily). Consistent micro-dosing strengthens cerebellar predictive circuits without inducing visual strain."
        }
      }
    ]
  };

  const guide = {
    heading: "Predictive eye tracking and trajectory anticipation",
    intro: [
      "Natural visual environments demand rapid anticipatory tracking; retinal slip sensory feedback requires 130 to 150 milliseconds to traverse the visual pathway and elicit ocular motor corrections (Robinson, 1965; Krauzlis, 2004). If human eye tracking operated purely reactively, gaze would consistently lag behind high-speed objects.",
      "Predictive Pursuit conditions your brain's internal predictive velocity engine—the neural mechanism that extrapolates target motion vectors and drives smooth pursuit synchronously with target movement (Barnes, 2008; Bennett & Barnes, 2003). By utilizing predictive cognitive expectations, the oculomotor system overcomes physiological feedback latencies to maintain flawless foveal centering on projected trajectories (Kowler, 1989)."
    ],
    benchmarks: {
      title: "Trajectory Anticipation & Predictive Pursuit Standards",
      headers: ["Difficulty / Speed", "Cycle Travel Time", "Tracking Latency", "Oculomotor Control State", "Competitive Transfer"],
      rows: [
        ["0.5x – 1.0x", "1.8 – 2.4 s", "0 – 30 ms lag", "Steady Anticipatory Smooth Pursuit", "Baseline projectile tracking, predictable path interception"],
        ["1.5x – 2.5x", "1.2 – 1.6 s", "20 – 50 ms lag", "Dynamic Velocity Gain Matching", "Fast crosshair pre-placement, reading sports passing lanes"],
        ["3.0x – 5.0x", "0.7 – 1.0 s", "50 – 80 ms lag", "Predictive Saccadic Catch-up Hybrid", "Elite competitive tracking against high-speed strafing opponents"],
        ["6.0x – 9.0x", "< 0.5 s", "Variable Extrapolation", "Stress-Testing Mental Motion Interpolation", "Maximum stress-load trajectory extrapolation without visual cues"]
      ],
      note: "Normal human visual reaction time is ~150-200 ms. Athletes with trained predictive pursuit reduce functional tracking lag to near zero through internal kinematic modeling."
    },
    mechanisms: [
      "Internal Forward Modeling: The cerebellum and frontal pursuit area construct an internal kinematic model of target motion, projecting velocity into working memory to drive ocular motor command signals ahead of sensory arrival (Barnes, 2008).",
      "Occlusion Trajectory Extrapolation: When trajectory vectors or targets disappear, visual working memory sustains smooth pursuit velocity for several hundred milliseconds, mentally continuing the motion path (Bennett & Barnes, 2003).",
      "Cognitive Expectation Drive: Cognitive priors and probability assessments modulate pursuit gain and direction before physical motion begins, bypassing reflex delays (Kowler, 1989; Robinson, 1965)."
    ],
    techniques: {
      title: "Techniques for Predictive Pursuit Mastery",
      items: [
        {
          name: "Lead the Motion Vector",
          desc: "Do not fixate on the rear trail of the target; project your gaze slightly ahead of the target center along its travel line.",
          tips: "Anticipating the forward path prevents visual lag and eliminates late saccades."
        },
        {
          name: "Calibrate Spatial Landing Points",
          desc: "Observe the destination endpoint marker early in the cycle to establish the spatial coordinate target.",
          tips: "Anchor mental landing coordinates in your visual field while tracking along the vector."
        },
        {
          name: "Enable Hide Line for Mental Extrapolation",
          desc: "Once comfortable at 1.0x, turn 'Hide Line' on to force internal neural path generation without visual assistance.",
          tips: "Strengthens cerebellar velocity models and mental motion interpolation."
        },
        {
          name: "Smooth Acceleration Gain",
          desc: "Avoid jerky, discrete eye jumps; match your ocular velocity continuously to the target speed.",
          tips: "Smooth pursuit preserves high visual resolution across the entire transit."
        }
      ]
    },
    steps: [
      "Configure base speed to 1.0x and session duration to 60 seconds with trajectory lines visible to calibrate path timing.",
      "Fixate smoothly on the target node at its trajectory launch coordinate as it initiates movement along the motion vector.",
      "Project the target's forward velocity vector across the screen to predict its exact destination coordinates ahead of arrival.",
      "Activate the 'Hide Line' setting to eliminate visual path guides and force internal cognitive trajectory calculation."
    ],
    audience: "Competitive esports players requiring precise pre-aiming and target interception, field athletes tracking ball trajectories, and visual motor practitioners building anticipatory gaze control.",
    faqs: faqSchema.mainEntity.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })),
    sources: pickSources('barnes2008', 'bennett2003', 'kowler1989', 'krauzlis2004', 'robinson1965'),
    related: [
      { label: "Smooth Pursuit Eye Exercise", href: "/drills/visual-tracking/constant-slow-pursuit" },
      { label: "Erratic Motion Eye Drill", href: "/drills/visual-tracking/directional-chaos-pursuit" },
      { label: "Reactive Eye Tracking Drill", href: "/drills/visual-tracking/dynamic-evasion-pursuit" },
      { label: "Eye Fixation Stability Training", href: "/drills/visual-tracking/ghosting-suppress-pursuit" },
      { label: "Figure-8 Eye Tracking Exercise", href: "/drills/visual-tracking/infinity-pursuit" },
      { label: "Anticipatory Eye Tracking Drill", href: "/drills/visual-tracking/momentum-teleport-pursuit" },
      { label: "Peripheral Vision Training Drill", href: "/drills/visual-tracking/peripheral-ping-pursuit" }
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

      <PredictivePursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
