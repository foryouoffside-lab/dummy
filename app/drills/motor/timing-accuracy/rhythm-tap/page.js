import RhythmTapClient from './RhythmTapClient';

export const metadata = {
  title: 'Rhythm Tap - Timing & Beat Sync | SkillDrills',
  description: 'Tap in sync with dynamic BPM pulse (50-140). Perfect hits under 40ms, Good under 80ms. BPM changes every 8 beats. No sign-up.',
  keywords: [
    'rhythm tap training', 'timing accuracy drill', 'beat synchronization practice',
    'rhythm training online', 'BPM training free', 'musical timing practice',
    'click timing drill', 'rhythm game training', 'tempo training online',
    'beat matching practice', 'timing precision drill', 'rhythmic accuracy test',
    'free rhythm drill', 'timing practice online', 'metronome training game',
    'rhythm tap for musicians', 'rhythm tap for gamers', 'beat sync practice',
    'precision timing drill', 'tempo adaptation training', 'rhythmic consistency drill',
    'skilldrills rhythm', 'skilldrills timing', 'free online rhythm game',
    'adaptive BPM training', 'dynamic tempo practice', 'beat detection drill',
  ],
  openGraph: {
    title: 'Rhythm Tap - Timing & Beat Sync | SkillDrills',
    description: 'Tap in sync with dynamic BPM pulse (50-140). Perfect hits under 40ms, Good under 80ms. BPM changes every 8 beats. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/timing-accuracy/rhythm-tap',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Rhythm Tap Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhythm Tap - Timing & Beat Sync | SkillDrills',
    description: 'Tap in sync with dynamic BPM pulse (50-140). Perfect hits under 40ms, Good under 80ms. BPM changes every 8 beats. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/rhythm-tap',
  },
};

export default function RhythmTapPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Rhythm Tap" }
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
            "name": "Rhythm Tap Training",
            "url": "https://skilldrills.online/drills/motor/timing-accuracy/rhythm-tap",
            "description": "Free rhythm tap drill. Tap in sync with dynamic BPM (50-140). Perfect hits <40ms, Good <80ms. BPM changes every 8 beats. 60-second challenge.",
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
                "name": "What is the Rhythm Tap drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free timing accuracy exercise. Tap when expanding ring reaches outer circle. Perfect <40ms, Good <80ms. BPM changes every 8 beats (50-140)."
                }
              },
              {
                "@type": "Question",
                "name": "How does BPM change work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 60 BPM, changes randomly every 8 beats throughout 50-140 range. Forces constant tempo recalibration. Current BPM displayed on screen."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from rhythm training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Musicians, rhythm gamers (osu!, Beat Saber), drummers, esports players, and anyone wanting better timing precision and internal clock."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This rhythm tap drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <RhythmTapClient />
    </>
  );
}