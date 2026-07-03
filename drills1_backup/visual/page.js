import VisualDrillsClient from './VisualDrillsClient';

export const metadata = {
  title: 'Free Visual Training Online - Reaction Speed, Tracking & Perception Drills | SkillDrills',
  description: 'Free visual training online. 14 drills for reaction speed, tracking accuracy, peripheral vision, depth perception, and visual recognition. No sign-up. Play instantly in your browser.',
  keywords: [
    'visual training online', 'free visual training', 'visual training drills',
    'reaction time test', 'reaction time training', 'reaction speed test',
    'visual perception training', 'depth perception test', 'peripheral vision training',
    'peripheral vision test', 'peripheral vision game', 'visual perception game',
    'tracking accuracy game', 'eye tracking training', 'visual tracking game',
    'spot the difference game', 'visual search test', 'visual recognition game',
    'go no go test', 'impulse control training', 'inhibition control game',
    'auditory reaction time', 'sound reaction test', 'light reaction test',
    'multiple object tracking', 'smooth pursuit tracking', 'moving target game',
    'shape recognition game', 'visual pattern recognition', 'rhythm anomaly game',
    'visual processing speed', 'brain vision training', 'eye training online',
    'vision training exercises', 'visual skill training', 'cognitive visual training',
    'fps visual training', 'gaming vision training', 'esports vision drill',
    'skilldrills visual', 'free vision drills', 'online vision training',
    'no download visual game', 'browser visual training', 'instant vision drill',
    '14 visual drills', 'comprehensive visual training', 'vision improvement game',
  ],
  openGraph: {
    title: 'Free Visual Training Online - Reaction Speed, Tracking & Perception Drills | SkillDrills',
    description: 'Free visual training online. 14 drills for reaction speed, tracking accuracy, peripheral vision, and visual recognition. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/visual',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free Visual Training Online - Reaction & Tracking Drills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Visual Training Online - Reaction Speed, Tracking & Perception Drills | SkillDrills',
    description: 'Free visual training online. 14 drills — reaction speed, tracking accuracy, peripheral vision, visual recognition. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/visual' },
};

export default function VisualDrillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Visual Training Online - Reaction Speed, Tracking & Perception Drills",
        "url": "https://skilldrills.online/drills/visual",
        "description": "14 free visual training drills online. Reaction speed tests, tracking accuracy games, peripheral vision training, depth perception tests, and visual recognition exercises. No sign-up required.",
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": [
          { "@type": "WebApplication", "name": "Depth Perception Test - Distance Judgment", "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment" },
          { "@type": "WebApplication", "name": "Peripheral Vision Training - Peripheral Flash", "url": "https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash" },
          { "@type": "WebApplication", "name": "Peripheral Vision Test - Wide Field", "url": "https://skilldrills.online/drills/visual/peripheral-vision/wide-field" },
          { "@type": "WebApplication", "name": "Go No Go Test - Impulse Control Drill", "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go" },
          { "@type": "WebApplication", "name": "Reaction Time Test - Light Reaction", "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction" },
          { "@type": "WebApplication", "name": "Auditory Reaction Time - Sound Reaction", "url": "https://skilldrills.online/drills/visual/reaction-speed/sound-reaction" },
          { "@type": "WebApplication", "name": "Moving Target Tracking Game", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target" },
          { "@type": "WebApplication", "name": "Multiple Object Tracking - Ghost-Link", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets" },
          { "@type": "WebApplication", "name": "Smooth Pursuit Tracking - Auto-Pursuit", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker" },
          { "@type": "WebApplication", "name": "Spot the Difference Game - Difference Spotter", "url": "https://skilldrills.online/drills/visual/visual-recognition/difference-spotter" },
          { "@type": "WebApplication", "name": "Visual Search Game - Entropic Grid", "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid" },
          { "@type": "WebApplication", "name": "Shape Recognition Game - Rapid Object ID", "url": "https://skilldrills.online/drills/visual/visual-recognition/rapid-object-id" },
          { "@type": "WebApplication", "name": "Visual Pattern Recognition - Rhythm Anomaly", "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly" },
          { "@type": "WebApplication", "name": "Visual Search Test - Conjunctive Scanning", "url": "https://skilldrills.online/drills/visual/visual-recognition/visual-search" }
        ]
      })}} />
      <VisualDrillsClient />
    </>
  );
}