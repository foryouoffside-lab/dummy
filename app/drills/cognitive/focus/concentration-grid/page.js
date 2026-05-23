import ConcentrationGridClient from './ConcentrationGridClient';

export const metadata = {
  title: 'Concentration Grid - Number Search | SkillDrills',
  description: 'Train visual scanning and focus by finding numbers in order on expanding 3x3 to 8x8 grids. 6 levels, 60-second challenge. No sign-up.',
  keywords: [
    'concentration grid drill', 'number search game', 'sequential search training',
    'focus training online', 'visual scanning exercise', 'concentration exercise free',
    'grid search game', 'attention training drill', 'number sequence practice',
    'cognitive training free', 'visual processing drill', 'focus improvement game',
    'brain training grid', 'concentration test online', 'sustained attention drill',
    'sequential processing practice', 'visual search training', 'focus drill free',
    'cognitive focus exercise', 'attention span training', 'concentration practice',
    'number finding game', 'grid scanning exercise', 'mental focus training',
    'skilldrills concentration', 'skilldrills focus drill', 'free brain training',
    'cognitive enhancement exercise', 'attention building game', 'focus stamina training',
    'visual attention drill', 'number hunt game', 'progressive focus challenge',
    'ADHD focus training', 'concentration exercises for students', 'focus drills for adults',
    'brain games for concentration', 'free attention training', 'online focus test',
  ],
  openGraph: {
    title: 'Concentration Grid - Number Search | SkillDrills',
    description: 'Train visual scanning and focus by finding numbers in order on expanding 3x3 to 8x8 grids. 6 levels, 60-second challenge. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/focus/concentration-grid',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Concentration Grid Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concentration Grid - Number Search | SkillDrills',
    description: 'Train visual scanning and focus by finding numbers in order on expanding 3x3 to 8x8 grids. 6 levels, 60-second challenge. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/focus/concentration-grid',
  },
};

export default function ConcentrationGridPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Focus", "item": "https://skilldrills.online/drills/cognitive/focus" },
              { "@type": "ListItem", "position": 4, "name": "Concentration Grid" }
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
            "name": "Concentration Grid Drill",
            "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
            "description": "Free concentration grid drill for visual scanning and focus training. Find numbers in order on expanding 3x3 to 8x8 grids. 6 levels, 60-second challenge.",
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
                "name": "What is the Concentration Grid Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free focus training exercise where you find numbers in order on randomized grids that expand from 3x3 to 8x8 across 6 levels. 60-second timed challenge with combo bonuses."
                }
              },
              {
                "@type": "Question",
                "name": "What are the difficulty levels?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "6 levels: Level 1 (3x3), Level 2 (4x4), Level 3 (5x5), Level 4 (6x6), Level 5 (7x7), Level 6 (8x8). Advance by completing each grid."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Students, professionals, seniors, gamers, and anyone wanting better concentration and visual scanning speed. Suitable for all ages."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This concentration grid drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ConcentrationGridClient />
    </>
  );
}