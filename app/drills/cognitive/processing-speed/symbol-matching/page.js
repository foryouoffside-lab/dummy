import SymbolMatchingClient from './SymbolMatchingClient';

export const metadata = {
  title: 'Symbol Matching Drill - Cognitive Flexibility Training | SkillDrills',
  description: 'Train cognitive flexibility by matching Greek symbols to numbers with keys that change after every answer. 75-second challenge with reaction time tracking. No sign-up.',
  keywords: [
    'symbol matching drill', 'cognitive flexibility training', 'processing speed test',
    'symbol recognition game', 'reaction time test online', 'brain training free',
    'visual processing speed', 'cognitive switching exercise', 'symbol coding test',
    'mental flexibility drill', 'speed matching game', 'cognitive assessment free',
    'free brain game online', 'symbol speed test', 'reaction training free',
    'Greek symbol matching', 'number symbol association', 'cognitive flexibility test',
    'processing speed training', 'visual discrimination test', 'cognitive training online',
    'brain exercise free', 'mental agility drill', 'cognitive performance test',
    'symbol decoding practice', 'rapid symbol recognition', 'cognitive speed drill',
    'skilldrills symbol matching', 'skilldrills cognitive drill', 'free cognitive practice',
    'online brain training', 'browser cognitive test', 'no download brain game',
    'instant cognitive assessment', 'reaction time measurement', 'combo streak training',
    'working memory exercise', 'task switching practice', 'mental processing speed',
  ],
  openGraph: {
    title: 'Symbol Matching Drill - Cognitive Flexibility | SkillDrills',
    description: 'Match Greek symbols to numbers with changing keys. 75s challenge. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Symbol Matching Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Symbol Matching Drill | SkillDrills',
    description: 'Train cognitive flexibility. Match symbols to numbers. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching',
  },
};

export default function SymbolMatchingPage() {
  return (
    <>
      <noscript>
        <h1>Symbol Matching Drill - Cognitive Flexibility & Processing Speed Training</h1>
        <p>Free symbol matching drill with Greek symbols and constantly changing number keys. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Processing Speed", "item": "https://skilldrills.online/drills/cognitive/processing-speed" },
              { "@type": "ListItem", "position": 4, "name": "Symbol Matching" }
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
            "name": "Symbol Matching Drill",
            "url": "https://skilldrills.online/drills/cognitive/processing-speed/symbol-matching",
            "description": "Free symbol matching drill for cognitive flexibility training. Match Greek symbols to numbers with keys that change after every answer. 75-second challenge.",
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
                "name": "What is the Symbol Matching Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free cognitive training exercise where 9 Greek symbols map to numbers 1-9. The reference key changes after every answer, forcing constant cognitive switching."
                }
              },
              {
                "@type": "Question",
                "name": "How does it improve cognitive flexibility?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The changing symbol-to-number mapping forces your brain to abandon old associations and form new ones, strengthening task switching and mental adaptability."
                }
              },
              {
                "@type": "Question",
                "name": "What symbols are used?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nine Greek letters: Delta, Phi, Omega, Sigma, Xi, Pi, Psi, Gamma, and Theta. Visually distinct to maximize the cognitive switching challenge."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This symbol matching drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SymbolMatchingClient />
    </>
  );
}