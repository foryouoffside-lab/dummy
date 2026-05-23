import RapidObjectIdClient from './RapidObjectIdClient';

export const metadata = {
  title: 'Neural Shape ID Drill - Rapid Object Recognition | SkillDrills',
  description: 'Train rapid shape recognition with adaptive 50-300ms flash. Circle=Left/A, Square=Right/D. Keyboard support. 3 lives, reaction tracking. No sign-up.',
  keywords: [
    'rapid object recognition', 'shape identification', 'visual processing speed',
    'object recognition drill', 'circle square test', 'rapid visual processing',
    'shape detection training', 'visual discrimination test', 'quick shape id',
    'visual cognition drill', 'object classification speed', 'brain training',
    'free shape recognition test', 'neural shape id',
    'neural shape id free', 'shape recognition drill free', 'circle square response',
    'dual choice reaction drill', 'adaptive flash duration', 'visual response selection',
    'rapid shape identification', 'visual decision making', 'shape flash training',
    'skilldrills neural shape', 'skilldrills visual recognition', 'skilldrills rapid',
    'left right shape drill', 'keyboard response training', 'visual cognition speed',
    'shape discrimination practice', 'reaction time shapes', 'object classification drill',
  ],
  openGraph: {
    title: 'Neural Shape ID Drill - Rapid Recognition | SkillDrills',
    description: 'Circle=Left Square=Right. Adaptive 50-300ms flash. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/visual-recognition/rapid-object-id',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Neural Shape ID Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neural Shape ID Drill | SkillDrills',
    description: 'Circle=Left Square=Right. Adaptive flash. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/rapid-object-id',
  },
};

export default function RapidObjectIdPage() {
  return (
    <>
      <noscript>
        <h1>Neural Shape ID Drill - Rapid Object Recognition & Visual Processing Training</h1>
        <p>Free rapid shape recognition drill with adaptive 50-300ms flash. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 4, "name": "Neural Shape ID" }
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
            "name": "Neural Shape ID Drill",
            "url": "https://skilldrills.online/drills/visual/visual-recognition/rapid-object-id",
            "description": "Free rapid shape recognition drill. Adaptive 50-300ms flash. Circle=Left/A, Square=Right/D. 3 lives, millisecond reaction tracking.",
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
                "name": "What is the Neural Shape ID Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free rapid recognition exercise. Circle or Square flash briefly (50-300ms adaptive). Circle=Left/A, Square=Right/D. Reaction time tracked."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive flash work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 250ms. Correct answers tighten by 6ms (min 50ms). Wrong answers loosen by 20ms (max 300ms). Always at your processing speed."
                }
              },
              {
                "@type": "Question",
                "name": "What control options are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mouse: click LEFT/RIGHT buttons. Keyboard: A/Left Arrow for Circle, D/Right Arrow for Square. Faster responses with keyboard."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This shape recognition drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <RapidObjectIdClient />
    </>
  );
}