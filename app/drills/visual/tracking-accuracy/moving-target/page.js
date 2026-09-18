import KineticInterceptClient from './KineticInterceptClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — moving-target (visual-moving-target)
// PRIMARY:  "moving target tracking test"    — High-intent visual pursuit & tracking query (~1,200 searches/mo)
//           "moving target test"             — Broad dynamic visual acuity query
//           "moving target click test"       — Gamified target interception query
// SECONDARY / LSI:
//           "target tracking drill"          — Systematic visual tracking protocol
//           "kinetic visual tracking game"   — Interactive motor tracking query
//           "visual pursuit tracking"        — Smooth pursuit optometric query
//           "kinetic intercept drill"        — Ballistic intercept training query
//           "hand-eye tracking game"         — Motor coordination query
//           "smooth pursuit eye test"        — Neuro-ophthalmology pursuit search
//           "dynamic visual tracking test"   — Sports vision evaluation term
//           "moving target aim trainer"      — Competitive esports aim query
//           "ballistic intercept test"       — Predictive trajectory interception term
// LOCALES:
//           ja: "動体視力 テスト" (Dōtai Shiryoku Tesuto — Dynamic visual acuity test)
//           ko: "동체시력 테스트" (Dongche Siryeok Test — Kinetic visual tracking test)
//           de: "bewegliches ziel test" (Moving target tracking test in German)
// ============================================================

export const metadata = {
  title: "Moving Target Tracking Test - Free Visual Intercept Drill",
  description: "Free moving target tracking test. Follow and intercept targets on accelerating trajectories to measure smooth pursuit and velocity prediction.",
  keywords: [
    "moving target tracking test",
    "moving target test",
    "moving target click test",
    "target tracking drill",
    "kinetic visual tracking game",
    "visual pursuit tracking",
    "kinetic intercept drill",
    "hand-eye tracking game",
    "smooth pursuit eye test",
    "dynamic visual tracking test",
    "moving target aim trainer",
    "ballistic intercept test",
    "visual tracking online",
    "esports aiming drill"
  ],
  openGraph: {
    title: "Moving Target Tracking Test - Free Visual Intercept Drill | SkillDrills",
    description: "Train kinetic visual tracking, smooth pursuit eye movements, and motor interception accuracy with this free online moving target drill.",
    type: "website",
    url: "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Target Tracking Test - Free Visual Intercept Drill | SkillDrills",
    description: "Train visual pursuit tracking speed, dynamic target interception, and hand-eye coordination online. Free browser-based kinetic drill.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target",
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/moving-target'),
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
    { "@type": "ListItem", "position": 5, "name": "Moving Target Intercept Test", "item": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Moving Target Intercept Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Interactive kinetic visual tracking drill measuring smooth pursuit eye movements, trajectory extrapolation, and motor interception accuracy on accelerating 2D targets.",
  "featureList": [
    "Dynamic target trajectory physics with boundary collision bounce vectors",
    "Millisecond hit chronometry and combo multiplier scaling",
    "Escalating movement speed and shrinking target hitboxes across continuous levels",
    "Client-side local performance storage with zero external telemetry"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Moving Target Intercept Test — Online Visual Tracking Drill | SkillDrills",
  "alternateName": "Moving Target Pro",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target",
  "dateModified": "2026-09-05",
  "description": "Free online kinetic target tracking drill. Intercept accelerating target spheres traveling across a 2D bounding viewport with dynamic difficulty scaling.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with HTML5 Canvas support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Smooth Pursuit Tracking, Dynamic Visual Acuity, Velocity Extrapolation, Ballistic Interception, Closed-Loop Motor Correction"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Moving Target Intercept Test",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target",
  "description": "Free moving target intercept drill. Track, anticipate, and click dynamic moving targets to measure visual tracking accuracy and smooth interception.",
  "genre": ["Action", "Aim Trainer", "Visual Tracking"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train with the Moving Target Intercept Test",
  "dateModified": "2026-09-05",
  "description": "Step-by-step instructions to train visual pursuit tracking, trajectory prediction, and motor interception accuracy using the Moving Target drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Acquire the Kinetic Target",
      "text": "Locate the moving sphere as it spawns and lock your foveal gaze onto its centroid to establish smooth pursuit tracking.",
      "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Predict Trajectory Vector & Boundary Bounces",
      "text": "Anticipate the target's forward velocity and angle of reflection off viewport borders, leading the target slightly ahead of its current position.",
      "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute Ballistic Intercept Click",
      "text": "Click or tap cleanly on the target hitbox before the shift interval expires (+150 PTS × Combo × Level multiplier and +0.6s added clock).",
      "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintain Combo Streak Under Escalating Pace",
      "text": "Sustain precision as movement velocity accelerates and hitbox size contracts, avoiding misclicks to protect your combo multiplier.",
      "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target#step-4"
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
      "name": "What is the Moving Target Intercept Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Moving Target Intercept Test is a specialized visual psychophysics drill designed to assess and train dynamic smooth pursuit eye movements, spatial trajectory prediction, and closed-loop motor interception accuracy. Users intercept 2D bouncing target spheres traveling at variable velocities across a bounding canvas."
      }
    },
    {
      "@type": "Question",
      "name": "How does the brain track and intercept a moving visual target?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tracking a moving target engages a distributed sensorimotor network: visual motion signals detected by retinal ganglion cells pass through the middle temporal area (MT/V5) to compute target direction and velocity. The frontal eye fields (FEF) and cerebellum modulate oculomotor motor neurons to match eye speed with target speed, while the parietal cortex plans a predictive ballistic hand-eye motor strike."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between smooth pursuit and saccadic eye movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As established by Rashbass (1961), smooth pursuit and saccadic eye movements operate via distinct physiological control systems. Smooth pursuit is an involuntary, closed-loop tracking response driven by retinal slip velocity (up to 30–40 deg/s) that keeps a moving object clear on the fovea. Saccades are rapid, ballistic jumps (up to 900 deg/s) driven by positional displacement to re-acquire off-center targets."
      }
    },
    {
      "@type": "Question",
      "name": "Why is leading the target necessary in visual intercept drills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Human sensorimotor latency introduces an unavoidable delay of 150 ms to 220 ms between detecting target position and physically actuating a mouse click or screen tap. During this latency window, an object moving at 500 px/s travels over 100 pixels. To hit the target, your motor planning system must predictively aim ahead of the current position (Land & McLeod, 2000)."
      }
    },
    {
      "@type": "Question",
      "name": "What velocity limits exist for human smooth pursuit eye tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "According to Bahill et al. (1980) and Krauzlis (2004), human smooth pursuit functions optimally for target velocities below 30 deg/s. When target speeds exceed this threshold or acceleration shifts unpredictably, pursuit gain drops below 1.0, forcing the brain to generate corrective catch-up saccades to reposition the fovea on the target."
      }
    },
    {
      "@type": "Question",
      "name": "Can visual tracking speed and dynamic visual acuity be improved with training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Repeated pursuit practice enhances visual motion processing in area MT/V5, tightens cerebellar gain calibration, and reduces intercept latency. Studies in sports vision and action video game play demonstrate that dynamic visual acuity and trajectory interception can be significantly refined through deliberate training."
      }
    },
    {
      "@type": "Question",
      "name": "How do monitor refresh rates (60 Hz vs 144 Hz vs 240 Hz) affect target tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 60 Hz display updates target position every 16.7 ms, creating visible visual stutter (motion judder) and higher retinal slip error. A 144 Hz (6.9 ms) or 240 Hz (4.1 ms) high-refresh monitor renders fluid continuous motion, providing more frequent visual position samples that allow for smoother ocular tracking and higher hit accuracy (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "How does target acceleration impact hit accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The human visual system tracks constant-velocity motion with high predictive gain. However, sudden changes in velocity or direction (such as bouncing off viewport walls) invalidate prior trajectory models, inducing a 150–200 ms latency before corrective saccades and motor trajectory updates can occur."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between open-loop and closed-loop visual-motor control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In moving target interception, the initial phase of tracking (~100 ms) is open-loop, meaning the ballistic movement is launched based purely on initial sensory estimates without feedback. Subsequent trajectory adjustments are closed-loop, where ongoing visual feedback continuously corrects motor cursor error until contact is made."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Moving Target Pro drill free and is my score private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Moving Target Intercept Test on SkillDrills is 100% free with no registration, ads, or paywalls. All performance analytics, peak scores, and combo streaks are stored strictly within your browser's localStorage and are never sent to external servers."
      }
    }
  ]
};

