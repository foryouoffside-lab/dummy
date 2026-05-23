import MathReactionClient from './MathReactionClient';

export const metadata = {
  title: 'Math Reaction - Odd Even Speed Drill | SkillDrills',
  description: 'Train math speed and reaction time with this free odd/even parity drill. Solve equations, identify results. Adaptive difficulty. 60-second challenge. No sign-up.',
  keywords: [
    'math reaction drill', 'odd even math game', 'mental math speed test', 'reaction time math',
    'parity training online', 'quick math game free', 'math reflex test', 'number sense practice',
    'arithmetic reaction drill', 'speed calculation test', 'math brain training',
    'addition subtraction multiplication practice', 'math reaction test free',
    'math speed challenge', 'reactive math practice', 'cognitive math exercise',
    'math fluency training', 'rapid math drill', 'math accuracy test',
    'math for students', 'math for competitive exams', 'SAT math practice',
    'GRE quantitative practice', 'GMAT math preparation',
    'banking exam math', 'SSC math practice',
    'brain training math', 'number fluency training', 'mental agility drill',
    'skilldrills math reaction', 'skilldrills odd even drill', 'free online math practice',
    'math warm up exercise', 'daily math drill', 'math skills improvement',
    'interactive math quiz', 'browser math game', 'no download math practice',
    'odd even concept practice', 'parity identification drill',
  ],
  openGraph: {
    title: 'Math Reaction - Odd Even Speed Drill | SkillDrills',
    description: 'Solve equations and identify odd/even results under time pressure. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/math-speed/Math-Reaction',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Math Reaction Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Reaction - Odd Even Speed Drill | SkillDrills',
    description: 'Train mental math speed. Identify odd/even under pressure. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/math-speed/Math-Reaction',
  },
};

export default function MathReactionPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Math Reaction" }
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
            "name": "Math Reaction Drill",
            "url": "https://skilldrills.online/drills/academic/math-speed/Math-Reaction",
            "description": "Free interactive math reaction drill combining mental arithmetic with odd/even parity identification. Adaptive difficulty from 600-1500ms. 60-second challenge.",
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
                "name": "What is the Math Reaction Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free speed math game combining mental arithmetic with reaction training. Solve equations and identify if the result is ODD or EVEN under adaptive time pressure from 600-1500ms."
                }
              },
              {
                "@type": "Question",
                "name": "How does the adaptive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The response window adapts to your performance. Correct answers reduce the window by 50ms making it harder. Wrong answers increase it by 100ms. The window ranges from 600ms minimum to 1500ms maximum."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this drill improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mental arithmetic speed, odd/even number recognition, reaction time, quick decision making, and focus under time pressure."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This math reaction drill is completely free and works instantly in your browser. Best scores save locally."
                }
              }
            ]
          })
        }}
      />

      <MathReactionClient />
    </>
  );
}