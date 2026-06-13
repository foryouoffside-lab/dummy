import BarrierSequencePursuitClient from './BarrierSequencePursuitClient';

export const metadata = {
  title: 'Barrier Sequence Pursuit - Visual Gaze Training | SkillDrills',
  description: 'Acquire and track targets flashing behind sequential barrier gates at 4 corners. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: [
    'barrier sequence pursuit', 'visual tracking drill', 'gaze calibration', 'eye training online',
    'saccadic refocus', 'smooth pursuit training', 'free visual training', 'skilldrills visual tracking'
  ],
  openGraph: {
    title: 'Barrier Sequence Pursuit - Visual Gaze Training | SkillDrills',
    description: 'Acquire and track targets flashing behind sequential barrier gates at 4 corners. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Barrier Sequence Pursuit Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barrier Sequence Pursuit - Visual Gaze Training | SkillDrills',
    description: 'Acquire and track targets flashing behind sequential barrier gates at 4 corners. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/barrier-sequence-pursuit',
  },
};

export default function BarrierSequencePursuitPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Barrier Sequence Pursuit" }
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
            "name": "Barrier Sequence Pursuit Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/barrier-sequence-pursuit",
            "description": "Acquire and track targets flashing behind sequential barrier gates at 4 corners.",
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
                "name": "What is the Barrier Sequence Pursuit Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Acquire and track targets flashing behind sequential barrier gates at 4 corners."
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

      <BarrierSequencePursuitClient />
    </>
  );
}
