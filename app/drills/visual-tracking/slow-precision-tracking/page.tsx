import SlowPrecisionTrackingClient from './SlowPrecisionTrackingClient';

export const metadata = {
  title: 'Slow-Precision Tracking - Visual Gaze Training | SkillDrills',
  description: 'Deliberate horizontal plane pursuit with discrete vertical level transitions. Recalibrate smooth eye movements and vertical saccades. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: [
    'slow precision tracking', 'visual tracking drill', 'gaze calibration', 'eye training online',
    'saccadic refocus', 'smooth pursuit training', 'free visual training', 'skilldrills visual tracking'
  ],
  openGraph: {
    title: 'Slow-Precision Tracking - Visual Gaze Training | SkillDrills',
    description: 'Deliberate horizontal plane pursuit with discrete vertical level transitions. Recalibrate smooth eye movements and vertical saccades. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/slow-precision-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Slow-Precision Tracking Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slow-Precision Tracking - Visual Gaze Training | SkillDrills',
    description: 'Deliberate horizontal plane pursuit with discrete vertical level transitions. Recalibrate smooth eye movements and vertical saccades. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/slow-precision-tracking',
  },
};

export default function SlowPrecisionTrackingPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Slow-Precision Tracking" }
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
            "name": "Slow-Precision Tracking Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/slow-precision-tracking",
            "description": "Deliberate horizontal plane pursuit with discrete vertical level transitions. Recalibrate smooth eye movements and vertical saccades.",
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
                "name": "What is the Slow-Precision Tracking Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Deliberate horizontal plane pursuit with discrete vertical level transitions. Recalibrate smooth eye movements and vertical saccades."
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

      <SlowPrecisionTrackingClient />
    </>
  );
}
