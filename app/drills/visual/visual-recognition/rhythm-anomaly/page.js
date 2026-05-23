import RhythmAnomalyClient from './RhythmAnomalyClient';

export const metadata = {
  title: 'Rhythm Anomaly Drill - Pulse Detection & Visual Rhythm | SkillDrills',
  description: 'Find the faster-pulsing cell in a 6x6 grid. Steady cells pulse at 2s, anomaly at 1.4s. Stamina system with decay. No sign-up.',
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
    title: 'Rhythm Anomaly Drill - Pulse Detection | SkillDrills',
    description: '6x6 grid with steady 2s and entropic 1.4s pulsing cells. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Rhythm Anomaly Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhythm Anomaly Drill | SkillDrills',
    description: 'Find the faster-pulsing cell in a 6x6 grid. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly',
  },
};

export default function RhythmAnomalyPage() {
  return (
    <>
      <noscript>
        <h1>Rhythm Anomaly Drill - Entropic Grid Pulse Detection & Visual Rhythm Training</h1>
        <p>Free visual rhythm drill. Find the faster-pulsing cell in a 6x6 grid. No sign-up required.</p>
      </noscript>

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
              { "@type": "ListItem", "position": 4, "name": "Rhythm Anomaly" }
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
            "name": "Rhythm Anomaly Drill",
            "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly",
            "description": "Free visual rhythm drill. 6x6 grid, 36 pulsing cells. Find anomaly at 1.4s vs steady 2s. Stamina system with decay. System Collapse at zero.",
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
                  "text": "A free visual rhythm exercise. 6x6 grid of 36 pulsing cells. Find the anomaly at 1.4s vs steady 2s. Anomaly relocates after each find."
                }
              },
              {
                "@type": "Question",
                "name": "How does the stamina system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "100 stamina. +5 per correct, -15 per wrong, -0.5/s decay. Zero stamina = System Collapse. Bar turns red below 30."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Visual rhythm perception, temporal discrimination, sustained visual attention, anomaly detection, and cognitive stamina."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This rhythm anomaly drill is completely free and works instantly in your browser."
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