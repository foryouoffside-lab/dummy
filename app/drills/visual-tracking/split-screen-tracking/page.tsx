import SplitScreenTrackingClient from './SplitScreenTrackingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Split-Screen Tracking – Divided Attention | SkillDrills",
  description: "Train divided visual attention across orthogonal vertical and horizontal planes simultaneously. Free online bilateral gaze exercise, no sign-up.",
  keywords: [
    "split-screen tracking",
    "divided visual attention",
    "bilateral pursuit tracking",
    "orthogonal motion tracking",
    "multiple object tracking drill",
    "covert spatial attention test",
    "tunnel vision reduction exercise",
    "dual target eye tracking",
    "hemifield visual attention",
    "esports minimap gaze training",
    "smooth pursuit split focus",
    "binocular visual coordination"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
    languages: getAlternateLanguages("/drills/visual-tracking/split-screen-tracking"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Split-Screen Tracking – Divided Attention | SkillDrills",
    description: "Train divided visual attention across orthogonal vertical and horizontal planes simultaneously. Free online bilateral gaze exercise, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Split-Screen Tracking – Divided Attention | SkillDrills",
    description: "Train divided visual attention across orthogonal vertical and horizontal planes simultaneously. Free online bilateral gaze exercise, no sign-up.",
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
      "name": "Split-Screen Tracking",
      "item": "https://skilldrills.online/drills/visual-tracking/split-screen-tracking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Split-Screen Tracking Divided Attention Test",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Bilateral divided attention tracking application conditioning concurrent foveal anchor and peripheral covert spatial attention across orthogonal motion vectors."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Split-Screen Tracking Drill",
  "url": "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All modern browsers",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Split-Screen Tracking",
  "description": "Divided attention challenge requiring users to monitor dual independent targets across simultaneous orthogonal trajectories without tunneling.",
  "genre": ["Visual Training", "Divided Attention", "Reflex Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Web Browser"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Divided Attention with Split-Screen Tracking",
  "description": "Step-by-step protocol to widen covert spatial attention and track dual orthogonal targets without saccadic ping-ponging.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixate Central Divider Anchor",
      "text": "Sit 50-70 cm from the screen. Anchor your central gaze (soft focus) onto the central divider separating left and right viewing fields."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Expand Bilateral Covert Attention",
      "text": "Widen covert spatial attention across both hemifields simultaneously using peripheral rod photoreceptors rather than moving eye centers."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Decouple Orthogonal Trajectories",
      "text": "Perceive the vertical oscillation on the left and horizontal oscillation on the right as two distinct, decoupled motion vectors."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Suppress Ballistic Saccadic Switching",
      "text": "Resist darting gaze back and forth between targets, eliminating saccadic suppression and maintaining continuous dual monitoring."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Split-Screen Tracking drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Split-Screen Tracking trains divided visual attention by forcing you to track two independent targets moving along orthogonal (vertical and horizontal) paths across divided visual hemifields."
      }
    },
    {
      "@type": "Question",
      "name": "Why can human eyes not directly focus on two moving targets at once?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The high-acuity fovea centralis spans only 1 to 2 degrees of visual angle. Multiple moving objects must be tracked via peripheral covert spatial attention or rapid alternating fixations (Pylyshyn & Storm, 1988)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the bilateral hemifield advantage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When targets are divided between left and right hemifields, each cerebral hemisphere processes its respective target in parallel, doubling attentional capacity compared to tracking two targets within one hemifield (Alvarez & Cavanagh, 2005)."
      }
    },
    {
      "@type": "Question",
      "name": "What is saccadic suppression and why should it be minimized?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "During rapid saccadic eye movements, visual perception is briefly inhibited for 20 to 50 ms. Darting gaze between targets creates frequent blind gaps, degrading tracking accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "How does split-screen tracking benefit tactical FPS gamers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In games like CS2, Valorant, and Apex Legends, players must center crosshairs on targets while monitoring peripheral HUD elements, minimaps, and flankers without losing crosshair discipline (Green & Bavelier, 2006)."
      }
    },
    {
      "@type": "Question",
      "name": "Why do I frequently lose track of one side over the other?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ocular and hemispheric dominance naturally bias attention toward one hemifield. Deliberately directing mental focus toward your non-dominant side balances bilateral spatial allocation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the training effect of toggling Hide Line?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Disabling trajectory lines removes external visual scaffolding, forcing your parietal cortex to maintain an internal predictive kinematic model of both target paths."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill transfer to ball sports and driving?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Athletes and drivers must monitor central paths while tracking peripheral obstacles, oncoming vehicles, or teammates across expansive visual fields."
      }
    },
    {
      "@type": "Question",
      "name": "Is Split-Screen Tracking free to practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this training tool completely free in your web browser with zero registration or installation required."
      }
    },
    {
      "@type": "Question",
      "name": "What is the recommended daily training routine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend 2 to 3 rounds of 60 seconds (roughly 5 minutes daily). Short, highly concentrated bouts optimize frontoparietal neuroplasticity without cognitive fatigue."
      }
    }
  ]
};

