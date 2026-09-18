import PredictivePursuitClient from './PredictivePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Predictive Eye Tracking Drill – Pursuit | SkillDrills",
  description: "Condition predictive smooth pursuit across occluded trajectories. Train ocular working memory and feedforward motor control online. Free, no sign-up.",
  keywords: [
    "predictive eye tracking drill",
    "predictive pursuit",
    "predictive smooth pursuit",
    "trajectory anticipation drill",
    "occlusion prediction training",
    "anticipatory eye tracking",
    "predictive gaze shifts",
    "motion prediction eye exercise",
    "visual anticipation training",
    "predictive tracking test",
    "feedforward ocular control",
    "esports lead aim practice"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/predictive-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Predictive Eye Tracking Drill – Pursuit | SkillDrills",
    description: "Condition predictive smooth pursuit across occluded trajectories. Train ocular working memory and feedforward motor control online. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Predictive Eye Tracking Drill – Pursuit | SkillDrills",
    description: "Condition predictive smooth pursuit across occluded trajectories. Train ocular working memory and feedforward motor control online. Free, no sign-up.",
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
      "name": "Predictive Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/predictive-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Predictive Pursuit Gaze Training",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Interactive visual training protocol assessing internal forward model extrapolation and feedforward smooth pursuit during visual occlusion."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Predictive Pursuit Drill",
  "url": "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All modern browsers",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Predictive Pursuit",
  "description": "Visual tracking agility exercise conditioning feedforward gaze trajectory extrapolation through periodic target occlusions.",
  "genre": ["Visual Training", "Predictive Tracking", "Reflex Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Web Browser"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Trajectory Anticipation with Predictive Pursuit",
  "description": "Step-by-step oculomotor protocol to condition internal cerebellar forward models during target occlusion.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Encode Initial Trajectory Vector",
      "text": "Position yourself 50-70 cm from the screen. Lock onto the moving target during the first 200 ms to encode its direction and velocity."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Engage Internal Forward Modeling",
      "text": "When the target vanishes into occlusion, maintain smooth pursuit motion along the predicted trajectory without stopping your eyes."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Suppress Disorganized Search Saccades",
      "text": "Resist the reflexive urge to make erratic saccades searching for the lost target. Maintain steady feedforward velocity."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Execute Precise Emergence Intercept",
      "text": "Position your fovea exactly at the target emergence point just as the target re-appears from the occluded sector."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Predictive Pursuit drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Predictive Pursuit drill conditions internal forward models by requiring your eyes to extrapolate moving target trajectories across temporary visual occlusions and guide gaze without visual feedback (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "How does predictive pursuit overcome biological latency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visual feedback loop delay is approximately 130 to 150 ms. Predictive pursuit bypasses feedback lag by utilizing cerebellar feedforward motor commands based on learned trajectory velocity (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "What neurological mechanisms maintain tracking during target occlusion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The frontal eye fields (FEF) and supplementary eye fields (SEF) preserve velocity representations in ocular working memory, driving smooth pursuit motor centers even when visual retinal input ceases (Bennett & Barnes, 2003)."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill improve lead aiming in competitive FPS games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When enemies break line of sight behind cover, smoke, or corners, players with trained feedforward models place crosshairs precisely at the emergence point ahead of time rather than reacting post-emergence."
      }
    },
    {
      "@type": "Question",
      "name": "How does predictive pursuit benefit traditional athletic performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In baseball, cricket, and tennis, high-velocity balls exceed human visual tracking speed. Elite athletes use predictive pursuit to project intercept coordinates before the ball reaches striking distance (Kowler, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "Why should I suppress searching saccades when targets disappear?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Searching saccades produce retinal smear and saccadic suppression, destroying velocity matching. Continuous smooth pursuit maintains velocity continuity for flawless re-acquisition (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "What is occlusion gain in oculomotor testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Occlusion gain measures the ratio of eye velocity during occlusion relative to target velocity before occlusion. Ideal gain approaches 1.0, signifying zero deceleration during invisibility."
      }
    },
    {
      "@type": "Question",
      "name": "How does monitor refresh rate affect motion extrapolation accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High refresh displays provide more frequent visual samples prior to occlusion, allowing cerebellar circuits to calculate precise speed vectors with minimal variance (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Is this predictive eye tracking tool free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this training tool 100% free directly in your web browser with zero subscriptions or downloads required."
      }
    },
    {
      "@type": "Question",
      "name": "Can older adults improve predictive tracking through practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While reflexive latency slightly increases with age, experience-based cerebellar forward models remain highly plastic and improve substantially with structured training (Kowler, 1989)."
      }
    }
  ]
};

