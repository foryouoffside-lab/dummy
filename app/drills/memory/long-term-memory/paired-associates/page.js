import PairedAssociatesClient from './PairedAssociatesClient';

export const metadata = {
  title: 'Paired Associates Drill - Word Pair Memory Training | SkillDrills',
  description: 'Train paired associate memory with 80 unique word pairs across 5 difficulty tiers. Memorize pairs, then pick the correct match from 3 options. Adaptive rounds. No sign-up.',
  keywords: [
    'paired associates', 'word pair memory', 'associative memory training',
    'paired associate learning', 'word matching drill', 'long term memory pairs',
    'memory association pairs', 'word link training', 'pair recall drill',
    'associative recall pairs', 'cognitive memory pairs', 'paired recall test',
    'free memory drill', 'word pair practice', 'paired associate test',
    'paired associates free', 'word pair drill free', 'paired learning memory',
    'vocabulary pair training', 'associative word pairs', 'pair matching drill',
    'memory pair recall', 'word association pairs', 'paired associate game',
    'skilldrills paired associates', 'skilldrills word pairs', 'skilldrills memory',
    'word link memory', 'associative recall training', 'paired word test',
    'vocabulary memory pairs', 'word connection drill', 'paired learning game',
  ],
  openGraph: {
    title: 'Paired Associates Drill - Word Pair Memory | SkillDrills',
    description: '80 word pairs across 5 difficulty tiers. Memorize then match. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/long-term-memory/paired-associates',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Paired Associates Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paired Associates Drill | SkillDrills',
    description: '80 word pairs across 5 tiers. Memorize then match. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/long-term-memory/paired-associates',
  },
};

export default function PairedAssociatesPage() {
  return (
    <>
      <noscript>
        <h1>Paired Associates Drill - Long-Term Memory & Word Pair Training</h1>
        <p>Free paired associates drill with 80 unique word pairs across 5 difficulty tiers. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Memory Training", "item": "https://skilldrills.online/drills/memory" },
              { "@type": "ListItem", "position": 3, "name": "Long-Term Memory", "item": "https://skilldrills.online/drills/memory/long-term-memory" },
              { "@type": "ListItem", "position": 4, "name": "Paired Associates" }
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
            "name": "Paired Associates Drill",
            "url": "https://skilldrills.online/drills/memory/long-term-memory/paired-associates",
            "description": "Free paired associate memory drill with 80 unique word pairs across 5 difficulty tiers. 5-second memorization, multiple choice recall. Adaptive rounds 3-17 pairs.",
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
                "name": "What is the Paired Associates Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free memory exercise with 80 word pairs across 5 tiers from Common to Expert. Memorize pairs for 5 seconds, then pick the correct match from 3 options."
                }
              },
              {
                "@type": "Question",
                "name": "What are the difficulty tiers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Common (everyday pairs), Intermediate (tool relationships), Technical (scientific), Advanced (specialized), and Expert (highly specialized concepts)."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive round progression work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start at 3 pairs. Each completed round adds +1 pair, progressing up to 17 pairs. Always challenged at your current memory level."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This paired associates drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <PairedAssociatesClient />
    </>
  );
}