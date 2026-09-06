import SpatialShiftPursuitClient from './SpatialShiftPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Adaptive Eye Tracking Drill - Spatial Shift Pursuit",
  description: "Track targets undergoing sudden spatial direction and velocity shifts. Condition rapid visual re-acquisition and adaptive pursuit. Free, no sign-up.",
  keywords: [
    "adaptive eye tracking drill",
    "spatial shift pursuit",
    "spatial shift exercise",
    "context switching tracking",
    "visual adaptation drill",
    "adaptive eye tracking",
    "sudden velocity shift drill",
    "rapid gaze re-acquisition",
    "reactive pursuit drill",
    "dynamic target tracking exercise"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Adaptive Eye Tracking Drill - Spatial Shift Pursuit | SkillDrills",
    description: "Track targets undergoing sudden spatial direction and velocity shifts. Condition rapid visual re-acquisition and adaptive pursuit. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adaptive Eye Tracking Drill - Spatial Shift Pursuit | SkillDrills",
    description: "Track targets undergoing sudden spatial direction and velocity shifts. Condition rapid visual re-acquisition and adaptive pursuit. Free, no sign-up.",
  },
};

export default function SpatialShiftPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Spatial Shift Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit" }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Adaptive Eye Tracking Drill - Spatial Shift Pursuit",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires modern JavaScript and HTML5 Canvas",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Track targets undergoing sudden spatial direction and velocity shifts. Condition rapid visual re-acquisition and adaptive pursuit. Free, no sign-up.",
    "url": "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit",
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
    "name": "How to Train Adaptive Eye Tracking with Spatial Shift Pursuit",
    "description": "A 4-step protocol for conditioning rapid gaze re-acquisition and smooth pursuit velocity adaptation during sudden directional shifts.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Set Baseline Speed and Duration",
        "text": "Configure base speed to 1.0x and session duration to 60 seconds with trajectory vector guides enabled to calibrate reaction timing."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Acquire Smooth Pursuit on Moving Node",
        "text": "Lock central foveal vision onto the target as it travels across the canvas bounding area."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Execute Rapid Saccadic Catch-up on Vector Shift",
        "text": "When the target abruptly shifts velocity or reflects off borders, fire a rapid corrective saccade to re-center gaze."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Toggle Hide Line for Predictive Autonomy",
        "text": "Activate the 'Hide Line' setting to eliminate velocity vector lines and train intrinsic trajectory recalculation."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Spatial Shift Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Spatial Shift Pursuit drill conditions visual tracking agility by forcing your eyes to adapt to sudden randomized shifts in target velocity and spatial vectors, training fast re-acquisition and pursuit gain matching."
        }
      },
      {
        "@type": "Question",
        "name": "How do sudden spatial shifts challenge the oculomotor system?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When an object unexpectedly alters direction or speed, retinal slip spikes and positional error builds. The brain must terminate the current pursuit command, calculate a new motor vector, and re-stabilize gaze (Robinson, 1965; Krauzlis, 2004)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the neurological role of catch-up saccades in smooth pursuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When a moving target jumps beyond foveal tolerance, smooth pursuit cannot accelerate fast enough to bridge the distance. The superior colliculus triggers a ballistic catch-up saccade to reposition the fovea before pursuit re-engages (Findlay & Walker, 1999; Rashbass, 1961)."
        }
      },
      {
        "@type": "Question",
        "name": "How does the cerebellum adapt to repeated velocity vector disruptions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Repeated exposure to sudden direction shifts stimulates cerebellar Purkinje cell plasticity, optimizing visual-motor gain and reducing re-acquisition latency over successive sessions (Kahlon & Lisberger, 1996)."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding velocity path vectors forces your visual system to track instantaneous direction shifts purely through retinal feedback and dynamic motion processing rather than anticipatory visual cues."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Random Speed' setting condition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces continuous sinusoidal speed pertubations on top of spatial shifts, training high-stress ocular motor adaptability across variable acceleration profiles."
        }
      },
      {
        "@type": "Question",
        "name": "How does adaptive eye tracking improve competitive FPS gameplay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Opponents frequently change strafe direction, crouch, or utilize movement abilities. Adaptive eye tracking minimizes the latency between an opponent's directional change and reticle re-alignment."
        }
      },
      {
        "@type": "Question",
        "name": "How does rapid visual re-acquisition transfer to ball and team sports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Deflected balls in soccer, hockey puck rebounds, and erratic tennis spin require split-second trajectory recalculation to maintain visual track and execute athletic plays."
        }
      },
      {
        "@type": "Question",
        "name": "How does retinal slip trigger corrective ocular adjustments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Retinal slip occurs when the image of a target slides across the retina faster than eye speed. Sensory cells in area MT/V5 detect this motion error, triggering motor commands to accelerate or redirect pursuit."
        }
      },
      {
        "@type": "Question",
        "name": "What is an optimal training volume for Spatial Shift Pursuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend 4 to 6 rounds of 60 seconds (5 to 8 minutes daily). High-intensity directional shifts induce ocular muscle exertion, making short, focused sessions most effective."
        }
      }
    ]
  };

  const guide = {
    heading: "Adaptive eye tracking and rapid spatial re-acquisition",
    intro: [
      "Smooth pursuit tracking is not always steady; dynamic sports and fast-paced gaming environments frequently present targets that suddenly alter direction, deflect, or accelerate without warning (Krauzlis, 2004; Robinson, 1965). When a trajectory abruptly shifts, the visual system undergoes a momentary loss of foveation.",
      "Spatial Shift Pursuit trains adaptive oculomotor coordination—the rapid interplay between smooth pursuit deceleration, ballistic catch-up saccade execution, and immediate velocity re-acquisition (Rashbass, 1961; Findlay & Walker, 1999). Through consistent training against sudden vector shifts, the cerebellum refines its adaptive motor gain, shortening recovery time and preserving high-acuity visual stability (Kahlon & Lisberger, 1996)."
    ],
    benchmarks: {
      title: "Adaptive Re-acquisition & Spatial Shift Standards",
      headers: ["Difficulty / Speed", "Shift Magnitude", "Re-acquisition Latency", "Oculomotor Control State", "Competitive Transfer"],
      rows: [
        ["0.5x – 1.0x", "Low Velocity Steps", "140 – 180 ms", "Smooth Transition with Single Saccade", "Basic rebound tracking, casual gaming target switching"],
        ["1.5x – 2.5x", "Moderate Directional Shifts", "110 – 140 ms", "Rapid Velocity Gain Recalibration", "Competitive strafe duel tracking, fast ball deflection reads"],
        ["3.0x – 5.0x", "Sharp Angular Deflections", "80 – 110 ms", "High-Gain Saccadic-Pursuit Hybrid", "Elite FPS tracking against movement abilities, squash/hockey rebounds"],
        ["6.0x – 9.0x", "Extreme Spatial Transients", "< 80 ms", "Reflexive Stress-Testing", "Peak cognitive visual motor overload conditioning"]
      ],
      note: "Standard visual motor latency to sudden direction changes is 150-180 ms. Adaptive training conditions faster error-detection loops to reduce re-acquisition delays below 120 ms."
    },
    mechanisms: [
      "Retinal Slip Error Detection: Abrupt trajectory shifts cause immediate image displacement across the retina, generating high-frequency slip signals in cortical area MT/MST that drive urgent corrective motor signals (Robinson, 1965; Krauzlis, 2004).",
      "Catch-up Saccade Triggering: When position error exceeds the foveal comfort threshold (~2° to 3°), the superior colliculus fires a ballistic saccade to close the spatial gap instantaneously (Findlay & Walker, 1999; Rashbass, 1961).",
      "Cerebellar Motor Plasticity: Repeated directional shifts train floccular and vermal Purkinje cells to adjust motor gain and coordinate smooth acceleration along the newly established vector (Kahlon & Lisberger, 1996)."
    ],
    techniques: {
      title: "Techniques for Adaptive Spatial Tracking",
      items: [
        {
          name: "Rapid Saccadic Re-centering",
          desc: "When a vector shift occurs, do not attempt to drag smooth pursuit across the screen; fire a swift saccade directly to the new position.",
          tips: "Ballistic saccades close spatial gaps in 20-40 ms, restoring clear foveal vision instantly."
        },
        {
          name: "Instant Velocity Gain Matching",
          desc: "Immediately upon foveal landing, match your eye velocity to the target's new speed vector.",
          tips: "Prevents overshooting or falling behind after the catch-up saccade lands."
        },
        {
          name: "Enable Hide Line for Intrinsic Reading",
          desc: "Once comfortable with 1.0x speed, toggle 'Hide Line' to eliminate the vector guide line.",
          tips: "Forces your visual cortex to calculate target trajectory dynamically without external spatial cues."
        },
        {
          name: "Boundary Reflection Anticipation",
          desc: "Anticipate wall bounces based on the angle of incidence, preparing eye muscles for the predictable reflection vector.",
          tips: "Reduces turnaround latency and eliminates unnecessary catch-up jumps at screen edges."
        }
      ]
    },
    steps: [
      "Configure base speed to 1.0x and session duration to 60 seconds with trajectory vector guides enabled to calibrate reaction timing.",
      "Lock central foveal vision onto the target as it travels across the canvas bounding area.",
      "When the target abruptly shifts velocity or reflects off borders, fire a rapid corrective saccade to re-center gaze.",
      "Activate the 'Hide Line' setting to eliminate velocity vector lines and train intrinsic trajectory recalculation."
    ],
    audience: "Competitive FPS and battle royale players requiring reactive tracking against erratic strafers, racket and court sport athletes handling sudden ball deflections, and visual motor practitioners.",
    faqs: faqSchema.mainEntity.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })),
    sources: pickSources('krauzlis2004', 'findlay1999', 'robinson1965', 'rashbass1961', 'kahlon1996'),
    related: [
      { label: "Smooth Pursuit Eye Exercise", href: "/drills/visual-tracking/constant-slow-pursuit" },
      { label: "Erratic Motion Eye Drill", href: "/drills/visual-tracking/directional-chaos-pursuit" },
      { label: "Reactive Eye Tracking Drill", href: "/drills/visual-tracking/dynamic-evasion-pursuit" },
      { label: "Eye Fixation Stability Training", href: "/drills/visual-tracking/ghosting-suppress-pursuit" },
      { label: "Figure-8 Eye Tracking Exercise", href: "/drills/visual-tracking/infinity-pursuit" },
      { label: "Anticipatory Eye Tracking Drill", href: "/drills/visual-tracking/momentum-teleport-pursuit" },
      { label: "Peripheral Vision Training Drill", href: "/drills/visual-tracking/peripheral-ping-pursuit" },
      { label: "Predictive Eye Tracking Drill", href: "/drills/visual-tracking/predictive-pursuit" },
      { label: "Sine Wave Pursuit Training", href: "/drills/visual-tracking/sine-wave-pursuit" }
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

      <SpatialShiftPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
