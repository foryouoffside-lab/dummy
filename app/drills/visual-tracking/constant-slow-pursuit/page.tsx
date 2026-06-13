import ConstantSlowPursuitClient from './ConstantSlowPursuitClient';

export const metadata = {
  title: 'Constant Slow Pursuit - Visual Gaze Training | SkillDrills',
  description: 'Condition foveal pursuit along a continuous, visible Lissajous curve at low velocity. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: [
    'constant slow pursuit', 'visual tracking drill', 'gaze calibration', 'eye training online',
    'saccadic refocus', 'smooth pursuit training', 'free visual training', 'skilldrills visual tracking'
  ],
  openGraph: {
    title: 'Constant Slow Pursuit - Visual Gaze Training | SkillDrills',
    description: 'Condition foveal pursuit along a continuous, visible Lissajous curve at low velocity. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Constant Slow Pursuit Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Constant Slow Pursuit - Visual Gaze Training | SkillDrills',
    description: 'Condition foveal pursuit along a continuous, visible Lissajous curve at low velocity. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit',
  },
};

export default function ConstantSlowPursuitPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Constant Slow Pursuit" }
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
            "name": "Constant Slow Pursuit Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
            "description": "Condition foveal pursuit along a continuous, visible Lissajous curve at low velocity.",
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
                "name": "What is the Constant Slow Pursuit Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Condition foveal pursuit along a continuous, visible Lissajous curve at low velocity."
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

      <ConstantSlowPursuitClient />
    </>
  );
}