const guide = {
  heading: "Predictive Pursuit - Ocular Motor Training Standards",
  intro: [
    "The human visual system faces a fundamental physiological barrier: sensorimotor processing latency requires approximately 130 to 150 milliseconds for retinal photoreceptor activations to navigate cortical pathways and trigger extraocular muscle contractions. Were visual tracking governed purely by closed-loop feedback, the fovea would suffer constant retinal slip, perpetually lagging behind moving targets. The evolutionary solution to this latency trap is predictive smooth pursuit.",
    "Pioneering research by David Robinson (1965) and Barnes (2008) established that the cerebellum, operating in tight synchrony with frontal eye fields (FEF), extracts velocity and directional vectors during the initial 100 to 200 ms of target flight. Based on these vectors, the brain constructs an internal forward model whose feedforward motor pulses drive extraocular muscles at the exact anticipated target speed, completely eliminating biological transit delay.",
    "In competitive sports and esports, targets frequently suffer visual occlusion behind physical obstacles, terrain, or smokescreens. Research by Bennett & Barnes (2003) demonstrated that frontal working memory stores velocity vectors and sustains oculomotor pursuit autonomously for up to two seconds during total sensory dropout. Predictive Pursuit isolates and conditions this vital feedforward capacity."
  ],
  benchmarks: {
    title: "Trajectory Extrapolation & Occlusion Precision Benchmarks",
    headers: ["Performance Tier", "Extrapolation Accuracy (%)", "Emergence Landing Error", "Occlusion Pursuit Gain", "Predictive Profile"],
    rows: [
      ["Elite (Esports / Pro Athletes)", "> 94%", "< 15 px (Pinpoint Emergence)", "0.95 – 1.02", "Flawless cerebellar forward model; zero latency lead positioning without corrective glissades."],
      ["Advanced (Competitive Rank)", "86% – 93%", "15 – 28 px", "0.88 – 0.94", "Excellent vector extrapolation; minimal post-emergence micro-saccadic adjustment."],
      ["Competent (Healthy Adult)", "76% – 85%", "29 – 45 px", "0.78 – 0.87", "Solid predictive baseline; mild trajectory drift during extended occlusion durations."],
      ["Developing (Elevated Lag)", "62% – 75%", "46 – 65 px", "0.65 – 0.77", "Predominantly reactive gaze control; noticeable deceleration during occlusion."],
      ["Novice (Motor Refinement)", "< 62%", "> 65 px", "< 0.65", "Gaze arrests upon occlusion; severe re-acquisition delay upon target re-emergence."]
    ],
    note: "※ Values based on 1080p resolution tests at 50–70 cm viewing distance at 1.0x–1.5x velocities. Evaluated based on foveal arrival accuracy at target emergence point without corrective saccades."
  },
  techniques: {
    title: "Four Core Techniques for Flawless Trajectory Extrapolation",
    items: [
      {
        name: "Initial Vector Encoding",
        desc: "Fixate the target with intense focus during the first 100 to 200 ms of motion. The cerebellum requires clean velocity and acceleration parameters to build an accurate mental simulation (Barnes, 2008).",
        tips: "Do not focus on graphic styling; track how fast the reticle glides relative to background reference coordinates."
      },
      {
        name: "Mental Vector Extrapolation",
        desc: "When the target vanishes into occlusion, never arrest eye velocity. Sustain continuous gaze travel along the projected trajectory toward the anticipated emergence zone.",
        tips: "Do not look where the target disappeared; project your visual axis forward into empty space."
      },
      {
        name: "Saccadic Suppression Control",
        desc: "During sensory loss, the brain reflexively attempts searching saccades. Saccades induce visual blur and destroy pursuit momentum. Maintain smooth, disciplined feedforward travel (Krauzlis, 2004).",
        tips: "Imagine your eyes sliding along an invisible magnetic rail through the darkness."
      },
      {
        name: "Anticipatory Emergence Arrest",
        desc: "Calculate the exact boundary where the target will re-emerge. Match your eye position to target exit timing so the fovea lands in lockstep with the visible object.",
        tips: "Arrive at the exit coordinate a fraction of a millisecond early rather than falling behind."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('robinson1965', 'kowler1989', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/drills/visual-tracking/constant-slow-pursuit", label: "Smooth Pursuit Eye Exercise (Constant Slow)" },
    { href: "/drills/visual-tracking/directional-chaos-pursuit", label: "Directional Chaos Pursuit (Erratic Motion)" },
    { href: "/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamic Evasion Pursuit (Reactive Tracking)" },
    { href: "/drills/visual-tracking/ghosting-suppress-pursuit", label: "Ghosting Suppress Pursuit (Fixation Stability)" },
    { href: "/drills/visual-tracking/infinity-pursuit", label: "Figure-8 Eye Tracking Exercise (Infinity)" },
    { href: "/drills/visual-tracking/momentum-teleport-pursuit", label: "Teleport Gaze Tracking Drill (Momentum)" }
  ]
};

export default function PredictivePursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PredictivePursuitClient copy={{ title: "Predictive Pursuit", subtitle: "Predictive Eye Tracking Drill" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
