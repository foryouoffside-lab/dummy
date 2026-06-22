import StopwatchClickClient from './StopwatchClickClient';

export const metadata = {
  title: 'Reaction Time Test - Free Stopwatch Timing & Chronometry Drill | SkillDrills',
  description: 'Free reaction time test with stopwatch timing. Memorize target times 1–8s and click at the exact moment — the best timing accuracy drill for gamers, musicians, and athletes. No sign-up.',
  keywords: [
    'reaction time test', 'free reaction time test', 'online reaction time test',
    'timing accuracy test', 'timing accuracy drill', 'timing precision test',
    'stopwatch game online', 'stopwatch timing game', 'stopwatch click game',
    'time estimation test', 'time perception test', 'internal clock training',
    'mental chronometry test', 'time sense test', 'temporal accuracy drill',
    'click timing drill', 'precision timing game', 'millisecond accuracy test',
    'musician timing drill', 'drummer timing test', 'rhythm timing game',
    'metronome timing practice', 'beat timing test', 'music timing game',
    'gamer timing test', 'esports reaction timing', 'FPS timing accuracy',
    'athlete timing training', 'sports timing test', 'motor timing drill',
    'brain timing test', 'cognitive timing game', 'cerebellum training game',
    'perfect timing practice', 'sub-second timing game', 'stopwatch precision drill',
    'skilldrills stopwatch', 'skilldrills timing drill', 'free timing test online',
    'browser timing game', 'no download reaction test', 'instant timing drill',
  ],
  openGraph: {
    title: 'Reaction Time Test - Free Stopwatch Timing & Chronometry Drill | SkillDrills',
    description: 'Free reaction time test with stopwatch timing. Memorize target times and click at exact moment — best timing accuracy drill for gamers and musicians. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reaction Time Test - Stopwatch Timing Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Time Test - Free Stopwatch Timing & Chronometry Drill | SkillDrills',
    description: 'Free reaction time test and stopwatch timing game. Click at exact target times. Best timing accuracy drill. No sign-up.',
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
              { "@type": "ListItem", "position": 4, "name": "Reaction Time Test - Stopwatch Timing Drill" }
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
            "name": "Reaction Time Test - Free Stopwatch Timing & Chronometry Drill",
            "url": "https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click",
            "description": "Free reaction time test and stopwatch timing drill. Memorize target times (1-8s) and click at the exact moment. Rated: Perfect <25ms, Good <75ms, OK <150ms. 60-second timing accuracy challenge.",
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
                "name": "What is this reaction time test and stopwatch timing drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free reaction time test and stopwatch timing game. Memorize a target time (1-8 seconds), then click at exactly that moment without watching a counter. Rated: Perfect <25ms, Good <75ms, OK <150ms. Unique timing accuracy drill for internal clock training."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this stopwatch timing reaction test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Musicians and drummers (rhythmic timing), competitive gamers (reaction time accuracy), athletes (precise movement timing), and anyone wanting to improve time estimation and internal clock calibration through this reaction time test."
                }
              },
              {
                "@type": "Question",
                "name": "What target times are used in this timing accuracy drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Random target times from 1 to 8 seconds. Displayed for 1.5 seconds then hidden. You rely entirely on your internal clock. The reaction time test covers both short (1-2s) and long (5-8s) duration timing accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this reaction time test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free reaction time test and stopwatch timing drill works instantly in your browser — no downloads needed."
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