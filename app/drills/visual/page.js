import VisualDrillsClient from './VisualDrillsClient';
import { DRILLS } from '../../../lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';

const visualDrillCount = DRILLS.filter((d) => d.category === 'visual').length;

export const metadata = {
  title: `Free Visual Training - Tracking & Perception | SkillDrills`,
  description: `Free visual training online. ${visualDrillCount} drills for reaction speed, tracking accuracy, depth perception and visual recognition. No sign-up needed.`,
  keywords: [
    'visual training online', 'free visual training', 'visual training drills',
    'reaction time test', 'reaction time training', 'reaction speed test',
    'visual perception training', 'depth perception test', 'visual perception game',
    'tracking accuracy game', 'eye tracking training', 'visual tracking game',
    'visual search test', 'visual recognition game',
    'go no go test', 'impulse control training', 'inhibition control game',
    'light reaction test',
    'multiple object tracking', 'smooth pursuit tracking', 'moving target game',
    'visual pattern recognition', 'rhythm anomaly game',
    'visual processing speed', 'brain vision training', 'eye training online',
    'vision training exercises', 'visual skill training', 'cognitive visual training',
    'fps visual training', 'gaming vision training', 'esports vision drill',
    'skilldrills visual', 'free vision drills', 'online vision training',
    'no download visual game', 'browser visual training', 'instant vision drill',
    'comprehensive visual training', 'vision improvement game',
  ],
  openGraph: {
    title: `Free Visual Training Online - Reaction Speed, Tracking & Perception Drills | SkillDrills`,
    description: `Free visual training online. ${visualDrillCount} drills for reaction speed, tracking accuracy, depth perception, and visual recognition. No sign-up.`,
    type: 'website',
    url: 'https://skilldrills.online/drills/visual',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free Visual Training Online - Reaction & Tracking Drills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Free Visual Training Online - Reaction Speed, Tracking & Perception Drills | SkillDrills`,
    description: `Free visual training online. ${visualDrillCount} drills — reaction speed, tracking accuracy, depth perception, visual recognition. No sign-up.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual',
    languages: getAlternateLanguages('/drills/visual'),
  },
};

export default function VisualDrillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Visual Training Online - Reaction Speed, Tracking & Perception Drills",
        "url": "https://skilldrills.online/drills/visual",
        "description": `${visualDrillCount} free visual training drills online. Reaction speed tests, tracking accuracy games, depth perception tests, and visual recognition exercises. No sign-up required.`,
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": [
          { "@type": "WebApplication", "name": "Depth Perception Test - Distance Judgment", "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment" },
          { "@type": "WebApplication", "name": "Go No Go Test - Impulse Control Drill", "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go" },
          { "@type": "WebApplication", "name": "Reaction Time Test - Light Reaction", "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction" },
          { "@type": "WebApplication", "name": "Moving Target Tracking Game", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target" },
          { "@type": "WebApplication", "name": "Multiple Object Tracking - Ghost-Link", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets" },
          { "@type": "WebApplication", "name": "Smooth Pursuit Tracking - Auto-Pursuit", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker" },
          { "@type": "WebApplication", "name": "Visual Search Game - Entropic Grid", "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid" },
          { "@type": "WebApplication", "name": "Visual Pattern Recognition - Rhythm Anomaly", "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly" },
          { "@type": "WebApplication", "name": "Visual Search Test - Conjunctive Scanning", "url": "https://skilldrills.online/drills/visual/visual-recognition/visual-search" }
        ]
      })}} />
      <VisualDrillsClient />
    </>
  );
}