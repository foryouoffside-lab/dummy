import VisualTrackingDrillsClient from './VisualTrackingDrillsClient';

export const metadata = {
  title: 'Free Eye Tracking Training Online - 25 Smooth Pursuit & Saccadic Drills | SkillDrills',
  description: 'Free eye tracking training online. 25 smooth pursuit and saccadic eye movement drills. Train your gaze for sports, gaming, and vision therapy. No sign-up required.',
  keywords: [
    'eye tracking training online', 'free eye tracking training', 'eye tracking exercises',
    'smooth pursuit eye movement', 'smooth pursuit training', 'pursuit eye training',
    'saccadic eye movement training', 'saccadic training', 'saccade exercises',
    'eye tracking game', 'gaze tracking training', 'eye movement training',
    'visual tracking exercises', 'eye coordination training', 'eye agility training',
    'circular pursuit eye drill', 'infinity pursuit eye', 'sine wave pursuit',
    'saccadic gallery', 'saccadic snap game', 'focus snap calibration',
    'peripheral ping pursuit', 'predictive pursuit drill', 'staircase step eye',
    'split screen tracking', 'strobe prediction pursuit', 'slow precision tracking',
    'sports vision training', 'athlete eye training', 'esports eye training',
    'gaming eye tracking', 'fps eye movement training', 'baseball vision training',
    'vision therapy exercises online', 'convergence eye training', 'gaze stability',
    'eye tracking for sports', 'anti-saccade training', 'pro gamer vision',
    'free online eye drills', 'browser eye tracking game', 'no download eye training',
    'skilldrills visual tracking', '25 eye tracking drills', 'gaze training online',
  ],
  openGraph: {
    title: 'Free Eye Tracking Training Online - 25 Smooth Pursuit & Saccadic Drills | SkillDrills',
    description: 'Free eye tracking training online. 25 smooth pursuit and saccadic drills for sports, gaming, and vision therapy. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/visual-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free Eye Tracking Training Online - Smooth Pursuit & Saccadic Drills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Eye Tracking Training Online - 25 Smooth Pursuit & Saccadic Drills | SkillDrills',
    description: 'Free eye tracking training online. 25 smooth pursuit and saccadic drills. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/visual-tracking' },
};

export default function VisualTrackingDrillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Eye Tracking Training Online - 25 Smooth Pursuit & Saccadic Drills",
        "url": "https://skilldrills.online/drills/visual-tracking",
        "description": "25 free eye tracking training drills online. Smooth pursuit exercises (circular, sine-wave, infinity, staircase) and saccadic training (snap, gallery, reaction simulator). No sign-up required.",
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": [
          { "@type": "WebApplication", "name": "Circular Pursuit Eye Tracking", "url": "https://skilldrills.online/drills/visual-tracking/circular-pursuit" },
          { "@type": "WebApplication", "name": "Sine-Wave Smooth Pursuit", "url": "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit" },
          { "@type": "WebApplication", "name": "Infinity Pursuit Eye Drill", "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit" },
          { "@type": "WebApplication", "name": "Saccadic Gallery Eye Training", "url": "https://skilldrills.online/drills/visual-tracking/saccadic-gallery" },
          { "@type": "WebApplication", "name": "Focus Snap Saccadic Calibration", "url": "https://skilldrills.online/drills/visual-tracking/saccadic-snap" },
          { "@type": "WebApplication", "name": "Saccadic Reaction Simulator", "url": "https://skilldrills.online/drills/visual-tracking/reaction-simulator" },
          { "@type": "WebApplication", "name": "Predictive Pursuit Tracking", "url": "https://skilldrills.online/drills/visual-tracking/predictive-pursuit" },
          { "@type": "WebApplication", "name": "Peripheral Ping Pursuit", "url": "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit" },
          { "@type": "WebApplication", "name": "Slow Precision Eye Tracking", "url": "https://skilldrills.online/drills/visual-tracking/slow-precision-tracking" },
          { "@type": "WebApplication", "name": "Split-Screen Dual Tracking", "url": "https://skilldrills.online/drills/visual-tracking/split-screen-tracking" },
          { "@type": "WebApplication", "name": "Directional Chaos Pursuit", "url": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit" },
          { "@type": "WebApplication", "name": "Dynamic Evasion Pursuit", "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit" },
          { "@type": "WebApplication", "name": "Staircase Step Eye Drill", "url": "https://skilldrills.online/drills/visual-tracking/staircase-step" },
          { "@type": "WebApplication", "name": "Strobe Prediction Pursuit", "url": "https://skilldrills.online/drills/visual-tracking/strobe-prediction-pursuit" },
          { "@type": "WebApplication", "name": "Reactive Strafe Pursuit", "url": "https://skilldrills.online/drills/visual-tracking/reactive-strafe-pursuit" }
        ]
      })}} />
      <VisualTrackingDrillsClient />
    </>
  );
}
