import MentalMathClient from './MentalMathClient';

export const metadata = {
  title: 'Mental Math Drill - Arithmetic Practice & Brain Training | SkillDrills',
  description: 'Sharpen mental arithmetic with this free timed math drill. Addition, subtraction, and multiplication across 3 levels. 60-second challenge. No sign-up.',
  keywords: [
    'mental math drill', 'speed math practice', 'arithmetic practice online', 'mental calculation training',
    'math training free', 'brain math game', 'quick math quiz online', 'number skills practice',
    'addition subtraction multiplication drill', 'math speed test free', 'mental arithmetic test',
    'timed math challenge', 'math brain training', 'calculation speed test',
    'free math drills', 'math speed challenge', 'arithmetic speed test', 'mental math game',
    'basic math practice', 'advanced math drill',
    'math for students', 'math for competitive exams', 'SAT math practice',
    'GRE quantitative practice', 'GMAT math preparation',
    'banking exam math', 'SSC math practice',
    'brain training math', 'cognitive math exercise', 'number fluency training',
    'skilldrills mental math', 'skilldrills math drill', 'free online math practice',
    'daily math drill', 'math skills improvement',
    'interactive math quiz', 'browser math game', 'no download math practice',
  ],
  openGraph: {
    title: 'Mental Math Drill - Arithmetic Training | SkillDrills',
    description: '60-second mental math challenge with 3 difficulty levels. Free, no sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/math-speed/mental-math',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Mental Math Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Math Drill | SkillDrills',
    description: 'Boost mental arithmetic. 3 levels, 60-second challenge. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/math-speed/mental-math',
  },
};

export default function MentalMathPage() {
  return (
    <>
      <noscript>
        <h1>Mental Math Drill - Arithmetic Practice & Brain Training</h1>
        <p>Free interactive mental math speed drill for arithmetic practice. 3 difficulty levels. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Academic Drills", "item": "https://skilldrills.online/drills/academic" },
              { "@type": "ListItem", "position": 3, "name": "Math Speed", "item": "https://skilldrills.online/drills/academic/math-speed" },
              { "@type": "ListItem", "position": 4, "name": "Mental Math" }
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
            "name": "Mental Math Drill",
            "url": "https://skilldrills.online/drills/academic/math-speed/mental-math",
            "description": "Free interactive mental math drill for arithmetic practice. 3 difficulty levels with addition, subtraction, and multiplication. 60-second challenge.",
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
                "name": "What is the Mental Math Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free arithmetic practice tool with 3 difficulty levels covering addition, subtraction, and multiplication. 60-second timed challenge with lives system and combo streaks."
                }
              },
              {
                "@type": "Question",
                "name": "What are the difficulty levels?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Basic for beginners with numbers up to 20. Pro for intermediate with numbers up to 50. Elite for advanced users with numbers up to 100 across all operations."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for competitive exams?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Improves mental calculation speed for SAT, ACT, GRE, GMAT, CAT, UPSC, SSC, banking exams, and placement aptitude tests."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This mental math drill is completely free and works instantly in your browser. Best scores save locally."
                }
              }
            ]
          })
        }}
      />

      <MentalMathClient />
    </>
  );
}