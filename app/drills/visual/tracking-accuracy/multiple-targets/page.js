import GhostLinkClient from './GhostLinkClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — multiple-targets (visual-multiple-targets)
// PRIMARY:  "multiple object tracking test"  — Landmark cognitive psychophysics query (~1,300 searches/mo)
//           "multiple object tracking"       — Foundational attentional tracking query
//           "mot test online"                — Direct browser testing intent
// SECONDARY / LSI:
//           "multiple target tracking"       — Broad multi-target query
//           "visual attention test"          — Clinical and neuropsychological search
//           "multiple object tracking game"  — Gamified cognitive exercise query
//           "divided attention test"         — Dual-task & distributed attention query
//           "3d mot test"                    — Sports vision & athletic evaluation query
//           "dynamic visual tracking test"   — Kinetic vision assessment term
//           "visual working memory test"     — Cognitive bandwidth testing intent
//           "neurotracker test"              — Commercial MOT benchmark reference
//           "mot training drill"             — Systematic attention training term
// LOCALES:
//           ja: "マルチオブジェクトトラッキング テスト" (Multi-Object Tracking Test)
//           ko: "다중 객체 추적 검사" (Multiple Object Tracking Test in Korean)
//           de: "multiple object tracking test" (German cognitive tracking test)
// ============================================================

