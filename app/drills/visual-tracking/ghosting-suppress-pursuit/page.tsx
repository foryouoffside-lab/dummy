import GhostingSuppressPursuitClient from './GhostingSuppressPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Eye Fixation Stability Training – Ghosting | SkillDrills",
  description: "Train steady foveal fixation and suppress retinal ghosting artifacts along moving trajectories. Build gaze stability online. Free, no sign-up.",
  keywords: [
    "ghosting suppress pursuit",
    "eye fixation stability training",
    "visual tracking drill",
    "eye tracking training",
    "retinal motion deblurring",
    "foveal gaze stability test",
    "motion smear suppression",
    "microsaccade fixation exercise",
    "esports eye training online",
    "visual acuity tracking drill",
    "ocular stability workout",
    "smooth pursuit fixation test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/ghosting-suppress-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Eye Fixation Stability Training – Ghosting | SkillDrills",
    description: "Train steady foveal fixation and suppress retinal ghosting artifacts along moving trajectories. Build gaze stability online. Free, no sign-up.",
    url: "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Eye Fixation Stability Training – Ghosting | SkillDrills",
    description: "Train steady foveal fixation and suppress retinal ghosting artifacts along moving trajectories. Build gaze stability online. Free, no sign-up.",
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
      "name": "Ghosting Suppress Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Ghosting Suppress Pursuit",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Train steady foveal fixation and suppress retinal ghosting artifacts along moving trajectories. Build gaze stability online. Free, no sign-up.",
  "url": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
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
  "name": "Eye Fixation Stability Training - Ghosting Suppress Pursuit",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Ghosting Suppress Pursuit",
  "url": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
  "description": "Train steady foveal fixation and suppress retinal ghosting artifacts along moving trajectories. Build gaze stability online. Free, no sign-up.",
  "genre": [
    "Action",
    "Eye Tracking",
    "Visual Training"
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
  "name": "How to Train Eye Tracking with Ghosting Suppress Pursuit",
  "description": "Train steady foveal fixation and suppress retinal ghosting artifacts along moving trajectories. Build gaze stability online. Free, no sign-up.",
  "dateModified": "2026-09-12",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure Tracking Parameters",
      "text": "Set base speed to 1.0x and session duration to 60 seconds to establish baseline foveal fixation stability.",
      "url": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Maintain Centered Head Posture",
      "text": "Sit upright with your eyes leveled with the display center, keeping your head and neck stationary to isolate pure extraocular motor control.",
      "url": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Lock Fovea on High-Contrast Core",
      "text": "Click Start Drill and focus gaze directly onto the sharp white center of the target, ignoring trailing ghost rings and motion smear.",
      "url": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Track Through Border Bounces",
      "text": "Maintain steady pursuit gain and suppress distraction artifacts as the target bounces smoothly across boundary borders.",
      "url": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit#step-4"
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
      "name": "What role do microsaccades play during fixation on moving targets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Microsaccades are microscopic involuntary eye adjustments that refresh retinal photoreceptors and correct minute gaze drift, preventing foveal target fading during prolonged tracking (Martinez-Conde et al., 2004; Rolfs, 2009)."
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
    },
    {
      "@type": "Question",
      "name": "How does retinal slip relate to motion ghosting suppression?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When eye velocity matches target velocity, retinal slip is minimized toward zero, allowing early visual cortical neurons to suppress motion smear and render razor-sharp edges (Burr, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Does screen pixel response time (GtG) influence perceived ghosting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Displays with slow gray-to-gray pixel response times produce physical hardware ghosting that mimics biological retinal smear. A fast IPS or OLED display helps isolate pure biological gaze stability (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Can I practice this drill on mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the drill is fully responsive and functions smoothly on mobile touchscreens as well as desktop monitors."
      }
    }
  ]
};

