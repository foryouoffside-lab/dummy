import MultiplicationClient from './MultiplicationClient';

export const metadata = {
  title: 'Multiplication Tables - Times Practice | SkillDrills',
  description: 'Master multiplication tables with intelligent practice. Prioritizes hard facts 6-12 across 3 ranges up to 20x20. 60-second challenge. No sign-up.',
  keywords: [
    'multiplication tables drill', 'times tables practice', 'multiplication speed test',
    'factor recall training', 'multiplication facts practice', 'times tables quiz online',
    'multiplication game free', 'mental multiplication practice', 'math facts drill',
    'multiplication automaticity', 'math speed drill', 'times tables training',
    'multiplication practice online', 'number facts practice', 'multiplication fluency',
    '12x12 multiplication', '15x15 times tables', '20x20 multiplication grid',
    'hard multiplication facts', 'tricky times tables', 'high friction numbers practice',
    'multiplication for students', 'elementary math practice', 'middle school math drill',
    'multiplication for competitive exams', 'SAT math practice',
    'GRE quantitative practice', 'GMAT math preparation',
    'banking exam math', 'SSC math practice',
    'brain training math', 'cognitive math exercise', 'number fluency training',
    'multiplication speed builder', 'rapid calculation drill', 'math accuracy practice',
    'skilldrills multiplication', 'skilldrills times tables', 'free online math practice',
    'daily math drill', 'times tables memorization',
    'interactive math quiz', 'browser math game', 'no download math practice',
    'multiplication for beginners', 'advanced multiplication drill',
  ],
  openGraph: {
    title: 'Multiplication Tables - Times Practice | SkillDrills',
    description: 'Master multiplication tables with intelligent practice. Prioritizes hard facts 6-12 across 3 ranges up to 20x20. 60-second challenge. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/math-speed/multiplication-tables',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Multiplication Tables Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multiplication Tables - Times Practice | SkillDrills',
    description: 'Master multiplication tables with intelligent practice. Prioritizes hard facts 6-12 across 3 ranges up to 20x20. 60-second challenge. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/math-speed/multiplication-tables',
  },
};

export default function MultiplicationPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Multiplication Tables" }
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
            "name": "Multiplication Tables Drill",
            "url": "https://skilldrills.online/drills/academic/math-speed/multiplication-tables",
            "description": "Free interactive multiplication tables drill with intelligent practice prioritizing hard facts 6-12. 3 ranges up to 20x20. 60-second timed challenge with adaptive scoring.",
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
                "name": "What is the Multiplication Tables Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free times tables practice tool that intelligently prioritizes high friction numbers 6-12. Features 3 ranges up to 20x20 with adaptive scoring rewarding harder facts."
                }
              },
              {
                "@type": "Question",
                "name": "How does the intelligent practice work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The drill prioritizes challenging combinations like 7x8 and 12x6 instead of easy facts like 1x1. This targeted approach leads to faster mastery."
                }
              },
              {
                "@type": "Question",
                "name": "What ranges are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Three ranges: 12x12 for standard tables, 15x15 for extended practice, and 20x20 for advanced fluency up to 400."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This multiplication drill is completely free and works instantly in your browser. Best scores save locally."
                }
              }
            ]
          })
        }}
      />

      <MultiplicationClient />
    </>
  );
}