export const metadata = {
  title: "Multiple Object Tracking Test - Free Online MOT Drill",
  description: "Free multiple object tracking test. Follow several targets through identical distractors and find your own limit, which for most people is four or five.",
  keywords: [
    "multiple object tracking test",
    "multiple object tracking",
    "mot test online",
    "multiple target tracking",
    "visual attention test",
    "multiple object tracking game",
    "divided attention test",
    "3d mot test",
    "dynamic visual tracking test",
    "visual working memory test",
    "neurotracker test",
    "mot training drill",
    "parallel visual tracking",
    "multi target tracking game"
  ],
  openGraph: {
    title: "Multiple Object Tracking Test - Free Online MOT Drill | SkillDrills",
    description: "Train divided visual attention, parallel tracking capacity, and spatial working memory with this free online Multiple Object Tracking (MOT) drill.",
    type: "website",
    url: "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multiple Object Tracking Test - Free Online MOT Drill | SkillDrills",
    description: "Train multiple object tracking capacity and divided visual attention online. Free browser-based MOT cognitive drill.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets",
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/multiple-targets'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Tracking Accuracy", "item": "https://skilldrills.online/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "Multiple Object Tracking Test", "item": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Multiple Object Tracking Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Interactive Multiple Object Tracking (MOT) drill measuring divided visual attention, multifocal spatial indexing, and visual working memory under dynamic 2D elastic collision physics.",
  "featureList": [
    "Configurable tracking durations (15s to 60s) and elastic 2D collision dynamics",
    "Dynamic target identification phase with instantaneous accuracy diagnostics",
    "Adjustable ball velocity and distractor counts (4 to 10 total spheres)",
    "Strict client-side local performance storage with zero external telemetry"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Multiple Object Tracking Test — Online MOT Attention Drill | SkillDrills",
  "alternateName": "Ghost-Link Tracking",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets",
  "dateModified": "2026-09-05",
  "description": "Free online Multiple Object Tracking (MOT) test. Track multiple highlighted targets among bouncing distractors and identify them to evaluate divided attention.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with HTML5 Canvas support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Multiple Object Tracking, Divided Visual Attention, Spatial Working Memory, Multifocal Indexing, Distractor Suppression"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Multiple Object Tracking Test",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets",
  "description": "Free Multiple Object Tracking (MOT) test online. Track multiple moving targets simultaneously across complex trajectories to test divided visual attention.",
  "genre": ["Action", "Brain Game", "Visual Tracking"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train with the Multiple Object Tracking Test",
  "dateModified": "2026-09-05",
  "description": "Step-by-step instructions to train divided visual attention, parallel tracking, and visual working memory using the Multiple Object Tracking (MOT) drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Memorize Highlighted Target Spheres",
      "text": "During the initial 2-second preview phase, identify and lock your visual attention onto the highlighted green target spheres.",
      "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Anchor Centroid Gaze as Spheres Fade",
      "text": "As the targets revert to neutral distractor appearance and begin bouncing across the viewport, anchor your gaze near their geometric center point.",
      "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Track Parallel Trajectories Through Collisions",
      "text": "Maintain parallel peripheral attention across all target items throughout the duration, tracking them through 2D momentum deflections.",
      "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Identify and Click Original Targets",
      "text": "When motion ceases in the identification phase, click all original target spheres (+20 PTS per target) to compute your accuracy rating.",
      "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Multiple Object Tracking (MOT) test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Multiple Object Tracking (MOT) test is a classical cognitive psychophysics paradigm invented by Zenon Pylyshyn and Ron Storm (1988). It evaluates the brain's capacity to maintain parallel spatial indexes on multiple moving target objects as they maneuver amongst visually identical moving distractors."
      }
    },
    {
      "@type": "Question",
      "name": "How many moving objects can the human visual system track simultaneously?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In healthy adults, typical multiple object tracking capacity is approximately 3 to 4 objects (Pylyshyn & Storm, 1988; Alvarez & Cavanagh, 2004). Highly trained individuals, including action video game players and professional athletes, can reliably track 5 to 7 independent items simultaneously (Green & Bavelier, 2006; Faubert, 2013)."
      }
    },
    {
      "@type": "Question",
      "name": "What are FINSTs (Visual Indexes) in visual psychology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FINSTs (short for 'Fingers of Instantiation') are pre-attentive spatial indexing mechanisms theorized by Zenon Pylyshyn (1988). They act like mental pointer tags that attach to moving visual entities, enabling the brain to track object identities and locations without requiring continuous focal foveation on each item."
      }
    },
    {
      "@type": "Question",
      "name": "How does multifocal attention operate across brain hemispheres?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research by Cavanagh & Alvarez (2005) demonstrated that visual attention is multifocal and distributed bilaterally across cerebral hemispheres. The left and right visual hemifields possess independent attentional tracking capacities; tracking items distributed across both hemifields yields significantly higher accuracy than crowding targets into a single hemifield."
      }
    },
    {
      "@type": "Question",
      "name": "What is the virtual polygon strategy in multi-object tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The virtual polygon strategy is an expert cognitive tracking technique where an observer mentally connects the target balls into an elastic, morphing polygon (triangle for 3 targets, quadrilateral for 4 targets). Tracking the deformation of the overall shape reduces cognitive load compared to tracking individual points independently (Alvarez & Cavanagh, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Why do athletes and action video gamers perform better on MOT tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Action gamers and high-level athletes possess broader spatial distribution of visual attention, enhanced temporal resolution in visual cortex, and superior distractor suppression (Green & Bavelier, 2006; Faubert, 2013). This allows them to track targets at higher velocities with less degradation during dense collision events."
      }
    },
    {
      "@type": "Question",
      "name": "How do movement speed and collision density affect tracking accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tracking accuracy decreases non-linearly as target velocity increases or spatial crowding intensifies. Close proximity between a target and distractor forces the visual system into fine spatial discrimination, increasing the probability of attentional slip and accidental identity swap."
      }
    },
    {
      "@type": "Question",
      "name": "What causes 'identity swaps' during multi-target tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An identity swap occurs when a target and a distractor pass within critical spatial proximity (crowding threshold). The receptive fields of spatial tracking neurons blur the distinction between items, causing the attentional FINST pointer to accidentally latch onto the passing distractor upon divergence."
      }
    },
    {
      "@type": "Question",
      "name": "Can multiple object tracking capacity be improved with practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Neuroplastic adaptation through consistent MOT drill sessions strengthens parietal-frontal attentional networks, optimizes centroid fixation discipline, and increases tracking speed thresholds across consecutive training sessions (Faubert, 2013)."
      }
    },
    {
      "@type": "Question",
      "name": "Is this Multiple Object Tracking test free, and is my data private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Multiple Object Tracking test on SkillDrills is 100% free with no registration, subscriptions, or paywalls. All tracking performance data, peak accuracy metrics, and session scores are stored strictly within your local browser storage and are never uploaded to external servers."
      }
    }
  ]
};

