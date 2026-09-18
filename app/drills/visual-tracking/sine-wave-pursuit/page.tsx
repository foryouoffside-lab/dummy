import SineWavePursuitClient from './SineWavePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Smooth Pursuit Eye Training – Sine Wave | SkillDrills",
  description: "Track oscillating targets along sinusoidal wave curves. Condition smooth pursuit velocity gain and rhythmic ocular motor control online. Free, no sign-up.",
  keywords: [
    "smooth pursuit eye training",
    "sine wave pursuit training",
    "sinusoidal eye movement",
    "wave tracking exercise",
    "oscillating target drill",
    "eye tracking training",
    "harmonic pursuit drill",
    "smooth pursuit velocity exercise",
    "gaze stability training",
    "ocular motor agility practice",
    "zero phase lag tracking",
    "visual tracking speed test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/sine-wave-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Smooth Pursuit Eye Training – Sine Wave | SkillDrills",
    description: "Track oscillating targets along sinusoidal wave curves. Condition smooth pursuit velocity gain and rhythmic ocular motor control online. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Pursuit Eye Training – Sine Wave | SkillDrills",
    description: "Track oscillating targets along sinusoidal wave curves. Condition smooth pursuit velocity gain and rhythmic ocular motor control online. Free, no sign-up.",
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
      "name": "Sine Wave Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Sine Wave Pursuit Eye Training",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Harmonic visual tracking application conditioning smooth pursuit velocity gain and zero-phase cerebellar synchronization along sinusoidal trajectories."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sine Wave Pursuit Drill",
  "url": "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All modern browsers",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Sine Wave Pursuit",
  "description": "Continuous ocular tracking exercise where users foveate moving targets undergoing rhythmic harmonic velocity oscillations.",
  "genre": ["Visual Training", "Smooth Pursuit", "Reflex Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Web Browser"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Harmonic Tracking with Sine Wave Pursuit",
  "description": "Step-by-step protocol to condition cerebellar phase-locking and eliminate sensory phase lag along wave curves.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Phase-Lock Oscillation Frequency",
      "text": "Position yourself 50-70 cm from the screen. Observe the initial wave cycles to internalize oscillation frequency and rhythm."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Foveate Midpoint Acceleration",
      "text": "Accelerate eye velocity through the central axis crossing where tangential target velocity reaches its peak."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Cushion Deceleration at Turning Points",
      "text": "Smoothly decelerate extraocular tension as the target approaches wave crests and troughs to avoid position overshoot."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Suppress Corrective Saccades",
      "text": "Rely entirely on continuous feedforward pursuit velocity matching rather than stuttered catch-up saccadic jumps."
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
        "text": "Sine Wave Pursuit trains harmonic smooth pursuit tracking along horizontal and vertical wave curves, conditioning the brain to eliminate visual phase lag through cerebellar feedforward prediction (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "How does sinusoidal tracking differ from constant velocity pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sinusoidal targets continuously alter velocity and acceleration: peak speed occurs at midpoint crossings, while velocity drops to zero at directional turning points, challenging dynamic neuromuscular calibration (Stark et al., 1962)."
      }
    },
    {
      "@type": "Question",
      "name": "What is zero phase lag tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zero phase lag occurs when the cerebellar internal clock synchronizes with target rhythm, allowing eye movements to match target trajectory in real time without the typical 130-150 ms visual reflex delay."
      }
    },
    {
      "@type": "Question",
      "name": "What causes catch-up saccades during wave tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If smooth pursuit velocity gain drops below 1.0, the eye falls behind the target. The brain then fires a ballistic catch-up saccade to re-center the fovea (Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "How does sinusoidal pursuit benefit competitive FPS aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In games like Apex Legends and Overwatch 2, opponents execute rhythmic strafing and jumping curves. Conditioning harmonic pursuit prevents overshooting at directional apexes."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill transfer to ball sports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In tennis, volleyball, and soccer, balls describe parabolic and oscillating flight paths. Smooth pursuit allows players to maintain clear dynamic visual acuity throughout the trajectory."
      }
    },
    {
      "@type": "Question",
      "name": "Why is head immobility essential during wave pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Involuntary cervical rotations engage the vestibulo-ocular reflex (VOR), which generates counter-rotations and destabilizes smooth pursuit gain (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "How does monitor refresh rate affect harmonic tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High refresh monitors (144Hz+) render smooth continuous curves without frame judder, providing seamless motion input for cortical pursuit centers (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Is this sinusoidal training tool free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this training completely free directly in your web browser with zero registration or installation required."
      }
    },
    {
      "@type": "Question",
      "name": "How frequently should I practice sine wave pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Short sessions of 5 to 10 minutes conducted 3 to 5 times per week enhance velocity gain and eliminate corrective saccades within 3 to 4 weeks (Barnes, 2008)."
      }
    }
  ]
};

