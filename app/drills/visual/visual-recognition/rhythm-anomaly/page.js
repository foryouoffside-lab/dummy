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
                "name": "What is the Rhythm Anomaly Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual temporal discrimination exercise. 6x6 grid of 36 pulsing cells. Find the cell pulsing at a faster frequency than the steady grid rhythm."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Each round is a fixed 45 seconds. Correct hits earn +10 PTS; misclicks and timeouts reset your current streak, but never deduct score points or reduce remaining timer seconds."
                }
              },
              {
                "@type": "Question",
                "name": "How does speed scaling work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consecutive hits increase the speed level, accelerating the overall grid pulse frequency and tightening timeout limits."
                }
              },
              {
                "@type": "Question",
                "name": "What is the random cell flicker I sometimes see?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "That's the entropy scramble — a handful of random non-target cells flash briefly as background visual noise."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Your level only ever goes up — a mistake never takes you back down, so you can safely master your current speed."
                }
              },
              {
                "@type": "Question",
                "name": "How long does each drill session last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each round is timed for exactly 45 seconds of continuous focus."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This drill runs directly in your browser with instant response."
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