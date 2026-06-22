import SplitScreenTrackingClient from './SplitScreenTrackingClient';

export const metadata = {
  title: 'Split Screen Tracking - Visual Pursuit & Tracking Drill | SkillDrills',
  description: 'Condition divided attention by tracking two targets moving along vertical and horizontal planes. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: ['split screen tracking', 'visual tracking drill', 'smooth pursuit eye training', 'saccadic eye movement test', 'visual processing speed', 'foveal tracking', 'esports vision training', 'athletic vision drill'],
  openGraph: {
    title: 'Split Screen Tracking - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Condition divided attention by tracking two targets moving along vertical and horizontal planes. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/split-screen-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Split-Screen Tracking Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split Screen Tracking - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Condition divided attention by tracking two targets moving along vertical and horizontal planes. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/split-screen-tracking',
  },
};

export default function SplitScreenTrackingPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Split-Screen Tracking" }
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
            "name": "Split-Screen Tracking Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
            "description": "Condition divided attention by tracking two targets moving along vertical and horizontal planes.",
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
                "name": "What is the Split-Screen Tracking Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Condition divided attention by tracking two targets moving along vertical and horizontal planes."
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

      <SplitScreenTrackingClient />
    </>
  );
}