const guide = {
  heading: "Ghosting Suppress Pursuit - Ocular Motor Training Standards",
  intro: [
    
    
      "When objects move across the visual field, physical display latency and biological retinal persistence can generate trailing ghost artifacts and perceptual motion smear (Burr, 1980). Without robust attentional filtering, trailing visual noise draws foveal gaze backward, disrupting smooth pursuit gain and causing targeting errors.",
      "Ghosting Suppress Pursuit conditions foveal fixation stability. By projecting simulated ghosting rings behind a moving target, this drill exercises cortical distractor suppression circuits, training the visual system to lock gaze onto true target coordinates and ignore peripheral artifact clutter (Martinez-Conde et al., 2004; Rolfs, 2009; Leigh & Zee, 2015).",
    "Hardware latency adds display quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores remain stored strictly in local browser storage."
  
  ],
  
  benchmarks: {
    title: "Fixation Stability & Ghosting Suppression Benchmarks",
    headers: ["Performance Tier", "Speed Multiplier", "Fixation Stability Under Visual Ghosting", "Neuromotor & Ocular Profile"],
    rows: [
      ["Tier 1: Apex Fixation Lock", "2.0x+", "Gaze remains immovably anchored on the target core despite trailing ghosting artifacts and sharp wall rebounds.", "Flawless cortical motion deblurring and microsaccadic precision (Burr, 1980; Martinez-Conde et al., 2004); elite esports tracking standard."],
      ["Tier 2: Superior Fixation Acuity", "1.4x – 1.9x", "Target contour cleanly isolated at high speed; minimal visual distraction from trailing ghost rings.", "Exceptional sensorimotor gating; rapid suppression of visual clutter in particle-dense competitive scenarios."],
      ["Tier 3: Solid Baseline", "1.0x – 1.3x", "Steady pursuit across normal speeds; slight momentary hesitation during abrupt trajectory rebounds.", "Typical normative range for healthy adults; fully sufficient for recreational gaming and daily visual tasks."],
      ["Tier 4: Gaze Drift", "0.7x – 0.9x", "Gaze frequently gets pulled backward toward trailing afterimages; target core repeatedly slips from fovea.", "Delayed cortical visual noise suppression; targeted training at lower speed tiers strongly recommended."],
      ["Tier 5: Novice / Fixation Loss", "< 0.7x", "Eyes wander erratically between the primary target and trailing ghost rings; frequent target loss.", "Foundational fixation stability practice required at reduced speeds with strict head immobilization."]
    ],
    note: "Benchmarks derived from neurophysiological studies on foveal fixation control, microsaccade dynamics, and cortical suppression of motion smear (Burr, 1980; Martinez-Conde et al., 2004; Rolfs, 2009; Krauzlis, 2004)."
  },
  faqs: [
    {
        "q": "What is the Ghosting Suppress Pursuit drill?",
        "a": "Ghosting Suppress Pursuit trains foveal tracking precision by forcing your visual system to suppress motion ghosting artifacts, trail clutter, and visual smear while tracking a moving target."
    },
    {
        "q": "What causes visual motion ghosting and trailing artifacts?",
        "a": "Visual ghosting can arise from hardware limitations (pixel response time latency on LCD panels) as well as biological retinal persistence, where visual photoreceptor activation briefly outlasts stimulus presence."
    },
    {
        "q": "How does the human visual system suppress motion smear?",
        "a": "The visual system employs active neural suppression mechanisms in early visual cortex (V1/MT) that attenuate trailing motion smear while an object moves, preserving sharp edge perception (Burr, 1980)."
    },
    {
        "q": "Why is foveal fixation stability important for competitive gamers and athletes?",
        "a": "High-speed gameplay and fast ball sports produce intense visual clutter, including particle effects, shadows, and screen tears. Athletes with superior gaze stability filter out peripheral noise and keep central focus locked onto target silhouettes."
    },
    {
        "q": "What role do microsaccades play during fixation on moving targets?",
        "a": "Microsaccades are microscopic involuntary eye adjustments that refresh retinal photoreceptors and correct minute gaze drift, preventing foveal target fading during prolonged tracking (Martinez-Conde et al., 2004; Rolfs, 2009)."
    },
    {
        "q": "How does Ghosting Suppress Pursuit differ from Constant Slow Pursuit?",
        "a": "Constant Slow Pursuit follows predictable Lissajous curves to calibrate smooth pursuit gain. Ghosting Suppress Pursuit introduces trailing visual clutter rings and wall bounces, specifically conditioning attentional filtering and fixation steadiness under visual noise."
    },
    {
        "q": "How long should I practice visual fixation stability daily?",
        "a": "We recommend 5 to 10 minutes daily (5 to 8 rounds of 60 seconds). Because filtering visual clutter requires sustained foveal attention, brief focused sessions prevent ocular fatigue and promote neuromuscular adaptation."
    },
    {
        "q": "How does retinal slip relate to motion ghosting suppression?",
        "a": "When eye velocity matches target velocity, retinal slip is minimized toward zero, allowing early visual cortical neurons to suppress motion smear and render razor-sharp edges (Burr, 1980)."
    },
    {
        "q": "Does screen pixel response time (GtG) influence perceived ghosting?",
        "a": "Yes. Displays with slow gray-to-gray pixel response times produce physical hardware ghosting that mimics biological retinal smear. A fast IPS or OLED display helps isolate pure biological gaze stability (Woods et al., 2015)."
    },
    {
        "q": "Can I practice this drill on mobile devices?",
        "a": "Yes, the drill is fully responsive and functions smoothly on mobile touchscreens as well as desktop monitors."
    }
],
  sources: pickSources('burr1980', 'martinezConde2004', 'rolfs2009', 'krauzlis2004', 'leigh2015', 'woods2015'),
};

export default function GhostingSuppressPursuitPage() {
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

      <GhostingSuppressPursuitClient copy={{ title: "Ghosting Suppress Pursuit", subtitle: "Eye Fixation Stability Training" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
