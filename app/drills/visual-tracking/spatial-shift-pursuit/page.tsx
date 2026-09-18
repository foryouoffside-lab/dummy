import SpatialShiftPursuitClient from './SpatialShiftPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Spatial Shift Pursuit – Adaptive Eye Tracking | SkillDrills",
  description: "Condition adaptive ocular motor control across dynamically shifting and rotating spatial reference frames online. Free browser test, no sign-up.",
  keywords: [
    "spatial shift pursuit",
    "adaptive eye tracking drill",
    "reference frame transformation",
    "spatial coordinate remapping",
    "ocular motor re-acquisition",
    "ballistic catch-up saccade",
    "post-saccadic pursuit handshake",
    "dynamic gaze stabilization",
    "posterior parietal cortex training",
    "screen shake aim tracking",
    "smooth pursuit recovery test",
    "visual tracking agility practice"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/spatial-shift-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Spatial Shift Pursuit – Adaptive Eye Tracking | SkillDrills",
    description: "Condition adaptive ocular motor control across dynamically shifting and rotating spatial reference frames online. Free browser test, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Spatial Shift Pursuit – Adaptive Eye Tracking | SkillDrills",
    description: "Condition adaptive ocular motor control across dynamically shifting and rotating spatial reference frames online. Free browser test, no sign-up.",
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
      "name": "Spatial Shift Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Spatial Shift Pursuit Adaptive Eye Tracking",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Interactive visual training drill conditioning posterior parietal cortex coordinate remapping and rapid ocular motor re-acquisition across reference frame shifts."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Spatial Shift Pursuit Drill",
  "url": "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All modern browsers",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Spatial Shift Pursuit",
  "description": "Dynamic visual tracking challenge testing gaze stability and re-centering speed against sudden spatial shifts and coordinate rotations.",
  "genre": ["Visual Training", "Eye Tracking", "Reflex Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Web Browser"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Adaptive Tracking with Spatial Shift Pursuit",
  "description": "Step-by-step protocol to master coordinate transformations and instant foveal re-acquisition during sudden spatial reference shifts.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Establish Baseline Foveation",
      "text": "Position yourself 50-70 cm from the screen. Lock smooth pursuit gaze onto the moving target along its initial heading."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Detect Global Reference Shift",
      "text": "When the coordinate system suddenly rotates or shifts, register the global spatial displacement vector rather than searching blindly."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute Ballistic Catch-Up Saccade",
      "text": "Fire an instantaneous, single-step saccadic leap toward the target's remapped coordinates without secondary hitching."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Engage Post-Saccadic Pursuit Handshake",
      "text": "Immediately blend saccadic landing into continuous smooth pursuit along the new trajectory vector to preserve unity gain."
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
    },
    {
      "@type": "Question",
      "name": "What brain regions remap spatial coordinates during reference frame shifts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The posterior parietal cortex (PPC) coordinates with the frontal eye fields to perform reference frame transformations from retinotopic to craniotopic and allocentric coordinates (Findlay & Gilchrist, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "Is Spatial Shift Pursuit suitable for daily warm-ups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 3 to 5 minutes daily provides high-intensity ocular adaptation without cognitive fatigue, improving dynamic visual adaptability in fast-paced games."
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
  heading: "Spatial Shift Pursuit - Ocular Motor Training Standards",
  intro: [
    "Smooth pursuit tracking in real-world scenarios rarely takes place across static, predictable backgrounds. Whether navigating high-speed automotive turns, sprint accelerations, or fast-paced tactical FPS shootouts characterized by aggressive screen shake and camera flicks, the observer's visual reference frame can displace or rotate instantaneously (Krauzlis, 2004; Robinson, 1965). Holding a high-priority target locked within the central fovea under these disruptive conditions demands adaptive oculomotor agility: Spatial Shift Pursuit.",
    "Seminal investigations by Findlay & Gilchrist (1999) and Kahlon & Lisberger (1996) demonstrated that visual motion inputs are initially registered in eye-centered (retinotopic) coordinate systems. When the entire visual environment undergoes a sudden frame shift, retinotopic coordinates break down. The posterior parietal cortex (PPC) intervenes by integrating retinal signals with efference copy motor commands to execute rapid coordinate transformations into head-centered (craniotopic) and space-fixed (allocentric) reference maps.",
    "Driven by this remapped spatial representation, the central nervous system deploys a synchronized two-stage response: first, a high-velocity ballistic catch-up saccade (peaking up to 500°/s) closes the spatial gap to the remapped target position. Instantaneously upon saccadic landing, the oculomotor apparatus must execute a seamless pursuit handshake—matching the target's current velocity vector without hesitation (Rashbass, 1961). Spatial Shift Pursuit systematically trains this critical neuromuscular circuit to ensure uninterrupted target tracking."
  ],
  benchmarks: {
    title: "Spatial Shift Re-Centering & Coordinate Recovery Benchmarks",
    headers: ["Performance Tier", "Re-Centering Latency (ms)", "Spatial Tracking Accuracy (%)", "Post-Saccadic Stability", "Adaptive Ocular Profile"],
    rows: [
      ["Elite (Pro Esports / Fighter Pilots)", "< 220 ms", "> 95%", "> 96% (Instant Lock-on)", "Flawless parietal coordinate remapping; instantaneous transition from saccade to unity pursuit."],
      ["Advanced (Competitive Rank)", "220 – 280 ms", "88% – 94%", "90% – 95%", "High spatial flexibility; rapid gaze re-acquisition with minimal target drift."],
      ["Competent (Healthy Adult)", "281 – 360 ms", "78% – 87%", "80% – 89%", "Consistent target recovery; minor hesitation during simultaneous spatial rotations."],
      ["Developing (Elevated Latency)", "361 – 450 ms", "65% – 77%", "68% – 79%", "Noticeable disorientation during sudden shifts; requires multiple corrective saccades."],
      ["Novice (Motor Refinement)", "> 450 ms", "< 65%", "< 68%", "Loss of reference frame lock; severe target loss and reactive ocular searching."]
    ],
    note: "※ Measured on 1080p displays at 50–70 cm viewing distance across 1.0x–1.5x velocities with randomized frame shifts. Evaluated based on re-centering latency and post-saccadic pursuit lock."
  },
  techniques: {
    title: "Four Core Strategies for Adaptive Spatial Shift Tracking",
    items: [
      {
        name: "Parietal Coordinate Remapping",
        desc: "During abrupt frame jumps, resist focusing solely on the solitary dot. Register the global shift vector of the entire canvas so your parietal cortex updates internal coordinate maps instantaneously.",
        tips: "Sense where the entire frame displaced rather than visually searching for the target dot."
      },
      {
        name: "Decisive Ballistic Re-Centering",
        desc: "Upon registering the new target position, execute an assertive single-step saccadic leap. Hesitation produces multi-step corrective flutter that delays visual lock.",
        tips: "Snap your central gaze directly to the new coordinates like a whip."
      },
      {
        name: "Post-Saccadic Pursuit Handshake",
        desc: "Do not freeze ocular drive upon landing. Seamlessly blend saccadic deceleration into immediate smooth pursuit along the target's current heading.",
        tips: "Land into the target's velocity path like a downhill skier carving smoothly into a turn."
      },
      {
        name: "Rotational Anchor Shield",
        desc: "When coordinate shifts incorporate angular rotations, prevent vestibular disorientation by anchoring your mental horizon to the display center point.",
        tips: "Anchor your mental reference frame to the display center as a steady neutral axis."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('krauzlis2004', 'findlay1999', 'robinson1965', 'rashbass1961', 'kahlon1996', 'woods2015'),
  related: [
    { href: "/drills/visual-tracking/constant-slow-pursuit", label: "Smooth Pursuit Eye Exercise (Constant Slow)" },
    { href: "/drills/visual-tracking/directional-chaos-pursuit", label: "Directional Chaos Pursuit (Erratic Motion)" },
    { href: "/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamic Evasion Pursuit (Reactive Tracking)" },
    { href: "/drills/visual-tracking/ghosting-suppress-pursuit", label: "Ghosting Suppress Pursuit (Fixation Stability)" },
    { href: "/drills/visual-tracking/infinity-pursuit", label: "Figure-8 Eye Tracking Exercise (Infinity)" },
    { href: "/drills/visual-tracking/sine-wave-pursuit", label: "Sine Wave Pursuit (Harmonic Motion)" }
  ]
};

export default function SpatialShiftPursuitPage() {
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

      <SpatialShiftPursuitClient copy={{ title: "Spatial Shift Pursuit", subtitle: "Adaptive Eye Tracking Drill" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
