import ReactionSimulatorClient from './ReactionSimulatorClient';

export const metadata = {
  title: 'Reaction Simulator - Visual Pursuit & Tracking Drill | SkillDrills',
  description: 'Track falling targets along parallel lanes to calibrate vertical reaction limits. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: ['reaction simulator', 'visual tracking drill', 'smooth pursuit eye training', 'saccadic eye movement test', 'visual processing speed', 'foveal tracking', 'esports vision training', 'athletic vision drill'],
  openGraph: {
    title: 'Reaction Simulator - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Track falling targets along parallel lanes to calibrate vertical reaction limits. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/reaction-simulator',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Saccadic Reaction Simulator Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Simulator - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Track falling targets along parallel lanes to calibrate vertical reaction limits. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/reaction-simulator',
  },
};

export default function ReactionSimulatorPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Saccadic Reaction Simulator" }
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
            "name": "Saccadic Reaction Simulator Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/reaction-simulator",
            "description": "Track falling targets along parallel lanes to calibrate vertical reaction limits.",
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
                "name": "What is the Saccadic Reaction Simulator Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Track falling targets along parallel lanes to calibrate vertical reaction limits."
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

      <ReactionSimulatorClient />
    </>
  );
}
