import FPSTrackingTrainerWrapper from './FPSTrackingTrainerWrapper';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — fps-tracking-trainer
// PRIMARY: "fps tracking trainer" — 0 exact / 0 broad US, 0 exact GB (Bing API 2026-09-04)
//          "aim tracking trainer" — unverified niche phrase
// SECONDARY / LSI:
//   "strafe tracking aim" / "smooth pursuit aim"
// ============================================================

export const metadata = {
  title: 'FPS Tracking Trainer - Smooth Aim & Strafe Practice',
  description: 'Free FPS tracking trainer. Practice smooth aim and strafe tracking on moving targets to build consistent crosshair control for CS2 and Valorant.',
  keywords: [
    'fps tracking trainer', 'aim tracking trainer', 'best tracking aim trainer',
    'strafe tracking aim', 'aim trainer tracking', 'shaky aim fix',
    'how to track aim', 'reactive tracking scenarios', 'smoothness routine aim',
    'how to improve tracking aim', 'why is my tracking aim shaky',
    'how to make aim tracking smoother', 'apex legends tracking routine',
    'strafe tracking drills for fps', 'online mouse tracking trainer',
    'free aim trainer browser', 'gaming reflex test', 'hand eye coordination gaming'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'FPS Tracking Trainer - Smooth Aim & Strafe Practice',
    description: 'Train smooth aim and strafe tracking with this free FPS Tracking Trainer. Fix shaky aim, practice reactive tracking scenarios, and improve your target tracking.',
    url: 'https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FPS Tracking Trainer - Smooth Aim & Strafe Practice',
    description: 'Fix shaky aim and practice reactive target tracking. Free, browser-based FPS tracking trainer with no downloads.',
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
    { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/reaction-speed" },
    { "@type": "ListItem", "position": 4, "name": "FPS Tracking Trainer", "item": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FPS Tracking Trainer — Smooth Aim & Strafe Practice | SkillDrills",
  "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer",
  "description": "Stabilize horizontal gaze pursuit against erratic, human-like target strafes to improve reflex response and tracking accuracy.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Aim Tracking, Smooth Pursuit, Reactive Mouse Control, Saccadic Re-acquisition, Hand-Eye Coordination",
  "dateModified": "2026-09-05"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Improve Tracking Aim",
  "description": "Improve your mouse tracking smoothness and reactivity against erratic horizontal strafing targets.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Configure sensitivity and start",
      "text": "Open the FPS Tracking Trainer page. Set your sensitivity parameters if applicable, and hit Begin Drill to launch the target space."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Look at the target core",
      "text": "Keep your focus strictly centered on the target circle itself rather than staring at your crosshair. Let your peripheral vision align the crosshair while your central vision tracks movement."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Follow target movements smoothly",
      "text": "Hold down your mouse button (or press spacebar/screen tap) and keep your cursor centered on the target. Relax your hand and arm to minimize muscle jitter. Track the target as it changes directions."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "React, don't predict",
      "text": "Do not try to guess when the target will change direction. Wait for the visual cue of direction reversal and execute a smooth motor correction rather than flicking erratically."
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
      "name": "What is an FPS tracking trainer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An FPS tracking trainer is a specialized aim training tool designed to build smooth pursuit ocular tracking and motor control. It trains players to keep their crosshair centered on continuously moving and strafing targets without jittering or losing foveal lock."
      }
    },
    {
      "@type": "Question",
      "name": "How do you get better at tracking in FPS games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improving tracking requires three disciplines: lowering grip tension to avoid isometric micro-stutters, reading target velocity rather than guessing reversals, and establishing consistent motor control across both wrist articulation (fine tracking) and arm pivots (wide sweeping glides)."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my tracking aim shaky or jittery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shaky tracking aim is primarily caused by excessive muscle tension (clenching the mouse during tense duels), using an excessively high sensitivity that amplifies natural micro-tremors, or trying to micro-flick to correct errors rather than executing smooth pursuit glides."
      }
    },
    {
      "@type": "Question",
      "name": "Should you look at the crosshair or the target when tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Look directly at the target character model. According to visual psychophysics (Krauzlis, 2004), visual attention must remain centered on target motion features to compute velocity vectors accurately. Staring at your crosshair introduces cognitive latency and degrades velocity-matching feedback loops."
      }
    },
    {
      "@type": "Question",
      "name": "What is smooth pursuit in aim training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth pursuit is the ocular motor system's ability to match eye velocity to target velocity, keeping moving objects stabilized on the fovea. Research by Rashbass (1961) demonstrated that smooth pursuit is driven by velocity error, whereas saccades are driven by positional displacement error."
      }
    },
    {
      "@type": "Question",
      "name": "What sensitivity is best for tracking aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most professional FPS tracking specialists recommend a moderate sensitivity between 28 cm and 45 cm per 360-degree rotation. This range provides sufficient micro-precision for distance tracking while permitting fluid, unconstrained arm movements for close-range directional strafes."
      }
    },
    {
      "@type": "Question",
      "name": "Does high monitor refresh rate help tracking aim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Higher display refresh rates (144Hz, 240Hz, 360Hz) decrease frame presentation intervals (e.g. 16.7 ms at 60 Hz down to 4.1 ms at 240 Hz), significantly reducing motion blur and display quantization latency. This allows the human visual system to detect target deceleration cues earlier."
      }
    },
    {
      "@type": "Question",
      "name": "How do you practice strafe tracking effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus on reactive strafe scenarios where targets change direction randomly. Do not try to anticipate or predict turn timings; instead, patiently wait for the visual confirmation of a direction change and execute a controlled, non-panicked motor redirection."
      }
    },
    {
      "@type": "Question",
      "name": "How long should you train tracking aim each day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aim training research suggests 15 to 25 minutes of focused, deliberate practice per day is optimal. Extended sessions past 45 minutes typically produce neuromuscular fatigue, reinforcing sloppy micro-flicking habits rather than clean, tension-free smooth pursuit."
      }
    },
    {
      "@type": "Question",
      "name": "Is this FPS tracking trainer drill free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SkillDrills' FPS Tracking Trainer is 100% free, runs client-side directly in your browser with zero downloads or registration, and timestamps every event with the High Resolution Time API (performance.now()). Note that browser clocks are deliberately coarsened for security, so treat differences smaller than about 5 ms as measurement noise rather than a real change in your speed."
      }
    }
  ]
};

