import DistanceJudgmentClient from './DistanceJudgmentClient';

export const metadata = {
  title: 'Distance Judgment Lab - Depth Perception Training | SkillDrills',
  description: 'Train depth perception by intercepting a moving sphere at target depth. Color feedback green/yellow/red, auto-leveling speed. 60-second challenge. No sign-up.',
  keywords: [
    'distance judgment', 'depth perception training', 'spatial awareness',
    'depth interception', 'visual depth drill', 'spatial judgment test',
    'distance estimation', 'depth perception test', 'visual training',
    '3D perception drill', 'spatial cognition', 'depth accuracy training',
    'free depth perception test', 'visual spatial skills',
    'distance judgment free', 'depth perception drill free', 'spatial awareness training',
    'moving sphere interception', 'depth accuracy drill', 'visual depth perception',
    'spatial estimation practice', 'depth judgment test', 'perceptual accuracy training',
    'skilldrills distance judgment', 'skilldrills visual drills', 'skilldrills depth',
    'sphere interception drill', 'depth alignment practice', 'visual spatial judgment',
  ],
  openGraph: {
    title: 'Distance Judgment Lab - Depth Perception | SkillDrills',
    description: 'Intercept moving sphere at target depth. Color feedback. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/depth-perception/distance-judgment',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Distance Judgment Lab',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Distance Judgment Lab | SkillDrills',
    description: 'Intercept moving sphere at target depth. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/depth-perception/distance-judgment',
  },
};

export default function DistanceJudgmentPage() {
  return (
    <>
      <noscript>
        <h1>Distance Judgment Lab - Depth Perception & Spatial Awareness Training</h1>
        <p>Free depth perception drill with moving sphere interception and auto-leveling difficulty. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Depth Perception", "item": "https://skilldrills.online/drills/visual/depth-perception" },
              { "@type": "ListItem", "position": 4, "name": "Distance Judgment" }
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
            "name": "Distance Judgment Lab",
            "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
            "description": "Free depth perception drill. Intercept moving sphere at target depth. Color feedback (green/yellow/red), auto-leveling every 5 trials. 60-second challenge.",
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
                "name": "What is the Distance Judgment Lab?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free depth perception drill. Intercept a moving sphere at target depth. PERFECT (<5% error), CLOSE (<15%), FAR (15%+). Color feedback green/yellow/red."
                }
              },
              {
                "@type": "Question",
                "name": "How does auto-leveling work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every 5 trials, approach speed increases by 0.008 units/frame. Progressive difficulty without manual adjustment. Target depth ranges 25-85%."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Athletes, drivers, designers, gamers, and anyone wanting better depth perception and spatial awareness."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This distance judgment lab is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DistanceJudgmentClient />
    </>
  );
}