const movingTargetGuide = {
  heading: "Kinetic Visual Tracking & Trajectory Interception Science",
  intro: [
    "Dynamic target interception is an essential perceptual-motor capability across fast-paced sports, aviation, martial arts, and competitive esports. Successfully striking an accelerating, non-linear moving object requires simultaneous execution of smooth pursuit eye movements, predictive trajectory extrapolation, and precise closed-loop motor timing.",
    "The neurobiology of visual motion tracking originates in specialized directionally-selective neurons in the middle temporal visual area (MT/V5) and medial superior temporal area (MST). These cortical regions compute target velocity vectors and transmit feedforward signals to the frontal eye fields (FEF) and the dorsolateral pontine nucleus, which in turn drive cerebellar purkinje cells to maintain ocular pursuit gain (Krauzlis, 2004).",
    "In his classic psychophysical paper, Rashbass (1961) demonstrated that smooth pursuit and saccadic eye movements operate under independent control mechanisms: pursuit is modulated by target retinal velocity error, whereas saccades correct positional displacement. When targets accelerate beyond 30 to 40 deg/s or ricochet off viewport boundaries, smooth pursuit gain degrades, necessitating rapid corrective catch-up saccades (Bahill et al., 1980).",
    "Furthermore, research by Land & McLeod (2000) on athletic ball striking shows that human experts do not continuously track an object through its entire trajectory; instead, they make anticipatory saccades to future bounce points and intercept windows. This drill trains that exact predictive spatial capability under millisecond temporal pressure."
  ],
  benchmarks: {
    title: "Moving target intercept bands (editorial guide)",
    headers: ["Performance Band", "Shift Pace Window", "Score & Combo Threshold", "Visual Tracking & Intercept Profile"],
    rows: [
      ["Tier 1: Apex Kinetic Interceptor", "< 0.25s Shift Pace", "Score: 16,000+ | Combo 25x+", "Pro-grade smooth pursuit; flawless velocity extrapolation with zero catch-up saccade latency. Found in elite FPS pros and fighter pilots."],
      ["Tier 2: Advanced Dynamic Tracker", "0.25 – 0.45s Shift Pace", "Score: 10,500 – 15,999 | Combo 16x+", "Fluid ocular pursuit; rapid closed-loop motor corrections with minimal trajectory overshooting across accelerating targets."],
      ["Tier 3: Competent Visual Pursuit", "0.46 – 0.70s Shift Pace", "Score: 6,000 – 10,499 | Combo 9x+", "Reliable tracking baseline; consistent intercept timing on linear paths with minor recovery delay during sudden boundary bounces."],
      ["Tier 4: Developing Kinetic Tracker", "0.71 – 1.00s Shift Pace", "Score: 2,500 – 5,999 | Combo 4x+", "Relies heavily on reactive catch-up saccades rather than predictive pursuit; noticeable tracking hesitation at high speeds."],
      ["Tier 5: Novice / High Tracking Jitter", "> 1.00s Shift Pace", "Score: < 2,500 | Combo < 4x", "Pronounced motor overshooting; difficulty maintaining continuous foveation on moving targets; requires baseline pursuit stabilization."]
    ],
    note: "These performance tiers represent an editorial benchmark grounded in smooth pursuit psychophysics and dynamic intercept chronometry (Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000; Bahill et al., 1980; Woods et al., 2015). Individual scores scale with monitor refresh rates, mouse polling, and motor fatigue."
  },
  techniques: {
    title: "How to train target interception",
    items: [
      {
        name: "Predictive Vector Leading (Rashbass Velocity Matching)",
        desc: "Because human sensorimotor latency requires 150–220 ms from perception to click, clicking directly on the current target coordinates causes trailing misses (Rashbass, 1961).",
        tips: "Extrapolate the velocity vector and click 5–15 pixels ahead of the moving sphere along its current directional path."
      },
      {
        name: "Boundary Bounce Anticipation (Land & McLeod Saccadic Anchoring)",
        desc: "Land & McLeod (2000) proved that elite hitters shift their gaze to predicted bounce locations ahead of the projectile rather than following it through the bounce.",
        tips: "As the target approaches a canvas border, jump your cursor toward the predicted angle of reflection rather than chasing it into the wall."
      },
      {
        name: "Continuous Retinal Slip Stabilization (Krauzlis Pursuit Loop)",
        desc: "Smooth pursuit requires keeping the moving target centered on the fovea to eliminate retinal slip and maximize visual acuity (Krauzlis, 2004).",
        tips: "Glide your eye gaze continuously with the target rather than fixating on stationary grid coordinates and waiting for it to cross."
      },
      {
        name: "Rhythmic Decoupling & Trigger Discipline",
        desc: "Unpredictable target waveforms induce catch-up saccades (Bahill et al., 1980); speculative spam clicking breaks streaks and drops time under penalties.",
        tips: "Do not spam clicks at a rhythmic cadence. Confirm spatial overlap between crosshair and hitbox before actuating the click."
      }
    ]
  },
  steps: [
    "Click Start Drill to begin the 45-second kinetic interception round.",
    "Acquire the moving target sphere with your eyes and establish continuous smooth pursuit tracking.",
    "Predict the trajectory vector and lead the target slightly ahead of its path.",
    "Click or tap the sphere cleanly before the shift interval expires (+150 PTS × Multiplier and +0.6s time extension).",
    "Review your final intercept count, peak accuracy, and performance tier at session completion."
  ],
  audience: "Competitive FPS and MOBA gamers, combat sports athletes, racquet sport players, motorsports drivers, drone pilots, and anyone training dynamic visual tracking.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'land2000', 'bahill1980', 'woods2015'),
  related: [
    { href: "/drills/visual/tracking-accuracy/multiple-targets", label: "Multiple Object Tracking" },
    { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "Smooth Pursuit Tracker" },
    { href: "/drills/visual/reaction-speed/light-reaction", label: "Light Reaction Reflex Test" },
    { href: "/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go Impulse Test" },
    { href: "/drills/visual/depth-perception/distance-judgment", label: "Distance Judgment Depth Test" },
    { href: "/drills/visual/visual-recognition/entropic-grid", label: "Entropic Grid Search" }
  ]
};

export default function KineticInterceptPage() {
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
      <KineticInterceptClient copy={{ title: "Moving Target Intercept Test" }} />
      <DrillGuide guide={movingTargetGuide} />
    </>
  );
}