import ImageAssociationClient from './ImageAssociationClient';

export const metadata = {
  title: 'Image Association - Visual Memory | SkillDrills',
  description: 'Train visual association with 30 items, 5 words each. Memorize for 5 seconds, then free recall type all words. Green/red feedback. No sign-up.',
  keywords: [
    'image association', 'visual memory training', 'association memory',
    'word association drill', 'visual association game', 'long term memory',
    'memory association practice', 'image word association', 'free recall drill',
    'visual learning memory', 'associative learning game', 'memory improvement',
    'free memory training', 'visual association drill', 'cognitive memory exercise',
    'image association free', 'visual word association', 'free recall memory',
    'vocabulary building drill', 'visual verbal memory', 'emoji memory game',
    'word recall practice', 'associative memory visual', 'image memory test',
    'skilldrills image association', 'skilldrills visual memory', 'skilldrills long term',
    'free recall training', 'visual association learning', 'memory encoding drill',
    'word association memory', 'pictorial memory exercise', 'associative recall game',
  ],
  openGraph: {
    title: 'Image Association - Visual Memory | SkillDrills',
    description: 'Train visual association with 30 items, 5 words each. Memorize for 5 seconds, then free recall type all words. Green/red feedback. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/long-term-memory/image-association',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Image Association Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Association - Visual Memory | SkillDrills',
    description: 'Train visual association with 30 items, 5 words each. Memorize for 5 seconds, then free recall type all words. Green/red feedback. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/long-term-memory/image-association',
  },
};

export default function ImageAssociationPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Memory Training", "item": "https://skilldrills.online/drills/memory" },
              { "@type": "ListItem", "position": 3, "name": "Long-Term Memory", "item": "https://skilldrills.online/drills/memory/long-term-memory" },
              { "@type": "ListItem", "position": 4, "name": "Image Association" }
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
            "name": "Image Association Drill",
            "url": "https://skilldrills.online/drills/memory/long-term-memory/image-association",
            "description": "Free visual memory drill with 30 unique items and 5 associated words each. 5-second memorization, free recall typing. Green/red feedback on results.",
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
                "name": "What is the Image Association Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual memory exercise with 30 items and 5 associated words each. Memorize for 5 seconds, then free recall type all words. Green/red feedback."
                }
              },
              {
                "@type": "Question",
                "name": "How does scoring work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "+1 per correct word, -1 per wrong. 80%+ accuracy builds streaks. Results show green checkmarks for recalled and red crosses for missed words."
                }
              },
              {
                "@type": "Question",
                "name": "What memory skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Visual association, word recall, long-term memory encoding, vocabulary building, and free recall ability without multiple choice cues."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This image association drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ImageAssociationClient />
    </>
  );
}