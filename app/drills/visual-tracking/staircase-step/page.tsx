import StaircaseStepClient from './StaircaseStepClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { pickSources } from '../../../../lib/drillSources';

export const metadata = {
  title: "Vertical Eye Tracking Exercise - Staircase Step",
  description: "Track stepped targets across vertical zig-zag paths. Condition vertical smooth pursuit gain, elevation gaze control, and corner re-acquisition. Free drill.",
  keywords: [
    "staircase step",
    "vertical eye tracking exercise",
    "vertical zig zag pursuit",
    "vertical smooth pursuit",
    "staircase gaze training",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "vertical saccade conditioning"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/staircase-step",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vertical Eye Tracking Exercise - Staircase Step | SkillDrills",
    description: "Track stepped targets across vertical zig-zag paths. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/staircase-step",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vertical Eye Tracking Exercise - Staircase Step | SkillDrills",
    description: "Track stepped targets across vertical zig-zag paths. Free browser-based visual tracking drill.",
  },
};

const guide = {
  heading: "Staircase Step: Vertical Smooth Pursuit & Multi-Axis Ocular Motor Control",
  intro: [
    "The human oculomotor system exhibits marked functional asymmetries between horizontal and vertical tracking. While horizontal eye movements are coordinated through pontine brainstem networks (paramedian pontine reticular formation, or PPRF), vertical smooth pursuit and saccadic movements are mediated by specialized midbrain structures, specifically the rostral interstitial nucleus of the medial longitudinal fasciculus (riMLF) and the interstitial nucleus of Cajal (Büttner-Ennever & Horn, 1997).",
    "Extensive psychophysical and eye-tracking research (Rottach et al., 1996; Ke et al., 2013) reveals that vertical pursuit naturally possesses lower velocity gain, longer response latencies, and greater phase lag than horizontal pursuit. Furthermore, human gaze exhibits pronounced directional asymmetry in elevation: upward tracking typically degrades faster and generates more frequent catch-up saccades than downward pursuit.",
    "Because everyday visual tasks—such as reading text and scanning horizontal screens—predominantly exercise horizontal tracking, vertical ocular motor pathways remain relatively undertrained. This discrepancy causes noticeable tracking rough spots when athletes track high-trajectory balls or when gamers track vertical target displacement and weapon recoil.",
    "The Staircase Step drill isolates and conditions these neglected vertical neural pathways. By steering a target along a multi-segment vertical zig-zag polyline, the drill combines smooth pursuit across diagonal elevation ramps with abrupt deceleration and corner re-acquisition at acute vertices (Collewijn & Tamminga, 1984; Lisberger, 2010). Features like 'Hide Line' and 'Random Speed' eliminate anticipatory crutches, ensuring pure sensorimotor adaptation."
  ],
  benchmarks: [
    { level: "Novice", speed: "0.5x - 1.0x", detail: "Maintains gaze along visible path lines; relies on frequent corrective saccades at vertical corner transitions." },
    { level: "Intermediate", speed: "1.0x - 2.0x", detail: "Tracks continuous diagonal slopes smoothly; re-acquires target within 50ms at corner reversals with visible guides." },
    { level: "Advanced", speed: "2.0x - 3.5x", detail: "Operates with 'Hide Line' enabled; demonstrates balanced upward and downward pursuit gain without head movement." },
    { level: "Elite / Esports", speed: "3.5x+", detail: "Executes seamless tracking under 'Random Speed' with hidden lines; demonstrates stable foveation across high-velocity vertical turns." }
  ],
  steps: [
    "Configure Tracking Parameters: Choose session duration (30-120 seconds), target color, base speed multiplier, and optional settings such as 'Hide Line' or 'Random Speed'.",
    "Maintain Neutral Head Posture: Position your chin level and square to the screen. Consciously resist tilting your head, which artificially converts vertical movement into easier horizontal tracking.",
    "Track Stepped Vertical Trajectories: Follow the target as it climbs and descends the vertical zig-zag polyline, maintaining foveal lock through diagonal ramps and sharp vertex transitions.",
    "Progressive Difficulty Overload: Once comfortable at baseline speed (1.0x), toggle 'Hide Line' to remove spatial guidelines, forcing your visual cortex to rely strictly on dynamic retinal velocity feedback."
  ],
  audience: "Esports competitors (managing vertical recoil and elevation tracking in FPS/TPS titles), ball-sport athletes (volleyball, tennis, soccer, basketball), motorsports drivers, and performance practitioners seeking balanced multi-axis visual tracking.",
  sources: pickSources('rottach1996', 'collewijn1984', 'ke2013', 'buttner1997', 'lisberger2010'),
  faqs: [
    {
      q: "What is the Staircase Step drill?",
      a: "Staircase Step is an ocular motor conditioning drill designed to train vertical smooth pursuit and rapid direction re-acquisition. Observers track a target moving along a vertical multi-segment zig-zag polyline, challenging the vertical eye muscles across alternating elevation angles."
    },
    {
      q: "Why is vertical eye tracking generally harder than horizontal tracking?",
      a: "Vertical tracking utilizes distinct midbrain pathways (riMLF and interstitial nucleus of Cajal) rather than the pontine circuitry used for horizontal gaze (Büttner-Ennever & Horn, 1997). Additionally, vertical pursuit receives significantly less everyday practice, resulting in lower velocity gain and higher phase lag (Rottach et al., 1996)."
    },
    {
      q: "Why is upward tracking often harder than downward tracking?",
      a: "Research by Ke et al. (2013) demonstrated directional asymmetries in vertical pursuit. Upward gaze works against distinct mechanical tensions in the superior rectus and inferior oblique muscles, and the visual system processes upward retinal slip with different neural weighting than downward motion."
    },
    {
      q: "Why is keeping my head still so important during vertical drills?",
      a: "Tilting or nodding your head converts vertical screen motion into horizontal ocular displacement relative to your retinas. Because horizontal pursuit is naturally stronger, head movement circumvents the midbrain training stimulus. Keeping the head fixed isolates the vertical extraocular muscles."
    },
    {
      q: "How does the zig-zag corner transition challenge the ocular motor system?",
      a: "At each vertex, the target's vertical and horizontal velocity components suddenly reverse. This forces the oculomotor system to rapidly decelerate smooth pursuit and execute precise catch-up saccades to re-acquire the target (Collewijn & Tamminga, 1984; Lisberger, 2010)."
    },
    {
      q: "What does the 'Hide Line' setting train?",
      a: "Enabling 'Hide Line' removes the visible zig-zag path, eliminating advance visual cues about where the next corner turn will occur. This forces the brain to rely solely on real-time sensory feedback and internal predictive motion models."
    },
    {
      q: "What does the 'Random Speed' setting train?",
      a: "The 'Random Speed' feature introduces unpredictable velocity fluctuations along each polyline segment. This prevents rhythmic temporal anticipation, training the visual cortex to adapt dynamically to variable target acceleration."
    },
    {
      q: "How does vertical tracking training benefit competitive gamers?",
      a: "In games like Apex Legends, Overwatch, Valorant, and Fortnite, targets frequently jump, grapple, or change elevation. Training vertical smooth pursuit enables players to track airborne opponents and control vertical weapon recoil without losing crosshair target lock."
    },
    {
      q: "How does vertical tracking training benefit traditional sports athletes?",
      a: "Athletes in sports like volleyball, tennis, basketball, and soccer must constantly track high lobs, overhead spikes, and rebounding balls. Conditioning vertical pursuit enhances depth and trajectory judgment on elevated targets."
    },
    {
      q: "What is the recommended daily training protocol for Staircase Step?",
      a: "We recommend 2 to 3 sets of 45 to 60 seconds each, totaling roughly 3 to 5 minutes daily. Because vertical extraocular muscles fatigue more rapidly than horizontal muscles, brief, focused bouts yield optimal neuromuscular conditioning."
    }
  ],
  related: [
    { label: 'Smooth Pursuit Eye Exercise', href: '/drills/visual-tracking/constant-slow-pursuit' },
    { label: 'Erratic Motion Eye Drill', href: '/drills/visual-tracking/directional-chaos-pursuit' },
    { label: 'Reactive Eye Tracking Drill', href: '/drills/visual-tracking/dynamic-evasion-pursuit' },
    { label: 'Divided Attention Eye Test', href: '/drills/visual-tracking/split-screen-tracking' },
    { label: 'Figure-8 Eye Tracking Exercise', href: '/drills/visual-tracking/infinity-pursuit' },
    { label: 'Adaptive Eye Tracking Drill', href: '/drills/visual-tracking/spatial-shift-pursuit' }
  ]
};

export default function StaircaseStepPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Staircase Step", "item": "https://skilldrills.online/drills/visual-tracking/staircase-step" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Staircase Step Drill",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition vertical smooth pursuit eye movements across multi-segment zig-zag step paths.",
    "url": "https://skilldrills.online/drills/visual-tracking/staircase-step",
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
    "name": "How to Train Vertical Smooth Pursuit with Staircase Step",
    "description": "A systematic visual training protocol for developing vertical gaze stability and acute corner tracking precision.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configure tracking parameters",
        "text": "Select session duration, baseline speed multiplier, target dimensions, and toggle advanced settings such as Hide Line or Random Speed."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Maintain neutral head posture",
        "text": "Keep your head fixed and chin level to prevent head tilts from converting vertical tracking into horizontal eye movements."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Track stepped vertical trajectories",
        "text": "Follow the target smoothly through diagonal elevation ramps and re-acquire focus rapidly across sharp polyline corner transitions."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Progressively increase challenge",
        "text": "Enable Hide Line to eliminate visual path guides and increase speed multipliers to continuously condition vertical ocular motor gain."
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

      <StaircaseStepClient />
      <DrillGuide guide={guide} />
    </>
  );
}
