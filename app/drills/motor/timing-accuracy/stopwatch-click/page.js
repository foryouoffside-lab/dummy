import StopwatchClickClient from './StopwatchClickClient';

export const metadata = {
  title: 'Stopwatch Timing - Mental Chronometry | SkillDrills',
  description: 'Memorize target times (1-8s) and click at the exact moment. Perfect <25ms, Good <75ms, OK <150ms. 60-second challenge. No sign-up.',
  keywords: [
    'stopwatch click drill', 'timing accuracy test', 'mental chronometry training', 'time estimation practice',
    'click timing drill online', 'precision timing test free', 'reaction prediction drill', 'time perception training',
    'stopwatch training online', 'timing precision test', 'internal clock training', 'temporal accuracy drill',
    'free timing drill', 'click at exact time', 'stopwatch game online',
    'mental clock training', 'timing skills test', 'precision clicking practice', 'time sense training',
    'musician timing drill', 'drummer timing practice', 'rhythm timing test', 'metronome training alternative',
    'gamer timing accuracy', 'esports reaction timing', 'FPS timing drill', 'competitive gaming timing',
    'athlete timing training', 'sports timing accuracy', 'motor timing skills', 'coordination timing drill',
    'cognitive timing test', 'brain timing exercise', 'neuroscience timing drill', 'cerebellum training',
    'perfect timing practice', 'millisecond accuracy test', 'sub-second timing drill', 'stopwatch precision game',
    'skilldrills stopwatch', 'skilldrills timing drill', 'free online timing test',
    'browser timing game', 'no download timing drill', 'instant timing practice',
  ],
  openGraph: {
    title: 'Stopwatch Timing - Mental Chronometry | SkillDrills',
    description: 'Memorize target times (1-8s), click at exact moment. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Stopwatch Timing Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stopwatch Timing - Mental Chronometry | SkillDrills',
    description: 'Train your internal clock. Click at exact target times. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click',
  },
};

export default function StopwatchClickPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Stopwatch Timing" }
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
            "name": "Stopwatch Timing Drill",
            "url": "https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click",
            "description": "Free mental chronometry drill. Memorize target times (1-8s), click at exact moment. Perfect <25ms, Good <75ms, OK <150ms. 60-second challenge.",
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
                "name": "What is the Stopwatch Timing Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free mental chronometry exercise. Memorize target time (1-8s), click at exact moment. Rated: Perfect <25ms, Good <75ms, OK <150ms."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Musicians, drummers, athletes, competitive gamers, and anyone wanting better time estimation and internal clock calibration."
                }
              },
              {
                "@type": "Question",
                "name": "What target times are used?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Random 1-8 seconds. Displayed for 1.5s then disappears. Rely on internal clock. Covers short and long duration timing."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This stopwatch timing drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <StopwatchClickClient />
    </>
  );
}