import EntropicGridClient from './EntropicGridClient';

export const metadata = {
  title: 'Entropic Grid Pro - Concentration Grid & Visual Search Test',
  description: 'Train visual focus with 100-cell concentration grid test. Find target codes under dynamic entropy noise, zero negative penalties, 45-second session.',
  keywords: [
    'concentration grid online free',
    'visual search test online',
    'entropic grid',
    'visual scanning test',
    'cognitive focus grid',
    'visual recognition drill',
    'target search grid',
    'attention concentration test',
    'visual noise filtering',
    'skilldrills entropic grid',
  ],
  openGraph: {
    title: 'Entropic Grid Pro - Concentration Grid & Visual Search Test | SkillDrills',
    description: 'Train visual focus with 100-cell concentration grid test. Find target codes under dynamic entropy noise, zero penalties. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/visual-recognition/entropic-grid',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entropic Grid Pro - Concentration Grid & Visual Search Test | SkillDrills',
    description: 'Train visual focus with 100-cell concentration grid test. Find target codes under dynamic entropy noise, zero penalties. Free.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/entropic-grid',
  },
};

export default function EntropicGridPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Entropic Grid Pro" }
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
            "name": "Entropic Grid Pro Drill",
            "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
            "description": "Free visual search and concentration grid test. Find target codes in a 100-cell grid under dynamic entropy noise, zero negative penalties, clean 45-second timer.",
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
                "name": "What is the Entropic Grid Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual search and concentration exercise. Find target 2-character codes on a 100-cell grid while entropy noise continuously reshuffles background cells."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every 5 targets found you level up, the target code swaps to a new 12-second cycle, and the number of guaranteed live target cells on the grid grows (up to 6)."
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

      <EntropicGridClient />
    </>
  );
}