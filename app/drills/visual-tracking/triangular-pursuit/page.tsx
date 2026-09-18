import TriangularPursuitClient from './TriangularPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Triangular Pursuit Eye Tracking – Vision Drill | SkillDrills",
  description: "Condition acute-angle gaze direction shifts and deceleration-acceleration dynamics along triangular trajectories. Free, no sign-up.",
  keywords: [
    "triangular pursuit",
    "eye tracking accuracy drill",
    "visual tracking drill",
    "acute angle gaze shift test",
    "catch up saccade vertex training",
    "smooth pursuit eye exercise",
    "closed polygon ocular tracking",
    "diagonal smooth pursuit test",
    "gaze stability practice online",
    "ocular motor training athletics",
    "retinal slip velocity correction",
    "reaction speed eye test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/triangular-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Triangular Pursuit Eye Tracking – Vision Drill | SkillDrills",
    description: "Condition acute-angle gaze direction shifts and deceleration-acceleration dynamics along triangular trajectories. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Triangular Pursuit Eye Tracking – Vision Drill | SkillDrills",
    description: "Condition acute-angle gaze direction shifts and deceleration-acceleration dynamics along triangular trajectories. Free, no sign-up.",
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
      "name": "Triangular Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Triangular Pursuit",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Condition acute-angle gaze direction shifts and deceleration-acceleration dynamics along triangular trajectories. Free, no sign-up.",
  "url": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
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
  "name": "Eye Tracking Accuracy Drill - Triangular Pursuit",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Triangular Pursuit",
  "url": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
  "description": "Condition acute-angle gaze direction shifts and deceleration-acceleration dynamics along triangular trajectories. Free, no sign-up.",
  "genre": [
    "Action",
    "Eye Tracking",
    "Aim Trainer"
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
  "name": "How to Train Eye Tracking with Triangular Pursuit",
  "description": "Condition acute-angle gaze direction shifts and deceleration-acceleration dynamics along triangular trajectories. Free, no sign-up.",
  "dateModified": "2026-09-12",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure geometric tracking options",
      "text": "Select session duration, baseline velocity multiplier, target dimensions, and toggle challenge settings such as Hide Line or Random Speed.",
      "url": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Establish smooth vector pursuit",
      "text": "Lock foveal focus onto the target along the linear edges of the triangle, coordinating horizontal and vertical ocular muscle groups smoothly.",
      "url": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute vertex catch-up saccades",
      "text": "Anticipate corner transitions, decelerating pursuit into the vertex and snapping cleanly onto the subsequent leg with minimal overshoot.",
      "url": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Progressively increase challenge",
      "text": "Enable Hide Line to eliminate visual path guides and increase speed multipliers to condition higher-velocity ocular motor tracking.",
      "url": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Triangular Pursuit drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Triangular Pursuit is an interactive visual training drill that guides a moving target along an equilateral triangular path, conditioning smooth pursuit velocity along diagonal vectors and rapid foveal re-acquisition across acute vertices."
      }
    },
    {
      "@type": "Question",
      "name": "Why is tracking along a triangle more challenging than circular pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Circular pursuit involves continuous, gradual direction changes with constant curvature. A triangular path combines constant-velocity linear pursuit along its edges with abrupt, discrete direction reversals at its vertices, forcing the visual system to alternate rapidly between smooth pursuit and catch-up saccades (de Brouwer et al., 2002)."
      }
    },
    {
      "@type": "Question",
      "name": "How does the brain coordinate diagonal eye movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diagonal pursuit requires simultaneous, proportional firing of horizontal motor circuits in the pons (PPRF) and vertical motor circuits in the midbrain (riMLF). The cerebellum integrates these orthogonal signals into a single unified velocity vector (Orban de Xivry & Lefèvre, 2007)."
      }
    },
    {
      "@type": "Question",
      "name": "How does triangular pursuit benefit competitive gamers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Competitive gamers frequently track enemies moving diagonally, jumping behind cover, or slicing angles in FPS games like CS2, Valorant, and Apex Legends. Training on sharp triangular vectors enhances crosshair micro-adjustments and angular tracking agility."
      }
    },
    {
      "@type": "Question",
      "name": "How does triangular pursuit benefit traditional sports athletes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Athletes in sports like squash, racquetball, tennis, and soccer frequently track balls deflecting off walls, turf, or opponents at sharp angles. Triangular pursuit trains faster visual re-anchoring when ball trajectories change abruptly."
      }
    },
    {
      "@type": "Question",
      "name": "Why do my eyes tend to cut corners rather than tracking the vertex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cutting corners is a natural predictive shortcut where the brain attempts to anticipate target motion by executing an early saccade. While useful in sports, training true foveation through the vertex builds stronger extraocular control and precision."
      }
    },
    {
      "@type": "Question",
      "name": "What is the recommended daily training routine for Triangular Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend 2 to 3 sets of 45 to 60 seconds each, totaling roughly 3 to 5 minutes daily. Because vertex re-acquisition requires intense neuromuscular effort, brief, high-focus sets yield the best tracking improvements without visual fatigue."
      }
    },
    {
      "@type": "Question",
      "name": "What causes the visual system to cut corners at acute vertices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When a moving target abruptly reverses direction at a 60° vertex, neural transmission latencies (~150ms) prevent instant trajectory changes, causing the eye to round the corner unless predictive braking is engaged (de Brouwer et al., 2002)."
      }
    },
    {
      "@type": "Question",
      "name": "How does high-refresh gaming hardware improve vertex intercept timing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 144Hz or 240Hz screen reveals vertex deceleration frames earlier, allowing the ocular motor system to initiate braking before overshoot occurs (Woods et al., 2015)."
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
  benchmarks: {
    title: "Triangular Pursuit Performance Standards (Velocity & Vertex Accuracy)",
    headers: ["Skill Tier", "Pursuit Speed Multiplier", "Vertex Landing Error", "Turnaround Saccadic Latency", "Population Percentile"],
    rows: [
      ["Elite / Master of Vector Dynamics", "3.5x - 5.0x+", "< 12 px (tight vertex adhesion)", "< 110 ms (feedforward braking)", "Top 1.5%"],
      ["Master / High Vector Control", "2.5x - 3.5x", "< 22 px (minimal micro-saccades)", "< 140 ms (clean corner handling)", "Top 8%"],
      ["Advanced / Competitive Athlete", "1.8x - 2.5x", "< 38 px (rapid reacquisition)", "< 180 ms (stable direction shifts)", "Top 25%"],
      ["Intermediate / Regular Practitioner", "1.2x - 1.8x", "38 - 70 px (corner cutting / overshoot)", "180 - 240 ms (corrective saccades)", "Middle 45%"],
      ["Novice / Untrained", "0.5x - 1.2x", "> 70 px (vertex trajectory loss)", "> 250 ms (pronounced overshoot)", "Baseline"]
    ],
    note: "Benchmarks based on catch-up saccadic dynamics (de Brouwer et al., 2002) and acute-turnaround trajectory control (Heinen et al., 2005)."
  },

  heading: "Triangular Pursuit - Ocular Motor Training Standards",
  intro: [
    
    
    "Tracking visual stimuli along closed geometric polygons demands continuous coordination between horizontal and vertical extraocular muscle groups. When a target moves along the straight edges of an equilateral triangle, the ocular motor system engages smooth pursuit across non-cardinal diagonal vectors, requiring the brainstem to balance horizontal pontine signals (PPRF) with vertical midbrain commands (riMLF).",
    "The primary neurophysiological challenge occurs at the triangle's acute vertices. As the target reaches a corner and abruptly changes course, retinal slip velocity drops instantaneously while position error escalates. Seminal investigations by de Brouwer et al. (2002) and Heinen et al. (2005) demonstrated that catch-up saccades are triggered by an integrated neural calculation of both position error and instantaneous slip, initiated within frontal eye field (FEF) and supplementary eye field (SEF) decision circuits.",
    "Without adequate ocular motor training, gaze routinely overshoots sharp vertices, resulting in multi-saccade searching corrections and disrupted visual perception. However, repetitive geometric tracking activates cerebellar forward internal models (Bennett & Barnes, 2006; Barnes, 2008), enabling the predictive deceleration of smooth pursuit as the target approaches known vertices and accelerating foveal re-acquisition onto the subsequent vector leg.",
    "The Triangular Pursuit drill trains this geometric agility. By guiding a target continuously along a triangular trajectory, it challenges both constant-velocity diagonal tracking and acute corner re-anchoring. Advanced toggles such as 'Hide Line' remove visual path indicators to test pure sensorimotor tracking, while 'Random Speed' introduces unpredictable acceleration profiles to prevent mechanical timing habits.",
    "Hardware latency adds display quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores remain stored strictly in local browser storage."
  
  ],
  faqs: [
    {
        "q": "What is the Triangular Pursuit drill?",
        "a": "Triangular Pursuit is an interactive visual training drill that guides a moving target along an equilateral triangular path, conditioning smooth pursuit velocity along diagonal vectors and rapid foveal re-acquisition across acute vertices."
    },
    {
        "q": "Why is tracking along a triangle more challenging than circular pursuit?",
        "a": "Circular pursuit involves continuous, gradual direction changes with constant curvature. A triangular path combines constant-velocity linear pursuit along its edges with abrupt, discrete direction reversals at its vertices, forcing the visual system to alternate rapidly between smooth pursuit and catch-up saccades (de Brouwer et al., 2002)."
    },
    {
        "q": "How does the brain coordinate diagonal eye movements?",
        "a": "Diagonal pursuit requires simultaneous, proportional firing of horizontal motor circuits in the pons (PPRF) and vertical motor circuits in the midbrain (riMLF). The cerebellum integrates these orthogonal signals into a single unified velocity vector (Orban de Xivry & Lefèvre, 2007)."
    },
    {
        "q": "How does triangular pursuit benefit competitive gamers?",
        "a": "Competitive gamers frequently track enemies moving diagonally, jumping behind cover, or slicing angles in FPS games like CS2, Valorant, and Apex Legends. Training on sharp triangular vectors enhances crosshair micro-adjustments and angular tracking agility."
    },
    {
        "q": "How does triangular pursuit benefit traditional sports athletes?",
        "a": "Athletes in sports like squash, racquetball, tennis, and soccer frequently track balls deflecting off walls, turf, or opponents at sharp angles. Triangular pursuit trains faster visual re-anchoring when ball trajectories change abruptly."
    },
    {
        "q": "Why do my eyes tend to cut corners rather than tracking the vertex?",
        "a": "Cutting corners is a natural predictive shortcut where the brain attempts to anticipate target motion by executing an early saccade. While useful in sports, training true foveation through the vertex builds stronger extraocular control and precision."
    },
    {
        "q": "What is the recommended daily training routine for Triangular Pursuit?",
        "a": "We recommend 2 to 3 sets of 45 to 60 seconds each, totaling roughly 3 to 5 minutes daily. Because vertex re-acquisition requires intense neuromuscular effort, brief, high-focus sets yield the best tracking improvements without visual fatigue."
    },
    {
        "q": "What causes the visual system to cut corners at acute vertices?",
        "a": "When a moving target abruptly reverses direction at a 60° vertex, neural transmission latencies (~150ms) prevent instant trajectory changes, causing the eye to round the corner unless predictive braking is engaged (de Brouwer et al., 2002)."
    },
    {
        "q": "How does high-refresh gaming hardware improve vertex intercept timing?",
        "a": "A 144Hz or 240Hz screen reveals vertex deceleration frames earlier, allowing the ocular motor system to initiate braking before overshoot occurs (Woods et al., 2015)."
    },
    {
        "q": "How does consistent ocular motor tracking practice enhance neuroplasticity?",
        "a": "Repetitive smooth pursuit and saccadic targeting stimulate cerebellar floccular adaptation and strengthen fronto-striatal pathways, improving dynamic visual acuity and reducing gaze jitter over time (Leigh & Zee, 2015)."
    }
],
  sources: pickSources('debrouwer2002', 'heinen2005', 'orbandexivry2007', 'bennett2006', 'barnes2008', 'woods2015'),
};

export default function TriangularPursuitPage() {
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

      <TriangularPursuitClient copy={{ title: "Triangular Pursuit", subtitle: "Eye Tracking Accuracy Drill" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