const fpsTrackingGuide = {
  heading: "FPS Tracking Trainer Guide: Mastering Smooth Pursuit Aim & Reactive Strafe Tracking",
  intro: [
    "Tracking aim is the mechanical ability to keep your crosshair centered on an enemy moving across your field of view. While flick aiming requires a single explosive adjustment, tracking requires continuous neuromuscular feedback—your eyes must read the target's velocity, your brain must calculate trajectory changes, and your hand must execute micro-adjustments without jitter.",
    "Neurophysiological research into the human ocular motor system distinguishes between smooth pursuit and saccadic movements. As established by Rashbass (1961) in landmark step-ramp experiments, smooth pursuit is driven by velocity error—continuously matching gaze speed to target velocity—whereas saccades correct positional displacement. Krauzlis (2004) demonstrated that smooth pursuit relies on reciprocal cortical and cerebellar feedback loops to stabilize retinal images on the fovea. Furthermore, Green & Bavelier (2003) demonstrated that action video game players exhibit enhanced visual attention and superior multiple-object spatial tracking capabilities.",
    "This drill executes entirely in your browser using the HTML5 Canvas 2D API and the browser's requestAnimationFrame loop. High-precision event timestamps are recorded using the High Resolution Time API (performance.now()). Browser timer resolution is deliberately coarsened as a Spectre mitigation -- typically to about 1 ms in current browsers -- and display refresh adds its own quantization: ~16.7 ms per frame at 60 Hz, ~6.9 ms at 144 Hz and ~4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling contributes a further ~8 ms at 125 Hz versus ~1 ms at 1000 Hz. In practice that means this drill resolves real differences of roughly 5 ms and upward; anything finer is noise, not progress. This FPS tracking trainer isolates smooth pursuit and reactive direction changes without the visual clutter of gun models or map geometry.",
    "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
  ],
  benchmarks: {
    title: "FPS Tracking Aim Performance Reference Tiers",
    headers: ["Tracking Accuracy", "Skill Tier", "Equivalent Game Rank", "Mechanical Characteristics", "Key Training Need"],
    rows: [
      ["> 75%", "Grandmaster / Pro", "Predator / Top 500 / Radiant", "Zero visual hesitation on direction change; buttery smooth motor output", "Maintain stamina through extended high-velocity tracking duels"],
      ["60% – 74%", "Diamond / Master", "Master / Immortal", "Clean tracking on predictable glides with minor recovery delay on reversals", "Shorten direction-swap reaction latency"],
      ["45% – 59%", "Platinum / Gold", "Diamond / Platinum", "Adequate tracking on smooth strafes; tendency to jitter or over-correct", "Focus on smoothness routines to eliminate hand tension"],
      ["30% – 44%", "Silver / Bronze", "Gold / Silver", "Frequent crosshair detachment; reactive trailing behind the target", "Lower mouse sensitivity and practice read-before-move"],
      ["< 30%", "Beginner", "Bronze / Iron", "Erratic snapping rather than smooth tracking; constant overshoots", "Establish consistent mouse grip and arm-pivot ergonomics"]
    ],
    note: "These accuracy benchmarks represent an editorial reference guide for continuous visual tracking drills. Scores vary with mouse DPI, in-game sensitivity conversion, and monitor refresh rate."
  },
  techniques: {
    title: "Core Aim Tracking Disciplines",
    items: [
      {
        name: "Smooth Pursuit vs. Micro-Flicking",
        desc: "Smooth pursuit is the continuous matching of crosshair velocity to target velocity. Resist the urge to micro-flick back onto the target when you fall slightly behind; instead, smoothly accelerate your tracking speed.",
        tips: "Breathe steadily and consciously relax your grip hand to avoid micro-stuttering."
      },
      {
        name: "Reading Strafe Acceleration Cues",
        desc: "Human and in-game targets cannot reverse direction instantaneously without decelerating. Learning to recognize deceleration cues allows you to anticipate the turnaround rather than reacting purely after the reversal occurs.",
        tips: "Focus your foveal vision directly on the leading edge of the target."
      },
      {
        name: "Arm Pivot vs. Wrist Tracking",
        desc: "Long, sweeping target strafes require arm movement pivoted from the elbow or shoulder, while fine tracking corrections require wrist and fingertip articulation.",
        tips: "Keep your forearm resting comfortably on your mousepad to maintain uniform friction."
      },
      {
        name: "Hardware & Polling Rate Calibration",
        desc: "Tracking reveals sensor jitter and mousepad inconsistencies. A 1000Hz+ mouse sensor, clean PTFE skates, and a high-refresh display (144Hz+) drastically improve tracking clarity.",
        tips: "Match your drill sensitivity to your primary competitive shooter sensitivity using standard 360-distance formulas."
      }
    ]
  },
  steps: [
    "Select your target speed and difficulty mode, then launch fullscreen.",
    "Center your crosshair on the moving target and press Start Drill.",
    "Match the target's velocity with smooth, continuous cursor movement.",
    "When the target reverses direction, smoothly redirect your crosshair without panic flicking.",
    "Review your session tracking percentage, time on target, and accuracy stability across levels."
  ],
  audience: "FPS competitive players (CS2, Valorant, Apex Legends, Overwatch 2, The Finals), aim training enthusiasts, and gamers seeking to eliminate shaky, jittery aim.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  // Works named in this page's copy, with DOIs so a reader or an answer
  // engine can check the figures rather than take them on trust.
  sources: pickSources('krauzlis2004', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/drills/reaction-speed/reaction-time-test", label: "Reaction Time Test" },
    { href: "/drills/reaction-speed/visual-tracking-speed-test", label: "Visual Tracking Speed Test" },
    { href: "/drills/reaction-speed/reaction-game", label: "Reaction Game" },
    { href: "/drills/reaction-speed/saccadic-gallery", label: "Saccadic Eye Exercises" }
  ]
};

export default function FPSTrackingTrainerPage() {
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
      <FPSTrackingTrainerWrapper />
      <DrillGuide guide={fpsTrackingGuide} />
    </>
  );
}
