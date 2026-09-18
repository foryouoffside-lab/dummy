import PeripheralPingPursuitClient from './PeripheralPingPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Peripheral Vision Training – Ping Pursuit | SkillDrills",
  description: "Condition peripheral visual awareness and split-field target detection while maintaining central gaze anchoring online. Free, no sign-up required.",
  keywords: [
    "peripheral vision training drill",
    "peripheral ping pursuit",
    "covert spatial attention drill",
    "visual field expansion exercise",
    "peripheral awareness test",
    "foveal fixation central stability",
    "split-field target detection",
    "wide field vision drill",
    "esports peripheral vision",
    "useful field of view ufov test",
    "dynamic visual acuity practice",
    "ocular motor tracking exercise"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/peripheral-ping-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Peripheral Vision Training Drill – Ping Pursuit | SkillDrills",
    description: "Condition peripheral visual awareness and split-field target detection while maintaining central gaze anchoring online. Free, no sign-up required.",
    url: "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Peripheral Vision Training Drill – Ping Pursuit | SkillDrills",
    description: "Condition peripheral visual awareness and split-field target detection while maintaining central gaze anchoring online. Free, no sign-up required.",
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
      "name": "Peripheral Ping Pursuit",
      "item": "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Peripheral Ping Pursuit Visual Training",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Dual-task visual training software assessing central foveal tracking stability and covert peripheral stimulus detection latency."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Peripheral Ping Pursuit Drill",
  "url": "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All modern browsers",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Peripheral Ping Pursuit",
  "description": "Dual-task ocular agility drill where players maintain foveal lock on moving central targets while registering peripheral flash triggers.",
  "genre": ["Visual Training", "Peripheral Awareness", "Reflex Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Web Browser"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Peripheral Awareness with Peripheral Ping Pursuit",
  "description": "Step-by-step protocol to expand covert spatial attention while sustaining continuous central smooth pursuit.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Anchor Central Foveal Gaze",
      "text": "Position yourself 50-70 cm from the screen. Lock your gaze onto the centrally moving target without allowing your eyes to wander."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Expand Covert Spatial Attention",
      "text": "Broaden your mental field of awareness across the monitor borders while keeping your physical ocular axis locked on the center."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Detect Peripheral Pings",
      "text": "When brief flash impulses appear in the peripheral field, register them via magnocellular pathways without breaking central fixation."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Trigger Immediate Reaction",
      "text": "Respond instantly with spacebar or touch input while maintaining smooth pursuit continuity on the central target."
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
      "name": "What is the physiological difference between foveal and peripheral vision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Foveal vision encompasses the central 1-2 degrees of high-acuity, cone-dominated sight. Peripheral vision is rod-dominated, offering lower spatial resolution but far superior temporal resolution and motion sensitivity (Wolfe, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "How does covert spatial attention work without moving the eyes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Covert attention is mediated by the dorsal frontoparietal network, which shifts attentional priority across the visual field without requiring physical eye rotation (Posner, 1980; Eriksen & St. James, 1986)."
      }
    },
    {
      "@type": "Question",
      "name": "How does this drill prevent tunnel vision under pressure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cognitive stress causes the useful field of view (UFOV) to constrict. Dual-task conditioning forces the visual cortex to maintain wide attentional bandwidth during demanding tasks."
      }
    },
    {
      "@type": "Question",
      "name": "Why is it important not to glance at peripheral flashes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Glancing triggers a ballistic saccade that induces saccadic suppression for 50-100ms, momentarily blinding you to central target trajectories (Findlay & Walker, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "How does peripheral awareness transfer to competitive FPS gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In competitive shooters, players must track crosshairs while monitoring minimaps and flanking enemies, preventing situational blindness."
      }
    },
    {
      "@type": "Question",
      "name": "What benefits does this drill offer traditional athletic performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Athletes in soccer, basketball, and tennis must track balls centrally while monitoring peripheral movements of teammates and defenders (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "How does display latency impact peripheral detection speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High refresh displays (144Hz+) render luminance transients with minimal persistence blur, allowing peripheral rod photoreceptors to detect flashes faster (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Is this peripheral training tool free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SkillDrills provides this training completely free directly in your browser with zero registration or installation required."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I train peripheral ping pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Training 3 to 5 times per week in 5 to 10-minute sessions produces measurable expansions in useful field of view within 4 to 6 weeks."
      }
    }
  ]
};

