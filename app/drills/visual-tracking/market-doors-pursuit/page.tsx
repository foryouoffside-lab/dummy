import MarketDoorsPursuitClient from './MarketDoorsPursuitClient';

export const metadata = {
  title: 'Market Doors Pursuit - Visual Gaze Training | SkillDrills',
  description: 'Train horizontal saccadic sweeps as targets flash behind 5 centered doors. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: [
    'market doors pursuit', 'visual tracking drill', 'gaze calibration', 'eye training online',
    'saccadic refocus', 'smooth pursuit training', 'free visual training', 'skilldrills visual tracking'
  ],
  openGraph: {
    title: 'Market Doors Pursuit - Visual Gaze Training | SkillDrills',
    description: 'Train horizontal saccadic sweeps as targets flash behind 5 centered doors. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Market Doors Pursuit Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Market Doors Pursuit - Visual Gaze Training | SkillDrills',
    description: 'Train horizontal saccadic sweeps as targets flash behind 5 centered doors. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/market-doors-pursuit',
  },
};

export default function MarketDoorsPursuitPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
              { "@type": "ListItem", "position": 3, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
              { "@type": "ListItem", "position": 4, "name": "Market Doors Pursuit" }
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
            "name": "Market Doors Pursuit Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/market-doors-pursuit",
            "description": "Train horizontal saccadic sweeps as targets flash behind 5 centered doors.",
            "applicationCategory": "EducationalApplication",
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
                "name": "What is the Market Doors Pursuit Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Train horizontal saccadic sweeps as targets flash behind 5 centered doors."
                }
              },
              {
                "@type": "Question",
                "name": "Who is this drill designed for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Competitive gamers, sports athletes, and anyone wanting to improve ocular muscle agility and tracking precision."
                }
              }
            ]
          })
        }}
      />

      <MarketDoorsPursuitClient />
    </>
  );
}
