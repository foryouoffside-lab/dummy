import VisualSearchClient from './VisualSearchClient';

export const metadata = {
  title: 'Visual Search Pro - Conjunctive Scanning & Target Test | SkillDrills',
  description: 'Train visual scanning speed with conjunctive search test. Find target C among rotated O distractors, zero negative penalties, 45-second session. Free online tool.',
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
    title: 'Visual Search Pro - Conjunctive Scanning & Target Test | SkillDrills',
    description: 'Train visual scanning speed with conjunctive search test. Find target C among rotated O distractors, zero penalties. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/visual-recognition/visual-search',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Search Pro - Conjunctive Scanning & Target Test | SkillDrills',
    description: 'Train visual scanning speed with conjunctive search test. Find target C among rotated O distractors, zero penalties. Free.',
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
              { "@type": "ListItem", "position": 4, "name": "Visual Search Pro" }
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
            "name": "Visual Search Pro Drill",
            "url": "https://skilldrills.online/drills/visual/visual-recognition/visual-search",
            "description": "Free conjunctive search drill. Find target letter C hidden among rotated O distractors in a dense grid, zero negative penalties, clean 45-second timer.",
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
                  "text": "A free conjunctive search exercise. Find the target letter 'C' hidden among rotated 'O' distractors."
                }
              },
              {
                "@type": "Question",
                "name": "How does target location change?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The grid size stays constant while target 'C' shifts location continuously across the grid as you find each target."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Tapping a wrong cell never deducts score points or reduces remaining timer seconds — the cell just flashes red and you keep scanning."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Your level only ever goes up — a mistake never takes you back down, so you can safely master your current grid size."
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

      <VisualSearchClient />
    </>
  );
}