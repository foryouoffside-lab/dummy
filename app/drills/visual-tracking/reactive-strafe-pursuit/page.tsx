import ReactiveStrafePursuitClient from './ReactiveStrafePursuitClient';

export const metadata = {
  title: 'Reactive Strafe Pursuit - Visual Gaze Training | SkillDrills',
  description: 'Stabilize horizontal gaze pursuit against erratic, human-like target strafes. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: [
    'reactive strafe pursuit', 'visual tracking drill', 'gaze calibration', 'eye training online',
    'saccadic refocus', 'smooth pursuit training', 'free visual training', 'skilldrills visual tracking'
  ],
  openGraph: {
    title: 'Reactive Strafe Pursuit - Visual Gaze Training | SkillDrills',
    description: 'Stabilize horizontal gaze pursuit against erratic, human-like target strafes. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/reactive-strafe-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reactive Strafe Pursuit Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reactive Strafe Pursuit - Visual Gaze Training | SkillDrills',
    description: 'Stabilize horizontal gaze pursuit against erratic, human-like target strafes. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/reactive-strafe-pursuit',
  },
};

export default function ReactiveStrafePursuitPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Reactive Strafe Pursuit" }
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
            "name": "Reactive Strafe Pursuit Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/reactive-strafe-pursuit",
            "description": "Stabilize horizontal gaze pursuit against erratic, human-like target strafes.",
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
                "name": "What is the Reactive Strafe Pursuit Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stabilize horizontal gaze pursuit against erratic, human-like target strafes."
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

      <ReactiveStrafePursuitClient />
    </>
  );
}
