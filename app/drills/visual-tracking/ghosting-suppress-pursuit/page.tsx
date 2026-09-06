import GhostingSuppressPursuitClient from './GhostingSuppressPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Eye Fixation Stability Training - Free Online Drill",
  description: "Train foveal tracking precision by suppressing motion ghosting and visual clutter. Condition stable gaze online in your browser. Free, no sign-up.",
  keywords: [
    "ghosting suppress pursuit",
    "eye fixation stability training",
    "ghosting suppression drill",
    "gaze steadiness exercise",
    "visual fixation practice",
    "motion blur suppression",
    "foveal tracking drill",
    "smooth pursuit training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Eye Fixation Stability Training - Free Online Drill | SkillDrills",
    description: "Train foveal tracking precision by suppressing motion ghosting artifacts and visual clutter. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Eye Fixation Stability Training - Free Online Drill | SkillDrills",
    description: "Train foveal tracking precision by suppressing motion ghosting artifacts and visual clutter. Free browser-based visual tracking drill.",
  },
};

export default function GhostingSuppressPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Ghosting Suppress Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit" }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Eye Fixation Stability Training - Free Online Drill",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires modern JavaScript and HTML5 Canvas",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Train foveal tracking precision by suppressing motion ghosting and visual clutter. Condition stable gaze online in your browser. Free, no sign-up.",
    "url": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
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
    "name": "How to Train Gaze Stability with Ghosting Suppress Pursuit",
    "description": "A 4-step protocol for conditioning foveal gaze stability and active suppression of trailing ghost artifacts during pursuit.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configure Tracking Parameters",
        "text": "Set base speed to 1.0x and session duration to 60 seconds to establish baseline foveal fixation stability."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Maintain Centered Head Posture",
        "text": "Sit upright with your eyes leveled with the display center, keeping your head and neck stationary to isolate pure extraocular motor control."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Lock Fovea on High-Contrast Core",
        "text": "Click Start Drill and focus gaze directly onto the sharp white center of the target, ignoring trailing ghost rings and motion smear."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Track Through Border Bounces",
        "text": "Maintain steady pursuit gain and suppress distraction artifacts as the target bounces smoothly across boundary borders."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Ghosting Suppress Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ghosting Suppress Pursuit trains foveal tracking precision by forcing your visual system to suppress motion ghosting artifacts, trail clutter, and visual smear while tracking a moving target."
        }
      },
      {
        "@type": "Question",
        "name": "What causes visual motion ghosting and trailing artifacts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visual ghosting can arise from hardware limitations (pixel response time latency on LCD panels) as well as biological retinal persistence, where visual photoreceptor activation briefly outlasts stimulus presence."
        }
      },
      {
        "@type": "Question",
        "name": "How does the human visual system suppress motion smear?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The visual system employs active neural suppression mechanisms in early visual cortex (V1/MT) that attenuate trailing motion smear while an object moves, preserving sharp edge perception (Burr, 1980)."
        }
      },
      {
        "@type": "Question",
        "name": "Why is foveal fixation stability important for competitive gamers and athletes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "High-speed gameplay and fast ball sports produce intense visual clutter, including particle effects, shadows, and screen tears. Athletes with superior gaze stability filter out peripheral noise and keep central focus locked onto target silhouettes."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Trail Rings' setting train?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Toggling Trail Rings projects simulated trailing ghost artifacts behind the moving target. This forces your cortical attentional filters to ignore trailing visual debris and keep fixation locked purely on the leading target core."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 'Hide Line' setting do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Toggling 'Hide Line' removes the visible forward velocity indicator, eliminating directional path cues and testing your ability to maintain pure ocular motor pursuit based solely on live target movement."
        }
      },
      {
        "@type": "Question",
        "name": "What role do microsaccades play during fixation on moving targets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Microsaccades are microscopic involuntary eye adjustments that refresh retinal photoreceptors and correct minute gaze drift, preventing foveal target fading during prolonged tracking (Martinez-Conde et al., 2004; Rolfs, 2009)."
        }
      },
      {
        "@type": "Question",
        "name": "Why shouldn't I move my head while following the target?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Head movement engages the vestibulo-ocular reflex (VOR), which offloads gaze stabilization onto the vestibular system. Keeping your head still ensures the extraocular muscles and smooth pursuit circuits receive direct training."
        }
      },
      {
        "@type": "Question",
        "name": "How does Ghosting Suppress Pursuit differ from Constant Slow Pursuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Constant Slow Pursuit follows predictable Lissajous curves to calibrate smooth pursuit gain. Ghosting Suppress Pursuit introduces trailing visual clutter rings and wall bounces, specifically conditioning attentional filtering and fixation steadiness under visual noise."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I practice visual fixation stability daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend 5 to 10 minutes daily (5 to 8 rounds of 60 seconds). Because filtering visual clutter requires sustained foveal attention, brief focused sessions prevent ocular fatigue and promote neuromuscular adaptation."
        }
      }
    ]
  };

  const guide = {
    heading: "Eye fixation stability under visual ghosting and motion clutter",
    intro: [
      "When objects move across the visual field, physical display latency and biological retinal persistence can generate trailing ghost artifacts and perceptual motion smear (Burr, 1980). Without robust attentional filtering, trailing visual noise draws foveal gaze backward, disrupting smooth pursuit gain and causing targeting errors.",
      "Ghosting Suppress Pursuit conditions foveal fixation stability. By projecting simulated ghosting rings behind a moving target, this drill exercises cortical distractor suppression circuits, training the visual system to lock gaze onto true target coordinates and ignore peripheral artifact clutter (Martinez-Conde et al., 2004; Rolfs, 2009; Leigh & Zee, 2015)."
    ],
    benchmarks: {
      title: "Fixation Stability & Ghosting Suppression Standards",
      headers: ["Difficulty / Speed", "Ghost Trail Density", "Fixation Error Margin", "Oculomotor State", "Real-World Performance Transfer"],
      rows: [
        ["0.5x – 1.0x", "Low Density (Sparse)", "< 1.0° visual angle", "Sustained Foveal Lock with Minimal Jitter", "Tracking clearly delineated targets, basic crosshair stability"],
        ["1.5x – 2.5x", "Moderate Density", "1.0° – 1.8° visual angle", "Steady Pursuit with Micro-Adjustments", "Filtering particle clutter and fast target tracking in dynamic scenes"],
        ["3.0x – 5.0x", "High Density (Frequent)", "1.8° – 2.5° visual angle", "Active Artifact Suppression Dominance", "Elite FPS tracking through muzzle flash, high-speed ball deflections"],
        ["6.0x – 9.0x", "Extreme Density (Continuous)", "> 2.5° visual angle", "Reflex-Limit Fixation Maintenance", "Stress-testing emergency gaze stability under severe visual distortion"]
      ],
      note: "Normal visual perception relies on inhibitory neural mechanisms that attenuate trailing motion smear (Burr, 1980). Deliberate fixation conditioning stabilizes extraocular motor control and sharpens target silhouette recognition."
    },
    mechanisms: [
      "Active Motion Smear Suppression: Seminal psychophysical evidence shows the visual cortex employs temporal inhibitory mechanisms to suppress the perceived smear trails of moving objects (Burr, 1980).",
      "Fixational Oculomotor Control: Precise gaze stability relies on microscopic involuntary eye movements—including microsaccades, drift, and tremor—to keep foveal photoreceptors active and centered on target contours (Martinez-Conde et al., 2004; Rolfs, 2009).",
      "Distractor Clutter Filtering: Extraocular motor circuits coordinated by frontal eye fields and superior colliculus filter out peripheral trailing rings to maintain continuous smooth pursuit gain on the target core (Krauzlis, 2004; Leigh & Zee, 2015)."
    ],
    techniques: {
      title: "Techniques for Fixation Steadiness & Clutter Suppression",
      items: [
        {
          name: "Anchor on the White Core",
          desc: "Fixate exclusively on the high-contrast white center of the target dot rather than the outer glowing boundary.",
          tips: "A tight foveal anchor provides unambiguous retinal position error signals, stabilizing tracking gain."
        },
        {
          name: "Inhibit Gaze Snapping to Ghost Rings",
          desc: "Do not let your eyes trail backward toward expanding ghost rings. Resist the visual urge to check past positions.",
          tips: "Treat trailing rings as irrelevant background noise, keeping visual attention pressed forward."
        },
        {
          name: "Relax Extraocular Tension",
          desc: "Avoid excessive squinting or neck tightness. Smooth pursuit runs most accurately when ocular muscles remain relaxed.",
          tips: "Breathe steadily and let your eyes glide along the target path."
        },
        {
          name: "Disable Guide Line for Pure Visual Drive",
          desc: "Once you achieve steady fixation at 1.0x, toggle 'Hide Line' on to remove the forward trajectory indicator.",
          tips: "Forces complete reliance on real-time foveal tracking without predictive line cues."
        }
      ]
    },
    steps: [
      "Set base speed to 1.0x and session duration to 60 seconds to establish baseline foveal fixation stability.",
      "Sit upright with your eyes leveled with the display center, keeping your head and neck stationary.",
      "Click Start Drill and focus gaze directly onto the sharp white center of the target, ignoring trailing ghost rings.",
      "Maintain steady pursuit gain and suppress distraction artifacts as the target bounces smoothly across boundary borders."
    ],
    audience: "Competitive FPS gamers combating monitor ghosting and in-game visual clutter, ball and court athletes tracking fast objects against busy backgrounds, and vision training practitioners conditioning gaze stability.",
    faqs: faqSchema.mainEntity.map((f) => ({ q: f.name, a: f.acceptedAnswer.text })),
    sources: pickSources('burr1980', 'martinezConde2004', 'rolfs2009', 'krauzlis2004', 'leigh2015'),
    related: [
      { label: "Smooth Pursuit Eye Exercise", href: "/drills/visual-tracking/constant-slow-pursuit" },
      { label: "Erratic Motion Eye Drill", href: "/drills/visual-tracking/directional-chaos-pursuit" },
      { label: "Reactive Eye Tracking Drill", href: "/drills/visual-tracking/dynamic-evasion-pursuit" },
      { label: "Figure-8 Eye Tracking Exercise", href: "/drills/visual-tracking/infinity-pursuit" }
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

      <GhostingSuppressPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
