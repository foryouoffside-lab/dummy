import DistanceJudgmentClient from './DistanceJudgmentClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — distance-judgment
// PRIMARY:  "depth perception test"         — Global high-intent term (~1,300 searches/mo)
//           "distance judgment test"        — Kinesthetic and intercept-specific query
// SECONDARY / LSI:
//           "depth perception test online"  — Direct browser search
//           "stereoscopic vision test"      — Binocular disparity term
//           "howard dolman test"            — Gold standard clinical two-rod apparatus (Howard, 1919)
//           "distance estimation test"      — Practical driver/pilot screening term
//           "stereopsis test online"        — Clinical binocular acuity term (Julesz, 1971)
//           "time to contact test"          — Ecological optical expansion term (Lee, 1976)
//           "intercept timing drill"        — Sports vision intercept term (Regan & Beverley, 1978)
// LOCALES:
//           ja: "深視力 テスト" (Shinshiryoku Tesuto — Japanese driver license depth test)
//           ko: "입체시 검사" (Ipchesi Geomsa — Korean stereopsis clinical test)
//           de: "tiefensehen test" (German depth perception test)
// ============================================================

export const metadata = {
  title: "Depth Perception Test - Free Online Distance Judgment Drill",
  description: "Free depth perception test. Judge how far away an approaching target is and intercept it in time, using optical expansion rather than stereo cues.",
  keywords: [
    "depth perception test",
    "depth perception test online",
    "distance judgment test",
    "stereoscopic vision test",
    "howard dolman test",
    "depth perception games",
    "how to test depth perception",
    "3d perception test",
    "distance estimation test",
    "stereopsis test online",
    "visual depth test",
    "depth perception training",
    "how to improve depth perception",
    "time to contact test",
    "intercept timing drill",
    "binocular vision test",
    "visual training online"
  ],
  openGraph: {
    title: "Depth Perception Test & Distance Judgment | SkillDrills",
    description: "Measure stereoscopic depth acuity and visual intercept timing with this free online 3D depth perception drill.",
    type: "website",
    url: "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Depth Perception Test & Distance Judgment | SkillDrills",
    description: "Train 3D stereoscopic depth perception and intercept timing online. Free browser-based distance judgment drill.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
    languages: getAlternateLanguages('/drills/visual/depth-perception/distance-judgment'),
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
    { "@type": "ListItem", "position": 4, "name": "Distance Judgment Depth Perception Test", "item": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Distance Judgment Depth Perception Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Interactive stereoscopic depth perception and distance judgment test measuring 3D optical looming intercept timing and relative spatial plane alignment.",
  "featureList": [
    "Millisecond looming velocity and distance estimation tracking",
    "Dynamic accelerating approach speeds from 2200ms to 500ms",
    "Percentage-based spatial depth deviation measurement (<5% Perfect, <12% Close)",
    "Strict client-side local performance storage with zero telemetry"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Distance Judgment Depth Perception Test — Online 3D Vision Drill | SkillDrills",
  "alternateName": "Distance Judgment Pro",
  "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
  "dateModified": "2026-09-05",
  "description": "Free online stereoscopic depth perception test. Intercept approaching 3D targets at the calibrated depth plane under progressive speed scaling.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with HTML5 Canvas support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Stereoscopic Depth Perception, Time-to-Contact Estimation, Looming Optical Velocity Discrimination, Intercept Timing"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Distance Judgment Test — Depth Perception Simulator",
  "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
  "description": "Interactive 3D depth perception and distance judgment simulator. Train stereoscopic visual alignment and binocular parallax.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Visual Training", "Depth Perception", "Distance Judgment"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take the Distance Judgment Depth Perception Test",
  "dateModified": "2026-09-05",
  "description": "Step-by-step procedure to measure and train visual depth estimation and looming intercept timing.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment#step-1",
      
      "name": "Anchor Visual Gaze on the Target Depth Ring",
      "text": "Fixate your visual attention on the cyan target depth ring located along the center of the perspective corridor."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment#step-2",
      
      "name": "Track the Looming Optical Expansion",
      "text": "Observe the 3D sphere as it spawns in the deep virtual distance and travels forward along the visual Z-axis."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment#step-3",
      
      "name": "Execute Intercept Tap at Coplanar Alignment",
      "text": "Click, tap, or press the Spacebar at the exact instant the expanding sphere's perimeter matches the reference ring's diameter."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment#step-4",
      
      "name": "Adapt to Progressive Velocity Scaling",
      "text": "As your score advances, approach velocity accelerates from 2,200 ms down to 500 ms, testing rapid temporal-to-spatial calibration."
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
      "name": "What is the distance judgment depth perception test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The distance judgment depth perception test is a psychophysical vision test designed to evaluate an individual's ability to perceive relative distance, estimate optical looming velocity, and intercept moving objects at a calibrated spatial depth plane in 3D space."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Howard-Dolman test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Invented by Harvey J. Howard in 1919 and refined with Arthur Dolman, the Howard-Dolman test is the classic apparatus used in aviation and clinical optometry to measure stereoscopic depth acuity. It requires a subject to adjust two vertical rods viewed through an aperture until they appear equidistant from the observer."
      }
    },
    {
      "@type": "Question",
      "name": "What is stereoscopic depth perception?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stereoscopic depth perception (stereopsis) is the neurological process by which the visual cortex combines two slightly different 2D retinal images from each eye (binocular disparity) into a single unified 3D perceptual model with true depth and volume."
      }
    },
    {
      "@type": "Question",
      "name": "How does the brain calculate distance and time-to-contact?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As established by David N. Lee (1976), the brain calculates time-to-contact (TTC) using the optical variable tau (τ)—the ratio of an object's current retinal image size to its rate of optical expansion. Specialized cortical looming detectors in visual area V3A/MT compute this expansion without requiring conscious distance calculation (Regan & Beverley, 1978)."
      }
    },
    {
      "@type": "Question",
      "name": "Can you improve depth perception with training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While structural binocular alignment is physiological, perceptual sensitivity to optical expansion cues, motion parallax, looming acceleration, and interceptive motor timing can be significantly sharpened through dedicated visual psychophysical training."
      }
    },
    {
      "@type": "Question",
      "name": "What causes poor depth perception?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Impaired depth perception commonly stems from strabismus (eye misalignment), amblyopia ('lazy eye'), significant unequal refractive errors (anisometropia), loss of binocular vision in one eye, or neuro-visual processing delays in the visual cortex."
      }
    },
    {
      "@type": "Question",
      "name": "Is an online depth perception test diagnostic for clinical eye conditions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Online computer-screen depth drills evaluate dynamic visual-motor intercept timing and monocular/perspective depth cues. They do not replace formal clinical examinations such as the Titmus Stereotest, Randot Stereotest, or Howard-Dolman test administered by a licensed optometrist or ophthalmologist."
      }
    },
    {
      "@type": "Question",
      "name": "How does display refresh rate affect distance judgment tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard 60 Hz monitors introduce up to 16.7 ms of frame display quantization delay, which at high target approach velocities can cause spatial jumping of the sphere edge. High-refresh displays (144 Hz at ~6.9 ms, 240 Hz at ~4.1 ms) render smooth optical looming gradients, enabling more precise temporal interception (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good score on the distance judgment drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Achieving an average depth deviation below 8% with more than 10 Perfect intercepts (<5% error) and reaching Level 5 or higher represents superior depth perception and interceptive timing. Typical adult baseline scores average between 10% and 16% error."
      }
    },
    {
      "@type": "Question",
      "name": "Is this depth perception test completely free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Distance Judgment Depth Perception Test on SkillDrills is 100% free to play in any modern desktop or mobile web browser, with no account registration, subscriptions, or downloads required."
      }
    }
  ]
};

