import DistractionFighterClient from './DistractionFighterClient';

export const metadata = {
  title: 'Distraction Fighter - Stroop Test & Cognitive Inhibition | SkillDrills',
  description: 'Train cognitive inhibition with the Stroop effect. Identify ink colors while ignoring conflicting word meanings. 8 colors, 60-second challenge. No sign-up.',
  keywords: [
    'distraction fighter', 'stroop test online', 'cognitive inhibition training',
    'stroop effect drill', 'focus training free', 'interference control practice',
    'attention training online', 'cognitive flexibility test', 'color word stroop test',
    'inhibition drill free', 'mental focus training', 'brain training stroop',
    'cognitive control exercise', 'distraction resistance training',
    'free stroop test', 'online stroop effect', 'cognitive assessment free',
    'focus improvement drill', 'selective attention test', 'executive function training',
    'brain games free', 'cognitive psychology test', 'neuropsychological test online',
    'skilldrills stroop', 'skilldrills distraction fighter', 'free cognitive drill',
    'mental processing speed', 'cognitive interference test', 'response inhibition training',
  ],
  openGraph: {
    title: 'Distraction Fighter - Stroop Test | SkillDrills',
    description: 'Classic Stroop effect drill. Identify ink colors, ignore words. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/focus/distraction-fighter',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Distraction Fighter Stroop Test',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stroop Test - Distraction Fighter | SkillDrills',
    description: 'Train cognitive inhibition. Identify ink colors, ignore words. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/focus/distraction-fighter',
  },
};

export default function DistractionFighterPage() {
  return (
    <>
      <noscript>
        <h1>Distraction Fighter - Stroop Test & Cognitive Inhibition Training</h1>
        <p>Free Stroop effect drill. Identify ink colors while ignoring conflicting word meanings. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Focus", "item": "https://skilldrills.online/drills/cognitive/focus" },
              { "@type": "ListItem", "position": 4, "name": "Distraction Fighter" }
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
            "name": "Distraction Fighter - Stroop Test",
            "url": "https://skilldrills.online/drills/cognitive/focus/distraction-fighter",
            "description": "Free Stroop effect drill for cognitive inhibition training. Identify ink colors while ignoring conflicting word meanings. 8 colors, 60-second challenge.",
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
                "name": "What is the Stroop test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A classic cognitive test measuring inhibition. Color words appear in incongruent ink colors. You identify the ink color while ignoring the word meaning."
                }
              },
              {
                "@type": "Question",
                "name": "What does the Stroop test measure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cognitive inhibition, selective attention, processing speed, and executive function. It assesses your brain's ability to suppress automatic responses."
                }
              },
              {
                "@type": "Question",
                "name": "Why is cognitive inhibition important?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Essential for focused work, decision-making, impulse control, and resisting distractions in daily life."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This Stroop test is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DistractionFighterClient />
    </>
  );
}