import ConstantSlowPursuitClient from './ConstantSlowPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Smooth Pursuit Eye Exercise – Slow Pursuit | SkillDrills',
  description: "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
  keywords: [
    'constant slow pursuit',
    'smooth pursuit eye exercise',
    'visual tracking drill',
    'eye tracking training',
    'gaze stability practice',
    'ocular motor training',
    'lissajous eye exercise',
    'saccadic suppression training',
    'foveal fixation drill',
    'dynamic visual acuity',
    'low velocity eye tracking',
    'free eye tracking drill'
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/constant-slow-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Smooth Pursuit Eye Exercise – Slow Pursuit | SkillDrills',
    description: "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smooth Pursuit Eye Exercise – Slow Pursuit | SkillDrills',
    description: "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
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
      "name": "Constant Slow Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Constant Slow Pursuit",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
  "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "dateModified": "2026-09-12"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Smooth Pursuit Eye Exercise - Constant Slow Pursuit",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Constant Slow Pursuit",
  "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
  "description": "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
  "genre": [
    "Action",
    "Eye Tracking",
    "Visual Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Eye Tracking with Constant Slow Pursuit",
  "description": "Train smooth pursuit eye movements along a continuous Lissajous curve. Build low-velocity gaze stability in your browser. Free, no sign-up.",
  "dateModified": "2026-09-12",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure Speed and Duration",
      "text": "Select a comfortable base tracking speed (start at 1.0x or lower) and set your session duration to 60 seconds.",
      "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Establish Stable Ergonomic Posture",
      "text": "Position your screen at eye level roughly arm",
      "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Engage Foveal Pursuit Tracking",
      "text": "Click Start Drill and fixate your gaze firmly onto the moving target",
      "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Suppress Corrective Saccades and Progress",
      "text": "Maintain a continuous, gliding gaze across the entire curve. If you perceive target stutter or jump (catch-up saccades), lower the velocity until pursuit remains smooth.",
      "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit#step-4"
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
    },
    {
      "@type": "Question",
      "name": "How does monitor refresh rate affect smooth pursuit tracking accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Higher display refresh rates (144Hz to 240Hz) reduce frame quantization from 16.7ms down to 4.1ms. This delivers a smoother retinal motion vector, preventing artificial motion stutter and allowing extraocular muscles to track the continuous curve with significantly higher fidelity (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Is this smooth pursuit drill completely free, and is my data private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this tool 100% free with no account creation or third-party advertising. All session logs, accuracy metrics, and speed settings remain strictly stored inside your browser's local storage and are never uploaded to remote servers."
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
  heading: "Constant Slow Pursuit - Ocular Motor Training Standards",
  intro: [
    
    
      "Smooth pursuit is the continuous, voluntary rotation of the eyes to keep the image of a moving target focused on the fovea centralis. When an object moves, the oculomotor system must compute retinal slip—the velocity difference between the target image and the retina—and engage cerebellar and cortical circuits (including the frontal eye field and middle temporal area) to generate matching motor commands (Krauzlis, 2004). At low velocities, maintaining smooth pursuit requires high neural gain; if eye velocity drops below target velocity, the eye lags behind, forcing the brain to trigger abrupt corrective catch-up saccades (Robinson, 1965).",
      "Constant Slow Pursuit provides a continuous, cornerless Lissajous trajectory designed specifically to train sustained low-velocity pursuit without relying on straight-line momentum. By eliminating abrupt turns and offering settings like line suppression and unpredictable acceleration, the drill challenges visual-motor integration and conditions steady foveal tracking for fast-paced sports, esports target tracking, and general gaze calibration.",
    "Hardware latency adds display quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores remain stored strictly in local browser storage."
  
  ],
  benchmarks: {
    title: "Smooth Pursuit & Gaze Stability Benchmarks",
    headers: ["Performance Tier", "Speed Multiplier", "Gaze Stability & Saccadic Suppression", "Neuromotor & Ocular Profile"],
    rows: [
      ["Tier 1: Apex Gaze Lock", "2.0x+", "Zero catch-up saccades; fovea centralis locks onto target continuously even through tight turning radii.", "Perfect cerebellar trajectory prediction and velocity matching (Barnes, 2008); elite esports tracking standard."],
      ["Tier 2: Superior Pursuit", "1.4x – 1.9x", "Continuous smooth gliding; minimal gaze disruption across turning points with instantaneous re-acquisition.", "Exceptional extraocular muscle coordination; low retinal slip error; target contours remain sharp."],
      ["Tier 3: Solid Baseline", "1.0x – 1.3x", "Stable tracking at baseline velocity; occasional micro-saccades at Lissajous inflection points.", "Healthy adult baseline; fully sufficient for daily visual tasks and casual gaming."],
      ["Tier 4: Developing Pursuit", "0.7x – 0.9x", "Eye periodically lags behind target; frequent corrective catch-up saccades.", "Suboptimal gain at low velocity; requires dedicated isolated ocular tracking practice."],
      ["Tier 5: Novice / Instability", "< 0.7x", "Frequent gaze loss, intrusive square-wave jerks and involuntary head movement compensation.", "Early developmental stage; difficulty isolating ocular rotation from cervical movement."]
    ],
    note: "Speed multipliers reflect target orbital velocity along the continuous Lissajous trajectory; evaluation is based on ocular smoothness and saccadic catch-up suppression (Robinson, 1965; Barnes, 2008; Woods et al., 2015)."
  },
  faqs: [
    {
        "q": "What is smooth pursuit eye movement?",
        "a": "Smooth pursuit is the voluntary movement of the eyes to keep a moving visual target centered on the fovea (the high-acuity zone of the retina). Unlike saccades—which are rapid, ballistic jumps between points—pursuit is a continuous, gliding motor response driven by neural computations of target velocity and retinal slip."
    },
    {
        "q": "What is a Lissajous curve?",
        "a": "A Lissajous curve is a continuous harmonic path created by combining perpendicular oscillations (such as horizontal cosine and vertical sine functions) with differing frequencies. Because the path is seamless and lacks sharp right angles, it allows uninterrupted smooth pursuit training."
    },
    {
        "q": "How do smooth pursuit eye exercises transfer to sports and gaming?",
        "a": "In sports like baseball, tennis, and cricket, smooth pursuit allows athletes to keep the ball in sharp focus during flight. In competitive esports (such as CS2, Valorant, and Apex Legends), smooth pursuit gaze stability prevents jerky eye movements, allowing players to read strafing opponents and maintain steady crosshair placement."
    },
    {
        "q": "How long should I practice visual tracking daily?",
        "a": "A daily training block of 5 to 10 minutes (typically 5 to 8 rounds of 60 seconds) provides sufficient oculomotor stimulation without inducing excessive ocular muscle fatigue. Consistency across multiple days is more effective than marathon sessions."
    },
    {
        "q": "What should I do if my eyes feel fatigued or water?",
        "a": "Concentrated visual tracking naturally reduces your spontaneous blink rate, which can cause mild dryness or tearing. Blink deliberately between rounds, take a 30-second break, and look at a distant object across the room to relax your ciliary and extraocular muscles."
    },
    {
        "q": "How does smooth pursuit differ from saccadic eye movements?",
        "a": "Saccades are high-velocity, ballistic eye jumps (up to 500°/s) that shift the fovea to a new point of interest, during which visual processing is briefly suppressed (saccadic omission). Smooth pursuit is a slower, continuous tracking movement (typically under 70°/s) designed to maintain clear foveal vision of a moving object (Rashbass, 1961)."
    },
    {
        "q": "Can I train smooth pursuit by moving my head?",
        "a": "No. If you move your head while tracking the target, your visual stabilization is driven by the vestibulo-ocular reflex (VOR) triggered by inner-ear sensors rather than cortical smooth pursuit. To isolate and train smooth pursuit, keep your head stationary and let your extraocular muscles perform the tracking."
    },
    {
        "q": "How does monitor refresh rate affect smooth pursuit tracking accuracy?",
        "a": "Higher display refresh rates (144Hz to 240Hz) reduce frame quantization from 16.7ms down to 4.1ms. This delivers a smoother retinal motion vector, preventing artificial motion stutter and allowing extraocular muscles to track the continuous curve with significantly higher fidelity (Woods et al., 2015)."
    },
    {
        "q": "Is this smooth pursuit drill completely free, and is my data private?",
        "a": "Yes, SkillDrills provides this tool 100% free with no account creation or third-party advertising. All session logs, accuracy metrics, and speed settings remain strictly stored inside your browser's local storage and are never uploaded to remote servers."
    },
    {
        "q": "How does consistent ocular motor tracking practice enhance neuroplasticity?",
        "a": "Repetitive smooth pursuit and saccadic targeting stimulate cerebellar floccular adaptation and strengthen fronto-striatal pathways, improving dynamic visual acuity and reducing gaze jitter over time (Leigh & Zee, 2015)."
    }
],
  sources: pickSources('robinson1965', 'rashbass1961', 'krauzlis2004', 'barnes2008', 'woods2015'),
};

export default function ConstantSlowPursuitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ConstantSlowPursuitClient copy={{ title: "Constant Slow Pursuit", subtitle: "Smooth Pursuit Eye Exercise" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
