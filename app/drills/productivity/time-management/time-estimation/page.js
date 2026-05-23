import TemporalPrecisionClient from './TemporalPrecisionClient';

export const metadata = {
  title: 'Time Estimation - Temporal Precision | SkillDrills',
  description: 'Train your internal clock. Hold and release to match 0.5-2.5s targets. No visual timer. 120ms accuracy window. No penalties. No sign-up.',
  keywords: [
    'time estimation', 'temporal precision', 'internal clock training',
    'time perception drill', 'interval timing', 'temporal accuracy',
    'time sense training', 'chronoception', 'time estimation game',
    'reaction time precision', 'temporal processing', 'motor timing',
    'subjective time', 'free time estimation test', 'timing accuracy',
    'temporal precision free', 'time estimation drill free', 'internal clock game',
    'hold and release timing', 'interval estimation practice', 'no visual timer',
    'millisecond error tracking', 'pure time perception', 'timing calibration',
    'skilldrills temporal precision', 'skilldrills time estimation', 'skilldrills timing',
    'subjective duration test', 'time awareness training', 'estimation accuracy drill',
    'motor response timing', 'temporal discrimination', 'duration estimation game',
  ],
  openGraph: {
    title: 'Time Estimation - Temporal Precision | SkillDrills',
    description: 'Hold and release to match 0.5-2.5s targets. No visual timer. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/productivity/time-management/time-estimation',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Temporal Precision Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Estimation - Temporal Precision | SkillDrills',
    description: 'Hold and release to match target times. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/time-management/time-estimation',
  },
};

export default function TemporalPrecisionPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Productivity Training", "item": "https://skilldrills.online/drills/productivity" },
              { "@type": "ListItem", "position": 3, "name": "Time Management", "item": "https://skilldrills.online/drills/productivity/time-management" },
              { "@type": "ListItem", "position": 4, "name": "Temporal Precision" }
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
            "name": "Temporal Precision Drill",
            "url": "https://skilldrills.online/drills/productivity/time-management/time-estimation",
            "description": "Free time estimation drill. Hold and release to match 0.5-2.5s targets. No visual timer. 120ms accuracy window. Millisecond error tracking.",
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
                "name": "What is the Temporal Precision Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free time estimation exercise. Hold and release to match 0.5-2.5s targets. No visual timer while holding. 120ms accuracy window."
                }
              },
              {
                "@type": "Question",
                "name": "Why is there no visual timer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Intentional design. Real-world time estimation lacks countdown timers. Forces development of internal clock independent of external cues."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Time estimation accuracy, temporal precision, interval timing, internal clock calibration, and motor timing precision."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This time estimation drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <TemporalPrecisionClient />
    </>
  );
}