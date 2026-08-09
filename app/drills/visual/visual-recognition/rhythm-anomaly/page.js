import RhythmAnomalyClient from './RhythmAnomalyClient';

export const metadata = {
  title: 'Rhythm Anomaly Pro - Visual Rhythm & Temporal Perception Test | SkillDrills',
  description: 'Train visual temporal discrimination with 6x6 pulsing cell grid. Find out-of-sync anomaly cells in endless Time-Attack mode. Free online tool.',
  keywords: [
    'rhythm anomaly', 'entropic grid', 'pulse detection training',
    'visual rhythm drill', 'entropic cell finder', 'pulse pattern recognition',
    'visual anomaly detection', 'rhythm perception training', 'stamina system',
    'pulsing grid game', 'visual discrimination', 'cognitive stamina',
    'free visual training', 'entropy detection drill',
    'rhythm anomaly free', 'pulse detection drill free', 'visual rhythm game',
    'temporal discrimination training', 'pulse rate detection', 'cell pulse drill',
    'rhythm perception practice', 'anomaly detection grid', 'visual timing drill',
    'skilldrills rhythm anomaly', 'skilldrills pulse detection', 'skilldrills visual',
    '6x6 grid pulse', 'steady vs entropic', 'system collapse stamina',
    'visual scanning rhythm', 'pulse interval detection', 'rhythm comparison drill',
  ],
  openGraph: {
    title: 'Rhythm Anomaly Pro - Visual Rhythm & Temporal Perception Test | SkillDrills',
    description: 'Train visual temporal discrimination with 6x6 pulsing cell grid. Find out-of-sync anomaly cells in endless Time-Attack mode. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhythm Anomaly Pro - Visual Rhythm & Temporal Perception Test | SkillDrills',
    description: 'Train visual temporal discrimination with 6x6 pulsing cell grid. Find out-of-sync anomaly cells in endless Time-Attack mode. Free.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly',
  },
};

export default function RhythmAnomalyPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Visual Recognition", "item": "https://skilldrills.online/drills/visual/visual-recognition" },
              { "@type": "ListItem", "position": 4, "name": "Rhythm Anomaly Pro" }
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
            "name": "Rhythm Anomaly Pro Drill",
            "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly",
            "description": "Free visual rhythm and temporal discrimination drill. 6x6 grid with 36 pulsing cells. Find out-of-sync anomaly cell in endless Time-Attack mode.",
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
                "name": "What is the Rhythm Anomaly Pro Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual temporal perception exercise. 6x6 grid of 36 pulsing cells. Find the cell pulsing at a faster frequency than the steady grid rhythm."
                }
              },
              {
                "@type": "Question",
                "name": "How does Time-Attack work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You start with 45 seconds. Correct hits add +3 PTS, while misclicks and timeouts reset your current streak with zero time or score penalties."
                }
              },
              {
                "@type": "Question",
                "name": "How does speed scaling work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consecutive hits increase the speed level, accelerating pulse frequencies and tightening timeout limits."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <RhythmAnomalyClient />
    </>
  );
}