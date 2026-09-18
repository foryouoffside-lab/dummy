import StaircaseStepClient from './StaircaseStepClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Staircase Step – Vertical Eye Tracking Drill | SkillDrills",
  description: "Condition vertical smooth pursuit and elevation saccades across multi-step staircase paths online. Midbrain oculomotor agility training, free.",
  keywords: [
    "staircase step pursuit",
    "vertical eye tracking exercise",
    "vertical smooth pursuit drill",
    "elevation saccade training",
    "midbrain rimlf ocular pathway",
    "vertical pursuit velocity gain",
    "staircase ocular trajectory",
    "recoil tracking eye drill",
    "dynamic vertical gaze stability",
    "stepped target tracking test",
    "extraocular muscle elevation",
    "ball sports aerial tracking"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/staircase-step",
    languages: getAlternateLanguages("/drills/visual-tracking/staircase-step"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Staircase Step – Vertical Eye Tracking Drill | SkillDrills",
    description: "Condition vertical smooth pursuit and elevation saccades across multi-step staircase paths online. Midbrain oculomotor agility training, free.",
    url: "https://skilldrills.online/drills/visual-tracking/staircase-step",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Staircase Step – Vertical Eye Tracking Drill | SkillDrills",
    description: "Condition vertical smooth pursuit and elevation saccades across multi-step staircase paths online. Midbrain oculomotor agility training, free.",
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
      "name": "Staircase Step",
      "item": "https://skilldrills.online/drills/visual-tracking/staircase-step"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Staircase Step Vertical Eye Tracking Exercise",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Vertical and stepped oculomotor conditioning tool stimulating midbrain riMLF pathways to optimize elevation saccades and vertical smooth pursuit gain."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Staircase Step Drill",
  "url": "https://skilldrills.online/drills/visual-tracking/staircase-step",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All modern browsers",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Staircase Step",
  "description": "Dynamic visual tracking challenge testing vertical gaze stability and orthogonal step re-targeting precision.",
  "genre": ["Visual Training", "Vertical Eye Tracking", "Reflex Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Web Browser"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Vertical Tracking with Staircase Step",
  "description": "Step-by-step protocol to master vertical smooth pursuit and orthogonal corner transitions without cervical compensation.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Lock Head Alignment",
      "text": "Sit 50-70 cm from the screen. Keep chin and neck completely stationary to isolate vertical extraocular muscles from cervical movement."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Pursue Diagonal Ramps",
      "text": "Smoothly track the target along the inclined staircase ramp, matching acceleration through vertical extraocular burst control."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Anticipate Orthogonal Step Corners",
      "text": "As the target nears the step edge, execute proactive feedforward braking rather than overshooting past the corner."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Execute Snapping Elevation Saccades",
      "text": "Fire an instantaneous, single-beat elevation saccade to re-lock foveal focus onto the new vertical step plane."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Staircase Step drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Staircase Step trains vertical smooth pursuit and elevation saccades by directing visual tracking along stepped, multi-tier orthogonal paths, strengthening midbrain oculomotor pathways (Büttner-Ennever & Horn, 1997)."
      }
    },
    {
      "@type": "Question",
      "name": "Why is vertical eye tracking more challenging than horizontal tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vertical eye movements are controlled by specialized midbrain nuclei (riMLF and Cajal) that exhibit lower natural velocity gain, higher phase lag, and directional asymmetries (upward vs downward) compared to horizontal pathways (Rottach et al., 1996)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the neurological role of the riMLF in vertical gaze?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The rostral interstitial nucleus of the medial longitudinal fasciculus (riMLF) houses burst neurons that generate high-velocity upward and downward vertical saccades, coordinating superior and inferior rectus muscle activation."
      }
    },
    {
      "@type": "Question",
      "name": "How does vertical staircase training benefit FPS players?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In competitive shooters like Apex Legends, Overwatch 2, and Warzone, opponents frequently jump, mantle, and slide across vertical terrain. Training elevation saccades eliminates aim hitching during vertical vertical transitions."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill transfer to ball sports like volleyball and tennis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Overhead spikes in volleyball, lobs in tennis, and rebounds in basketball require rapid vertical gaze shifts. Conditioning vertical pursuit gain improves intercept timing and spatial aerial awareness."
      }
    },
    {
      "@type": "Question",
      "name": "Why must head movement be suppressed during vertical tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unconscious neck tilting substitutes cervical movement for ocular muscle recruitment, depriving the midbrain riMLF circuits of the targeted stimulus needed to expand vertical velocity gain (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the training effect of toggling Hide Line?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Removing the visible staircase scaffolding forces your visual cortex and cerebellum to maintain an internal predictive kinematic representation of step geometry, strengthening feedforward motor control."
      }
    },
    {
      "@type": "Question",
      "name": "How does monitor refresh rate affect staircase tracking precision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High refresh rate displays (144Hz+) render sharp, discrete corner transitions without frame judder, allowing midbrain burst neurons to fire point-perfect corrective saccades (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Is Staircase Step free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this vertical tracking exercise completely free in your web browser with no registration or downloads required."
      }
    },
    {
      "@type": "Question",
      "name": "What is the recommended daily training routine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend 2 to 3 rounds of 45 to 60 seconds (roughly 3 to 5 minutes daily). Vertical ocular muscles fatigue faster than horizontal ones, making short, focused sessions most effective."
      }
    }
  ]
};

