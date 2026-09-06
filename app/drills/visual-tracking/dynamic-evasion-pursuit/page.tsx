import DynamicEvasionPursuitClient from './DynamicEvasionPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Reactive Eye Tracking Drill - Dynamic Evasion Pursuit",
  description: "Train reactive visual pursuit against sudden evasive directional turns. Condition fast gaze re-acquisition online in your browser. Free, no sign-up.",
  keywords: [
    "dynamic evasion pursuit",
    "reactive eye tracking drill",
    "evasive target pursuit",
    "reaction tracking exercise",
    "visual tracking games online",
    "smooth pursuit training",
    "saccade recovery drill",
    "gaze re-acquisition"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Reactive Eye Tracking Drill - Dynamic Evasion Pursuit | SkillDrills",
    description: "Train reactive visual pursuit against sudden evasive directional turns. Condition fast gaze re-acquisition online in your browser. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reactive Eye Tracking Drill - Dynamic Evasion Pursuit | SkillDrills",
    description: "Train reactive visual pursuit against sudden evasive directional turns. Condition fast gaze re-acquisition online in your browser. Free, no sign-up.",
  },
};

export default function DynamicEvasionPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Dynamic Evasion Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit" }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Reactive Eye Tracking Drill - Dynamic Evasion Pursuit",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires modern JavaScript and HTML5 Canvas",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Train reactive visual pursuit against sudden evasive directional turns. Condition fast gaze re-acquisition online in your browser. Free, no sign-up.",
    "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
    "isAccessibleForFree": true,
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
    "name": "How to Train Gaze Re-Acquisition with Dynamic Evasion Pursuit",
    "description": "A 4-step protocol for developing rapid gaze re-acquisition and pursuit recovery when targets execute sudden evasive vector turns.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Set Baseline Session Parameters",
        "text": "Select a base speed of 1.0x and configure your session duration to 60 seconds to establish baseline re-acquisition timing."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Maintain Centered Head Posture",
        "text": "Sit upright with your eyes leveled with the display center, keeping your head and neck completely still to isolate ocular motor tracking."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Engage Pursuit Along Linear Vectors",
        "text": "Click Start Drill and smoothly track the moving target across straight-line paths before directional breaks."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Fire Corrective Saccades on Evasive Cuts",
        "text": "When the target executes an abrupt evasive heading turn, fire an immediate catch-up saccade to re-center the target core and match velocity."
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
        "name": "What does the 'Hide Line' setting do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Toggling 'Hide Line' removes the visible forward evasion vector cue. This prevents you from reading directional guide lines and forces your visual motor cortex to react purely to real-time target displacement."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Random Speed' feature train?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed adds non-linear sinusoidal velocity bursts and variable evasion intervals. This exercises cerebellar gain modulation by preventing you from timing the evasion cadence rhythmically."
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
        "name": "Why shouldn't I move my head while following the evasive target?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Moving your head engages the vestibulo-ocular reflex (VOR) governed by the inner ear vestibular canals. Keeping your head still isolates extraocular motor control and the cortical pursuit networks that this drill is specifically calibrated to condition."
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
      }
    ]
  };

  const guide = {
    heading: "Eye tracking under sudden evasive directional changes",
    intro: [
      "Predictable pursuit pathways enable the brain to use feedforward anticipatory motor commands, tracking targets with zero latency (Bahill et al., 1980). However, real-world competitive encounters—such as an opposing player executing an evasive strafe or a ball deflecting off an opponent—feature abrupt trajectory disruptions where feedforward models fail.",
      "Dynamic Evasion Pursuit isolates reactive gaze re-acquisition. Targets move along straight paths before executing sharp, unannounced directional cuts. When the target cuts, smooth pursuit velocity matching fails instantly, producing retinal position error that triggers a rapid catch-up saccade to re-center the fovea (Rashbass, 1961; Krauzlis, 2004; Barnes, 2008)."
    ],
    benchmarks: {
      title: "Evasive Pursuit & Gaze Re-Acquisition Standards",
      headers: ["Difficulty / Speed", "Evasion Turn Interval", "Re-Acquisition Latency", "Oculomotor Control Phase", "Competitive Transfer"],
      rows: [
        ["0.5x – 1.0x", "700 – 900 ms", "160 – 190 ms", "Smooth Vector with Distinct Saccade", "Reading standard evasive cuts, baseline tracking reaction"],
        ["1.5x – 2.5x", "450 – 600 ms", "190 – 230 ms", "Rapid Interleaved Pursuit & Saccades", "Tracking tactical jukes, close-quarter movement duels"],
        ["3.0x – 5.0x", "300 – 400 ms", "230 – 270 ms", "Saccadic Dominance with Fast Gain Matching", "High-tier competitive FPS duels, fast racket ball deflections"],
        ["6.0x – 9.0x", "< 300 ms", "280+ ms (reflex ceiling)", "Pure Reactive Saccadic Interception", "Stress-testing emergency target re-acquisition reflexes"]
      ],
      note: "Visual-motor processing for unpredicted step-ramp directional shifts carries an inherent biological latency of ~150 ms (Rashbass, 1961; Bahill et al., 1980). Deliberate conditioning tightens post-saccadic re-centering and eliminates overshoot."
    },
    mechanisms: [
      "Step-Ramp Velocity Disruption: Moving targets establish steady smooth pursuit velocity matching until sudden directional changes introduce acute retinal position error, breaking pursuit equilibrium (Rashbass, 1961).",
      "Catch-Up Saccade Triggering: When retinal displacement exceeds foveal boundaries, the frontal eye fields and superior colliculus trigger an involuntary, high-velocity catch-up saccade to reposition gaze onto target within ~150-200 ms (Krauzlis, 2004).",
      "Post-Saccadic Velocity Modulation: Cerebellar circuits must instantly recalibrate smooth pursuit gain to match the target's newly established velocity vector without overshoot (Robinson, 1965; Barnes, 2008)."
    ],
    techniques: {
      title: "Techniques for Evasive Target Pursuit",
      items: [
        {
          name: "Maintain Neutral Visual Vigilance",
          desc: "Avoid guessing when or where the target will cut. Committing your eyes prematurely leads to large overshoot errors and doubles your recovery time.",
          tips: "Keep your fovea anchored cleanly to the current vector and wait for the visual confirmation of a direction change (Bahill et al., 1980)."
        },
        {
          name: "Snap Instantly to Target Center",
          desc: "The moment the evasive cut occurs, fire a crisp saccade directly to the white center core rather than drifting slowly toward the path.",
          tips: "Treat each cut as an immediate re-acquisition trigger rather than trying to smoothly steer your eyes around the sharp corner."
        },
        {
          name: "Lock onto the High-Contrast Core",
          desc: "Fixate directly on the white center dot inside the colored target circle to provide your retinal fovea with unambiguous positional feedback.",
          tips: "Tracking the core prevents optical blur during high-speed directional breaks."
        },
        {
          name: "Disable Guide Line for Pure Reaction",
          desc: "Once you can comfortably track at 1.0x, toggle 'Hide Line' on to remove the forward vector indicator.",
          tips: "Removes predictive visual cues and forces complete reliance on live retinal error detection."
        }
      ]
    },
    steps: [
      "Select a base speed of 1.0x and configure your session duration to 60 seconds to establish baseline re-acquisition timing.",
      "Sit upright with your eyes leveled with the display center, keeping your head and neck completely still.",
      "Click Start Drill and smoothly track the moving target across straight-line paths before directional breaks.",
      "When the target executes an abrupt evasive heading turn, fire an immediate catch-up saccade to re-center the target core and match velocity."
    ],
    audience: "Competitive FPS gamers tracking evasive strafers, racket and ball sport athletes reacting to sudden cuts, and vision training practitioners developing gaze recovery agility.",
    faqs: faqSchema.mainEntity.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })),
    sources: pickSources('bahill1980', 'rashbass1961', 'krauzlis2004', 'robinson1965', 'barnes2008'),
    related: [
      { label: "Smooth Pursuit Eye Exercise", href: "/drills/visual-tracking/constant-slow-pursuit" },
      { label: "Erratic Motion Eye Drill", href: "/drills/visual-tracking/directional-chaos-pursuit" },
      { label: "Adaptive Eye Tracking Drill", href: "/drills/visual-tracking/spatial-shift-pursuit" },
      { label: "Anticipatory Eye Tracking Drill", href: "/drills/visual-tracking/momentum-teleport-pursuit" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <DynamicEvasionPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
