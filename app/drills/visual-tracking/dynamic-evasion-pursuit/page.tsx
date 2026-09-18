import DynamicEvasionPursuitClient from './DynamicEvasionPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Reactive Eye Tracking Drill – Evasion Pursuit | SkillDrills",
  description: "Track evasive targets that actively evade your cursor. Condition predictive tracking and reactive gaze recovery online. Free, no sign-up.",
  keywords: [
    "dynamic evasion pursuit",
    "reactive eye tracking drill",
    "visual tracking drill",
    "eye tracking training",
    "evasive target pursuit",
    "saccadic recentering exercise",
    "foveal re-acquisition test",
    "reactive ocular motor training",
    "esports tracking aim practice",
    "closed-loop gaze pursuit",
    "retinal slip compensation",
    "dynamic visual agility online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/dynamic-evasion-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Reactive Eye Tracking Drill – Evasion Pursuit | SkillDrills",
    description: "Track evasive targets that actively evade your cursor. Condition predictive tracking and reactive gaze recovery online. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reactive Eye Tracking Drill – Evasion Pursuit | SkillDrills",
    description: "Track evasive targets that actively evade your cursor. Condition predictive tracking and reactive gaze recovery online. Free, no sign-up.",
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
      "name": "Dynamic Evasion Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Dynamic Evasion Pursuit",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Track evasive targets that actively evade your cursor. Condition predictive tracking and reactive gaze recovery online. Free, no sign-up.",
  "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
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
  "name": "Reactive Eye Tracking Drill - Dynamic Evasion Pursuit",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Dynamic Evasion Pursuit",
  "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
  "description": "Track evasive targets that actively evade your cursor. Condition predictive tracking and reactive gaze recovery online. Free, no sign-up.",
  "genre": [
    "Action",
    "Aim Trainer",
    "Eye Tracking"
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
  "name": "How to Train Eye Tracking with Dynamic Evasion Pursuit",
  "description": "Track evasive targets that actively evade your cursor. Condition predictive tracking and reactive gaze recovery online. Free, no sign-up.",
  "dateModified": "2026-09-12",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Set Baseline Session Parameters",
      "text": "Select a base speed of 1.0x and configure your session duration to 60 seconds to establish baseline re-acquisition timing.",
      "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Maintain Centered Head Posture",
      "text": "Sit upright with your eyes leveled with the display center, keeping your head and neck completely still to isolate ocular motor tracking.",
      "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Engage Pursuit Along Linear Vectors",
      "text": "Click Start Drill and smoothly track the moving target across straight-line paths before directional breaks.",
      "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Fire Corrective Saccades on Evasive Cuts",
      "text": "When the target executes an abrupt evasive heading turn, fire an immediate catch-up saccade to re-center the target core and match velocity.",
      "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Dynamic Evasion Pursuit drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Dynamic Evasion Pursuit drill conditions visual tracking agility by forcing your eyes to follow a target moving in linear trajectories that executes sudden, periodic evasive heading shifts without advance warning."
      }
    },
    {
      "@type": "Question",
      "name": "How does sudden evasion differ from smooth continuous tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth continuous tracking allows the brain to establish a steady velocity match where retinal slip drops near zero (Robinson, 1965). Sudden evasive cuts abruptly violate this match, creating instantaneous position and velocity errors that temporarily disrupt smooth pursuit and require immediate re-acquisition (Rashbass, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "What is a catch-up saccade and why is it necessary during evasive turns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A catch-up saccade is an abrupt, high-velocity eye jump triggered when a moving target slips outside the central fovea (Krauzlis, 2004). Because smooth pursuit eye velocity cannot instantly leap to catch up with a displaced target, the brain fires a corrective saccade (~20-40 ms) to re-center the target before resuming smooth pursuit."
      }
    },
    {
      "@type": "Question",
      "name": "How does dynamic evasion training transfer to competitive FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In competitive shooters like Apex Legends, Overwatch 2, and CS2, skilled opponents evade crosshairs using abrupt strafe switches, slide-cancels, and air-strafes. Training rapid gaze re-acquisition reduces visual disorientation during sudden evasive turns, allowing you to re-center your reticle faster."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill benefit traditional sports like soccer, tennis, and basketball?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Athletes in ball and court sports constantly deal with unexpected direction changes from defenders, ball deflections, and spin-induced hops. Conditioning rapid saccadic re-fixation ensures visual lock is re-established in under 200 ms."
      }
    },
    {
      "@type": "Question",
      "name": "How does Dynamic Evasion Pursuit differ from Directional Chaos Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Directional Chaos Pursuit applies continuous micro-perturbations on every frame, producing constant curvilinear drift. Dynamic Evasion Pursuit travels along clear linear vectors and triggers discrete, high-angle direction cuts every few hundred milliseconds, emphasizing sharp re-acquisition over continuous jitter correction."
      }
    },
    {
      "@type": "Question",
      "name": "How long should I practice dynamic evasion tracking each day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend 5 to 10 minutes of daily practice (5 to 8 rounds of 60 seconds). Because abrupt evasive re-acquisitions require intense cognitive focus and frequent corrective saccades, short deliberate sessions maximize neuromuscular conditioning without ocular fatigue."
      }
    },
    {
      "@type": "Question",
      "name": "How does evasive trajectory tracking differ from linear target tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Linear tracking relies on steady-state pursuit with minimal neural replanning. Evasive trajectories actively force the ocular motor system to cancel outdated internal models and fire emergency catch-up saccades (Rashbass, 1961; Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "What hardware configuration provides the best tracking response?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 1000Hz gaming mouse paired with a 144Hz+ high-refresh display ensures near-instantaneous pointer feedback (~1ms), eliminating hardware-induced tracking error during sudden evasive turns (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Are session metrics stored locally on SkillDrills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All performance metrics, high scores, and tracking accuracies are stored exclusively in your browser's local storage with zero server-side telemetry."
      }
    }
  ]
};

