import MentalArithmeticClient from './MentalArithmeticClient';

export const metadata = {
  title: 'Mental Arithmetic Drill - Working Memory & Math Training | SkillDrills',
  description: 'Train working memory with 4 operations across 8 adaptive levels. 10-second timer per problem. Difficulty scales with score. No sign-up.',
  keywords: [
    'mental arithmetic', 'working memory math', 'mental calculation drill',
    'math working memory', 'arithmetic brain training', 'mental math practice',
    'working memory exercise', 'calculation memory drill', 'math brain game',
    'mental computation training', 'arithmetic working memory', 'number memory drill',
    'free memory math', 'cognitive math training', 'mental math test',
    'mental arithmetic free', 'working memory drill free', 'mental math challenge',
    'timed arithmetic practice', 'adaptive math drill', 'numerical working memory',
    'mental calculation practice', 'math fluency training', 'arithmetic speed test',
    'skilldrills mental arithmetic', 'skilldrills working memory', 'skilldrills math',
    'brain math training', 'cognitive arithmetic drill', 'mental computation test',
    'quick math practice', 'math memory exercise', 'mental number processing',
  ],
  openGraph: {
    title: 'Mental Arithmetic Drill - Working Memory Training | SkillDrills',
    description: '4 operations across 8 adaptive levels. 10-second timer. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/working-memory/mental-arithmetic',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Mental Arithmetic Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Arithmetic Drill | SkillDrills',
    description: '4 operations with 8 adaptive levels. Free mental math.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/working-memory/mental-arithmetic',
  },
};

export default function MentalArithmeticPage() {
  return (
    <>
      <noscript>
        <h1>Mental Arithmetic Drill - Working Memory & Mental Calculation Training</h1>
        <p>Free mental arithmetic drill with 4 operations and 8 adaptive difficulty levels. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Working Memory", "item": "https://skilldrills.online/drills/memory/working-memory" },
              { "@type": "ListItem", "position": 4, "name": "Mental Arithmetic" }
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
            "name": "Mental Arithmetic Drill",
            "url": "https://skilldrills.online/drills/memory/working-memory/mental-arithmetic",
            "description": "Free working memory drill with 4 operations across 8 adaptive levels. 10-second timer per problem. Difficulty scales with score.",
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
                "name": "What is the Mental Arithmetic Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free working memory exercise with 4 operations. 10-second timer per problem, red warning under 3 seconds. Correct answer shown on mistakes."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "8 levels scale with your score. Level 1 uses small numbers, Level 8 uses the largest. Number sizes increase as you answer correctly."
                }
              },
              {
                "@type": "Question",
                "name": "What operations are included?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Addition, subtraction (positive results), multiplication, and division (always even). Numbers scale with difficulty level."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This mental arithmetic drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <MentalArithmeticClient />
    </>
  );
}