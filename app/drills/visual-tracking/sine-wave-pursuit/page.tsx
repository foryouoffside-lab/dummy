import SineWavePursuitClient from './SineWavePursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Smooth Pursuit Eye Training - Sine Wave Pursuit",
  description: "Track oscillating targets along sinusoidal wave curves. Condition smooth pursuit velocity gain and rhythmic ocular motor control online. Free, no sign-up.",
  keywords: [
    "smooth pursuit eye training",
    "sine wave pursuit",
    "sine wave pursuit training",
    "sinusoidal eye movement",
    "wave tracking exercise",
    "oscillating target drill",
    "eye tracking training",
    "harmonic pursuit drill",
    "smooth pursuit velocity exercise",
    "gaze stability training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Smooth Pursuit Eye Training - Sine Wave Pursuit | SkillDrills",
    description: "Track oscillating targets along sinusoidal wave curves. Condition smooth pursuit velocity gain and rhythmic ocular motor control online. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Pursuit Eye Training - Sine Wave Pursuit | SkillDrills",
    description: "Track oscillating targets along sinusoidal wave curves. Condition smooth pursuit velocity gain and rhythmic ocular motor control online. Free, no sign-up.",
  },
};

export default function SineWavePursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Sine Wave Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit" }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Smooth Pursuit Eye Training - Sine Wave Pursuit",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires modern JavaScript and HTML5 Canvas",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Track oscillating targets along sinusoidal wave curves. Condition smooth pursuit velocity gain and rhythmic ocular motor control online. Free, no sign-up.",
    "url": "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit",
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
    "name": "How to Train Sinusoidal Smooth Pursuit with Sine Wave Pursuit",
    "description": "A 4-step protocol for developing rhythmic ocular motor tracking along continuous harmonic sinusoidal trajectories.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Set Baseline Speed and Duration",
        "text": "Configure base speed to 1.0x and session duration to 60 seconds with harmonic wave lines visible to calibrate path timing."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Fixate Foveal Center on Oscillating Node",
        "text": "Lock your central gaze smoothly onto the target node as it traverses the horizontal plane along the wave trajectory."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Synchronize Velocity Across Inflection Points",
        "text": "Match eye velocity through the zero-crossing inflection zones where vertical velocity is highest and horizontal velocity reverses."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Toggle Hide Line for Intrinsic Tracking",
        "text": "Activate the 'Hide Line' setting to eliminate visual path guides and force internal sinusoidal trajectory projection."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Sine Wave Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Sine Wave Pursuit drill trains smooth pursuit tracking agility by requiring your eyes to follow a target oscillating along harmonic sine wave trajectories, conditioning velocity gain and gaze stability."
        }
      },
      {
        "@type": "Question",
        "name": "Why are sine wave trajectories used for smooth pursuit training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sinusoidal motion exhibits continuous acceleration and deceleration profiles. Tracking harmonic waves exercises the full dynamic range of eye muscle velocity modulation without sudden discrete step jumps (Stark et al., 1962)."
        }
      },
      {
        "@type": "Question",
        "name": "How does the brain maintain zero-lag tracking on sinusoidal waveforms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Because harmonic sine waves are periodic, the cerebellum constructs an internal predictive model that synchronizes ocular velocity with target velocity, overcoming physiological visual latency (Bahill et al., 1980; Barnes, 2008)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between smooth pursuit and saccadic eye movements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth pursuit is a continuous, voluntary ocular movement designed to keep moving targets stabilized on the fovea, driven by retinal slip velocity. Saccades are ballistic jumps driven by positional error (Rashbass, 1961)."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Hide Line' setting condition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding the guide path removes static visual references, forcing your visual cortex to project future sinusoidal curvature mentally rather than relying on spatial markers."
        }
      },
      {
        "@type": "Question",
        "name": "What happens when 'Random Speed' is enabled?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed disrupts pure harmonic periodicity by introducing non-linear velocity pertubations, challenging the pursuit system to dynamically adapt between predictive and reactive tracking modes."
        }
      },
      {
        "@type": "Question",
        "name": "How does harmonic pursuit training benefit competitive FPS gamers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In competitive shooters, tracking players executing jump arcs, bunny hops, or sinusoidal strafes requires smooth vertical and horizontal ocular coordination without micro-stutter."
        }
      },
      {
        "@type": "Question",
        "name": "How does sinusoidal visual tracking apply to traditional sports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Athletes in baseball, tennis, cricket, and motorsport track balls and competitors following curving trajectories, relying on velocity matching to judge spin and bounce points."
        }
      },
      {
        "@type": "Question",
        "name": "At what speeds do eyes fail to maintain smooth pursuit without catch-up saccades?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Human smooth pursuit typically maintains unity gain up to 30-40 degrees per second. Above this threshold, compensatory catch-up saccades interleave to correct growing positional lag (Robinson, 1965)."
        }
      },
      {
        "@type": "Question",
        "name": "What is an effective daily training protocol for Sine Wave Pursuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perform 4 to 6 sets of 60 seconds (5 to 8 minutes total daily). Start at 1.0x with visible lines, then progress to 2.0x+ or toggle 'Hide Line' to build cognitive tracking resilience."
        }
      }
    ]
  };

  const guide = {
    heading: "Sinusoidal smooth pursuit and rhythmic gaze stabilization",
    intro: [
      "Smooth pursuit eye movements allow the visual system to stabilize continuous, moving objects on the fovea—the central, high-acuity zone of the retina (Robinson, 1965; Rashbass, 1961). Unlike saccades, which are rapid ballistic repositioning movements, smooth pursuit operates as a continuous velocity-tracking servo loop that relies on cerebellar computation.",
      "Sine Wave Pursuit specifically exercises harmonic oculomotor control. Because sinusoidal motion continuously accelerates and decelerates through predictable mathematical curves, it activates the brain's internal predictive motion engine (Stark et al., 1962; Bahill et al., 1980). Conditioning smooth pursuit along periodic waves trains the oculomotor system to maintain unity gain and phase synchronization without relying on corrective catch-up saccades (Barnes, 2008)."
    ],
    benchmarks: {
      title: "Sinusoidal Smooth Pursuit Velocity Standards",
      headers: ["Difficulty / Speed", "Target Angular Velocity", "Tracking Phase / Gain", "Oculomotor Control State", "Competitive Transfer"],
      rows: [
        ["0.5x – 1.0x", "10° – 20° / sec", "Unity Gain (0.95 – 1.0)", "Pure Continuous Smooth Pursuit", "Baseline tracking, smooth crosshair stability, low-speed target lock"],
        ["1.5x – 2.5x", "20° – 35° / sec", "High Gain (0.85 – 0.95)", "Predictive Sinusoidal Phase Lock", "Dynamic strafe tracking, reading bouncing ball trajectories in court sports"],
        ["3.0x – 5.0x", "35° – 60° / sec", "Interleaved Catch-up Saccades", "High-Stress Velocity Compensation", "Fast target interception, aerial tracking in arena shooters and racket sports"],
        ["6.0x – 9.0x", "> 60° / sec", "Saccade-Dominated Tracking", "Stress-Testing Visual Limits", "Extreme velocity tracking conditioning and rapid retinal slip recovery"]
      ],
      note: "Standard physiological smooth pursuit limits begin saturating around 30°–40°/s. Targeted sinusoidal conditioning extends smooth pursuit gain and minimizes corrective saccadic intrusions."
    },
    mechanisms: [
      "Predictive Phase Synchronization: Rhythmic periodic motion activates cerebellar forward models that anticipate target position, eliminating the physiological 130-150 ms reflex latency (Stark et al., 1962; Bahill et al., 1980).",
      "Velocity Slip Servo-Control: Smooth pursuit is driven primarily by retinal image motion (retinal slip velocity) rather than static position error, activating middle temporal (MT/V5) motion areas (Robinson, 1965; Rashbass, 1961).",
      "Internal Waveform Construction: Working memory stores the amplitude and frequency characteristics of recent oscillations, sustaining smooth ocular motor velocity through directional turnaround points (Barnes, 2008)."
    ],
    techniques: {
      title: "Techniques for Sinusoidal Tracking Agility",
      items: [
        {
          name: "Smooth Velocity Acceleration",
          desc: "Allow your ocular muscles to accelerate continuously as the target moves through the wave center, matching velocity smoothly.",
          tips: "Resist the tendency to jump ahead with rapid saccades during acceleration."
        },
        {
          name: "Master the Inflection Turnaround",
          desc: "Pay close attention at the wave peaks and valleys where vertical velocity momentarily drops to zero and reverses direction.",
          tips: "Decelerate smoothly into the turn rather than pausing and snapping."
        },
        {
          name: "Enable Hide Line for Intrinsic Control",
          desc: "Once comfortable with the rhythm at 1.0x, turn 'Hide Line' on to force internal neural path generation.",
          tips: "Tests whether your internal forward model is accurately predicting the harmonic curve."
        },
        {
          name: "Suppress Saccadic Intrusion",
          desc: "Keep eye motion fluid like flowing water; catch-up saccades degrade dynamic visual acuity.",
          tips: "If you notice frequent micro-jumps, reduce speed until pursuit is completely smooth."
        }
      ]
    },
    steps: [
      "Configure base speed to 1.0x and session duration to 60 seconds with harmonic wave lines visible to calibrate path timing.",
      "Lock your central gaze smoothly onto the target node as it traverses the horizontal plane along the wave trajectory.",
      "Match eye velocity through the zero-crossing inflection zones where vertical velocity is highest and horizontal velocity reverses.",
      "Activate the 'Hide Line' setting to eliminate visual path guides and force internal sinusoidal trajectory projection."
    ],
    audience: "Competitive FPS gamers requiring fluid tracking on jumping and strafing targets, athletes in ball sports tracking curving projectile trajectories, and visual motor practitioners building smooth pursuit gain.",
    faqs: faqSchema.mainEntity.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })),
    sources: pickSources('stark1962', 'robinson1965', 'rashbass1961', 'bahill1980', 'barnes2008'),
    related: [
      { label: "Smooth Pursuit Eye Exercise", href: "/drills/visual-tracking/constant-slow-pursuit" },
      { label: "Erratic Motion Eye Drill", href: "/drills/visual-tracking/directional-chaos-pursuit" },
      { label: "Reactive Eye Tracking Drill", href: "/drills/visual-tracking/dynamic-evasion-pursuit" },
      { label: "Eye Fixation Stability Training", href: "/drills/visual-tracking/ghosting-suppress-pursuit" },
      { label: "Figure-8 Eye Tracking Exercise", href: "/drills/visual-tracking/infinity-pursuit" },
      { label: "Anticipatory Eye Tracking Drill", href: "/drills/visual-tracking/momentum-teleport-pursuit" },
      { label: "Peripheral Vision Training Drill", href: "/drills/visual-tracking/peripheral-ping-pursuit" },
      { label: "Predictive Eye Tracking Drill", href: "/drills/visual-tracking/predictive-pursuit" }
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

      <SineWavePursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
