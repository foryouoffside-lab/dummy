import InfinityPursuitClient from './InfinityPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Figure-8 Eye Exercise – Infinity Pursuit | SkillDrills",
  description: "Track targets along continuous figure-8 infinity loops. Train bilateral ocular motor coordination and midline crossing. Free, no sign-up.",
  keywords: [
    "infinity pursuit",
    "figure-8 eye tracking exercise",
    "visual tracking drill",
    "eye tracking training",
    "smooth pursuit eye exercise",
    "midline crossing eye training",
    "binocular coordination drill",
    "lemniscate eye exercise",
    "ocular motor control test",
    "esports eye tracking online",
    "gaze stability workout",
    "pursuit gain evaluation"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/infinity-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Figure-8 Eye Exercise – Infinity Pursuit | SkillDrills",
    description: "Track targets along continuous figure-8 infinity loops. Train bilateral ocular motor coordination and midline crossing. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Figure-8 Eye Exercise – Infinity Pursuit | SkillDrills",
    description: "Track targets along continuous figure-8 infinity loops. Train bilateral ocular motor coordination and midline crossing. Free, no sign-up.",
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
      "name": "Infinity Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Infinity Pursuit",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Track targets along continuous figure-8 infinity loops. Train bilateral ocular motor coordination and midline crossing. Free, no sign-up.",
  "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
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
  "name": "Figure-8 Eye Tracking Exercise - Infinity Pursuit",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Infinity Pursuit",
  "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
  "description": "Track targets along continuous figure-8 infinity loops. Train bilateral ocular motor coordination and midline crossing. Free, no sign-up.",
  "genre": [
    "Action",
    "Eye Tracking",
    "Brain Game"
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
  "name": "How to Train Eye Tracking with Infinity Pursuit",
  "description": "Track targets along continuous figure-8 infinity loops. Train bilateral ocular motor coordination and midline crossing. Free, no sign-up.",
  "dateModified": "2026-09-12",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Set Baseline Speed and Duration",
      "text": "Select an initial base speed of 1.0x and configure your session duration to 60 seconds to establish baseline figure-8 ocular motor pacing.",
      "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Maintain Centered Head Posture",
      "text": "Sit upright with your eyes leveled with the screen center, keeping your head completely still to isolate pure extraocular motor tracking.",
      "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Lock Gaze on High-Contrast Target",
      "text": "Click Start Drill and track the target continuously as it traces the Lemniscate figure-8 loops across both visual hemifields.",
      "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Smooth Gaze Velocity Across Intersection",
      "text": "As the target traverses the central cross point, maintain continuous velocity matching without firing premature saccades.",
      "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit#step-4"
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
      "name": "How long should I practice figure-8 eye tracking each day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend 5 to 10 minutes of daily practice (5 to 8 rounds of 60 seconds). Consistent daily sessions develop neuromuscular efficiency without causing ocular strain or fatigue."
      }
    },
    {
      "@type": "Question",
      "name": "What ocular muscles are engaged during figure-8 tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Figure-8 tracking engages all six extraocular muscles—the medial, lateral, superior, and inferior recti, along with the superior and inferior obliques—demanding continuous rotational balance (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "How does display refresh rate improve figure-8 pursuit smoothness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth curvature tracking requires dense spatial-temporal updates. A 144Hz or 240Hz refresh rate delivers sub-7ms frame updates, providing the ocular motor system with a seamless continuous trajectory (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Is my training history private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all tracking duration records and personal bests are saved strictly in your client-side browser storage."
      }
    }
  ]
};

