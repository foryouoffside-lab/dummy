import DirectionalChaosPursuitClient from './DirectionalChaosPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Erratic Motion Eye Drill – Chaos Pursuit | SkillDrills",
  description: "Track erratic target trajectories with unpredictable velocity shifts. Condition reactive gaze re-acquisition online in your browser. Free, no sign-up.",
  keywords: [
    "directional chaos pursuit",
    "erratic motion eye drill",
    "visual tracking drill",
    "eye tracking training",
    "saccadic recovery test",
    "unpredictable visual pursuit",
    "gaze re-acquisition drill",
    "foveal tracking exercise",
    "reactive ocular motor training",
    "esports eye tracking online",
    "dynamic gaze stabilization",
    "ocular tracking reflex test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/directional-chaos-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Erratic Motion Eye Drill – Chaos Pursuit | SkillDrills",
    description: "Track erratic target trajectories with unpredictable velocity shifts. Condition reactive gaze re-acquisition online in your browser. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Erratic Motion Eye Drill – Chaos Pursuit | SkillDrills",
    description: "Track erratic target trajectories with unpredictable velocity shifts. Condition reactive gaze re-acquisition online in your browser. Free, no sign-up.",
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
      "name": "Directional Chaos Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Directional Chaos Pursuit",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Track erratic target trajectories with unpredictable velocity shifts. Condition reactive gaze re-acquisition online in your browser. Free, no sign-up.",
  "url": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit",
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
  "name": "Erratic Motion Eye Drill - Directional Chaos Pursuit",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Directional Chaos Pursuit",
  "url": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit",
  "description": "Track erratic target trajectories with unpredictable velocity shifts. Condition reactive gaze re-acquisition online in your browser. Free, no sign-up.",
  "genre": [
    "Action",
    "Eye Tracking",
    "Reflex Game"
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
  "name": "How to Train Eye Tracking with Directional Chaos Pursuit",
  "description": "Track erratic target trajectories with unpredictable velocity shifts. Condition reactive gaze re-acquisition online in your browser. Free, no sign-up.",
  "dateModified": "2026-09-12",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Set Initial Tracking Parameters",
      "text": "Select an initial base speed of 1.0x and configure your session duration to 60 seconds to establish baseline gaze recovery mechanics.",
      "url": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Establish Head-Still Posture",
      "text": "Sit upright with your eyes leveled with the display center, keeping your head and neck completely still to isolate ocular motor circuits.",
      "url": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Engage Foveal Tracking Across Perturbations",
      "text": "Click Start Drill and track the target ball as it undergoes continuous stochastic velocity nudges and boundary bounces.",
      "url": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Execute Rapid Saccadic Recovery",
      "text": "Whenever an abrupt directional shift displaces the target outside central gaze, immediately fire a corrective saccade to re-center the target core.",
      "url": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Directional Chaos Pursuit drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Directional Chaos Pursuit drill exercises visual tracking agility by subjecting a target to continuous, pseudo-random velocity perturbations and elastic boundary bounces, training your eyes to recover quickly from unpredictable trajectory changes."
      }
    },
    {
      "@type": "Question",
      "name": "Why does my tracking accuracy feel lower in this drill than on predictable tracks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On predictable curves (like circles or Lissajous paths), your brain uses predictive internal models to achieve zero-latency tracking (Bahill et al., 1980). When motion is chaotic, feedforward prediction is impossible; your tracking relies entirely on reactive visual feedback with an inherent ~150 ms neural latency, making occasional target displacement normal."
      }
    },
    {
      "@type": "Question",
      "name": "What skill is being trained if the motion is unpredictable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You are training gaze re-acquisition latency and saccadic recovery. When an evasive object changes direction, the useful competitive skill is how quickly your oculomotor system detects retinal error, fires a corrective saccade, and smoothly re-engages velocity tracking."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Directional Chaos Pursuit and Dynamic Evasion Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Directional Chaos Pursuit applies continuous, subtle stochastic nudges every few frames alongside boundary bounces, keeping the velocity vector constantly drifting. Dynamic Evasion Pursuit moves in steady lines before executing sharp, discrete evasive angle breaks at fixed intervals."
      }
    },
    {
      "@type": "Question",
      "name": "How does erratic pursuit training transfer to gaming and esports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In competitive first-person shooters (such as Apex Legends, CS2, and Overwatch 2), opponents use strafe-jiggling, crouch-spamming, and unpredictable movement to break your aim. Training gaze recovery under chaotic motion reduces visual disorientation and helps you re-acquire moving targets faster."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill transfer to traditional sports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In sports like baseball, cricket, table tennis, and soccer, balls frequently undergo unpredictable aerodynamic swerves, spin deflections, and boundary bounces. Conditioning rapid saccadic re-centering helps athletes track sudden trajectory shifts without losing sight of the ball."
      }
    },
    {
      "@type": "Question",
      "name": "How long should I practice erratic tracking daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend 5 to 10 minutes of daily tracking practice (typically 5 to 8 rounds of 60 seconds). Because erratic tracking demands intensive neural attention and frequent saccadic adjustments, keeping sessions concise prevents ocular muscle fatigue."
      }
    },
    {
      "@type": "Question",
      "name": "Should I move my head while tracking erratic targets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Keep your head and neck stationary. Moving your head engages the vestibulo-ocular reflex (VOR) driven by inner-ear vestibular organs, which circumvents the cortical and cerebellar visual-motor pathways that smooth pursuit training is designed to develop."
      }
    },
    {
      "@type": "Question",
      "name": "How does display latency impact reactive gaze re-acquisition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Display lag directly impairs reactive visual tracking. An uncalibrated 60Hz screen adds up to 16.7ms of visual delay before stochastic directional shifts are rendered. Low-latency gaming monitors minimize visual lag, enabling faster corrective saccade triggering (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Is Directional Chaos Pursuit free and safe to practice daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, this drill is completely free and browser-based. It safely conditions neuro-ocular reflexes when practiced in 5-to-10 minute daily intervals without personal data tracking or telemetry."
      }
    }
  ]
};