const guide = {
  heading: "Peripheral Ping Pursuit - Ocular Motor Training Standards",
  intro: [
    "The human retina is characterized by functional division of labor: high-acuity foveal vision occupies only the central 1° to 2° of the visual field (parvocellular pathway), while the vast majority of our visual space is processed by the peripheral retina, dominated by rod photoreceptors and the magnocellular pathway specialized for motion and luminance dynamics (Wolfe, 1994; Leigh & Zee, 2015). Under natural instinct, the brain fires ballistic saccades toward any eccentric flash.",
    "Peripheral Ping Pursuit conditions the vital cognitive skill of covert spatial attention—the ability to expand your functional visual field and detect transient events across peripheral sectors without moving your eyes away from a central target (Posner, 1980; Eriksen & St. James, 1986). By enforcing strict foveal fixation on the central target, this drill trains the frontal eye field to tonically suppress involuntary saccades while conditioning magnocellular pathways to register eccentric flashes instantly (Findlay & Walker, 1999).",
    "Hardware latency adds display quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores remain stored strictly in local browser storage."
  ],
  benchmarks: {
    title: "Useful Field of View (UFOV) & Peripheral Latency Benchmarks",
    headers: ["Performance Tier", "Useful Field of View (UFOV %)", "Peripheral Reaction Latency", "Central Tracking Stability", "Neurophysiological Profile"],
    rows: [
      ["Elite (Esports / Pro Athletes)", "> 92%", "< 280 ms", "> 95%", "Flawless foveal decoupling; panoramic spatial awareness with zero central gaze deviation."],
      ["Advanced (Competitive Rank)", "85% – 92%", "280 – 340 ms", "90% – 95%", "Excellent covert attention distribution; minimal peripheral reaction lag during pursuit."],
      ["Competent (Healthy Adult)", "75% – 84%", "341 – 410 ms", "82% – 89%", "Solid dual-task capability; slight attentional tunnel vision under higher target velocities."],
      ["Developing (Elevated Lag)", "60% – 74%", "411 – 500 ms", "70% – 81%", "Noticeable latency delay; periodic involuntary micro-saccades toward peripheral stimuli."],
      ["Novice (Motor Refinement)", "< 60%", "> 500 ms", "< 70%", "Pronounced tunnel vision; frequent breakdown of central pursuit upon peripheral ping appearance."]
    ],
    note: "※ Reference values derived from standardized oculomotor tests at 50–70 cm viewing distance across 60-second dual-task sessions. Only trials maintaining central target pursuit are scored."
  },
  techniques: {
    title: "Four Core Techniques for Expanding Peripheral Visual Awareness",
    items: [
      {
        name: "Foveal Anchoring Protocol",
        desc: "Discipline ocular motor circuits to remain strictly locked on the moving central reticle. Suppress the primitive reflex to glance at peripheral flashes, avoiding saccadic suppression intervals (Findlay & Walker, 1999).",
        tips: "Treat your central gaze as an unbreakable magnetic line while extending mental awareness outwardly like a wide net."
      },
      {
        name: "Covert Attentional Spread",
        desc: "Broaden your mental spotlight radially outward from center to monitor bezel borders. Shift into 'soft focus' mode where retinal rods detect luminance changes rather than object details (Posner, 1980).",
        tips: "Do not attempt to identify the ping's exact color or shape; trigger your reaction immediately upon luminance detection."
      },
      {
        name: "Dorsal Stream Mobilization",
        desc: "Visual pathways divide into ventral ('what') and dorsal ('where/action') streams. Peripheral ping detection relies exclusively on the dorsal stream. Bypass conscious cognitive analysis for pure reflexive input triggering.",
        tips: "React directly to the visual transient without verbalizing or overthinking the stimulus."
      },
      {
        name: "Parasympathetic Respiratory Cadence",
        desc: "Sympathetic stress arousal constricts the functional visual field, causing severe tunnel vision (Eriksen & St. James, 1986). Smooth, rhythmic nasal breathing lowers heart rate and preserves panoramic visual bandwidth.",
        tips: "Inhale slowly for 4 seconds and exhale for 6 seconds to relax suboccipital muscles and widen visual attention."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('posner1980', 'eriksen1986', 'wolfe1994', 'findlay1999', 'leigh2015', 'woods2015'),
  related: [
    { href: "/drills/visual-tracking/constant-slow-pursuit", label: "Smooth Pursuit Eye Exercise (Constant Slow)" },
    { href: "/drills/visual-tracking/directional-chaos-pursuit", label: "Directional Chaos Pursuit (Erratic Motion)" },
    { href: "/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamic Evasion Pursuit (Reactive Tracking)" },
    { href: "/drills/visual-tracking/ghosting-suppress-pursuit", label: "Ghosting Suppress Pursuit (Fixation Stability)" },
    { href: "/drills/visual-tracking/infinity-pursuit", label: "Figure-8 Eye Tracking Exercise (Infinity)" },
    { href: "/drills/visual-tracking/momentum-teleport-pursuit", label: "Teleport Gaze Tracking Drill (Momentum)" }
  ]
};

export default function PeripheralPingPursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PeripheralPingPursuitClient copy={{ title: "Peripheral Ping Pursuit", subtitle: "Peripheral Vision Training Drill" }} />
      <DrillGuide guide={guide} />
    </>
  );
}
