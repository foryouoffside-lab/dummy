import SentenceSpanClient from './SentenceSpanClient';

export const metadata = {
  title: 'Sentence Span - Verbal Working Memory | SkillDrills',
  description: 'Train verbal working memory with 30 unique sentences. Read for 2 seconds each, then recall key nouns. No sign-up.',
  keywords: [
    'sentence span drill', 'verbal working memory training', 'sentence recall test',
    'reading span task online', 'verbal memory training free', 'sentence memory test',
    'working memory span test', 'noun recall drill', 'verbal processing memory',
    'sentence comprehension memory', 'reading memory span', 'verbal working memory test',
    'free memory drill', 'sentence span task', 'verbal recall training',
    'working memory exercises', 'cognitive memory training', 'brain memory games',
    'short term memory test', 'verbal fluency test', 'language memory drill',
    'reading comprehension memory', 'auditory memory training', 'word recall practice',
    'memory span test online', 'cognitive assessment memory', 'working memory improvement',
    'free brain training memory', 'verbal working memory assessment', 'sentence processing drill',
    'skilldrills sentence span', 'skilldrills memory drill', 'free online memory test',
    'working memory practice', 'cognitive training memory', 'verbal memory span',
    'reading span test free', 'sentence recall memory', 'verbal working memory game',
    'memory training for students', 'memory exercises for adults', 'brain health memory',
    'cognitive reserve training', 'neuroplasticity memory', 'working memory challenge',
  ],
  openGraph: {
    title: 'Sentence Span - Verbal Working Memory | SkillDrills',
    description: 'Train verbal working memory with 30 unique sentences. Read for 2 seconds each, then recall key nouns. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/working-memory/sentence-span',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Sentence Span Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentence Span - Verbal Working Memory | SkillDrills',
    description: 'Train verbal working memory with 30 unique sentences. Read for 2 seconds each, then recall key nouns. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/working-memory/sentence-span',
  },
};

export default function SentenceSpanPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Working Memory", "item": "https://skilldrills.online/drills/memory/working-memory" },
              { "@type": "ListItem", "position": 4, "name": "Sentence Span" }
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
            "name": "Sentence Span Drill",
            "url": "https://skilldrills.online/drills/memory/working-memory/sentence-span",
            "description": "Free verbal working memory drill with 30 unique sentences. 2-second auto-advancing display, recall key nouns. Level-based scoring, 70% accuracy threshold.",
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
                "name": "What is the Sentence Span Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free verbal working memory exercise. 30 sentences auto-advance every 2 seconds. Recall key nouns. Level-based scoring with 70% accuracy to advance."
                }
              },
              {
                "@type": "Question",
                "name": "How does it improve working memory?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dual-task demand: process sentence meaning while holding key words in memory. Mirrors real-world challenges like conversations and lectures."
                }
              },
              {
                "@type": "Question",
                "name": "What is the scoring system?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Score = current level when 70%+ nouns recalled. Level 1 = 3 sentences (1 pt). No penalties. Correct nouns shown on failure for learning."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This sentence span drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SentenceSpanClient />
    </>
  );
}