const guide = {
  heading: "Directional Chaos Pursuit - Ocular Motor Training Standards",
  intro: [
    
    
      "Most tracking drills use predictable geometric paths, which unintentionally allow the brain to substitute anticipatory motor prediction for actual visual pursuit (Bahill et al., 1980). Once a path repeats, internal models bypass real-time retinal error processing. Directional Chaos Pursuit eliminates this shortcut by applying continuous, pseudo-random velocity perturbations and elastic wall bounces, ensuring no two seconds of trajectory are identical.",
      "The primary training stimulus is not steady-state smooth pursuit gain, but rapid gaze re-acquisition latency. Every sudden nudge knocks the fovea off target, generating immediate retinal slip. The oculomotor system must rapidly compute position error, fire a short corrective saccade to re-center the target, and smoothly re-match velocity (Krauzlis, 2004; Barnes, 2008). This capability directly translates to tracking evasive opponents in competitive shooters and reacting to deflected balls in field sports.",
    "Hardware latency adds display quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores remain stored strictly in local browser storage."
  
  ],
  
  benchmarks: {
    title: "Directional Chaos Pursuit & Saccadic Recovery Benchmarks",
    headers: ["Performance Tier", "Speed Multiplier", "Gaze Recovery & Tracking Continuity", "Neuromotor & Ocular Profile"],
    rows: [
      ["Tier 1: Apex Reactive Pursuit", "2.0x+", "Instantaneous catch-up saccade upon trajectory disruption; zero lag refixation onto new vector.", "Peak synaptic transmission speed between retinal periphery and oculomotor centers; elite esports tracking standard."],
      ["Tier 2: Superior Saccadic Recovery", "1.4x – 1.9x", "High-velocity re-centering with minimal oscillatory overshoot; smooth pursuit resumes in <180 ms.", "Exceptional extraocular coordination; rapid adaptation to erratic, non-linear directional switches."],
      ["Tier 3: Solid Baseline", "1.0x – 1.3x", "Consistent tracking across standard turns; minor latency lag on acute angle rebounds.", "Typical adult baseline; adequate for casual gaming, driving, and general sports reactions."],
      ["Tier 4: Delayed Refixation", "0.7x – 0.9x", "Target regularly escapes foveal capture; multiple secondary corrective saccades required.", "Elevated sensorimotor processing latency during direction shifts; benefits from sub-1.0x training."],
      ["Tier 5: Novice / Instability", "< 0.7x", "Gaze decouples frequently; visual tracking collapses into disjointed visual searching across the canvas.", "Foundational tracking control needs development on predictable paths before re-attempting chaos pursuit."]
    ],
    note: "Benchmarks reflect performance under stochastic velocity perturbations and elastic wall bounces; evaluation is governed by catch-up saccade latency and smooth pursuit re-acquisition (Bahill et al., 1980; Barnes, 2008; Krauzlis, 2004; Robinson, 1965)."
  },
  faqs: [
    {
        "q": "What is the Directional Chaos Pursuit drill?",
        "a": "The Directional Chaos Pursuit drill exercises visual tracking agility by subjecting a target to continuous, pseudo-random velocity perturbations and elastic boundary bounces, training your eyes to recover quickly from unpredictable trajectory changes."
    },
    {
        "q": "Why does my tracking accuracy feel lower in this drill than on predictable tracks?",
        "a": "On predictable curves (like circles or Lissajous paths), your brain uses predictive internal models to achieve zero-latency tracking (Bahill et al., 1980). When motion is chaotic, feedforward prediction is impossible; your tracking relies entirely on reactive visual feedback with an inherent ~150 ms neural latency, making occasional target displacement normal."
    },
    {
        "q": "What skill is being trained if the motion is unpredictable?",
        "a": "You are training gaze re-acquisition latency and saccadic recovery. When an evasive object changes direction, the useful competitive skill is how quickly your oculomotor system detects retinal error, fires a corrective saccade, and smoothly re-engages velocity tracking."
    },
    {
        "q": "What is the difference between Directional Chaos Pursuit and Dynamic Evasion Pursuit?",
        "a": "Directional Chaos Pursuit applies continuous, subtle stochastic nudges every few frames alongside boundary bounces, keeping the velocity vector constantly drifting. Dynamic Evasion Pursuit moves in steady lines before executing sharp, discrete evasive angle breaks at fixed intervals."
    },
    {
        "q": "How does erratic pursuit training transfer to gaming and esports?",
        "a": "In competitive first-person shooters (such as Apex Legends, CS2, and Overwatch 2), opponents use strafe-jiggling, crouch-spamming, and unpredictable movement to break your aim. Training gaze recovery under chaotic motion reduces visual disorientation and helps you re-acquire moving targets faster."
    },
    {
        "q": "How does this drill transfer to traditional sports?",
        "a": "In sports like baseball, cricket, table tennis, and soccer, balls frequently undergo unpredictable aerodynamic swerves, spin deflections, and boundary bounces. Conditioning rapid saccadic re-centering helps athletes track sudden trajectory shifts without losing sight of the ball."
    },
    {
        "q": "How long should I practice erratic tracking daily?",
        "a": "We recommend 5 to 10 minutes of daily tracking practice (typically 5 to 8 rounds of 60 seconds). Because erratic tracking demands intensive neural attention and frequent saccadic adjustments, keeping sessions concise prevents ocular muscle fatigue."
    },
    {
        "q": "Should I move my head while tracking erratic targets?",
        "a": "No. Keep your head and neck stationary. Moving your head engages the vestibulo-ocular reflex (VOR) driven by inner-ear vestibular organs, which circumvents the cortical and cerebellar visual-motor pathways that smooth pursuit training is designed to develop."
    },
    {
        "q": "How does display latency impact reactive gaze re-acquisition?",
        "a": "Display lag directly impairs reactive visual tracking. An uncalibrated 60Hz screen adds up to 16.7ms of visual delay before stochastic directional shifts are rendered. Low-latency gaming monitors minimize visual lag, enabling faster corrective saccade triggering (Woods et al., 2015)."
    },
    {
        "q": "Is Directional Chaos Pursuit free and safe to practice daily?",
        "a": "Yes, this drill is completely free and browser-based. It safely conditions neuro-ocular reflexes when practiced in 5-to-10 minute daily intervals without personal data tracking or telemetry."
    }
],
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
};

export default function DirectionalChaosPursuitPage() {
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

      <DirectionalChaosPursuitClient copy={{ title: "Directional Chaos Pursuit", subtitle: "Erratic Motion Eye Drill" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