const guide = {
  heading: "Infinity Pursuit - Ocular Motor Training Standards",
  intro: [
    
    
      "Smooth pursuit is not a single muscle action; it requires continuous, proportional firing across all six extraocular muscles to guide the fovea along 2D spatial curves (Robinson, 1965; Leigh & Zee, 2015). While one-dimensional tracking exercises isolated horizontal or vertical muscles, real-world sports and gaming environments require simultaneous multi-axial coordination.",
      "Infinity Pursuit utilizes a Lemniscate of Bernoulli figure-8 trajectory. This continuous curve transitions smoothly between left and right visual hemifields, forcing the brain to modulate pursuit gain across diagonal, vertical, and horizontal vectors while executing seamless directional reversals at the central intersection (Barnes, 2008; Krauzlis, 2004).",
    "Hardware latency adds display quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores remain stored strictly in local browser storage."
  
  ],
  
  benchmarks: {
    title: "Figure-8 Infinity Pursuit Performance Benchmarks",
    headers: ["Performance Tier", "Pursuit Gain (Velocity Ratio)", "Midline Saccade Rate", "Trajectory Precision", "Neurophysiological Profile"],
    rows: [
      ["Tier 1: Apex (Elite Athletes & Esports)", "0.96 – 1.02", "< 2% (Seamless Glide)", "98%+", "Flawless binocular coordination; zero saccadic disruption at midline crossing; cerebellar forward model perfectly synchronized (Barnes, 2008)."],
      ["Tier 2: Superior (Competitive Level)", "0.90 – 0.95", "2% – 5%", "92% – 97%", "Superior smooth pursuit stability; minimal phase lag only at extreme lateral apexes; steady foveal locking (Krauzlis, 2004)."],
      ["Tier 3: Solid Baseline (Healthy Adults)", "0.80 – 0.89", "6% – 12%", "82% – 91%", "Solid everyday functional baseline; occasional catch-up saccades across the central intersection or tight apex turns."],
      ["Tier 4: Developing (Elevated Latency / Fatigue)", "0.68 – 0.79", "13% – 22%", "70% – 81%", "Noticeable pursuit lag; recurrent intrusive saccades; signs of extraocular fatigue or involuntary head movement compensation."],
      ["Tier 5: Novice / Instability", "< 0.68", "> 22%", "< 70%", "Smooth pursuit decouples frequently; visual search replaces continuous gliding; dedicated low-speed binocular practice recommended."]
    ],
    note: "Reference standards based on oculomotor tracking studies at 50–70 cm viewing distance. Pursuit gain represents ocular angular velocity divided by target velocity (ideal = 1.0) according to Barnes (2008) and Leigh & Zee (2015)."
  },
  faqs: [
    {
        "q": "What is the Infinity Pursuit drill?",
        "a": "The Infinity Pursuit drill conditions smooth pursuit eye movements by having your eyes track a target along a continuous figure-8 Lemniscate curve, exercising multi-axial ocular coordination across horizontal and vertical axes."
    },
    {
        "q": "What is a Lemniscate of Bernoulli and why is it used for eye tracking?",
        "a": "A Lemniscate of Bernoulli is a continuous mathematical figure-8 curve. It is used in vision training because it smoothly blends horizontal and vertical vector components with continuous curvature reversals, avoiding abrupt stops."
    },
    {
        "q": "How does figure-8 tracking differ from standard circular pursuit?",
        "a": "Circular pursuit operates with constant curvature and uniform directional bias. Figure-8 tracking introduces an intersection point where the velocity vector reverses rotational direction, challenging both ocular hemispheres and dynamic cerebellar gain modulation (Barnes, 2008)."
    },
    {
        "q": "Why is smooth pursuit crossing the midline challenging for the visual system?",
        "a": "Crossing the visual midline requires seamless interhemispheric transfer between cortical hemispheres and shifts muscle dominance between medial and lateral rectus extraocular pairs without triggering involuntary saccadic jumps."
    },
    {
        "q": "How does figure-8 pursuit benefit competitive gamers and esports players?",
        "a": "In competitive titles like Apex Legends and Overwatch 2, opponents execute complex 3D movement including slide-jumps, airstrafes, and grapple curves. Training along intersecting multi-axial curves conditions smoother reticle placement on non-linear targets."
    },
    {
        "q": "How does this drill transfer to traditional sports performance?",
        "a": "In tennis, soccer, cricket, and basketball, balls travel in complex curved arcs involving Magnus effect bends and dip angles. Smooth pursuit calibration across dual axes ensures continuous visual clarity throughout flight."
    },
    {
        "q": "How long should I practice figure-8 eye tracking each day?",
        "a": "We recommend 5 to 10 minutes of daily practice (5 to 8 rounds of 60 seconds). Consistent daily sessions develop neuromuscular efficiency without causing ocular strain or fatigue."
    },
    {
        "q": "What ocular muscles are engaged during figure-8 tracking?",
        "a": "Figure-8 tracking engages all six extraocular muscles—the medial, lateral, superior, and inferior recti, along with the superior and inferior obliques—demanding continuous rotational balance (Leigh & Zee, 2015)."
    },
    {
        "q": "How does display refresh rate improve figure-8 pursuit smoothness?",
        "a": "Smooth curvature tracking requires dense spatial-temporal updates. A 144Hz or 240Hz refresh rate delivers sub-7ms frame updates, providing the ocular motor system with a seamless continuous trajectory (Woods et al., 2015)."
    },
    {
        "q": "Is my training history private?",
        "a": "Yes, all tracking duration records and personal bests are saved strictly in your client-side browser storage."
    }
],
  sources: pickSources('barnes2008', 'robinson1965', 'rashbass1961', 'krauzlis2004', 'leigh2015', 'woods2015'),
};

export default function InfinityPursuitPage() {
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

      <InfinityPursuitClient copy={{ title: "Infinity Pursuit", subtitle: "Figure-8 Eye Tracking Exercise" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