const distanceGuide = {
  heading: "Distance Judgment & Stereoscopic Depth Perception Standards",
  intro: [
    "Depth perception is the visual and neurological faculty that enables organisms to perceive the world in three dimensions and accurately judge the distance, spatial volume, and trajectory of objects. In dynamic sports (such as baseball, tennis, and motorsports), aviation, tactical driving, and competitive esports, split-second distance estimation determines the difference between a clean interception and a catastrophic collision.",
    "This drill operationalizes the classic Howard-Dolman stereoscopic apparatus (Howard, 1919) and ecological optical expansion theory (Lee, 1976; Regan & Beverley, 1978). By projecting a 3D target along a deep visual tunnel toward a stationary target depth plane, the drill trains your visual cortex to calculate looming velocity, visual expansion rate, and time-to-contact (TTC) under accelerating approach speeds.",
    "Timing & Measurement Methodology: All intercept deviations are captured client-side using the high-resolution performance.now() API. Deviation is computed as the relative percentage error (|Actual Diameter - Target Diameter| / Target Diameter). Hardware latency adds display quantization delay (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz, ~4.1 ms at 240 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1000 Hz), as documented by Woods et al. (2015). Compare runs on the same hardware setup for consistent longitudinal tracking.",
    "Data Transparency: SkillDrills collects zero personal data, diagnostic metrics, or aggregate telemetry. All scores, level progressions, and accuracy percentages remain stored strictly in your browser's local storage."
  ],
  benchmarks: {
    title: "Depth judgment and intercept bands (editorial guide)",
    headers: ["Performance Band", "Depth Deviation Error", "Score & Level Range", "Visual Neuromuscular Profile"],
    rows: [
      ["Tier 1: Apex Stereoscopic Master", "< 5.0% Mean Error", "Score: 1,500+ | Level 7+", "Elite optical looming sensitivity; flawless time-to-contact extraction and tightly timed trigger release."],
      ["Tier 2: Superior Depth Acuity", "5.0% – 9.9% Mean Error", "Score: 1,100 – 1,499 | Level 5–6", "High-tier spatial anticipation; smooth adaptation to high-speed target compression."],
      ["Tier 3: Solid Baseline Depth", "10.0% – 15.9% Mean Error", "Score: 750 – 1,099 | Level 3–4", "Healthy adult baseline; reliable depth alignment under moderate velocities, minor latency breakdown under peak speed."],
      ["Tier 4: Moderate Sensitivity", "16.0% – 25.0% Mean Error", "Score: 450 – 749 | Level 2", "Susceptible to optical illusions; tendency to trigger prematurely before full planar coincidence."],
      ["Tier 5: Developing / Monocular Bias", "> 25.0% Mean Error", "Score: < 450 | Level 1", "Substantial temporal estimation error; significant reliance on guessing rather than visual looming rate calculation."]
    ],
    note: "These tiers represent an editorial reference benchmark grounded in classical stereopsis and ecological motion-in-depth psychophysics (Howard, 1919; Lee, 1976; Regan & Beverley, 1978). Performance naturally varies with visual acuity, fatigue, display refresh rate, and monitor viewing distance."
  },
  techniques: {
    title: "How to train distance judgment",
    items: [
      {
        name: "Optical Looming Expansion Matching",
        desc: "As modeled by David N. Lee (1976) and David Regan & Kenneth I. Beverley (1978), the rate of visual expansion of an approaching object's retinal image directly encodes its time-to-contact (TTC).",
        tips: "Avoid tracking the center of the sphere; anchor your visual focus on the outer boundary of the sphere and execute your click the instant its edge aligns with the cyan target ring."
      },
      {
        name: "Foveal Gaze Anchoring on the Reference Plane",
        desc: "Visual pursuit of an approaching object induces micro-saccades and retinal slip. Keeping the fovea firmly locked onto the stationary depth ring provides a stable spatial frame of reference.",
        tips: "Fixate your eyes solidly on the target ring rather than following the moving sphere from the back of the tunnel forward."
      },
      {
        name: "Motor Decoupling & Anti-Anticipation Discipline",
        desc: "Under accelerating speeds, the visual motor system often triggers premature speculative responses due to anxiety over missing the window (Woods et al., 2015).",
        tips: "Maintain light fingertip tension on your mouse or touch screen. Inhale smoothly and trust visual contour confirmation before firing the motor impulse."
      },
      {
        name: "Hardware Latency & High-Refresh Calibration",
        desc: "At approach speeds below 800 ms, a 60 Hz monitor renders only ~48 distinct frames throughout the entire tunnel transit, introducing up to 16.7 ms of spatial quantization error (Woods et al., 2015).",
        tips: "For optimal depth calibration, use a 144 Hz or 240 Hz monitor to provide the visual cortex with maximum temporal motion frames."
      }
    ]
  },
  steps: [
    "Click Start Drill to initialize the 45-second distance judgment session.",
    "Fixate your gaze on the cyan reference ring positioned at the middle depth plane.",
    "Watch the 3D sphere as it spawns at the far end of the tunnel and accelerates toward you.",
    "Tap the screen, click the mouse, or press Spacebar at the exact moment the expanding sphere matches the target ring diameter.",
    "Review your precision feedback (<5% Perfect: +150 PTS, <12% Close: +100 PTS) and adapt to increasing speeds across 45 seconds."
  ],
  audience: "Competitive gamers in tactical and arena shooters, baseball/tennis/cricket players training ball-tracking depth acuity, drivers and pilots sharpening spatial distance estimation, and vision training practitioners.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('howard1919', 'lee1976', 'regan1978', 'julesz1971', 'woods2015'),
  related: [
    { href: "/drills/visual/tracking-accuracy/moving-target", label: "Moving Target Intercept" },
    { href: "/drills/visual/reaction-speed/light-reaction", label: "Light Reaction Test" },
    { href: "/drills/visual/tracking-accuracy/multiple-targets", label: "Multiple Object Tracking" },
    { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "Smooth Pursuit Tracker" },
    { href: "/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go Impulse Test" },
    { href: "/drills/visual/visual-recognition/entropic-grid", label: "Entropic Grid Search" }
  ]
};

const copyEn = {
  h1Keyword: "Distance Judgment Test",
  h1Suffix: " — Online Depth Perception Trainer",
};

export default function DistanceJudgmentPage() {
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
      <DistanceJudgmentClient copy={copyEn} />
      <DrillGuide guide={distanceGuide} />
      
    </>
  );
}
