import PatternRecognitionClient from './PatternRecognitionClient';

export const metadata = {
  title: 'Pattern Recognition Drill - Number Sequences & Reasoning | SkillDrills',
  description: 'Train pattern recognition with 5 types: Arithmetic, Geometric, Squares, Fibonacci, and Alternating. 5,000+ unique sequences. 60-second challenge. No sign-up.',
  keywords: [
    'pattern recognition drill', 'math patterns practice', 'number sequences test',
    'logical reasoning training', 'arithmetic sequence practice', 'geometric sequence test',
    'fibonacci sequence drill', 'square numbers pattern', 'alternating patterns practice',
    'math brain training', 'sequence prediction test', 'pattern finding exercise',
    'cognitive math drill', 'number pattern test free', 'logical thinking practice',
    'pattern recognition for exams', 'SAT pattern questions', 'GRE quantitative reasoning',
    'GMAT math patterns', 'CAT logical reasoning', 'UPSC reasoning practice',
    'SSC pattern recognition', 'banking exam reasoning', 'competitive exam math',
    'number series practice', 'sequence completion test', 'math reasoning drill',
    'pattern recognition online', 'free brain training math', 'cognitive development math',
    'skilldrills pattern recognition', 'skilldrills math drill', 'free pattern practice',
    'online sequence solver', 'math pattern finder', 'number prediction drill',
    'aptitude test practice', 'psychometric test patterns', 'IQ test number sequences',
    'mathematical reasoning test', 'analytical thinking math', 'problem solving patterns',
  ],
  openGraph: {
    title: 'Pattern Recognition Drill - Number Sequences | SkillDrills',
    description: '5 pattern types with 5,000+ unique sequences. Train logical reasoning. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/memory/pattern-recognition',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Pattern Recognition Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pattern Recognition Drill | SkillDrills',
    description: '5 pattern types, 5000+ sequences. Train reasoning. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/memory/pattern-recognition',
  },
};

export default function PatternRecognitionPage() {
  return (
    <>
      <noscript>
        <h1>Pattern Recognition Drill - Number Sequence & Logical Reasoning Training</h1>
        <p>Free pattern recognition drill with 5 pattern types and 5,000+ unique sequences. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Memory", "item": "https://skilldrills.online/drills/cognitive/memory" },
              { "@type": "ListItem", "position": 4, "name": "Pattern Recognition" }
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
            "name": "Pattern Recognition Drill",
            "url": "https://skilldrills.online/drills/cognitive/memory/pattern-recognition",
            "description": "Free pattern recognition drill with 5 types: Arithmetic, Geometric, Squares, Fibonacci, and Alternating. 5,000+ unique sequences, 60-second challenge.",
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
                "name": "What is the Pattern Recognition Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free tool training mathematical sequence identification. 5 types: Arithmetic, Geometric, Squares, Fibonacci, and Alternating. 5,000+ unique non-repeating sequences."
                }
              },
              {
                "@type": "Question",
                "name": "What pattern types are covered?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Arithmetic (constant difference), Geometric (constant ratio), Square numbers, Fibonacci (sum of previous two), and Alternating (add/subtract patterns)."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for competitive exams?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Number series questions appear on SAT, GRE, GMAT, CAT, UPSC, SSC, banking exams, and placement aptitude tests."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This pattern drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <PatternRecognitionClient />
    </>
  );
}