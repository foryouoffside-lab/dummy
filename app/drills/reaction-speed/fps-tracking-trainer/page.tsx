import FPSTrackingTrainerWrapper from './FPSTrackingTrainerWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "FPS Tracking Trainer - Smooth Aim & Strafe Practice",
  description: "Free FPS tracking trainer. Practice smooth aim and strafe tracking on moving targets to build consistent crosshair control for CS2 and Valorant.",
  keywords: ["fps tracking trainer", "aim tracking trainer", "best tracking aim trainer", "strafe tracking aim", "aim trainer tracking", "shaky aim fix", "how to track aim", "reactive tracking scenarios", "smoothness routine aim", "how to improve tracking aim", "why is my tracking aim shaky", "how to make aim tracking smoother", "apex legends tracking routine", "strafe tracking drills for fps", "online mouse tracking trainer", "free aim trainer browser", "gaming reflex test", "hand eye coordination gaming"],
  openGraph: {
    title: "FPS Tracking Trainer - Smooth Aim & Strafe Practice",
    description: "Free FPS tracking trainer. Practice smooth aim and strafe tracking on moving targets to build consistent crosshair control for CS2 and Valorant.",
    type: 'article',
    url: 'https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "FPS Tracking Trainer - Smooth Aim & Strafe Practice",
    description: "Free FPS tracking trainer. Practice smooth aim and strafe tracking on moving targets to build consistent crosshair control for CS2 and Valorant.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer',
    languages: getAlternateLanguages('/drills/reaction-speed/fps-tracking-trainer'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://skilldrills.online"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Drills Hub",
      "item": "https://skilldrills.online/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Reaction Speed",
      "item": "https://skilldrills.online/drills/reaction-speed"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "FPS Tracking Trainer",
      "item": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FPS Tracking Trainer — Smooth Aim & Strafe Practice",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free FPS tracking trainer. Practice smooth aim and strafe tracking on moving targets to build consistent crosshair control for CS2 and Valorant.",
  "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FPS Tracking Trainer",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas, modern web browser with Pointer Lock support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer",
  "inLanguage": "en-US",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "FPS Tracking Trainer – Reactive Target Tracking Game",
  "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer",
  "description": "Free FPS tracking trainer. Practice smooth aim and strafe tracking on moving targets to build consistent crosshair control for CS2 and Valorant.",
  "genre": [
    "Action",
    "Aim Trainer",
    "Esports Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
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
        "text": "Yes. Higher display refresh rates (144Hz, 240Hz, 360Hz) decrease frame presentation intervals (e.g. 16.7 ms at 60 Hz down to 4.1 ms at 240 Hz), significantly reducing motion blur and display quantization latency (Woods et al., 2015). This allows the human visual system to detect target deceleration cues earlier."
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
        "text": "Yes. SkillDrills' FPS Tracking Trainer is 100% free, runs client-side directly in your browser with zero downloads or registration, and timestamps every event with the High Resolution Time API (performance.now()). Note that differences under ~5 ms represent measurement noise due to browser timer coarsening."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "FPS Tracking Trainer",
  "description": "Free FPS tracking trainer. Practice smooth aim and strafe tracking on moving targets to build consistent crosshair control for CS2 and Valorant.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Calibrate Sensitivity and Launch Fullscreen",
      "text": "Select your target speed and difficulty mode in settings, then launch fullscreen to eliminate browser border distractions.",
      "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Center Crosshair on Moving Target",
      "text": "Keep your focus strictly centered on the target circle itself rather than staring at your crosshair.",
      "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute Smooth Pursuit Tracking",
      "text": "Match the target's velocity with smooth, continuous cursor movement, relaxing your hand to eliminate jitter.",
      "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "React to Directional Strafe Reversals",
      "text": "Wait for the visual confirmation of a direction change and execute a controlled redirection without panic flicking.",
      "url": "https://skilldrills.online/drills/reaction-speed/fps-tracking-trainer#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('krauzlis2004', 'rashbass1961', 'green2003', 'woods2015'),
  intro: {
    title: "FPS Tracking Trainer",
    paragraphs: [
      "Free FPS tracking trainer. Practice smooth aim and strafe tracking on moving targets to build consistent crosshair control for CS2 and Valorant.",
      "Improving tracking requires three disciplines: lowering grip tension to avoid isometric micro-stutters, reading target velocity rather than guessing reversals, and establishing consistent motor control across both wrist articulation (fine tracking) and arm pivots (wide sweeping glides).",
      "Shaky tracking aim is primarily caused by excessive muscle tension (clenching the mouse during tense duels), using an excessively high sensitivity that amplifies natural micro-tremors, or trying to micro-flick to correct errors rather than executing smooth pursuit glides.",
    ],
  },
  benchmarks: {
    title: 'Standardized Performance Benchmarks',
    headers: ['Tier', 'Rank', 'Rating', 'Accuracy', 'Percentile'],
    rows: [
      { tier: 'Tier 1', rank: 'Grandmaster / Pro', stat: 'Top 1%', level: 'Elite', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Master', stat: 'Top 5%', level: 'Diamond', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Pro', stat: 'Top 15%', level: 'Platinum', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Intermediate', stat: 'Top 50%', level: 'Gold', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Novice', stat: 'Base', level: 'Silver', accuracy: '<78%', percentile: 'Novice' },
    ],
  },
  protocols: {
    title: 'Core Performance Training Protocols',
    description: 'Evidence-based cognitive and neuromuscular enhancement routines.',
    items: [
      { title: "Calibrate Sensitivity and Launch Fullscreen", description: "Select your target speed and difficulty mode in settings, then launch fullscreen to eliminate browser border distractions." },
      { title: "Center Crosshair on Moving Target", description: "Keep your focus strictly centered on the target circle itself rather than staring at your crosshair." },
      { title: "Execute Smooth Pursuit Tracking", description: "Match the target's velocity with smooth, continuous cursor movement, relaxing your hand to eliminate jitter." },
      { title: "React to Directional Strafe Reversals", description: "Wait for the visual confirmation of a direction change and execute a controlled redirection without panic flicking." },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function EnhancedPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <FPSTrackingTrainerWrapper copy={{ title: "FPS Tracking Trainer" }} />
      <DrillGuide {...guideProps} />
      <DrillFooter />
    </>
  );
}
