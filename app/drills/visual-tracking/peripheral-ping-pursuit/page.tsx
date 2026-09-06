import PeripheralPingPursuitClient from './PeripheralPingPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Peripheral Vision Training - Free Ping Pursuit Drill",
  description: "Condition peripheral awareness and central gaze stability. Detect transient peripheral targets while maintaining foveal fixation online. Free, no sign-up.",
  keywords: [
    "peripheral ping pursuit",
    "peripheral vision training",
    "peripheral awareness exercise",
    "wide field vision drill",
    "peripheral vision test",
    "covert attention drill",
    "visual field expansion exercise",
    "gaze stability training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Peripheral Vision Training - Free Ping Pursuit Drill | SkillDrills",
    description: "Condition peripheral awareness and central gaze stability. Detect transient peripheral targets while maintaining foveal fixation online. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Peripheral Vision Training - Free Ping Pursuit Drill | SkillDrills",
    description: "Condition peripheral awareness and central gaze stability. Detect transient peripheral targets while maintaining foveal fixation online. Free, no sign-up.",
  },
};

export default function PeripheralPingPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Peripheral Ping Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit" }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Peripheral Vision Training - Free Ping Pursuit Drill",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires modern JavaScript and HTML5 Canvas",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Condition peripheral awareness and central gaze stability. Detect transient peripheral targets while maintaining foveal fixation online. Free, no sign-up.",
    "url": "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit",
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
    "name": "How to Train Peripheral Awareness and Central Fixation with Peripheral Ping",
    "description": "A 4-step protocol for developing broad covert spatial attention and stabilizing central foveal fixation during peripheral target flashes.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Set Baseline Speed and Duration",
        "text": "Configure base speed to 1.0x and session duration to 60 seconds to calibrate peripheral flash timing."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Lock Foveal Gaze on Center Crosshair",
        "text": "Anchor your central gaze strictly onto the screen center crosshair, keeping your head and eye sockets centered."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Expand Covert Spatial Attention",
        "text": "Without shifting your eye position away from the crosshair, broaden your peripheral awareness to encompass the canvas edges."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Detect Transient Target Pings",
        "text": "Cognitively register each peripheral flash while actively suppressing the impulse to fire reflexive saccades toward the transient."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Peripheral Ping Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Peripheral Ping Pursuit drill trains covert spatial attention and peripheral awareness by requiring you to maintain strict central foveal fixation while detecting transient target flashes across the outer visual field."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between overt and covert visual attention?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overt attention involves physically rotating your eyes to place the high-resolution fovea directly on an object. Covert attention involves mentally shifting perceptual focus to an eccentric region in your peripheral field without moving your eyes (Posner, 1980)."
        }
      },
      {
        "@type": "Question",
        "name": "Why must I keep my eyes locked on the center crosshair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Glancing away from the crosshair converts covert peripheral processing into an overt saccade, defeating the purpose of conditioning wide-angle visual sensitivity and central gaze stability."
        }
      },
      {
        "@type": "Question",
        "name": "How does peripheral vision detect targets faster than central vision?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The peripheral retina is dominated by magnocellular neural pathways and rod photoreceptors, which have higher temporal resolution and faster conduction velocities than the foveal parvocellular system, making them exceptionally sensitive to motion and flicker (Wolfe, 1994)."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Hide Line' setting do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding the center crosshair removes your visual anchor, forcing your visual cortex to maintain internal spatial centering purely through intrinsic oculomotor fixation control."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Random Speed' setting train?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces unpredictable flash intervals and variable target durations, challenging your brain to maintain continuous covert readiness rather than anticipating a rhythmic cadence."
        }
      },
      {
        "@type": "Question",
        "name": "How does peripheral vision training benefit competitive FPS gamers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Competitive gamers must monitor mini-maps, ability cooldowns, and flankers without pulling their crosshair off prospective target angles. Heightened peripheral awareness enables rapid threat detection without compromising reticle placement."
        }
      },
      {
        "@type": "Question",
        "name": "How does peripheral awareness transfer to traditional team sports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In basketball, soccer, and hockey, athletes with superior peripheral fields track open teammates and incoming defenders while maintaining visual lock on the ball or goal area."
        }
      },
      {
        "@type": "Question",
        "name": "What causes the reflex to look directly at the flashing target?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sudden peripheral luminance transients trigger reflexive collicular saccade bursts. Suppressing this urge conditions active frontal eye field (FEF) inhibitory control over primitive oculomotor reflexes (Findlay & Walker, 1999; Leigh & Zee, 2015)."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I practice peripheral vision training each day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend 5 to 8 rounds of 60 seconds (5 to 10 minutes total). This develops robust frontoparietal attentional networks without inducing eye fatigue or tension headaches."
        }
      }
    ]
  };

  const guide = {
    heading: "Peripheral vision training and covert spatial attention",
    intro: [
      "The human retina is not uniform; high-acuity foveal vision occupies only the central 1° to 2° of the visual field, while the vast majority of our visual space is processed by the peripheral retina (Wolfe, 1994; Leigh & Zee, 2015). Under natural conditions, our instinct is to execute ballistic saccades toward any eccentric flash or movement.",
      "Peripheral Ping Pursuit conditions the vital cognitive skill of covert spatial attention—the ability to expand your functional visual field and detect transient events across peripheral sectors without moving your eyes away from a central target (Posner, 1980; Eriksen & St. James, 1986). By enforcing strict foveal fixation on the center reticle, this drill trains the frontal eye field to tonically suppress involuntary saccades while conditioning magnocellular pathways to register eccentric flashes instantly (Findlay & Walker, 1999)."
    ],
    benchmarks: {
      title: "Peripheral Detection & Fixation Stability Standards",
      headers: ["Difficulty / Speed", "Flash Duration / Visibility", "Visual Field Eccentricity", "Oculomotor Control State", "Competitive Transfer"],
      rows: [
        ["0.5x – 1.0x", "600 – 750 ms", "10° – 15° eccentricity", "Stable Foveal Lock + Paracentral Awareness", "Baseline radar & UI monitoring, minimap awareness"],
        ["1.5x – 2.5x", "400 – 550 ms", "15° – 25° eccentricity", "Broadened Covert Field Expansion", "Off-screen flanker detection, dynamic team positioning reads"],
        ["3.0x – 5.0x", "250 – 350 ms", "25° – 35° eccentricity", "High-Stress Reflexive Suppression", "Elite competitive clutch awareness, tracking multi-angle utility"],
        ["6.0x – 9.0x", "< 200 ms", "> 35° eccentricity", "Maximum Eccentric Transient Detection", "Stress-testing extreme peripheral luminance sensitivity"]
      ],
      note: "Normal visual reaction time to peripheral transients ranges between 220 ms and 280 ms. Through targeted covert attention training, athletes condition faster bottom-up salience recognition without breaking foveal anchoring."
    },
    mechanisms: [
      "Covert Spatial Attention and Orienting: Visual attention can dissociate from ocular orientation, allowing neural resources in parietal cortex to monitor eccentric retinal locations without moving the eyes (Posner, 1980; Eriksen & St. James, 1986).",
      "Magnocellular Pathway and Transient Salience: Peripheral retina contains a high density of rod photoreceptors and magnocellular ganglion cells optimized for detecting high-temporal-frequency flicker and motion onsets (Wolfe, 1994).",
      "Tonic Fixation Hold and Saccadic Suppression: Successfully keeping gaze centered while peripheral targets flash requires active frontal eye field (FEF) inhibition of collicular saccade bursts, conditioning ocular motor discipline (Findlay & Walker, 1999; Leigh & Zee, 2015)."
    ],
    techniques: {
      title: "Techniques for Peripheral Vision Training",
      items: [
        {
          name: "Fixate Firmly on the Reticle",
          desc: "Keep your line of sight anchored strictly to the center crosshair throughout the entire session.",
          tips: "Resist the natural temptation to flick your eyes toward peripheral flashes."
        },
        {
          name: "Soften Gaze to Broaden Visual Field",
          desc: "Avoid 'tunnel vision' by relaxing your focus outward like a camera zoom lens, expanding your awareness to the monitor bezels.",
          tips: "Consciously perceive the ambient boundaries of your screen while holding central gaze."
        },
        {
          name: "Resist Saccadic Pull",
          desc: "When a peripheral target flashes, acknowledge it mentally without turning your eyes.",
          tips: "Mental acknowledgment registers the target without breaking foveal lock."
        },
        {
          name: "Toggle Hide Line for Autonomy",
          desc: "Once proficient at 1.0x, turn 'Hide Line' on to remove the center crosshair and maintain gaze stability intrinsically.",
          tips: "Forces your visual system to generate internal centering cues."
        }
      ]
    },
    steps: [
      "Configure base speed to 1.0x and session duration to 60 seconds to calibrate peripheral flash timing.",
      "Anchor your central gaze strictly onto the screen center crosshair, keeping your head and eye sockets centered.",
      "Without shifting your eye position away from the crosshair, broaden your peripheral awareness to encompass the canvas edges.",
      "Cognitively register each peripheral flash while actively suppressing the impulse to fire reflexive saccades toward the transient."
    ],
    audience: "Competitive FPS gamers needing heightened minimap and flanker awareness, team sport athletes monitoring open passing lanes, and visual training practitioners developing covert attention.",
    faqs: faqSchema.mainEntity.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })),
    sources: pickSources('posner1980', 'eriksen1986', 'wolfe1994', 'findlay1999', 'leigh2015'),
    related: [
      { label: "Smooth Pursuit Eye Exercise", href: "/drills/visual-tracking/constant-slow-pursuit" },
      { label: "Erratic Motion Eye Drill", href: "/drills/visual-tracking/directional-chaos-pursuit" },
      { label: "Reactive Eye Tracking Drill", href: "/drills/visual-tracking/dynamic-evasion-pursuit" },
      { label: "Eye Fixation Stability Training", href: "/drills/visual-tracking/ghosting-suppress-pursuit" }
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

      <PeripheralPingPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
