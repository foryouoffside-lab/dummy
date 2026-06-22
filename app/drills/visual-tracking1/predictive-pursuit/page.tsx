import PredictivePursuitClient from './PredictivePursuitClient';

export const metadata = {
  title: 'Predictive Pursuit - Visual Pursuit & Tracking Drill | SkillDrills',
  description: 'Interpolate path trajectory of a moving cyan shadow and execute ballistic gaze shifts to capture solidified targets. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: ['predictive pursuit', 'visual tracking drill', 'smooth pursuit eye training', 'saccadic eye movement test', 'visual processing speed', 'foveal tracking', 'esports vision training', 'athletic vision drill'],
  openGraph: {
    title: 'Predictive Pursuit - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Interpolate path trajectory of a moving cyan shadow and execute ballistic gaze shifts to capture solidified targets. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/predictive-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Predictive Pursuit Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Predictive Pursuit - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Interpolate path trajectory of a moving cyan shadow and execute ballistic gaze shifts to capture solidified targets. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/predictive-pursuit',
  },
};

export default function PredictivePursuitPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Predictive Pursuit" }
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
            "name": "Predictive Pursuit Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
            "description": "Interpolate path trajectory of a moving cyan shadow and execute ballistic gaze shifts to capture solidified targets.",
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
                "name": "What is the Predictive Pursuit Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Interpolate path trajectory of a moving cyan shadow and execute ballistic gaze shifts to capture solidified targets."
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

      <PredictivePursuitClient />
    </>
  );
}