const guide = {
  heading: "Split-Screen Tracking - Divided Attention & Bilateral Pursuit Standards",
  intro: [
    "The human visual apparatus is physiologically constrained by the microscopic dimensions of the fovea centralis, which covers a high-acuity field of only 1 to 2 degrees. When two distinct targets move concurrently across spatially separated planes, optical foveation of both points simultaneously is biologically impossible. The central nervous system faces an executive dilemma: oscillate gaze rhythmically via ballistic saccades, or establish a central gaze anchor and expand covert spatial attention bimodally across both visual hemifields.",
    "Seminal multiple object tracking (MOT) research by Pylyshyn & Storm (1988) demonstrated that the primate brain utilizes visual indexing mechanisms (FINSTs) to track multiple entities concurrently without serial focal scanning. Expanding on this, Alvarez & Cavanagh (2005) proved that visual tracking resources are segregated across the cerebral hemispheres: dividing one target to the left visual field (right hemisphere) and one to the right visual field (left hemisphere) yields a measurable 'bilateral field advantage', avoiding intra-hemispheric attentional bottlenecks.",
    "Oscillating gaze rapidly between separated nodes imposes significant neurological overhead. Each saccadic transit incurs a latency of 20 to 50 milliseconds and triggers saccadic suppression—a brief threshold elevation during which visual processing is partially blind. Split-Screen Tracking conditions a stable central anchor coupled with multifocal covert attention (Cavanagh & Alvarez, 2005; Green & Bavelier, 2006). By coupling a vertical trajectory on the left with a horizontal trajectory on the right, this drill prevents Gestalt common fate grouping and trains true dual-stream cognitive processing."
  ],
  benchmarks: {
    title: "Divided Attention & Bilateral Pursuit Tracking Benchmarks",
    headers: ["Performance Tier", "Target Velocity", "Gaze Anchor Stability", "Hemifield Symmetry Error", "Cognitive Population Tier"],
    rows: [
      ["Elite (Pro Esports / Jet Aviators)", "3.5x – 5.0x+", "Rock-solid central anchor; 0 intrusive saccades", "< 3% error discrepancy (perfect bimodal lock)", "Top 1.5%"],
      ["Advanced (Competitive Rank)", "2.5x – 3.5x", "Highly stable anchor; rare micro-saccades", "< 7% discrepancy (consistent dual monitoring)", "Top 8%"],
      ["Competent (Healthy Adult)", "1.8x – 2.5x", "Central focus maintained; minor saccades at velocity peaks", "< 12% discrepancy (mild single-side bias)", "Top 25%"],
      ["Developing (Divided Inefficiency)", "1.2x – 1.8x", "Frequent involuntary saccades toward faster node", "15% – 25% error lag on non-dominant hemifield", "Middle 45%"],
      ["Novice (Attention Tunneling)", "0.5x – 1.2x", "Constant ballistic gaze switching between screens", "> 25% complete tracking loss on one target", "Baseline Tier"]
    ],
    note: "※ Calibrated based on MOT capacity thresholds (Pylyshyn & Storm, 1988) and bilateral hemifield resource models (Alvarez & Cavanagh, 2005) on 1080p displays at 50–70 cm viewing distance."
  },
  techniques: {
    title: "Four Core Techniques for Dual-Stream Divided Attention",
    items: [
      {
        name: "Central Soft-Focus Gaze Anchor",
        desc: "Fixate your physical eye axis directly on the midline partition dividing the screens. Relax ocular focus ('soft gaze') to permit peripheral rod photoreceptors to detect target movement on both sides.",
        tips: "Avoid looking directly at either target; treat the central dividing line as your immovable visual anchor."
      },
      {
        name: "Orthogonal Vector Decoupling",
        desc: "The brain instinctively attempts to combine orthogonal motions into a diagonal vector. Mentally separate the vertical bouncing cadence from the horizontal sliding rhythm.",
        tips: "Use target reversal points as independent visual timestamps to verify both channels are active."
      },
      {
        name: "Hemifield Dominance Balancing",
        desc: "Most individuals exhibit dominant-side bias, tracking one hemifield more accurately. Consciously allocate 60% of covert attention toward your weaker hemifield to prevent target drop-off.",
        tips: "Identify which screen side consistently drops accuracy and bias early focus toward that flank."
      },
      {
        name: "Saccadic Suppression Elimination",
        desc: "Resist the reflex to glance directly when a target reaches peak velocity. Rely strictly on covert peripheral tracking to avoid blinding saccadic suppression intervals.",
        tips: "Synchronize blinking with synchronized turning points when kinematic predictability is highest."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('pylyshyn1988', 'alvarez2005', 'green2006', 'cavanagh2005', 'woods2015', 'leigh2015'),
  related: [
    { href: "/drills/visual-tracking/constant-slow-pursuit", label: "Smooth Pursuit Eye Exercise (Constant Slow)" },
    { href: "/drills/visual-tracking/directional-chaos-pursuit", label: "Directional Chaos Pursuit (Erratic Motion)" },
    { href: "/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamic Evasion Pursuit (Reactive Tracking)" },
    { href: "/drills/visual-tracking/ghosting-suppress-pursuit", label: "Ghosting Suppress Pursuit (Fixation Stability)" },
    { href: "/drills/visual-tracking/infinity-pursuit", label: "Figure-8 Eye Tracking Exercise (Infinity)" },
    { href: "/drills/visual-tracking/sine-wave-pursuit", label: "Sine Wave Pursuit (Harmonic Motion)" }
  ]
};

export default function SplitScreenTrackingPage() {
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

      <SplitScreenTrackingClient copy={{ title: "Split-Screen Tracking", subtitle: "Divided Attention Eye Test" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