const multipleTargetsGuide = {
  heading: "The Psychophysics & Cognitive Science of Multiple Object Tracking (MOT)",
  intro: [
    "Multiple Object Tracking (MOT) is a foundational cognitive psychophysics paradigm first formalized by Zenon Pylyshyn and Ron Storm (1988) to investigate how the human visual architecture maintains real-time spatial representations of independent moving items. Real-world visual environments—such as fast team sports, chaotic driving intersections, and tactical gaming—rarely present solitary focal stimuli; instead, they demand continuous parallel monitoring of multiple entities dispersed across the visual field.",
    "Prior to the MOT paradigm, classical models of visual attention posited a single movable 'spotlight' that sequentially scanned items. Pylyshyn and Storm demonstrated that human observers can track 4 to 5 identical moving items in parallel without scanning, establishing the theory of visual indexing ('FINSTs' or Fingers of Instantiation). FINSTs function as pre-attentive mental pointers that stick to objects and continuously track their spatial coordinates through dense motion, independent of object properties like color or shape.",
    "Subsequent neuroimaging and psychophysical research by Patrick Cavanagh and George Alvarez (2004, 2005) revealed that attentional tracking is mediated by independent multifocal spotlights divided across the left and right cerebral hemispheres. When target objects are distributed across both visual hemifields, tracking capacity is substantially higher than when all targets are confined to a single hemifield, demonstrating that each hemisphere possesses dedicated tracking resources.",
    "In applied performance research, Daphne Bavelier and C. Shawn Green (2006) showed that action video game players exhibit significantly expanded MOT tracking capacities, successfully tracking 6 to 7 simultaneous items compared to 3 to 4 for non-gamers. Similarly, Jocelyn Faubert (2013) demonstrated that elite professional athletes (NHL, English Premier League) possess extraordinary 3D-MOT dynamic scene tracking abilities that rapidly adapt to escalating kinematic velocity, linking MOT capacity directly to elite spatial decision-making under pressure."
  ],
  benchmarks: {
    title: "Multiple object tracking bands (editorial guide)",
    headers: ["Performance Band", "Effective Capacity", "Score & Accuracy Threshold", "Visual Attention & Cognitive Profile"],
    rows: [
      ["Tier 1: Apex Multifocal Tracker", "5+ Targets Parallel", "Score: 60 PTS (3/3) | 100% Accuracy (Max Speed)", "Pro-grade parallel visual indexing; flawless bilateral hemifield distribution with zero collision desynchronization. Typical of elite pro gamers, fighter pilots, and pro athletes (Faubert, 2013; Green & Bavelier, 2006)."],
      ["Tier 2: Advanced Parallel Indexer", "4 Targets Parallel", "Score: 50 – 59 PTS | 85 – 99% Accuracy", "Robust multifocal tracking; successfully maintains target-distractor differentiation through dense collision trajectories with minimal centroid drift."],
      ["Tier 3: Competent Divided Attention", "3 Targets Parallel", "Score: 40 – 49 PTS | 70 – 84% Accuracy", "Standard adult tracking baseline; reliable 3-target tracking under moderate speeds, but susceptible to identity swaps during close spatial clustering."],
      ["Tier 4: Developing Spatial Memory", "2 Targets Parallel", "Score: 20 – 39 PTS | 50 – 69% Accuracy", "Tendency to collapse multifocal attention into a single wandering foveal spotlight; struggles to suppress distractors during high-velocity deflections."],
      ["Tier 5: Novice / Single-Target Focus", "1 Target Baseline", "Score: < 20 PTS | < 50% Accuracy", "Frequent target loss upon initial deflections; requires lower ball counts and reduced velocities to develop pre-attentive index anchoring."]
    ],
    note: "These performance tiers represent an editorial benchmark grounded in multiple object tracking psychophysics and visual working memory literature (Pylyshyn & Storm, 1988; Cavanagh & Alvarez, 2005; Alvarez & Cavanagh, 2004; Green & Bavelier, 2006; Faubert, 2013; Woods et al., 2015). Individual performance scales with velocity, distractor density, and tracking duration."
  },
  techniques: {
    title: "How to train multiple object tracking",
    items: [
      {
        name: "Centroid Gaze Anchoring (Cavanagh & Alvarez, 2005)",
        desc: "Attempting to saccade rapidly between moving targets degrades tracking accuracy due to saccadic suppression (Cavanagh & Alvarez, 2005).",
        tips: "Fixate your visual gaze near the geometric center (centroid) of the active target constellation, utilizing peripheral vision to monitor all targets simultaneously."
      },
      {
        name: "Virtual Deformable Polygon Grouping (Alvarez & Cavanagh, 2004)",
        desc: "Grouping independent targets into a single mental polygon reduces cognitive load on working memory (Alvarez & Cavanagh, 2004).",
        tips: "Mentally visualize elastic rubber bands connecting the 3 targets into a moving triangle. Track the stretching and rotation of the triangle rather than 3 isolated dots."
      },
      {
        name: "Proactive Collision De-Clustering (Pylyshyn & Storm, 1988)",
        desc: "Identity swaps occur when targets pass through the crowding zone of distractors, causing attentional pointers to slip (Pylyshyn & Storm, 1988).",
        tips: "When a target ball nears a distractor for an impending impact, momentarily focus attentional gain on that specific trajectory until the bounce resolves."
      },
      {
        name: "Bilateral Hemifield Balancing (Hemispheric Independence)",
        desc: "Each cerebral hemisphere possesses independent attentional tracking resources; distributing targets across both visual fields optimizes capacity.",
        tips: "Sit directly centered before your monitor so the visual scene is evenly split across left and right hemifields, maximizing dual-hemisphere processing."
      }
    ]
  },
  steps: [
    "Configure tracking duration (15s to 60s), ball velocity, and total ball count in session options.",
    "Click Start Drill and memorize the green highlighted target balls during the 2-second preview.",
    "As the targets turn neutral and begin bouncing, anchor your gaze centrally and track them in parallel.",
    "When movement halts, click or tap each sphere you believe was an original target (+20 PTS per target).",
    "Review your final accuracy percentage, target detection count, and cognitive performance tier."
  ],
  audience: "MOBA and tactical FPS gamers, team sports athletes (soccer, basketball, hockey), martial artists, drone pilots, air traffic controllers, and individuals seeking to expand divided visual attention and working memory.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('pylyshyn1988', 'cavanagh2005', 'alvarez2004', 'green2006', 'faubert2013', 'woods2015'),
  related: [
    { href: "/drills/visual/tracking-accuracy/moving-target", label: "Moving Target Intercept" },
    { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "Smooth Pursuit Tracker" },
    { href: "/drills/visual/reaction-speed/light-reaction", label: "Light Reaction Reflex Test" },
    { href: "/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go Impulse Test" },
    { href: "/drills/visual/depth-perception/distance-judgment", label: "Distance Judgment Depth Test" },
    { href: "/drills/visual/visual-recognition/entropic-grid", label: "Entropic Grid Search" }
  ]
};

export default function GhostLinkPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <GhostLinkClient copy={{ title: "Multiple Object Tracking Test" }} />
      <DrillGuide guide={multipleTargetsGuide} />
    </>
  );
}
