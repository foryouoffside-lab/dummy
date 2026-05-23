import QuickMathClient from './QuickMathClient';

export const metadata = {
  title: 'Quick Math Drill - Processing Speed & Mental Calculation | SkillDrills',
  description: 'Boost processing speed with adaptive math. Unique non-repeating questions across addition, subtraction, multiplication, and division. 60-second challenge. No sign-up.',
  keywords: [
    'quick math drill', 'mental math speed test', 'processing speed training',
    'rapid calculation practice', 'math reflexes test', 'arithmetic speed drill',
    'cognitive processing speed', 'number fluency training', 'math practice online',
    'speed math test free', 'mental calculation drill', 'brain speed training',
    'reaction math game', 'free math speed test', 'cognitive training math',
    'adaptive math drill', 'unique math questions', 'never repeat math problems',
    'addition subtraction multiplication division practice', 'math combo streak',
    'lives system math game', 'math fluency test', 'quick arithmetic practice',
    'mental agility training', 'brain fitness math', 'cognitive enhancement math',
    'competitive exam math practice', 'SAT math speed', 'GRE quantitative practice',
    'GMAT math preparation', 'CAT quantitative aptitude', 'UPSC math practice',
    'SSC math drill', 'banking exam math', 'placement test math',
    'skilldrills quick math', 'skilldrills processing speed', 'free brain training math',
    'online math exercise', 'browser math game', 'no download math practice',
    'daily math drill', 'math warm up exercise', 'math skills improvement',
  ],
  openGraph: {
    title: 'Quick Math Drill - Processing Speed Training | SkillDrills',
    description: 'Adaptive difficulty with unique non-repeating questions. 60s challenge. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/processing-speed/quick-math',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Quick Math Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Math Drill | SkillDrills',
    description: 'Boost processing speed with adaptive math. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/processing-speed/quick-math',
  },
};

export default function QuickMathPage() {
  return (
    <>
      <noscript>
        <h1>Quick Math Drill - Processing Speed & Mental Calculation Training</h1>
        <p>Free quick math drill with adaptive difficulty and unique non-repeating questions. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 4, "name": "Quick Math" }
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
            "name": "Quick Math Drill",
            "url": "https://skilldrills.online/drills/cognitive/processing-speed/quick-math",
            "description": "Free quick math drill for processing speed training. Adaptive difficulty with unique non-repeating questions. 60-second challenge with combo streaks.",
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
                "name": "What is the Quick Math Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free processing speed tool with adaptive difficulty from level 1 to 20. Addition, subtraction, multiplication, and division with unique never-repeating questions."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every 5 correct answers increase difficulty by 1 level up to 20. Higher levels introduce larger numbers and division at level 6+."
                }
              },
              {
                "@type": "Question",
                "name": "Do questions ever repeat?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Persistent history stores up to 1000 unique questions. Clear history anytime to reset the question pool."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This quick math drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <QuickMathClient />
    </>
  );
}