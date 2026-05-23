import LogicPuzzlesClient from './LogicPuzzlesClient';

export const metadata = {
  title: 'Logic Puzzles Drill - Problem Solving & Reasoning | SkillDrills',
  description: 'Solve 8 types of unique logic puzzles including arithmetic, algebra, PEMDAS, Fibonacci, and percentages. 60-second challenge with hint system. No sign-up.',
  keywords: [
    'logic puzzles', 'math puzzles online', 'problem solving drill', 'logical reasoning practice',
    'brain teasers free', 'math problems practice', 'puzzle solving game', 'critical thinking exercises',
    'number sequences practice', 'algebra practice online', 'mathematical reasoning test',
    'cognitive puzzles free', 'logic training online', 'free puzzle games', 'brain training puzzles',
    'arithmetic sequence practice', 'geometric sequence drill', 'PEMDAS practice',
    'Fibonacci sequence practice', 'exponential patterns', 'percentage calculation practice',
    'number manipulation puzzles', 'competitive exam reasoning', 'SAT math practice', 'GRE quantitative',
    'GMAT problem solving', 'CAT logical reasoning', 'UPSC reasoning practice', 'SSC math drill',
    'banking exam preparation', 'aptitude test practice', 'quantitative reasoning test',
    'free online puzzles', 'daily logic practice', 'puzzle solving skills', 'mental math puzzles',
    'skilldrills logic puzzles', 'skilldrills problem solving', 'free brain games',
    'interactive math puzzles', 'browser puzzle game', 'no download logic games',
    'pattern recognition practice', 'deductive reasoning exercises', 'inductive reasoning drill',
  ],
  openGraph: {
    title: 'Logic Puzzles Drill - Problem Solving | SkillDrills',
    description: '8 unique puzzle types, 60-second challenge, hint system. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/problem-solving/logic-puzzles',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Logic Puzzles Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logic Puzzles Drill | SkillDrills',
    description: '8 puzzle types, 60s challenge, hints & combos. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/problem-solving/logic-puzzles',
  },
};

export default function LogicPuzzlesPage() {
  return (
    <>
      <noscript>
        <h1>Logic Puzzles Drill - Problem Solving & Mathematical Reasoning Training</h1>
        <p>Free logic puzzles drill with 8 unique puzzle types. 60-second challenge with hint system. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Problem Solving", "item": "https://skilldrills.online/drills/cognitive/problem-solving" },
              { "@type": "ListItem", "position": 4, "name": "Logic Puzzles" }
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
            "name": "Logic Puzzles Drill",
            "url": "https://skilldrills.online/drills/cognitive/problem-solving/logic-puzzles",
            "description": "Free logic puzzles drill with 8 unique puzzle types. Arithmetic, geometric, algebra, PEMDAS, Fibonacci, exponential, number manipulation, and percentages. 60-second challenge.",
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
                "name": "What types of logic puzzles are included?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "8 types: Arithmetic Sequences, Geometric Sequences, Basic Algebra, PEMDAS, Fibonacci-like, Exponential, Number Manipulation, and Percentages. Puzzles never repeat."
                }
              },
              {
                "@type": "Question",
                "name": "How does the hint system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each puzzle has a hint button revealing solving clues. Using a hint earns 0 points instead of +1, but the puzzle still counts as solved."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for competitive exams?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Covers quantitative reasoning for SAT, GRE, GMAT, CAT, UPSC, SSC, banking exams, and placement aptitude tests."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This logic puzzles drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <LogicPuzzlesClient />
    </>
  );
}