const guide = {
  heading: "Dynamic Evasion Pursuit - Ocular Motor Training Standards",
  intro: [
    
    
      "Predictable pursuit pathways enable the brain to use feedforward anticipatory motor commands, tracking targets with zero latency (Bahill et al., 1980). However, real-world competitive encounters—such as an opposing player executing an evasive strafe or a ball deflecting off an opponent—feature abrupt trajectory disruptions where feedforward models fail.",
      "Dynamic Evasion Pursuit isolates reactive gaze re-acquisition. Targets move along straight paths before executing sharp, unannounced directional cuts. When the target cuts, smooth pursuit velocity matching fails instantly, producing retinal position error that triggers a rapid catch-up saccade to re-center the fovea (Rashbass, 1961; Krauzlis, 2004; Barnes, 2008).",
    "Hardware latency adds display quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores remain stored strictly in local browser storage."
  
  ],
  
  benchmarks: {
    title: "Reactive Evasive Target Pursuit & Saccadic Recentering Benchmarks",
    headers: ["Performance Tier", "Speed Multiplier", "Saccadic Recentering at Evasive Breaks", "Neuromotor & Ocular Profile"],
    rows: [
      ["Tier 1: Apex Reactive Tracking", "2.0x+", "Corrective saccade lands with sub-150 ms latency; immediate foveal lock with zero post-saccadic oscillation.", "Peak synaptic transmission between fovea and oculomotor centers; elite standard for esports and dynamic combat sports."],
      ["Tier 2: Superior Visual Agility", "1.4x – 1.9x", "Fast, reliable recentering within 1–2 video frames; seamless re-engagement of smooth pursuit velocity.", "Highly trained extraocular motor control; rapid mastery over abrupt evasive opponent strafes."],
      ["Tier 3: Solid Baseline", "1.0x – 1.3x", "Consistent tracking along linear segments; slight latency delay during acute evasive breaks.", "Normative range for healthy adults; fully sufficient for daily visual tasks, driving, and recreational gaming."],
      ["Tier 4: Delayed Refixation", "0.7x – 0.9x", "Target escapes foveal capture on nearly every evasive maneuver; multiple corrective saccades needed to recover.", "Elevated sensorimotor processing latency during direction breaks; foundational practice at low speeds recommended."],
      ["Tier 5: Novice / Instability", "< 0.7x", "Gaze lags severely behind target, lingering along the discarded trajectory.", "Foundational ocular motor coordination requires development at slow speeds with strict head stabilization."]
    ],
    note: "Benchmarks derived from neurophysiological studies on saccadic latency, retinal slip compensation, and pursuit re-acquisition under abrupt directional evasion (Bahill et al., 1980; Rashbass, 1961; Krauzlis, 2004; Barnes, 2008)."
  },
  faqs: [
    {
        "q": "What is the Dynamic Evasion Pursuit drill?",
        "a": "The Dynamic Evasion Pursuit drill conditions visual tracking agility by forcing your eyes to follow a target moving in linear trajectories that executes sudden, periodic evasive heading shifts without advance warning."
    },
    {
        "q": "How does sudden evasion differ from smooth continuous tracking?",
        "a": "Smooth continuous tracking allows the brain to establish a steady velocity match where retinal slip drops near zero (Robinson, 1965). Sudden evasive cuts abruptly violate this match, creating instantaneous position and velocity errors that temporarily disrupt smooth pursuit and require immediate re-acquisition (Rashbass, 1961)."
    },
    {
        "q": "What is a catch-up saccade and why is it necessary during evasive turns?",
        "a": "A catch-up saccade is an abrupt, high-velocity eye jump triggered when a moving target slips outside the central fovea (Krauzlis, 2004). Because smooth pursuit eye velocity cannot instantly leap to catch up with a displaced target, the brain fires a corrective saccade (~20-40 ms) to re-center the target before resuming smooth pursuit."
    },
    {
        "q": "How does dynamic evasion training transfer to competitive FPS gaming?",
        "a": "In competitive shooters like Apex Legends, Overwatch 2, and CS2, skilled opponents evade crosshairs using abrupt strafe switches, slide-cancels, and air-strafes. Training rapid gaze re-acquisition reduces visual disorientation during sudden evasive turns, allowing you to re-center your reticle faster."
    },
    {
        "q": "How does this drill benefit traditional sports like soccer, tennis, and basketball?",
        "a": "Athletes in ball and court sports constantly deal with unexpected direction changes from defenders, ball deflections, and spin-induced hops. Conditioning rapid saccadic re-fixation ensures visual lock is re-established in under 200 ms."
    },
    {
        "q": "How does Dynamic Evasion Pursuit differ from Directional Chaos Pursuit?",
        "a": "Directional Chaos Pursuit applies continuous micro-perturbations on every frame, producing constant curvilinear drift. Dynamic Evasion Pursuit travels along clear linear vectors and triggers discrete, high-angle direction cuts every few hundred milliseconds, emphasizing sharp re-acquisition over continuous jitter correction."
    },
    {
        "q": "How long should I practice dynamic evasion tracking each day?",
        "a": "We recommend 5 to 10 minutes of daily practice (5 to 8 rounds of 60 seconds). Because abrupt evasive re-acquisitions require intense cognitive focus and frequent corrective saccades, short deliberate sessions maximize neuromuscular conditioning without ocular fatigue."
    },
    {
        "q": "How does evasive trajectory tracking differ from linear target tracking?",
        "a": "Linear tracking relies on steady-state pursuit with minimal neural replanning. Evasive trajectories actively force the ocular motor system to cancel outdated internal models and fire emergency catch-up saccades (Rashbass, 1961; Krauzlis, 2004)."
    },
    {
        "q": "What hardware configuration provides the best tracking response?",
        "a": "A 1000Hz gaming mouse paired with a 144Hz+ high-refresh display ensures near-instantaneous pointer feedback (~1ms), eliminating hardware-induced tracking error during sudden evasive turns (Woods et al., 2015)."
    },
    {
        "q": "Are session metrics stored locally on SkillDrills?",
        "a": "All performance metrics, high scores, and tracking accuracies are stored exclusively in your browser's local storage with zero server-side telemetry."
    }
],
  sources: pickSources('bahill1980', 'rashbass1961', 'krauzlis2004', 'robinson1965', 'barnes2008', 'woods2015'),
};

export default function DynamicEvasionPursuitPage() {
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

      <DynamicEvasionPursuitClient copy={{ title: "Dynamic Evasion Pursuit", subtitle: "Reactive Eye Tracking Drill" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
