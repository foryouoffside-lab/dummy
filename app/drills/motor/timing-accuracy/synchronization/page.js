import SynchronizationClient from './SynchronizationClient';

export const metadata = {
  title: 'Synchronization - Bar Alignment Drill | SkillDrills',
  description: 'Click when converging bars align at center line. Variable speed 400-1200px/s. 3 lives, perfect sync tracking. No sign-up.',
  keywords: [
    'synchronization training', 'bar alignment drill', 'convergence timing', 'timing precision test',
    'visual synchronization', 'motor timing drill', 'bar convergence', 'reaction alignment',
    'synchronization elite', 'timing accuracy test', 'visual motor sync',
    'free timing drill', 'precision convergence', 'alignment training',
    'synchronization drill online', 'bar sync test', 'timing coordination',
    'visual convergence practice', 'motor synchronization', 'timing reaction drill',
    'hand eye coordination timing', 'precision timing game', 'sync training free',
    'synchronization test online', 'bar alignment practice', 'convergence drill',
    'timing skills training', 'visual timing accuracy', 'motor coordination drill',
    'rhythm timing practice', 'synchronization exercise', 'timing challenge',
    'skilldrills synchronization', 'skilldrills motor drill', 'free motor skills training',
    'online timing game', 'browser timing drill', 'no download synchronization',
  ],
  openGraph: {
    title: 'Synchronization - Bar Alignment Drill | SkillDrills',
    description: 'Click when converging bars align at center line. Variable speed 400-1200px/s. 3 lives, perfect sync tracking. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/timing-accuracy/synchronization',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Synchronization Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synchronization - Bar Alignment Drill | SkillDrills',
    description: 'Click when converging bars align at center line. Variable speed 400-1200px/s. 3 lives, perfect sync tracking. No sign-up.',
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
              { "@type": "ListItem", "position": 4, "name": "Synchronization" }
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
            "name": "Synchronization Drill",
            "url": "https://skilldrills.online/drills/motor/timing-accuracy/synchronization",
            "description": "Free timing drill. Click when converging bars align at center. Variable speed 400-1200px/s. Perfect sync <16.6ms. 3 lives, streak bonuses.",
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
                "name": "What is the Synchronization Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free timing accuracy exercise. Click when converging bars align at center. Variable speed 400-1200px/s. Perfect sync <16.6ms."
                }
              },
              {
                "@type": "Question",
                "name": "How does bar synchronization improve timing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trains visual-motor coordination. Brain processes moving bars' velocity, predicts convergence, sends motor signal. Sharpens prediction and reduces latency."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gamers (peeker's advantage timing), musicians (rhythmic accuracy), athletes (precise movement timing), and anyone wanting better coordination."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This synchronization drill is completely free and works instantly in your browser."
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