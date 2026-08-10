import DistanceJudgmentClient from './DistanceJudgmentClient';

export const metadata = {
  title: 'Distance Judgment Pro - Depth Perception Test | SkillDrills',
  description: 'Train stereoscopic depth perception with Distance Judgment test. Intercept 3D approaching spheres at target depth, zero penalties, 45s session. Free.',
  keywords: [
    'depth perception test online',
    'depth perception game',
    'distance judgment test',
    'stereopsis test online',
    'Howard-Dolman test',
    'distance estimation test',
    '3D perception drill',
    'hand-eye coordination',
    'skilldrills distance judgment',
  ],
  openGraph: {
    title: 'Distance Judgment Pro - Depth Perception Test | SkillDrills',
    description: 'Train stereoscopic depth perception with Distance Judgment test. Intercept 3D approaching spheres at target depth, zero penalties. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/depth-perception/distance-judgment',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Distance Judgment Pro - Depth Perception Test | SkillDrills',
    description: 'Train stereoscopic depth perception with Distance Judgment test. Intercept 3D approaching spheres at target depth, zero penalties. Free.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/depth-perception/distance-judgment',
  },
};

export default function DistanceJudgmentPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Depth Perception", "item": "https://skilldrills.online/drills/visual/depth-perception" },
              { "@type": "ListItem", "position": 4, "name": "Distance Judgment Pro" }
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
            "name": "Distance Judgment Pro Drill",
            "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
            "description": "Free depth perception task. Intercept an approaching 3D sphere at target ring depth, zero negative penalties, clean 45-second timer.",
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
                "name": "What is Distance Judgment Pro?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 3D depth perception exercise. Tap when the approaching 3D sphere perfectly matches the depth ring size."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "As your score increases, sphere approach speed accelerates from 2200ms down to 500ms and target depth windows become narrower."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. A missed tap never deducts score points or reduces remaining timer seconds — the screen just flashes red and the next sphere approaches."
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
                "name": "What skills does this drill improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stereoscopic depth perception, visual distance estimation, 3D spatial awareness, and interceptive timing."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The level remains unchanged when a mistake is made, allowing you to master your current level."
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

      <DistanceJudgmentClient />
    </>
  );
}