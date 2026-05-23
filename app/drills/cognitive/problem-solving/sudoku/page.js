import SudokuClient from './SudokuClient';

export const metadata = {
  title: 'Sudoku Drill - Grid & Logic Puzzle | SkillDrills',
  description: 'Master Sudoku from 4x4 to 7x7 grids with progressive difficulty. 60-second challenge, combo streaks, and Sudoku Master achievement. No sign-up.',
  keywords: [
    'free sudoku', 'sudoku puzzle online', 'logic puzzle game', 'number placement drill',
    'logical deduction training', 'sudoku practice free', 'progressive sudoku challenge',
    'mini sudoku 4x4', 'sudoku speed drill', 'brain training sudoku',
    'puzzle solving game', 'number grid puzzle', 'cognitive puzzle training',
    'free sudoku practice', 'sudoku brain game', 'online sudoku trainer',
    'sudoku for beginners', 'advanced sudoku 7x7', 'sudoku master challenge',
    'logical reasoning game', 'constraint satisfaction puzzle', 'deductive reasoning drill',
    'brain fitness sudoku', 'mental exercise puzzle', 'cognitive development game',
    'skilldrills sudoku', 'skilldrills puzzle', 'free brain training puzzle',
    'sudoku with lives', 'sudoku combo streaks', 'progressive puzzle game',
    'sudoku no download', 'browser sudoku free', 'instant sudoku play',
    'sudoku for seniors', 'sudoku for students', 'sudoku cognitive training',
    'number logic puzzle', 'grid filling game', 'pattern recognition sudoku',
    'working memory training', 'attention to detail puzzle', 'focus training sudoku',
  ],
  openGraph: {
    title: 'Sudoku Drill - Grid & Logic Puzzle | SkillDrills',
    description: 'Master Sudoku from 4x4 to 7x7 grids with progressive difficulty. 60-second challenge, combo streaks, and Sudoku Master achievement. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/problem-solving/sudoku',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Sudoku Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sudoku Drill - Grid & Logic Puzzle | SkillDrills',
    description: 'Master Sudoku from 4x4 to 7x7 grids with progressive difficulty. 60-second challenge, combo streaks, and Sudoku Master achievement. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/problem-solving/sudoku',
  },
};

export default function SudokuPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Problem Solving", "item": "https://skilldrills.online/drills/cognitive/problem-solving" },
              { "@type": "ListItem", "position": 4, "name": "Sudoku" }
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
            "name": "Sudoku Drill",
            "url": "https://skilldrills.online/drills/cognitive/problem-solving/sudoku",
            "description": "Free progressive Sudoku from 4x4 to 7x7 grids. 60-second challenge with combo streaks, level bonuses, and Sudoku Master achievement.",
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
                "name": "What is the Sudoku Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free progressive Sudoku game from 4x4 to 7x7 grids. Fill rows, columns, and boxes with numbers 1-N exactly once. 60-second challenge."
                }
              },
              {
                "@type": "Question",
                "name": "What grid sizes are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "4x4 (beginner), 5x5 (intermediate), 6x6 (advanced), and 7x7 (expert). Complete each to progress to the next. Finish all for Sudoku Master."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does Sudoku improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Logical deduction, pattern recognition, working memory, systematic problem-solving, and concentration. Linked to maintaining cognitive fitness."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This Sudoku drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SudokuClient />
    </>
  );
}