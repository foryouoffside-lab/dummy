import ConstantSlowPursuitClient from './ConstantSlowPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Smooth Pursuit Eye Exercise - Constant Slow Pursuit",
  description: "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
  keywords: [
    "constant slow pursuit",
    "smooth pursuit eye exercise",
    "visual tracking drill",
    "slow tracking drill",
    "eye tracking training",
    "gaze stability practice",
    "lissajous curve tracking",
    "ocular motor training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Smooth Pursuit Eye Exercise - Constant Slow Pursuit | SkillDrills",
    description: "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Pursuit Eye Exercise - Constant Slow Pursuit | SkillDrills",
    description: "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
  },
};

export default function ConstantSlowPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Constant Slow Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit" }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Smooth Pursuit Eye Exercise - Constant Slow Pursuit",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires modern JavaScript and HTML5 Canvas",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
    "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
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
    "name": "How to Train Smooth Pursuit Eye Movements with Constant Slow Pursuit",
    "description": "A 4-step protocol for developing continuous foveal gaze stability along low-velocity trajectories.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configure Speed and Duration",
        "text": "Select a comfortable base tracking speed (start at 1.0x or lower) and set your session duration to 60 seconds."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Establish Stable Ergonomic Posture",
        "text": "Position your screen at eye level roughly arm's length away. Keep your head and neck stationary to isolate extraocular muscle movements from head rotation."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Engage Foveal Pursuit Tracking",
        "text": "Click Start Drill and fixate your gaze firmly onto the moving target's core throughout the seamless Lissajous loop."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Suppress Corrective Saccades and Progress",
        "text": "Maintain a continuous, gliding gaze across the entire curve. If you perceive target stutter or jump (catch-up saccades), lower the velocity until pursuit remains smooth."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is smooth pursuit eye movement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth pursuit is the voluntary movement of the eyes to keep a moving visual target centered on the fovea (the high-acuity zone of the retina). Unlike saccades—which are rapid, ballistic jumps between points—pursuit is a continuous, gliding motor response driven by neural computations of target velocity and retinal slip."
        }
      },
      {
        "@type": "Question",
        "name": "Why is slow tracking more difficult than fast tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At higher velocities, strong motion signals automatically recruit ocular drive. At low speeds (below 10–15°/s), neural pursuit gain frequently drops below target velocity. When gain drops, the gaze lags behind the target, forcing the central nervous system to fire abrupt corrective 'catch-up' saccades (Robinson, 1965)."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Hide Line' setting do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Toggling 'Hide Line' removes the visible Lissajous trajectory path. With the line hidden, your visual motor cortex cannot rely on visual geometry to anticipate future positions; it is forced to track purely in real-time based on continuous retinal slip feedback."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Random Speed' feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces smooth, non-linear accelerations and decelerations along the curve. This prevents your oculomotor system from settling into a repetitive, open-loop rhythmic timing pattern, forcing the cerebellum and visual cortex to continuously modulate motor gain (Barnes, 2008)."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Lissajous curve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Lissajous curve is a continuous harmonic path created by combining perpendicular oscillations (such as horizontal cosine and vertical sine functions) with differing frequencies. Because the path is seamless and lacks sharp right angles, it allows uninterrupted smooth pursuit training."
        }
      },
      {
        "@type": "Question",
        "name": "How do smooth pursuit eye exercises transfer to sports and gaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In sports like baseball, tennis, and cricket, smooth pursuit allows athletes to keep the ball in sharp focus during flight. In competitive esports (such as CS2, Valorant, and Apex Legends), smooth pursuit gaze stability prevents jerky eye movements, allowing players to read strafing opponents and maintain steady crosshair placement."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I practice visual tracking daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A daily training block of 5 to 10 minutes (typically 5 to 8 rounds of 60 seconds) provides sufficient oculomotor stimulation without inducing excessive ocular muscle fatigue. Consistency across multiple days is more effective than marathon sessions."
        }
      },
      {
        "@type": "Question",
        "name": "What should I do if my eyes feel fatigued or water?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Concentrated visual tracking naturally reduces your spontaneous blink rate, which can cause mild dryness or tearing. Blink deliberately between rounds, take a 30-second break, and look at a distant object across the room to relax your ciliary and extraocular muscles."
        }
      },
      {
        "@type": "Question",
        "name": "How does smooth pursuit differ from saccadic eye movements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Saccades are high-velocity, ballistic eye jumps (up to 500°/s) that shift the fovea to a new point of interest, during which visual processing is briefly suppressed (saccadic omission). Smooth pursuit is a slower, continuous tracking movement (typically under 70°/s) designed to maintain clear foveal vision of a moving object (Rashbass, 1961)."
        }
      },
      {
        "@type": "Question",
        "name": "Can I train smooth pursuit by moving my head?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. If you move your head while tracking the target, your visual stabilization is driven by the vestibulo-ocular reflex (VOR) triggered by inner-ear sensors rather than cortical smooth pursuit. To isolate and train smooth pursuit, keep your head stationary and let your extraocular muscles perform the tracking."
        }
      }
    ]
  };

  const guide = {
    heading: "Smooth pursuit eye movement at continuous low velocity",
    intro: [
      "Smooth pursuit is the continuous, voluntary rotation of the eyes to keep the image of a moving target focused on the fovea centralis. When an object moves, the oculomotor system must compute retinal slip—the velocity difference between the target image and the retina—and engage cerebellar and cortical circuits (including the frontal eye field and middle temporal area) to generate matching motor commands (Krauzlis, 2004). At low velocities, maintaining smooth pursuit requires high neural gain; if eye velocity drops below target velocity, the eye lags behind, forcing the brain to trigger abrupt corrective catch-up saccades (Robinson, 1965).",
      "Constant Slow Pursuit provides a continuous, cornerless Lissajous trajectory designed specifically to train sustained low-velocity pursuit without relying on straight-line momentum. By eliminating abrupt turns and offering settings like line suppression and unpredictable acceleration, the drill challenges visual-motor integration and conditions steady foveal tracking for fast-paced sports, esports target tracking, and general gaze calibration."
    ],
    benchmarks: {
      title: "Smooth Pursuit Velocity & Tracking Standards",
      headers: ["Target Speed", "Tracking Velocity (°/s)", "Pursuit Quality", "Typical Catch-up Saccade Rate", "Practical Performance Transfer"],
      rows: [
        ["0.5x – 1.0x", "5 – 12°/s", "High Gain Gaze Lock", "< 1 per 10 seconds", "Precision long-range aim, reading slow-moving flight paths"],
        ["1.5x – 2.5x", "15 – 30°/s", "Steady Continuous Pursuit", "1 – 2 per 5 seconds", "Mid-range tracking, racket ball tracking in flight"],
        ["3.0x – 5.0x", "35 – 60°/s", "Rapid Visuomotor Following", "2 – 4 per 5 seconds", "Close-quarters target tracking, dynamic field sports"],
        ["6.0x – 9.0x", "70+°/s", "Velocity Limit / Saccadic Dominance", "Continuous catch-up saccades", "Physiological limit where eyes revert to predictive saccades"]
      ],
      note: "Published oculomotor studies (Robinson, 1965; Rashbass, 1961) observe that human smooth pursuit maintains unit gain (eye velocity matching target velocity) primarily below 30–40°/s; velocities above this threshold naturally trigger corrective saccades."
    },
    mechanisms: [
      "Retinal Slip Minimization: Smooth pursuit is driven by negative feedback responding to retinal slip—the movement of the target across the photoreceptor array. Constant slow movement requires ongoing micro-adjustments in extraocular motor neuron firing to keep retinal slip near zero.",
      "Cortico-Cerebellar Integration: Motion signals processed in the middle temporal (MT) and medial superior temporal (MST) visual areas project to the pontine nuclei, the cerebellar flocculus, and the frontal eye fields (FEF) to execute smooth velocity matching (Krauzlis, 2004).",
      "Suppression of Corrective Saccades: Slower movement speeds test pursuit gain. If pursuit gain is low (< 0.8), the eyes lag and generate involuntary catch-up saccades. Training at 0.5x to 1.5x trains the visual cortex to sustain continuous motor output without saccadic interruption."
    ],
    techniques: {
      title: "Techniques for Low-Velocity Gaze Stability",
      items: [
        {
          name: "Isolate Ocular Muscles",
          desc: "Keep your neck and head stationary with your nose aligned to the center of the display.",
          tips: "If your head turns, you engage the vestibulo-ocular reflex (VOR) instead of exercising cortical smooth pursuit."
        },
        {
          name: "Anchor on the Foveal Core",
          desc: "Lock your focus on the bright white inner core of the target rather than its outer perimeter or trailing glow.",
          tips: "Tight foveal fixation reduces perceptual blur and provides the brain with the cleanest position signal."
        },
        {
          name: "Eliminate Path Guessing (Line Invisible)",
          desc: "Toggle the path guide line to invisible once you are comfortable with the speed.",
          tips: "Removing the visual trail forces your visual cortex to track purely based on real-time retinal motion feedback rather than predicting a static geometric path."
        },
        {
          name: "Modulate with Random Acceleration",
          desc: "Enable random speed acceleration to disrupt motor rhythm and stimulate adaptive cerebellar gain control.",
          tips: "Prevents your motor system from defaulting to open-loop rhythmic timing, training reactive visual pursuit (Barnes, 2008)."
        }
      ]
    },
    steps: [
      "Select a comfortable base speed (start at 1.0x or lower) and set your session duration to 60 seconds.",
      "Position your screen at eye level roughly arm's length away, keeping your head stationary.",
      "Click Start Drill and fixate your gaze firmly onto the moving target's core throughout the Lissajous loop.",
      "Maintain steady glide across the entire path; if you notice your eyes jumping (a catch-up saccade), lower the speed until pursuit remains continuous."
    ],
    audience: "Athletes tracking balls in flight, competitive FPS gamers requiring smooth target tracking at varied distances, and visual-motor practitioners seeking to build gaze stability and eliminate tracking stutter.",
    faqs: faqSchema.mainEntity.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })),
    sources: pickSources('robinson1965', 'rashbass1961', 'krauzlis2004', 'barnes2008'),
    related: [
      { label: "Sine Wave Pursuit Training", href: "/drills/visual-tracking/sine-wave-pursuit" },
      { label: "Figure-8 Eye Tracking Exercise", href: "/drills/visual-tracking/infinity-pursuit" },
      { label: "Erratic Motion Eye Drill", href: "/drills/visual-tracking/directional-chaos-pursuit" },
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

      <ConstantSlowPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
