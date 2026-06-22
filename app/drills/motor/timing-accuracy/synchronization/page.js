import SynchronizationClient from './SynchronizationClient';

export const metadata = {
  title: 'Rhythm Click Game - Free Synchronization & Timing Accuracy Drill | SkillDrills',
  description: 'Free rhythm click game online. Click when converging bars align at center — the best synchronization drill for timing accuracy, rhythm training, and motor coordination. Variable speed. No sign-up.',
  keywords: [
    'rhythm click game', 'rhythm game online', 'free rhythm game online',
    'timing accuracy game', 'timing accuracy drill', 'timing accuracy test',
    'synchronization game', 'synchronization drill', 'synchronization training',
    'bar alignment game', 'convergence timing game', 'visual timing game',
    'timing precision game', 'click timing game', 'precision timing drill',
    'reaction time game', 'reaction timing drill', 'visual reaction game',
    'hand eye coordination game', 'hand eye coordination timing', 'motor timing drill',
    'rhythm training game', 'rhythm timing test', 'beat timing game',
    'musician timing game', 'drummer training online', 'metronome alternative game',
    'gamer timing drill', 'FPS peeker timing', 'esports timing accuracy',
    'athlete timing training', 'sports timing game', 'motor synchronization',
    'visual motor sync game', 'convergence drill online', 'alignment timing game',
    'skilldrills synchronization', 'skilldrills motor drill', 'free timing game online',
    'browser rhythm game', 'no download timing game', 'instant synchronization drill',
    'visual sync training', 'timing coordination game', 'motor timing accuracy',
  ],
  openGraph: {
    title: 'Rhythm Click Game - Free Synchronization & Timing Accuracy Drill | SkillDrills',
    description: 'Free rhythm click game. Click when converging bars align — best synchronization drill for timing accuracy and rhythm training. Variable speed. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/timing-accuracy/synchronization',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Rhythm Click Game - Synchronization Timing Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhythm Click Game - Free Synchronization & Timing Accuracy Drill | SkillDrills',
    description: 'Free rhythm click game. Click when bars align. Best synchronization and timing accuracy drill. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/synchronization',
  },
};

export default function SynchronizationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
              { "@type": "ListItem", "position": 3, "name": "Timing Accuracy", "item": "https://skilldrills.online/drills/motor/timing-accuracy" },
              { "@type": "ListItem", "position": 4, "name": "Rhythm Click Game - Synchronization Drill" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Rhythm Click Game - Free Synchronization & Timing Accuracy Drill",
            "url": "https://skilldrills.online/drills/motor/timing-accuracy/synchronization",
            "description": "Free rhythm click game and synchronization timing accuracy drill. Click when converging bars align at center line. Variable speed 400-1200px/s. Perfect sync <16.6ms. 3 lives, streak bonuses.",
            "applicationCategory": "GameApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is this rhythm click game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free rhythm click game and synchronization timing accuracy drill. Two bars converge from opposite sides — click when they align at the center line. Variable speed 400-1200px/s. Perfect sync is less than 16.6ms. 3 lives, streak bonuses."
                }
              },
              {
                "@type": "Question",
                "name": "How does bar synchronization improve timing in this rhythm game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This rhythm click game trains visual-motor synchronization. Your brain processes bar velocity, predicts convergence point, and fires a motor signal. Regular play sharpens prediction accuracy and reduces reaction latency — key for musicians and gamers."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this synchronization and timing drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gamers (peeker's advantage timing in CS2, Valorant), musicians and drummers (rhythmic accuracy), athletes (precise movement timing and reaction), and anyone wanting better visual-motor synchronization through this rhythm click game."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this rhythm click game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free rhythm click game and synchronization timing drill works instantly in your browser — no downloads needed."
                }
              }
            ]
          })
        }}
      />
      <SynchronizationClient />
    </>
  );
}