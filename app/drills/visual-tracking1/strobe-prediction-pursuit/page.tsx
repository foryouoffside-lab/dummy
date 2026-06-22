import StrobePredictionPursuitClient from './StrobePredictionPursuitClient';

export const metadata = {
  title: 'Strobe Prediction Pursuit - Visual Pursuit & Tracking Drill | SkillDrills',
  description: 'Predict target locations during cyclic strobe blank intervals to train visual memory. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
  keywords: ['strobe prediction pursuit', 'visual tracking drill', 'smooth pursuit eye training', 'saccadic eye movement test', 'visual processing speed', 'foveal tracking', 'esports vision training', 'athletic vision drill'],
  openGraph: {
    title: 'Strobe Prediction Pursuit - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Predict target locations during cyclic strobe blank intervals to train visual memory. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual-tracking/strobe-prediction-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Strobe Prediction Pursuit Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strobe Prediction Pursuit - Visual Pursuit & Tracking Drill | SkillDrills',
    description: 'Predict target locations during cyclic strobe blank intervals to train visual memory. Train visual pursuit tracking and coordinate re-acquisition speeds. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking/strobe-prediction-pursuit',
  },
};

export default function StrobePredictionPursuitPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Strobe Prediction Pursuit" }
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
            "name": "Strobe Prediction Pursuit Drill",
            "url": "https://skilldrills.online/drills/visual-tracking/strobe-prediction-pursuit",
            "description": "Predict target locations during cyclic strobe blank intervals to train visual memory.",
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
                "name": "What is the Strobe Prediction Pursuit Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Predict target locations during cyclic strobe blank intervals to train visual memory."
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

      <StrobePredictionPursuitClient />
    </>
  );
}
