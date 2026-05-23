import WordRecallClient from './WordRecallClient';

export const metadata = {
  title: 'Word Recall - Short-Term Memory | SkillDrills',
  description: 'Train verbal memory with 50 unique words and progressive difficulty. 10-second memorization, then free recall typing. No sign-up.',
  keywords: [
    'word recall', 'verbal memory', 'word list memory', 'short term memory words',
    'word recall test', 'verbal learning drill', 'word memory game',
    'free recall words', 'word list recall', 'verbal short term memory',
    'word memorization drill', 'vocabulary memory', 'free memory drill',
    'verbal recall training', 'word memory test',
    'word recall free', 'verbal memory drill free', 'free word recall practice',
    'word list learning', 'verbal working memory', 'word recall exercise',
    'vocabulary recall drill', 'word memory practice', 'list learning memory',
    'skilldrills word recall', 'skilldrills verbal memory', 'skilldrills short term',
    'free recall memory test', 'word retention drill', 'verbal recall game',
    'word memorization practice', 'vocabulary memory test', 'word list drill',
  ],
  openGraph: {
    title: 'Word Recall - Short-Term Memory | SkillDrills',
    description: 'Train verbal memory with 50 unique words and progressive difficulty. 10-second memorization, then free recall typing. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/short-term-memory/word-recall',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Word Recall Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Recall - Short-Term Memory | SkillDrills',
    description: 'Train verbal memory with 50 unique words and progressive difficulty. 10-second memorization, then free recall typing. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/short-term-memory/word-recall',
  },
};

export default function WordRecallPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Short-Term Memory", "item": "https://skilldrills.online/drills/memory/short-term-memory" },
              { "@type": "ListItem", "position": 4, "name": "Word Recall" }
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
            "name": "Word Recall Drill",
            "url": "https://skilldrills.online/drills/memory/short-term-memory/word-recall",
            "description": "Free verbal memory drill with 50 unique words. 10-second memorization, free recall typing. Progressive difficulty starting at 3 words. Green/red feedback.",
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
                "name": "What is the Word Recall Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free verbal memory exercise with 50 unique words. 10-second memorization, then free recall typing without cues. Green/red feedback on results."
                }
              },
              {
                "@type": "Question",
                "name": "What is free recall and why is it important?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Retrieving information without cues or multiple choice. More challenging than recognition tests and better reflects real-world memory demands."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start at 3 words. Perfect recall advances to next level with +1 word. Any mistake stays at current level. No upper limit."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This word recall drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <WordRecallClient />
    </>
  );
}