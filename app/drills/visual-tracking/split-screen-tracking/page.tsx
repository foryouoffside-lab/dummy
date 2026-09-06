import SplitScreenTrackingClient from './SplitScreenTrackingClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Divided Attention Eye Test - Split-Screen Tracking",
  description: "Condition divided attention by tracking dual targets moving along vertical and horizontal axes. Train split-field visual tracking online. Free, no sign-up.",
  keywords: [
    "split screen tracking",
    "divided attention eye test",
    "dual target tracking drill",
    "divided visual attention",
    "multiple object tracking drill",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "bilateral hemifield tracking"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Divided Attention Eye Test - Split-Screen Tracking | SkillDrills",
    description: "Condition divided attention by tracking dual targets moving along vertical and horizontal axes. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Divided Attention Eye Test - Split-Screen Tracking | SkillDrills",
    description: "Condition divided attention by tracking dual targets moving along vertical and horizontal axes. Free browser-based visual tracking drill.",
  },
};

const guide = {
  heading: "Split-Screen Tracking: Divided Attention & Dual-Target Visual Processing",
  intro: [
    "Human central vision is constrained by a narrow high-acuity fovea spanning roughly 1 to 2 degrees of visual angle. When two separate stimuli move across divergent trajectories simultaneously, the visual system cannot foveate both targets concurrently. The brain must resolve this constraint either through rapid overt saccadic alternation or by establishing a covert attentional anchor between the targets, using peripheral visual channels to monitor kinematic changes in parallel.",
    "Seminal research by Pylyshyn & Storm (1988) demonstrated that humans possess parallel visual indexing mechanisms (FINSTs) capable of tracking multiple independent targets without requiring continuous serial scanning. Furthermore, Alvarez & Cavanagh (2005) established that attentional tracking resources are distributed across cerebral hemispheres: tracking one stimulus in the left visual hemifield and another in the right hemifield minimizes inter-target resource competition compared to tracking multiple targets within a single hemifield.",
    "Saccadic alternation between distant targets incurs substantial neuro-optical costs. Each saccadic jump takes 20 to 50 milliseconds and triggers temporary saccadic omission, during which visual sensitivity drops sharply. Conversely, maintaining a stable central fixation while expanding covert attention across both visual hemifields preserves uninterrupted motion detection, allowing athletes and competitive gamers to monitor primary angles and peripheral threats simultaneously.",
    "Split-Screen Tracking trains this divided attentional architecture. By running one target on a vertical oscillation plane and an independent target on a horizontal plane, the drill stresses multi-axis vector processing. Advanced toggles such as 'Hide Line' remove visual coordinate anchors, forcing the visual cortex to construct internal spatial references, while independent random speed fluctuations challenge bilateral ocular motor prediction."
  ],
  benchmarks: [
    { level: "Novice", speed: "0.5x - 1.0x", detail: "Tracks targets with visible boundary lines and fixed predictable speed; relies on occasional overt saccadic glances." },
    { level: "Intermediate", speed: "1.0x - 2.0x", detail: "Maintains central covert anchor with visible lines; tracks orthogonal movements with minimal overt saccadic switches." },
    { level: "Advanced", speed: "2.0x - 3.5x", detail: "Performs with 'Hide Line' active; reliably perceives speed shifts across both visual hemifields simultaneously." },
    { level: "Elite / Esports", speed: "3.5x+", detail: "Executes tracking with random speed acceleration and hidden lines; demonstrates balanced bilateral attention without side bias." }
  ],
  steps: [
    "Establish Central Fixation: Keep your head level and square to the display. Anchor your gaze at the vertical center dividing line rather than fixating exclusively on either individual target.",
    "Expand Covert Visual Focus: Soften your focal span to encompass both the left vertical axis and the right horizontal axis simultaneously using parafoveal and peripheral vision.",
    "Resist Saccadic Alternation: Avoid rapidly darting your eyes between the two balls. Allow parallel motion detectors in the parietal cortex to register position and direction changes.",
    "Progressive Difficulty Overload: Once comfortable at baseline speed (1.0x), enable 'Hide Line' to eliminate spatial guides, and activate 'Random Speed' to condition dynamic bilateral adaptation."
  ],
  audience: "Competitive esports players (FPS radar monitoring, MOBA multi-lane awareness), team-sport athletes (tracking opponent positioning while monitoring ball vector), motorsports drivers, and performance practitioners conditioning divided visual attention.",
  sources: pickSources('pylyshyn1988', 'alvarez2005', 'awh2000', 'cavanagh2005', 'green2006'),
  faqs: [
    {
      q: "What is Split-Screen Tracking?",
      a: "Split-Screen Tracking is an interactive ocular motor drill designed to condition divided visual attention and parallel motion processing. It presents two simultaneous targets oscillating along independent, orthogonal axes (left vertical and right horizontal), requiring observers to monitor dual trajectories across separate visual hemifields."
    },
    {
      q: "Can the human visual system actually track two objects at once?",
      a: "While foveal high-acuity vision can only center on one point at a time, the human brain utilizes parallel visual indexing mechanisms (Pylyshyn & Storm, 1988) and multifocal spatial attention (Awh & Pashler, 2000; Cavanagh & Alvarez, 2005) to track multiple targets concurrently using covert peripheral attention."
    },
    {
      q: "Is it better to alternate gaze rapidly or hold a central anchor?",
      a: "Holding a stable central anchor and utilizing covert peripheral attention is generally superior to rapid saccadic alternation. Each saccade takes 20 to 50 ms and induces brief saccadic omission, resulting in lost visual data and target re-acquisition delays. A central anchor allows uninterrupted dual-field motion monitoring."
    },
    {
      q: "What is the bilateral hemifield advantage in visual tracking?",
      a: "Research by Alvarez & Cavanagh (2005) demonstrated that attentional tracking resources are hemisphere-specific. Tracking one target in the left visual field (processed by the right hemisphere) and one in the right visual field (processed by the left hemisphere) results in substantially less cognitive competition than tracking two objects within the same visual field."
    },
    {
      q: "Why does this drill feature orthogonal vertical and horizontal movement?",
      a: "Orthogonal motion planes prevent the visual system from binding the two targets into a single common motion vector (Gestalt common fate). Because the left target moves vertically while the right moves horizontally, the visual cortex must process distinct spatial dimensions and independent velocity profiles simultaneously."
    },
    {
      q: "What does the 'Hide Line' setting train?",
      a: "Toggling 'Hide Line' removes the vertical screen divider and coordinate axis paths. Without explicit visible lines, your visual cortex must construct internal spatial coordinate frames and rely entirely on dynamic retinal motion signals, significantly increasing the cognitive load of spatial tracking."
    },
    {
      q: "What does the 'Random Speed' setting train?",
      a: "The 'Random Speed' setting applies independent velocity perturbations to each target. This prevents the brain from relying on rhythmic temporal anticipation, forcing continuous real-time sensory updating and strengthening ocular motor adaptability."
    },
    {
      q: "How do competitive gamers benefit from divided attention training?",
      a: "Competitive gamers in titles like CS2, Valorant, League of Legends, and Apex Legends must constantly divide attention between crosshair placement and peripheral HUD elements (mini-maps, kill feeds, and ability cooldowns). Training divided attention accelerates peripheral threat detection without sacrificing crosshair discipline (Green & Bavelier, 2006)."
    },
    {
      q: "Why do I frequently lose track of one specific target?",
      a: "Most individuals exhibit subtle visual field asymmetries or attentional side biases. Consistently losing the left target may indicate right-hemifield dominance, while losing the right target indicates left-hemifield dominance. Targeted divided attention practice helps balance bilateral tracking capacity."
    },
    {
      q: "What is the recommended daily training routine for Split-Screen Tracking?",
      a: "We recommend 2 to 3 sets of 60 seconds each, totaling approximately 5 minutes per day. Because divided attention is cognitively demanding and induces rapid neural fatigue, short, high-focus bouts produce superior retention compared to extended, fatigued practice."
    }
  ],
  related: [
    { label: 'Smooth Pursuit Eye Exercise', href: '/drills/visual-tracking/constant-slow-pursuit' },
    { label: 'Erratic Motion Eye Drill', href: '/drills/visual-tracking/directional-chaos-pursuit' },
    { label: 'Reactive Eye Tracking Drill', href: '/drills/visual-tracking/dynamic-evasion-pursuit' },
    { label: 'Peripheral Vision Training Drill', href: '/drills/visual-tracking/peripheral-ping-pursuit' },
    { label: 'Figure-8 Eye Tracking Exercise', href: '/drills/visual-tracking/infinity-pursuit' },
    { label: 'Adaptive Eye Tracking Drill', href: '/drills/visual-tracking/spatial-shift-pursuit' }
  ]
};

export default function SplitScreenTrackingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Split-Screen Tracking", "item": "https://skilldrills.online/drills/visual-tracking/split-screen-tracking" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Split-Screen Tracking Drill",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Interactive divided attention eye tracking drill to condition split-field tracking across orthogonal vertical and horizontal movement vectors.",
    "url": "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
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
    "name": "How to Train Divided Attention with Split-Screen Tracking",
    "description": "A systematic ocular motor protocol for expanding visual attention across independent orthogonal tracking planes.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Select tracking parameters",
        "text": "Choose session duration (30-120 seconds), baseline speed multiplier, target dimensions, and optional challenge toggles like Hide Line or Random Speed."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Anchor gaze centrally",
        "text": "Position your head level and maintain comfortable central fixation on the display midpoint between the vertical and horizontal tracking regions."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Monitor orthogonal vector movement",
        "text": "Employ covert peripheral attention to register vertical oscillation on the left and horizontal movement on the right without rapid saccadic jumping."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Analyze split-field stability",
        "text": "Review session consistency, identify any hemispheric side bias, and progressively increase velocity multiplier across subsequent trials."
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

      <SplitScreenTrackingClient />
      <DrillGuide guide={guide} />
    </>
  );
}