const guide = {
  heading: "Staircase Step - Vertical Eye Tracking & Elevation Oculomotor Standards",
  intro: [
    "The human oculomotor system utilizes fundamentally segregated neuroanatomical circuitry for horizontal versus vertical gaze shifts. While horizontal pursuits and saccades are generated via the pontine paramedian reticular formation (PPRF), vertical oculomotor dynamics are governed exclusively by specialized midbrain nuclei—primarily the rostral interstitial nucleus of the medial longitudinal fasciculus (riMLF) and the interstitial nucleus of Cajal (Büttner-Ennever & Horn, 1997).",
    "Psychophysical assessments (Rottach et al., 1996; Ke et al., 2013) demonstrate that vertical smooth pursuit naturally suffers from lower velocity gain, heightened phase lag, and elevated latency compared to horizontal pursuit. Furthermore, a marked directional asymmetry exists: upward tracking (elevation) deteriorates significantly faster under increased velocity than downward tracking, triggering compensatory catch-up saccades earlier in the movement cycle.",
    "Modern digital habits—such as reading horizontal text, smartphone scrolling, and widescreen monitors—disproportionately stimulate horizontal ocular pathways, leaving vertical midbrain circuits chronically under-conditioned. Staircase Step counteracts this deficit by guiding targets across multi-tiered orthogonal ramps and vertical steps, combining diagonal smooth pursuit with precise re-targeting saccades at right-angle corners (Collewijn & Tamminga, 1984; Lisberger, 2010)."
  ],
  benchmarks: {
    title: "Vertical Smooth Pursuit & Stepped Saccade Benchmarks",
    headers: ["Performance Tier", "Target Velocity", "Edge Re-Targeting Precision", "Vertical Pursuit Gain", "Cognitive Population Tier"],
    rows: [
      ["Elite (Pro Esports / Fighter Pilots)", "3.5x – 5.0x+", "Flawless corner lock; zero overshoot at steps", "0.92 – 0.98 (instant synchronization)", "Top 1.5%"],
      ["Advanced (Competitive Rank)", "2.5x – 3.5x", "Immediate foveation via single micro-saccade", "0.85 – 0.92 (highly stable gaze)", "Top 8%"],
      ["Competent (Healthy Adult)", "1.8x – 2.5x", "Consistent ramp tracking; minor corner hesitation", "0.75 – 0.85 (solid control)", "Top 25%"],
      ["Developing (Vertical Lag)", "1.2x – 1.8x", "Noticeable lag on upward steps; involuntary neck tilting", "0.60 – 0.75 (frequent catch-up saccades)", "Middle 45%"],
      ["Novice (Motor Refinement)", "0.5x – 1.2x", "Tracking loss at orthogonal step edges; head follows target", "< 0.60 (erratic saccadic jumping)", "Baseline Tier"]
    ],
    note: "※ Based on vertical pursuit latency metrics (Rottach et al., 1996) and midbrain riMLF burst-neuron dynamics (Büttner-Ennever & Horn, 1997) on 1080p displays at 50–70 cm viewing distance."
  },
  techniques: {
    title: "Four Core Techniques for Vertical Stepped Tracking Mastery",
    items: [
      {
        name: "Head Immobilization & Cervical Disconnection",
        desc: "Strictly eliminate neck tilting when the target ascends or drops. Forcing extraocular muscles to bear the entire elevation load triggers rapid midbrain neuroplastic adaptation.",
        tips: "Anchor your chin lightly against your chest or imagine a supportive neck collar to prevent head tilting."
      },
      {
        name: "Orthogonal Corner Anticipation",
        desc: "As the target approaches the right-angle step edge, apply proactive feedforward braking to avoid inertial foveal overshoots past the step inflection.",
        tips: "Treat step corners like sharp cliff edges where velocity must smoothly decelerate before turning."
      },
      {
        name: "Upward Elevation Acceleration Surge",
        desc: "Because elevation pursuit naturally suffers from lower physiological gain, proactively apply a burst of extraocular motor drive when ascending vertical steps.",
        tips: "Apply an intentional upward muscular pulse to overcome natural elevation phase lag."
      },
      {
        name: "Post-Corner Saccadic Re-Engagement",
        desc: "Do not allow gaze to linger at step corners. Snap your fovea immediately to the start of the next ramp to preserve unity velocity gain without hesitation.",
        tips: "Think of your eyes as bounding cleanly up each step like a mountain climber with sharp footwork."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('buttner1997', 'rottach1996', 'ke2013', 'collewijn1984', 'lisberger2010', 'woods2015'),
  related: [
    { href: "/drills/visual-tracking/constant-slow-pursuit", label: "Smooth Pursuit Eye Exercise (Constant Slow)" },
    { href: "/drills/visual-tracking/directional-chaos-pursuit", label: "Directional Chaos Pursuit (Erratic Motion)" },
    { href: "/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamic Evasion Pursuit (Reactive Tracking)" },
    { href: "/drills/visual-tracking/ghosting-suppress-pursuit", label: "Ghosting Suppress Pursuit (Fixation Stability)" },
    { href: "/drills/visual-tracking/infinity-pursuit", label: "Figure-8 Eye Tracking Exercise (Infinity)" },
    { href: "/drills/visual-tracking/sine-wave-pursuit", label: "Sine Wave Pursuit (Harmonic Motion)" }
  ]
};

export default function StaircaseStepPage() {
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

      <StaircaseStepClient copy={{ title: "Staircase Step", subtitle: "Vertical Eye Tracking Exercise" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
