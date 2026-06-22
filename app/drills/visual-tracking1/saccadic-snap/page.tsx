import SaccadicSnapClient from './SaccadicSnapClient';

export const metadata = {
  title: 'Saccadic Snap - Visual Pursuit & Tracking Drill | SkillDrills',
  description: 'Calibrate focus acquisition with target points snapping randomly across the viewport. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: ['saccadic snap', 'visual tracking drill', 'smooth pursuit eye training', 'saccadic eye movement test', 'visual processing speed', 'foveal tracking', 'esports vision training', 'athletic vision drill'],
  openGraph: {
    title: 'Saccadic Snap - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Calibrate focus acquisition with target points snapping randomly across the viewport. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/saccadic-snap',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Focus Snap Calibration Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saccadic Snap - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Calibrate focus acquisition with target points snapping randomly across the viewport. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/saccadic-snap',
  },
};

export default function SaccadicSnapPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Focus Snap Calibration" }
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
            "name": "Focus Snap Calibration Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/saccadic-snap",
            "description": "Calibrate focus acquisition with target points snapping randomly across the viewport.",
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
                "name": "What is the Focus Snap Calibration Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Calibrate focus acquisition with target points snapping randomly across the viewport."
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

      <SaccadicSnapClient />
    </>
  );
}
