import TriangularPursuitClient from './TriangularPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Eye Tracking Accuracy Drill - Triangular Pursuit",
  description: "Track target transitions along a triangular vector path. Train smooth pursuit velocity gain, corner re-acquisition, and gaze stability. Free online drill.",
  keywords: [
    "triangular pursuit",
    "eye tracking accuracy drill",
    "triangular path tracking",
    "geometric smooth pursuit",
    "angular pursuit training",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "corner re-acquisition drill"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Eye Tracking Accuracy Drill - Triangular Pursuit | SkillDrills",
    description: "Track target transitions along a triangular vector path. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Eye Tracking Accuracy Drill - Triangular Pursuit | SkillDrills",
    description: "Track target transitions along a triangular vector path. Free browser-based visual tracking drill.",
  },
};

const guide = {
  heading: "Triangular Pursuit: Geometric Ocular Motor Guidance & Vertex Saccades",
  intro: [
    "Tracking visual stimuli along closed geometric polygons demands continuous coordination between horizontal and vertical extraocular muscle groups. When a target moves along the straight edges of an equilateral triangle, the ocular motor system engages smooth pursuit across non-cardinal diagonal vectors, requiring the brainstem to balance horizontal pontine signals (PPRF) with vertical midbrain commands (riMLF).",
    "The primary neurophysiological challenge occurs at the triangle's acute vertices. As the target reaches a corner and abruptly changes course, retinal slip velocity drops instantaneously while position error escalates. Seminal investigations by de Brouwer et al. (2002) and Heinen et al. (2005) demonstrated that catch-up saccades are triggered by an integrated neural calculation of both position error and instantaneous slip, initiated within frontal eye field (FEF) and supplementary eye field (SEF) decision circuits.",
    "Without adequate ocular motor training, gaze routinely overshoots sharp vertices, resulting in multi-saccade searching corrections and disrupted visual perception. However, repetitive geometric tracking activates cerebellar forward internal models (Bennett & Barnes, 2006; Barnes, 2008), enabling the predictive deceleration of smooth pursuit as the target approaches known vertices and accelerating foveal re-acquisition onto the subsequent vector leg.",
    "The Triangular Pursuit drill trains this geometric agility. By guiding a target continuously along a triangular trajectory, it challenges both constant-velocity diagonal tracking and acute corner re-anchoring. Advanced toggles such as 'Hide Line' remove visual path indicators to test pure sensorimotor tracking, while 'Random Speed' introduces unpredictable acceleration profiles to prevent mechanical timing habits."
  ],
  benchmarks: [
    { level: "Novice", speed: "0.5x - 1.0x", detail: "Maintains gaze along visible path lines; relies on multiple corrective saccades after overshooting triangle vertices." },
    { level: "Intermediate", speed: "1.0x - 2.0x", detail: "Follows diagonal vector legs smoothly; executes a single clean catch-up saccade at each corner reversal." },
    { level: "Advanced", speed: "2.0x - 3.5x", detail: "Operates with 'Hide Line' enabled; anticipates corner direction changes without excessive gaze lag." },
    { level: "Elite / Esports", speed: "3.5x+", detail: "Demonstrates seamless foveal tracking under 'Random Speed' with hidden lines; immediate velocity adaptation across vertices." }
  ],
  steps: [
    "Configure Geometric Tracking Options: Select session duration (30-120 seconds), target color, base speed multiplier, and optional settings such as 'Hide Line' or 'Random Speed'.",
    "Establish Smooth Vector Pursuit: Lock your foveal focus onto the target along the linear legs of the triangle, maintaining steady ocular velocity matched to the target's diagonal vector.",
    "Execute Vertex Catch-Up Saccades: As the target reaches each corner, anticipate the sharp direction shift. Decelerate pursuit smoothly and make a single crisp saccadic adjustment to realign with the new vector.",
    "Progressively Increase Challenge: Once proficient at baseline speed (1.0x), toggle 'Hide Line' to eliminate spatial guidelines and activate 'Random Speed' to train dynamic velocity compensation."
  ],
  audience: "Esports players (refining angular flick corrections and multi-directional tracking in FPS/MOBA games), athletes in court and wall sports (squash, tennis, basketball, soccer), and vision training practitioners conditioning geometric pursuit accuracy.",
  sources: pickSources('debrouwer2002', 'heinen2005', 'orbandexivry2007', 'bennett2006', 'barnes2008'),
  faqs: [
    {
      q: "What is the Triangular Pursuit drill?",
      a: "Triangular Pursuit is an interactive visual training drill that guides a moving target along an equilateral triangular path, conditioning smooth pursuit velocity along diagonal vectors and rapid foveal re-acquisition across acute vertices."
    },
    {
      q: "Why is tracking along a triangle more challenging than circular pursuit?",
      a: "Circular pursuit involves continuous, gradual direction changes with constant curvature. A triangular path combines constant-velocity linear pursuit along its edges with abrupt, discrete direction reversals at its vertices, forcing the visual system to alternate rapidly between smooth pursuit and catch-up saccades (de Brouwer et al., 2002)."
    },
    {
      q: "What triggers catch-up saccades at the triangle vertices?",
      a: "At each vertex, the target's trajectory changes angle sharply. This induces a sudden spike in both retinal position error and velocity slip. The frontal eye fields (FEF) and supplementary eye fields (SEF) trigger a corrective saccade to snap the fovea back onto the target (Heinen et al., 2005)."
    },
    {
      q: "How does the brain coordinate diagonal eye movements?",
      a: "Diagonal pursuit requires simultaneous, proportional firing of horizontal motor circuits in the pons (PPRF) and vertical motor circuits in the midbrain (riMLF). The cerebellum integrates these orthogonal signals into a single unified velocity vector (Orban de Xivry & Lefèvre, 2007)."
    },
    {
      q: "What does the 'Hide Line' setting train?",
      a: "Toggling 'Hide Line' removes the visible outline of the triangle. Without a visual track to follow, your brain must rely strictly on real-time visual velocity feedback and internal geometric memory to navigate the corner reversals."
    },
    {
      q: "What does the 'Random Speed' setting train?",
      a: "Random Speed introduces unpredictable accelerations and segment traversal rates. This eliminates rhythmic timing patterns, conditioning the ocular motor system to adapt dynamically to variable speeds across each leg of the triangle."
    },
    {
      q: "How does triangular pursuit benefit competitive gamers?",
      a: "Competitive gamers frequently track enemies moving diagonally, jumping behind cover, or slicing angles in FPS games like CS2, Valorant, and Apex Legends. Training on sharp triangular vectors enhances crosshair micro-adjustments and angular tracking agility."
    },
    {
      q: "How does triangular pursuit benefit traditional sports athletes?",
      a: "Athletes in sports like squash, racquetball, tennis, and soccer frequently track balls deflecting off walls, turf, or opponents at sharp angles. Triangular pursuit trains faster visual re-anchoring when ball trajectories change abruptly."
    },
    {
      q: "Why do my eyes tend to cut corners rather than tracking the vertex?",
      a: "Cutting corners is a natural predictive shortcut where the brain attempts to anticipate target motion by executing an early saccade. While useful in sports, training true foveation through the vertex builds stronger extraocular control and precision."
    },
    {
      q: "What is the recommended daily training routine for Triangular Pursuit?",
      a: "We recommend 2 to 3 sets of 45 to 60 seconds each, totaling roughly 3 to 5 minutes daily. Because vertex re-acquisition requires intense neuromuscular effort, brief, high-focus sets yield the best tracking improvements without visual fatigue."
    }
  ],
  related: [
    { label: 'Smooth Pursuit Eye Exercise', href: '/drills/visual-tracking/constant-slow-pursuit' },
    { label: 'Erratic Motion Eye Drill', href: '/drills/visual-tracking/directional-chaos-pursuit' },
    { label: 'Reactive Eye Tracking Drill', href: '/drills/visual-tracking/dynamic-evasion-pursuit' },
    { label: 'Divided Attention Eye Test', href: '/drills/visual-tracking/split-screen-tracking' },
    { label: 'Figure-8 Eye Tracking Exercise', href: '/drills/visual-tracking/infinity-pursuit' },
    { label: 'Adaptive Eye Tracking Drill', href: '/drills/visual-tracking/spatial-shift-pursuit' }
  ]
};

export default function TriangularPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Triangular Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Triangular Pursuit Drill",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition smooth pursuit eye movements along triangular vertex vectors.",
    "url": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
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
    "name": "How to Train Eye Tracking Accuracy with Triangular Pursuit",
    "description": "A systematic protocol to condition diagonal smooth pursuit and vertex catch-up saccades along a triangular geometric trajectory.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configure geometric tracking options",
        "text": "Select session duration, baseline velocity multiplier, target dimensions, and toggle challenge settings such as Hide Line or Random Speed."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Establish smooth vector pursuit",
        "text": "Lock foveal focus onto the target along the linear edges of the triangle, coordinating horizontal and vertical ocular muscle groups smoothly."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Execute vertex catch-up saccades",
        "text": "Anticipate corner transitions, decelerating pursuit into the vertex and snapping cleanly onto the subsequent leg with minimal overshoot."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Progressively increase challenge",
        "text": "Enable Hide Line to eliminate visual path guides and increase speed multipliers to condition higher-velocity ocular motor tracking."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <TriangularPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
