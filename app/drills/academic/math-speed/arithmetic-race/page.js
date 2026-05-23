import ArithmeticRaceClient from './ArithmeticRaceClient';

export const metadata = {
  title: 'Arithmetic Race - Speed Math Drill | SkillDrills',
  description: 'Boost mental math with timed arithmetic race. Addition, subtraction, and multiplication across 3 levels. 60-second challenge. No sign-up.',
  keywords: [
    'arithmetic race drill', 'speed math practice', 'mental math training', 'math drill online',
    'calculation speed test', 'arithmetic practice free', 'math game online', 'quick math test',
    'mental calculation training', 'math speed test free', 'number skills practice',
    'addition subtraction multiplication practice', 'timed math challenge', 'math race game',
    'free math drills', 'math speed challenge', 'arithmetic speed test',
    'basic math practice', 'advanced math drill', 'speed addition practice',
    'math for students', 'math for competitive exams', 'SAT math practice',
    'GRE quantitative practice', 'GMAT math preparation', 'CAT quantitative aptitude',
    'banking exam math', 'SSC math practice',
    'brain training math', 'cognitive math exercise', 'number fluency training',
    'math fluency test', 'rapid calculation drill', 'math accuracy practice',
    'skilldrills arithmetic', 'skilldrills math drill', 'free online math practice',
    'math warm up exercise', 'daily math drill', 'math skills improvement',
    'interactive math quiz', 'browser math game', 'no download math practice',
  ],
  openGraph: {
    title: 'Arithmetic Race - Speed Math Drill | SkillDrills',
    description: 'Boost mental math with timed arithmetic race. Addition, subtraction, and multiplication across 3 levels. 60-second challenge. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/math-speed/arithmetic-race',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Arithmetic Race Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arithmetic Race - Speed Math Drill | SkillDrills',
    description: 'Boost mental math with timed arithmetic race. Addition, subtraction, and multiplication across 3 levels. 60-second challenge. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/math-speed/arithmetic-race',
  },
};

export default function ArithmeticRacePage() {
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
              { "@type": "ListItem", "position": 2, "name": "Academic Drills", "item": "https://skilldrills.online/drills/academic" },
              { "@type": "ListItem", "position": 3, "name": "Math Speed", "item": "https://skilldrills.online/drills/academic/math-speed" },
              { "@type": "ListItem", "position": 4, "name": "Arithmetic Race" }
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
            "name": "Arithmetic Race Drill",
            "url": "https://skilldrills.online/drills/academic/math-speed/arithmetic-race",
            "description": "Free interactive arithmetic race for speed math and mental calculation. 3 difficulty levels with addition, subtraction, and multiplication. 60-second challenge.",
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
                "name": "What is the Arithmetic Race Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free speed math challenge testing addition, subtraction, and multiplication across 3 difficulty levels. 60-second timed format with lives system and combo streaks."
                }
              },
              {
                "@type": "Question",
                "name": "What math operations are covered?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Addition, subtraction, and multiplication. Basic level focuses on smaller numbers, Pro introduces larger numbers, and Elite features complex calculations across all operations."
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
                  "text": "No registration required. This arithmetic race drill is completely free and works instantly in your browser. Best scores save locally."
                }
              }
            ]
          })
        }}
      />

      <ArithmeticRaceClient />
    </>
  );
}