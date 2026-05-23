import VisualSearchClient from './VisualSearchClient';

export const metadata = {
  title: 'Visual Search - Conjunctive Scanning | SkillDrills',
  description: 'Find C among 160 rotated O distractors in a 16x10 grid. Millisecond search time tracking. +1 correct, -1 wrong. 60-second challenge. No sign-up.',
  keywords: [
    'visual search', 'conjunctive search', 'visual scanning training',
    'find the letter', 'selective attention drill', 'visual discrimination',
    'letter search game', 'visual processing speed', 'attention to detail',
    'feature search', 'visual search paradigm', 'cognitive training',
    'free visual search test', 'concentration grid',
    'visual search free', 'conjunctive search drill free', 'letter grid search',
    'find C among O', 'visual scanning practice', 'selective attention test',
    'proofreading practice', 'visual inspection drill', 'target discrimination',
    'skilldrills visual search', 'skilldrills conjunctive', 'skilldrills scanning',
    '16x10 letter grid', 'rotated O distractors', 'search time tracking',
    'visual search speed', 'attention to detail practice', 'concentration exercise',
  ],
  openGraph: {
    title: 'Visual Search - Conjunctive Scanning | SkillDrills',
    description: 'Find C among 160 rotated Os in 16x10 grid. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Visual Search Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Search - Conjunctive Scanning | SkillDrills',
    description: 'Find C among 160 rotated Os. Millisecond tracking. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search',
  },
};

export default function VisualSearchPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Visual Search" }
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
            "name": "Visual Search Drill",
            "url": "https://skilldrills.online/drills/visual/visual-recognition/visual-search",
            "description": "Free conjunctive search drill. Find C among 160 rotated O distractors in 16x10 grid. Millisecond search time tracking. +1 correct, -1 wrong.",
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
                "name": "What is the Visual Search Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free conjunctive search exercise. Find C among 160 rotated O distractors in a 16x10 grid. Each O randomly rotated. Millisecond search time tracked."
                }
              },
              {
                "@type": "Question",
                "name": "What is conjunctive search?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Target shares features with distractors requiring focused attention. Unlike pop-out search, requires scanning each item. Transfers to real-world proofreading."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Visual search, selective attention, visual discrimination, processing speed, and concentration during sustained scanning."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This visual search drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <VisualSearchClient />
    </>
  );
}