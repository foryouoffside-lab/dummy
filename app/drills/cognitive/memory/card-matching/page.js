import CardMatchingClient from './CardMatchingClient';

export const metadata = {
  title: 'Card Matching Game - Visual Memory & Brain Training | SkillDrills',
  description: 'Train visual memory with 15+ icons on expanding grids from 12 to 32+ cards. Combo streaks, no penalties, 60-second challenge. No sign-up.',
  keywords: [
    'card matching game', 'memory game online', 'pair matching game', 'visual memory training',
    'memory training game', 'concentration game free', 'matching pairs game',
    'brain training memory', 'cognitive memory game', 'pattern matching game',
    'visual recall practice', 'memory exercise online', 'free memory game',
    'card flip game', 'concentration memory drill', 'matching cards online',
    'visual memory test', 'memory improvement game', 'brain fitness game',
    'cognitive training memory', 'working memory game', 'spatial memory practice',
    'free brain games', 'memory games for adults', 'memory games for seniors',
    'cognitive enhancement game', 'neuroplasticity game', 'brain health exercise',
    'skilldrills card matching', 'skilldrills memory game', 'free online memory drill',
    'progressive memory game', 'expanding grid memory', 'icon matching game',
    'visual pattern memory', 'short term memory game', 'concentration practice',
    'focus training game', 'attention memory drill', 'memory recall practice',
    'free cognitive assessment', 'brain training platform', 'online brain exercise',
    'no download memory game', 'browser memory game', 'instant play memory game',
  ],
  openGraph: {
    title: 'Card Matching Game - Visual Memory Training | SkillDrills',
    description: 'Train memory with 15+ icons on expanding grids. Free brain training game.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/memory/card-matching',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Card Matching Memory Game',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Card Matching Game | SkillDrills',
    description: 'Train visual memory with expanding grids. Free brain game.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/memory/card-matching',
  },
};

export default function CardMatchingPage() {
  return (
    <>
      <noscript>
        <h1>Card Matching Game - Visual Memory & Pair Recall Brain Training</h1>
        <p>Free card matching memory game with 15+ icons on expanding grids. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Memory", "item": "https://skilldrills.online/drills/cognitive/memory" },
              { "@type": "ListItem", "position": 4, "name": "Card Matching" }
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
            "name": "Card Matching Memory Game",
            "url": "https://skilldrills.online/drills/cognitive/memory/card-matching",
            "description": "Free card matching memory game with 15+ icons on expanding grids from 12 to 32+ cards. Combo streaks, no penalties, 60-second challenge.",
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
                "name": "What is the Card Matching Memory Game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free brain training game where you flip cards to find matching icon pairs. Expanding grids from 12 to 32+ cards with combo streaks and no penalties."
                }
              },
              {
                "@type": "Question",
                "name": "How does it improve memory?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Exercises visual working memory by requiring you to remember card positions. Progressive grid expansion increases cognitive load for continuous improvement."
                }
              },
              {
                "@type": "Question",
                "name": "Is this good for seniors?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Visual memory exercises help maintain cognitive health. Clear icons and distinct colors make it suitable for all ages."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This memory game is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <CardMatchingClient />
    </>
  );
}