const guide = {
  heading: "Sine Wave Pursuit - Ocular Motor Training Standards",
  intro: [
    "The fidelity of the human oculomotor smooth pursuit system is most rigorously tested when tracking harmonic oscillatory trajectories rather than simple linear paths. Along a sinusoidal curve, target velocity and acceleration fluctuate continuously: speed reaches its maximum at the central zero-crossing axis, while decelerating smoothly to zero at the orbital crests and troughs before reversing direction (Stark et al., 1962; Robinson, 1965).",
    "Neurological investigations by David Robinson (1965) and Barnes (2008) established that while unpredictable motion produces a mandatory 130 to 150 ms sensorimotor delay (phase lag), periodic sinusoidal stimulation triggers rapid cerebellar adaptation. By establishing a predictive internal rhythm, feedforward motor commands fire directly to extraocular motor nuclei, achieving zero phase lag synchronization.",
    "When tracking frequency or velocity exceeds physiological limits, pursuit gain collapses. As demonstrated by Rashbass (1961) and Bahill et al. (1980), when eye velocity lags target speed, the visual system resorts to stuttered catch-up saccades. Sine Wave Pursuit conditions the extraocular neuromuscular apparatus to sustain seamless unity gain (1.0) without saccadic disruptions."
  ],
  benchmarks: {
    title: "Sinusoidal Smooth Pursuit & Velocity Gain Benchmarks",
    headers: ["Performance Tier", "Pursuit Velocity Gain", "Phase Lag Latency", "Catch-Up Saccades per Cycle", "Ocular Motor Profile"],
    rows: [
      ["Elite (Esports / Pro Athletes)", "0.96 – 1.02", "< 15 ms (Synchronous)", "0 – 1 (Seamless Flow)", "Flawless cerebellar rhythm synchronization; zero phase lag and pristine foveal lock."],
      ["Advanced (Competitive Rank)", "0.90 – 0.95", "15 – 30 ms", "2 – 3", "High trajectory fidelity; minimal corrective micro-saccades at directional turning points."],
      ["Competent (Healthy Adult)", "0.82 – 0.89", "31 – 50 ms", "4 – 5", "Solid harmonic tracking; noticeable phase lag and minor drifting at higher frequencies."],
      ["Developing (Elevated Lag)", "0.70 – 0.81", "51 – 80 ms", "6 – 8", "Instability at crests and troughs; frequent catch-up saccades to recover lagging gaze."],
      ["Novice (Motor Refinement)", "< 0.70", "> 80 ms", "> 9", "Inability to predict harmonic rhythm; purely reactive tracking with constant saccadic stutter."]
    ],
    note: "※ Measured on 1080p displays at 50–70 cm viewing distance across 1.0x–1.5x velocities. Evaluated based on velocity gain ratio and absence of disruptive corrective saccades."
  },
  techniques: {
    title: "Four Core Techniques for Harmonic Sinusoidal Tracking",
    items: [
      {
        name: "Harmonic Phase-Locking",
        desc: "Use the opening oscillations to mentally calibrate target frequency. Engage internal cerebellar clocks to drive eye acceleration in sync with target rhythm (Robinson, 1965).",
        tips: "Count an internal steady cadence ('one-two, one-two') to eliminate passive sensory reaction lag."
      },
      {
        name: "Apex Deceleration Cushioning",
        desc: "As the target approaches crests or troughs, progressively relax ocular motor force. Prevent momentum from overshooting the spatial reversal point.",
        tips: "Visualize the weightless apogee of a swinging pendulum smoothly pivoting at its highest arc."
      },
      {
        name: "Zero-Crossing Acceleration Surge",
        desc: "Tangential speed reaches maximum velocity when crossing the central baseline. Proactively boost ocular drive through this sector to avoid falling behind.",
        tips: "Apply an intentional acceleration pulse at the midline to maintain continuous foveal lock."
      },
      {
        name: "Disciplined Saccade Suppression",
        desc: "Resist the urge to trigger twitchy catch-up saccades when minor positional errors occur. Compensate by adjusting smooth pursuit speed smoothly (Bahill et al., 1980).",
        tips: "Maintain ocular muscles relaxed and elastic, letting the gaze flow like liquid across wave crests."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('stark1962', 'robinson1965', 'rashbass1961', 'bahill1980', 'barnes2008', 'woods2015'),
  related: [
    { href: "/drills/visual-tracking/constant-slow-pursuit", label: "Smooth Pursuit Eye Exercise (Constant Slow)" },
    { href: "/drills/visual-tracking/directional-chaos-pursuit", label: "Directional Chaos Pursuit (Erratic Motion)" },
    { href: "/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamic Evasion Pursuit (Reactive Tracking)" },
    { href: "/drills/visual-tracking/ghosting-suppress-pursuit", label: "Ghosting Suppress Pursuit (Fixation Stability)" },
    { href: "/drills/visual-tracking/infinity-pursuit", label: "Figure-8 Eye Tracking Exercise (Infinity)" },
    { href: "/drills/visual-tracking/momentum-teleport-pursuit", label: "Teleport Gaze Tracking Drill (Momentum)" }
  ]
};

export default function SineWavePursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SineWavePursuitClient copy={{ title: "Sine Wave Pursuit", subtitle: "Smooth Pursuit Eye Training" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
