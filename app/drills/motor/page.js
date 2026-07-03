import MotorDrillsClient from './MotorDrillsClient';

export const metadata = {
  title: 'Free Aim Trainer & Motor Skills Drills - Mouse Precision Online | SkillDrills',
  description: 'Free aim trainer and motor skills drills online. 12 hand eye coordination, reaction time, fine motor, and click speed tests. No sign-up. Play instantly in your browser.',
  keywords: [
    'free aim trainer', 'aim trainer online', 'motor skills drills', 'motor skills training',
    'hand eye coordination training', 'hand eye coordination game', 'hand eye coordination test',
    'mouse accuracy test', 'mouse precision training', 'mouse precision game',
    'click accuracy test', 'click speed test', 'cps test online',
    'reaction time test', 'reaction time training', 'reflex test online',
    'fine motor skills', 'fine motor skills training', 'fine motor skills game',
    'flick training', 'flick shot training', 'flick training online',
    'finger speed test', 'finger dexterity test', 'finger sequencing drill',
    'steady hand game', 'mouse tracing game', 'drag and drop game',
    'rhythm click game', 'timing accuracy game', 'synchronization drill',
    'FPS training online', 'gaming aim practice', 'esports training game',
    'Valorant aim trainer', 'CS2 aim training', 'Apex aim trainer',
    'keyboard recognition trainer', 'keybind speed trainer', 'keyboard layout trainer',
    'free motor training', 'online motor drills', 'precision control training',
    'movement speed drill', 'timing accuracy drill', 'coordination training',
    'skilldrills motor', 'skilldrills aim', 'free online skill training',
    'no download motor game', 'browser skill game', 'instant motor training',
    '12 free drills', 'motor skills game online', 'precision mouse training',
  ],
  openGraph: {
    title: 'Free Aim Trainer & Motor Skills Drills - Mouse Precision Online | SkillDrills',
    description: 'Free aim trainer and motor skills drills. 12 hand eye coordination, click speed, fine motor, and reaction time tests. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/motor',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Aim Trainer & Motor Skills Drills Online',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Aim Trainer & Motor Skills Drills - Mouse Precision Online | SkillDrills',
    description: 'Free aim trainer and motor skills drills. 12 hand eye coordination, click speed, fine motor, and reaction time tests. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor',
  },
};

export default function MotorDrillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free Aim Trainer & Motor Skills Drills - Mouse Precision Online",
            "url": "https://skilldrills.online/drills/motor",
            "description": "12 free motor skills drills and aim trainer games online. Hand eye coordination, click speed tests, fine motor skills, flick training, reaction time tests, and timing accuracy drills. No sign-up required.",
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "hasPart": [
              { "@type": "WebApplication", "name": "Free Aim Trainer Online", "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer" },
              { "@type": "WebApplication", "name": "Mouse Accuracy Test - Click Accuracy Drill", "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/click-accuracy" },
              { "@type": "WebApplication", "name": "Drag and Drop Game - Mouse Precision Training", "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop" },
              { "@type": "WebApplication", "name": "Finger Speed Test - Finger Sequencing Drill", "url": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing" },
              { "@type": "WebApplication", "name": "Flick Training Online - Gesture Speed Drill", "url": "https://skilldrills.online/drills/motor/movement-speed/gesture-speed" },
              { "@type": "WebApplication", "name": "Keyboard Recognition & Keybind Speed Trainer", "url": "https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition" },
              { "@type": "WebApplication", "name": "Click Speed Test - Rapid Tapping CPS Test", "url": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping" },
              { "@type": "WebApplication", "name": "Fine Motor Skills Training - Precision Path Tracking", "url": "https://skilldrills.online/drills/motor/precision-control/fine-motor" },
              { "@type": "WebApplication", "name": "Steady Hand Game - Mouse Path Tracing", "url": "https://skilldrills.online/drills/motor/precision-control/steady-hand" },
              { "@type": "WebApplication", "name": "Mouse Tracing Game - Wave Tracking Drill", "url": "https://skilldrills.online/drills/motor/precision-control/tracing" },
              { "@type": "WebApplication", "name": "Reaction Time Test - Stopwatch Timing Drill", "url": "https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click" },
              { "@type": "WebApplication", "name": "Rhythm Click Game - Synchronization Timing Drill", "url": "https://skilldrills.online/drills/motor/timing-accuracy/synchronization" }
            ]
          })
        }}
      />
      <noscript>
        <h1>Free Aim Trainer & Motor Skills Drills - Mouse Precision, Click Speed & Hand Eye Coordination</h1>
        <p>12 free motor skills drills: aim trainer, mouse accuracy test, click speed test, fine motor skills training, flick training, and reaction time tests. No sign-up required.</p>
      </noscript>
      <MotorDrillsClient />
    </>
  );
}