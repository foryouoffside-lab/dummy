import StopAndGoDashClient from './StopAndGoDashClient';

export const metadata = {
  title: 'Stop and Go Dash - Visual Gaze Training | SkillDrills',
  description: 'Track a target that rests in position and executes rapid ease-out dashes to random locations. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: [
    'stop and go dash', 'visual tracking drill', 'gaze calibration', 'eye training online',
    'saccadic refocus', 'smooth pursuit training', 'free visual training', 'skilldrills visual tracking'
  ],
  openGraph: {
    title: 'Stop and Go Dash - Visual Gaze Training | SkillDrills',
    description: 'Track a target that rests in position and executes rapid ease-out dashes to random locations. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/stop-and-go-dash',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Stop and Go Dash Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stop and Go Dash - Visual Gaze Training | SkillDrills',
    description: 'Track a target that rests in position and executes rapid ease-out dashes to random locations. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/stop-and-go-dash',
  },
};

export default function StopAndGoDashPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Stop and Go Dash" }
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
            "name": "Stop and Go Dash Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/stop-and-go-dash",
            "description": "Track a target that rests in position and executes rapid ease-out dashes to random locations.",
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
                "name": "What is the Stop and Go Dash Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Track a target that rests in position and executes rapid ease-out dashes to random locations."
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

      <StopAndGoDashClient />
    </>
  );
}
